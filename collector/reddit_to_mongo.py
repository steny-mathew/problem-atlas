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

            existing = collection.find_one(
                {"url": url}
            )

            if existing:
                continue

            collection.insert_one({
                "title": title,
                "url": url,
                "source": "reddit",
                "subreddit": "SomebodyMakeThis"
            })

            inserted += 1

            print("Saved:", title)

        except Exception as e:
            print(e)

    print(
        f"\nInserted {inserted} new opportunities"
    )

    browser.close()