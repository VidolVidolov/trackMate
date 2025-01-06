import { Logs } from "lucide-react";
import { X } from "lucide-react";
import { useNavigate } from "react-router";
import { userStore } from "store/userStore";
export const MainLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const setAccessToken = userStore((state) => state.setAccessToken);
  const setRefreshToken = userStore((state) => state.setRefreshToken);
  const handleLogOut = () => {
    setAccessToken("");
    setRefreshToken("");
    navigate("/login");
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
            <ul className="mt-8">
              <li>
                <a>Sidebar Item 1</a>
              </li>
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
