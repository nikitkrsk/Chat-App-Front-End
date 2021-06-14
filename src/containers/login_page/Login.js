import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { fade } from "@material-ui/core/styles/colorManipulator";

import chat from "../../assets/chat.png";

import { LoginAction } from "../../store/user/LoginActions";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    minHeight: "100vh",
    justifyContent: "center",
    backgroundImage: `url(${chat})`,
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundPosition: "center",
   
  },
  paper: {
    display: "flex",
    alignSelf: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    background: theme.palette.primary.main,
    margin: theme.spacing(1),
  },
  loginForm: {
    padding: theme.spacing(2),
    borderRadius: "10px",
    background: fade(theme.palette.background.paper, 0.95),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "350px",
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    /*
      "email": "admin@recepies.dev",
      "password": "password123"
    */
    dispatch(LoginAction({ email: form.email, password: form.password }));
  };
  return (
    <>
      <div className={classes.root}>
        <div className={classes.paper}>
          <div className={classes.loginForm}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                value={form.email}
                onChange={(email) =>
                  setForm({ ...form, email: email.target.value })
                }
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={form.password}
                onChange={(password) =>
                  setForm({ ...form, password: password.target.value })
                }
                name="password"
                label="Password"
                id="password"
                autoComplete="current-password"
                type={form.showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() =>
                          setForm({ ...form, showPassword: !form.showPassword })
                        }
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {form.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
