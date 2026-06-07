import axios from "axios";
import { store } from "../app/store";
import { logout } from "../features/auth/authSlice";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    try {
      const persistedRoot = localStorage.getItem("persist:root");

      if (persistedRoot) {
        const parsedRoot = JSON.parse(persistedRoot);

        if (parsedRoot?.auth) {
          const authData = JSON.parse(parsedRoot.auth);

          if (authData?.token) {
            config.headers.Authorization = `Bearer ${authData.token}`;
          }
        }
      }
    } catch (error) {
      console.error("Axios Auth Interceptor Error:", error);
    }

    return config;
  },
  (error) => Promise.reject(error),
);

let isLoggingOut = false;

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !isLoggingOut) {
      isLoggingOut = true;

      store.dispatch(logout());
    }

    return Promise.reject(error);
  },
);
