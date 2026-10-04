import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { setupAuthInterceptor } from "./api/authInterceptor.ts";

setupAuthInterceptor(() => {
  console.log("La sesión expiró por completo, redirigiendo al login...");
  window.location.href = "/login";
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
