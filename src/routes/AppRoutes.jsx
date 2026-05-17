import { Routes, Route } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import PrivateLayout from "../layouts/PrivateLayout";

import ProtectedRoute from "./ProtectedRoute";

// Public pages
import Home from "../pages/public/Home";
import About from "../pages/public/About";
import FAQ from "../pages/public/FAQ";
import Contact from "../pages/public/Contact";

// Private pages
import Dashboard from "../pages/private/Dashboard";
import Tickets from "../pages/private/Tickets";

const AppRoutes = () => {
  return (
    <Routes>

      {/* 🌍 PUBLIC ROUTES */}
      <Route
        path="/"
        element={
          <PublicLayout>
            <Home />
          </PublicLayout>
        }
      />

      <Route
        path="/about"
        element={
          <PublicLayout>
            <About />
          </PublicLayout>
        }
      />

      <Route
        path="/faq"
        element={
          <PublicLayout>
            <FAQ />
          </PublicLayout>
        }
      />

      <Route
        path="/contact"
        element={
          <PublicLayout>
            <Contact />
          </PublicLayout>
        }
      />
{/*
      {/* 🔐 PRIVATE ROUTES */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <PrivateLayout>
              <Dashboard />
            </PrivateLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/tickets"
        element={
          <ProtectedRoute>
            <PrivateLayout>
              <Tickets />
            </PrivateLayout>
          </ProtectedRoute>
        }
      />
      

    </Routes> 
  );
};

export default AppRoutes;