from rest_framework import status, viewsets, permissions,generics, mixins, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.exceptions import ValidationError
from .models import Post,Like,Comment
from .serializers import PostSerializer,LikeSerializer,CommentSerializer
from django.core.files.storage import default_storage
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from rest_framework.generics import GenericAPIView


class PostList(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(poster=self.request.user)


class PostRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def delete(self, request, *args, **kwargs):
        post = Post.objects.filter(pk=kwargs['pk'], poster=self.request.user)
        if post.exists():
            return self.destroy(request, *args, **kwargs)
        else:
            raise ValidationError('This isn\'t your post to delete!')

    def perform_create(self, serializer):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            file = request.FILES['uploadedFile']
            file_name = default_storage.save(file.name,file)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PostListByCallingUser(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        return Post.objects.filter(poster=user)


class PostListByUserID(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Post.objects.filter(poster=self.kwargs['pk'])



class LikeCreate(generics.CreateAPIView, mixins.DestroyModelMixin):
    serializer_class = LikeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        account = self.request.user
        post =   Post.objects.get(pk=self.kwargs['pk'])
        return Like.objects.filter(liker=account, post=post)


    def perform_create(self, serializer):
        if self.get_queryset().exists():
            raise ValidationError('You have already liked this post')
        serializer.save(liker=self.request.user, post=Post.objects.get(pk=self.kwargs['pk']))

    def delete(self, request, *args, **kwargs):
        if self.get_queryset().exists():
            self.get_queryset().delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            raise ValidationError('you didn\'t like this post')

class CommentRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        account = self.request.user
        post =   Post.objects.get(pk=self.kwargs['pk'])
        return Comment.objects.filter(commenter=account,post=post)

    def delete(self, request, *args, **kwargs):
        comment = Comment.objects.filter(pk=kwargs['pk'], commenter=self.request.user)
        if comment.exists():
            return self.destroy(request, *args, **kwargs)
        else:
            raise ValidationError('This isn\'t your comment to delete!')

    def perform_create(self, serializer):

        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(commenter=self.request.user, post=Post.objects.get(pk=self.kwargs['pk']))
    #        serializer.save(commenter=self.request.user,content=self.request., post=Post.objects.get(pk=self.kwargs['pk']))
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
'''
    def put(self,request,format = None):
        serializer = CommentSerializer(data = request.data)
        if serializer.is_valid():
            comment_data = update_comment(request.data)
            if comment_data:
                return Response({"message":"Updated Successfully."}, status=status.HTTP_200_OK)
            return Response({"message": "No Data Found."}, status=status.HTTP_200_OK)
        return Response({"message":"Invalid Data."},status=status.HTTP_400_BAD_REQUEST)'''


class CommentCreate(GenericAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        account = self.request.user
        post =   Post.objects.get(pk=self.kwargs['pk'])
        return Comment.objects.filter(commenter=account,post=post)


    def post(self, request):

        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        if self.get_queryset().exists():
            self.get_queryset().delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            raise ValidationError('you didn\'t comment this post')

class CommentListByPost(generics.ListAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    def get_queryset(self):
        return Comment.objects.filter(post=self.kwargs['pk'])

class Commenting(generics.ListCreateAPIView, mixins.DestroyModelMixin):

    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        account = self.request.user
        post =   Post.objects.get(pk=self.kwargs['pk'])
        return Comment.objects.filter(commenter=account, post=post)


    def perform_create(self, serializer):

        serializer.save(commenter=self.request.user, post=Post.objects.get(pk=self.kwargs['pk']))

    def delete(self, request, *args, **kwargs):
        if self.get_queryset().exists():
            self.get_queryset().delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            raise ValidationError('you didn\'t comment this post')


@csrf_exempt
def saveFile(request):
    file = request.FILES['uploadedFile']
    file_name = default_storage.save(file.name,file)

    return JsonResponse(file_name, safe=False)
