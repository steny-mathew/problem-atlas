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

repositories = [
    "n8n-io/n8n",
    "calcom/cal.com",
    "AppFlowy-IO/AppFlowy",
    "open-webui/open-webui",
    "immich-app/immich"
]

GOOD_LABELS = [
    "enhancement",
    "feature request",
    "feature",
    "proposal",
    "new feature"
]

BUG_KEYWORDS = [
    "bug",
    "crash",
    "error",
    "failing",
    "failed",
    "broken",
    "fix",
    "issue",
    "not working",
    "doesn't work",
    "cannot",
    "can't",
    "exception",
    "nan"
]

OPPORTUNITY_KEYWORDS = [
    "feature",
    "integration",
    "support",
    "enhancement",
    "request",
    "workflow",
    "automation",
    "sync",
    "export",
    "import",
    "collaboration",
    "dashboard",
    "analytics",
    "notification",
    "calendar",
    "api",
    "plugin",
    "extension"
]

inserted = 0

for repo in repositories:

    print(f"\nChecking {repo}")

    url = (
        f"https://api.github.com/repos/{repo}/issues?state=open&per_page=100"
    )

    response = requests.get(
        url,
        headers={
            "Accept": "application/vnd.github+json"
        }
    )

    if response.status_code != 200:

        print(
            f"Failed: {response.status_code}"
        )

        continue

    issues = response.json()

    for issue in issues:

        try:

            # Skip pull requests
            if "pull_request" in issue:
                continue

            title = issue.get(
                "title",
                ""
            )

            body = issue.get(
                "body",
                ""
            ) or ""

            issue_url = issue.get(
                "html_url"
            )

            text = (
                title + " " + body
            ).lower()

            # Skip obvious bug reports
            if any(
                word in text
                for word in BUG_KEYWORDS
            ):
                continue

            # Skip tiny descriptions
            if len(body) < 50:
                continue

            labels = [
                label["name"].lower()
                for label in issue.get(
                    "labels",
                    []
                )
            ]

            has_good_label = any(
                label in GOOD_LABELS
                for label in labels
            )

            has_opportunity_keyword = any(
                keyword in text
                for keyword in OPPORTUNITY_KEYWORDS
            )

            # Must satisfy at least one
            if not (
                has_good_label
                or has_opportunity_keyword
            ):
                continue

            existing = collection.find_one(
                {"url": issue_url}
            )

            if existing:
                continue

            collection.insert_one({
                "title": title,
                "body": body,
                "url": issue_url,
                "source": "github",
                "repository": repo
            })

            inserted += 1

            print(
                f"Saved: {title}"
            )

        except Exception as e:

            print(
                f"Error processing issue: {e}"
            )

print(
    f"\nInserted {inserted} GitHub opportunities"
)