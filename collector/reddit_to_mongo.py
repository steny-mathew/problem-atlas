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

subreddits = [
    "SomebodyMakeThis",
    "AppIdeas",
    "Startup_Ideas",
    "SideProject",
    "Entrepreneur"
]

with sync_playwright() as p:

    browser = p.chromium.launch(
        headless=False
    )

    total_inserted = 0

    for subreddit in subreddits:

        print(
            f"\n{'=' * 60}"
        )
        print(
            f"SCRAPING r/{subreddit}"
        )
        print(
            f"{'=' * 60}\n"
        )

        page = browser.new_page()

        try:

            page.goto(
                f"https://www.reddit.com/r/{subreddit}/",
                wait_until="domcontentloaded",
                timeout=60000
            )

            page.wait_for_timeout(
                10000
            )

            for i in range(5):
                page.mouse.wheel(
                    0,
                    4000
                )

                page.wait_for_timeout(
                    3000
                )

            titles = page.locator(
                'a[slot="title"]'
            )

            count = titles.count()

            print(
                f"Found {count} posts"
            )

            subreddit_inserted = 0

            for i in range(count):

                try:

                    title = titles.nth(
                        i
                    ).inner_text()

                    url = titles.nth(
                        i
                    ).get_attribute(
                        "href"
                    )

                    if not url:
                        continue

                    existing = (
                        collection.find_one(
                            {"url": url}
                        )
                    )

                    if existing:
                        continue

                    post_page = (
                        browser.new_page()
                    )

                    try:

                        post_page.goto(
                            url,
                            wait_until="domcontentloaded",
                            timeout=60000
                        )

                        post_page.wait_for_timeout(
                            5000
                        )

                        try:

                            body = (
                                post_page
                                .locator(
                                    "shreddit-post-text-body"
                                )
                                .first
                                .inner_text()
                            )

                        except:

                            body = ""

                    finally:

                        post_page.close()

                    collection.insert_one({
                        "title": title,
                        "body": body,
                        "url": url,
                        "source": "reddit",
                        "subreddit": subreddit
                    })

                    subreddit_inserted += 1
                    total_inserted += 1

                    print(
                        f"Saved: {title}"
                    )

                except Exception as e:

                    print(
                        f"Post Error: {e}"
                    )

            print(
                f"\nInserted {subreddit_inserted} new posts from r/{subreddit}"
            )

        except Exception as e:

            print(
                f"Subreddit Error: {e}"
            )

        finally:

            page.close()

    print(
        f"\n{'=' * 60}"
    )

    print(
        f"TOTAL NEW OPPORTUNITIES: {total_inserted}"
    )

    print(
        f"{'=' * 60}\n"
    )

    browser.close()