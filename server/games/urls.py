from django.urls import path
from games.views import HigherOrLowerGame

urlpatterns = [
    path('higher-or-lower/', HigherOrLowerGame.as_view(), name='higher_or_lower_game'),  # Add trailing slash
]