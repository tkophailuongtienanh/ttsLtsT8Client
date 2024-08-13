import React, { useRef } from "react";
import { Link } from "react-router-dom";

import ImageLight from "../assets/img/create-account-office.jpeg";
import ImageDark from "../assets/img/create-account-office-dark.jpeg";
import { GithubIcon, TwitterIcon } from "../icons";
import { Input, Label, Button } from "@windmill/react-ui";
import { useToast } from "../context/ToastContext";
import fetchWithAuth from '../utils/callApi';
import Cookie from "js-cookie";
var count;
const checkNull = (ref)=>{
  if (ref.current.value!=null && ref.current.value!='') {
    resetField(ref);
  } else {
    count++;
    setError(ref);
  }
}
const resetField = (ref) =>{
  ref.current.className="block w-full text-sm focus:outline-none dark:text-gray-300 form-input leading-5 focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 mt-1";
}
const setError = (ref)=>{
  ref.current.className="block w-full text-sm focus:outline-none dark:text-gray-300 form-input leading-5 border-red-600 dark:bg-gray-700 focus:border-red-400 dark:focus:border-red-400 focus:shadow-outline-red dark:focus:shadow-outline-red mt-1";
}
const CreateAccount = () => {
  const { addToast } = useToast();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const fullnameRef = useRef();
  const dobRef = useRef();
  const phoneRef = useRef();
  const RegisterClick = async () => {
    count=0;
    checkNull(usernameRef);
    checkNull(emailRef);
    checkNull(passwordRef);
    checkNull(confirmPasswordRef);
    checkNull(fullnameRef);
    checkNull(dobRef);
    checkNull(phoneRef);
    if(count>0) return;
    const userRegister = {
      UserName: usernameRef.current.value,
      Email: emailRef.current.value,
      Password: passwordRef.current.value,
      PhoneNumber: phoneRef.current.value,
      FullName: fullnameRef.current.value,
      DateOfBirth: dobRef.current.value,
    };
    if(passwordRef.current.value != confirmPasswordRef.current.value){
      addToast(
        "danger",
        "Password và Confirm Password không khớp nhau!",
        10000
      );
      return;
    }
    try {
      const data = await fetchWithAuth('Authentication/Register', {
        method: 'POST',
        body: userRegister,
      });
      if(data.token){
        Cookie.set('token', data.token, { expires: 1 });
        console.log(data.token);
        window.location.href = "/confirmEmail";
      }
    } catch (err) {
      console.log(err);
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
                Create account
              </h1>
              <Label>
                <span>Username</span>
                <Input
                  className="mt-1"
                  type="username"
                  placeholder="johndoe"
                  ref={usernameRef}
                />
              </Label>
              <Label className="mt-4">
                <span>Email</span>
                <Input
                  className="mt-1"
                  type="email"
                  placeholder="john@doe.com"
                  ref={emailRef}
                />
              </Label>
              <Label className="mt-4">
                <span>Password</span>
                <Input
                  className="mt-1"
                  placeholder="***************"
                  type="password"
                  ref={passwordRef}
                />
              </Label>
              <Label className="mt-4">
                <span>Confirm password</span>
                <Input
                  className="mt-1"
                  placeholder="***************"
                  type="password"
                  ref={confirmPasswordRef}
                />
              </Label>
              <Label className="mt-4">
                <span>Fullname</span>
                <Input
                  className="mt-1"
                  placeholder="Nguyễn Văn A"
                  type="fullname"
                  ref={fullnameRef}
                />
              </Label>
              <Label className="mt-4">
                <span>Date of Birth</span>
                <Input
                  className="mt-1"
                  placeholder="Nguyễn Văn A"
                  type="date"
                  ref={dobRef}
                />
              </Label>
              <Label className="mt-4">
                <span>Phone Number</span>
                <Input
                  className="mt-1"
                  placeholder="0987654321"
                  type="text"
                  ref={phoneRef}
                />
              </Label>
              <button
                className="transition-colors duration-150 font-medium focus:outline-none  
                py-2 rounded-lg text-sm text-white bg-purple-600 border-0 active:bg-purple-600 
                hover:bg-purple-700 focus:shadow-outline-purple w-full mt-4"
                onClick={RegisterClick}
              >
                Register
              </button>

              <hr className="my-8" />

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/login"
                >
                  Already have an account? Login
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
