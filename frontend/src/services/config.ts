import axios from "axios";
import { userStore } from "store/userStore";

const getTokenFromStore = () => {
  return userStore.getState().accessToken;
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
