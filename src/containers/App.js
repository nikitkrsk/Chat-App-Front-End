import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Switch, withRouter } from "react-router-dom";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { CssBaseline } from "@material-ui/core";

// import NavBar from "../components/navbar/index";
import { themesConfig } from "../themes/main";
import { Routes } from "../components/routes/routes";
import { ProtectedRoute } from "../helpers/protectedRoute";
import { setCurrentPage } from "../components/navbar/store/current_page/CurrentPageActions";
// import LoadingComponent from "../components/loading/Loading";
import config from "../config";
import "../themes/Main.scss";

const App = ({ match, history }) => {
  const state = useSelector((state) => ({
    theme: state.changeTheme.theme,
    // isLoading: state.showLoading.isLoading,
  }));
  const theme = createMuiTheme(themesConfig[state.theme]);
  const dispatch = useDispatch();

  useEffect(() => {
    let single = [].concat(...Routes.map((el) => el.components));
    let pathname = config.DOMAIN;
    try {
      pathname = single.filter((el) => el.path === history.location.pathname)[0]
        .name;
    } catch {
      pathname = "Not Found";
    }
    document.title = `${pathname} - ${config.DOMAIN} `;
    dispatch(setCurrentPage(history.location.pathname));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history.location.pathname]);

  const routeComponents = Routes.map((route) =>
    route.components.map(({ path, component, usersCanSee }, key) => (
      <ProtectedRoute
        exact
        users={usersCanSee}
        path={path}
        component={component}
        key={key}
      />
    ))
  );
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {/* {state.isLoading ? <LoadingComponent /> : ""} */}
        {/* {state.loggedIn ? <NavBar /> : ""} */}
        <Switch>{routeComponents}</Switch>
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  );
};

export default withRouter(App);
