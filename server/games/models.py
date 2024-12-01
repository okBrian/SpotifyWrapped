from django.db import models
from django.contrib.auth.models import User
from members.models import Profile

class Leaderboard(models.Model):
    profile = models.OneToOneField('members.Profile', on_delete=models.CASCADE, related_name="leaderboard")
    high_score = models.PositiveIntegerField(default=0, db_index=True)

    def __str__(self):
        return f"{self.profile.user.username} - {self.high_score}"