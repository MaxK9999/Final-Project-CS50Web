import React, { useState, useEffect, useCallback } from "react";
import Heading from "./Heading";
import ProfileForm from "./ProfileForm";
import "../components_styles/Heading.css";
import "../components_styles/Profile.css";
import { fetchProfileData, updateProfile } from "../Api";
import { useAuth } from "../AuthContext";

const Profile = () => {
  const { isAuthenticated } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [editing, setEditing] = useState(false);

  const loadProfileData = useCallback(async () => {
    try {
      if (isAuthenticated) {
        const data = await fetchProfileData();
        setProfileData(data);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const fetchData = async () => {
      await loadProfileData();
    };

    fetchData();
  }, [loadProfileData]);

  const handleFormSubmit = async (formData) => {
    try {
      await updateProfile(formData);

      // Refresh profile data after updating
      await loadProfileData();

      // Exit editing mode
      setEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <section>
      <Heading text="Profile" />
      {isAuthenticated && profileData && (
        <div className="profile-page">
          <div className="profile-header">
            <h2>{profileData.user_username}'s profile</h2>
            {editing ? (
                <ProfileForm onSubmit={handleFormSubmit} initialData={profileData} />
            ) : (
              <div>
                <img
                  src={`http://localhost:8000${profileData.profile_picture}`} /* change link when site goes live */
                  className="profile-picture"
                  alt=""
                />
                <p>Bio: {profileData.bio}</p>
                <p>Location: {profileData.location}</p>
                <p>Birth Date: {profileData.birth_date}</p>
                <div className="countries">
                  <p>
                      Countries Visited: {profileData.visited_countries.map(country => country.country).join(", ")}
                  </p>
                  <p>
                      Interested in visiting: {profileData.interests.map(country => country.country).join(", ")}
                  </p>
                </div>
                <button className="login-button" onClick={() => setEditing(true)}>Edit Profile</button>
              </div>
            )}
          </div>
          
          <div className="profile-body">
          </div>
        </div>
      )}
      {!isAuthenticated && <p>Please log in to view your profile.</p>}
    </section>
  );
};

export default Profile;
