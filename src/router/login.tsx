import { createRoute, redirect } from "@tanstack/react-router";
import { rootRoute } from "./root";
import LoginPage from "../pages/LoginPage";

export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
  beforeLoad: () => {
    const sessionId = localStorage.getItem("sessionId");
    if (sessionId) {
      throw redirect({ to: "/dashboard/links" });
    }
  },
});
