import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)

title = "Blend playlist across Youtube and Spotify?"

body = """
Pretty self explanatory. Spotify has a blend and taste match feature, also generates a playlist. So does YouTube. But both are app native. No tool out there does this job easily?

I've had this problem a ton of times(I use YT music, ik.)

Somebody make this.
"""

prompt = f"""
You are evaluating startup opportunities.

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

response = model.generate_content(
    prompt
)

print("\nGEMINI RESPONSE:\n")
print(response.text)