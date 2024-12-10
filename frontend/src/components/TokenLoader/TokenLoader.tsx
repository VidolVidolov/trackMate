import { useCallback, useLayoutEffect } from "react";

import { Outlet } from "react-router";
import { userStore } from "store/userStore";

export const TokenLoader = () => {
  const setAccessToken = userStore((state) => state.setAccessToken);
  const setRefreshToken = userStore((state) => state.setRefreshToken);

  const updateTokens = useCallback(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("token");
    const refreshToken = urlParams.get("refresh");

    if (accessToken && refreshToken) {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
    }
  }, [setAccessToken, setRefreshToken]);

  useLayoutEffect(() => {
    updateTokens();
  }, [updateTokens]);

  return <Outlet />;
};
