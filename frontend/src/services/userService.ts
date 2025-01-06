import { LocationDTO } from "types/Loacation";
import { PartyDTO } from "types/Party";
import { UserProfileDTO } from "types/User";
import { axiosInstance } from "./config";

export const getUserProfile = async (): Promise<UserProfileDTO | undefined> => {
  try {
    const response = await axiosInstance.get("/user/profile");
    if (response.data) return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const saveUserLocation = (location: LocationDTO) => {
  try {
    axiosInstance.post("/user/update-location", location);
  } catch (error) {
    console.log(error);
  }
};

export const getUserParty = async (): Promise<PartyDTO | undefined> => {
  try {
    const response = await axiosInstance.get("/user/party");
    if (response.data) return response.data;
  } catch (error) {
    console.log(error);
  }
};
