import React from "react";
import Heading from "./Heading";
import "../components_styles/Heading.css";
import "../components_styles/Profile.css";


const Profile = () => {
    
    return (
        <section className="profile-page">
            <div className="heading">
                <Heading title="Profile" />
            </div>
        </section>
    );
}

export default Profile;