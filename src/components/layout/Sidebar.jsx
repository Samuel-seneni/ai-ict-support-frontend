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
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { collapsed, setCollapsed, mobileOpen, setMobileOpen } =
    useSidebar();

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
    { name: "Tickets", path: "/tickets", icon: <FaTicketAlt /> },
    { name: "Create", path: "/create-ticket", icon: <FaPlusCircle /> },
    { name: "Reports", path: "/reports", icon: <FaChartBar /> },
    { name: "AI", path: "/ai", icon: <FaRobot /> },
    { name: "Settings", path: "/settings", icon: <FaCog /> },
  ];

  const sidebarContent = (
    <div className="h-full flex flex-col bg-white border-r">

      {/* HEADER */}
      <div className="p-4 flex justify-between items-center border-b">
        {!collapsed && <h1 className="font-bold">ICT Desk</h1>}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2"
        >
          <FaChevronLeft />
        </button>
      </div>

      {/* MENU */}
      <div className="flex-1 p-3 space-y-2">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100"
          >
            {item.icon}
            {!collapsed && <span>{item.name}</span>}
          </NavLink>
        ))}
      </div>

      {/* LOGOUT */}
      <button
        onClick={async () => {
          await logout();
          navigate("/signin");
        }}
        className="p-4 flex items-center gap-3 text-red-500 border-t"
      >
        <FaSignOutAlt />
        {!collapsed && "Logout"}
      </button>
    </div>
  );

  return (
    <>
      {/* DESKTOP */}
      <motion.div
        animate={{ width: collapsed ? 80 : 260 }}
        className="hidden lg:block fixed h-full z-40"
      >
        {sidebarContent}
      </motion.div>

      {/* MOBILE */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 lg:hidden">
          <div className="w-64 h-full bg-white">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;