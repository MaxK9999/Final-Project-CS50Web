import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components_styles/Login.css";
import Heading from "./Heading";
import { api } from "../Api";


const Login = () => {
    const [loginData, setLoginData] = useState({ username: "", password: "" });
    const [registerData, setRegisterData] = useState({ username: "", email: "", password: "" });
    const [isLoginView, setIsLoginView] = useState(true);
    const navigate = useNavigate();

    const handleLoginSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await api.post("login/", loginData);
            console.log("Login successful:", response.data);
            navigate("/");
        } catch (error) {
            console.log("Login failed:", error.response.data);
        }
    };

    const handleRegisterSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await api.post("register/", registerData);
            console.log("Registration successful:", response.data);
            navigate("/login");
        } catch (error) {
            console.log("Registration failed:", error.response.data);
        }
    };
    
    // toggle between login and register
    const handleToggleView = () => {
        setIsLoginView(!isLoginView);
        setLoginData({ username: "", password: "" });
        setRegisterData({ username: "", email: "", password: "", confirmPassword: "" });
    };
    

    return (
        <section className="login-page">
            <div className="login-bg"></div>
            <div className="heading">
                <Heading title={isLoginView ? "Login" : "Register"} />
            </div>
            {isLoginView ? (

                // login form
                <div className="login-form">
                    <form onSubmit={handleLoginSubmit}>
                        <input
                            className="login-input"
                            type="text"
                            placeholder="Username"
                            value={loginData.username}
                            onChange={(event) => setLoginData({ ...loginData, username: event.target.value })}
                        />
                        <input
                            className="login-input"
                            type="password"
                            placeholder="Password"
                            value={loginData.password}
                            onChange={(event) => setLoginData({ ...loginData, password: event.target.value })}
                        />

                        <button className="submit" type="submit">Login</button>
                    </form>
                </div>


            ) : (

                // register form
                <div className="login-form">
                    <form onSubmit={handleRegisterSubmit}>
                            <input
                                className="login-input"
                                type="text"
                                placeholder="Username"
                                value={registerData.username}
                                onChange={(event) =>
                                    setRegisterData({ ...registerData, username: event.target.value })
                                }
                            />
                            <input
                                className="login-input"
                                type="email"
                                placeholder="Email"
                                value={registerData.email}
                                onChange={(event) =>
                                    setRegisterData({ ...registerData, email: event.target.value })
                                }
                            />
                            <input
                                className="login-input"
                                type="password"
                                placeholder="Password"
                                value={registerData.password}
                                onChange={(event) =>
                                    setRegisterData({ ...registerData, password: event.target.value })
                                }
                            />
                            <input
                                className="login-input"
                                type="password"
                                placeholder="Confirm Password"
                                value={registerData.confirmPassword}
                                onChange={(event) =>
                                    setRegisterData({ ...registerData, confirmPassword: event.target.value })
                                }
                            />
                        <button className="submit" type="submit">Register</button>
                    </form>
                </div>
            )}
            {isLoginView ? (
                <p>
                    Don't have an account?{" "} 
                    <button className="login-button" onClick={handleToggleView}>Register here</button>
                </p>
            ) : (
                <p>
                    Already have an account?{" "}
                    <button className="login-button" onClick={handleToggleView}>Login here</button>
                </p>
            )}
        </section>
    );
};

export default Login;