# Generated by Django 4.1.13 on 2023-11-14 18:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('travel', '0002_alter_blogpost_author_delete_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='blogpost',
            name='banner_image',
            field=models.URLField(blank=True, null=True),
        ),
    ]
