import React, { useState } from "react";

const ProfileForm = ({ onSubmit, initialData }) => {
  const [bio, setBio] = useState(initialData.bio || "");
  const [location, setLocation] = useState(initialData.location || "");
  const [birth_date, setBirthDate] = useState(initialData.birth_date || "");
  const [profile_picture, setProfilePicture] = useState("");

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
            onChange={(event) => setBio(event.target.value)}
          />
        </label>
        <label className="profile-label">
          Location:
          <input
            type="text"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          />
        </label>
        <label className="profile-label">
          Birth Date:
          <input
            type="date"
            value={birth_date}
            onChange={(event) => setBirthDate(event.target.value)}
          />
        </label>
        <label className="profile-label">
          Profile Picture:
          <input
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
