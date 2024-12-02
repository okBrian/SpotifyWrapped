from django.urls import path
from games.views import HigherOrLowerGame, LeaderboardView

urlpatterns = [
    path('higher-or-lower/', HigherOrLowerGame.as_view(), name='higher_or_lower_game'),  
    path('leaderboard/', LeaderboardView.as_view(), name='leaderboard'),
]