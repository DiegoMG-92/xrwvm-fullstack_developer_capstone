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
    if request.user.is_authenticated:
        data = json.loads(request.body)
        try:
            response = post_review(data)
            return JsonResponse({"status": 200})
        except:
            return JsonResponse({"status": 401, "message": "Error in posting review"})
    else:
        return JsonResponse({"status": 403, "message": "Unauthorized"})