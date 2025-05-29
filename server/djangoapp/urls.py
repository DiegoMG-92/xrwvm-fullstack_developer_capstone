from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from . import views

app_name = 'djangoapp'

urlpatterns = [
    # path for login
    path('login', views.login_user, name='login'),

    # ✅ path for getting car models and makes
    path('get_cars', views.get_cars, name='get_cars'),

    # You can add more routes as needed:
    # path('dealer/<int:dealer_id>/', views.get_dealer_details, name='dealer_details'),
    # path('review/<int:dealer_id>/', views.get_dealer_reviews, name='dealer_reviews'),
    # path('add_review/', views.add_review, name='add_review'),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)