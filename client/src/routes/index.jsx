import { createBrowserRouter } from "react-router-dom";

import LoginPage from "../pages/LoginPage";

import SignupPage from "../pages/SignupPage";

import DashboardPage from "../pages/DashboardPage";

import CreatePollPage from "../pages/CreatePollPage";

import PublicPollPage from "../pages/PublicPollPage";

import PublicResultsPage from "../pages/PublicResultsPage";

import AnalyticsPage from "../pages/AnalyticsPage";

import ProtectedRoute from "../components/ProtectedRoute";

import AppLayout from "../components/AppLayout";

import PublicLayout from "../components/PublicLayout";

import ProductPage from "../pages/ProductPage";

export const router = createBrowserRouter([

{
   path:"/",
   element:<PublicLayout />,
   children:[

      { index:true, element:<ProductPage /> },

      { path:"login", element:<LoginPage/> },

      { path:"signup", element:<SignupPage/> },

      { path:"poll/:slug",
        element:<PublicPollPage/>
      },

      { path:"poll/:slug/results",
        element:<PublicResultsPage/>
      }

   ]
},

{
   path:"/",
   element:<AppLayout />,
   children:[

      {
         path:"dashboard",
         element:
         <ProtectedRoute>
            <DashboardPage/>
         </ProtectedRoute>
      },

      {
         path:"create",
         element:
         <ProtectedRoute>
            <CreatePollPage/>
         </ProtectedRoute>
      }

   ]
}

]);