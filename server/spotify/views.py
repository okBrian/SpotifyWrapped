import json
from statistics import quantiles
from urllib.error import HTTPError

from django.shortcuts import render, redirect
from .credentials import REDIRECT_URI, CLIENT_SECRET, CLIENT_ID
from rest_framework.views import APIView
from requests import Request, post, get
from rest_framework import status
from rest_framework.response import Response
from .util import update_or_create_user_tokens, is_spotify_authenticated, get_user_tokens
from django.http import HttpResponseRedirect
from collections import Counter
from members.models import Genre, UserGenre, Profile  # Import models
from django.contrib.auth.models import User
from django.contrib.auth import login # added so django auth works




class AuthURL(APIView):
    def get(self, request, format=None):
        scopes = 'user-read-playback-state user-modify-playback-state user-read-currently-playing user-top-read user-read-recently-played' # can add more scopes when needed

        url = Request('GET', 'https://accounts.spotify.com/authorize', params={
            'scope': scopes,
            'response_type': 'code',
            'redirect_uri': REDIRECT_URI,
            'client_id': CLIENT_ID
        }).prepare().url

        return Response({'url': url}, status=status.HTTP_200_OK)

def spotify_callback(request, format=None):
    code = request.GET.get('code')
    error = request.GET.get('error')

    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': REDIRECT_URI,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }).json()

    access_token = response.get('access_token')
    token_type = response.get('token_type')
    refresh_token = response.get('refresh_token')
    expires_in = response.get('expires_in')
    error = response.get('error')
    
    print('Session key in callback is:', request.session.session_key)
    if not request.session.exists(request.session.session_key):
        request.session.create()

    print('calling update/create with session key', request.session.session_key)
    update_or_create_user_tokens(request.session.session_key, access_token, token_type, expires_in, refresh_token)

    # Fetch the user profile from Spotify
    headers = {
        'Authorization': f'{token_type} {access_token}'  # Keeping original token handling intact
    }
    user_data = get('https://api.spotify.com/v1/me', headers=headers).json()

    # Extract user info from Spotify response
    spotify_user_id = user_data['id']
    display_name = user_data.get('display_name', '')
    profile_url = user_data.get('external_urls', {}).get('spotify', '')

    # Check if the user already exists in Django, if not, create a new user
    user, created = User.objects.get_or_create(username=spotify_user_id, defaults={
        'first_name': display_name, 
    })

    # Log the user in to the Django app
    login(request, user)

    # Create or update the user's profile
    profile, created = Profile.objects.get_or_create(
        user=user,
        defaults={
            'profile_id': request.session.session_key,
            'display_name': display_name,
            'url': profile_url,
        }
    )

    #return redirect('server:spotify/login') # redirects to the '' page in the "frontend" application
    return HttpResponseRedirect('http://localhost:3000/')  


class IsAuthenticated(APIView):
    def get(self, request, format=None):
        session_key = self.request.session.session_key
        is_authenticated = is_spotify_authenticated(session_key)
        
        print("Session Key:", session_key)  # This should not be None
        print("Is Authenticated:", is_authenticated)
        return Response({'status': is_authenticated}, status=status.HTTP_200_OK)

class DataView(APIView):
    def get(self, request, query):
        session_id = self.request.session.session_key
        authenticated = is_spotify_authenticated(session_id)

        # query formatting since requests need to be passed with slashes in them
        query = query.replace('|', '/')
        print(query)

        if authenticated:
            user_tokens = get_user_tokens(session_id)
            headers = {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + user_tokens.access_token
            }
            if query == "me/top/genres":
                try:
                    data = get('https://api.spotify.com/v1/me/top/artists', headers=headers).json()
                    print("data fetch successful")
                    data = data['items']
                    genres = []
                    for artist in data:
                        for artist_genre in artist['genres']:
                            genres.append(artist_genre)
                    counter = Counter(genres)
                    top_genres = counter.most_common(5)
                    top_genres = {"genres": top_genres}
                    print(counter)
                    print(top_genres)
                    print("Getting user")
                    user = request.user
                    print(user)
                    print("Getting profile")
                    profile, created = Profile.objects.get_or_create(
                        user=user,
                        defaults={
                            'profile_id' : session_id,

                        }

                    )
                    #print("profile is " + profile)
                    print("Got profile")

                    # Save genres in the database
                    #with transaction.atomic():
                    print(top_genres['genres'])
                    for genre_name, count in top_genres['genres']:
                        print(genre_name)
                        print(count)
                        genre, _ = Genre.objects.get_or_create(name=genre_name)
                        UserGenre.objects.update_or_create(
                            user=profile,
                            genre=genre,
                            defaults={'count': count}
                        )

                    return Response(top_genres, status=status.HTTP_200_OK)
                except:
                    return Response({'error': 'Error fetching data'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                try:
                    data = get(('https://api.spotify.com/v1/' + query), headers=headers).json()
                    print(query + "data fetch successful in else statement")
                    
                    return Response(data, status=status.HTTP_200_OK)
                except:
                    return Response({'error': 'Error fetching data'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'User not authenticated'}, status=status.HTTP_403_FORBIDDEN)