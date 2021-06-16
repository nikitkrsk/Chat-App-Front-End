import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import ColorLensIcon from "@material-ui/icons/ColorLens";
import IconButton from "@material-ui/core/IconButton";
import ColorCard from "./ColorCard";
import { themesConfig } from "../../../../themes/main";

const useStyles = makeStyles((theme) => ({
  AddButton: {
    padding: theme.spacing(2),
    margin: "15px 0",
    minWidth: 220,
  },
  formControl: {
    minWidth: 220,
    margin: "10px 10px",
  },
  themesStyles: {
    display: "grid",
    gridTemplateColumns: "repeat(1, 1fr);",
    justifyItems: "center",
    gridGap: "10px",
    [theme.breakpoints.up("md")]: {
      gridTemplateColumns: "repeat(2, 1fr);",
    },
  },
  sectionMobile: {
    display: "flex",
    padding: "5px 30px 5px 5px",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const ChangeThemeButton = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <IconButton
        aria-label="chuoose color scheme"
        aria-controls="Color Change"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        <ColorLensIcon />
      </IconButton>
      <div className={classes.sectionMobile} onClick={handleClick}>Choose Theme</div>
      <Dialog
        open={open}
        onClose={handleClick}
      >
        <DialogTitle>Choose Theme</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Choose theme That you would like to see
          </DialogContentText>
          <div className={classes.themesStyles}>
            {Object.entries(themesConfig).map(([key, value]) => {
              return <ColorCard colors={value.palette} theme={key} key={key}/>;
            })}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClick} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ChangeThemeButton;
