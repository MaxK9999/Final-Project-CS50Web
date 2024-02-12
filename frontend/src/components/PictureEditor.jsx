import React, { useState } from "react";
import { updateProfile } from "../Api";
import "../components_styles/PictureEditor.css";


const PictureEditor = ({ currentPicture, onSave, onCancel }) => {
    const [newPicture, setNewPicture] = useState(currentPicture);   

    const handleChange = (event) => {
        const file = event.target.files[0];
        setNewPicture(file);
    };

    const handleSave = async () => {
        try {
          const formData = new FormData();
          formData.append("profile_picture", newPicture);
    
          // Call the API function to update the profile with the new picture
          await updateProfile(formData);
    
          // Inform the parent component that saving is successful
          onSave(newPicture);
    
        } catch (error) {
          console.error("Error saving profile picture:", error);
          // Handle the error as needed
        }
      };

    return (
        <div className="picture-editor">
            <input type="file" onChange={handleChange} accept="image/*" />
            <button onClick={handleSave}>Save</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
};

export default PictureEditor;