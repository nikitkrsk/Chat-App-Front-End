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
import MuiPhoneNumber from "material-ui-phone-number";

import chat from "../../assets/chat.png";

import { RegisterAction } from "../../store/user/LoginActions";
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
  formControl: {
    margin: theme.spacing(1, 0),
    minWidth: 300,
    maxWidth: 300,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  links: {
    display: "flex",
    flexDirection: "column",
  },
}));

const Register = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  // form
  const formik = useFormik({
    initialValues: {
      firstName: "",
      username: "",
      lastName: "",
      email: "",
      password: "",
      phone: null,
    },

    validationSchema: Yup.object().shape({
      firstName: Yup.string().required("Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      username: Yup.string().required("Username is required"),
      email: Yup.string()
        .email("Enter a valid email")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
  });

  const {
    values,
    touched,
    errors,
    handleChange,
    setFieldValue,
    handleBlur,
    isValid,
    dirty,
  } = formik;
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(RegisterAction(values));
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
              Register
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <TextField
                required
                margin="normal"
                name="firstName"
                error={touched.firstName && Boolean(errors.firstName)}
                helperText={touched.firstName ? errors.firstName : ""}
                label="Name"
                onBlur={handleBlur}
                value={values.firstName}
                onChange={handleChange}
                variant="outlined"
                className={classes.formControl}
                autoComplete="cc-given-name"
                fullWidth
              />
              <TextField
                required
                margin="normal"
                name="lastName"
                error={touched.lastName && Boolean(errors.lastName)}
                helperText={touched.lastName ? errors.lastName : ""}
                label="Last Name"
                onBlur={handleBlur}
                value={values.lastName}
                onChange={handleChange}
                variant="outlined"
                className={classes.formControl}
                autoComplete="cc-family-name"
                fullWidth
              />
              <TextField
                required
                margin="normal"
                name="username"
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username ? errors.username : ""}
                label="Username"
                onBlur={handleBlur}
                value={values.username}
                onChange={handleChange}
                variant="outlined"
                className={classes.formControl}
                autoComplete="cc-family-name"
                fullWidth
              />
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
              <MuiPhoneNumber
                variant="outlined"
                name="phone"
                error={touched.phone && Boolean(errors.phone)}
                helperText={touched.phone ? errors.phone : ""}
                label={"Phone"}
                onBlur={handleBlur}
                value={values.phone}
                onChange={(newValue) => {
                  setFieldValue("phone", newValue ? newValue : "");
                }}
                className={classes.formControl}
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
                <Link href="/auth" variant="body2" color="secondary">
                  Already have an account? Sign in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
