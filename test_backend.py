import json
from backend.account.models import Account
from backend.post.models import Post, Comment, Like
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase


class TestSetup(APITestCase):

    def setUp(self):
        self.user = Account.objects.create_user(
            username="testcase",
            email="test@localhost.app",
            password="StrongPassword321",
            profilePhotoFileName="item1.jpg")
        self.token = Token.objects.create(user=self.user)
        self.api_authentication()
        self.secondUser = self.createSecondUser()

    def api_authentication(self):
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)

    def createSecondUser(self):
        return Account.objects.create_user(username="testcase2",
                                           email="test2@localhost.app",
                                           password="StrongPassword321",
                                           profilePhotoFileName="item1.jpg")


class RegistrationTestCase(APITestCase):

    def test_registration(self):
        data = {
            "username": "testcase",
            "email": "test@localhost.app",
            "password": "StrongPassword321",
            "profilePhotoFileName": "item1.jpg"
        }
        response = self.client.post(
            "/accounts/api/auth/register/", data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class LoginTestCase(TestSetup):

    def test_login(self):
        data = {
            "username": "test@localhost.app", "password": "StrongPassword321"
        }
        response = self.client.post(
            "/accounts/api/auth/login/", data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class PostCreateTestCase(TestSetup):

    def test_postcreate(self):
        post = {
            "title": "Test Title",
            "content": "Test content",
            "photoFileName": "testFilename.jpg"}
        response = self.client.post("/posts/post/", post, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class PostDeleteTestCase(TestSetup):

    def createPost(self):
        post = {
            "title": "Test Title",
            "content": "Test content",
            "photoFileName": "testFilename.jpg"}
        return Post.objects.create(
            title="Test Title",
            content="Test content",
            photoFileName="testFilename.jpg",
            poster=self.user)

    def test_postdelete(self):
        self.createPost()
        postId = '1'
        response = self.client.delete("/posts/post/" + postId)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


class CommentCreateTestCase(TestSetup):

    def createPost(self):
        return Post.objects.create(
            title="Test Title",
            content="Test content",
            photoFileName="testFilename.jpg",
            poster=self.user)

    def test_commentcreate(self):
        self.createPost()
        postId = '1'
        context = {
            "content": "New Comment",
        }
        response = self.client.post(
            '/posts/post/' +
            postId +
            '/comment/',
            context,
            format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class CommentDeleteTestCase(TestSetup):

    def createPost(self):
        return Post.objects.create(
            title="Test Title",
            content="Test content",
            photoFileName="testFilename.jpg",
            poster=self.user)

    def createComment(self, p):
        return Comment.objects.create(
            content="New Comment", post=p, commenter=self.user)

    def test_commentdelete(self):
        post = self.createPost()
        com = self.createComment(post)
        response = self.client.delete(
            '/posts/post/' + str(post.id) + '/comment/' + str(com.id) + '/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class FollowCreateTestCase(TestSetup):

    def test_followcreate(self):
        response = self.client.post('/accounts/api/auth/follow/?following=2')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class FollowDeleteTestCase(TestSetup):

    def test_followdelete(self):
        response = self.client.delete('/accounts/api/auth/follow/?following=2')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class LikeCreateTestCase(TestSetup):

    def createPost(self):
        return Post.objects.create(
            title="Test Title",
            content="Test content",
            photoFileName="testFilename.jpg",
            poster=self.user)

    def test_likecreate(self):
        context = {
            "liker": 1
        }
        post = self.createPost()
        response = self.client.post(
            '/posts/post/' + str(post.id) + '/like', context, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class LikeDeleteTestCase(TestSetup):

    def createPost(self):
        return Post.objects.create(
            title="Test Title",
            content="Test content",
            photoFileName="testFilename.jpg",
            poster=self.user)

    def createLike(self, p):
        return Like.objects.create(liker=self.user, post=p)

    def test_likedelete(self):
        post = self.createPost()
        like = self.createLike(post)
        response = self.client.delete('/posts/post/' + str(post.id) + '/like')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
