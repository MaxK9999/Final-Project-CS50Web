# Generated by Django 4.1.13 on 2024-02-17 21:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('travel', '0003_alter_country_latitude_alter_country_longitude'),
    ]

    operations = [
        migrations.AlterField(
            model_name='country',
            name='latitude',
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name='country',
            name='longitude',
            field=models.FloatField(),
        ),
    ]
