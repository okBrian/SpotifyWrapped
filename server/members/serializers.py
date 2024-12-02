from django.contrib.auth import authenticate
from .models import Wrapped, Artist, Album, Genre

from rest_framework import serializers


class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ['name', 'image_url', 'popularity', 'user_fav_track']

class AlbumSerializer(serializers.ModelSerializer):
    artist = ArtistSerializer()

    class Meta:
        model = Album
        fields = ['name', 'image_url', 'artist', 'user_fav_track']

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['name']

class WrappedSerializer(serializers.ModelSerializer):
    top_artists = ArtistSerializer(many=True)
    top_albums = AlbumSerializer(many=True)
    top_genres = GenreSerializer(many=True)

    class Meta:
        model = Wrapped
        fields = ['user', 'top_artists', 'top_albums', 'top_genres', 'genre_diversity', 'user_description', 'last_played', 'wrap_id', 'date_updated']

class UserSerializer(serializers.Serializer):
    pass
