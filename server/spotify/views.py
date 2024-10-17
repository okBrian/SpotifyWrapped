from django.shortcuts import render, redirect
from .credentials import REDIRECT_URI, CLIENT_SECRET, CLIENT_ID
from rest_framework.views import APIView
from requests import Request, post
from rest_framework import status
from rest_framework.response import Response
from .util import update_or_create_user_tokens, is_spotify_authenticated
from django.http import HttpResponseRedirect


class AuthURL(APIView):
    def get(self, request, format=None):
        scopes = 'user-read-playback-state user-modify-playback-state user-read-currently-playing' # can add more scopes when needed

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