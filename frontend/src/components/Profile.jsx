import React, { useState, useEffect, useCallback } from "react";
import Modal from "./Modal";
import Heading from "./Heading";
import ProfileForm from "./ProfileForm";
import PictureEditor from "./PictureEditor";
import "../components_styles/Heading.css";
import "../components_styles/Profile.css";
import { fetchProfileData, updateProfile } from "../Api";
import { useAuth } from "../AuthContext";

const Profile = () => {
  const { isAuthenticated } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [expandedBio, setExpandedBio] = useState(false);
  const [editingPicture, setEditingPicture] = useState(false);
  const [editingBackground, setEditingBackground] = useState(false);


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


  const handleEditPicture = () => {
    setEditingPicture(true);
  };


  const handleEditBackground = () => {
    setEditingBackground(true);
  };


  const handleSavePicture = (newPicture) => {
    // Update picture
    const formData = { profile_picture: newPicture };
    updateProfile(formData).then(() => {
      loadProfileData();
      setEditingPicture(false);
    });
  };
  

  const handleSaveBackground = (newBackground) => {
    // Update picture
    const formData = { profile_background: newBackground };
    updateProfile(formData).then(() => {
      loadProfileData();
      setEditingBackground(false);
    });
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

                  {/* --------------- Profile Background --------------------- */}
                  <div className="profile-background-wrapper">
                    <img 
                      src={`http://localhost:8000${profileData.profile_background}`}
                      className="profile-background-image"
                      alt=""
                      onClick={handleEditBackground}
                    />
                  
                    {editingBackground && (
                      <Modal> 
                        <div className="modal-content">
                          <img
                            src={`http://localhost:8000${profileData.profile_background}`}
                            className="profile-background-image-expanded"
                            alt=""
                          />
                          <PictureEditor
                            currentPicture={profileData.profile_background}
                            onSave={handleSaveBackground}
                            onCancel={() => setEditingBackground(false)}
                          />
                        </div>
                      </Modal>
                    )}
                  </div>

                  {/*---------------- Profile Picture ------------------------ */}
                  <div className="profile-picture-wrapper">
                    <img
                      src={`http://localhost:8000${profileData.profile_picture}`}
                      className="profile-picture"
                      alt=""
                      onClick={handleEditPicture}
                    />

                    {editingPicture && (
                      <Modal>
                        <div className="modal-content">
                          <img 
                            src={`http://localhost:8000${profileData.profile_picture}`}
                            className="profile-picture-expanded"
                            alt=""
                            />
                          <PictureEditor
                            currentPicture={profileData.profile_picture}
                            onSave={handleSavePicture}
                            onCancel={() => setEditingPicture(false)}
                          />
                        </div>
                      </Modal>
                    )}
                  </div>
                </div>

                <div className="profile-secondary">
                <h4 className="profile-bio">
                  Bio:{" "}
                  {expandedBio && (
                    <Modal>
                      <div className="modal-content">
                        <h2>Bio:</h2>
                        <h4 style={{ whiteSpace: "pre-line" }}>{profileData.bio}</h4>
                        <button className="close-modal" onClick={toggleExpandedBio}>
                          <div className="outer">
                            <div className="inner">
                              <div className="label">Back</div>
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
                </div>
                <button className="login-button" onClick={() => setEditing(true)}>Edit Profile</button>
              </div>
            )}
          </div>
          
          <div className="profile-body">
          </div>
        </div>
      )}
      {!isAuthenticated && <h1>Please log in to view your profile.</h1>}
    </section>
  );
};

export default Profile;
