import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import ImageLight from "../../assets/img/forgot-password-office.jpeg";
import ImageDark from "../../assets/img/forgot-password-office-dark.jpeg";
import { Label, Input, Button } from "@windmill/react-ui";
import { fetchWithAuth, fetchApi } from "../../utils/callApi";
import checkNull from "../../utils/formValid";
import { useToast } from "../../context/ToastContext";

function ResetPassword() {
  const { addToast } = useToast();
  const passRef = useRef();
  const confirmRef = useRef();
  const params = new URLSearchParams(window.location.search);
  const email = params.get("email");
  const otp = params.get("otp");
  const btnClick = () => {
    if (!checkNull(passRef) || !checkNull(confirmRef)) return;
    if (confirmRef.current.value != passRef.current.value) {
      addToast("danger", "Password và Confirm password không khớp", 10000);
      return;
    }
    const callApi = async () => {
      const data = await fetchApi(
        "Authentication/ResetPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: { email: email, otp: otp, password: passRef.current.value },
        },
        () => {
          window.location.href = "/";
        },
        () => {
          addToast("danger",data.message,10000)
        }
      );
      console.log(data);
    };
    callApi();
  };
  useEffect(() => {
    if (email != null && otp != null) {
      const callApi = async () => {
        const data = await fetchApi(
          "Authentication/ConfirmResetPassword",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: { email: email, otp: otp },
          },
          null,
          () => {
            window.location.href = "/app";
          }
        );
        console.log(data);
      };
      callApi();
    }
  }, []);
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
                <span>Password</span>
                <Input
                  ref={passRef}
                  type="password"
                  className="mt-1"
                  placeholder="***************"
                />
              </Label>
              <Label className="mt-2">
                <span>Confirm password</span>
                <Input
                  ref={confirmRef}
                  type="password"
                  className="mt-1"
                  placeholder="***************"
                />
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

export default ResetPassword;
