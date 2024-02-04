import React, { useState, useEffect } from "react";
import Heading from "./Heading";
import "../components_styles/Heading.css";
import "../components_styles/Profile.css";
import { fetchProfileData } from "../Api";
import { useAuth } from "../AuthContext";


const Profile = () => {
    const { isAuthenticated } = useAuth();
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        const loadProfileData = async () => {
            try {
                if (isAuthenticated) {
                    const data = await fetchProfileData();
                    setProfileData(data);
                }
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };

        loadProfileData();
    }, [isAuthenticated]);

    return (
        <section>
            <Heading text="Profile" />
            {isAuthenticated && profileData && (
                <div className="profile-page">
                    <div className="profile-header">
                        <h2>{profileData.user_username}'s profile</h2>
                        <img
                            className="profile-picture"
                            src={profileData.profile_picture}
                            alt=""
                        />
                        <p>Bio: {profileData.bio}</p>
                        <p>Location: {profileData.location}</p>
                        <p>Birth Date: {profileData.birth_date}</p>
                        
                    </div>
                </div>
            )}
            {!isAuthenticated && <p>Please log in to view your profile.</p>}
        </section>
    );
};

export default Profile;