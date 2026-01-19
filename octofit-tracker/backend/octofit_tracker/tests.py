from django.test import TestCase
from .models import User, Team, Activity, Leaderboard, Workout

class BasicModelTest(TestCase):
    def setUp(self):
        team = Team.objects.create(name='Marvel', description='Equipo Marvel')
        user = User.objects.create(name='Iron Man', email='ironman@marvel.com', team=team)
        Activity.objects.create(user=user, type='Correr', duration=30, distance=5)
        Leaderboard.objects.create(user=user, points=100)
        Workout.objects.create(user=user, workout='Pecho y espalda', date='2024-01-01')

    def test_user_created(self):
        self.assertEqual(User.objects.count(), 1)
    def test_team_created(self):
        self.assertEqual(Team.objects.count(), 1)
    def test_activity_created(self):
        self.assertEqual(Activity.objects.count(), 1)
    def test_leaderboard_created(self):
        self.assertEqual(Leaderboard.objects.count(), 1)
    def test_workout_created(self):
        self.assertEqual(Workout.objects.count(), 1)
