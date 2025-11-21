import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GondolaProvider } from "./context";
import { App } from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GondolaProvider>
      <App />
    </GondolaProvider>
  </StrictMode>
);
