import axios from "axios";

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

        if (parsedRoot && parsedRoot.auth) {
          const authData = JSON.parse(parsedRoot.auth);

          if (authData && authData.token) {
            config.headers.Authorization = `Bearer ${authData.token}`;
          }
        }
      }
    } catch (error) {
      console.error("Axios Auth Interceptor Error:", error);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
