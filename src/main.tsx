import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initializeAnalytics } from "./lib/analytics";
import { initSafariSmoothScroll } from "./lib/motion-config";
import "./lib/i18n/config";

// Initialize analytics on app load
initializeAnalytics();

// Initialize Safari smooth scroll polyfill
initSafariSmoothScroll();

createRoot(document.getElementById("root")!).render(<App />);
