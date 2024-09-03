import { Navigate, useRoutes } from "react-router-dom";
import AuthGuard from "../auth/AuthGuard";
import GuestGuard from "../auth/GuestGuard";
import MainLayout from "../layouts/main";
import SimpleLayout from "../layouts/simple";
import CompactLayout from "../layouts/compact";
import DashboardLayout from "../layouts/dashboard";
import { PATH_AFTER_LOGIN } from "../config-global";
import RoleLayout from "../auth/RoleBasedGuard";

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
  PermissionDeniedPage,
  Page500,
  HomePage,
  AboutPage,
  ContactPage,
  MaintenancePage,

  // Dashboard - User
  UserProfilePage,
  UserCardsPage,
  UserListPage,
  UserCreatePage,
  UserEditPage,
  UserAccountPage,

  // Dashboard - General
  GeneralAppPage,
  CalendarPage,

  // Dashboard - School
  SchoolListPage,
  SchoolCreatePage,
  SchoolEditPage,
  SchoolViewPage
} from "./elements";

const roleAd = "admin";
const roleTe = "teacher";

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
        { path: "permission-denied", element: <PermissionDeniedPage /> },
        {
          path: "user",
          children: [
            {
              element: <Navigate to="/dashboard/user/profile" replace />,
              index: true,
            },
            { path: "profile", element: <UserProfilePage /> },
            { path: "cards", element: <UserCardsPage /> },
            { path: "list", element: <UserListPage /> },
            { path: "new", element: <UserCreatePage /> },
            { path: ":name/edit", element: <UserEditPage /> },
            { path: "account", element: <UserAccountPage /> },
          ],
        },
        {
          path: "school",
          children: [
            {
              element: <Navigate to="/dashboard/school/list" replace />,
              index: true,
            },
            {
              path: "list",
              element: (
                <RoleLayout hasContent roles={[roleAd]}>
                  <SchoolListPage />
                </RoleLayout>
              ),
            },
            {
              path: ":id/edit",
              element: (
                <RoleLayout hasContent roles={[roleAd]}>
                  <SchoolEditPage />
                </RoleLayout>
              ),
            },
            {
              path: "new",
              element: (
                <RoleLayout hasContent roles={[roleAd]}>
                  <SchoolCreatePage />
                </RoleLayout>
              ),
            },
            {
              path: ":id",
              element: <SchoolViewPage />
            }
          ],
        },
        // { path: "calendar", element: <CalendarPage /> },
      ],
    },

    // Main Routes
    {
      element: <MainLayout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/about-us", element: <AboutPage /> },
        { path: "/contact-us", element: <ContactPage /> },
      ],
    },
    {
      element: <CompactLayout />,
      children: [
        { path: "404", element: <Page404 /> },
        { path: "403", element: <Page403 /> },
        { path: "500", element: <Page500 /> },
        { path: "/comming-soon", element: <ComingSoonPage /> },
        { path: "maintenance", element: <MaintenancePage /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
