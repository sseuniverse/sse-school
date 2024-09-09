import { Suspense, lazy } from "react";
import LoadingScreen from "../components/loading-screen";

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// ----------------------------------------------------------------------

// AUTH
export const LoginPage = Loadable(
  lazy(() => import("../pages/auth/LoginPage"))
);
export const RegisterPage = Loadable(
  lazy(() => import("../pages/auth/RegisterPage"))
);
export const ResetPasswordPage = Loadable(
  lazy(() => import("../pages/auth/ResetPasswordPage"))
);
export const VerifyCodePage = Loadable(
  lazy(() => import("../pages/auth/VerifyCodePage"))
);
export const NewPasswordPage = Loadable(
  lazy(() => import("../pages/auth/NewPasswordPage"))
);

// Main
export const Page404 = Loadable(lazy(() => import("../pages/Page404")));
export const Page403 = Loadable(lazy(() => import("../pages/Page403")));
export const Page500 = Loadable(lazy(() => import("../pages/Page500")));
export const HomePage = Loadable(lazy(() => import("../pages/HomePage")));
export const AboutPage = Loadable(lazy(() => import("../pages/AboutPage")));
export const ComingSoonPage = Loadable(
  lazy(() => import("../pages/ComingSoonPage"))
);
export const ContactPage = Loadable(lazy(() => import("../pages/ContactPage")));
export const MaintenancePage = Loadable(
  lazy(() => import("../pages/MaintenancePage"))
);

// DASHBOARD: USER
export const UserProfilePage = Loadable(
  lazy(() => import("../pages/dashboard/UserProfilePage"))
);
export const UserCardsPage = Loadable(
  lazy(() => import("../pages/dashboard/UserCardsPage"))
);
export const UserListPage = Loadable(
  lazy(() => import("../pages/dashboard/UserListPage"))
);
export const UserAccountPage = Loadable(
  lazy(() => import("../pages/dashboard/UserAccountPage"))
);
export const UserCreatePage = Loadable(
  lazy(() => import("../pages/dashboard/UserCreatePage"))
);
export const UserEditPage = Loadable(
  lazy(() => import("../pages/dashboard/UserEditPage"))
);

// DASHBOARD: BLOG
export const BlogPostsPage = Loadable(
  lazy(() => import("../pages/dashboard/BlogPostsPage"))
);
export const BlogPostPage = Loadable(
  lazy(() => import("../pages/dashboard/BlogPostPage"))
);
export const BlogNewPostPage = Loadable(
  lazy(() => import("../pages/dashboard/BlogNewPostPage"))
);

// DASHBOARD: GENERAL
export const GeneralAppPage = Loadable(
  lazy(() => import("../pages/dashboard/GeneralAppPage"))
);

export const PermissionDeniedPage = Loadable(
  lazy(() => import("../pages/dashboard/PermissionDeniedPage"))
);

export const CalendarPage = Loadable(
  lazy(() => import("../pages/dashboard/CalendarPage"))
);

export const ChatPage = Loadable(lazy(() => import("../pages/ChatPage")));

export const KanbanPage = Loadable(
  lazy(() => import("../pages/dashboard/KanbanPage"))
);

// Dashboard: School
export const SchoolListPage = Loadable(
  lazy(() => import("../pages/dashboard/SchoolListPage"))
);

export const SchoolEditPage = Loadable(
  lazy(() => import("../pages/dashboard/SchoolEditPage"))
);

export const SchoolCreatePage = Loadable(
  lazy(() => import("../pages/dashboard/SchoolCreatePage"))
);

export const SchoolViewPage = Loadable(
  lazy(() => import("../pages/dashboard/SchoolViewPage"))
);
