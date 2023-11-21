from rest_framework import serializers
from django.contrib.auth.models import User
from .models import BlogPost


class BlogPostSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    author = serializers.CharField(source='author.username', read_only=True)
    
    class Meta:
        model = BlogPost
        fields = '__all__'
        depth = 1


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']