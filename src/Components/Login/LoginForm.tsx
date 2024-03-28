import React, { useEffect, useRef, useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import "./LoginForm.css";
import {
  useGetEmployeeMutation,
  useLoginMutation,
} from "../../Services/authentication/authApi";
import {
  ErrorResponse,
  LOGIN_RESPONSE,
} from "../../Services/authentication/types";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../store/Slice/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import ButtonComponent from "../Common/ButtonComponent";
import InputComponent from "../Common/InputComponent";
import SignUp from "../SignUp/SignUp";

interface LoginFormProps {
  Label: string;
  typeEmail: string;
  typePass: string;
  showSinUp: boolean;
}

export default function LoginForm({
  Label,
  typeEmail,
  typePass,
  showSinUp,
}: LoginFormProps) {
  const dispatch = useDispatch();
  const toast = useRef<any>(null);
  const [loginPayload, setLoginPayload] = useState({
    username: "",
    password: "",
  });
  const { username, password } = loginPayload;
  const userData = useSelector((state: any) => state.user?.userData);
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  console.log("userData", userData);
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
    console.log("IN SIGN IN");
    navigate("/admin");
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

    try {
      const response = await login(loginPayload).unwrap();
      const { status, user, token, message } = response as LOGIN_RESPONSE;
      if (status === 200) {
        console.log("data", user, response);
        dispatch(setUserData({ ...user }));
        localStorage.setItem("token", token);
        setLoginPayload({
          username: "",
          password: "",
        });
        toast.current?.show({
          severity: "success",
          summary: message,
        });
        navigate("/admin");
      }
    } catch (error: any) {
      console.error("Error occurred during login:", error);
      if (error.data) {
        const { message: msg } = error.data as ErrorResponse;
      }
    }
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
      <div className="w-full h-screen flex justify-center items-center">
        <div className="text-center">
          <div className="mb-3">
            <div>
              <img
                src="/assets/images/Moorfind.png"
                alt="Logo"
                className="w-full h-80 bg-black mb-5"
              />
            </div>
            <div className="p-input-icon-left">
              {showSinUp ? (
                <img
                  src="/assets/images/key.png"
                  alt="icon"
                  className="p-icon w-5"
                />
              ) : (
                <img
                  src="/assets/images/email.png"
                  alt="icon"
                  className="p-icon w-5"
                />
              )}

              <InputComponent
                style={{
                  width: "40vw",
                  height: "6vh",
                  padding: "0 3rem",
                  border: "1px solid gray",
                  fontSize: "1.20vw",
                  // fontFamily: "Roboto",
                }}
                type={
                  showSinUp
                    ? typeEmail === "password"
                      ? "password"
                      : "text"
                    : typeEmail === "email"
                    ? "email"
                    : "text"
                }
                placeholder={showSinUp ? "New Password" : "Enter Your Email"}
                name="Email"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-6">
            <div className="p-input-icon-left">
              <img
                src="/assets/images/key.png"
                alt="icon"
                className="p-icon  w-5"
              />

              <InputComponent
                style={{
                  width: "40vw",
                  height: "6vh",
                  padding: "0 3rem",
                  border: "1px solid gray",
                  fontSize: "1.20vw",
                  // fontFamily: "Roboto",
                }}
                type={
                  showSinUp
                    ? typePass === "password"
                      ? "password"
                      : "text"
                    : typePass === "password"
                    ? "password"
                    : "text"
                }
                placeholder={showSinUp ? "Confirm Password" : "Password"}
                onChange={handleChange}
                name="Password"
              />
            </div>
            {showSinUp ? (
              " "
            ) : (
              <>
                <div className="flex justify-end mt-8 cursor-pointer ">
                  <Link to={"/forgotPass"}>
                    <p className="font-normal font-['Roboto']">
                      Forgot Password ?
                    </p>
                  </Link>
                </div>

                <div className="flex justify-end">
                  <span className="w-[7.40rem] h-[0.50px] bg-black text-black "></span>
                </div>
              </>
            )}
          </div>

          <ButtonComponent
            style={{
              width: "10vw",
              height: "6vh",
              backgroundColor: "black",
              color: "white",
              border: "1px solid black",
              fontWeight: "700",
              letterSpacing: "0.2px",
              fontSize: "1.50vw",
              // fontFamily: "Roboto",
            }}
            label={showSinUp ? Label : Label}
            onClick={signInHandler}
          />
        </div>
      </div>
    </>
  );
}
