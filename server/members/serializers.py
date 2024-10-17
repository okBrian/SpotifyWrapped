from django.contrib.auth import authenticate
from members.models import User
from rest_framework import serializers

class UserSerializer(serializers.Serializer):
    pass

class ArtistSerializer(serializers.Serializer):
    pass

class AlbumSerializer(serializers.Serializer):
    pass

class PictureSerializer(serializers.Serializer):
    pass
