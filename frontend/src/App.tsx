import "./App.css";

import { Route, Routes } from "react-router";

import { Home } from "pages/Home/Home";
import { Login } from "pages/Login/Login";
import { ProtectedRoute } from "guards/ProtectedRoute/ProtectedRoute";
import { PublicRoute } from "guards/PublicRoute/PublicRoute";
import { TokenLoader } from "components/TokenLoader/TokenLoader";

function App() {
  return (
    <>
      <Routes>
        <Route element={<TokenLoader />}>
          <Route element={<ProtectedRoute />}>
            <Route index path="/" element={<Home />} />
            <Route index path="/one" element={<>Try one</>} />
            <Route index path="/two" element={<>Try two</>} />
          </Route>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
