import requests
from django.core.management.base import BaseCommand
from travel.models import LocalPlace

class Command(BaseCommand):
    help = 'Fetches and updates city data from the OpenTripMap API'

    def handle(self, *args, **kwargs):
        api_key = '5ae2e3f221c38a28845f05b60beee5c7204bedb3a5f49575e95ecfa8'
        bbox_coordinates = '-125,24,-66,49'  # Bounding box for the continental United States
        api_url = f'https://api.opentripmap.com/0.1/en/places/bbox?apikey={api_key}&lon_min={-125}&lat_min={24}&lon_max={-66}&lat_max={49}'

        response = requests.get(api_url)

        if response.status_code == 200:
            places_data = response.json().get('features', [])

            # Remove existing place data
            LocalPlace.objects.all().delete()

            # Process and save new data
            for place_data in places_data:
                properties = place_data.get('properties', {})
                geometry = place_data.get('geometry', {})

                local_place = LocalPlace.objects.create(
                    country=properties.get("name", ""),
                    city=properties.get("name", ""),
                    code=properties.get("country_code", ""),
                    population=properties.get("population", None),
                    attractions=properties.get("kinds", ""),
                    nature_views=properties.get("kinds", ""),
                    # Add other fields as needed
                )
                self.stdout.write(self.style.SUCCESS(f'Successfully updated data for {local_place.city}'))
        else:
            self.stdout.write(self.style.ERROR(f'Failed to fetch data. Status code: {response.status_code}'))
