from django.contrib import admin
from django.urls import path, include, re_path
from django.conf.urls.static import static
from django.conf import settings
from django.views.generic import View
from django.http import FileResponse, HttpResponseNotFound
import os

class FrontendAppView(View):
    def get(self, request):
        index_path = os.path.join(settings.BASE_DIR, 'client_build', 'index.html')
        if os.path.exists(index_path):
            return FileResponse(open(index_path, 'rb'))
        return HttpResponseNotFound("Build not found")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', include('users.urls')),
    path('', include('djangoapp.urls')),
    # ✅ Catch-all route for React SPA
    re_path(r'^(?!static/|assets/|media/).*$', FrontendAppView.as_view()),  # ✅ exclude static-like paths
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)