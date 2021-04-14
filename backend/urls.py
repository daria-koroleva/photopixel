from django.contrib import admin
from django.urls import path
from django.urls import include, path
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns
from backend.account import urls
from backend.post import urls

router = routers.DefaultRouter()
#router.register(r'movies', views.MovieViewSet)
#router.register(r'profile', views.ProfileView)

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
