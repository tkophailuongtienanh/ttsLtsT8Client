import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import ImageLight from "../../assets/img/login-office.jpeg";
import ImageDark from "../../assets/img/login-office-dark.jpeg";
import { GithubIcon, TwitterIcon } from "../../icons";
import { Label, Input, Button } from "@windmill/react-ui";
import Cookie from "js-cookie";
import { fetchWithAuth, fetchApi } from "../../utils/callApi";
import checkNull from "../../utils/formValid";
import { useToast } from "../../context/ToastContext";

function Login() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [token, setToken] = useState(Cookie.get("token"));
  console.log("token", token);
  const emailRef = useRef();
  const passRef = useRef();
  useEffect(() => {
    try {
      const url = "https://localhost:7242/api/Authentication/Get";
      const headers = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
      console.log("headers['Authorization']", headers["Authorization"]);

      // Thiết lập cấu hình cho fetch
      const config = {
        method: "GET", // Mặc định là GET
        headers,
      };

      const callApi = async () => {
        const response = await fetch(url, config);
        if (response.ok) {
          var data = await response.json();
          console.log("data", data);
          if (data.errorCode == 1005) {
            addToast("danger", "Vui lòng xác thực email để tiếp tục", 10000);
            navigate("/confirmEmail");
          } else window.location.href = "/app";
        }
      };
      callApi();
    } catch (error) {}
  }, [token]);
  const loginBtnClick = async () => {
    if (!checkNull(emailRef) || !checkNull(passRef)) return;
    const userLogin = {
      email: emailRef.current.value,
      password: passRef.current.value,
    };
    console.log("log", userLogin);

    const data = await fetchApi("Authentication/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: userLogin,
    });
    console.log(data);

    if (data.token) {
      Cookie.set("token", data.token);
      setToken(data.token);
    } else if (data.errorCode) {
      addToast("danger", data.message, 10000);
    }
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
                Login
              </h1>
              <Label>
                <span>Email</span>
                <Input
                  ref={emailRef}
                  className="mt-1"
                  type="email"
                  placeholder="john@doe.com"
                />
              </Label>
              <Label className="mt-4">
                <span>Password</span>
                <Input
                  ref={passRef}
                  className="mt-1"
                  type="password"
                  placeholder="***************"
                />
              </Label>
              <button
                className="transition-colors duration-150 font-medium focus:outline-none  
                py-2 rounded-lg text-sm text-white bg-purple-600 border-0 active:bg-purple-600 
                hover:bg-purple-700 focus:shadow-outline-purple w-full mt-4"
                onClick={loginBtnClick}
              >
                Log in
              </button>

              <hr className="my-8" />
              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/forgot-password"
                >
                  Forgot your password?
                </Link>
              </p>
              <p className="mt-1">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/create-account"
                >
                  Create account
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Login;
