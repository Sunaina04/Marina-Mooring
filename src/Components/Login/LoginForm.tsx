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
import { Link } from "react-router-dom";
import { Toast } from "primereact/toast";
import ButtonComponent from "../Common/ButtonComponent";
import InputComponent from "../Common/InputComponent";
// import { MdEmail } from "react-icons/md";

export default function LoginForm() {
  const dispatch = useDispatch();
  const toast = useRef<any>(null);
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

        <div className="w-[35vw] h-72   flex justify-center items-center">

          <div>

            <div className="flex justify-center">
              <img src="" alt="Logo" />
            </div>
            <div>
              <span className="p-input-icon-left">

                {/* <MdEmail className="mr-24 text-2xl" /> */}
                <InputComponent

                  placeholder={"Enter you email"}
                  type={"email"}
                  style={{ width: "30vw", height: "auto", padding: "0.80rem 2rem", border: "1px solid gray", }}

                />
              </span>

            </div>

            <div className="mt-5">
              <span className="p-input-icon-left">
                {/* <i className="pi pi-search" /> */}
                <InputComponent
                  placeholder={"Password"}
                  type={"password"}
                  style={{ width: "30vw", height: "5vh", padding: "1.50rem", fontSize: "1rem", border: "1px solid gray" }} />
              </span>

              <div className="flex justify-end mt-4">
                <p>Forgot passwrod?</p>

              </div>
            </div>

            <div className="flex justify-center items-center mt-5">
              <ButtonComponent
                style={{ backgroundColor: "black", border: "1px solid black", width: "9rem", color: "white" }}
                onClick={function (): void {
                  throw new Error("Function not implemented.");
                }} label={"Login"} />
            </div>

          </div>

        </div>

      </div>

    </>
  );
}



