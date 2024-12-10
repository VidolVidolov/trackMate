import { Outlet, useLocation, useNavigate } from "react-router";

import { useEffect } from "react";
import { userStore } from "store/userStore";

export const PublicRoute = () => {
  const accessTokenFromStore = userStore((state) => state.accessToken);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/login" && accessTokenFromStore) {
      navigate("/");
    }
  }, [accessTokenFromStore, location.pathname, navigate]);

  return <>{<Outlet />}</>;
};
