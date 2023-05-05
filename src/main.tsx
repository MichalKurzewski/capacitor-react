import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import DevDashboardProvider from "./contexts/DevDashboardProvider";
import DevDashboard from "./components/pages/DevDashboard";

const isDevelopment = import.meta.env.VITE_ENV === "development";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <DevDashboardProvider>
    <React.StrictMode>
      {isDevelopment && <DevDashboard />}
      <App />
    </React.StrictMode>
  </DevDashboardProvider>
);
