import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../../firebase/firebase";

import { FaSearch, FaTicketAlt } from "react-icons/fa";
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

  // FETCH
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const snapshot = await getDocs(collection(db, "tickets"));

        const data = snapshot.docs.map((docItem) => ({
          id: docItem.id,
          ...docItem.data(),
        }));

        setTickets(data);
        setFilteredTickets(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  // FILTER
  useEffect(() => {
    let result = [...tickets];

    if (search) {
      result = result.filter((t) =>
        t.title?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter !== "All") {
      result = result.filter((t) => t.status === statusFilter);
    }

    if (priorityFilter !== "All") {
      result = result.filter((t) => t.priority === priorityFilter);
    }

    setFilteredTickets(result);
  }, [search, statusFilter, priorityFilter, tickets]);

  // DELETE (FAST UPDATE)
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "tickets", id));

      const updated = tickets.filter((t) => t.id !== id);
      setTickets(updated);
      setFilteredTickets(updated);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6">

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-black text-gray-900">
          ICT Support Tickets
        </h1>
        <p className="text-gray-600 mt-3">
          Manage all ICT issues in real time.
        </p>
      </div>

      {/* FILTERS */}
      <div className="bg-white p-6 rounded-2xl shadow border mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* SEARCH */}
          <div className="relative">
            <FaSearch className="absolute top-4 left-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tickets..."
              className="w-full border p-4 pl-12 rounded-xl"
            />
          </div>

          {/* STATUS */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border p-4 rounded-xl"
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
            className="border p-4 rounded-xl"
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
        <p className="text-center text-gray-500">Loading tickets...</p>
      ) : filteredTickets.length === 0 ? (
        <div className="text-center py-20">
          <FaTicketAlt className="text-5xl mx-auto text-gray-300" />
          <p className="text-gray-500 mt-4">No tickets found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {filteredTickets.map((ticket, index) => (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl shadow border p-5"
            >

              <h2 className="text-xl font-black">
                {ticket.title}
              </h2>

              <p className="text-gray-600 mt-2">
                {ticket.description}
              </p>

              <div className="grid grid-cols-2 gap-3 mt-5 text-sm">
                <p><strong>Category:</strong> {ticket.category}</p>
                <p><strong>Department:</strong> {ticket.department}</p>
                <p><strong>Device:</strong> {ticket.deviceType}</p>
                <p><strong>Created By:</strong> {ticket.createdBy}</p>
              </div>

              <div className="flex gap-3 mt-5 flex-wrap">

                <span className="px-3 py-1 rounded-full text-sm bg-gray-100">
                  {ticket.priority}
                </span>

                <span className="px-3 py-1 rounded-full text-sm bg-blue-100">
                  {ticket.status}
                </span>

              </div>

              <div className="flex gap-3 mt-6">

                <button
                  onClick={() => {
                    setSelectedTicket(ticket);
                    setModalOpen(true);
                  }}
                  className="px-4 py-2 bg-blue-100 text-blue-600 rounded-xl"
                >
                  View / Manage
                </button>

                <button
                  onClick={() => handleDelete(ticket.id)}
                  className="px-4 py-2 bg-red-100 text-red-600 rounded-xl"
                >
                  Delete
                </button>

              </div>

            </motion.div>
          ))}

        </div>
      )}

      {/* MODAL */}
      {modalOpen && selectedTicket && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white w-full max-w-2xl rounded-2xl p-6">

            <h2 className="text-2xl font-black mb-4">
              Manage Ticket
            </h2>

            <p className="text-gray-600 mb-6">
              {selectedTicket.title}
            </p>

            <input
              value={technician}
              onChange={(e) => setTechnician(e.target.value)}
              placeholder="Assign Technician"
              className="w-full border p-3 rounded-xl mb-4"
            />

            <select
              value={statusUpdate}
              onChange={(e) => setStatusUpdate(e.target.value)}
              className="w-full border p-3 rounded-xl mb-6"
            >
              <option value="">Update Status</option>
              <option value="Open">Open</option>
              <option value="Pending">Pending</option>
              <option value="Resolved">Resolved</option>
            </select>

            <div className="flex justify-between">

              <button
                onClick={() => setModalOpen(false)}
                className="px-5 py-3 bg-gray-200 rounded-xl"
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

                  const updatedTickets = tickets.map((t) =>
                    t.id === selectedTicket.id
                      ? { ...t, assignedTo: technician, status: statusUpdate }
                      : t
                  );

                  setTickets(updatedTickets);
                  setFilteredTickets(updatedTickets);

                  setModalOpen(false);
                }}
                className="px-5 py-3 bg-blue-600 text-white rounded-xl"
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