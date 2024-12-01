from random import choice, sample
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from members.models import Profile, Artist
from django.shortcuts import get_object_or_404
from .models import Leaderboard


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
            'question': f"Does {question_artist.name} have more or less followers than {other_artist.name}?",
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

        # Check if the user's current game score is their new high score
        leaderboard, created = Leaderboard.objects.get_or_create(profile=user_profile)
        if user_profile.game_score > leaderboard.high_score:
            leaderboard.high_score = user_profile.game_score
            leaderboard.save()

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
                'question': f"Does {question_artist.name} have more or less followers than {other_artist.name}?",
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
            if last_attempt > user_profile.top_score:
                user_profile.top_score = last_attempt
            user_profile.game_score = 0
            user_profile.save()

            return Response({
                'message': f"Game Over! Your score is: {last_attempt}",
                'game_score': last_attempt,
                'game_over': True  # game over state
            }, status=status.HTTP_200_OK)

class LeaderboardView(APIView):
    def get(self, request):
        top_scores = Profile.objects.filter(top_score__gt=0).order_by('-game_score')[:10]
        leaderboard = [{"username": profile.display_name, "score": profile.top_score} for profile in top_scores]
        print(leaderboard)
        return Response({"leaderboard": leaderboard}, status=status.HTTP_200_OK)