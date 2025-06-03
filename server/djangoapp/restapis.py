import os
import requests
from dotenv import load_dotenv

dotenv_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), ".env")
load_dotenv(dotenv_path)

# DEBUG CHECK
print("ENV backend_url:", os.getenv("backend_url"))
print("ENV sentiment_analyzer_url:", os.getenv("sentiment_analyzer_url"))

# Base URLs from env with fallback
backend_url = os.environ.get("backend_url", "http://localhost:3030")
sentiment_analyzer_url = os.environ.get("sentiment_analyzer_url", "http://localhost:5050/")


def get_request(endpoint, **kwargs):
    """Makes a GET request to the backend with optional query parameters."""
    params = "&".join(f"{key}={value}" for key, value in kwargs.items())
    request_url = f"{backend_url}{endpoint}"
    if params:
        request_url += f"?{params}"

    print(f"GET from {request_url}")
    try:
        response = requests.get(request_url)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(f"Network exception occurred during GET: {e}")
        return {}


def analyze_review_sentiments(text):
    """Calls the sentiment analyzer Flask microservice."""
    request_url = f"{sentiment_analyzer_url}analyze/{text}"
    try:
        response = requests.get(request_url)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(f"Sentiment analysis error: {e}")
        return {"sentiment": "neutral"}


def post_review(data_dict):
    """Posts a review to the backend."""
    request_url = f"{backend_url}/insertReview"
    try:
        response = requests.post(request_url, json=data_dict)
        response.raise_for_status()
        print(response.json())
        return response.json()
    except requests.RequestException as e:
        print(f"Network exception occurred during POST: {e}")
        return {"status": 500, "message": str(e)}