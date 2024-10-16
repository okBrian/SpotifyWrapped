from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    display_name = models.CharField(max_length=255)
    url = models.URLField(max_length=500)
    profile_picture = models.OneToOneField('Picture', on_delete=models.CASCADE, null=True)

class Artist(models.Model):
    name = models.CharField(max_length=255)
    url = models.URLField(max_length=500)
    images = models.ManyToManyField('Picture', on_delete=models.CASCADE, null=True)

class Albums(models.Model):
    name = models.CharField(max_length=255)
    url = models.URLField(max_length=500)
    artists = models.ManyToManyField('Artist', null=True)

class Picture(models.Model):
    image = models.ImageField(upload_to='Pictures/', null=True)
    height = models.IntegerField(null=True)
    width = models.IntegerField(null=True)
