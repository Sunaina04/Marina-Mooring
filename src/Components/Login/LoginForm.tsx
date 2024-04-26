import React, { useEffect, useRef, useState } from "react";
import {
  useGetEmployeeMutation,
  useLoginMutation,
  useResetPasswordMutation,
} from "../../Services/Authentication/AuthApi";
import {
  ErrorResponse,
  LOGIN_RESPONSE,
  RESET_PASSSWORD_RESPONSE,
} from "../../Types/AuthTypes";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../Store/Slice/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";

interface LoginFormProps {
  Label: string;
  typeEmail: string;
  typePass: string;
  showSinUp: boolean;
  admin?: boolean;
}

export default function LoginForm({
  Label,
  typeEmail,
  typePass,
  showSinUp,
  admin,
}: LoginFormProps) {
  const dispatch = useDispatch();
  const toast = useRef<any>(null);
  const [loginPayload, setLoginPayload] = useState({
    username: "",
    password: "",
  });
  const { username, password } = loginPayload;
  const userData = useSelector((state: any) => state.user?.userData);
  const token = localStorage?.getItem("token");
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setLoginPayload((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ***************************************************
   * NOTE: API Hooks
   ****************************************************/
  const [login] = useLoginMutation();
  const [getEmployee] = useGetEmployeeMutation();
  const [resetPassword] = useResetPasswordMutation();

  const signInHandler = async () => {

    if (loginPayload.username.length===0) {
      setErrors((prev) => ({
        ...prev,
        email: "Email cannot be empty",
      }));
    }

    if (loginPayload.password.length===0) {
      setErrors((prev) => ({
        ...prev,
        password: "Password cannot be empty",
      }));
    
    }
    
    if (admin) {
      // try {
      //   const response = await login(loginPayload).unwrap();
      //   const { status, user, token, message } = response as LOGIN_RESPONSE;
      //   if (status === 200) {
      //     console.log("data", user, response);
      //     dispatch(setUserData({ ...user }));
      //     localStorage.setItem("token", token);
      //     setLoginPayload({
      //       username: "",
      //       password: "",
      //     });
      //     toast.current?.show({
      //       severity: "success",
      //       summary: message,
      //     });
      navigate("/admin/login/permission");
      //   }
      // } catch (error: any) {
      //   console.error("Error occurred during login:", error);
      //   if (error.data) {
      //     const { message: msg } = error.data as ErrorResponse;
      //   }
      // }
    } else {
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
    }

    // const validationError = PasswordValidation(loginPayload.username, loginPayload.password, "");
    // if (validationError) {
    //   setErrors((prev) => ({
    //     ...prev,
    //     email: validationError,
    //   }));

    // }
    // if (validationError) {
    //   setErrors((prev) => ({
    //     ...prev,
    //     password: validationError,
    //   }));
    //   return;
    // }

  };

  const ResetPasswordHandler = async () => {
    console.log("RESET PASSWORD");
    const resetPassPayload = {
      newPassword: "", // Add your new password here
      confirmPassword: "", // Add your confirm password here
    };
    try {
      const response = await resetPassword({
        payload: resetPassPayload,
        token: token, // Make sure 'token' is defined in your scope
      }).unwrap();
      const { status, content, message } = response as RESET_PASSSWORD_RESPONSE;
      if (status === 200) {
        navigate("/dashboard");
      }
    } catch (error: any) {
      console.error("Error occurred during password reset:", error);
      if (error.data) {
        const { message: msg } = error.data as ErrorResponse;
        // Handle error message if needed
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
            <div className="text-red-500">
              {errors.email}
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
                placeholder={showSinUp ? "New password" : "Enter Your email"}
                name="username"
                value={username} // Bind value to username state
                onChange={handleChange}
              />
              <span
                className="w-5 h-5 absolute top-1/2 transform -translate-y-1/2 left-3  text-gray-400"
                style={{
                  backgroundImage: `url(${showSinUp
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
                placeholder={showSinUp ? "Confirm password" : "Password"}
                name="password"
                value={password} // Bind value to password state
                onChange={handleChange}
              />
              <span
                className="w-5 h-5 absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400"
                style={{
                  backgroundImage: `url(${admin ? "/assets/images/key.png" : "/assets/images/key.png"
                    })`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                }}
              ></span>
            </div>

            {!showSinUp && !admin && (
              <>
                <div className="flex justify-end mt-8 cursor-pointer ">
                  <Link to={"/forgotPassword"}>
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
          <div className="flex flex-col items-center">
            {admin && <span className="mb-8">For admin use only</span>}{" "}
            <button
              className="w-40 h-12 bg-black text-white border border-black font-bold text-sm"
              onClick={showSinUp ? ResetPasswordHandler : signInHandler}
            >
              {Label}
            </button>
          </div>
        </div>
      </div>
      {!admin && (
        <div className="flex justify-center items-center mt-0">
          <div className="text-center mx-auto" style={{ width: "40vw" }}>
            <p className="text-xs font-bold">
              Just testing the waters? If you do not have an account{" "}
              <span className="underline font-bolder">CLICK HERE</span> to let
              us know you would like to connect and see if MOORFIND can work for
              you and your business.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
