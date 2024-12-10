export const Login = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:3000/api/auth/google/login";
  };

  return (
    <>
      <h1>TrackMate</h1>
      <button className="btn" onClick={handleLogin}>
        Login with gmail
      </button>
    </>
  );
  return <></>;
};
