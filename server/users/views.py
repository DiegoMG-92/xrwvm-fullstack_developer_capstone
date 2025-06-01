from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.shortcuts import redirect
from django.contrib import messages
import json

@csrf_exempt
def register_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            first_name = data.get('first_name')
            last_name = data.get('last_name')
            email = data.get('email')
            password = data.get('password')

            if User.objects.filter(username=username).exists():
                return JsonResponse({'message': 'Username already exists'}, status=400)

            user = User.objects.create_user(
                username=username,
                first_name=first_name,
                last_name=last_name,
                email=email,
                password=password
            )
            return JsonResponse({'message': 'User registered successfully'}, status=201)

        except Exception as e:
            return JsonResponse({'message': str(e)}, status=400)

    return JsonResponse({'message': 'Invalid request'}, status=405)


@csrf_exempt
def login_view(request):
    if request.method == 'OPTIONS':
        return JsonResponse({'message': 'CORS preflight'}, status=200)

    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')

            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return JsonResponse({
                    'userName': username,
                    'status': 'Authenticated'
                })
            else:
                return JsonResponse({'message': 'Invalid username or password'}, status=401)
        except Exception as e:
            return JsonResponse({'message': 'Invalid request', 'error': str(e)}, status=400)

    return JsonResponse({'message': 'Method not allowed'}, status=405)


def logout_view(request):
    logout(request)
    messages.info(request, 'You have been logged out.')
    return redirect('/')