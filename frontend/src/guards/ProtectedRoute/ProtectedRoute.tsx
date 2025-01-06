import { Navigate, Outlet } from "react-router";

import { MainLayout } from "layouts/MainLayout/MainLayout";
import { userStore } from "store/userStore";

export const ProtectedRoute = () => {
  const accessTokenFromStore = userStore((state) => state.accessToken);

  return (
    <>
      {accessTokenFromStore ? (
        <MainLayout>
          <Outlet />
        </MainLayout>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};
