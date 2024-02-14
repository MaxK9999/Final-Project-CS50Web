import React, { useState, useEffect } from "react";
import WorldMap from "./WorldMap";
import { getLocalPlace } from "../Api";

const MapContainer = () => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const countriesData = await getLocalPlace();
                setCountries(countriesData);
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        };

        fetchCountries();
    }, []);

    return (
        <div>
            <WorldMap countries={countries} />
        </div>
    );
};

export default MapContainer;
