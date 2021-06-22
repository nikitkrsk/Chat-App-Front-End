import React from "react";
// import socketio from "socket.io-client";
import config from "../config";
import Cookies from "universal-cookie";
import socketIOClient from "socket.io-client";


export const getSocket = () => {
  const accessTokenNotSecured = new Cookies().get("jwt");
  if (accessTokenNotSecured) {
    return socketIOClient(config.SOCKET_URL, {
      transports: ["websocket"],
      query: { token: accessTokenNotSecured },
    });
  }
};

export const SocketContext = React.createContext();

