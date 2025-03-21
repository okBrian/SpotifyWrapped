# Generated by Django 5.1.3 on 2024-12-01 23:39

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('members', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Leaderboard',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('high_score', models.PositiveIntegerField(db_index=True, default=0)),
                ('profile', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='leaderboard', to='members.profile')),
            ],
        ),
    ]
