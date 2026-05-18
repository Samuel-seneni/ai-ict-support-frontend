import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";

import {
  FaTicketAlt,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

import { motion } from "framer-motion";

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    resolved: 0,
    high: 0,
  });

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tickets"));

        const ticketsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTickets(ticketsData || []);

        const total = ticketsData.length;
        const open = ticketsData.filter((t) => t?.status === "Open").length;
        const resolved = ticketsData.filter(
          (t) => t?.status === "Resolved"
        ).length;
        const high = ticketsData.filter(
          (t) => t?.priority === "High" || t?.priority === "Critical"
        ).length;

        setStats({ total, open, resolved, high });
      } catch (error) {
        console.log("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, []);

  const cards = [
    {
      title: "Total Tickets",
      value: stats.total,
      icon: <FaTicketAlt />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Open Tickets",
      value: stats.open,
      icon: <FaClock />,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Resolved Tickets",
      value: stats.resolved,
      icon: <FaCheckCircle />,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "High Priority",
      value: stats.high,
      icon: <FaExclamationTriangle />,
      color: "from-red-500 to-rose-500",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

      {/* HEADER (always instant) */}
      <div className="mb-10">
        <h1 className="text-4xl font-black text-gray-900">
          Dashboard
        </h1>
        <p className="text-gray-600 mt-2">
          Smart ICT Desk Analytics Overview
        </p>
      </div>

      {/* STATS (renders instantly with 0 fallback) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`bg-gradient-to-r ${card.color} text-white rounded-3xl p-6 shadow-xl`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-white/80 text-sm">{card.title}</p>
                <h2 className="text-4xl font-black mt-2">
                  {card.value}
                </h2>
              </div>
              <div className="text-4xl opacity-30">
                {card.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CONTENT GRID */}
      <div className="grid lg:grid-cols-3 gap-6 mt-10">

        {/* RECENT TICKETS */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg border p-6">
          <h2 className="text-2xl font-bold mb-6">
            Recent Tickets
          </h2>

          {tickets.length === 0 ? (
            <p className="text-gray-500 text-center py-10">
              No tickets available
            </p>
          ) : (
            <div className="space-y-4">
              {tickets.slice(0, 5).map((ticket) => (
                <div
                  key={ticket.id}
                  className="p-4 border rounded-2xl hover:bg-blue-50 transition"
                >
                  <h3 className="font-semibold text-gray-800">
                    {ticket.title || "No title"}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {ticket.category || "Uncategorized"}
                  </p>

                  <div className="flex gap-2 mt-3">
                    <span className="text-xs px-3 py-1 bg-gray-100 rounded-full">
                      {ticket.priority || "Low"}
                    </span>

                    <span className="text-xs px-3 py-1 bg-blue-100 rounded-full">
                      {ticket.status || "Open"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ANALYTICS */}
        <div className="bg-white rounded-3xl shadow-lg border p-6">
          <h2 className="text-2xl font-bold mb-6">
            Analytics
          </h2>

          <div className="space-y-6">

            {/* RESOLVED */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Resolved Rate</span>
                <span className="text-green-600 font-bold">
                  {stats.total
                    ? Math.round((stats.resolved / stats.total) * 100)
                    : 0}
                  %
                </span>
              </div>

              <div className="h-3 bg-gray-200 rounded-full">
                <div
                  className="h-3 bg-green-500 rounded-full"
                  style={{
                    width: `${
                      stats.total
                        ? (stats.resolved / stats.total) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>

            {/* HIGH PRIORITY */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>High Priority</span>
                <span className="text-red-600 font-bold">
                  {stats.high}
                </span>
              </div>

              <div className="h-3 bg-gray-200 rounded-full">
                <div
                  className="h-3 bg-red-500 rounded-full"
                  style={{
                    width: `${
                      stats.total
                        ? (stats.high / stats.total) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;