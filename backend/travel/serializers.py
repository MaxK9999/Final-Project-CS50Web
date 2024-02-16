from rest_framework import serializers
from django.contrib.auth.models import User
from .models import BlogPost, UserProfile, Country


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
        

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = '__all__'
        
        
class UserProfileSerializer(serializers.ModelSerializer):
    user_username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = UserProfile
        fields = ['user_username', 'bio', 'location', 'birth_date', 'profile_picture', 'profile_background', 'visited_countries', 'interested_countries']