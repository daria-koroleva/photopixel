from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from backend.account import views

urlpatterns = [
    path('profile/', views.ProfileView.as_view()),
    path('users/', views.UserList.as_view()),
    path('api/auth/login/', views.CustomAuthToken.as_view()),
    path('api/auth/register/', views.AccountCreateAPIView.as_view()),
    path('api/auth/follow/', views.FollowView.as_view()),
]
urlpatterns = format_suffix_patterns(urlpatterns)
