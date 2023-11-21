from rest_framework import routers
from .views import BlogPostViewSet, UserViewSet, GroupViewSet
from django.urls import path, include


router = routers.DefaultRouter()
router.register(r'blogposts', BlogPostViewSet, basename='blogpost')
router.register(r'users', UserViewSet, basename='user')
router.register(r'groups', GroupViewSet, basename='group')


urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]


urlpatterns += router.urls