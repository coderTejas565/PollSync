import { createBrowserRouter } from "react-router-dom";

import LoginPage from "../pages/LoginPage";

import SignupPage from "../pages/SignupPage";

import DashboardPage from "../pages/DashboardPage";

import CreatePollPage from "../pages/CreatePollPage";

import PublicPollPage from "../pages/PublicPollPage";

import PublicResultsPage from "../pages/PublicResultsPage";

import AnalyticsPage from "../pages/AnalyticsPage";

import ProtectedRoute from "../components/ProtectedRoute";

import Layout from "../components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "create",
        element: (
          <ProtectedRoute>
            <CreatePollPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard/poll/:pollId/analytics",
        element: (
          <ProtectedRoute>
            <AnalyticsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "poll/:slug",
        element: <PublicPollPage />,
      },
      {
        path: "poll/:slug/results",
        element: <PublicResultsPage />,
      },
    ],
  },
]);