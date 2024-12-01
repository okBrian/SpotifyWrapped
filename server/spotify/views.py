import json
from statistics import quantiles
from urllib.error import HTTPError

from django.shortcuts import render, redirect
from .credentials import REDIRECT_URI, CLIENT_SECRET, CLIENT_ID, LLM_TOKEN
from rest_framework.views import APIView
from requests import Request, post, get
from rest_framework import status
from rest_framework.response import Response
from .util import update_or_create_user_tokens, is_spotify_authenticated, get_user_tokens, save_artists_to_profile
from django.http import HttpResponseRedirect
from collections import Counter
from members.models import Genre, UserGenre, Profile 
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

    # get user info from Spotify response
    spotify_user_id = user_data['id']
    display_name = user_data.get('display_name', '')
    profile_url = user_data.get('external_urls', {}).get('spotify', '')

    # check if the user already exists in django. if not, create a new user
    user, created = User.objects.get_or_create(username=spotify_user_id, defaults={
        'first_name': display_name, 
    })

    # Log the user in to the Django app
    login(request, user)

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
                    user = request.user
                    profile, created = Profile.objects.get_or_create(
                        user=user,
                        defaults={
                            'profile_id' : session_id,

                        }

                    )
                    #print("profile is " + profile)
                    #print("Got profile")

                    # Save genres in the database
                    #with transaction.atomic():
                    #print(top_genres['genres'])
                    for genre_name, count in top_genres['genres']:

                        genre, _ = Genre.objects.get_or_create(name=genre_name)
                        UserGenre.objects.update_or_create(
                            user=profile,
                            genre=genre,
                            defaults={'count': count}
                        )
                    top_genres = [genre[0] for genre in top_genres['genres']]

                    return Response(top_genres, status=status.HTTP_200_OK)
                except:
                    return Response({'error': 'Error fetching data'}, status=status.HTTP_400_BAD_REQUEST)
            elif query == "me/top/albums":
                # Getting top albums from top tracks
                try:
                    data = get('https://api.spotify.com/v1/me/top/tracks?limit=50', headers=headers).json()
                    print("data fetch successful")
                    tracks = data['items']
                    albums = [track['album']['id'] for track in tracks]
                    counter = Counter(albums)
                    top_albums = counter.most_common(5)
                    top_albums = [[album[0] for album in top_albums]]

                    data = get(f'https://api.spotify.com/v1/albums', headers=headers, params = {"ids": ",".join(top_albums[0])}).json()
                    data = data["albums"]

                    tracks_data = get('https://api.spotify.com/v1/me/top/tracks?limit=50',
                                      headers=headers).json()
                    tracks = tracks_data['items']
                    def album_top_track(album_id, tracks_in):
                        top_track = "You don't seem to have one favorite!"
                        for track in tracks_in:
                            if album_id == track['album']['id']:
                                top_track = track['name']
                        return(top_track)

                    albums_info = [(album["name"], album["images"][0]["url"], album_top_track(album["id"], tracks)) for album in data]
                    print(albums_info)

                    return Response(albums_info, status=status.HTTP_200_OK)
                except Exception as e:
                    print(e)
                    return Response({'error': 'Error fetching data'}, status=status.HTTP_400_BAD_REQUEST)

            elif query == "me/genre_diversity":
                # Calculating genre diversity
                try:
                    data = get('https://api.spotify.com/v1/me/top/artists', headers=headers).json()
                    print("data fetch successful")
                    data = data['items']
                    genres = []
                    for artist in data:
                        for artist_genre in artist['genres']:
                            genres.append(artist_genre)
                    counter = Counter(genres)
                    genre_diversity = round(len(genres)/len(counter), 2) * 10
                    return Response(genre_diversity, status=status.HTTP_200_OK)
                except:
                    return Response({'error': 'Error fetching data'}, status=status.HTTP_400_BAD_REQUEST)

            elif query == "me/top/features":
            # Deprecated feature - audio features endpoint was closed by Spotify
                data = get('https://api.spotify.com/v1/me/top/tracks', headers=headers).json()
                print("data fetch successful")
                tracks = data['items']
                tracks = [track['id'] for track in tracks]

                #Tracking features
                acousticness = 0
                danceability = 0
                energy = 0

                for track in tracks:
                    features = get('https://api.spotify.com/v1/audio-features/' + track, headers=headers).json()
                    acousticness += features['acousticness']
                    danceability += features['danceability']
                    energy += features['energy']

                acousticness = acousticness / 20
                danceability = danceability / 20
                energy = energy / 20

                return Response({'acousticness': acousticness, 'danceability': danceability, 'energy': energy}, status=status.HTTP_200_OK)

            elif query == "me/diversity":
            # Deprecated feature - audio features endpoint was closed by Spotify
                data = get('https://api.spotify.com/v1/me/top/tracks', headers=headers).json()
                print("data fetch successful")
                tracks = data['items']
                tracks = [track['id'] for track in tracks]

                #Tracking diversity
                diversity = 0

                for track in tracks:
                    features = get('https://api.spotify.com/v1/audio-features/' + track, headers=headers).json()
                    diversity += features['instrumentalness']

                diversity = diversity / 20

                return Response({'diversity': diversity}, status=status.HTTP_200_OK)

            elif query == "me/description":
            # Getting LLM description
                #get genre data
                data = get('https://api.spotify.com/v1/me/top/artists', headers=headers).json()
                data = data['items']
                genres = []
                for artist in data:
                    for artist_genre in artist['genres']:
                        genres.append(artist_genre)

                # Send request to LLM
                url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key={LLM_TOKEN}"
                # Define the headers and payload
                headers = {
                    "Content-Type": "application/json"
                }
                payload = {
                    "contents": [
                        {
                            "parts": [
                                {
                                    "text": f"In 1-2 sentences describe how someone who listens to the following genres might behave. Don't talk about their music taste, but exclusively their personality and behavior. Use 1st person pronouns like 'you'. Replace suggestions with statements, such as 'are' instead of 'might be': {genres}"
                                }
                            ]
                        }
                    ]
                }

                # Make the POST request
                response = post(url, headers=headers, json=payload, params={"key": LLM_TOKEN}).json()
                try:
                    response_text = response['candidates'][0]['content']['parts'][0]['text']
                    print(response_text)
                    print("llm data fetch successful")
                    return Response(response_text, status=status.HTTP_200_OK)
                except:
                    print("llm data fetch failed")
                    print(response)
                    return Response({'error': 'Error fetching data'}, status=status.HTTP_400_BAD_REQUEST)

            else:
            # Direct requests that don't require additional data processing
                try:
                    data = get(('https://api.spotify.com/v1/' + query), headers=headers).json()
                    print(query + " data fetch successful")
                    if (query == "me/top/artists"):
                        artists = data.get("items", [])

                        parsed_data = []

                        tracks_data = get('https://api.spotify.com/v1/me/top/tracks?limit=50',
                                          headers=headers).json()
                        tracks = tracks_data['items']
                        for artist in artists:
                            artist_id = artist['id']
                            top_track = "You don't seem to have one favorite!"
                            for track in tracks:
                                if artist_id == track['artists'][0]['id']:
                                    top_track = track['name']
                            artist["fav_track"] = top_track

                            artist_info = {
                                "name": artist.get("name"),
                                "popularity": artist.get("popularity"),
                                "spotify_link": artist.get("external_urls", {}).get("spotify"),
                                "user_fav_track": top_track
                            }
                            parsed_data.append(artist_info)

                        save_artists_to_profile(request.user, parsed_data)

                    return Response(data, status=status.HTTP_200_OK)
                except Exception as e:
                    print(e)
                    return Response({'error': 'Error fetching data'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'User not authenticated'}, status=status.HTTP_403_FORBIDDEN)