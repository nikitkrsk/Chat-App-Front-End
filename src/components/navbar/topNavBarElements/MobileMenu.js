import React from "react";

import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import MoreIcon from "@material-ui/icons/More";

import ProfileTopNav from "./Profile/Profile";
import ChangeThemeButton from "./Theme/ChangeThemeButton";

const MobileMenuTopNav = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton
        aria-haspopup="true"
        color="inherit"
        onClick={handleProfileMenuOpen}
      >
        <MoreIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem>
          <ChangeThemeButton />
        </MenuItem>
        <MenuItem>
          <ProfileTopNav />
        </MenuItem>
      </Menu>
    </>
  );
};

export default MobileMenuTopNav;
