# Generated by Django 4.2.5 on 2023-12-07 07:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('travel', '0009_alter_userprofile_interests_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='localplace',
            name='city',
        ),
    ]
