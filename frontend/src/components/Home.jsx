import React from "react";
import "../components_styles/Home.css";

const Home = () => {
    
    const heroSectionHome = (
        <div className="home">
            <h1>Home</h1>
            <p>
                What do <strong>YOU</strong> define as home? <br />
                We at OdysseyOpus believe that home is where the heart is.
            </p>
        </div>
    )
        
    return (
        <div>
            {heroSectionHome}
        </div>
    )

};
export default Home