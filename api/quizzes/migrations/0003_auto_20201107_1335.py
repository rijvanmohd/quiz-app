# Generated by Django 3.1.3 on 2020-11-07 13:35

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('quizzes', '0002_auto_20201107_1315'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='QuizTakers',
            new_name='QuizTaker',
        ),
    ]
