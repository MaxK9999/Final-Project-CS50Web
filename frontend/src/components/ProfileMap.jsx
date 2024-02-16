import React, { useState, useEffect, useRef } from "react";
import { getUserCountries, addToVisitedOrInterestedCountries } from "../Api";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";


const ProfileMap = ({ username, countryType }) => {
  const [userCountries, setUserCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [popupPosition, setPopupPosition] = useState(null);
  const mapRef = useRef();

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
  }, [username, countryType, selectedCountry]);

  const mapStyle = {
    width: "50vw",
    height: "60vh",
  };

  const handleMarkerClick = (country) => {
    console.log("Marker clicked:", country);
    setSelectedCountry(country);
  };

  const fetchCountryData = async (latlng) => {
    const { lat, lng } = latlng;
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
    const response = await fetch(url);
    const data = await response.json();
  
    // Extract country name from the response
    const countryName = data.address && data.address.country ? data.address.country : "Unknown";
  
    // Adding country name to the response data
    return { ...data, name: countryName };
  };

  const handleMapClick = async (event) => {
    const { latlng } = event;
    try {
      const countryData = await fetchCountryData(latlng);
      setSelectedCountry(countryData);
      console.log("Country data fetched:", countryData);
    } catch (error) {
      console.error("Error fetching country data:", error);
    }
    setPopupPosition(latlng);
  };

  const MapEvents = () => {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  };


  const handleAddToVisited = async () => {
    if (selectedCountry) {
        await addToVisitedOrInterestedCountries(username, 'visited', selectedCountry.name);
        const updatedUserCountries = await getUserCountries(username, countryType);
        setUserCountries(updatedUserCountries);
        setSelectedCountry(null);
    }
};

const handleAddToInterested = async () => {
    if (selectedCountry) {
        await addToVisitedOrInterestedCountries(username, 'interested', selectedCountry.name);
        const updatedUserCountries = await getUserCountries(username, countryType);
        setUserCountries(updatedUserCountries);
        setSelectedCountry(null);
    }
};

  return (
    <div>
      <MapContainer center={[0, 0]} zoom={2} minZoom={2} maxZoom={14} style={mapStyle} ref={mapRef}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapEvents />

        {userCountries.map((country) => (
          <Marker
            key={country.name}
            position={[country.latitude, country.longitude]}
            onClick={() => handleMarkerClick(country)}
          >
            <Popup>{country.name}</Popup>
          </Marker>
        ))}

        {popupPosition && (
          <Popup position={popupPosition}>
            <div>
              <p>{selectedCountry.name}</p>
              <button onClick={handleAddToVisited}>Add to Visited</button>
              <button onClick={handleAddToInterested}>Add to Interested</button>
            </div>
          </Popup>
        )}
      </MapContainer>
    </div>
  );
};

export default ProfileMap;