import React, { useState } from "react";
import "../components_styles/Navbar.css";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { logoutUser } from "../Api";

const Navbar = () => {
    const [isNavbarClosed, setIsNavbarClosed] = useState(false);
    const { isAuthenticated, logout } = useAuth();

    const handleLogout = async (event) => {
        // prevent default behavior
        event.preventDefault();
        try {
            await logoutUser();
            logout(true);
        } catch (error) {
            console.log("Error logging out:", error);
        }
    };

    const toggleNavbar = () => {
        setIsNavbarClosed(!isNavbarClosed);
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
                    {isAuthenticated && (
                        <li>
                            <Link to="/profile">Profile</Link>
                        </li>
                    )}
                    {isAuthenticated ? (
                        <li>
                            <Link to="/" onClick={handleLogout}>Logout</Link>
                        </li>
                    ) : (
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    )}
                </ul>
            </nav>
            <footer>
                <p>&copy; 2023 OdysseyOpus.<br></br> All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Navbar;