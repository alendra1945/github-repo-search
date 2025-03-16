import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./locale/index.ts";
import "./index.css";
import App from "./App.tsx";
import { QueryClientProvider } from "./providers/query-client-providers.tsx";
import { Toaster } from "@/components/ui/sonner";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider>
      <App />
      <Toaster />
    </QueryClientProvider>
  </StrictMode>,
);
