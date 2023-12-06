from rest_framework import serializers
from django.contrib.auth.models import User
from .models import BlogPost, UserProfile, LocalPlace


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
        
        
class LocalPlaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = LocalPlace
        fields = '__all__'
        
        
class UserProfileSerializer(serializers.ModelSerializer):
    visited_countries = LocalPlaceSerializer(many=True, read_only=True)
    interests = LocalPlaceSerializer(many=True, read_only=True)

    class Meta:
        model = UserProfile
        fields = ['user', 'bio', 'location', 'birth_date', 'profile_picture', 'visited_countries', 'interests']

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        # Group visited_countries by country
        grouped_visited_countries = {}
        for entry in representation['visited_countries']:
            country = entry['country']
            if country not in grouped_visited_countries:
                grouped_visited_countries[country] = []
            if entry['city']:
                grouped_visited_countries[country].append(entry['city'])

        # Update representation with grouped visited_countries
        representation['visited_countries'] = [{'country': country, 'cities': cities} for country, cities in grouped_visited_countries.items()]

        # Similar grouping for interests
        grouped_interests = {}
        for entry in representation['interests']:
            country = entry['country']
            if country not in grouped_interests:
                grouped_interests[country] = []
            if entry['city']:
                grouped_interests[country].append(entry['city'])

        # Update representation with grouped interests
        representation['interests'] = [{'country': country, 'cities': cities} for country, cities in grouped_interests.items()]

        return representation