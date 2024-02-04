from rest_framework import routers
from .views import BlogPostViewSet, UserViewSet, GroupViewSet, LoginView, LogoutView, RegisterView, EmailHandler
from .views import UserProfileView, LocalPlaceViewSet
from django.urls import path, include


router = routers.DefaultRouter()
router.register(r'blogposts', BlogPostViewSet, basename='blogpost')
router.register(r'users', UserViewSet, basename='user')
router.register(r'localplace', LocalPlaceViewSet, basename='localplace')
router.register(r'groups', GroupViewSet, basename='group')


urlpatterns = [
    path('', include(router.urls)),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('register/', RegisterView.as_view(), name='register'),
    path('send_mail/', EmailHandler.as_view(), name='send_mail'),
    path('userprofile/', UserProfileView.as_view(), name='userprofile'),
]


urlpatterns += router.urls