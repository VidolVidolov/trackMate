import { CreatePartyDTO, PartyDTO } from "types/Party";

import { axiosInstance } from "./config";

export const createParty = async (
  name: CreatePartyDTO
): Promise<PartyDTO | undefined> => {
  try {
    const response = await axiosInstance.post("/party/create", name);
    if (response.data) return response.data;
  } catch (error) {
    console.log(error);
  }
};
