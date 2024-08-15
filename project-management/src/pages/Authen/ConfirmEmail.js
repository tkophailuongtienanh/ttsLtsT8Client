import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import ImageLight from "../../assets/img/login-office.jpeg";
import ImageDark from "../../assets/img/login-office-dark.jpeg";
import { GithubIcon, TwitterIcon } from "../../icons";
import { Label, Input, Button } from "@windmill/react-ui";
import Cookie from "js-cookie";
import fetchWithAuth from "../../utils/callApi";
import { useToast } from "../../context/ToastContext";
import { disableRightBtn, enableRightBtn } from "../../utils/formValid";

function ConfirmEmail() {
  const { addToast } = useToast();
  const [lastSent, setLastSent] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const optRef = useRef("");
  const btnRef = useRef();
  const token = Cookie.get("token");
  const navigate = useNavigate();

  const confirmClick = async () => {
    try {
      const response = await fetchWithAuth("Authentication/ConfirmEmail", {
        method: "POST",
        body: optRef.current.value,
      });
      navigate("/app");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    resendEmail();
  }, []);
  useEffect(() => {
    const calculateTimeRemaining = () => {
      if (lastSent) {
        const elapsed = Date.now() - lastSent;
        const remaining = parseInt(Math.max(0, 60000 - elapsed) / 1000); // 60000 ms = 1 minute
        setTimeRemaining(remaining);
        if(remaining > 0){
          disableRightBtn(btnRef);
        } else {
          enableRightBtn(btnRef);
        }
      }
    };

    calculateTimeRemaining();
    const interval = setInterval(() => {
      calculateTimeRemaining();
    }, 1000);

    return () => clearInterval(interval);
  }, [lastSent]);
  const resendEmail = () => {
    if (timeRemaining > 0) {
      return;
    }
    const fetchData = async () => {
      try {
        const response = await fetchWithAuth(
          "Authentication/ConfirmEmailInvoke"
        );
        if (response.message) {
          setLastSent(Date.now());
          addToast("success", response.message, 30000);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
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
                Confirm Email
              </h1>
              <p className="text-green-500">
                We sent you an OTP to your email. Please check your mail
              </p>
              <Label className="mt-4">
                <span>Otp</span>
                <div className="relative text-gray-500 focus-within:text-purple-600">
                  <input
                    ref={optRef}
                    className="block w-full pr-20 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 
                    dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple 
                    dark:focus:shadow-outline-gray form-input"
                    placeholder="xxxxxx"
                  />
                  <button
                    ref={btnRef}
                    onClick={resendEmail}
                    disabled={timeRemaining > 0}
                    className="absolute inset-y-0 right-0 px-4 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-r-md active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                  >
                    Gửi lại {timeRemaining > 0 && " (" + timeRemaining + "s)"}
                  </button>
                </div>
              </Label>
              <button
                className="transition-colors duration-150 font-medium focus:outline-none  
                py-2 rounded-lg text-sm text-white bg-purple-600 border-0 active:bg-purple-600 
                hover:bg-purple-700 focus:shadow-outline-purple w-full mt-4"
                onClick={confirmClick}
              >
                Confirm
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default ConfirmEmail;
