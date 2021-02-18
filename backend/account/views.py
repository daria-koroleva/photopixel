from django.shortcuts import render
from django.shortcuts import render
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import generics
from .models import Account
from .serializers import AccountSerializer, FollowSerializer


class ProfileView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        content = {
            'user': str(request.user),  # `django.contrib.auth.User` instance.
            'auth': str(request.auth),  # None
            'username': str(request.user.username),
            'email': str(request.user.email),
            'date_joined': str(request.user.date_joined),
            'last_login': str(request.user.last_login),
            'is_admin': str(request.user.is_admin),
            'is_active': str(request.user.is_active),
            'is_staff': str(request.user.is_staff),
            'is_superuser': str(request.user.is_superuser),
            'id': str(request.user.id),
        }
        return Response(content)


class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'username' : user.username,
            #'first_name' : user.first_name,
            #'last_name' : user.last_name,
            #'user_id': user.pk,
            'email': user.email
        })


class AccountCreateAPIView(generics.CreateAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = (AllowAny,)
    
    


class FollowView(APIView):
    """
    Follow functionality to follow, unfollow, and display all followed.
    """
    authentication_classes = [SessionAuthentication, BasicAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        """
        follow the following specified by following param
        """
        following = request.query_params['following']
        f1 = Follow(following_id=following, follower_id=request.user.id)
        try:
            f1.save()
            return HttpResponse(status=200)
        except:
            return HttpResponse(status=400)

    def delete(self, request, *args, **kwargs):
        """
        unfollow the specified following
        """
        following = request.query_params['following']
        Follow.objects.filter(follower_id=request.user.id, following_id=following).delete()
        return HttpResponse(status=200)

    def get(self, request, *args, **kwargs):
        """
        get all followings by login
        """
        user = request.user
        followings = Follow.objects.filter(follower_id=user.id).all()
        serializer = FollowSerializer(followings, many=True)
        return JsonResponse(serializer.data, safe=False)    
