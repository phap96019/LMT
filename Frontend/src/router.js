import { Home, Room } from "./pages";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { connectSocket } from "./helper/connectSocketIO";
function Routes() {
  useEffect(() => {
    connectSocket();
  }, []);
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/room/:roomId">
            <Room />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default Routes;
