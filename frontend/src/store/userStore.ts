import { StoreApi, UseBoundStore, create } from "zustand";

import { axiosInstance } from "services/config";
import { devtools } from "zustand/middleware";

const userStore: UseBoundStore<
  StoreApi<{
    accessToken: string;
    refreshToken: string;
    setAccessToken: any;
    setRefreshToken: any;
  }>
> = create(
  devtools((set) => ({
    accessToken: "",
    refreshToken: "",
    setAccessToken: (accessToken: string) =>
      set((state) => {
        axiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;
        return { accessToken };
      }),
    setRefreshToken: (refreshToken: string) =>
      set((state) => ({ refreshToken })),
  }))
);

export { userStore };
