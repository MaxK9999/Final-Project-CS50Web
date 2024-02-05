import React, { useState } from "react";
import Modal from "./Modal";

const ProfileForm = ({ onSubmit, initialData }) => {
  const [bio, setBio] = useState(initialData.bio || "");
  const [location, setLocation] = useState(initialData.location || "");
  const [birth_date, setBirthDate] = useState(initialData.birth_date || "");
  const [profile_picture, setProfilePicture] = useState("");
  const [showBioModal, setShowBioModal] = useState(false);

  const toggleBioModal = () => {
    setShowBioModal(!showBioModal);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      bio,
      location,
      birth_date,
      profile_picture,
    });
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="profile-form">
        <label className="profile-label">
          Bio:
          <textarea
            className="profile-textarea"
            value={bio}
            onClick={toggleBioModal}
          />
        </label>
        
        {/* Bio Modal */}
        {showBioModal && (
          <Modal>
            <div className="modal-content">
              <h2>Edit Bio</h2>
              <textarea
                value={bio}
                className="modal-textarea"
                onChange={(event) => setBio(event.target.value)}
              />
              <button onClick={() => setShowBioModal(false)} className="close-modal">
                Close Modal
              </button>
            </div>
          </Modal>
        )}

        <label className="profile-label">
          Location:
          <input
            className="profile-input"
            type="text"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          />
        </label>
        <label className="profile-label">
          Birth Date:
          <input
            className="profile-input"
            type="date"
            value={birth_date}
            onChange={(event) => setBirthDate(event.target.value)}
          />
        </label>
        <label className="profile-label">
          Profile Picture:
          <input
            className="profile-input"
            type="file"
            onChange={(event) => setProfilePicture(event.target.files[0])}
          />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProfileForm;
