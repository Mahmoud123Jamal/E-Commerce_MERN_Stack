import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { persistStore, persistReducer } from "redux-persist";

import authReducer from "../features/auth/authSlice";
import themeReducer from "../features/theme/themeSlice";

import storage from "./storage";

// =======================
// Root Reducer
// =======================

const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
});

// =======================
// Persist Config
// =======================

const persistConfig = {
  key: "root",
  storage,
};

// =======================
// Persisted Reducer
// =======================

const persistedReducer = persistReducer(persistConfig, rootReducer);

// =======================
// Store
// =======================

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// =======================
// Persistor
// =======================

export const persistor = persistStore(store);

// =======================
// Types
// =======================

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
