import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../../firebase/firebase";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [technician, setTechnician] = useState("");
  const [statusUpdate, setStatusUpdate] = useState("");

  // ================= REAL-TIME FETCH =================
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tickets"), (snapshot) => {
      const data = snapshot.docs.map((docItem) => ({
        id: docItem.id,
        ...docItem.data(),
      }));

      setTickets(data);
    });

    return () => unsubscribe();
  }, []);

  // ================= AI ENGINE =================
  const analyzeTicket = (ticket) => {
    const text = `${ticket.title} ${ticket.description}`.toLowerCase();

    let aiPriority = "Low";
    let aiCategory = ticket.category || "General";

    if (
      text.includes("server") ||
      text.includes("down") ||
      text.includes("network") ||
      text.includes("urgent") ||
      text.includes("critical")
    ) {
      aiPriority = "Critical";
    } else if (
      text.includes("password") ||
      text.includes("login") ||
      text.includes("error")
    ) {
      aiPriority = "High";
    } else if (text.includes("slow") || text.includes("help")) {
      aiPriority = "Medium";
    }

    if (text.includes("printer")) aiCategory = "Hardware";
    if (text.includes("wifi") || text.includes("network")) aiCategory = "Network";
    if (text.includes("email")) aiCategory = "Software";

    return { aiPriority, aiCategory };
  };

  // ================= FILTER =================
  const filterTickets = (list) =>
    list.filter((t) =>
      t.title?.toLowerCase().includes(search.toLowerCase())
    );

  // ================= KANBAN GROUPS =================
  const openTickets = filterTickets(
    tickets.filter((t) => t.status === "Open")
  );

  const pendingTickets = filterTickets(
    tickets.filter((t) => t.status === "Pending")
  );

  const resolvedTickets = filterTickets(
    tickets.filter((t) => t.status === "Resolved")
  );

  // ================= MOVE TICKET =================
  const moveTicket = async (ticket, newStatus) => {
    const ref = doc(db, "tickets", ticket.id);

    await updateDoc(ref, {
      status: newStatus,
      assignedTo: technician || ticket.assignedTo,
    });
  };

  // ================= TICKET CARD =================
  const TicketCard = ({ ticket }) => {
    const ai = analyzeTicket(ticket);

    return (
      <motion.div
        layout
        className="bg-white p-4 rounded-2xl border shadow-sm hover:shadow-md transition"
      >
        <h3 className="font-bold text-gray-800">
          {ticket.title}
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          {ticket.description?.slice(0, 80)}
        </p>

        {/* AI BADGES */}
        <div className="flex gap-2 mt-3 flex-wrap">
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              ai.aiPriority === "Critical"
                ? "bg-red-100 text-red-700"
                : ai.aiPriority === "High"
                ? "bg-orange-100 text-orange-700"
                : ai.aiPriority === "Medium"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            AI: {ai.aiPriority}
          </span>

          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
            {ai.aiCategory}
          </span>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-2 mt-4 flex-wrap">
          <button
            onClick={() => {
              setSelectedTicket(ticket);
              setModalOpen(true);
            }}
            className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-sm"
          >
            Manage
          </button>

          {ticket.status !== "Pending" && (
            <button
              onClick={() => moveTicket(ticket, "Pending")}
              className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-sm"
            >
              Move
            </button>
          )}

          {ticket.status !== "Resolved" && (
            <button
              onClick={() => moveTicket(ticket, "Resolved")}
              className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm"
            >
              Resolve
            </button>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 px-4 py-6">

      {/* HEADER */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black text-blue-600">
          Jira AI Ticket Board
        </h1>
        <p className="text-gray-500 mt-2">
          Smart ICT Helpdesk System with AI classification
        </p>
      </div>

      {/* SEARCH */}
      <div className="max-w-3xl mx-auto mb-8 relative">
        <FaSearch className="absolute top-4 left-4 text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tickets..."
          className="w-full border p-4 pl-12 rounded-xl"
        />
      </div>

      {/* ================= CENTERED BOARD ================= */}
      <div className="flex justify-center">
        <div className="w-full max-w-6xl bg-white border shadow-sm rounded-3xl p-6">

          {/* BOARD TITLE */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-black text-gray-800">
              Ticket Workflow Board
            </h2>
            <p className="text-sm text-gray-500">
              Manage ICT incidents using AI-assisted workflow
            </p>
          </div>

          {/* KANBAN GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* OPEN */}
            <div className="bg-gray-50 border rounded-2xl p-4">
              <h2 className="font-bold mb-4 text-blue-600 text-center">
                Open ({openTickets.length})
              </h2>

              <div className="space-y-3">
                {openTickets.map((t) => (
                  <TicketCard key={t.id} ticket={t} />
                ))}
              </div>
            </div>

            {/* PENDING */}
            <div className="bg-gray-50 border rounded-2xl p-4">
              <h2 className="font-bold mb-4 text-yellow-600 text-center">
                Pending ({pendingTickets.length})
              </h2>

              <div className="space-y-3">
                {pendingTickets.map((t) => (
                  <TicketCard key={t.id} ticket={t} />
                ))}
              </div>
            </div>

            {/* RESOLVED */}
            <div className="bg-gray-50 border rounded-2xl p-4">
              <h2 className="font-bold mb-4 text-green-600 text-center">
                Resolved ({resolvedTickets.length})
              </h2>

              <div className="space-y-3">
                {resolvedTickets.map((t) => (
                  <TicketCard key={t.id} ticket={t} />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {modalOpen && selectedTicket && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-2xl w-full max-w-xl">

            <h2 className="text-xl font-bold mb-3">
              Manage Ticket
            </h2>

            <input
              value={technician}
              onChange={(e) => setTechnician(e.target.value)}
              placeholder="Assign Technician"
              className="w-full border p-3 rounded-xl mb-3"
            />

            <select
              value={statusUpdate}
              onChange={(e) => setStatusUpdate(e.target.value)}
              className="w-full border p-3 rounded-xl mb-4"
            >
              <option value="">Update Status</option>
              <option>Open</option>
              <option>Pending</option>
              <option>Resolved</option>
            </select>

            <div className="flex justify-between">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-xl"
              >
                Close
              </button>

              <button
                onClick={async () => {
                  const ref = doc(db, "tickets", selectedTicket.id);

                  await updateDoc(ref, {
                    assignedTo: technician || selectedTicket.assignedTo,
                    status: statusUpdate || selectedTicket.status,
                  });

                  setModalOpen(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Tickets;