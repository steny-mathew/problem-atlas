import os
import json
import time
import certifi
from bson import ObjectId
from dotenv import load_dotenv
from pymongo import MongoClient
import google.generativeai as genai

load_dotenv()

# -------------------------
# Gemini Setup
# -------------------------

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)

# -------------------------
# MongoDB Setup
# -------------------------

client = MongoClient(
    os.getenv("MONGO_URI"),
    tlsCAFile=certifi.where()
)

db = client["problematlas"]

collection = db["opportunities"]

# -------------------------
# Build Prompt
# -------------------------

def build_prompt(opportunities):

    prompt = """
You are an expert startup analyst.

For each opportunity determine:

1. isOpportunity
   - true if it represents a genuine unmet need,
     startup opportunity,
     feature request,
     workflow problem,
     business pain point,
     or software opportunity.

   - false if it is:
     bug report,
     crash report,
     technical support,
     troubleshooting,
     random discussion,
     programming question,
     or not a business opportunity.

2. category

3. summary
   (1 sentence)

4. opportunityScore
   (1-10)

5. reasoning
   (1 short sentence)

Return ONLY valid JSON.

Format:

[
  {
    "id": "mongodb_id",
    "isOpportunity": true,
    "category": "Productivity",
    "summary": "Short summary",
    "opportunityScore": 8,
    "reasoning": "Why it matters"
  }
]

"""

    for index, item in enumerate(
        opportunities,
        start=1
    ):

        prompt += f"""

==================================================
OPPORTUNITY {index}
==================================================

ID:
{str(item["_id"])}

SOURCE:
{item.get("source", "")}

TITLE:
{item.get("title", "")}

BODY:
{item.get("body", "")[:1500]}

"""

    return prompt

# -------------------------
# Process a Single Batch
# -------------------------

def process_batch(opportunities):

    prompt = build_prompt(opportunities)

    print("\nSending batch to Gemini...")

    try:

        response = model.generate_content(prompt)

        text = response.text.strip()

        if text.startswith("```json"):
            text = (
                text
                .replace("```json", "")
                .replace("```", "")
                .strip()
            )

        results = json.loads(text)

    except Exception as e:

        print(f"Gemini Error: {e}")

        return 0

    updated = 0

    for result in results:

        try:

            collection.update_one(
                {
                    "_id": ObjectId(result["id"])
                },
                {
                    "$set": {

                        "aiProcessed": True,

                        "isOpportunity":
                            result.get(
                                "isOpportunity",
                                False
                            ),

                        "category":
                            result.get(
                                "category",
                                ""
                            ),

                        "summary":
                            result.get(
                                "summary",
                                ""
                            ),

                        "opportunityScore":
                            result.get(
                                "opportunityScore",
                                0
                            ),

                        "reasoning":
                            result.get(
                                "reasoning",
                                ""
                            )
                    }
                }
            )

            updated += 1

        except Exception as e:

            print(f"Update Error: {e}")

    return updated

# -------------------------
# Main Loop
# -------------------------

batch_number = 0
total_updated = 0

while True:

    opportunities = list(
        collection.find(
            {
                "aiProcessed": {
                    "$ne": True
                }
            }
        ).limit(15)
    )

    if len(opportunities) == 0:

        print(
            f"\nAll done! Total updated: {total_updated}"
        )

        break

    batch_number += 1

    print(
        f"\n--- Batch {batch_number} "
        f"({len(opportunities)} opportunities) ---"
    )

    updated = process_batch(opportunities)

    total_updated += updated

    print(f"Updated {updated} in this batch.")

    # Check if more remain before waiting
    remaining = collection.count_documents(
        {
            "aiProcessed": {
                "$ne": True
            }
        }
    )

    if remaining == 0:

        print(
            f"\nAll done! Total updated: {total_updated}"
        )

        break

    print(
        f"{remaining} remaining. "
        f"Waiting 60 seconds before next batch..."
    )

    time.sleep(60)