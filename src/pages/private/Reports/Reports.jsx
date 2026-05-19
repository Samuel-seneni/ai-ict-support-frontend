import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../../firebase/firebase";

import ReportCards from "./ReportCards";
import ReportCharts from "./ReportCharts";

const Reports = () => {
  const [tickets, setTickets] = useState([]);
  const [technicians, setTechnicians] = useState([]);

  const [aiInsight, setAiInsight] = useState("");

  // =========================
  // LIVE FIRESTORE STREAMING
  // =========================
  useEffect(() => {
    const unsubTickets = onSnapshot(
      collection(db, "tickets"),
      (snapshot) => {
        const data = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));

        setTickets(data);
        generateAIInsights(data);
      }
    );

    const unsubTech = onSnapshot(
      collection(db, "technicians"),
      (snapshot) => {
        const data = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));

        setTechnicians(data);
      }
    );

    return () => {
      unsubTickets();
      unsubTech();
    };
  }, []);

  // =========================
  // AI INSIGHTS ENGINE
  // =========================
  const generateAIInsights = (data) => {
    if (!data.length) {
      setAiInsight("No data available for analysis.");
      return;
    }

    const open = data.filter((t) => t.status === "Open").length;
    const critical = data.filter(
      (t) => t.priority === "Critical"
    ).length;

    const resolved = data.filter(
      (t) => t.status === "Resolved"
    ).length;

    const backlogRate = ((open / data.length) * 100).toFixed(1);

    let insight = "";

    if (critical > 3) {
      insight +=
        "🚨 High system risk: Multiple critical tickets detected. ";
    }

    if (open > resolved) {
      insight +=
        "⚠️ Backlog is growing faster than resolution rate. ";
    }

    if (backlogRate > 60) {
      insight +=
        "📊 System overload detected (high backlog ratio). ";
    }

    if (!insight) {
      insight =
        "✅ System stable. Ticket flow is balanced.";
    }

    setAiInsight(insight);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-10">

      {/* ================= HEADER ================= */}
      <div className="bg-white rounded-3xl shadow border p-6">

        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">

          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-black text-blue-600">
              AI Analytics Control Center
            </h1>
            <p className="text-gray-500 mt-1">
              Real-time intelligence, performance & system health
            </p>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
              ● Live Firestore
            </span>
            <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
              ● AI Engine Active
            </span>
            <span className="px-3 py-1 text-xs rounded-full bg-purple-100 text-purple-700">
              ● Predictive Mode
            </span>
          </div>

        </div>
      </div>

      {/* ================= AI INSIGHTS PANEL ================= */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-6 rounded-3xl shadow-lg">
        <h2 className="text-xl font-bold mb-2">
          AI System Insight
        </h2>

        <p className="text-white/90 text-lg">
          {aiInsight}
        </p>
      </div>

      {/* ================= KPI CARDS ================= */}
      <ReportCards
        tickets={tickets}
        technicians={technicians}
      />

      {/* ================= CHARTS ================= */}
      <ReportCharts tickets={tickets} />

    </div>
  );
};

export default Reports;