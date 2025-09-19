import React, { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate, Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import  {registerRoute}  from "../api/Api.js";
import Loader from "../components/loader/Loader.jsx";

export default function Register() {
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
    email: "",
    password: "",
    confirmPassword: "",
  });

  // useEffect(() => {
  //   if (localStorage.getItem(import.meta.env.VITE_REACT_APP_LOCALHOST_KEY)) {
  //     navigate("/");
  //   }
  // }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = values;
      const res = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      
      if(res.data.success){
        toast("user created successfully")
        navigate("/login")
      }
      
    
    }
  };

  return (
    <>



     <div className="h-screen w-screen bg-gradient-to-b from-[#ffd2a5] to-128% to-black flex justify-center items-center">
            <div className="h-[78%] w-[88%]  bg-white/50 rounded-[30px] relative overflow-hidden md-h-[30%] md:w-[30%] backdrop-blur-lg">
              <div className="h-[20%] w-full rounded-t-[30px] flex justify-center items-center relative">
                <h1 className="text-center text-2xl z-20 font-bold">Create a New account ?</h1>
              </div>
              <div className="h-[80%] w-full rounded-[30px] bg-white">
             <form action="" className="flex flex-col justify-center items-center gap-4 h-full w-full" onSubmit={(event) => handleSubmit(event)}>
          <input
            type="text"
            className="bg-gray-200 rounded-[20px] px-2 border-none"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            className="bg-gray-200 rounded-[20px] px-2 border-none"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            className="bg-gray-200 rounded-[20px] px-2 border-none"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            className="bg-gray-200 rounded-[20px] px-2 border-none"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit" className="h-[35px] w-[160px] py-1 rounded-full text-white bg-black border-none">Create User</button>
          <span className="underline">
            Already have an account ? <Link to="/login">Login.</Link>
          </span>
        </form>
              </div>
            </div>
          </div>
    
          <ToastContainer />
    
    
    
      <ToastContainer />
    </>
  );
}
