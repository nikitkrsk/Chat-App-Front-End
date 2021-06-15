import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import ErrorIcon from "@material-ui/icons/Error";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { useSelector } from "react-redux";
import socketIOClient from "socket.io-client";
import config from "../../config";

const drawerWidth = 270;

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: drawerWidth,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
  },
  content: {
    minHeight: "100vh",
    margin: theme.spacing(0, 20),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
}));

const NotFound = (_, context) => {
  const classes = useStyles();
  const state = useSelector((state) => ({
    token: state.loggedInUser.token,
  }));

  const [socket, setSocket] = React.useState("")
  React.useEffect(() => {
    const socket = socketIOClient(config.SOCKET_URL, {
      transports: ["websocket"],
      query: {token: state.token},
    });
    // Handling token expiration
    socket.on("connect_error", (error) => {
      // console.log(error);
      if (error?.data?.type === "UnauthorizedError") {
        setSocket("User token has expired")
        console.log("User token has expired");
      }
    });

    // Listening to events
    socket.on("login", (data) => {
      setSocket(data)
      console.log(data);
    });
    socket.on("broadcast", (data) => {
      console.log(data);
    });
    socket.on("FromAPI", (data) => {
      console.log("FromAPI", data);
    });
    socket.on("unauthorized", (data) => {
      console.log("unauthorized", data);
      setSocket(data)
    });
    socket.on('disconnect', data => {
      console.log('disconnect client event....', data);
      // setSocket(data)
   });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className={classes.root}>
        <div className={classes.content}>
          <ErrorIcon color="primary" style={{ fontSize: 140 }} />
          <Typography variant="h4" paragraph className={classes.text}>
            {/* {context.t(
              "Sorry but we could not find the page you are looking for"
            )} */}
            {socket}
          </Typography>
          <Link href="/" variant="body2" color="primary">
            Go back to dashboard
          </Link>
        </div>
      </div>
    </>
  );
};

NotFound.contextTypes = {
  t: PropTypes.func.isRequired,
};
export default NotFound;
