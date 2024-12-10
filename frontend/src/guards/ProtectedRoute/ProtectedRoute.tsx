import { Navigate, Outlet } from "react-router";

import { userStore } from "store/userStore";

export const ProtectedRoute = () => {
  const accessTokenFromStore = userStore((state) => state.accessToken);

  return <>{accessTokenFromStore ? <Outlet /> : <Navigate to="/login" />}</>;
};
