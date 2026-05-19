import React, { useEffect, useState } from "react";

import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, onSnapshot,

} from "firebase/firestore";

import { db } from "../../firebase/firebase";

import { FaUserPlus, FaTrash, FaUsers, FaSearch, FaEdit, FaServer, FaCheckCircle,
} from "react-icons/fa";

import { motion } from "framer-motion";

const Technicians = () => {
  const [technicians, setTechnicians] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingTech, setEditingTech] = useState(null);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    department: "",
    specialization: "",
  });

  // =============================================
  // REAL-TIME TECHNICIANS (ENTERPRISE UPGRADE)
  // =============================================
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "technicians"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTechnicians(data);
        setLoading(false);
      }
    );

    return () => unsub();
  }, []);

  // =============================================
  // ADD / EDIT TECHNICIAN
  // =============================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.fullName ||
      !form.email ||
      !form.department
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      if (editingTech) {
        await updateDoc(
          doc(db, "technicians", editingTech.id),
          {
            ...form,
          }
        );
      } else {
        await addDoc(collection(db, "technicians"), {
          ...form,
          assignedTickets: 0,
          status: "Active",
          createdAt: new Date(),
        });
      }

      setForm({
        fullName: "",
        email: "",
        department: "",
        specialization: "",
      });

      setEditingTech(null);
    } catch (error) {
      console.log(error);
    }
  };

  // =============================================
  // DELETE TECHNICIAN
  // =============================================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete technician?")) return;

    await deleteDoc(doc(db, "technicians", id));
  };

  // =============================================
  // FILTER
  // =============================================
  const filteredTechnicians = technicians.filter(
    (tech) =>
      tech.fullName
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

      {/* =============================================
          HEADER SECTION (SAAS STYLE)
      ============================================= */}
      <div className="bg-white rounded-3xl shadow border p-6 mb-6">

  <div className="flex flex-col lg:flex-row justify-between items-center gap-4">

    {/* LEFT SIDE */}
    <div className="text-center lg:text-left">
      <h1 className="text-3xl font-black text-blue-600">
        Technician Control Center
      </h1>

      <p className="text-gray-500 mt-1">
        Manage ICT engineers, workload & assignments
      </p>
    </div>

    {/* RIGHT SIDE (CENTERED SaaS PILLS) */}
    <div className="flex flex-wrap justify-center lg:justify-end gap-2">

      <span className="px-4 py-2 text-xs font-semibold rounded-full bg-green-100 text-green-700 flex items-center justify-center">
        ● Live System
      </span>

      <span className="px-4 py-2 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
        ● Firestore Sync
      </span>

      <span className="px-4 py-2 text-xs font-semibold rounded-full bg-purple-100 text-purple-700 flex items-center justify-center">
        ● Auto Assignment Ready
      </span>

    </div>

  </div>

</div>

      {/* =============================================
          SEARCH BAR
      ============================================= */}
      <div className="relative w-full md:w-96 mb-8">

        <FaSearch className="absolute top-4 left-4 text-gray-400" />

        <input
          type="text"
          placeholder="Search technician..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-2xl p-4 pl-12 focus:ring-2 focus:ring-blue-500"
        />

      </div>

      {/* =============================================
          FORM CARD (SPLIT UI)
      ============================================= */}
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow border p-6 mb-10"
      >

        <div className="flex items-center gap-3 mb-6">

          <FaUserPlus className="text-blue-600 text-2xl" />

          <h2 className="text-xl font-black">
            {editingTech
              ? "Edit Technician"
              : "Add Technician"}
          </h2>

        </div>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            placeholder="Full Name"
            value={form.fullName}
            onChange={(e) =>
              setForm({
                ...form,
                fullName: e.target.value,
              })
            }
            className="border p-3 rounded-xl"
          />

          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            className="border p-3 rounded-xl"
          />

          <input
            placeholder="Department"
            value={form.department}
            onChange={(e) =>
              setForm({
                ...form,
                department: e.target.value,
              })
            }
            className="border p-3 rounded-xl"
          />

          <input
            placeholder="Specialization"
            value={form.specialization}
            onChange={(e) =>
              setForm({
                ...form,
                specialization: e.target.value,
              })
            }
            className="border p-3 rounded-xl"
          />

        </div>

        <button
          type="submit"
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
        >
          {editingTech
            ? "Update Technician"
            : "Add Technician"}
        </button>

      </motion.form>

      {/* =============================================
          TECHNICIAN LIST (CARD GRID)
      ============================================= */}
      {loading ? (
        <p className="text-center text-gray-500">
          Loading technicians...
        </p>
      ) : filteredTechnicians.length === 0 ? (
        <div className="text-center text-gray-500">
          <FaUsers className="text-5xl mx-auto mb-3" />
          No technicians found
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">

          {filteredTechnicians.map((tech) => (
            <motion.div
              key={tech.id}
              className="bg-white rounded-3xl border shadow p-6"
            >

              {/* TOP */}
              <div className="flex justify-between">

                <div>
                  <h2 className="font-black text-lg">
                    {tech.fullName}
                  </h2>

                  <p className="text-gray-500 text-sm">
                    {tech.email}
                  </p>
                </div>

                <span className="text-green-600 text-sm font-bold">
                  {tech.status}
                </span>

              </div>

              {/* DETAILS */}
              <div className="mt-4 text-sm text-gray-600 space-y-2">

                <p>
                  <strong>Department:</strong>{" "}
                  {tech.department}
                </p>

                <p>
                  <strong>Specialization:</strong>{" "}
                  {tech.specialization}
                </p>

                <p>
                  <strong>Tickets:</strong>{" "}
                  <span className="text-blue-600 font-bold">
                    {tech.assignedTickets || 0}
                  </span>
                </p>

              </div>

              {/* ACTIONS */}
              <div className="flex gap-3 mt-6">

                <button
                  onClick={() => {
                    setEditingTech(tech);
                    setForm(tech);
                  }}
                  className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-xl"
                >
                  <FaEdit /> Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(tech.id)
                  }
                  className="flex-1 bg-red-50 text-red-600 py-2 rounded-xl"
                >
                  <FaTrash /> Delete
                </button>

              </div>

            </motion.div>
          ))}

        </div>
      )}

    </div>
  );
};

export default Technicians;