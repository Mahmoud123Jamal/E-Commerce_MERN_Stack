import axios from "axios";
import { store } from "../app/store";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// =======================
// Request Interceptor
// =======================

axiosInstance.interceptors.request.use((config) => {
  const token = store.getState().auth.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
