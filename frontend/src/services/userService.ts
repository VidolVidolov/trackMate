import { LocationDTO } from "types/Loacation";
import { axiosInstance } from "./config";

export const saveUserLocation = (location: LocationDTO) => {
  try {
    axiosInstance.post("/user/update-location", location);
  } catch (error) {
    console.log(error);
  }
};
