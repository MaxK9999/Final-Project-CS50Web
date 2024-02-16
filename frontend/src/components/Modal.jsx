import React, { useEffect, useState } from "react";
import "../components_styles/Modal.css";

const Modal = ({ children }) => {
  const [modal, setModal] = useState(true);

  const handleOverlayClick = (event) => {
    // Check if the click is directly on the overlay (not on its children)
    if (event.target.classList.contains("overlay")) {
      setModal(false);
    }
  };
  

  useEffect(() => {
    if (modal) {
        document.body.classList.add("active-modal");
      } else {
        document.body.classList.remove("active-modal");
      }

      return () => {
        document.body.classList.remove("active-modal");
      };
    }, [modal]);


  return (
    <>
      <div onClick={handleOverlayClick} className="overlay"></div>
      <div className="modal">
        {children}
      </div>
    </>
  );
};

export default Modal;

