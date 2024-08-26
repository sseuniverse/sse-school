import { Navigate, useRoutes } from "react-router-dom";
import AuthGuard from "../auth/AuthGuard";
import GuestGuard from "../auth/GuestGuard";
import MainLayout from "../layouts/main";
import SimpleLayout from "../layouts/simple";
import CompactLayout from "../layouts/compact";
import DashboardLayout from "../layouts/dashboard";
import { PATH_AFTER_LOGIN } from "../config-global";

import {
  // Auth
  LoginPage,
  RegisterPage,
  ResetPasswordPage,
  VerifyCodePage,
  NewPasswordPage,

  // Main
  Page404,
  ComingSoonPage,
  Page403,
  Page500,
  HomePage,
  AboutPage,

  // Dashboard - General
  GeneralAppPage,
} from "./elements";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // Auth
    {
      path: "auth",
      children: [
        {
          path: "login",
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
        },
        {
          path: "register",
          element: (
            <GuestGuard>
              <RegisterPage />
            </GuestGuard>
          ),
        },
        { path: "login-unprotected", element: <LoginPage /> },
        { path: "register-unprotected", element: <RegisterPage /> },
        {
          element: <CompactLayout />,
          children: [
            { path: "reset-password", element: <ResetPasswordPage /> },
            { path: "new-password", element: <NewPasswordPage /> },
            { path: "verify", element: <VerifyCodePage /> },
          ],
        },
      ],
    },

    // Dashboard
    {
      path: "dashboard",
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: "app", element: <GeneralAppPage /> },
      ],
    },

    // Main Routes
    {
      element: <MainLayout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/about-us", element: <AboutPage /> },
      ],
    },
    {
      element: <CompactLayout />,
      children: [
        { path: "404", element: <Page404 /> },
        { path: "403", element: <Page403 /> },
        { path: "500", element: <Page500 /> },
        { path: "/comming-soon", element: <ComingSoonPage /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
