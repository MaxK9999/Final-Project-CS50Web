import React, { useState } from "react";
import Heading from "./Heading";
import "../components_styles/Heading.css";
import "../components_styles/Contact.css";
import { getEmailData } from "../Api";

const Contact = () => {
    const [formData, setFormData] = useState({
        subject: "",
        message: "",       
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await getEmailData(formData);
            console.log("Email sent successfully:", response.data);
            setFormData({
                subject: "",
                message: "",
            });
        } catch (error) {
            console.error("Error sending email:", error);
        }
    };


    return (
        <section className="contact-page">
            <div className="heading">
                <Heading title="Contact" />
                <p>
                    We'd love to hear from you! Please fill out the form below and we'll get back to you as soon as possible.
                </p>
            </div>
            <div className="contact-form">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="subject">Subject:</label>
                        <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        />

                    <label htmlFor="message">Message:</label>
                        <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        />

                    <button type="submit">Submit</button>
                </form>
            </div>
        </section>
    );
}

export default Contact