from random import choice, sample
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from members.models import Profile, Artist
from django.shortcuts import get_object_or_404


class HigherOrLowerGame(APIView):
    def get(self, request):
        user_profile = get_object_or_404(Profile, user=request.user)
        user_artists = list(user_profile.artists.all())

        if len(user_artists) < 2:
            return Response({
                "message": "Not enough artists to play the game."
            }, status=status.HTTP_400_BAD_REQUEST)

        # two random artists from users top artists
        artist1, artist2 = sample(user_artists, 2)

        # Randomly decide which artist will be the question
        if choice([True, False]):
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

        # make the game score if it doesn't exist
        if not hasattr(user_profile, 'game_score'):
            user_profile.game_score = 0
            user_profile.save()
        """
        print(question_artist.popularity)
        print(other_artist.popularity)
        print(question_artist.name)
        print(other_artist.name)
        """
        return Response({
            'question': question_data['question'],
            'game_score': user_profile.game_score,
            'artist_name': question_artist.name,
            'other_artist_name': other_artist.name,
            'artist_followers': question_artist.popularity,
            'other_artist_followers': other_artist.popularity
        }, status=status.HTTP_200_OK)

    def post(self, request):
        user_profile = get_object_or_404(Profile, user=request.user)
        """
        if user_profile.game_score == 0:
            return Response({
                'message': 'Game Over! Your score is: 0',
                'game_score': user_profile.game_score,
                'game_over': True  # Explicitly flag game-over state
            }, status=status.HTTP_200_OK)
        """
        answer = request.data.get('answer')
        artist_followers = request.data.get('artist_followers')
        other_artist_followers = request.data.get('other_artist_followers')
        #print("In POST: " + str(artist_followers))

        if artist_followers is None or other_artist_followers is None:
            return Response({
                'message': 'Invalid data: artist followers count is missing.'
            }, status=status.HTTP_400_BAD_REQUEST)

        try:
            artist_followers = int(artist_followers)
            other_artist_followers = int(other_artist_followers)
        except (ValueError, TypeError):
            return Response({
                'message': 'Invalid data: followers count must be a valid integer.'
            }, status=status.HTTP_400_BAD_REQUEST)

        correct_answer = 'higher' if artist_followers > other_artist_followers else 'lower' # can change if we decide to add more questions later

        if answer == correct_answer:
            # increase score and return next question
            user_profile.game_score += 1
            user_profile.save()

            artist1 = choice(Artist.objects.all())
            artist2 = choice(Artist.objects.exclude(id=artist1.id)) 

            question_artist, other_artist = (artist1, artist2) if choice([True, False]) else (artist2, artist1)

            next_question_data = {
                'question': f"Does {question_artist.name} have more followers than {other_artist.name}?",
                'artist_name': question_artist.name,
                'other_artist_name': other_artist.name,
                'artist_followers': question_artist.popularity,
                'other_artist_followers': other_artist.popularity
            }

            return Response({
                'question': next_question_data['question'],
                'game_score': user_profile.game_score,
                'artist_name': question_artist.name,
                'other_artist_name': other_artist.name,
                'artist_followers': question_artist.popularity,
                'other_artist_followers': other_artist.popularity,
                'game_over': False  #  ongoing game
            }, status=status.HTTP_200_OK)

        else:
            #   reset score and end game
            last_attempt = user_profile.game_score
            user_profile.game_score = 0
            user_profile.save()

            return Response({
                'message': f"Game Over! Your score is: {last_attempt}",
                'game_score': last_attempt,
                'game_over': True  # game over state
            }, status=status.HTTP_200_OK)