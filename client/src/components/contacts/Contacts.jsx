import React, { useState } from 'react'
import { useAuth } from '../../Context/AuthContext';

import {LogOut }  from 'lucide-react'
const Contacts = ({contacts,changeChat}) => {

  const {user,logoutHandler} = useAuth()
    
        const [currentChat, setCurrentChat] = useState(undefined);
        const [currentSelected, setCurrentSelected] = useState(undefined);




          const changeCurrentChat = (index, item) => {
    setCurrentSelected(index);
    changeChat(item);
  };

  return (
    <>
{/*     
   <div className='h-[8vh] absolute w-full  mt-[20px] justify-between  items-start bg-white/20 rounded-[30px] z-50  flex   text-white md:w-[30vw] '>

      <div className='h-full w-[50%] flex items-center px-1 md:justify-center'><img src={user.avatarImage} alt="" className='h-[40px] w-[40px] rounded-full' />
      <h1>{user.username}</h1></div>
      
<div className='h-full w-[50%] flex items-center justify-end mr-6 md:justify-center'>       {user && <button onClick={logoutHandler}  className='px-3 p-1 bg-white  text-black rounded-lg'>sign out </button>}</div>
    </div>
     <div className="min-h-[8vh] mt-[100px    px-2  rounded-[30px]  bg-white/20 backdrop-blur-lg md:w-[30vw] md:min-h-[80vh]">
          <div className="min-h-full w-full  flex  py-2 flex-row  gap-1 justify-start  items-center md:flex-col">
            
            {contacts.map((item, index) => (
              <div  className={`h-[60px]  w-[60px]   rounded-full flex cursor-pointer transition   md:w-[300px] md:mx-auto
      ${index === currentSelected ? 'bg-black text-white' : 'bg-gray-300'}
    `} key={index} onClick={()=>changeCurrentChat(index,item)} >
                <div className={`h-full w-full bg-[#ffe9b0] rounded-full overflow-hidden md:h-full md:w-[20%]  ${index === currentSelected ? "border-[1px] border-black" : ""}

               `} >
                   <img src={item.avatarImage} className='rounded-full object-contain p-2'  alt="" />
                </div>
                <div className="h-full w-[80%] hidden flex-col justify-center items-start px-1  md:flex"> <h1>{item.username}</h1></div>
               
              </div>
            ))}
          </div>
        </div> */}



        <div  className='min-h-[100px]  w-full'>

<div className='h-[60px] w-full flex items-start justify-between'>
   <div className='h-full w-[50%] flex items-center px-1 md:justify-start'><img src={user.avatarImage} alt="" className='h-[40px] w-[40px] rounded-full' />
      <h1>{user.username}</h1></div>
      
<div className='h-full w-[50%] flex items-center justify-end px-2 md:justify-end'>       {user && <button onClick={logoutHandler}  className='px-1 p-1 bg-white  text-black rounded-lg'><LogOut /></button>}</div>
        </div>


        <div className='min-h-[10vh] w-full overflow-x-scroll py-3 md:overflow-x-hidden'>
          <div className='text-center'><h1 className='text-white text-2xl'>Chats</h1></div>
          <div className='flex flex-row md:flex-col gap-2 mt-6 px-2'>
                {contacts.map((item, index) => (
              <div  className={`h-[50px]  w-[50px]    rounded-full flex cursor-pointer transition   md:w-[300px] md:mx-auto
      ${index === currentSelected ? 'bg-black text-white' : 'bg-gray-300'}
    `} key={index} onClick={()=>changeCurrentChat(index,item)} >
                <div className={`h-full w-full bg-[#ffe9b0] rounded-full overflow-hidden md:h-full md:w-[20%]  ${index === currentSelected ? "border-[1px] border-black" : ""}

               `} >
                   <img src={item.avatarImage} className='rounded-full object-contain p-2'  alt="" />
                </div>
                <div className="h-full w-[90%] hidden flex-col justify-center items-start px-1  md:flex"> <h1>{item.username}</h1></div>
               
              </div>
            ))}
          </div>
        </div>
</div>
        
  </>
   
  )
}

export default Contacts
