import requests

url = "https://www.reddit.com/r/SomebodyMakeThis/"

headers = {
    "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
}

response = requests.get(
    url,
    headers=headers,
    timeout=10
)

print(response.text[:5000])