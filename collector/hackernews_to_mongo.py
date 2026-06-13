import requests
from pymongo import MongoClient
from dotenv import load_dotenv
import os
import certifi

load_dotenv()

client = MongoClient(
    os.getenv("MONGO_URI"),
    tlsCAFile=certifi.where()
)

db = client["problematlas"]

collection = db["opportunities"]

print("Fetching Ask HN stories...")

story_ids = requests.get(
    "https://hacker-news.firebaseio.com/v0/askstories.json"
).json()

inserted = 0

for story_id in story_ids[:50]:

    try:

        story = requests.get(
            f"https://hacker-news.firebaseio.com/v0/item/{story_id}.json"
        ).json()

        if not story:
            continue

        title = story.get(
            "title",
            ""
        )

        url = (
            f"https://news.ycombinator.com/item?id={story_id}"
        )

        existing = collection.find_one(
            {"url": url}
        )

        if existing:
            continue

        collection.insert_one({
            "title": title,
            "body": story.get(
                "text",
                ""
            ),
            "url": url,
            "source": "hackernews",
            "subreddit": None
        })

        inserted += 1

        print(
            f"Saved: {title}"
        )

    except Exception as e:

        print(e)

print(
    f"\nInserted {inserted} Hacker News opportunities"
)