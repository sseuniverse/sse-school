import "./locales/i18n";
import "simplebar/dist/simplebar.css";
/* eslint-disable import/no-unresolved */
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
// import "./utils/mapboxgl";
import "mapbox-gl/dist/mapbox-gl.css";
import "react-quill/dist/quill.snow.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-lazy-load-image-component/src/effects/blur.css";

// ----------------------------------------------------------------------

import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import React from "react";
// @mui
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
// redux
import { store, persistor } from "./redux/store";
// routes
import Router from "./routes";
// theme
import ThemeProvider from "./theme";
// locales
import ThemeLocalization from "./locales";
import { StyledChart } from "./components/chart";
import SnackbarProvider from "./components/snackbar";
import ScrollToTop from "./components/scroll-to-top";
import { MotionLazyContainer } from "./components/animate";
import { ThemeSettings, SettingsProvider } from "./components/settings";

import { AuthProvider } from "./auth/JwtContext";
// import { AuthProvider } from './auth/Auth0Context';
// import { AuthProvider } from './auth/FirebaseContext';
// import { AuthProvider } from './auth/AwsCognitoContext';

function App() {
  React.useEffect(() => {
    document.addEventListener("contextmenu", (e) => e.preventDefault());

    function ctrlShiftKey(e, keyCode) {
      return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
    }

    document.onkeydown = (e) => {
      // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
      if (
        event.keyCode === 123 ||
        ctrlShiftKey(e, "I") ||
        ctrlShiftKey(e, "J") ||
        ctrlShiftKey(e, "C") ||
        (e.ctrlKey && e.keyCode === "U".charCodeAt(0))
      )
        return false;
    };
  }, []);

  return (
    <AuthProvider>
      <HelmetProvider>
        <ReduxProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
              <SettingsProvider>
                <BrowserRouter>
                  <ScrollToTop />
                  <MotionLazyContainer>
                    <ThemeProvider>
                      <ThemeSettings>
                        <ThemeLocalization>
                          <SnackbarProvider>
                            <StyledChart />
                            <Router />
                          </SnackbarProvider>
                        </ThemeLocalization>
                      </ThemeSettings>
                    </ThemeProvider>
                  </MotionLazyContainer>
                </BrowserRouter>
              </SettingsProvider>
            {/* </LocalizationProvider> */}
          </PersistGate>
        </ReduxProvider>
      </HelmetProvider>
    </AuthProvider>
  );
}

export default App;
