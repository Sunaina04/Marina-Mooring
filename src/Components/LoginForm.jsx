import React, { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import "./FormLogin.css"
import { useLoginMutation } from "../Services/authentication/authApi";
import { Link } from "react-router-dom";

export default function LoginForm() {

    const [loginPayload, setLoginPayload] = useState({
        username: "",
        password: "",
    });
    const { username, password } = loginPayload;

    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        // console.log(e.target.value);

        setLoginPayload((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        if (name === "username") {
            if (!value) {
                setErrors((prev) => ({
                    ...prev,
                    email: "",
                }));
            } else {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    setErrors((prev) => ({
                        ...prev,
                        email: "Invalid email format",
                    }));
                } else {
                    setErrors((prev) => ({
                        ...prev,
                        email: "",
                    }));
                }
            }
        }

        if (name === "password") {
            if (!value) {
                setErrors((prev) => ({
                    ...prev,
                    password: "",
                }));
            } else {
                const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
                if (!passwordRegex.test(value)) {
                    setErrors((prev) => ({
                        ...prev,
                        password:
                            "Password must be at least 8 characters long and include letters, numbers, and symbols.",
                    }));
                } else {
                    setErrors((prev) => ({
                        ...prev,
                        password: "",
                    }));
                }
            }
        }
    };


    const [login] = useLoginMutation();
    const signInHandler = async () => {
        try {
            if (!username) {
                setErrors((prev) => ({
                    ...prev,
                    email: "Email is required",
                }));
                return;
            }
            if (!password) {
                setErrors((prev) => ({
                    ...prev,
                    password: "Password is required",
                }));
                return;
            }

            console.log("data", username, password);
            console.log("Attempting login...", loginPayload);

            const response = await login(loginPayload);

            console.log("RESPONSE >>>", response);

            // Handle response based on status
            if (response.status === 200) {
                // Login successful
                console.log("Login successful!");
            } else {
                // Handle other status codes
                console.error("Login failed with status:", response.status);
            }
        } catch (error) {
            console.error("Error occurred during login:", error);
            // Handle specific error types if needed
            if (
                error instanceof TypeError &&
                error.message.includes("NetworkError")
            ) {
                console.error(
                    "Network error occurred. Please check your internet connection."
                );
            } else {
                console.error("Unexpected error occurred during login:", error);
            }
        }
    };

    /* ***************************************************
     * NOTE: API Hooks
     ****************************************************/

    return (
        <>
            <div className="main-conatiner">
                <div className="container">
                    <div className="login_Form">
                        <div className="login-Heading">
                            <h1>Login</h1>
                        </div>
                        <div className="input">
                            <div className="email">
                                <input
                                    type="text"
                                    name="username"
                                    value={loginPayload.username}
                                    onChange={handleChange}
                                    placeholder="Email"
                                />
                                {errors.email && <p className="error">{errors.email}</p>}
                            </div>
                            <div className="password">
                                <input
                                    type="password"
                                    name="password"
                                    value={loginPayload.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                />
                                {errors.password && <p className="error">{errors.password}</p>}
                            </div>
                        </div>
                        <div>
                            <p

                                className="forgotPass"

                            >
                                Forgot password ?
                            </p>
                        </div>
                        <div className="login-btn">
                            <button onClick={signInHandler}>Login</button>
                            <p className="dont-have-account">
                                Don't have an account?{" "}
                                <span style={{ color: "blue", cursor: "pointer" }}>Sign-up</span>
                            </p>
                        </div>
                        <div className="other">
                            <hr />
                        </div>
                        <div className="btn-Container">
                            <div className="btn-facebook">
                                <button>
                                    <div className="iconFacebook">
                                        <FaFacebook fontSize={20} />
                                        <span className="sinup" >
                                            Login with Facebook
                                        </span>
                                    </div>
                                </button>
                            </div>
                            <div className="btn-google">
                                <button>
                                    <div className="iconGoogle">
                                        <FcGoogle fontSize={20} />
                                        <span className="sinup">
                                            Login with Google
                                        </span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}