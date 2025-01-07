import { Copy, X } from "lucide-react";
import { createParty, dismissParty } from "services/partyService";

import { Logs } from "lucide-react";
import { generateInvitationLink } from "services/invitationService";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useStore } from "zustand";
import { userStore } from "store/userStore";

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const { setParty, party, userProfile } = useStore(userStore);
  const [partyName, setPartyName] = useState("");
  const [invitationLink, setInvitationLink] = useState("");
  const setAccessToken = userStore((state) => state.setAccessToken);
  const setRefreshToken = userStore((state) => state.setRefreshToken);
  const handleLogOut = () => {
    setAccessToken("");
    setRefreshToken("");
    navigate("/login");
  };

  const handleOpenModal = () => {
    const modal = document.getElementById("my_modal_1") as HTMLFormElement;
    if (modal) {
      modal.showModal();
    }
  };

  const handleCreateParty = async () => {
    const party = await createParty({ name: partyName });

    if (party && "error" in party) {
      return;
    }

    if (party) {
      setPartyName("");
      setParty(party);
    }
  };

  const handleDismissParty = async () => {
    const result = await dismissParty();
    if ((result && "error" in result) || !result) return;
    setParty(null);
  };

  const handleGenerateInvitationLink = async () => {
    if (party?.id) {
      const invLink = await generateInvitationLink(party?.id);
      if (typeof invLink === "object" && "error" in invLink) {
        return;
      }
      setInvitationLink(invLink);
    }
  };

  const handleCopyInvitationLink = () => {
    navigator.clipboard.writeText(invitationLink);
  };

  return (
    <>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex justify-center align-middle">
          {children}
          <label
            htmlFor="my-drawer"
            className="btn btn-primary drawer-button absolute left-2 top-2"
          >
            <Logs />
          </label>
        </div>
        <div className="drawer-side">
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Hello!</h3>
              <p className="py-4">Give a name to your new party</p>
              <div className="modal-action mt-0">
                <form method="dialog" className="flex gap-1 flex-col w-full">
                  <input
                    className="mb-4"
                    value={partyName}
                    onChange={(e) => setPartyName(e.target.value)}
                  />
                  <div>
                    <button className="btn mr-2" onClick={handleCreateParty}>
                      Create!
                    </button>
                    <button className="btn">Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          </dialog>
          <div className="menu bg-base-200 text-base-content min-h-full w-full p-4">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            >
              <div className=" absolute right-6 top-3">
                <X />
              </div>
            </label>
            <ul className="mt-8 flex flex-col justify-between">
              <div>
                {party ? (
                  <>
                    <li>
                      <p>Party: {party.name}</p>
                      <p>Created At: {party.timeCreated}</p>
                      <p>Members:</p>
                      {party.members.map((member) => (
                        <p key={member?.id}> &#8608; {member?.name}</p>
                      ))}
                      <p>Distance Travelled: {party.distanceTravelled}</p>
                      <p>Time Taken: {party.timeTaken}</p>
                    </li>
                    {userProfile && userProfile.id === Number(party.userId) && (
                      <div>
                        <button
                          onClick={handleDismissParty}
                          className="btn btn-secondary m-10"
                        >
                          Dismiss Party
                        </button>
                        <button
                          onClick={handleGenerateInvitationLink}
                          className="btn btn-secondary mb-10"
                        >
                          Generate Invitation Link
                        </button>
                        <p
                          onClick={handleCopyInvitationLink}
                          className="flex gap-2 align-middle m-5"
                        >
                          <Copy />{" "}
                          {invitationLink ? invitationLink : "Not created yet"}
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <li onClick={handleOpenModal}>
                    <a>Create Party</a>
                  </li>
                )}
              </div>
              <li>
                <div onClick={handleLogOut}>Log Out</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
