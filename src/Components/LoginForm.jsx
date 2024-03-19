
import React, { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import "./LoginForm.css";

export default function LoginForm() {
    const [form, setForm] = useState({
        Email: "",
        Password: "",
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name === "Email") {
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

        if (name === "Password") {

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
                        password: "Password must be at least 8 characters long and include letters, numbers, and symbols.",
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

    const handleLogin = () => {
        if (!form.Email) {
            setErrors((prev) => ({
                ...prev,
                email: "Email is required",
            }));
            return;
        }
        if (!form.Password) {
            setErrors((prev) => ({
                ...prev,
                password: "Password is required",
            }));
            return;
        }

        console.log("data", form.Email, form.Password);
    };

    return (
        <>
            <div className="main-conatiner">
                <div className="container">
                    <div className="login_Form">
                        <div>
                            <h1>Login</h1>
                        </div>
                        <div className="input">
                            <div className="email">
                                <input
                                    type="text"
                                    name="Email"
                                    value={form.Email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                />
                                {errors.email && <p className="error">{errors.email}</p>}
                            </div>
                            <div className="password">
                                <input
                                    type="password"
                                    name="Password"
                                    value={form.Password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                />
                                {errors.password && <p className="error">{errors.password}</p>}
                            </div>
                        </div>
                        <div>
                            <p
                                style={{ color: "blue", fontSize: "0.90rem", cursor: "pointer" }}
                            >
                                Forgot password ?
                            </p>
                        </div>
                        <div className="login-btn">
                            <button onClick={handleLogin}>Login</button>
                            <p style={{ fontSize: "0.90rem" }}>
                                Don't have an account?{" "}
                                <span style={{ color: "blue", cursor: "pointer" }}>Signup</span>
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
                                        <span style={{ marginLeft: "4rem" }}>
                                            Login with Facebook
                                        </span>
                                    </div>
                                </button>
                            </div>
                            <div className="btn-google">
                                <button>
                                    <div className="iconGoogle">
                                        <FcGoogle fontSize={20} />
                                        <span style={{ marginLeft: "4rem" }}>
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
    );
}



