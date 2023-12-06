import requests
from django.core.management.base import BaseCommand
from travel.models import LocalPlace

class Command(BaseCommand):
    help = 'Fetches and updates country data from the REST countries API'

    def handle(self, *args, **kwargs):
        api_url = "https://restcountries.com/v3.1/all"
        response = requests.get(api_url)

        if response.status_code == 200:
            countries_data = response.json()

            # Remove existing country data
            LocalPlace.objects.all().delete()

            # Process and save new data
            for country_data in countries_data:
                country_name = country_data.get("name", {}).get("common", "")
                local_place = LocalPlace.objects.create(country=country_name, code=country_data.get("cca2", ""))
                self.stdout.write(self.style.SUCCESS(f'Successfully updated data for {country_name}'))
        else:
            self.stdout.write(self.style.ERROR(f'Failed to fetch data. Status code: {response.status_code}'))