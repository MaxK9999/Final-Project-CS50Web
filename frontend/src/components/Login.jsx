import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components_styles/Login.css";
import Heading from "./Heading";
import { registerUser, loginUser } from "../Api";

const Login = () => {
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    });
    
    const [registerData, setRegisterData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [isLoginView, setIsLoginView] = useState(true);

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await loginUser(loginData);
            console.log(response);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    const handleRegisterSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await registerUser(registerData);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    const handleToggleView = () => {
        setIsLoginView(!isLoginView);
        setLoginData({ username: "", password: "" });
        setRegisterData({ username: "", email: "", password: "", confirmPassword: "" });
    };
    

    return (
        <section className="login-page">
            <div className="heading">
                <Heading title={isLoginView ? "Login" : "Register"} />
            </div>
            {isLoginView ? (
                <div className="login-form">
                    <form onSubmit={handleLoginSubmit}>
                        <input
                            className="login-input"
                            type="text"
                            placeholder="Username"
                            value={loginData.username}
                            onChange={(event) =>
                                setLoginData({ ...loginData, username: event.target.value })
                            }
                        />
                        <input
                            className="login-input"
                            type="password"
                            placeholder="Password"
                            value={loginData.password}
                            onChange={(event) =>
                                setLoginData({ ...loginData, password: event.target.value })
                            }
                        />

                        <button className="submit" type="submit">Login</button>
                    </form>
                </div>


            ) : (


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