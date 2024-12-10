import { StoreApi, UseBoundStore, create } from "zustand";

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
    setAccessToken: (accessToken: string) => set((state) => ({ accessToken })),
    setRefreshToken: (refreshToken: string) =>
      set((state) => ({ refreshToken })),
  }))
);

export { userStore };
