from .models import SpotifyToken
from django.utils import timezone
from datetime import timedelta
from .credentials import CLIENT_ID, CLIENT_SECRET
from requests import post
from members.models import Profile, Artist

def get_user_tokens(session_id):
    user_tokens = SpotifyToken.objects.filter(user=session_id)
    if user_tokens.exists():
        return user_tokens[0]
    else:
        return None

def update_or_create_user_tokens(session_id, access_token, token_type, expires_in, refresh_token):
    tokens = get_user_tokens(session_id)
    #expires_in = 3600 # 3600 seconds = 1 hour
    expires_in = timezone.now() + timedelta(seconds=expires_in)

    if tokens:
        tokens.access_token = access_token
        tokens.refresh_token = refresh_token
        tokens.expires_in = expires_in
        tokens.token_type = token_type
        tokens.save(update_fields=['access_token', 'refresh_token', 'expires_in', 'token_type'])
        print('updating')
    else:
        tokens = SpotifyToken(user=session_id, access_token=access_token, refresh_token=refresh_token, token_type=token_type, expires_in=expires_in)
        tokens.save()
        print('created token')

def is_spotify_authenticated(session_id):
    tokens = get_user_tokens(session_id)
    if tokens:
        print('token exists in auth')
        expiry = tokens.expires_in
        print(expiry, timezone.now())
        if expiry <= timezone.now():
            refresh_spotify_token(session_id)
        return True
    print('token does not exist in SpotifyToken')
    return False

def refresh_spotify_token(session_id):
    refresh_token = get_user_tokens(session_id).refresh_token
    print("refreshing token")
    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'refresh_token',
        'refresh_token': refresh_token,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }).json()

    access_token = response.get('access_token')
    token_type = response.get('token_type')
    expires_in = response.get('expires_in')
    refresh_token = response.get('refresh_token')

    update_or_create_user_tokens(session_id, access_token, token_type, expires_in, refresh_token)


def save_artists_to_profile(user, artist_list):
    """
    Save artists to the user's profile.

    user: The `User` instance whose profile will be updated.
    artist_list: A list of dictionaries with artist info ([{'name': 'Artist name', 'url': '...'}, ...]).
    """
    print("Saving artists to profile")
    profile = user.profile  
    
    for artist_data in artist_list:
        # get or create the artist model
        print(artist_data)
        artist, created = Artist.objects.get_or_create(
            name=artist_data['name'],
            defaults={
                'popularity': artist_data['popularity'],
                'url': artist_data['spotify_link']
            }
        )
        print("finished get or create")
        # if artist image is needed then I can change below
        """ 
        if 'images' in artist_data and artist_data['images']:
            for image_data in artist_data['images']:
                picture, _ = Picture.objects.get_or_create(
                    image=image_data.get('image_path'),  
                    height=image_data.get('height'),
                    width=image_data.get('width'),
                )
                artist.images.add(picture)
        """

        # link the artist with the user's profile
        profile.artists.add(artist)
    # save the profile
    profile.save()