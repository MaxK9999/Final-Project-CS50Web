from rest_framework import viewsets, filters, permissions, status
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User, Group
from django.contrib.auth import login, logout
from django.core.mail import BadHeaderError, EmailMessage
from django.conf import settings
from .models import BlogPost, UserProfile, Country
from .serializers import BlogPostSerializer, UserSerializer, UserProfileSerializer, CountrySerializer
import requests


class BlogPostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all().order_by('-created_at')
    serializer_class = BlogPostSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'content', 'author__username']
    permission_classes = [permissions.AllowAny]
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
    
    
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['username', 'email']
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [SessionAuthentication]
    
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    
class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = UserSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']
    permission_classes = [permissions.IsAuthenticated]
    
    
class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        data = request.data
        username = data.get("username", "")
        email = data.get("email", "")
        password = data.get("password", "")
        user = User.objects.create_user(username, email, password)
        user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        data = request.data
        username = data.get("username", "")
        password = data.get("password", "")
        user = User.objects.filter(username=username).first()
        
        if user and user.check_password(password):
            serializer = UserSerializer(user)
            login(request, user)
            print(request.user)
            print("Session ID: ", request.session.session_key)
            
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({}, status=status.HTTP_400_BAD_REQUEST)
    

class LogoutView(APIView):
    def post(self, request):
        logout(request)
        print(request.user)
        print("Session ID: ", request.session.session_key)
        return Response({}, status=status.HTTP_200_OK)
    
    def get(self, request):
        return Response({"detail": "Method \"GET\" not allowed."}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    

class EmailHandler(APIView):
    permission_classes = [permissions.AllowAny]
    
    # Use a noreply mail for security reasons
    def post(self, request):
        data = request.data
        subject = data.get("subject", "")
        message = data.get("message", "")
        from_email = "noreply@example.com"
        
        # If anonymous user, let user type in email
        if not request.user.is_authenticated:
            provided_email = data.get("email", "")
            if not provided_email:
                return Response("Please provide an email.", status=status.HTTP_400_BAD_REQUEST)
            provided_name = data.get("name", "")
        else:
            # Use provided email or fallback to user's email
            provided_email = data.get("email", request.user.email)
            provided_name = data.get("name", request.user.username)
            
        if subject and message:
            try:
                email_content = f"From: {provided_email}\nName:{provided_name}\n\n{message}"
                email = EmailMessage(
                    subject,
                    email_content,
                    from_email,
                    [settings.EMAIL_HOST_USER]
                )
                email.send()
                return Response({}, status=status.HTTP_200_OK)
            except BadHeaderError:
                return Response("Invalid header found.", status=status.HTTP_400_BAD_REQUEST)
            
        return Response("Make sure all fields are entered and valid.", status=status.HTTP_400_BAD_REQUEST)
    
    
class UserProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user_profile = request.user.userprofile
        serializer = UserProfileSerializer(user_profile)
        return Response(serializer.data)
    
    def patch(self, request, *args, **kwargs):
        user_profile = request.user.userprofile
        serializer = UserProfileSerializer(user_profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        print (serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class UserCountriesView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, username, country_type, *args, **kwargs):
        try:
            user_profile = UserProfile.objects.get(user__username=username)
        except UserProfile.DoesNotExist:
            return Response("User profile not found.", status=status.HTTP_404_NOT_FOUND)

        if country_type == "visited":
            countries = user_profile.visited_countries.all()
        elif country_type == "interested":
            countries = user_profile.interested_countries.all()
        else:
            return Response("Invalid country type.", status=status.HTTP_400_BAD_REQUEST)

        serializer = CountrySerializer(countries, many=True)
        return Response(serializer.data)


    def post(self, request, username, country_type, *args, **kwargs):
        country_name = request.data.get('country_name')

        try:
            user_profile = UserProfile.objects.get(user__username=username)
        except UserProfile.DoesNotExist:
            return Response("User profile not found.", status=status.HTTP_404_NOT_FOUND)

        country_qs = Country.objects.filter(name=country_name)

        if not country_qs.exists():
            return Response(f"Country {country_name} not found.", status=status.HTTP_404_NOT_FOUND)

        country = country_qs.first()

        if country_type == "visited":
            user_profile.visited_countries.add(country)
        elif country_type == "interested":
            user_profile.interested_countries.add(country)
        else:
            return Response("Invalid country type.", status=status.HTTP_400_BAD_REQUEST)

        return Response(f"Added {country_name} to {country_type} countries.", status=status.HTTP_200_OK)
    
    
class AddCountryView(APIView):
    def post(self, request, *args, **kwargs):
        latitude = request.data.get('latitude')
        longitude = request.data.get('longitude')

        try:
            # Use Nominatim to get country from latlng
            country_name = self.get_country_from_latlng(latitude, longitude)

            # Fetch the user based on the request
            user = request.user
            user_profile = UserProfile.objects.get(user=user)

            # Associate the country with the user
            country_data = {'name': country_name, 'latitude': latitude, 'longitude': longitude}
            serializer = CountrySerializer(data=country_data)
            if serializer.is_valid():
                country = serializer.save()
                user_profile.visited_countries.add(country)  # Adjust based on your logic

                return Response(f"Added {country_name} to the database.", status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def get_country_from_latlng(self, latitude, longitude):
        nominatim_url = f"https://nominatim.openstreetmap.org/reverse?format=json&lat={latitude}&lon={longitude}"
        response = requests.get(nominatim_url)
        data = response.json()
        country_name = data.get('address', {}).get('country', 'Unknown')
        return country_name