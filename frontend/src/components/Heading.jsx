import React from "react";
import "../components_styles/Heading.css";

export default function Heading({ title }) {
    return ( 
    <div className="heading">
        <h1>{title}</h1>
    </div>
    );
}