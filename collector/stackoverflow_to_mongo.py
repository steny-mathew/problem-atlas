import requests
from pymongo import MongoClient
from dotenv import load_dotenv
import os
import certifi
import time

load_dotenv()

client = MongoClient(
    os.getenv("MONGO_URI"),
    tlsCAFile=certifi.where()
)

db = client["problematlas"]
collection = db["opportunities"]

SEARCH_TERMS = [
    "is there a tool",
    "automation",
    "dashboard",
    "workflow",
    "integration",
    "tracking",
    "software",
    "platform",
    "alternative"
]

inserted = 0

for term in SEARCH_TERMS:

    print(f"\nSearching: {term}")

    url = (
        "https://api.stackexchange.com/2.3/search/advanced"
        f"?order=desc"
        "&sort=relevance"
        "&site=stackoverflow"
        f"&q={term}"
        "&pagesize=50"
    )

    response = requests.get(url)

    if response.status_code != 200:
        print(
            f"Failed for {term}"
        )
        continue

    questions = response.json().get(
        "items",
        []
    )

    print(
        f"Found {len(questions)} questions"
    )

    for question in questions:

        title = question.get(
            "title",
            ""
        )

        question_url = question.get(
            "link"
        )

        tags = question.get(
            "tags",
            []
        )

        body = (
            f"Tags: {', '.join(tags)}"
        )

        existing = collection.find_one(
            {"url": question_url}
        )

        if existing:
            continue

        collection.insert_one({
            "title": title,
            "body": body,
            "url": question_url,
            "source": "stackoverflow"
        })

        inserted += 1

        print(
            f"Saved: {title}"
        )

    time.sleep(1)

print(
    f"\nInserted {inserted} Stack Overflow opportunities"
)