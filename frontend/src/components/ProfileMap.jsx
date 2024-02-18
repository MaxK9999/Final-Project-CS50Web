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
    const { lat, lng } = latlng; // Updated destructuring here
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Extract country name from the response
        const countryName = data.address && data.address.country ? data.address.country : "Unknown";

        // Adding country name to the response data
        return { ...data, name: countryName, latitude: lat, longitude: lng }; // Include latitude and longitude
    } catch (error) {
        console.error("Error fetching country data:", error);
        throw error;
    }
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
    if (selectedCountry && selectedCountry.latitude && selectedCountry.longitude) {
        try {
            await addToVisitedOrInterestedCountries(username, 'visited', selectedCountry.name, selectedCountry.latitude, selectedCountry.longitude);
            // Additional logic if needed
        } catch (error) {
            console.error("Error adding country to visited:", error);
        }
    } else {
        console.error("Invalid latitude or longitude.");
    }
  };


  const handleAddToInterested = async () => {
    if (selectedCountry && selectedCountry.latitude && selectedCountry.longitude) {
        try {
            await addToVisitedOrInterestedCountries(username, 'interested', selectedCountry.name, selectedCountry.latitude, selectedCountry.longitude);

        } catch (error) {
            console.error("Error adding country to interested:", error);
        }
      } else {
          console.error("Invalid latitude or longitude.");
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

        {popupPosition && selectedCountry && (
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