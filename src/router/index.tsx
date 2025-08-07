import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage.tsx";
import ProtectedPage from "../pages/ProtectedPage.tsx";
import NotFoundPage from "../pages/404Page.tsx";
import AuthProtectedRoute from "./AuthProtectedRoute.tsx";
import Providers from "../Providers.tsx";
import { AuthPage } from "@/pages/AuthPage.tsx";
import DailyView from "@/pages/DailyView.tsx";
import InsertionsView from "@/pages/InsertionsView.tsx";
import ExtractionsView from "@/pages/ExtractionsView.tsx";

const router = createBrowserRouter([
  // I recommend you reflect the routes here in the pages folder
  {
    path: "/",
    element: <Providers />,
    children: [
      // Public routes
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/auth",
        element: <AuthPage />,
      },
      // Auth Protected routes
      {
        path: "/",
        element: <AuthProtectedRoute />,
        children: [
          {
            path: "/dashboard",
            element: <ProtectedPage />,
          },
          {
            path: "/daily-view",
            element: <DailyView />,
            children: [
              {
                path: "/daily-view",
                element: <InsertionsView />,
              },
              {
                path: "/daily-view/insertions",
                element: <InsertionsView />,
              },
              {
                path: "/daily-view/extractions",
                element: <ExtractionsView />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
