import React, { useState } from "react";

import {
  FaHome,
  FaTicketAlt,
  FaPlusCircle,
  FaChartBar,
  FaRobot,
  FaCog,
  FaChevronLeft,
  FaChevronRight,
  FaSignOutAlt,
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// ✅ FIXED IMPORTS
import { useAuth } from "../../contexts/AuthContext";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, path: "/dashboard" },
    { name: "Tickets", icon: <FaTicketAlt />, path: "/tickets" },
    { name: "Create Ticket", icon: <FaPlusCircle />, path: "/create-ticket" },
    { name: "Reports", icon: <FaChartBar />, path: "/reports" },
    { name: "AI Assistant", icon: <FaRobot />, path: "/ai-help" },
    { name: "Settings", icon: <FaCog />, path: "/settings" },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/signin");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  const userInitial =
    user?.displayName?.charAt(0) ||
    user?.email?.charAt(0) ||
    "U";

  return (
    <motion.div
      animate={{ width: collapsed ? 90 : 280 }}
      transition={{ duration: 0.25 }}
      className="fixed left-0 top-0 z-50 h-screen bg-white border-r border-gray-200 shadow-xl"
    >
      <div className="flex flex-col h-full">

        {/* HEADER */}
        <div>

          <div className="h-20 flex items-center justify-between px-4 border-b border-gray-200">

            {!collapsed && (
              <div>
                <h1 className="text-xl font-black text-blue-600">
                  Smart ICT Desk
                </h1>
                <p className="text-xs text-gray-500">
                  Support System
                </p>
              </div>
            )}

            <button
              onClick={() => setCollapsed(!collapsed)}
              className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600"
            >
              {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
            </button>

          </div>

          {/* USER */}
          <div className="px-3 py-5 border-b border-gray-200">

            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-4 text-white flex items-center gap-3">

              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
                {userInitial}
              </div>

              {!collapsed && (
                <div className="leading-tight">
                  <p className="font-semibold">
                    {user?.displayName || user?.email || "User"}
                  </p>
                  <p className="text-xs text-blue-100">
                    ICT User
                  </p>
                </div>
              )}

            </div>

          </div>

        </div>

        {/* NAV */}
        <div className="flex-1 overflow-y-auto px-3 py-6 space-y-2">

          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl font-semibold transition ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>

              {!collapsed && <span>{item.name}</span>}
            </NavLink>
          ))}

        </div>

        {/* BOTTOM */}
        <div className="p-3 border-t border-gray-200 space-y-3">

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition"
          >
            <FaSignOutAlt />
            {!collapsed && "Logout"}
          </button>

        </div>

      </div>
    </motion.div>
  );
};

export default Sidebar;