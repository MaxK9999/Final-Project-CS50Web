import React from "react";
import Heading from "./Heading";
import "../components_styles/Heading.css";
import "../components_styles/Contact.css";

const Contact = () => {
    return (
        <section className="contact-page">
            <div className="heading">
                <Heading title="Contact" />
            </div>
        </section>
    );
}

export default Contact