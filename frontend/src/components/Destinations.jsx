import React from "react";
import MapContainer from "./MapContainer";
import "../components_styles/Destinations.css";
import Heading from "./Heading";

const Destinations = () => {
    return (
        <section className="destinations-page">
            <div className="heading">
                <Heading title="Destinations" />
                <MapContainer />
            </div>
        </section>
    );
}

export default Destinations;