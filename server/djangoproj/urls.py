from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', include('users.urls')),           # 🔐 Login, Register, etc.
    path('', include('djangoapp.urls')),             # 🌐 Main app routes (dealer, reviews, etc.)
    path('home/', TemplateView.as_view(template_name="Home.html")),  # ✅ Optional static route
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)