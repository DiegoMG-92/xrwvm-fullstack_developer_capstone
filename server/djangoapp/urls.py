from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from . import views

app_name = 'djangoapp'

urlpatterns = [
    path('login', views.login_user, name='login'),

    # 🚗 Cars data
    path('get_cars', views.get_cars, name='get_cars'),

    # 🏪 Dealerships
    path('get_dealers', views.get_dealerships, name='get_dealers'),
    path('get_dealers/<str:state>', views.get_dealerships, name='get_dealers_by_state'),

    # 🆔 Dealer details
    path('dealer/<int:dealer_id>', views.get_dealer_details, name='dealer_details'),

    # 💬 Dealer reviews with sentiment
    path('reviews/dealer/<int:dealer_id>', views.get_dealer_reviews, name='dealer_reviews'),

    # ✅ ➕ Add new review (fixed trailing slash)
    path('add_review/', views.add_review, name='add_review'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)