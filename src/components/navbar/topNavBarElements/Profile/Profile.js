import React from "react";
import { useDispatch, useSelector } from "react-redux";

import AccountCircle from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import LockIcon from "@material-ui/icons/Lock";
import Avatar from "@material-ui/core/Avatar";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import {LogoutAction} from "../../../../store/user/LoginActions"
const useStyles = makeStyles((theme) => ({
  profile: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
  },
  profileUser: {
    display: "grid",
    padding: "0 0 0 5px",
    justifyItems: "center",
  },
  sectionMobile: {
    display: "flex",
    padding: "5px 30px 5px 5px",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));
const ProfileTopNav = () => {
  const store = useSelector((state) => ({
    user: state.loggedInUser.user,
    role: state.loggedInUser.role
  }));
  const dispatch = useDispatch();
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const logout = (event) => {
    event.preventDefault()
    dispatch(LogoutAction());
  };

  return (
    <>
      <IconButton
        aria-label="account of current user"
        aria-controls="primary-search-account-menu"
        aria-haspopup="true"
        color="inherit"
        onClick={handleProfileMenuOpen}
      >
        <AccountCircle />
      </IconButton>
      <div className={classes.sectionMobile} onClick={handleProfileMenuOpen}>
        Profile
      </div>
      <Popover
        open={isMenuOpen}
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div className={classes.profile}>
          <Avatar alt="Profile Picture" src={store.user?.profilePicture} />
          <div className={classes.profileUser}>
            <Typography variant="body1" noWrap>
              {`${store.user?.firstName} ${store.user?.lastName}`}
            </Typography>
            <Typography variant="caption" noWrap>
            {store.role}
            </Typography>
          </div>
        </div>

        <List component="nav">
          <ListItem button component="a" href="/myProfile">
            <ListItemIcon>
              <AccountBoxIcon  />
            </ListItemIcon>
            <ListItemText primary="My Profile" />
          </ListItem>
          <Divider />
          <ListItem button component="a" onClick={logout}>
            <ListItemIcon>
              <LockIcon  />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Popover>
    </>
  );
};

export default ProfileTopNav;
