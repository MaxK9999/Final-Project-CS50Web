import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const WorldMap = ({ countries }) => {
    const mapstyle = {
        width: "50vw",
        height: "60vh",
    };

    return (
        <MapContainer center={[0, 0]} zoom={2} style={mapstyle}>
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
    );
};

export default WorldMap;
