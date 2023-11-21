from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status
from .models import BlogPost


class BlogPostViewSetTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.blog_post = BlogPost.objects.create(title='Test Post', content='This is a test post', author=self.user)

    def test_get_blog_posts(self):
        response = self.client.get('/api/blogposts/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        

class RegisterViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_register_user(self):
        data = {'username': 'newuser', 'password': 'newpassword'}
        response = self.client.post('/api/register/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class LoginViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpassword')

    def test_login_user(self):
        data = {'username': 'testuser', 'password': 'testpassword'}
        response = self.client.post('/api/login/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class LogoutViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpassword')

    def test_logout_user(self):
        self.client.force_login(self.user)
        response = self.client.post('/api/logout/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

