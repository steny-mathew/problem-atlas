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

result = collection.delete_many({
    "source": "stackoverflow"
})

print(
    f"Deleted {result.deleted_count} documents"
)