import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

serviceWorkerRegistration.unregister();
