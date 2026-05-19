import React, { useEffect, useState } from "react";

import {
  collection,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from "../../firebase/firebase";

import {
  FaSearch,
  FaTicketAlt,
  FaTrash,
  FaEdit,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

import { motion } from "framer-motion";

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [technician, setTechnician] = useState("");
  const [statusUpdate, setStatusUpdate] = useState("");

  // REALTIME FETCH
  useEffect(() => {
    const q = query(
      collection(db, "tickets"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((docItem) => ({
          id: docItem.id,
          ...docItem.data(),
        }));

        setTickets(data);
        setFilteredTickets(data);
        setLoading(false);
      },
      (error) => {
        console.log(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // FILTERING
  useEffect(() => {
    let result = [...tickets];

    // SEARCH
    if (search) {
      result = result.filter((t) =>
        t.title?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // STATUS
    if (statusFilter !== "All") {
      result = result.filter(
        (t) =>
          t.status?.toLowerCase() ===
          statusFilter.toLowerCase()
      );
    }

    // PRIORITY
    if (priorityFilter !== "All") {
      result = result.filter(
        (t) =>
          t.priority?.toLowerCase() ===
          priorityFilter.toLowerCase()
      );
    }

    setFilteredTickets(result);
  }, [tickets, search, statusFilter, priorityFilter]);

  // DELETE
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "tickets", id));
    } catch (error) {
      console.log(error);
    }
  };

  // STATUS COLOR
  const getStatusColor = (status) => {
    switch (status) {
      case "Resolved":
        return "bg-green-100 text-green-700";

      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  // PRIORITY COLOR
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-700";

      case "High":
        return "bg-orange-100 text-orange-700";

      case "Medium":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

      {/* HEADER */}
      <div className="bg-white rounded-3xl shadow border p-6 mb-8">

        <div className="flex flex-col lg:flex-row justify-between gap-4 items-center">

          <div className="text-center lg:text-left">

            <h1 className="text-3xl font-black text-blue-600">
              Ticket Control Center
            </h1>

            <p className="text-gray-500 mt-1">
              Real-time AI-powered ICT ticket operations
            </p>

          </div>

          <div className="flex gap-2 flex-wrap justify-center">

            <span className="px-4 py-2 text-xs font-semibold rounded-full bg-green-100 text-green-700 text-center min-w-[140px]">
              ● Live Sync Active
            </span>

            <span className="px-4 py-2 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 text-center min-w-[140px]">
              ● Firestore Connected
            </span>

            <span className="px-4 py-2 text-xs font-semibold rounded-full bg-purple-100 text-purple-700 text-center min-w-[140px]">
              ● AI Smart Routing
            </span>

          </div>

        </div>

      </div>

      {/* FILTERS */}
      <div className="bg-white rounded-3xl shadow border p-6 mb-8">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* SEARCH */}
          <div className="relative">

            <FaSearch className="absolute top-4 left-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search tickets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-200 rounded-2xl p-4 pl-12 outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* STATUS */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-200 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Status</option>
            <option value="Open">Open</option>
            <option value="Pending">Pending</option>
            <option value="Resolved">Resolved</option>
          </select>

          {/* PRIORITY */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="border border-gray-200 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>

        </div>

      </div>

      {/* CONTENT */}
      {loading ? (
        <div className="bg-white rounded-3xl shadow border p-20 text-center">

          <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>

          <p className="text-gray-500">
            Loading tickets...
          </p>

        </div>
      ) : filteredTickets.length === 0 ? (
        <div className="bg-white rounded-3xl shadow border py-24 text-center">

          <FaTicketAlt className="text-6xl mx-auto text-gray-300" />

          <h2 className="mt-6 text-2xl font-bold text-gray-700">
            No Tickets Found
          </h2>

          <p className="text-gray-500 mt-2">
            Tickets will appear here instantly
          </p>

        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {filteredTickets.map((ticket, index) => (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className="bg-white rounded-3xl shadow border border-gray-100 p-6 hover:shadow-xl transition-all"
            >

              {/* TOP */}
              <div className="flex justify-between items-start gap-4">

                <div>

                  <h2 className="text-xl font-black text-gray-900">
                    {ticket.title}
                  </h2>

                  <p className="text-gray-500 mt-2 line-clamp-2">
                    {ticket.description}
                  </p>

                </div>

                <div className="text-blue-600 text-2xl">
                  <FaTicketAlt />
                </div>

              </div>

              {/* DETAILS */}
              <div className="grid grid-cols-2 gap-4 mt-6 text-sm">

                <div>
                  <p className="text-gray-400">Department</p>
                  <strong>{ticket.department || "N/A"}</strong>
                </div>

                <div>
                  <p className="text-gray-400">Device</p>
                  <strong>{ticket.deviceType || "N/A"}</strong>
                </div>

                <div>
                  <p className="text-gray-400">Assigned To</p>
                  <strong>
                    {ticket.assignedName || "Unassigned"}
                  </strong>
                </div>

                <div>
                  <p className="text-gray-400">Created By</p>
                  <strong>{ticket.createdBy || "Unknown"}</strong>
                </div>

              </div>

              {/* TAGS */}
              <div className="flex flex-wrap gap-3 mt-6">

                <span
                  className={`px-4 py-2 rounded-full text-xs font-bold ${getPriorityColor(
                    ticket.priority
                  )}`}
                >
                  {ticket.priority || "Low"}
                </span>

                <span
                  className={`px-4 py-2 rounded-full text-xs font-bold ${getStatusColor(
                    ticket.status
                  )}`}
                >
                  {ticket.status || "Open"}
                </span>

              </div>

              {/* ACTIONS */}
              <div className="flex gap-3 mt-8">

                <button
                  onClick={() => {
                    setSelectedTicket(ticket);
                    setModalOpen(true);
                  }}
                  className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition"
                >
                  <FaEdit />
                  Manage
                </button>

                <button
                  onClick={() => handleDelete(ticket.id)}
                  className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition"
                >
                  <FaTrash />
                  Delete
                </button>

              </div>

            </motion.div>
          ))}

        </div>
      )}

      {/* MODAL */}
      {modalOpen && selectedTicket && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-3xl w-full max-w-2xl p-8">

            <h2 className="text-3xl font-black mb-2">
              Manage Ticket
            </h2>

            <p className="text-gray-500 mb-8">
              {selectedTicket.title}
            </p>

            <div className="space-y-5">

              <input
                type="text"
                placeholder="Assign Technician"
                value={technician}
                onChange={(e) => setTechnician(e.target.value)}
                className="w-full border border-gray-200 rounded-2xl p-4"
              />

              <select
                value={statusUpdate}
                onChange={(e) => setStatusUpdate(e.target.value)}
                className="w-full border border-gray-200 rounded-2xl p-4"
              >
                <option value="">Update Status</option>
                <option value="Open">Open</option>
                <option value="Pending">Pending</option>
                <option value="Resolved">Resolved</option>
              </select>

            </div>

            <div className="flex gap-4 mt-8">

              <button
                onClick={() => setModalOpen(false)}
                className="flex-1 bg-gray-200 py-4 rounded-2xl font-bold"
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  try {
                    const ref = doc(
                      db,
                      "tickets",
                      selectedTicket.id
                    );

                    await updateDoc(ref, {
                      assignedName:
                        technician ||
                        selectedTicket.assignedName,

                      status:
                        statusUpdate ||
                        selectedTicket.status,
                    });

                    setModalOpen(false);

                    setTechnician("");
                    setStatusUpdate("");
                  } catch (error) {
                    console.log(error);
                  }
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold transition"
              >
                Save Changes
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default Tickets;