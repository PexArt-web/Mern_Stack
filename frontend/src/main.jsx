import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { WorkOutContextProvider } from "./context/workOutContext.jsx";
import { AuthContextProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <WorkOutContextProvider>
        <App />
      </WorkOutContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
