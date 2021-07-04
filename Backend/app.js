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

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const onConnection = (socket) => {
  // console.log(io.sockets.adapter.rooms);
  // console.log(socket.id);
  const onJoinRoom = (arg) => {
    socket.join(arg.roomId);
    console.log(io.sockets.adapter.rooms);
  };
  const onReciveAndSendMessage = (msg) => {
    const { roomId, message } = msg;
    io.to(roomId).emit("recive message", message);
  };
  const onRecivePlayPause = (msg) => {
    const { roomId, type, value } = msg;
    console.log(msg);
    io.to(roomId).emit("recive play-pause", msg);
  };
  const onReciveProgress = (msg) => {
    const { roomId, type, time } = msg;
    console.log('msg: ', msg);
    io.to(roomId).emit("progress", msg);
  };

  socket.on("join room", onJoinRoom);
  socket.on("send message", onReciveAndSendMessage);
  socket.on("send play-pause", onRecivePlayPause);
  socket.on("progress", onReciveProgress);
};

io.on("connection", onConnection);

module.exports = http;

