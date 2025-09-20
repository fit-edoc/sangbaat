import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../Context/AuthContext';
import axios from 'axios';
import { recieveMessageRoute, sendMessageRoute } from '../api/Api';
import { v4 as uuidv4 } from 'uuid';

const ChatContainer = ({ currentChat, socket }) => {
  const [messages, setMessages] = useState([]);     
  const [newMessage, setNewMessage] = useState(''); 
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const getMessage = async () => {
      if (user && currentChat) {
        const response = await axios.post(recieveMessageRoute, {
          from: user._id,
          to: currentChat._id,
        });
        setMessages(response.data);
      }
    };
    getMessage();
  }, [currentChat, user]);

  const handleSendMsg = async (e) => {
    e.preventDefault(); 
    if (!newMessage.trim()) return;

    
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: user._id,
      msg: newMessage,
    });

    
    await axios.post(sendMessageRoute, {
      from: user._id,
      to: currentChat._id,
      message: newMessage,
    });

    
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: newMessage });
    setMessages(msgs);
    setNewMessage(''); 
  };

    useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);
  useEffect(() => {
    if (arrivalMessage) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (

    <>
    
   <div className="chats relative w-full min-h-[70vh] rounded-[30px] md:min-h-[96vh]  flex flex-col">

  <div className="h-[50px] flex justify-between items-center w-full px-3 bg-white rounded-t-[30px]">
    <img src={currentChat.avatarImage} className="h-[40px] rounded-full" alt="" />
    <h1>{currentChat.username}</h1>
  </div>

  
  <div className="chat-messages flex-1 overflow-y-auto px-3 py-2">
    {messages.map((message) => (
      <div
        ref={scrollRef}
        key={uuidv4()}
        className={`flex w-full mb-2 ${
          message.fromSelf ? "justify-end" : "justify-start"
        }`}
      >
        <div
          className={`rounded-[20px] px-3 py-2 shadow-md shadow-black text-white max-w-[70%] break-words ${
            message.fromSelf
              ? "bg-green-500 text-white"
              : "bg-gray-300 text-black"
          }`}
        >
          {message.message}
        </div>
      </div>
    ))}
  </div>

  
  <form
    className="input-container flex px-3 gap-1 py-2 w-full sticky bottom-0 bg-white rounded-b-[30px] shadow-inner"
    onSubmit={handleSendMsg}
  >
    <textarea
      rows={1}
      placeholder="Type your message here"
      onChange={(e) => setNewMessage(e.target.value)}
      value={newMessage}
      className="flex-1 resize-none border rounded-[30px] px-3 py-2 shadow-md shadow-black focus:outline-none"
    />
    <button
      type="submit"
      className="px-4 py-2 bg-green-400 rounded-[30px] text-white shadow-md shadow-black"
    >
      Send
    </button>
  </form>
</div>

     
        </>
  )
}

export default ChatContainer
