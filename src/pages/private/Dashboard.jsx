import React, { useEffect, useRef, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";

import {
  FaTicketAlt,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

import { motion, AnimatePresence } from "framer-motion";

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    resolved: 0,
    high: 0,
  });

  const [loading, setLoading] = useState(true);
  const [newTicketId, setNewTicketId] = useState(null);

  const prevCountRef = useRef(0);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tickets"), (snapshot) => {
      const ticketsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Detect new ticket
      const newCount = ticketsData.length;

      if (prevCountRef.current && newCount > prevCountRef.current) {
        const latestTicket = ticketsData[ticketsData.length - 1];
        setNewTicketId(latestTicket.id);

        setTimeout(() => setNewTicketId(null), 4000);
      }

      prevCountRef.current = newCount;

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
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const cards = [
    {
      title: "Total Tickets",
      value: stats.total,
      icon: <FaTicketAlt />,
    },
    {
      title: "Open Tickets",
      value: stats.open,
      icon: <FaClock />,
    },
    {
      title: "Resolved Tickets",
      value: stats.resolved,
      icon: <FaCheckCircle />,
    },
    {
      title: "High Priority",
      value: stats.high,
      icon: <FaExclamationTriangle />,
    },
  ];
  

  return (
    <div className="w-full min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">

        {/* ================= HEADER ================= */}
        <div className="bg-white rounded-3xl shadow border p-6 mb-6">

  <div className="flex flex-col lg:flex-row justify-between items-center gap-4">

    {/* LEFT SIDE */}
    <div className="text-center lg:text-left">
      <h1 className="text-3xl sm:text-4xl font-black text-blue-600 tracking-tight">
        ICT Control Center
      </h1>

      <p className="text-gray-500 mt-2 text-sm sm:text-base">
        Real-time system monitoring & ticket operations
      </p>
    </div>

    {/* RIGHT SIDE STATUS PILLS */}
    <div className="flex flex-wrap justify-center lg:justify-end items-center gap-2">

      <span className="px-4 py-1.5 text-xs font-semibold rounded-full bg-green-100 text-green-700 flex items-center justify-center text-center">
        ● System Online
      </span>

      <span className="px-4 py-1.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-center">
        ● Live Sync
      </span>

      <span className="px-4 py-1.5 text-xs font-semibold rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-center">
        ● Firestore Connected
      </span>

    </div>

  </div>
</div>

        {/* ================= KPI STRIP ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">

  {cards.map((card, index) => {
    const colors = [
      "from-blue-500 to-cyan-500",
      "from-yellow-500 to-orange-500",
      "from-green-500 to-emerald-500",
      "from-red-500 to-rose-500",
    ];

    return (
      <div
        key={index}
        className={`bg-gradient-to-r ${colors[index]} text-white rounded-3xl p-6 shadow-lg hover:scale-[1.02] transition`}
      >
        <div className="flex justify-between items-center">

          <div>
            <p className="text-white/80 text-sm font-medium">
              {card.title}
            </p>

            <h2 className="text-3xl font-black mt-2">
              {card.value}
            </h2>
          </div>

          <div className="text-4xl opacity-30">
            {card.icon}
          </div>

        </div>
      </div>
    );
  })}

</div>

        {/* ================= MAIN GRID ================= */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* LEFT: LIVE TICKETS */}
          <div className="lg:col-span-2 bg-white rounded-3xl border shadow-sm p-6">

            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">Live Ticket Stream</h2>
              <span className="text-xs px-3 py-1 bg-red-100 text-red-600 rounded-full">
                ● Live
              </span>
            </div>

            {loading ? (
              <div className="space-y-3 animate-pulse">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-16 bg-gray-200 rounded-2xl" />
                ))}
              </div>
            ) : tickets.length === 0 ? (
              <p className="text-center text-gray-500 py-10">
                No tickets available
              </p>
            ) : (
              <AnimatePresence>
                <div className="space-y-3">
                  {tickets.slice(0, 6).map((ticket) => (
                    <motion.div
                      key={ticket.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className={`p-4 border rounded-2xl transition ${
                        ticket.id === newTicketId
                          ? "bg-green-50 border-green-400 shadow-md"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <h3 className="font-semibold text-gray-800">
                        {ticket.title || "No title"}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {ticket.category || "Uncategorized"}
                      </p>

                      <div className="flex gap-2 mt-3 flex-wrap">
                        <span className="text-xs px-3 py-1 bg-gray-100 rounded-full">
                          {ticket.priority || "Low"}
                        </span>
                        <span className="text-xs px-3 py-1 bg-blue-100 rounded-full">
                          {ticket.status || "Open"}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            )}
          </div>

          {/* RIGHT PANEL */}
          <div className="space-y-6">

            {/* SYSTEM HEALTH */}
            <div className="bg-white rounded-3xl border shadow-sm p-6">
              <h2 className="font-bold mb-4">System Health</h2>

              <div className="text-sm space-y-4">

                <div>
                  <div className="flex justify-between">
                    <span>Resolved Rate</span>
                    <span className="text-green-600 font-bold">
                      {stats.total
                        ? Math.round((stats.resolved / stats.total) * 100)
                        : 0}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full mt-2">
                    <div
                      className="h-2 bg-green-500 rounded-full"
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

                <div>
                  <div className="flex justify-between">
                    <span>High Priority Load</span>
                    <span className="text-red-600 font-bold">
                      {stats.high}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full mt-2">
                    <div
                      className="h-2 bg-red-500 rounded-full"
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

            {/* QUICK ACTIONS */}
            <div className="bg-white rounded-3xl border shadow-sm p-6">
              <h2 className="font-bold mb-3">Quick Actions</h2>

              <button className="w-full mb-2 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700">
                Create Ticket
              </button>

              <button className="w-full py-2 rounded-xl bg-gray-100 hover:bg-gray-200">
                Export Report
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;