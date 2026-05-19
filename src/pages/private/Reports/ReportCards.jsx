import React from "react";
import {
  FaTicketAlt,
  FaExclamationTriangle,
  FaCheckCircle,
  FaUsers,
  FaClock,
  FaFire,
} from "react-icons/fa";

import { motion } from "framer-motion";

const Card = ({ title, value, icon, gradient }) => (
  <motion.div
    whileHover={{ scale: 1.04 }}
    className={`${gradient} text-white p-6 rounded-2xl shadow-lg`}
  >
    <div className="flex justify-between items-center">
      <div>
        <p className="text-sm opacity-80">{title}</p>
        <h2 className="text-3xl font-black">{value}</h2>
      </div>
      <div className="text-4xl opacity-30">{icon}</div>
    </div>
  </motion.div>
);

const ReportCards = ({ tickets = [], technicians = [] }) => {
  const open = tickets.filter((t) => t.status === "Open").length;
  const resolved = tickets.filter((t) => t.status === "Resolved").length;
  const critical = tickets.filter(
    (t) => t.priority === "Critical"
  ).length;

  const overdue = tickets.filter(
    (t) => t.slaDeadline && new Date(t.slaDeadline) < new Date()
  ).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

      <Card
        title="Total Tickets"
        value={tickets.length}
        icon={<FaTicketAlt />}
        gradient="bg-gradient-to-r from-blue-600 to-cyan-500"
      />

      <Card
        title="Open Backlog"
        value={open}
        icon={<FaExclamationTriangle />}
        gradient="bg-gradient-to-r from-yellow-500 to-orange-500"
      />

      <Card
        title="Critical Alerts"
        value={critical}
        icon={<FaFire />}
        gradient="bg-gradient-to-r from-red-500 to-pink-500"
      />

      <Card
        title="SLA Breaches"
        value={overdue}
        icon={<FaClock />}
        gradient="bg-gradient-to-r from-purple-600 to-indigo-500"
      />

    </div>
  );
};

export default ReportCards;