export type UserProfileDTO = {
  id: number;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  hashedRefreshToken: string | null;
  typeOfVehicle: string | null;
  createdAt: Date | null;
  lastLogin: Date | null;
  partyId: number | null;
  ownedPartyId: number | null;
} | null;
