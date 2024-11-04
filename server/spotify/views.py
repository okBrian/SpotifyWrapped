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
    #print(expires_in)
    print('Session key in callback is:', request.session.session_key)
    if not request.session.exists(request.session.session_key):
        request.session.create()

    print('calling update/create with session key', request.session.session_key)
    update_or_create_user_tokens(request.session.session_key, access_token, token_type, expires_in, refresh_token)

    #return redirect('server:spotify/login') # redirects to the '' page in the "frontend" application
    return HttpResponseRedirect('http://localhost:3000/')  # Adjust URL to your React app


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
                    return Response(top_genres, status=status.HTTP_200_OK)
                except:
                    return Response({'error': 'Error fetching data'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                try:
                    data = get(('https://api.spotify.com/v1/' + query), headers=headers).json()
                    print("data fetch successful")
                    return Response(data, status=status.HTTP_200_OK)
                except:
                    return Response({'error': 'Error fetching data'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'User not authenticated'}, status=status.HTTP_403_FORBIDDEN)