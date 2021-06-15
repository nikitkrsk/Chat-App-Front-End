import React from "react";

import { makeStyles } from "@material-ui/core/styles";


import TopNavBar from './TopNavBar'
import SideNav from "./SideNav"


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

const Navigation = () => {
  const classes = useStyles();


  return (
    <div className={classes.root}>
      <TopNavBar />
      <SideNav />
    </div>
  );
};



export default Navigation;
