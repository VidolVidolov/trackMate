import { MemberDTO } from "./Member";
import { UserProfileDTO } from "./User";

export type CreatePartyDTO = { name: string };

export type PartyDTO = {
  id: number;
  members: MemberDTO[];
  owner: UserProfileDTO;
  timeCreated: string;
  timeClosed: string;
  partyDismissed: boolean;
  distanceTravelled: number;
  timeTaken: number;
  startingLocationId: number;
  endingLocationId: number;
  name: string;
  userId: string;
} | null;
