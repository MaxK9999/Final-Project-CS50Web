import React from "react";
import Heading from "./Heading";
import "../components_styles/Heading.css";
import "../components_styles/Profile.css";
import { useAuth } from "../AuthContext";

const Profile = () => {
    const { isAuthenticated } = useAuth();
    
    return (
        <section className="profile-page">
            <div className="heading">
                <Heading title="Profile" />
            </div>
        </section>
    );
}

export default Profile;