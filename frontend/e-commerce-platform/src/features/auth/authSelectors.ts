import type { RootState } from "../../app/store";

export const selectUser = (state: RootState) => state.auth.user;

export const selectToken = (state: RootState) => state.auth.token;

export const selectIsAuth = (state: RootState) => state.auth.isAuth;
