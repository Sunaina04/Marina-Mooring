import React, { useEffect, useRef, useState } from "react";
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
import { InputText } from "primereact/inputtext";

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
        const passwordRegex =
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        if (!passwordRegex.test(value)) {
          setErrors((prev) => ({
            ...prev,
            password:
              "password must be at least 8 characters long and include letters, numbers, and symbols.",
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
    // navigate("/admin/dashboard");
    // if (!username) {
    //   setErrors((prev) => ({
    //     ...prev,
    //     email: "username is required",
    //   }));
    //   return;
    // } else if (!password) {
    //   setErrors((prev) => ({
    //     ...prev,
    //     password: "password is required",
    //   }));
    //   return;
    // }

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
        navigate("/dashboard");
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
            <div className="p-input-icon-left" style={{ position: "relative" }}>
              <InputText
                style={{
                  width: "40vw",
                  height: "6vh",
                  padding: "0 4rem 0 3rem",
                  border: "1px solid gray",
                  fontSize: "1.10vw",
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
                placeholder={showSinUp ? "New password" : "Enter Your username"}
                name="username"
                onChange={handleChange}
              />
              <span
                className="w-5 h-5 absolute top-1/2 transform -translate-y-1/2 left-3  text-gray-400"
                style={{
                  backgroundImage: `url(${
                    showSinUp
                      ? "/assets/images/key.png"
                      : "/assets/images/email.png"
                  })`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                }}
              ></span>
            </div>
          </div>

          <div className="mb-3">
            <div className="p-input-icon-left" style={{ position: "relative" }}>
              <InputText
                style={{
                  width: "40vw",
                  height: "6vh",
                  padding: "0 4rem 0 3rem",
                  border: "1px solid gray",
                  fontSize: "1.10vw",
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
                placeholder={showSinUp ? "Confirm password" : "password"}
                name="password"
                onChange={handleChange}
              />
              <span
                className="w-5 h-5 absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400"
                style={{
                  backgroundImage: `url(assets/images/key.png)`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                }}
              ></span>
            </div>

            {!showSinUp && (
              <>
                <div className="flex justify-end mt-8 cursor-pointer ">
                  <Link to={"/forgotPass"}>
                    <p className="font-normal font-['Roboto']">
                      Forgot password?
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
