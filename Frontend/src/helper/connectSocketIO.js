import { io } from "socket.io-client";
const socket = io("http://localhost:3030");

export const connectSocket = () => {
  socket.on("connect", () => {
    // console.log(socket.id);
  });
};

export const connectSocketId = (func) => {
  if (socket.id !== undefined && socket.id !== null) {
    func(socket.id);
  }
  socket.on("connect", () => {
    func(socket.id);
  });
};

export const reciveMessage = (func) => {
  socket.on("recive message", (msg) => {
    console.log(msg);
    func(msg);
  });
};

export const recivePlayPause = (func) => {
  socket.on("recive play-pause", (msg) => {
    console.log("msg recive: ", msg);
    func(msg);
  });
};
export const sendPlayPause = (msg) => {
  console.log("send: ", msg);
  socket.emit("send play-pause", msg);
};

export const joinRoom = (name, roomId) => {
  socket.emit("join room", { name, roomId });
};
