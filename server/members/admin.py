from django.contrib import admin

# Register your models here.
from .models import Profile, Artist 

admin.site.register(Profile) 
admin.site.register(Artist)