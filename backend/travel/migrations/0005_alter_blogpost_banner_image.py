# Generated by Django 4.1.13 on 2023-11-14 18:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('travel', '0004_alter_blogpost_banner_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blogpost',
            name='banner_image',
            field=models.ImageField(blank=True, null=True, upload_to='blog_post_images/'),
        ),
    ]