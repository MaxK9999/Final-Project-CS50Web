import React, { useState, useEffect } from "react";
import { getUserCountries, addToVisitedCountries, addToInterestedCountries } from "../Api";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const ProfileMap = ({ username, countryType }) => {
  const [userCountries, setUserCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const fetchUserCountriesData = async () => {
      try {
        const userCountriesData = await getUserCountries(username, countryType);
        setUserCountries(userCountriesData);
      } catch (error) {
        console.error(`Error fetching ${countryType} countries:`, error);
      }
    };

    fetchUserCountriesData();
  }, [username, countryType]);

  const mapStyle = {
    width: "50vw",
    height: "60vh",
  };

  const handleMarkerClick = (country) => {
    console.log("clicked on map");
    console.log(`Clicked on ${country.name}`);
    setSelectedCountry(country);
  };

  const handleAddToVisited = async () => {
    if (selectedCountry) {
      await addToVisitedCountries(selectedCountry.name);
      // Refresh user countries after updating
      const updatedUserCountries = await getUserCountries(username, countryType);
      setUserCountries(updatedUserCountries);
      setSelectedCountry(null);
    }
  };

  const handleAddToInterested = async () => {
    if (selectedCountry) {
      await addToInterestedCountries(selectedCountry.name);
      // Refresh user countries after updating
      const updatedUserCountries = await getUserCountries(username, countryType);
      setUserCountries(updatedUserCountries);
      setSelectedCountry(null);
    }
  };

  return (
    <div>
      <MapContainer center={[0, 0]} zoom={2} maxZoom={5} minZoom={2} style={mapStyle}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {userCountries.map((country) => (
          <Marker
            key={country.name}
            position={[country.latitude, country.longitude]}
            onClick={() => handleMarkerClick(country)}
          >
            <Popup>{country.name}</Popup>
          </Marker>
        ))}
      </MapContainer>

      {selectedCountry && (
        <div>
          <button onClick={handleAddToVisited}>Add to Visited</button>
          <button onClick={handleAddToInterested}>Add to Interested</button>
        </div>
      )}
    </div>
  );
};

export default ProfileMap;
