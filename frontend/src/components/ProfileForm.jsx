import React, { useState } from "react";
import Modal from "./Modal";

const ProfileForm = ({ onSubmit, initialData }) => {
  const [bio, setBio] = useState(initialData.bio || "");
  const [location, setLocation] = useState(initialData.location || "");
  const [birth_date, setBirthDate] = useState(initialData.birth_date || "");
  //const [visited_countries, setVisitedCountries] = useState(initialData.visited_countries || "");      uncomment when map API is ready
  //const [interests, setInterests] = useState(initialData.interests || "");
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
                <div class="outer">
                  <div class="inner">
                    <label class="label">Back</label>
                  </div>
                </div>
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

        {/* Insert countries visited and interests via map here */}

      </div>
      <button className="login-button" type="submit">Save Changes</button>
      <button className="submit" type="button" onClick={onSubmit}>Cancel</button>
    </form>
  );
};

export default ProfileForm;
