import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import ImageLight from "../../assets/img/forgot-password-office.jpeg";
import ImageDark from "../../assets/img/forgot-password-office-dark.jpeg";
import { Label, Input, Button } from "@windmill/react-ui";
import { fetchWithAuth, fetchApi } from "../../utils/callApi";
import checkNull from "../../utils/formValid";
import { useToast } from "../../context/ToastContext";

function ForgotPassword() {
  const { addToast } = useToast();
  const navigate = useNavigate();
  const emailRef = useRef();
  const btnClick = () => {
    if (!checkNull(emailRef)) return;
    const callApi = async () => {
      const response = await fetchApi("Authentication/ForgotPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: emailRef.current.value,
      });
      const data = response.data;
      if (response.code == "200") {
        addToast("success", data.message, 15000);
        navigate("/login");
      } else if (response.code) {
        addToast(
          "danger",
          response.code + ": " + data.errorCode + "-" + data.message,
          10000
        );
      }
    };
    callApi();
  };
  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Forgot password
              </h1>

              <Label>
                <span>Email</span>
                <Input ref={emailRef} className="mt-1" placeholder="Jane Doe" />
              </Label>

              <button
                className="transition-colors duration-150 font-medium focus:outline-none  
                py-2 rounded-lg text-sm text-white bg-purple-600 border-0 active:bg-purple-600 
                hover:bg-purple-700 focus:shadow-outline-purple w-full mt-4"
                onClick={btnClick}
              >
                Recover password
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
