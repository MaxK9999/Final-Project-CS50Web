from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class BlogPost(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='blog_posts')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    banner_image = models.ImageField(upload_to='blog_post_images/', blank=True, null=True)
    

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(max_length=500, blank=True)
    location = models.CharField(max_length=30, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    visited_countries = models.ManyToManyField('LocalPlace', related_name='visited_users', blank=True)
    interests = models.ManyToManyField('LocalPlace', related_name='interests_users', blank=True)
    
    
class LocalPlace(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=2)
    