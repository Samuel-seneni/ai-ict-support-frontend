import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext";
import { useSidebar } from "../../contexts/SidebarContext";

import {
  FaHome,
  FaTicketAlt,
  FaPlusCircle,
  FaChartBar,
  FaRobot,
  FaCog,
  FaSignOutAlt,
  FaChevronLeft,
} from "react-icons/fa";

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { collapsed, setCollapsed, mobileOpen } = useSidebar();

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
    { name: "Tickets", path: "/tickets", icon: <FaTicketAlt /> },
    { name: "Create Ticket", path: "/create-ticket", icon: <FaPlusCircle /> },
    { name: "Technicians", path: "/technicians", icon: <FaPlusCircle /> },
    { name: "Reports Analytics", path: "/reports", icon: <FaChartBar /> },
    { name: "AI Assistant", path: "/ai", icon: <FaRobot /> },
    { name: "Settings Panel", path: "/settings", icon: <FaCog /> },
  ];

  const sidebarContent = (
    <div className="h-full flex flex-col bg-[#0B1F3B] text-white shadow-2xl">

      {/* HEADER */}
      <div className="sticky top-0 z-10 px-3 py-4 flex justify-between items-center border-b border-white/10 bg-[#0B1F3B]">

        {!collapsed && (
          <h1 className="font-black text-sm tracking-widest">
            ICT CONTROL
          </h1>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-white/10 transition"
        >
          <FaChevronLeft className="text-white" />
        </button>

      </div>

      {/* MENU (VERTICAL SCROLL ENABLED) */}
      <div className="flex-1 overflow-y-auto px-2 py-4 space-y-1">

        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200
              ${
                isActive
                  ? "bg-blue-600 shadow-md shadow-blue-500/30"
                  : "hover:bg-white/10 text-white/80 hover:text-white"
              }`
            }
          >

            {/* ICON */}
            <span className="text-base w-6 flex justify-center">
              {item.icon}
            </span>

            {/* TEXT (ALWAYS PARTIALLY VISIBLE, NEVER DISAPPEARS COMPLETELY) */}
            {!collapsed && (
              <span className="text-[13px] font-medium truncate">
                {item.name}
              </span>
            )}

          </NavLink>
        ))}

      </div>

      {/* LOGOUT */}
      <div className="border-t border-white/10 p-2">

        <button
          onClick={async () => {
            await logout();
            navigate("/signin");
          }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-300 hover:bg-red-500/10 transition"
        >
          <FaSignOutAlt className="text-base" />

          {!collapsed && (
            <span className="text-[13px] font-medium">
              Logout
            </span>
          )}

        </button>

      </div>

    </div>
  );

  return (
    <>
      {/* DESKTOP FIXED WIDTH SIDEBAR */}
      <motion.div
        animate={{ width: collapsed ? 72 : 240 }}
        transition={{ duration: 0.2 }}
        className="hidden lg:block fixed h-full z-40"
      >
        {sidebarContent}
      </motion.div>

      {/* MOBILE */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 lg:hidden">
          <div className="w-72 h-full">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;