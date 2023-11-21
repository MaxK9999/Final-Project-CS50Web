from rest_framework import routers
from .views import BlogPostViewSet, user_login, user_register
from django.urls import path


router = routers.DefaultRouter()
router.register(r'blogposts', BlogPostViewSet, basename='blogpost')


urlpatterns = [
    path('api/login/', user_login, name='user-login'),
    path('api/register/', user_register, name='user-register'),
]


urlpatterns += router.urls