import { Routes, Route } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import PrivateLayout from "../layouts/PrivateLayout";
import ProtectedRoute from "./ProtectedRoute";

// PUBLIC PAGES
import Home from "../pages/public/Home";
import About from "../pages/public/About";
import FAQ from "../pages/public/FAQ";
import Contact from "../pages/public/Contact";

// AUTH PAGES
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";

// PRIVATE PAGES
import Dashboard from "../pages/private/Dashboard";
import Tickets from "../pages/private/Tickets";
import CreateTicket from "../pages/private/CreateTickets";

// NEW PAGES (added)
import Reports from "../pages/private/Reports/Reports.jsx";
import AI from "../pages/private/AiAssistant.jsx";
import Settings from "../pages/private/Settings";

const AppRoutes = () => {
  return (
    <Routes>

      {/* PUBLIC ROUTES */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* AUTH ROUTES */}
      <Route path="/signin" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* PRIVATE ROUTES */}
      <Route
        element={
          <ProtectedRoute>
            <PrivateLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/create-ticket" element={<CreateTicket />} />

        {/* NEW ROUTES */}
        <Route path="/reports" element={<Reports />} />
        <Route path="/ai" element={<AI />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

    </Routes>
  );
};

export default AppRoutes;