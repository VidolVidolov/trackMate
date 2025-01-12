import axios from "axios";

const getTokenFromStore = async () => {
  const store = await import("store/userStore").then(({ userStore }) => {
    return userStore;
  });
  return store.getState().accessToken;
};

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  validateStatus: () => true,
  headers: { Authorization: `Bearer ${getTokenFromStore()}` },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => error
);
