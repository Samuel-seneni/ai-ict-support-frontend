import React from "react";
import {
  FaTicketAlt,
  FaExclamationTriangle,
  FaCheckCircle,
  FaUsers,
} from "react-icons/fa";

const Card = ({ title, value, icon, color }) => (
  <div className={`${color} text-white p-6 rounded-2xl shadow`}>
    <div className="flex justify-between">
      <div>
        <p>{title}</p>
        <h2 className="text-3xl font-black">{value}</h2>
      </div>
      <div className="text-3xl opacity-60">{icon}</div>
    </div>
  </div>
);

const ReportCards = ({ tickets, technicians }) => {
  const open = tickets.filter((t) => t.status === "Open").length;
  const resolved = tickets.filter((t) => t.status === "Resolved").length;

  return (
    <div className="grid md:grid-cols-4 gap-6">

      <Card title="Total" value={tickets.length} icon={<FaTicketAlt />} color="bg-blue-500" />
      <Card title="Open" value={open} icon={<FaExclamationTriangle />} color="bg-yellow-500" />
      <Card title="Resolved" value={resolved} icon={<FaCheckCircle />} color="bg-green-500" />
      <Card title="Techs" value={technicians.length} icon={<FaUsers />} color="bg-purple-500" />

    </div>
  );
};

export default ReportCards;