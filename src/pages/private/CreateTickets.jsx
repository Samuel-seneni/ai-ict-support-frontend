import React, { useState } from "react";
import { createEnterpriseTicket } from "../../services/tickets/createEnterpriseTicket";

import { db } from "../../firebase/firebase";
import { useAuth } from "../../contexts/AuthContext";

import { FaTicketAlt, FaCheckCircle } from "react-icons/fa";

const CreateTickets = () => {
  const { user } = useAuth();

  const [form, setForm] = useState({
    title: "",
    description: "",
    department: "",
    deviceType: "",
  });

  const [success, setSuccess] = useState("");

  // ⚡ OPTIMISTIC UI STATE
  const [optimisticTickets, setOptimisticTickets] = useState([]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ================= ENTERPRISE INSTANT UX =================
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.title || !form.description) {
    setSuccess("Please fill in required fields.");
    return;
  }

  const tempId = Date.now().toString();

  // ================= OPTIMISTIC TICKET =================
  const tempTicket = {
    id: tempId,
    ...form,
    status: "Open",
    priority: "Processing...",
    category: "AI Analysis...",
    createdBy: user?.email || "Unknown",
    assignedName: "AI assigning...",
    isOptimistic: true,
  };

  // ================= INSTANT UI =================
  setOptimisticTickets((prev) => [
    tempTicket,
    ...prev,
  ]);

  setSuccess(
    "✅ Ticket created instantly. AI processing..."
  );

  // ================= RESET FORM =================
  setForm({
    title: "",
    description: "",
    department: "",
    deviceType: "",
  });

  try {

    // ================= SHARED ENGINE =================
    const result =
      await createEnterpriseTicket({
        formData: form,
        user,
        source: "Create Ticket Page",
      });

    // REMOVE TEMP TICKET
    setOptimisticTickets((prev) =>
      prev.filter((t) => t.id !== tempId)
    );

    setSuccess(
      result.technician
        ? `✅ Ticket assigned to ${result.technician.name}`
        : "✅ Ticket created successfully"
    );

    setTimeout(() => {
      setSuccess("");
    }, 4000);

  } catch (err) {
    console.log(err);

    setOptimisticTickets((prev) =>
      prev.filter((t) => t.id !== tempId)
    );

    setSuccess(
      "❌ Error creating ticket"
    );
  }
};

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center p-6">

      {/* SAAS CARD */}
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl border p-8">

        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-black text-blue-600 flex justify-center items-center gap-2">
            <FaTicketAlt />
            Create Ticket
          </h1>
          <p className="text-gray-500 mt-2">
            Enterprise AI-powered instant ticket system
          </p>
        </div>

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
            placeholder="Ticket Title *"
            value={form.title}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-200"
          />

          <textarea
            name="description"
            placeholder="Describe the issue *"
            value={form.description}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-200"
            rows={4}
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

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full p-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition"
          >
            Create Ticket
          </button>

        </form>

        {/* ================= OPTIONAL OPTIMISTIC PREVIEW ================= */}
        {optimisticTickets.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-bold text-gray-600 mb-2">
              Live Processing Queue
            </h3>

            {optimisticTickets.map((t) => (
              <div
                key={t.id}
                className="p-3 border rounded-xl mb-2 bg-gray-50 border-dashed opacity-70"
              >
                <p className="font-semibold">{t.title}</p>
                <p className="text-xs text-gray-500">
                  AI processing...
                </p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default CreateTickets;