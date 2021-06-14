import * as constants from "./LoginConstants";

const initialState = {
  user: {},
  role: "guest",
  token: "", // TODO not store it in the browser
  loggedIn: false,
};

export const loggedInUser = (state = initialState, action = {}) => {
  switch (action.type) {
    case constants.REQUEST_SIGNIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loggedIn: true,
      };
    case constants.SET_USER_ROLE:
      return { ...state, role: action.payload };
    case constants.REQUEST_SIGNOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
};
