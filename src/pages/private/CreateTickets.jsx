import React, { useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";

import { db } from "../../firebase/firebase";
import { useAuth } from "../../contexts/AuthContext";

import { FaTicketAlt, FaCheckCircle } from "react-icons/fa";

import { classifyTicket } from "../../services/ai/classifyTicket";
import { smartAssign } from "../../services/ai/smartAssign";
import { generateSLA } from "../../services/ai/slaService";

const CreateTickets = () => {
  const { user } = useAuth();

  const [form, setForm] = useState({
    title: "",
    description: "",
    department: "",
    deviceType: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.description) {
      setSuccess("Please fill in required fields.");
      return;
    }

    setLoading(true);
    setSuccess("");

    try {
      // AI classification
      const ai = await classifyTicket(
        form.title + " " + form.description
      );

      const technician = await smartAssign(ai.category);
      const slaDeadline = generateSLA(ai.priority);

      // Save ticket
      await addDoc(collection(db, "tickets"), {
        ...form,

        category: ai.category,
        priority: ai.priority,

        status: "Open",

        createdBy: user?.email || "Unknown",
        userId: user?.uid || null,

        assignedTo: technician?.id || null,
        assignedName: technician?.name || "Unassigned",

        slaDeadline,
        createdAt: serverTimestamp(),
      });

      // Update technician workload
      if (technician?.id) {
        await updateDoc(doc(db, "technicians", technician.id), {
          activeTickets: increment(1),
        });
      }

      setSuccess(
        technician
          ? `Ticket created & assigned to ${technician.name}`
          : "Ticket created (no technician available)"
      );

      // reset form
      setForm({
        title: "",
        description: "",
        department: "",
        deviceType: "",
      });
    } catch (err) {
      console.log(err);
      setSuccess("Error creating ticket. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-xl bg-white p-8 rounded-3xl shadow-xl">

        {/* HEADER */}
        <h1 className="text-2xl font-black mb-6 flex items-center gap-2">
          <FaTicketAlt /> Enterprise Ticket System
        </h1>

        {/* SUCCESS MESSAGE */}
        {success && (
          <div className="bg-green-100 text-green-700 p-3 rounded-xl mb-4 flex items-center gap-2">
            <FaCheckCircle />
            {success}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="title"
            placeholder="Title *"
            value={form.title}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          />

          <textarea
            name="description"
            placeholder="Description *"
            value={form.description}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          />

          <select
            name="department"
            value={form.department}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          >
            <option value="">Select Department</option>
            <option value="ICT">ICT</option>
            <option value="Admin">Admin</option>
            <option value="Finance">Finance</option>
            <option value="Human Resource">Human Resource</option>
          </select>

          <select
            name="deviceType"
            value={form.deviceType}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          >
            <option value="">Select Device</option>
            <option value="Desktop">Desktop Computer</option>
            <option value="Laptop">Laptop</option>
            <option value="Printer">Printer</option>
            <option value="Router">Router</option>
          </select>

          <button
            disabled={loading}
            className={`w-full p-3 rounded-xl font-bold text-white transition ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Processing..." : "Create Ticket"}
          </button>

        </form>

      </div>
    </div>
  );
};

export default CreateTickets;