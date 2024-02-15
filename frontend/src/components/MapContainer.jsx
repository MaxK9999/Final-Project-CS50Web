import React, { useState } from "react";
import WorldMap from "./WorldMap";

const MapContainer = () => {
    const [countries, setCountries] = useState([]);


    return (
        <div>
            <WorldMap countries={countries} />
        </div>
    );
};

export default MapContainer;
