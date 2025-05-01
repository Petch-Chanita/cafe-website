import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CafeProvider } from "./contexts/CafeContext.tsx";
import { HeroUIProvider } from "@heroui/react";

createRoot(document.getElementById("root")!).render(
  <HeroUIProvider>
    <CafeProvider>
      <App />
    </CafeProvider>
  </HeroUIProvider>
);
