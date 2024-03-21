import React, { useEffect, useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import "./LoginForm.css";
import {
  useGetEmployeeMutation,
  useLoginMutation,
} from "../Services/authentication/authApi";
import {
  ErrorResponse,
  LOGIN_RESPONSE,
} from "../Services/authentication/types";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../store/Slice/userSlice";
import { Link } from "react-router-dom";

export default function LoginForm() {
  const dispatch = useDispatch();
  const [loginPayload, setLoginPayload] = useState({
    username: "",
    password: "",
  });
  const { username, password } = loginPayload;
  const userData = useSelector((state: any) => state.user?.userData);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  console.log("userData", userData)
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setLoginPayload((prev) => ({
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
        const passwordRegex =
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
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

  /* ***************************************************
   * NOTE: API Hooks
   ****************************************************/
  const [login] = useLoginMutation();
  const [getEmployee] = useGetEmployeeMutation();

  const signInHandler = async () => {
    
    if (!username) {
      setErrors((prev) => ({
        ...prev,
        email: "Email is required",
      }));
      return;
    } else if (!password) {
      setErrors((prev) => ({
        ...prev,
        password: "Password is required",
      }));
      return;
    }

    await login(loginPayload)
      .unwrap()
      .then(async (response) => {
        const { status, message: msg, user, token } = response as LOGIN_RESPONSE;
        if (status === 200) {
          console.log("data", user , response);
          dispatch(setUserData({ ...user }));
          localStorage.setItem("token", token);
        }
      })
      .catch((err) => {
        if (err.data) {
          const { message: msg } = err.data as ErrorResponse;
        }
      });
  };

  const getEmployeeHandler = async () => {
    const response = await getEmployee({});
    console.log("response", response);
  };

  useEffect(() => {
    getEmployeeHandler();
  }, []);

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
                  name="username"
                  value={username}
                  onChange={handleChange}
                  placeholder="Email"
                  className="px-4 py-2"
                />
                {errors.email && <p className="error">{errors.email}</p>}
              </div>
              <div className="password">
                <input
                  type="text"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="px-4 py-2"
                />
                {errors.password && <p className="error">{errors.password}</p>}
              </div>
            </div>
            <div>
              <p
                style={{
                  color: "blue",
                  fontSize: "0.90rem",
                  cursor: "pointer",
                }}
              >
                Forgot password
              </p>
            </div>
            <div className="login-btn">
              <button onClick={signInHandler}>Login</button>

              <p style={{ fontSize: "0.90rem" }}>
                Don`t have an account?
                <Link to="/signup">
                  {" "}
                <span style={{ color: "blue", cursor: "pointer" }}>Signup</span>
                </Link>
              </p>
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
