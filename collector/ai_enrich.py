import google.generativeai as genai
from pymongo import MongoClient
from dotenv import load_dotenv
import time
import os
import certifi
import re

load_dotenv()

# Gemini
genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)

# MongoDB
client = MongoClient(
    os.getenv("MONGO_URI"),
    tlsCAFile=certifi.where()
)

db = client["problematlas"]
collection = db["opportunities"]

# Find opportunities that don't have AI fields yet
opportunities = collection.find({
    "$or": [
        {"category": {"$exists": False}},
        {"category": None}
    ]
})
for opp in opportunities:

    title = opp.get("title", "")
    body = opp.get("body", "")

    print(f"\nAnalyzing: {title}")

    prompt = f"""
You are evaluating startup and project opportunities.

Title:
{title}

Body:
{body}

Determine:

1. Is this a real unmet need?
2. Is someone asking for a solution?
3. Is there evidence people would use it?
4. Is it just a random thought or joke?

Return EXACTLY:

IsOpportunity: true/false

Category: <category>

Summary: <1 sentence>

Demand: <1-10>

Difficulty: <1-10>

BusinessPotential: <1-10>

OpportunityScore: <1-10>

Reasoning: <short explanation>
"""

    try:

        response = model.generate_content(
            prompt
        )

        text = response.text

        category_match = re.search(
            r"Category:\s*(.*)",
            text
        )

        summary_match = re.search(
            r"Summary:\s*(.*)",
            text
        )

        score_match = re.search(
            r"Score:\s*(.*)",
            text
        )

        category = (
            category_match.group(1)
            if category_match
            else "Unknown"
        )

        summary = (
            summary_match.group(1)
            if summary_match
            else ""
        )

        score = (
            float(score_match.group(1))
            if score_match
            else 0
        )

        collection.update_one(
            {"_id": opp["_id"]},
            {
                "$set": {
                    "category": category,
                    "summary": summary,
                    "score": score
                }
            }
        )

        print("Saved AI analysis")
    except Exception as e:
        print("Error:", e)
        if "429" in str(e):
          print(
              "Rate limit reached. Waiting 30 seconds..."
          )

          time.sleep(30)

        continue
print("\nDone!")