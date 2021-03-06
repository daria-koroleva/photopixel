from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from backend.account import views

urlpatterns = [
    path('profile/', views.ProfileView.as_view()),
    path('profile/<int:pk>', views.ProfileDetailByUser.as_view()),
    path('users/', views.UserList.as_view()),
    path('api/auth/login/', views.CustomAuthToken.as_view()),
    path('api/auth/register/', views.AccountCreateAPIView.as_view()),
    path('api/auth/follow/', views.FollowView.as_view()), #list of users that logged in user is following
    path('followersUser/<int:pk>', views.FollowersUserIDList.as_view()), #list of users following this user id
    path('followingUser/<int:pk>', views.FollowingUserIDList.as_view()), #list of users that this user id follows
]
urlpatterns = format_suffix_patterns(urlpatterns)
