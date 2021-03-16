import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { getWindowDimensions } from "../../helper/getWindowDemensions";
import { searchVideoYoutube } from "../../helper/searchVideoYoutube";
import { io } from "socket.io-client";
import {
  connectSocketId,
  reciveMessage,
  sendPlayPause,
  recivePlayPause,
  joinRoom,
} from "../../helper/connectSocketIO";
import { useParams } from "react-router-dom";

import "./Room.scss";
let count = 0;
const listData = [
  "https://www.youtube.com/watch?v=vTJdVE_gjI0",
  "https://www.youtube.com/watch?v=RoR7wEEvIuo",
  "https://soundcloud.com/touliver/ssbigcityboi",
  "https://soundcloud.com/japannezz/muon-duoc-cung-em-freaky-x-cm1x-ft-quynh-gai",
];

export const Room = (props) => {
  const [playing, setPlaying] = useState(true);
  const [messages, setMessages] = useState([]);
  const [url, setUrl] = useState(listData[count]);
  const [played, setPlayed] = useState(0);
  const { roomId } = useParams();

  const addMessage = (message) => {
    const newMessages = messages.push(message);
    setMessages(newMessages);
    console.log("messages: ", messages);
  };
  const playPause = (msg) => {
    setPlaying(msg.value);
  };

  useEffect(() => {
    reciveMessage(addMessage);
    recivePlayPause(playPause);
    joinRoom("phap", roomId);
  }, []);
  const handleOnSendPlayPause = () => {
    setPlaying(!playing);
    sendPlayPause({ roomId: roomId, type: "playing", value: !playing });
  };

  const handleOnClick = async () => {
    handleOnSendPlayPause();
    // setPlaying(!playing);
    // const listSearch = await searchVideoYoutube("di ve nha");
    // console.log(listSearch.items);
  };
  function onEnded() {
    count++;
    setUrl(listData[count]);
    console.log("oke");
  }
  const handleSeekChange = (e) => {
    setPlayed(parseFloat(e.target.value));
    player.current.seekTo(parseFloat(e.target.value));
  };
  const handleProgress = (e) => {
    setPlayed(parseFloat(e.played));
  };
  const player = useRef(0, "fraction");
  return (
    <div className="container">
      <div className="main-left">
        <ReactPlayer
          ref={player}
          className="video"
          url={url}
          playing={playing}
          onEnded={onEnded}
          controls={true}
          width="100%"
          height={getWindowDimensions().height / 2}
          onError={onEnded}
          onSeek={(e) => console.log("onSeek", e)}
          onProgress={handleProgress}
        />
        <input
          type="range"
          min={0}
          max={0.999999}
          step="any"
          value={played}
          onChange={handleSeekChange}
        />
        <div onClick={handleOnClick}>CLICK</div>
        <progress max={1} value={played} />
      </div>
      <div className="main-right"></div>
    </div>
  );
};
