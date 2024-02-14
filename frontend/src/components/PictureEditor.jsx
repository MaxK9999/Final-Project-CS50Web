import React, { useState } from "react";
import "../components_styles/PictureEditor.css";


const PictureEditor = ({ currentPicture, onSave, onCancel }) => {
    const [newPicture, setNewPicture] = useState(currentPicture);

    const handleChange = (event) => {
        const file = event.target.files[0];
        setNewPicture(file);
    };

    const handleSave = () => {
        onSave(newPicture);
    };

    return (
        <div className="picture-editor">
            <label htmlFor="picture-upload" className="custom-file-upload">
                <i class="fa-regular fa-image"></i> <br />
                    Upload
                <input id="picture-upload" type="file" onChange={handleChange} accept="image/*" />
            </label>
            <br />
            <button className="login-button" onClick={handleSave}>Save</button>
            <button className="submit" onClick={onCancel}>Cancel</button>
        </div>
    );
};

export default PictureEditor;
