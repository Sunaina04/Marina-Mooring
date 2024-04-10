import React from "react";
import InputComponent from "../Common/InputComponent";
import ButtonComponent from "../Common/ButtonComponent";
import { useNavigate } from "react-router-dom";
import { useValidateEmailMutation } from "../../Services/authentication/authApi";
import { validateEmailResponse } from "../../Services/authentication/types";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [validateEmail] = useValidateEmailMutation();
  const token =  localStorage.getItem("token");
  
  const validateEmailHandler =  async() => {
    const response = await validateEmail({token});
    console.log("RESPONSE" , response)
    navigate("/resetpass")
    // const {status} = response as validateEmailResponse;
  }

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="text-center">
          <div className="mb-4">
            <div>
              <img
                src="/assets/images/Moorfind.png"
                alt="Logo"
                className="w-full h-64 bg-black mb-5"
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="p-input-icon-left">
              <InputComponent
                style={{
                  width: "40vw",
                  height: "6vh",
                  padding: "0 3rem",
                  border: "1px solid gray",
                  fontSize: "1.20rem",
                }}
                type="email"
                placeholder="Enter Your Registered email"
              />
            </div>
            <div className="flex  mt-8 cursor-pointer ">
              <p className="w-[42vw] text-xs font-bold">
                If you are having trouble logging in, please enter the email
                address registered with MOORFIND. If it is a valid email
                address, you will be sent an email allowing you to resest your
                password.
              </p>
            </div>
          </div>

          <ButtonComponent
            style={{
              width: "10vw",
              height: "6vh",
              backgroundColor: "black",
              color: "white",
              border: "1px solid black",
              fontWeight: "bold",
              fontSize: "1.50rem",
            }}
            label={"Submit"}
            onClick={validateEmailHandler}
          />

          <div className="flex justify-center flex-col mt-4">
            <h1>Back</h1>
          </div>

          <div className="flex justify-center ">
            <span className="w-8 h-[0.50px] bg-black text-blue-700 flex justify-center"></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
