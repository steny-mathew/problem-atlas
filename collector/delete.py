import os
import certifi
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

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
# Reset aiProcessed
# -------------------------

result = collection.update_many(
    {
        "aiProcessed": True
    },
    {
        "$set": {
            "aiProcessed": False
        }
    }
)

print(
    f"Reset {result.modified_count} documents to aiProcessed: False")