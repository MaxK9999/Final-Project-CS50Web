# Generated by Django 4.1.13 on 2023-11-14 18:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('travel', '0003_blogpost_banner_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blogpost',
            name='banner_image',
            field=models.URLField(blank=True, max_length=500, null=True),
        ),
    ]
