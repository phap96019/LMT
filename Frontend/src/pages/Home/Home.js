import React, { useEffect, useState } from "react"; // ,{ useState, useEffect, useRef }
import { Link } from "react-router-dom";
import { connectSocketId } from "../../helper/connectSocketIO";
import { Navbar } from "../../components/Navbar/Navbar";
import { createId } from "helper/createId"
export const Home = (props) => {
  const [id, setId] = useState(null);
  useEffect(() => {
    connectSocketId((newId) => {
      setId(newId);
    });
  }, []);
  const newRoomId = id + createId(5);
  console.log("id: ", newRoomId);
  return (
    <div>
      <Navbar />
      <Link to={"/room/" + newRoomId}>Room</Link>
    </div>
  );
};
