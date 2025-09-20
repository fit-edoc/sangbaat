const express = require("express");
const cors = require("cors");
const socket = require("socket.io");

const userRoutes = require('./routes/userRoutes');
const messageRoutes = require("./routes/messageRoutes")
const { ConnectDb } = require("./config/db");

require("dotenv").config()



ConnectDb()
const app = express()
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin:["http://localhost:5173","https://sangbaat.vercel.app"],
  credentials:true,
}
))
app.use(express.json())

app.use('/user',userRoutes)
app.use("/user/message",messageRoutes)

const PORT = process.env.PORT



const server = app.listen(PORT,()=>{

    console.log(`server is running on ${PORT}`)
})



const io = socket(server, {
  cors: {
    origin: ["http://localhost:5173","https://sangbaat.vercel.app"],
    credentials: true,
     methods: ["GET", "POST"],
    
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});