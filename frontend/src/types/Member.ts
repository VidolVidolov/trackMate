export type MemberDTO = {
  id: number;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  typeOfVehicle: string | null;
  lastLogin: Date | null;
  partyId: number | null;
  lastKnownLocation: {
    id: number;
    longitude: string;
    latitude: string;
    userId: string;
  };
} | null;
