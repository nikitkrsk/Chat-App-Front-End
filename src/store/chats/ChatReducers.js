import * as constants from "./ChatConstants";

const initialState = {
  privateGroups: [],
  publicGroupsWithUser: [],
  publicGroups: [],
};

export const userChats = (state = initialState, action = {}) => {
  switch (action.type) {
    case constants.REQUEST_GET_CHATS:
      return {
        ...state,
        privateGroups: action.payload.privateGroups,
        publicGroupsWithUser: action.payload.publicGroupsWithUser,
        publicGroups: action.payload.publicGroups,
      };
    case constants.CLEAR_CHATS:
      return initialState;
    default:
      return state;
  }
};
