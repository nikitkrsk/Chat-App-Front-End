import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({ component: Component, users, ...rest }) => {
  const state = useSelector((state) => ({
    // token: state.loginUser.token,
    role: state.loggedInUser.role,
    loggedIn: state.loggedInUser.loggedIn,
  }));

  return (
    <Route
      {...rest}
      render={(props) => {
        if (users.includes(state.role)) {
          return <Component {...rest} {...props} />;
        } else {
          let path = "/auth";
          if (state.loggedIn) {
            path = "/";
          }
          return (
            <Redirect
              to={{
                pathname: path,
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};
