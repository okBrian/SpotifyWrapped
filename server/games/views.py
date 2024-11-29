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
from members.models import Profile, Artist, Genre, UserGenre
import random

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

class HigherOrLowerGame(APIView):
    def get(self, request):
        # get user profile... might have to change to spotify ID if needed
        user_profile = get_object_or_404(Profile, user=request.user)
        user_artists = user_profile.artists.all()

        if len(user_artists) < 2:
            return Response({
                "message": "Not enough artists to play the game."
            }, status=status.HTTP_400_BAD_REQUEST)

        # get a random artists followers count
        artist1, artist2 = random.sample(user_artists, 2)
        
        # choose a random artist for question
        if random.choice([True, False]):
            question_artist = artist1
            other_artist = artist2
        else:
            question_artist = artist2
            other_artist = artist1

        question_data = {
            'question': f"Does {question_artist.name} have more followers than {other_artist.name}?",
            'artist_name': question_artist.name,
            'other_artist_name': other_artist.name,
            'artist_followers': question_artist.popularity,
            'other_artist_followers': other_artist.popularity
        }
        
        # Initialize the game state if not already started
        if not hasattr(user_profile, 'game_score'):
            user_profile.game_score = 0
            user_profile.save()

        # Send the current game data and score
        return Response({
            'question': question_data['question'],
            'game_score': user_profile.game_score
        }, status=status.HTTP_200_OK)

    def post(self, request):
        user_profile = get_object_or_404(Profile, user=request.user)
        
        # getting answers from the request data
        answer = request.data.get('answer')  # 'higher' or 'lower'
        artist_name = request.data.get('artist_name')
        other_artist_name = request.data.get('other_artist_name')
        artist_followers = request.data.get('artist_followers')
        other_artist_followers = request.data.get('other_artist_followers')

        correct_answer = 'higher' if artist_followers > other_artist_followers else 'lower'

        if answer == correct_answer:
            # Correct answer, increase score and continue game
            user_profile.game_score += 1
            user_profile.save()

            # Generate the next question (same logic as in GET method)
            artist1 = random.choice(Artist.objects.all())
            artist2 = random.choice(Artist.objects.exclude(id=artist1.id))  # make sure it's not the same artist
            question_artist, other_artist = (artist1, artist2) if random.choice([True, False]) else (artist2, artist1)

            next_question_data = {
                'question': f"Does {question_artist.name} have more followers than {other_artist.name}?",
                'artist_name': question_artist.name,
                'other_artist_name': other_artist.name,
                'artist_followers': question_artist.popularity,
                'other_artist_followers': other_artist.popularity
            }
            return Response({
                'question': next_question_data['question'],
                'game_score': user_profile.game_score
            }, status=status.HTTP_200_OK)
        else:
            # reset score cus wrong answer
            user_profile.game_score = 0
            user_profile.save()
            return Response({
                'message': 'Game Over! Your score is: ' + str(user_profile.game_score)
            }, status=status.HTTP_200_OK)
