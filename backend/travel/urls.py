from rest_framework import routers
from .views import BlogPostViewSet


router = routers.DefaultRouter()
router.register(r'blogposts', BlogPostViewSet)

urlpatterns = router.urls