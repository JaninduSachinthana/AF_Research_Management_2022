const express = require('express');
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();


Url = process.env.URL;

PORT=8088

const app = require("express")();
const server = require("http").createServer(app);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded(
  {extended : true } 
));
const { nanoid } = require("nanoid");
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

let users = [];
let rooms = [];

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.emit("me", socket.id);
  users.push(socket.id);

  socket.broadcast.emit("updateUsers", users);

  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected.`);
    users = users.filter((user) => user !== socket.id);
    console.log(users);
    socket.broadcast.emit("updateUsers", users);
    socket.disconnect();
  });

  socket.emit("getAllUsers", users);
  console.log(users);

  // Rooms
  socket.on("create_room", () => {
    const room = {
      id: nanoid(7),
      capacity: 10,
      usersJoined: [socket.id],
      chat: [],
    };
    socket.join(room);
    socket.emit("get_room", room);
    console.log("Room created: " + room.id);
    rooms.push(room);

    socket.broadcast.emit("updateRooms", rooms);
  });

  socket.on("join_room", (room) => {
    socket.join(room.id);
    console.log(`user ${socket.id} joined room: ${room.id}`);
  });
  socket.emit("getAllRooms", rooms);

  socket.broadcast.emit("updateRooms", rooms);

  socket.on("message", (payload) => {
    console.log(`Message from ${socket.id} : ${payload.message}`);
    rooms.map((room) => {
      if (room.id === payload.room) {
        singleChat = { message: payload.message, writer: payload.socketId };
        room.chat.push(singleChat);
        payload.chat = room.chat;
      }
    });

    io.to(payload.room).emit("chat", payload);
  });
});


mongoose.connect(Url, () => {
    useNewUrlParser = true,
    useUnifiedTopology = true
});

const connected = mongoose.connection;
connected.once("open", () => {
    console.log("Mongo DB Connected..");
});
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
const GroupRoute = require('./routes/group_route');
app.use('/group',GroupRoute);

const StudentRoute = require('./routes/student_route');
app.use('/student',StudentRoute);

const Research = require('./routes/Research');
app.use('/research',Research);

const TopicReg = require('./routes/topicreg');
app.use('/topic',TopicReg);

const TopicAccept = require('./routes/topic');
app.use('/topicacc',TopicAccept);

const Assignment = require('./routes/assignment');
app.use('/assignment',Assignment);

const Register = require('./routes/User_management');
app.use('/register',Register);

const  login = require('./routes/login_management');
app.use('/login', login);
 

//add route for notices
const NoticeRoute = require('./routes/notices');
app.use('/notice',NoticeRoute);

const MarkingSchema = require('./routes/markingSchema');
app.use('/marking',MarkingSchema);

const resultSubmission = require('./routes/resultSubmission');
app.use('/results',resultSubmission);

const panels = require('./routes/panels');
app.use('/panels',panels);