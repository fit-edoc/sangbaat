import React from "react";

const Landing = () => {
  return (
    <div className="w-full  h-[96vh] flex justify-center  items-center">
      <div className="h-[80%] w-full  rounded-[30px] bg-white/20 flex justify-center items-center">
        <h1 className=" max-w-[300px] text-3xl text-center text-white">
          Welcome to <span className="font-hero text-transparent bg-clip-text bg-gradient-to-l from-orange-300 to-pink-300">"SANGBAAT"</span> your
          community awaits
        </h1>
      </div>
    </div>
  );
};

export default Landing;
