import { io } from "socket.io-client";

const socket = io("http://localhost:3030");
let userId = socket.id;
export const connectSocket = () => {
  socket.on("connect", () => {
    userId = socket.id;
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
  socket.on("message", (msg) => {
    if (msg.userId !== userId) {
      console.log("recive: ", msg);
      func(msg);
    }
  });
};
export const sendMessage = (roomId, message) => {
  const msg = {
    userId,
    roomId,
    message,
  };
  console.log(msg);
  socket.emit("message", msg);
};

export const reciveProgress = (func) => {
  socket.on("progress", (msg) => {
    func(msg);
  });
};

export const sendProgress = (roomId, type, time, playedSeconds) => {
  const msg = {
    roomId,
    type,
    time,
    playedSeconds,
  };
  socket.emit("progress", msg);
};

export const recivePlayPause = (func) => {
  socket.on("recive play-pause", (msg) => {
    func(msg);
  });
};
export const sendPlayPause = (msg) => {
  socket.emit("send play-pause", msg);
};

export const reciveHandleNext = (func) => {
  socket.on("handleNext", (msg) => {
    console.log("recive next", msg);
    func(msg);
  });
};
export const sendHanleNext = (roomId, msg) => {
  console.log("send", { roomId, count: msg });
  socket.emit("handleNext", { roomId, count: msg });
};

export const sendLink = (roomId, newLink) => {
  const msg = {
    userId,
    roomId,
    newLink,
  };
  socket.emit("progress", msg);
}

export const joinRoom = (name, roomId) => {
  socket.emit("join room", { userId, name, roomId });
};
