import { Link, useNavigate } from "react-router";

import { userStore } from "store/userStore";

export const Home = () => {
  const navigate = useNavigate();
  const accessToken = userStore((state) => state.accessToken);
  const refreshToken = userStore((state) => state.refreshToken);
  const setAccessToken = userStore((state) => state.setAccessToken);
  const setRefreshToken = userStore((state) => state.setRefreshToken);

  const handleLogOut = () => {
    setAccessToken("");
    setRefreshToken("");
    navigate("/login");
  };

  return (
    <>
      Access TOKEN: {accessToken}
      Refresh TOKEN: {refreshToken}
      <div>
        <Link to="/one">ONE</Link> | <Link to="/two">TWO</Link> |
        <Link to="/login">LOGIN</Link> |
        <button onClick={handleLogOut}>LOGOUT</button>
      </div>
    </>
  );
};
