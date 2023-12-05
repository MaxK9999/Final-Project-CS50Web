import React, { useState, useContext, createContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check for the presence of session in local storage
    useEffect(() => {
        const session = localStorage.getItem("sessionid");

        // If session exists, set isAuthenticated to true
        if (session) {
            setIsAuthenticated(true);
        }
    }, []);

    const login = () => {
        // Set session in local storage
        localStorage.setItem("sessionid", "sessionid");
        setIsAuthenticated(true);
    };
    
    const logout = () => {
        // Remove session from local storage
        localStorage.removeItem("sessionid");
        setIsAuthenticated(false);
    };
    
    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
}