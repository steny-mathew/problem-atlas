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

sample = {
    "title": "Test Opportunity",
    "source": "reddit"
}

result = collection.insert_one(sample)

print("Inserted:", result.inserted_id)