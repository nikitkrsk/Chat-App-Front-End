import React, {  useContext, useEffect } from "react";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Link from "@material-ui/core/Link";
import { setMenuOpen } from "./store/menu_open/MenuOpenActions";
import { LogoutAction } from "../../store/user/LoginActions";
import MenuTopNav from "./topNavBarElements/Menu";
import MobileMenuTopNav from "./topNavBarElements/MobileMenu";
import chat from "../../assets/chatSmall.png";
import config from "../../config";
import { SocketContext } from "../../helpers/socket";
import {
  setNotificationMessage,
  setNotificationSeverity,
  setShowNotificationMessage,
} from "../../components/notifications/store/notificationActions";
import { GetAllChats } from "../../store/chats/ChatActions";
const drawerWidth = 270;

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: theme.palette.background.paper,
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  hide: {
    display: "none",
  },
  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const TopNavBar = (props) => {
  const state = useSelector((state) => ({
    menuOpen: state.changeMenuOpen.menuOpen,
    // token: state.loggedInUser.token,
  }));
  const socket = useContext(SocketContext);

  const dispatch = useDispatch();

  const classes = useStyles();

  const handleDrawerOpen = () => {
    dispatch(setMenuOpen(true));
  };




  useEffect(() => {
    dispatch(GetAllChats());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    console.log("socket", socket);
    // Listening to events
    socket.on("login", (data) => {
      console.log(data);
    });
    socket.on("unauthorized", (_) => {
      dispatch(LogoutAction());
    });

    socket.on("loginUsers", (username) => {
      dispatch(setNotificationMessage(`${username} is online`));
      dispatch(setShowNotificationMessage(true));
      dispatch(setNotificationSeverity("info"));
    });

    socket.on("newPublicChatCreated", (group) => {
      dispatch(
        setNotificationMessage(`new Public group was creted. Take a look `)
      );
      dispatch(setShowNotificationMessage(true));
      dispatch(setNotificationSeverity("info"));
      dispatch(GetAllChats());

    });

    socket.on("newChatCreated", (group) => {
      dispatch(
        setNotificationMessage(
          `You are invited to new private group. Take a look `
        )
      );
      dispatch(setShowNotificationMessage(true));
      dispatch(setNotificationSeverity("info"));
      dispatch(GetAllChats());
    });

    socket.on("systemError", (data) => {
      dispatch(setNotificationMessage(data));
      dispatch(setShowNotificationMessage(true));
      
    });
    // CLEAN UP THE EFFECT
    return () => socket.disconnect();
    //
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);
  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: state.menuOpen,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: state.menuOpen,
            })}
          >
            <MenuIcon />
          </IconButton>
          <img src={chat} alt="Chat" width="50" height="50" />
          <Link href="/" color={"textPrimary"} underline="none">
            <Typography variant="h6" noWrap>
              {config.DOMAIN}
              {/* {socketData} */}
              {/* <div onClick={createGroup}>create</div> */}
            </Typography>
          </Link>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <MenuTopNav />
          </div>
          <div className={classes.sectionMobile}>
            <MobileMenuTopNav />
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default TopNavBar;
