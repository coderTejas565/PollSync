import { createBrowserRouter } from "react-router-dom";

import LoginPage from "../pages/LoginPage";

import SignupPage from "../pages/SignupPage";

import DashboardPage from "../pages/DashboardPage";

import CreatePollPage from "../pages/CreatePollPage";

import PublicPollPage from "../pages/PublicPollPage";

export const router =
  createBrowserRouter([
    {
      path: "/",
      element: <DashboardPage />,
    },

    {
      path: "/login",
      element: <LoginPage />,
    },

    {
      path: "/signup",
      element: <SignupPage />,
    },

    {
      path: "/dashboard",
      element: <DashboardPage />,
    },

    {
      path: "/create",
      element: <CreatePollPage />,
    },

    {
      path: "/poll/:slug",
      element: <PublicPollPage />,
    },
  ]);