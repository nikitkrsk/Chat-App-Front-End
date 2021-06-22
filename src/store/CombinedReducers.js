import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";
import { i18nState } from "redux-i18n";

import { showNotification } from "../components/notifications/store/notificationReducers"
import { changeMenuOpen } from "../components/navbar/store/menu_open/MenuOpenReducers"
import { changeTheme } from "../components/navbar/store/choose_theme/ChooseThemeReducers";
import { changeCurrentPage } from "../components/navbar/store/current_page/CurrentPageReducers"
import { loggedInUser } from "./user/LoginReducers"
import { userChats } from "./chats/ChatReducers"
// import { showLoading } from "../components/loading/store/showLoadingReducers";
const persistConfig = {
  key: "ChatApp",
  whitelist: [
    "changeTheme",
    "changeCurrentPage",
    "loggedInUser",
    "userChats"
  ],
  storage,
};

const rootReducer = combineReducers({
  changeTheme,
  changeCurrentPage,
  loggedInUser,
  changeMenuOpen,
  i18nState,
  userChats,
  showNotification,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
const persistor = persistStore(store);
export { store, persistor };
