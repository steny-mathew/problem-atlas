from playwright.sync_api import sync_playwright
from pymongo import MongoClient
from dotenv import load_dotenv
import os
import certifi

load_dotenv()

mongo_uri = os.getenv("MONGO_URI")

client = MongoClient(
    mongo_uri,
    tlsCAFile=certifi.where()
)

db = client["problematlas"]

collection = db["opportunities"]

with sync_playwright() as p:

    browser = p.chromium.launch(
        headless=False
    )

    page = browser.new_page()

    page.goto(
        "https://www.reddit.com/r/SomebodyMakeThis/",
        wait_until="domcontentloaded",
        timeout=60000
    )

    page.wait_for_timeout(10000)

    # Scroll to load more posts
    for i in range(5):
        page.mouse.wheel(0, 4000)
        page.wait_for_timeout(3000)

    titles = page.locator('a[slot="title"]')

    count = titles.count()

    print(f"Found {count} posts")

    inserted = 0

    for i in range(count):

        try:

            title = titles.nth(i).inner_text()

            url = titles.nth(i).get_attribute(
                "href"
            )

            # Check if already exists
            existing = collection.find_one(
                {"url": url}
            )

            if existing:
                continue

            # Open post page
            post_page = browser.new_page()

            post_page.goto(
                url,
                wait_until="domcontentloaded",
                timeout=60000
            )

            post_page.wait_for_timeout(5000)

            try:
                body = post_page.locator(
                    "shreddit-post-text-body"
                ).first.inner_text()

            except:
                body = ""

            post_page.close()

            # Save to MongoDB
            collection.insert_one({
                "title": title,
                "body": body,
                "url": url,
                "source": "reddit",
                "subreddit": "SomebodyMakeThis"
            })

            inserted += 1

            print(f"Saved: {title}")

        except Exception as e:
            print(f"Error: {e}")

    print(
        f"\nInserted {inserted} new opportunities"
    )

    browser.close()