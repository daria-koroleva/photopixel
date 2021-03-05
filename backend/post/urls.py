from django.urls import path,include
from rest_framework.urlpatterns import format_suffix_patterns
from django.conf.urls.static import static
from django.conf import settings
from backend.post import views

urlpatterns = [
    path('post/saveFile/', views.saveFile),
    path('myposts/', views.PostListByCallingUser.as_view()),
    path('profileposts/<int:pk>', views.PostListByUserID.as_view()),
    path('post/', views.PostList.as_view()),
    path('post/<int:pk>', views.PostRetrieveUpdateDestroy.as_view()),
    path('post/<int:pk>/like', views.LikeCreate.as_view()),
    path('post/<int:pk>/comment', views.CommentCreate.as_view()),
    path('post/<int:pk>/comment/<int:comment_id>/', views.CommentRetrieveUpdateDestroy.as_view()),
    path('post/<int:pk>/comments', views.CommentListByPost.as_view()),
    path('post/<int:pk>/likes', views.LikeListByPost.as_view()),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns = format_suffix_patterns(urlpatterns)
