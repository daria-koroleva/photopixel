from django.contrib import admin
from django.urls import include, path
from rest_framework import routers

router = routers.DefaultRouter()

urlpatterns = [
    path('accounts/', include('backend.account.urls')),
    path('posts/', include('backend.post.urls')),
    path('admin/', admin.site.urls),
    path(
        'api/auth/',
        include(
            'rest_framework.urls',
            namespace='rest_framework'))
]
