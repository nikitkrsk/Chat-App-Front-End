import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";
import { i18nState } from "redux-i18n";

import { changeTheme } from "../components/navbar/store/choose_theme/ChooseThemeReducers";

// import { showNotification } from "../components/notifications/store/notificationReducers";
// import { showLoading } from "../components/loading/store/showLoadingReducers";
const persistConfig = {
  key: "ChatApp",
  whitelist: [
    "changeTheme",
  ],
  storage,
};

const rootReducer = combineReducers({
  changeTheme,
  i18nState,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
const persistor = persistStore(store);
export { store, persistor };
