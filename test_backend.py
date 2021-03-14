import json

from backend.account.models import Account
from backend.post.models import Post
from backend.account.serializers import AccountSerializer
from backend.post.serializers import PostSerializer
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase


class RegistrationTestCase(APITestCase):

    def test_registration(self):
        data = {
            "username" : "testcase",
            "email" : "test@localhost.app",
            "password" : "StrongPassword321",
            "profilePhotoFileName" : "item1.jpg"
        }
        response = self.client.post("/accounts/api/auth/register/", data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class LoginTestCase(APITestCase):

    def setUp(self):
        self.user = Account.objects.create_user(username ="testcase",
            email = "test@localhost.app",
            password = "StrongPassword321",
            profilePhotoFileName = "item1.jpg")

    def test_login(self):
        data = {
            "username" : "test@localhost.app", "password" :"StrongPassword321"
        }
        response = self.client.post("/accounts/api/auth/login/", data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
