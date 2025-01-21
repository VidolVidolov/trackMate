import React from "react";

export const Login: React.FC = () => {
  const handleGoogleLogin = () => {
    window.location.href = `http://${
      import.meta.env.VITE_BACKEND_BASE_URL
    }/api/auth/google/login`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-primary via-neutral to-accent text-white">
      <div className="card w-96 bg-base-100 shadow-2xl rounded-3xl p-6">
        <div className="card-body items-center text-center">
          <h1 className="text-5xl font-extrabold mb-6 text-secondary drop-shadow-lg">
            Welcome to TrackMate
          </h1>
          <p className="text-xl mb-8 text-white">
            Sign in with Google to meet with your ride buddies.
          </p>

          <button
            onClick={handleGoogleLogin}
            className="btn btn-primary w-full text-white hover:bg-secondary hover:scale-105 transition-transform"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google Logo"
              className="w-6 h-6 mr-2"
            />
            Login with Google
          </button>
          <div className="mt-6">
            <p className="text-sm text-white">
              By signing in, you agree to our{" "}
              <a href="#" className="link text-secondary">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="link text-secondary">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
