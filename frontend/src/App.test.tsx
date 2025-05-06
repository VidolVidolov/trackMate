import { MemoryRouter, Outlet } from "react-router";
import { describe, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import App from "./App";

vi.mock("pages/Home/Home", () => ({
  Home: () => <div>Home Page</div>,
}));

vi.mock("pages/Login/Login", () => ({
  Login: () => <div>Login Page</div>,
}));

vi.mock("guards/ProtectedRoute/ProtectedRoute", () => ({
  ProtectedRoute: () => <Outlet />,
}));

vi.mock("guards/PublicRoute/PublicRoute", () => ({
  PublicRoute: () => <Outlet />,
}));

vi.mock("components/TokenLoader/TokenLoader", () => ({
  TokenLoader: () => <Outlet />,
}));

describe("App Component", () => {
  it("renders the Home page for the root route", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Home Page")).toBeInTheDocument();
  });

  it("renders the Login page for the /login route", () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });
});
