import React, { useState, useEffect } from "react";
import Heading from "./Heading";
import "../components_styles/Heading.css";
import "../components_styles/Profile.css";
import { fetchProfileData } from "../Api";
import { useAuth } from "../AuthContext";

const Profile = ({ userId }) => {
    const [profileData, setProfileData] = useState({});
    const { isAuthenticated } = useAuth();


    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // Fetch the profile data for the authenticated user
                if (isAuthenticated) {
                    const authUser = await fetchProfileData();
                    setProfileData(authUser.results[0]); // This is bugged, only works if userId is specified in array
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        fetchUserProfile();
    }, [isAuthenticated]);

    return (
        <section className="profile-page">
            <div className="heading">
                <Heading title="Profile" />
                {profileData && profileData.user && (
                    <div className="profile-header">
                        <img
                            src={profileData.profile_picture}
                            alt="Profile"   
                            className="profile-picture"
                        />
                        <h2>
                            <strong>{profileData.user.username}</strong>
                        </h2>
                        <p>
                            <strong>Bio:</strong> {profileData.bio}
                        </p>
                        <p>
                            Location: {profileData.location}
                        </p>
                        <p>
                            Birth Date: {profileData.birth_date}
                        </p>
                        <br />
                        <div className="countries">
                            <p>
                                Countries Visited: {profileData.visited_countries.map(country => country.country).join(", ")}
                            </p>
                            <p>
                                Interested in visiting: {profileData.interests.map(country => country.country).join(", ")}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Profile;
