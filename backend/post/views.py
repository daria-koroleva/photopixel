from rest_framework import status, viewsets, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from .models import Post
from .serializers import PostSerializer
from django.core.files.storage import default_storage
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

@api_view(['GET', 'POST'])
def post_list(request):
    if request.method == 'GET':
        post = Post.objects.all()
        post1 = post.filter(author = request.user.username)
        serializer = PostSerializer(post, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            #file = request.FILES['uploadedFile']
            #file_name = default_storage.save(file.name,file)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt 
def saveFile(request):
    file = request.FILES['uploadedFile']
    file_name = default_storage.save(file.name,file)
    return JsonResponse(file_name, safe=False)
