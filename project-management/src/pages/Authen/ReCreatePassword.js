import React, { useCallback, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import ImageLight from "../../assets/img/forgot-password-office.jpeg";
import ImageDark from "../../assets/img/forgot-password-office-dark.jpeg";
import { Label, Input, Button } from "@windmill/react-ui";
import { fetchWithAuth, fetchApi } from "../../utils/callApi";
import checkNull from "../../utils/formValid";
import Cookie from "js-cookie";
import { useToast } from "../../context/ToastContext";

function ReCreatePassword() {
  const { addToast } = useToast();
  const navigate = useNavigate();
  const passRef = useRef();
  const confirmRef = useRef();
  const params = new URLSearchParams(window.location.search);
  const email = params.get("email");
  const otp = params.get("otp");
  const token = Cookie.get("token");
  const btnClick = useCallback(() => {
    if (!checkNull(passRef) || !checkNull(confirmRef)) return;
    if (confirmRef.current.value != passRef.current.value) {
      addToast("danger", "Password và Confirm password không khớp", 10000);
      console.log("Password và Confirm password không khớp");
      return;
    }
    const callApi = async () => {
      const data = await fetchWithAuth(
        "Authentication/ChangePassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: passRef.current.value,
        },
        () => {
          addToast("danger", "lỗi", 10000);
        }
      );
      addToast("success", "Đổi mật khẩu thành công", 10000);
      console.log("2:", data);
      Cookie.set("token", data.token);
    };
    callApi();
  });
  useEffect(() => {
    try {
      const callAp2i = async () => {
        const data = await fetchWithAuth(
          "Authentication/Get",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
          () => {
            addToast("danger", "Vui lòng đăng nhập lại để tiếp tục", 10000);
            navigate("/login");
          }
        );
      };
      callAp2i();
    } catch (error) {}
  }, []);
  return (
    <div className="flex items-top p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
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
                Đổi mật khẩu
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
                <span>Xác nhận password</span>
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
                Xác nhận
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default ReCreatePassword;
