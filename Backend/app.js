const express = require("express");
const path = require("path");
const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-header"],
    credentials: true,
  },
});

const cors = require("cors");
app.use(cors());
// app.use(express.static(path.join(__dirname, 'build')));
// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

const onConnection = (socket) => {
  const onJoinRoom = (arg) => {
    socket.join(arg.roomId);
    io.to(arg.roomId).emit("message", { message: `${arg.name} da vao phong` });
  };
  const onReciveMessage = (msg) => {
    const { roomId } = msg;
    io.to(roomId).emit("message", msg);
  };
  const onRecivePlayPause = (msg) => {
    const { roomId, type, value } = msg;
    io.to(roomId).emit("recive play-pause", msg);
  };
  const onReciveProgress = (msg) => {
    const { roomId, type, time } = msg;
    io.to(roomId).emit("progress", msg);
  };
  const onRecivehandleNext = (msg) => {
    const { roomId, count } = msg;
    io.to(roomId).emit("handleNext", count);
  };

  socket.on("join room", onJoinRoom);
  socket.on("message", onReciveMessage);
  socket.on("send play-pause", onRecivePlayPause);
  socket.on("progress", onReciveProgress);
  socket.on("handleNext", onRecivehandleNext);
};

io.on("connection", onConnection);

module.exports = http;
