import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:4000";

function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    // socket.emit('new user', userData.id);
    const yourJWT =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMzk0ZWZlZGEtMGY4YS00NmEyLWJjMGUtYzZmNjQzZGFkOWEyIiwicm9sZSI6ImFkbWluIiwianRpIjoidGNSVmt2SXVsUyIsImlhdCI6MTYyMzY2Njg2NywiZXhwIjoxNjIzNjY2ODk3fQ.Boyy-CRudipmq_n9Bc_oQWxfFsgNwyf-vz1oZhM4bJM";

    // Require Bearer Token
    const socket = socketIOClient(ENDPOINT, {
      transports: ["websocket"],
      auth: { token: `Bearer ${yourJWT}` },
    });

    // Handling token expiration
    socket.on("connect_error", (error) => {
      // console.log(error);
      if (error?.data?.type === "UnauthorizedError") {
        console.log("User token has expired");
      }
    });

    // Listening to events
    socket.on("login", (data) => {
      console.log(data);
    });
    socket.on("broadcast", (data) => {
      console.log(data);
    });
    socket.on("FromAPI", (data) => {
      console.log("data", data);
      setResponse(data);
    });
    socket.on("expiredRefresh", (data) => {
      console.log("data", data);
      setResponse(data);
    });
  }, []);
  return (
    <p>
      It's <time dateTime={response}>{response}</time>
    </p>
  );
}

export default App;
