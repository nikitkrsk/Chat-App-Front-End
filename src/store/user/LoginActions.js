import jwt_decode from "jwt-decode";

import * as constants from "./LoginConstants";
import {
  setNotificationMessage,
  setShowNotificationMessage,
} from "../../components/notifications/store/notificationActions";
import config from "../../config";
// import { setLoading } from "../../components/loading/store/showLoadingActions";
export const LoginAction = (params) => (dispatch) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": `application/json` },
    body: JSON.stringify(params),
  };
  // dispatch(setLoading(true));
  fetch(`${config.API_URL}/auth/signin`, requestOptions)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      if (json.error) {
        throw new Error(json.error);
      }
      let role = "guest";
      try {
        var decoded = jwt_decode(json.token);
        role = decoded.role;
      } catch {
        role = "guest";
      }

      dispatch({ type: constants.REQUEST_SIGNIN_SUCCESS, payload: json });
      dispatch({ type: constants.SET_USER_ROLE, payload: role });
      // dispatch(setLoading(false));
    })
    .catch((error) => {
      console.log(error.message);
      // dispatch(setLoading(false));
      dispatch(setNotificationMessage(error.message));
      dispatch(setShowNotificationMessage(true));
    });
};

export const LogoutAction = (email, refreshToken) => (dispatch) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": `application/json` },
    body: JSON.stringify({ email, refreshToken }),
  };
  fetch(`${config.API_URL}/auth/signout`, requestOptions)
    .then((response) => response.json())
    .then((json) => {
      if (json.error) {
        throw new Error(json.error);
      }
      dispatch({ type: constants.REQUEST_SIGNOUT_SUCCESS });
    })
    .catch((error) => {});
};
