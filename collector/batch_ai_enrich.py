from pymongo import MongoClient
from dotenv import load_dotenv
import google.generativeai as genai
import os
import certifi

load_dotenv()

# Gemini setup
genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)

# MongoDB setup
client = MongoClient(
    os.getenv("MONGO_URI"),
    tlsCAFile=certifi.where()
)

db = client["problematlas"]

collection = db["opportunities"]

# Fetch 10 opportunities that haven't been analyzed yet
opportunities = list(
    collection.find(
        {
            "isOpportunity": {
                "$exists": False
            }
        }
    ).limit(10)
)

print(
    f"Found {len(opportunities)} opportunities"
)

# Build prompt
prompt = """
You are an expert startup analyst.

For each opportunity below determine:

- IsOpportunity (true/false)
- Category
- Summary
- Demand (1-10)
- Difficulty (1-10)
- BusinessPotential (1-10)
- OpportunityScore (1-10)
- Reasoning

Return ONLY valid JSON.

Example format:

[
  {
    "id": "mongodb_id",
    "isOpportunity": true,
    "category": "Music",
    "summary": "Users want a tool that combines Spotify and YouTube playlist recommendations.",
    "demand": 8,
    "difficulty": 4,
    "businessPotential": 7,
    "opportunityScore": 8,
    "reasoning": "Users frequently use multiple music platforms and currently lack a unified recommendation system."
  }
]

"""

for i, opp in enumerate(opportunities):

    prompt += f"""

======================================================
OPPORTUNITY {i+1}
======================================================

ID:
{opp['_id']}

TITLE:
{opp.get('title', '')}

BODY:
{opp.get('body', '')}

"""

print("\nPROMPT PREVIEW\n")
print(prompt)

print("\nPrompt length:")
print(len(prompt))