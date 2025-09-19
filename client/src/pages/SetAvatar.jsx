import axios from "axios";
import React, { useEffect, useState } from "react";
import { setAvatarRoute } from "../api/Api";
import { avatars } from "../avatardata/avatar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

 import {ArrowRight, BadgeCheck} from 'lucide-react'

const SetAvatar = () => {

  const navigate = useNavigate()

 
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [info, setInfo] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);


    const { user } = useAuth();



   

  useEffect(() => {
    const generateAvatar = () => {
      
      const randomAvatar =
        avatars[Math.floor(Math.random() * avatars.length)].avatar;
      setInfo(randomAvatar);
    };

    generateAvatar();

  }, []);



  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
      return;
    }
    const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
      image: avatars[selectedAvatar].avatar,
    });

    
   if (data.avtar) {
  
  user.isAvtarSet = true; // 👈 match DB field
  user.avatarImage = avatars[selectedAvatar].avatar;
  localStorage.setItem("user", JSON.stringify(user));
  navigate("/");
    } else {
      console.error(data)
      toast.error("Error setting avatar. Please try again.", toastOptions);
    }
  };

  return (
    <>
      <div className="avatars min-h-screen w-screen bg-gradient-to-b from-[#ffd2a5] to-128% to-black  relative px-4 overflow-hidden">
        <button
          className={`px-4 py-4 rounded-full bg-black text-white border-none absolute   left-[50%] translate-x-[-50%] translate-y-[-50%]  transition-all duration-100 ${selectedAvatar ? 'bottom-[-10px]' :'bottom-[-15%]'}`}
          onClick={setProfilePicture}
        >
          <ArrowRight />
        </button>
        
       <div className="h-[20vh]  flex justify-center items-center"> <h1 className="text-2xl font-bold text-black capitalize ">pick as your profile pic </h1></div>
        <div className="h-[80vh]   bg-white/30 mx-auto rounded-t-[30px]  py-8 grid  grid-cols-3  justify-center items-center  md:grid-cols-4 md:w-[40%]">
          {avatars.map((avatar, index) => (
            <div
              key={index}
              className={`avatar relative bg-gradient-to-t from-purple-300 mx-auto to-white rounded-full h-[60px] w-[60px] overflow-hidden  ${
                selectedAvatar === index
                  ? "scale-125 duration-150 transition-all border-[2px] border-black"  
                  : ""
              }`}
              onClick={() => setSelectedAvatar(index)}
            > 
              <h1 className="text-center">{info.name}</h1>
              <img
                src={avatar.avatar}
                alt={`avatar-${index}`}
                className=" rounded-full object-contain"
              />
            </div>
          ))}
          
        </div>
        
      </div>

      <ToastContainer />
    </>
  );
};

export default SetAvatar;
