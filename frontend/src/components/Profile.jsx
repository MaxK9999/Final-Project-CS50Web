import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    loadProfileData();
  }, [isAuthenticated]);

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
                  src={profileData.profile_picture}
                  className="profile-picture"
                  alt=""
                />
                <p>Bio: {profileData.bio}</p>
                <p>Location: {profileData.location}</p>
                <p>Birth Date: {profileData.birth_date}</p>
                
                <button className="login-button" onClick={() => setEditing(true)}>Edit Profile</button>
              </div>
            )}
          </div>
        </div>
      )}
      {!isAuthenticated && <p>Please log in to view your profile.</p>}
    </section>
  );
};

export default Profile;
