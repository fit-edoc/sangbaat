import React, { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate, Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../api/Api.js";
import { useAuth } from "../Context/AuthContext.jsx";

export default function Login() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  // useEffect(() => {
  //   if (localStorage.getItem(import.meta.env.REACT_APP_LOCALHOST_KEY)) {
  //     navigate("/");
  //   }
  // }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const { loginHandler } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const success = await loginHandler(username, password);
      if (success) navigate("/setavatar");
    }
  };

  return (
    <>
      <div className="h-screen w-screen bg-gradient-to-b from-[#ffd2a5] to-128% to-black flex justify-center items-center">
        <div className="h-[78%] w-[88%]  bg-white/50 rounded-[30px] relative overflow-hidden md-h-[30%] md:w-[30%] backdrop-blur-lg">
          <div className="h-[20%] w-full rounded-t-[30px] flex justify-center items-center relative">
            <h1 className="text-center text-2xl z-20 font-bold">Login</h1>
          </div>
          <div className="h-[80%] w-full rounded-[30px] bg-white">
            <form
              action=""
              className="flex flex-col justify-center items-center gap-4 h-full w-full"
              onSubmit={(event) => handleSubmit(event)}
            >
              <input
                type="text"
                className="bg-gray-200 rounded-[20px] px-2 border-none"
                placeholder="Username"
                name="username"
                onChange={(e) => handleChange(e)}
                min="3"
              />
              <input
                type="password"
                className="bg-gray-200 rounded-[20px] px-2 border-none"
                placeholder="Password"
                name="password"
                onChange={(e) => handleChange(e)}
              />
              <button
                type="submit"
                className="h-[35px] w-[160px] py-1 rounded-full text-white bg-black border-none"
              >
                LogIn
              </button>
              <span className="underline ">
                Don't have an account ? <Link to="/register">Create One.</Link>
              </span>
            </form>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
}
