import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#22c55e", "#f59e0b", "#ef4444", "#8b5cf6"];

const ReportCharts = ({ tickets = [] }) => {
  const priorityData = ["Low", "Medium", "High", "Critical"].map((p) => ({
    name: p,
    value: tickets.filter((t) => t.priority === p).length,
  }));

  const monthly = Array.from({ length: 6 }).map((_, i) => ({
    month: `M${i + 1}`,
    tickets: Math.floor(Math.random() * (tickets.length + 5)),
  }));

  return (
    <div className="grid lg:grid-cols-2 gap-8">

      {/* PRIORITY AI PIE */}
      <div className="bg-white p-6 rounded-3xl shadow border">
        <h2 className="font-bold text-blue-600 mb-4">
          AI Priority Analysis
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={priorityData} dataKey="value" outerRadius={110} label>
              {priorityData.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* TREND AI LINE */}
      <div className="bg-white p-6 rounded-3xl shadow border">
        <h2 className="font-bold text-blue-600 mb-4">
          AI Ticket Trend Forecast
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthly}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="tickets"
              stroke="#2563eb"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default ReportCharts;