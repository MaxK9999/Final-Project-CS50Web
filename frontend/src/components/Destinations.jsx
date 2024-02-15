import React from "react";
import WorldMap from "./WorldMap";
import "../components_styles/Destinations.css";
import Heading from "./Heading";

const Destinations = () => {
    return (
        <section className="destinations-page">
            <div className="heading">
                <Heading title="Destinations" />
                <WorldMap />
            </div>
        </section>
    );
}

export default Destinations;