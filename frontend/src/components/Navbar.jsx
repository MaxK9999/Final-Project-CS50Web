import React, { useState } from "react";
import "../components_styles/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../Api";

const Navbar = () => {
    const [isNavbarClosed, setIsNavbarClosed] = useState(false);
    const navigate = useNavigate();
    
    const toggleNavbar = () => {
        setIsNavbarClosed(!isNavbarClosed);
    };

    const handleLogout = async (event) => {
        event.preventDefault();

        try {
            const csrfToken = getCookie("csrftoken");
            const response = await api.post("logout/", {}, { 
                headers: { 
                    "X-CSRFToken": csrfToken 
                },
                withCredentials: true,
            });
            console.log("Logout successful:", response.data);
            navigate("/login");
        } catch (error) {
            console.log("Logout failed:", error.response.data);
        }
    };

    return (
        <div className={`navbar ${isNavbarClosed ? "" : "navbar-closed"}`}>
            <i className={`fa-solid fa-bars toggle-button`} onClick={toggleNavbar}></i>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/blogposts">Blog Posts</Link>
                    </li>
                    <li>
                        <Link to="/destinations">Destinations</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/logout" onClick={handleLogout}>Logout</Link>
                    </li>
                </ul>
            </nav>
            <footer>
                <p>&copy; 2023 OdysseyOpus.<br></br> All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Navbar;