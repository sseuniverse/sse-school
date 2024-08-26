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

// DASHBOARD: GENERAL
export const GeneralAppPage = Loadable(
  lazy(() => import("../pages/dashboard/GeneralAppPage"))
);
