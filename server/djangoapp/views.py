from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404, render, redirect
from django.contrib.auth import logout, login, authenticate
from django.contrib import messages
from datetime import datetime
from django.views.decorators.csrf import csrf_exempt
import logging
import json
import os

from .models import CarMake, CarModel
from .populate import initiate
from .restapis import get_request, analyze_review_sentiments, post_review

# Get an instance of a logger
logger = logging.getLogger(__name__)


@csrf_exempt
def login_user(request):
    data = json.loads(request.body)
    username = data['userName']
    password = data['password']
    user = authenticate(username=username, password=password)
    data = {"userName": username}
    if user is not None:
        login(request, user)
        data = {"userName": username, "status": "Authenticated"}
    return JsonResponse(data)


# 🚗 View to return car models and makes
def get_cars(request):
    count = CarMake.objects.count()
    if count == 0:
        initiate()
    car_models = CarModel.objects.select_related('car_make')
    cars = []
    for car_model in car_models:
        cars.append({
            "CarModel": car_model.name,
            "CarMake": car_model.car_make.name
        })
    return JsonResponse({"CarModels": cars})


# 🏪 View to return all dealers or by state (from local JSON)
def get_dealerships(request, state="All"):
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # /server
    file_path = os.path.join(base_dir, 'database', 'data', 'dealerships.json')

    try:
        with open(file_path, 'r') as f:
            data = json.load(f)
            dealerships = data.get("dealerships", [])

            if state != "All":
                dealerships = [dealer for dealer in dealerships if dealer.get("state") == state]

            return JsonResponse({"status": 200, "dealers": dealerships})
    except Exception as e:
        return JsonResponse({"status": 500, "message": f"Error reading file: {e}"})


# 🆔 View to return details for a specific dealer
def get_dealer_details(request, dealer_id):
    endpoint = f"/fetchDealer/{dealer_id}"
    dealer = get_request(endpoint)
    return JsonResponse({"status": 200, "dealer": dealer})


# 💬 View to return reviews with sentiment analysis
def get_dealer_reviews(request, dealer_id):
    try:
        dealer_id = int(dealer_id)

        # Load reviews from local file
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        file_path = os.path.join(base_dir, 'database', 'data', 'reviews.json')

        with open(file_path, 'r') as f:
            data = json.load(f)
            all_reviews = data.get("reviews", [])

        # Filter only the reviews for this dealership
        dealer_reviews = [r for r in all_reviews if int(r.get("dealership", -1)) == dealer_id]

        # Analyze sentiment
        for review in dealer_reviews:
            sentiment = analyze_review_sentiments(review.get("review", ""))
            review["sentiment"] = sentiment.get("sentiment", "neutral")

        return JsonResponse({"status": 200, "reviews": dealer_reviews})

    except Exception as e:
        return JsonResponse({"status": 500, "message": f"Error fetching reviews: {e}"})


# 📝 View to post a review
@csrf_exempt
def add_review(request):
    if request.method == "POST" and request.user.is_authenticated:
        try:
            data = json.loads(request.body)

            # Define the path to the JSON file
            base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            file_path = os.path.join(base_dir, 'database', 'data', 'reviews.json')

            # Read existing data
            with open(file_path, 'r') as file:
                reviews_data = json.load(file)

            reviews = reviews_data.get("reviews", [])

            # Generate a new unique review ID
            new_id = max([r.get("id", 0) for r in reviews], default=0) + 1

            # Add new review entry
            new_review = {
                "id": new_id,
                "name": data.get("name"),
                "dealership": data.get("dealership"),
                "review": data.get("review"),
                "purchase": data.get("purchase", False),
                "purchase_date": data.get("purchase_date", ""),
                "car_make": data.get("car_make", ""),
                "car_model": data.get("car_model", ""),
                "car_year": data.get("car_year", "")
            }

            reviews.append(new_review)

            # Save updated data back to file
            with open(file_path, 'w') as file:
                json.dump({"reviews": reviews}, file, indent=2)

            return JsonResponse({"status": 200, "message": "Review added successfully"})

        except Exception as e:
            return JsonResponse({"status": 500, "message": f"Error saving review: {e}"})
    else:
        return JsonResponse({"status": 403, "message": "Unauthorized or invalid method"})