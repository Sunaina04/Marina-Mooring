import "./SignUp.css";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useSignupMutation } from "../../Services/Authentication/authApi";
import { SIGNUP_PAYLOAD, SIGNUP_RESPONSE } from "../../Services/Authentication/AuthTypes";
import { useState, ChangeEvent, FormEvent, useRef } from "react";
import { Toast } from 'primereact/toast';

const SignUp = () => {
  const [signupPayload, setSignupPayload] = useState<SIGNUP_PAYLOAD>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const { firstname, lastname, email, password, phoneNumber } = signupPayload;

  const [signup] = useSignupMutation();
  const toast = useRef<any>(null); // Ref for toast message

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupPayload((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Validation for email
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        // Show toast message for invalid email format
        toast.current?.show({
          severity: "error",
          summary: "Invalid Email",
          detail: "Please enter a valid email address",
        });
      }
    }

    // Validation for phone number
    if (name === "phoneNumber") {
      const phoneRegex = /^\d{10}$/; // Assuming phone number is 10 digits
      if (!phoneRegex.test(value)) {
        // Show toast message for invalid phone number format
        toast.current?.show({
          severity: "error",
          summary: "Invalid Phone Number",
          detail: "Please enter a valid 10-digit phone number",
        });
      }
    }
  };

  const signUpHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await signup(signupPayload);
      console.log("response", response);
      // Handle success response
      const { data } = response as SIGNUP_RESPONSE;
      if (data?.status === 200) {
        // Reset sign-up fields
        setSignupPayload({
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          phoneNumber: "",
        });
        // Show toast message for successful sign-up
        toast.current?.show({
          severity: "success",
          summary: data.message,
        });
      }
    } catch (error) {
      console.error("Error occurred during signup:", error);
      // Handle error response
      // You can add error handling logic here if needed
    }
  };

  return (
    <div className="main-container">
      <form onSubmit={signUpHandler}>
        <div className="container">
          <div className="signUp_Form">
            <h1>SignUp</h1>
            <div className="input">
              <div className="firstName">
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstname"
                  value={firstname}
                  required
                  onChange={inputChangeHandler}
                />
              </div>
              <div className="lastName">
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lastname"
                  value={lastname}
                  required
                  onChange={inputChangeHandler}
                />
              </div>
              <div className="contact">
                <input
                  type="text"
                  placeholder="Contact No."
                  name="phoneNumber"
                  value={phoneNumber}
                  required
                  onChange={inputChangeHandler}
                />
              </div>
              <div className="text">
                <input
                  type="email"
                  placeholder="Email"
                  id="email"
                  name="email"
                  value={email}
                  required
                  onChange={inputChangeHandler}
                />
              </div>
              <div className="password">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  name="password"
                  required
                  onChange={inputChangeHandler}
                />
              </div>
            </div>
            <div className="signUp-btn">
              <button type="submit">SignUp</button>
              <p style={{ fontSize: "0.90rem" }}>
                Already have an account?
                <Link to="/login">
                  {" "}
                  <span style={{ color: "blue", cursor: "pointer" }}>
                    Login
                  </span>
                </Link>
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
      </form>
      <Toast ref={toast}></Toast> {/* Toast component for displaying messages */}
    </div>
  );
};

export default SignUp;
