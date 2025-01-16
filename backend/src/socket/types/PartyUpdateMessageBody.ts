export type MessageBodyType = {
  userId?: number;
  location?: {
    latitude: number;
    longitude: number;
  };
  partyId?: number;
} | null;
