import React, { useState } from "react";
import "../components_styles/Login.css";
import Heading from "./Heading";

const Login = () => {
    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
    });

    const [isLoginView, setLoginView] = useState(true);

    const handleLoginSubmit = (event) => {
        event.preventDefault();
        // Add logic for handling login
    }

    const handleToggleView = () => {
        setLoginView(!isLoginView);
    }

    return (
        <section className="login-page">
            <div className="heading">
                <Heading title={isLoginView ? "Login" : "Register"} />
                <p className="description">
                    {isLoginView
                        ? "Welcome back! Please login to your account."
                        : "Create a new account. Sign up today!"}
                </p>
                <form onSubmit={handleLoginSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={loginData.username}
                            onChange={(event) => setLoginData({ ...loginData, username: event.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={loginData.password}
                            onChange={(event) => setLoginData({ ...loginData, password: event.target.value })}
                        />
                    </div>
                    <button type="submit">{isLoginView ? "Login" : "Register"}</button>
                </form>
                <button onClick={handleToggleView}>
                    {isLoginView ? "Need an account? Register" : "Already have an account? Login"}
                </button>
            </div>
        </section>
    )
}

export default Login;