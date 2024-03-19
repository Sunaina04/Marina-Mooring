import React from "react";
import { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import "./LoginForm.css"
export default function LoginForm() {
    const [form, setForm] = useState({

        Email: '',
        Password: '',

    })



    const handleChange = (e) => {

        // console.log(e.target.value);

        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }


    const handleLogin = _ => {
        console.log("data", form.Email, form.Password);

      

    }
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
                                <input type="text" name="Email" onChange={handleChange} placeholder="Email" className="px-4 py-2" />

                            </div>
                            <div className="password">
                                <input type="text" name="Password" onChange={handleChange} placeholder="Password" className="px-4 py-2" />

                            </div>
                        </div>
                        <div >
                            <p style={{ color: "blue", fontSize: "0.90rem", cursor:"pointer" }}>Forgot password</p>
                        </div>
                        <div className="login-btn">
                            <button onClick={handleLogin}>Login</button>

                            <p style={{ fontSize: "0.90rem" }}>Don`t have an account? <span style={{ color: "blue", cursor:"pointer" }}>Signup</span></p>
                        </div>
                        <div className="other">
                            <hr />

                        </div>
                        <div className="btn-Container">
                            <div className="btn-facebook">
                                <button>

                                    <div className="iconFacebook">

                                        <FaFacebook fontSize={20} />

                                        <span style={{ marginLeft: "4rem", }}>
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
    )
}