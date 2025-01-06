import { StoreApi, UseBoundStore, create } from "zustand";

import { PartyDTO } from "types/Party";
import { UserProfileDTO } from "types/User";
import { axiosInstance } from "services/config";
import { devtools } from "zustand/middleware";

const userStore: UseBoundStore<
  StoreApi<{
    accessToken: string;
    refreshToken: string;
    userProfile: UserProfileDTO;
    party: PartyDTO;
    setAccessToken: (accessToken: string) => void;
    setRefreshToken: (refreshToken: string) => void;
    setUserProfile: (userProfile: UserProfileDTO) => void;
    setParty: (party: PartyDTO) => void;
  }>
> = create(
  devtools((set) => ({
    accessToken: "",
    refreshToken: "",
    setAccessToken: (accessToken: string) =>
      set(() => {
        axiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;
        return { accessToken };
      }),
    setRefreshToken: (refreshToken: string) => set(() => ({ refreshToken })),
    userProfile: null,
    setUserProfile: (userProfile: UserProfileDTO) =>
      set(() => ({ userProfile })),
    party: null,
    setParty: (party: PartyDTO) => set(() => ({ party })),
  }))
);

export { userStore };
