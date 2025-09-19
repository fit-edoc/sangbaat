import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader/Loader";
import axios from "axios";
import { allUsersRoute, host } from "../api/Api";
import Contacts from "../components/contacts/Contacts";
import Landing from "./Landing";
import ChatContainer from "../components/ChatContainer";

import {io} from 'socket.io-client'


const Chat = () => {

   const socket = useRef();
  const [contacts, setContacts] = useState([]);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);


  const { user} = useAuth();

  useEffect(() => {
  if (user) {
    socket.current = io(host);
    socket.current.emit("add-user", user._id);
  }
}, [user]);

  useEffect(() => {
    const getContacts = async () => {
      try {
        if (user.isAvtarSet) {
          const data = await axios.get(`${allUsersRoute}/${user._id}`);
          setContacts(data.data);
          
        }
      } catch (error) {
        console.log(error);
      }
    };

    getContacts();
  }, []);

 
 console.log("curret" ,currentChat)


  const handleChatChange = (item) => {
    setCurrentChat(item);
  };
  return (
    <>
    
      <div className="min-h-screen w-[100vw]  relative   flex justify-center items-center bg-gradient-to-b from-[#ffd2a5] to-128% to-black  backdrop-blur-lg">



      
   <div className="min-h-[96vh] rounded-[30px] w-[90vw] bg-white/20 flex flex-col  md:flex-row">

      <Contacts  contacts={contacts} changeChat={handleChatChange}/>
       {currentChat === undefined ? (
            <Landing />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
   </div>
  
   
      </div>


  
    </>
  );
};

export default Chat;
