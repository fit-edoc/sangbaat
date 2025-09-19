import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../Context/AuthContext';
import axios from 'axios';
import { recieveMessageRoute, sendMessageRoute } from '../api/Api';

const ChatContainer = ({currentChat}) => {

     const [messages, setMessages] = useState([]);
     
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

const {user}= useAuth()
useEffect(()=>{

     const getMessage =async()=>{
        const response = await axios.post(recieveMessageRoute, {
      from: user._id,
      to: currentChat._id,
    });
    setMessages(response.data);

     }

     getMessage()
},[currentChat])

console.log("mesaage" ,messages)


 useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(
          localStorage.getItem("user")
        )._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);


    const handleSendMsg = async (msg) => {
    
    
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: user._id,
      msg,
    });
    await axios.post(sendMessageRoute, {
      from: user._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };


  return (
    // <div className='min-h-[50vh]  mt-[1px]  w-full   rounded-[30px] bg-white/20 backdrop-blur-lg md:min-h-[60vh]  my-auto md:w-[70vw]'>
    //   <div className='h-[40px] w-full flex bg-white rounded-t-[30px] justify-between px-4 items-center py-2'>
    //     <img src={currentChat.avatarImage} className='h-full rounded-full' alt="" />
    //     <b>{currentChat.username}</b>
    //   </div>
      
    // </div>

    <div className='chats w-full  rounded-[30px] h-[96vh] '>
      <div className='h-[50px] flex justify-between items-center w-full px-3 bg-white rounded-t-[30px]'> <img src={currentChat.avatarImage} className='h-[40px] rounded-full' alt="" /> 
      <h1>{currentChat.username}</h1></div>


    </div>
  )
}

export default ChatContainer
