import { axiosInstance } from "./config";

export const generateInvitationLink = async (partyId: number) => {
  try {
    const response = await axiosInstance.post("/invitation/create", {
      partyId,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
