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

prompt = """
Analyze this startup opportunity.

Title:
Blend playlist across Youtube and Spotify

Body:
Pretty self explanatory. Spotify has a blend feature.
YouTube has similar recommendations.
Users want a tool that combines both.

Return ONLY in this format:

Category: <category>

Summary: <one sentence summary>

Score: <number between 1 and 10>
"""

response = model.generate_content(
    prompt
)

print(response.text)