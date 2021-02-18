from django.urls import path,include
from rest_framework.urlpatterns import format_suffix_patterns
from django.conf.urls.static import static
from django.conf import settings
from backend.post import views

urlpatterns = [
    path('post/saveFile/', views.saveFile),
    path('post/', views.PostList.as_view()),
    path('post/<int:pk>', views.PostRetrieveUpdateDestroy.as_view()),
    path('post/<int:pk>/like', views.LikeCreate.as_view()),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns = format_suffix_patterns(urlpatterns)
