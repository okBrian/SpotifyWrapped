from django.contrib import admin

# Register your models here.
from .models import Profile, Artist, Wrapped

admin.site.register(Profile) 
admin.site.register(Artist)
admin.site.register(Wrapped)