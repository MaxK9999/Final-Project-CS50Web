from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User
from django.core.mail import outbox
from django.core import mail
from rest_framework.test import APIClient
from rest_framework import status
from .models import BlogPost


class BlogPostViewSetTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.blog_post = BlogPost.objects.create(title='Test Post', content='This is a test post', author=self.user)

    def test_blogposts_api_and_return_200(self):
        response = self.client.get('/api/blogposts/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    def test_blogpost_detail_api_and_return_200(self):
        response = self.client.get(f'/api/blogposts/{self.blog_post.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_blogpost_create_api_and_return_201(self):
        self.client.force_authenticate(user=self.user)
        
        # Create a new blog post
        data = {
            'created_at': '2022-01-01T00:00:00Z',
            'title': 'New Post',
            'content': 'This is a new post',
            'author': self.user.id
        }
        
        response = self.client.post('/api/blogposts/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        

class RegisterViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_register_user_201(self):
        data = {'username': 'newuser', 'password': 'newpassword'}
        response = self.client.post('/api/register/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class LoginViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpassword')

    def test_succesfull_user_login_200(self):
        data = {'username': 'testuser', 'password': 'testpassword'}
        response = self.client.post('/api/login/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    def test_unsuccesfull_user_login_400(self):
        data = {'username': 'testuser', 'password': 'wrongpassword'}
        response = self.client.post('/api/login/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class LogoutViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpassword')

    def test_succesfull_logout_user_200(self):
        self.client.force_login(self.user)
        response = self.client.post('/api/logout/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class EmailHandlerTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username='testuser',
            password='testpassword',
            email='testuser@example.com'
        )


    def test_email_headers_and_fields_200(self):
        self.client.force_login(self.user)
        url = reverse('send_mail')
        data = {
            'subject': 'Test Email',
            'message': 'This is a test email.',
        }
        response = self.client.post(url, data, format='json')
        
        # Assert response 200
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        
        # Assert email was sent correctly
        self.assertEqual(len(mail.outbox), 1)
        sent_email = mail.outbox[0]
        
        # Assert email headers
        self.assertEqual(sent_email.subject, 'Test Email')
        self.assertEqual(sent_email.from_email, 'noreply@example.com')
        self.assertIn('From: testuser@example.com', sent_email.body)
        
        # Check email fields
        self.assertIn('This is a test email.', sent_email.body)
        
    
    def test_missing_subject_or_message_400(self):
        self.client.force_login(self.user)
        
        url = reverse('send_mail')
        data = {
            'subject': 'Test Email',
            'message': '',
        }
        response = self.client.post(url, data, format='json')
        
        # Assert response 400 BAD REQUEST
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        
        # Assert email was not sent
        self.assertEqual(len(mail.outbox), 0)