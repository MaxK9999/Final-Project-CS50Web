import React, { useState, useEffect } from "react";
import Heading from "./Heading";
import "../components_styles/Heading.css";
import "../components_styles/Profile.css";
import { fetchProfileData } from "../Api";


const Profile = ({ userId }) => {
    const [profileData, setProfileData] = useState({});

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const profileData = await fetchProfileData(userId);
                setProfileData(profileData);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };
        fetchUserProfile();

    }, [userId]);
    
    return (
        <section className="profile-page">
            <div className="heading">
                <Heading title="Profile" />
                {profileData && (
                    <div>
                        <h2>
                            <strong>Name:</strong> {profileData.user}
                        </h2>
                        <p>
                            <strong>Bio:</strong> {profileData.bio}
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Profile;