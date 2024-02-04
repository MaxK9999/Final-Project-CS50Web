import React, { useState, useEffect } from "react";

const ProfileForm = ({ onSubmit, initialData }) => {
  const [username, setUsername] = useState(initialData.user_username || "");
  const [bio, setBio] = useState(initialData.bio || "");
  const [location, setLocation] = useState(initialData.location || "");
  const [birth_date, setBirthDate] = useState(initialData.birth_date || "");
  const [profile_picture, setProfilePicture] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      username,
      bio,
      location,
      birth_date,
      profile_picture,
    });
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      <label>
        Bio:
        <textarea
          value={bio}
          onChange={(event) => setBio(event.target.value)}
        />
      </label>
      <label>
        Location:
        <input
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        />
      </label>
      <label>
        Birth Date:
        <input
          type="date"
          value={birth_date}
          onChange={(event) => setBirthDate(event.target.value)}
        />
      </label>
      <label>
        Profile Picture:
        <input
          type="file"
          onChange={(event) => setProfilePicture(event.target.files[0])}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProfileForm;
