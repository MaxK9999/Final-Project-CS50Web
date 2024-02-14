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
            <input type="file" onChange={handleChange} accept="image/*" />
            <button onClick={handleSave}>Save</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
};

export default PictureEditor;
