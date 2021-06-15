import React from "react";
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
// import MenuTopNav from "./topNavBarElements/Menu";
// import MobileMenuTopNav from "./topNavBarElements/MobileMenu";
import chat from "../../assets/chat.png";
import config from "../../config";

const drawerWidth = 270;

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: theme.palette.background.paper
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
  }));

  const dispatch = useDispatch();

  const classes = useStyles();

  const handleDrawerOpen = () => {
    dispatch(setMenuOpen(true));
  };

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
          <img src={chat} alt="Chat" width="40" height="40"></img>
          <Link href="/" color="inherit" underline="none">
            <Typography variant="h6" noWrap>
              {config.DOMAIN}
            </Typography>
          </Link>

          <div className={classes.grow} />
          {/* <div className={classes.sectionDesktop}>
            <MenuTopNav />
          </div>
          <div className={classes.sectionMobile}>
            <MobileMenuTopNav />
          </div> */}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default TopNavBar;
