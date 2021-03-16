import React, { useEffect, useState } from "react"; // ,{ useState, useEffect, useRef }
import { Link } from "react-router-dom";
import { connectSocketId } from "../../helper/connectSocketIO";
export const Home = (props) => {
  const [id, setId] = useState(null);
  useEffect(() => {
    connectSocketId((newId) => {
      setId(newId);
    });
  }, []);
  console.log("id: ", id);
  return (
    <div>
      <Link to={"/room/" + id}>Room</Link>
    </div>
  );
};
