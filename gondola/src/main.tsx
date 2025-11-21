import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Gondola } from "./Gondola";
import { GondolaProvider } from "./context";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GondolaProvider>
      <Gondola />
    </GondolaProvider>
  </StrictMode>
);
