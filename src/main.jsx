import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./index.css";

import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext.jsx";
import { SidebarProvider } from "./contexts/SidebarContext.jsx";
import { LoaderProvider } from "./contexts/LoaderContext.jsx";

import Loader from "./components/common/Loader.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <BrowserRouter>

      <AuthProvider>

        <LoaderProvider>

          <SidebarProvider>

            <App />

            {/* GLOBAL LOADER */}
            <Loader />

          </SidebarProvider>

        </LoaderProvider>

      </AuthProvider>

    </BrowserRouter>

  </React.StrictMode>
);