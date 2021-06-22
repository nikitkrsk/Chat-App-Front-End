

import * as constants from "./ChatConstants";
import {
  setNotificationMessage,
  // setNotificationSeverity,
  setShowNotificationMessage,
} from "../../components/notifications/store/notificationActions";
import config from "../../config";


export const GetAllChats = () => (dispatch, getState) => {
  const { token } = getState().loggedInUser;

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${token}`,
    },
  };
  fetch(`${config.API_URL}/groups/get_all`, requestOptions)
    .then((response) => response.json())
    .then((json) => {
      if (json.error) {
        throw new Error(json.error);
      }
      dispatch({ type: constants.REQUEST_GET_CHATS, payload: json });
    })
    .catch((error) => {
      dispatch(setShowNotificationMessage(true))
      dispatch(setNotificationMessage(error.message))
    });
};

export const clearChats = () => ({
  type: constants.CLEAR_CHATS,
});

export const setChat = (chatInfo) => ({
  type: constants.SET_CHAT,
  payload: chatInfo
});

export const clearChat = () => ({
  type: constants.CLEAR_CHATS,
});