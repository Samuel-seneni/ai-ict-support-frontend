import React, { useState } from "react";

import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
  increment,
} from "firebase/firestore";

import { db } from "../../firebase/firebase";
import { useAuth } from "../../contexts/AuthContext";

import { FaTicketAlt, FaCheckCircle } from "react-icons/fa";

// AI services
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

  // ================= MAIN HANDLER =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.description) {
      setSuccess("❌ Please fill all required fields.");
      return;
    }

    setLoading(true);
    setSuccess("");

    try {
      // ================= AI CLASSIFICATION =================
      let aiResult = {
        category: "General",
        priority: "Low",
      };

      try {
        const ai = await classifyTicket(
          `${form.title} ${form.description}`
        );

        if (ai) aiResult = ai;
      } catch (err) {
        console.log("AI Classification Error:", err);
      }

      // ================= SMART ASSIGN =================
      let technician = null;

      try {
        technician = await smartAssign(aiResult.category);
      } catch (err) {
        console.log("Smart Assign Error:", err);
      }

      // ================= SLA =================
      let slaDeadline = null;

      try {
        slaDeadline = await generateSLA(aiResult.priority);
      } catch (err) {
        console.log("SLA Error:", err);
      }

      // ================= SAVE TICKET =================
      const ticketRef = await addDoc(collection(db, "tickets"), {
        title: form.title,
        description: form.description,
        department: form.department || "General",
        deviceType: form.deviceType || "Unknown",

        category: aiResult.category,
        priority: aiResult.priority,
        status: "Open",

        createdBy: user?.email || "Unknown",
        userId: user?.uid || null,

        assignedTo: technician?.id || null,
        assignedName:
          technician?.fullName ||
          technician?.name ||
          "Unassigned",

        slaDeadline: slaDeadline || null,

        createdAt: serverTimestamp(),
      });

      // ================= UPDATE TECHNICIAN LOAD =================
      if (technician?.id) {
        try {
          await updateDoc(doc(db, "technicians", technician.id), {
            assignedTickets: increment(1),
          });
        } catch (err) {
          console.log("Workload Update Error:", err);
        }
      }

      // ================= SUCCESS =================
      setSuccess(
        `✅ Ticket created successfully${
          technician?.fullName
            ? ` and assigned to ${technician.fullName}`
            : ""
        }`
      );

      // RESET FORM
      setForm({
        title: "",
        description: "",
        department: "",
        deviceType: "",
      });
    } catch (error) {
      console.log("CREATE TICKET ERROR:", error);
      setSuccess("❌ Error creating ticket. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl border p-8">

        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-black text-blue-600 flex justify-center items-center gap-2">
            <FaTicketAlt />
            Create Ticket
          </h1>
          <p className="text-gray-500 mt-2">
            AI-powered enterprise ticket system
          </p>
        </div>

        {/* SUCCESS */}
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
            placeholder="Ticket Title *"
            value={form.title}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          />

          <textarea
            name="description"
            placeholder="Describe the issue *"
            value={form.description}
            onChange={handleChange}
            rows={4}
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
            <option value="HR">HR</option>
          </select>

          <select
            name="deviceType"
            value={form.deviceType}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          >
            <option value="">Select Device</option>
            <option value="Desktop">Desktop</option>
            <option value="Laptop">Laptop</option>
            <option value="Printer">Printer</option>
            <option value="Router">Router</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Creating Ticket..." : "Create Ticket"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreateTickets;