from email.policy import default

from django.db import models
from django.contrib.auth.models import User  # Use the default User model
from django.db.models.signals import post_save
from django.dispatch import receiver


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    display_name = models.CharField(max_length=255, blank=True, null=True)
    profile_id = models.CharField(max_length=50, unique=True)
    url = models.URLField(max_length=500, blank=True, null=True)
    profile_picture = models.URLField(max_length=1000, null = True)
    artists = models.ManyToManyField('Artist', related_name='top_artists_for', blank=True)
    genres = models.ManyToManyField('Genre', related_name='profiles', through='UserGenre')
    game_score = models.IntegerField(default=0)
    top_score = models.IntegerField(default=0)

    def __str__(self):
        return self.user.username

class Artist(models.Model):
    name = models.CharField(max_length=255)
    image_url = models.URLField(max_length=500)
    popularity = models.IntegerField(default=0)
    user_fav_track = models.CharField(max_length=255, default="You don't seem to have one favorite!")

class Album(models.Model):
    name = models.CharField(max_length=255)
    image_url = models.URLField(max_length=500)
    artist = models.ForeignKey('Artist', blank=True, on_delete=models.CASCADE, default = "Unknown")
    user_fav_track = models.CharField(max_length=255, default="You don't seem to have one favorite!")

class Genre(models.Model):
    name = models.CharField(max_length=100, unique=True)

class UserGenre(models.Model):
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)  # Point to Profile model
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE)
    count = models.IntegerField()

class Wrapped (models.Model):
    user = models.CharField(max_length=255)
    top_artists = models.ManyToManyField(Artist, related_name='wrapped_top_artists')
    top_albums = models.ManyToManyField(Album, related_name='wrapped_top_albums')
    top_genres = models.ManyToManyField(Genre, related_name='wrapped_top_genres')
    genre_diversity = models.FloatField(default=20)
    user_description = models.CharField(max_length=1000, default = "LLM API Failure")
    last_played = models.CharField(max_length=255)
    wrap_id = models.CharField(max_length=255, unique=True)
    date_updated = models.DateTimeField(null = True)

    def __str__(self):
        return f"{self.user} {self.top_artists.all()} {self.top_albums.all()} {self.top_genres.all()} {self.genre_diversity} {self.user_description} {self.last_played} {self.wrap_id} {self.date_updated}"

