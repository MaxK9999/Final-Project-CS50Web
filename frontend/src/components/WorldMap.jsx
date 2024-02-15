import React, { useState, useEffect } from "react";
import { getCountries } from "../Api";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const WorldMap = () => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const countriesData = await getCountries();
                setCountries(countriesData);
            } catch (error) {
                console.error("Error fetching countries for map:", error);
            }
        };

        fetchCountries();
    }, []);

    const mapStyle = {
        width: "50vw",
        height: "60vh",
    };

    return (
        <div>
            <MapContainer center={[0, 0]} zoom={2} style={mapStyle}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {countries.map((country, index) => (
                    <Marker key={index} position={country.center}>
                        <Popup>{country.name}</Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default WorldMap;