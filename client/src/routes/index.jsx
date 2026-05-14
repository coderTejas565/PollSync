import { createBrowserRouter } from "react-router-dom";

import LoginPage from "../pages/LoginPage";

import SignupPage from "../pages/SignupPage";

import DashboardPage from "../pages/DashboardPage";

import CreatePollPage from "../pages/CreatePollPage";

import PublicPollPage from "../pages/PublicPollPage";

import PublicResultsPage from "../pages/PublicResultsPage";

import ProtectedRoute from "../components/ProtectedRoute";

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
      element:  <ProtectedRoute> <DashboardPage />
      </ProtectedRoute>,
    },

    {
      path: "/create",
      element:  <ProtectedRoute> <CreatePollPage />
      </ProtectedRoute>,
    },

    {
      path: "/poll/:slug",
      element: <PublicPollPage />,
    },
    {
      path: "/poll/:slug/results",
      element: <PublicResultsPage />
    }
  ]);