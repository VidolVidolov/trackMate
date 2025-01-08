import { useEffect, useState } from "react";

import { Map } from "components/Map/Map";
import { getUserParty } from "services/userService";
import { getUserProfile } from "services/userService";
import { joinParty } from "services/invitationService";
import { useStore } from "zustand";
import { userStore } from "store/userStore";

export const Home = () => {
  const { setUserProfile, setParty, setInvitationToken, invitationToken } =
    useStore(userStore);
  const [loading, setLoading] = useState(false);
  const fetchUserProfile = async () => {
    const userProfile = await getUserProfile();
    if (userProfile) setUserProfile(userProfile);
  };

  const fetchUserParty = async () => {
    const userParty = await getUserParty();
    if (userParty) setParty(userParty ?? null);
  };

  const addInvitationTokenToStore = () => {
    const invitationTokenFromStorage = localStorage.getItem("invitationToken");
    if (invitationTokenFromStorage) {
      setInvitationToken(invitationTokenFromStorage);
      localStorage.removeItem("invitationToken");
    }
  };

  const handleJoinParty = async () => {
    await joinParty(invitationToken);
    fetchUserParty();
  };

  useEffect(() => {
    setLoading(true);
    addInvitationTokenToStore();
    fetchUserProfile();
    fetchUserParty();
    setLoading(false);
  }, []);

  useEffect(() => {
    if (invitationToken) {
      const modal = document.getElementById("my_modal_2") as HTMLFormElement;
      if (modal) {
        modal.showModal();
      }
    }
  }, [invitationToken]);

  if (loading) {
    return <span className="loading loading-dots loading-lg"></span>;
  }

  return (
    <div>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            You have been invited to a party. Want to join?
          </p>
          <div className="modal-action mt-0">
            <form method="dialog" className="flex gap-1 flex-col w-full">
              <div>
                <button className="btn mr-2" onClick={handleJoinParty}>
                  Join!
                </button>
                <button className="btn">Deny</button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
      <Map />
    </div>
  );
};
