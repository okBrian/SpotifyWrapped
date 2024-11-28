from django.db import models
#from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import User  # Use the default User model
from django.db.models.signals import post_save
from django.dispatch import receiver


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    display_name = models.CharField(max_length=255, blank=True, null=True)
    profile_id = models.CharField(max_length=50, unique=True)
    url = models.URLField(max_length=500, blank=True, null=True)
    profile_picture = models.OneToOneField('Picture', on_delete=models.CASCADE, null=True, blank=True)
    artists = models.ManyToManyField('Artist', related_name='top_artists_for', blank=True)
    genres = models.ManyToManyField('Genre', related_name='profiles', through='UserGenre')

    def __str__(self):
        return self.user.username

class Artist(models.Model):
    name = models.CharField(max_length=255)
    url = models.URLField(max_length=500)
    images = models.ManyToManyField('Picture', blank=True)

class Album(models.Model):
    name = models.CharField(max_length=255)
    url = models.URLField(max_length=500)
    artists = models.ManyToManyField('Artist', blank=True)

class Picture(models.Model):
    image = models.ImageField(upload_to='Pictures/', null=True)
    height = models.IntegerField(null=True)
    width = models.IntegerField(null=True)

class Genre(models.Model):
    name = models.CharField(max_length=100, unique=True)

class UserGenre(models.Model):
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)  # Point to Profile model
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE)
    count = models.IntegerField()
