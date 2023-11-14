import React from "react";
import "../components_styles/Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="navbar">
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
                        <Link to="/register">Register</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
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