import { Map } from "components/Map/Map";
import { getUserParty } from "services/userService";
import { getUserProfile } from "services/userService";
import { useEffect } from "react";
import { useStore } from "zustand";
import { userStore } from "store/userStore";
export const Home = () => {
  const { setUserProfile, setParty } = useStore(userStore);

  const fetchUserProfile = async () => {
    const userProfile = await getUserProfile();
    if (userProfile) setUserProfile(userProfile);
  };

  const fetchUserParty = async () => {
    const userParty = await getUserParty();
    if (userParty) setParty(userParty ?? null);
  };

  useEffect(() => {
    fetchUserProfile();
    fetchUserParty();
  }, []);

  return <Map />;
};
