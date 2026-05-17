import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, UserType } from "./authTypes";

type LoginPayload = {
  user: UserType;
  token: string;
};

const initialState: AuthState = {
  user: null,
  token: null,
  isAuth: false,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuth = true;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuth = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
