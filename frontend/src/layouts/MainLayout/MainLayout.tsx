import { Logs } from "lucide-react";
import { X } from "lucide-react";
import { createParty } from "services/partyService";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useStore } from "zustand";
import { userStore } from "store/userStore";

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const { setParty, party } = useStore(userStore);
  const [partyName, setPartyName] = useState("");
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

  const handleDismissParty = () => {
    console.log("partyDismissed");
  };

  return (
    <>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
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
                    <button
                      onClick={handleDismissParty}
                      className="btn btn-secondary m-10"
                    >
                      Dismiss Party
                    </button>
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
