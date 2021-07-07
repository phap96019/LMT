import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { getWindowDimensions } from "../../helper/getWindowDemensions";
import { searchVideoYoutube } from "../../helper/searchVideoYoutube";
import { io } from "socket.io-client";
import {
  connectSocketId,
  reciveMessage,
  reciveProgress,
  sendProgress,
  sendPlayPause,
  recivePlayPause,
  sendHanleNext,
  reciveHandleNext,
  joinRoom,
} from "../../helper/connectSocketIO";
import { useParams } from "react-router-dom";

import "./Room.scss";
let count = 0;
let sendedProgress = false;
let justReciveProgress = false;
let sendedPlayPause = false;
let justRecivePlayPause = false;
const listData = [
  "https://www.youtube.com/watch?v=vTJdVE_gjI0",
  "https://www.youtube.com/watch?v=RoR7wEEvIuo",
  "https://www.youtube.com/watch?v=7nB1q65RP8w",
  "https://www.youtube.com/watch?v=ECxVfrwwTp0",
];

export const Room = (props) => {
  const [playing, setPlaying] = useState(true);
  const [messages, setMessages] = useState([]);
  const [url, setUrl] = useState(listData[count]);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [played, setPlayed] = useState(0);
  const { roomId } = useParams();
  const addMessage = (message) => {
    const newMessages = messages.push(message);
    setMessages(newMessages);
    console.log("messages: ", messages);
  };

  useEffect(() => {
    reciveMessage(addMessage);
    recivePlayPause(onRecivePlayPause);
    reciveProgress(handleOnReciveProgress);
    reciveHandleNext(onReciveHandleNext)
    joinRoom("phap", roomId);
  }, []);

  const handlePlayPause = (type) => {
    if (type === "play") {
      sendPlayPause({ roomId: roomId, type: "playing", value: true });
    }
    if (type === "pause") {
      sendPlayPause({ roomId: roomId, type: "playing", value: false });
    }
  };
  const onRecivePlayPause = (msg) => {
    setPlaying(msg.value);
  };

  const handleOnClick = async () => {
    handlePlayPause();
    // setPlaying(!playing);
    // const listSearch = await searchVideoYoutube("di ve nha");
    // console.log(listSearch.items);
  };
  
  function handleNext() {
    count++;
    setUrl(listData[count]);
    sendHanleNext(roomId, count);
  }
  const onReciveHandleNext = (number) => {
    count = number;
    setUrl(listData[count]);
  }

  const handleSeekChange = (e) => {
    setPlayed(parseFloat(e.target.value));
    player.current.seekTo(parseFloat(e.target.value));
  };

  //handle progress
  const handleOnReciveProgress = (msg) => {
    if (!sendedProgress) {
      setPlayed(parseFloat(msg.time));
      player.current.seekTo(parseFloat(msg.time));
      justReciveProgress = true;
    }
    sendedProgress = false;
  };

  const handleProgress = (e) => {
    if (!justReciveProgress && Math.abs(e.playedSeconds - playedSeconds) > 5) {
      setPlayed(parseFloat(e.played));
      sendProgress(roomId, "progress", parseFloat(e.played), e.playedSeconds);
      sendedProgress = true;
    }
    setPlayedSeconds(e.playedSeconds);
    justReciveProgress = false;
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
          onEnded={handleNext}
          controls={true}
          width="100%"
          height={getWindowDimensions().height / 2}
          onError={handleNext}
          onSeek={(e) => console.log("onSeektype", e)}
          onProgress={handleProgress}
          onPause={() => handlePlayPause("pause")}
          onPlay={() => handlePlayPause("play")}
        />
        {/* <input
          type="range"
          min={0}
          max={0.999999}
          step="any"
          value={played}
          onChange={handleSeekChange}
        /> */}
        {/* <div onClick={handleOnClick}>Next</div> */}
        <div onClick={handleNext}>Next</div>
        {/* <progress max={1} value={played} /> */}
      </div>
      <div className="main-right"></div>
    </div>
  );
};
