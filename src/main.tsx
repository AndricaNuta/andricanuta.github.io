import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initializeAnalytics } from "./lib/analytics";

// Initialize analytics on app load
initializeAnalytics();

createRoot(document.getElementById("root")!).render(<App />);
