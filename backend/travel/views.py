from rest_framework import viewsets, filters, permissions, status
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User, Group
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, logout
from django.core.mail import send_mail, BadHeaderError, EmailMessage
from django.conf import settings
from .models import BlogPost, UserProfile, LocalPlace
from .serializers import BlogPostSerializer, UserSerializer, UserProfileSerializer, LocalPlaceSerializer


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
    

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        

class LocalPlaceViewSet(viewsets.ModelViewSet):
    queryset = LocalPlace.objects.all()
    serializer_class = LocalPlaceSerializer
    permission_classes = [permissions.AllowAny]
    
    
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