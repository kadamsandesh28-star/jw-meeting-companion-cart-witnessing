import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";

import { AppThemeProvider } from "./theme/ThemeContext";
import { WorkspaceProvider } from "./contexts/WorkspaceContext";
import { ElderAuthProvider } from "./contexts/ElderAuthContext";
import { PlannerProvider } from "./contexts/PlannerContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppThemeProvider>
      <WorkspaceProvider>
        <ElderAuthProvider>
          <PlannerProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </PlannerProvider>
        </ElderAuthProvider>
      </WorkspaceProvider>
    </AppThemeProvider>
  </React.StrictMode>
);