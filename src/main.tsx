import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider 
    clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID as string}
  >
    <StrictMode>
      <App />
    </StrictMode>
  </GoogleOAuthProvider>
);
