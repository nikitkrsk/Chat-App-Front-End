import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import ErrorIcon from "@material-ui/icons/Error";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";


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
 
  return (
    <>
      <div className={classes.root}>
        <div className={classes.content}>
          <ErrorIcon color="secondary" style={{ fontSize: 140 }} />
          <Typography variant="h4" paragraph className={classes.text}>
            {context.t(
              "Sorry but we could not find the page you are looking for"
            )}
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
