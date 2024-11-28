import json
from statistics import quantiles
from urllib.error import HTTPError

from django.shortcuts import render, redirect
from rest_framework.views import APIView
from requests import Request, post, get
from rest_framework import status
from rest_framework.response import Response
from .util import update_or_create_user_tokens, is_spotify_authenticated, get_user_tokens
from django.http import HttpResponseRedirect

# import database from spotify/models.py
#from spotify.models import User
from members.models import User, Artist, Albums, Picture

# Create your views here.

class TopArtistGuessingGame(APIView):
    def get(self, request, format=None):
        session_id = request.session.session_key
        if not is_spotify_authenticated(session_id):
            # user needs to login to spotify
            return Response({'error': 'User not authenticated'}, status=status.HTTP_403_FORBIDDEN)

        #retrieve user top artists
        user = request.user
        top_artists = user.artists.all()

        if not top_artists:
            # if this returns, frontend needs to indicate that there is no artist data for the user's spotify account. They need to listen to music
            return Response({'error': 'There are no artists'}, status=status.HTTP_404_NOT_FOUND)

        # store the top artist
        request.session['top_artist_guess'] = top_artist.name
        return Response({'message' : 'Guess the top artist'}, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        # Call this when a user submits a guess
        # TODO: make a serialzer