import React, { useState } from "react";
import Heading from "./Heading";
import "../components_styles/Heading.css";
import "../components_styles/Contact.css";
import { getEmailData } from "../Api";
import { useAuth } from "../AuthContext";

const Contact = () => {
    const { isAuthenticated } = useAuth();
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
                    <br />
                    Or you can check us out on any of our other social media platforms!
                </p>
            </div>
            <div className="social-media">
                <div className="contact-form">
                    <form onSubmit={handleSubmit}>
                        {!isAuthenticated && (
                            <>
                                <input 
                                className="contact-input"
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                                />
                            </>
                        )}

                        <input
                        className="contact-input"
                        type="text"
                        name="subject"
                        id="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Enter subject"
                        required
                        />

                        <textarea
                        className="contact-input"
                        name="message"
                        id="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        />

                        <button type="submit" className="submit">Submit</button>
                    </form>
                </div>
                <div className="social-media-icons">
                    <a href="https://www.linkedin.com/in/maxim-koltypin-05aa0028b/">
                        <i class="fa-brands fa-linkedin" id="linkedin"></i>
                    </a>
                    <a href="https://github.com/MaxK9999">
                        <i class="fa-brands fa-github" id="github"></i>
                    </a>
                </div>
            </div>
        </section>
    );
}

export default Contact