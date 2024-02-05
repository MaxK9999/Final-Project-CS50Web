import React, { useState } from "react";
import "../components_styles/Modal.css";	

export default function Modal() {

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  }

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        Open Modal
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Modal Title</h2>

            {/* textarea content should go here */}

            <button onClick={toggleModal} className="close-modal">
              Close Modal
            </button>
          </div>
        </div>
      )}
    </>
  )
};