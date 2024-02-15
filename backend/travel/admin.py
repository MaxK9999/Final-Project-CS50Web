from django.contrib import admin
from .models import BlogPost, UserProfile, Country

# Register your models here.
admin.site.register(BlogPost)
admin.site.register(UserProfile)
admin.site.register(Country)