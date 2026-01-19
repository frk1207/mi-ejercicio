from django.core.management.base import BaseCommand
from django.conf import settings
from django.db import connections

from django.contrib.auth import get_user_model
from django.apps import apps

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        self.stdout.write(self.style.WARNING('Eliminando datos existentes...'))
        db_conn = connections['default']
        # Forzar la conexión si aún no está inicializada
        db_conn.ensure_connection()
        client = db_conn.connection.client
        db = client[settings.DATABASES['default']['NAME']]
        db.users.drop()
        db.teams.drop()
        db.activities.drop()
        db.leaderboard.drop()
        db.workouts.drop()

        self.stdout.write(self.style.SUCCESS('Insertando datos de ejemplo...'))
        # Equipos
        teams = [
            {'name': 'Marvel', 'description': 'Equipo Marvel'},
            {'name': 'DC', 'description': 'Equipo DC'},
        ]
        team_ids = db.teams.insert_many(teams).inserted_ids

        # Usuarios
        users = [
            {'name': 'Iron Man', 'email': 'ironman@marvel.com', 'team_id': team_ids[0]},
            {'name': 'Spider-Man', 'email': 'spiderman@marvel.com', 'team_id': team_ids[0]},
            {'name': 'Superman', 'email': 'superman@dc.com', 'team_id': team_ids[1]},
            {'name': 'Wonder Woman', 'email': 'wonderwoman@dc.com', 'team_id': team_ids[1]},
        ]
        user_ids = db.users.insert_many(users).inserted_ids
        db.users.create_index('email', unique=True)

        # Actividades
        activities = [
            {'user_id': user_ids[0], 'type': 'Correr', 'duration': 30, 'distance': 5},
            {'user_id': user_ids[1], 'type': 'Nadar', 'duration': 45, 'distance': 2},
            {'user_id': user_ids[2], 'type': 'Bicicleta', 'duration': 60, 'distance': 20},
            {'user_id': user_ids[3], 'type': 'Yoga', 'duration': 40, 'distance': 0},
        ]
        db.activities.insert_many(activities)

        # Leaderboard
        leaderboard = [
            {'user_id': user_ids[0], 'points': 100},
            {'user_id': user_ids[1], 'points': 80},
            {'user_id': user_ids[2], 'points': 120},
            {'user_id': user_ids[3], 'points': 90},
        ]
        db.leaderboard.insert_many(leaderboard)

        # Workouts
        workouts = [
            {'user_id': user_ids[0], 'workout': 'Pecho y espalda', 'date': '2024-01-01'},
            {'user_id': user_ids[1], 'workout': 'Piernas', 'date': '2024-01-02'},
            {'user_id': user_ids[2], 'workout': 'Cardio', 'date': '2024-01-03'},
            {'user_id': user_ids[3], 'workout': 'Yoga', 'date': '2024-01-04'},
        ]
        db.workouts.insert_many(workouts)

        self.stdout.write(self.style.SUCCESS('Base de datos octofit_db poblada con datos de ejemplo.'))
