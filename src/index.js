import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ScrollToTop from "./utility/ScrollToTop"; // ensure each page scrolls to top when mounted

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={new QueryClient()}>
    <React.StrictMode>
      <BrowserRouter>
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </QueryClientProvider>
);
