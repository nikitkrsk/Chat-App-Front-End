import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

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
import Link from "@material-ui/core/Link";

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
    width: "300px",
    marginTop: theme.spacing(2),
    "& .MuiFormLabel-root.Mui-focused": {
      color: theme.palette.secondary.main,
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.secondary.main,
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  links:{
    display: 'flex',
    flexDirection: 'column'
  }
}));

const Login = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  // form
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Enter a valid email")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
  });

  const { values, touched, errors, handleChange, handleBlur, isValid, dirty } =
    formik;
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(LoginAction(values));
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
                required
                margin="normal"
                name="email"
                type="email"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email ? errors.email : ""}
                label="Email"
                onBlur={handleBlur}
                value={values.email}
                onChange={handleChange}
                variant="outlined"
                className={classes.formControl}
                autoComplete="email"
                fullWidth
              />
              <TextField
                variant="outlined"
                required
                fullWidth
                margin="normal"
                className={classes.formControl}
                value={values.password}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password ? errors.password : ""}
                onBlur={handleBlur}
                onChange={handleChange}
                name="password"
                label="Password"
                autoComplete="current-password"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() =>
                          setShowPassword((passwordStatus) => !passwordStatus)
                        }
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
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
                disabled={!(isValid && dirty)}
              >
                Sign In
              </Button>
              <div className={classes.links}>
                {/* TODO <Link
                  href="/request_reset_password"
                  variant="body2"
                  color="secondary"
                >
                  Forgot password?
                </Link> */}
                <Link
                  href="/register"
                  variant="body2"
                  color="secondary"
                >
                 Don't Have Account? Register
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
