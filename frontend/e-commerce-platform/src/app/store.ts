import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { persistStore, persistReducer } from "redux-persist";

import storage from "./storage";

import authReducer from "../features/auth/authSlice";
import themeReducer from "../features/theme/themeSlice";
import langReducer from "../features/lang/langSlice";
// import cartReducer from "../features/cart/cartSlice";
const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
  lang: langReducer,
  // cart: cartReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
