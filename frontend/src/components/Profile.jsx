import React, { useState, useEffect, useCallback } from "react";
import Modal from "./Modal";
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
  const [expandedBio, setExpandedBio] = useState(false);


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

  const toggleExpandedBio = () => {
    setExpandedBio(!expandedBio);
  };

  return (
    <section>
      <Heading text="Profile" />
      {isAuthenticated && profileData && (
        <div className="profile-page">
          <div className="profile-header">
            <h1>{profileData.user_username}'s profile</h1>
            {editing ? (
                <ProfileForm onSubmit={handleFormSubmit} initialData={profileData} />
            ) : (
              <div>
                <div className="profile-background">
                  <img 
                    src={`http://localhost:8000${profileData.profile_background}`}
                    className="profile-background-image"
                    alt=""
                  />
                  <img
                    src={`http://localhost:8000${profileData.profile_picture}`} /* change link when site goes live */
                    className="profile-picture"
                    alt={`http://localhost:8000/media/profile_pictures/default.jpg`}
                  />
                </div>

                <div className="profile-secondary">
                <h4 className="profile-bio">
                    Bio:{" "}
                    {expandedBio && (
                      <Modal>
                        <div className="modal-content">
                          <h4>{profileData.bio}</h4>
                          <button className="close-modal" onClick={toggleExpandedBio}>
                            <div className="outer">
                              <div className="inner">
                                <div className="label">Close</div>
                              </div>
                            </div>
                          </button>
                        </div>
                      </Modal>
                    )}
                    {!expandedBio && (
                      <>
                        <span className="truncated-bio">
                          {profileData.bio.length > 50
                            ? profileData.bio.substring(0, 50) + "..."
                            : profileData.bio}
                        </span>
                        <button className="btn-bio" onClick={toggleExpandedBio}>
                          Read More
                        </button>
                      </>
                    )}
                  </h4>

                  <h5>Location: {profileData.location}</h5>
                  <h5>Birth Date: {profileData.birth_date}</h5>
                </div>
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
