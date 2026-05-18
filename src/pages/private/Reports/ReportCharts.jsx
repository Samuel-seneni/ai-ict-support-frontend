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

const ReportCharts = ({ tickets, technicians }) => {
  const priorityData = ["Low", "Medium", "High", "Critical"].map((p) => ({
    name: p,
    value: tickets.filter((t) => t.priority === p).length,
  }));

  const monthly = [
    { month: "Jan", tickets: 12 },
    { month: "Feb", tickets: 18 },
    { month: "Mar", tickets: 22 },
    { month: "Apr", tickets: 30 },
    { month: "May", tickets: tickets.length },
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-8">

      {/* PIE */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="font-bold mb-4">Priority Distribution</h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={priorityData} dataKey="value" outerRadius={100} label>
              {priorityData.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* LINE */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="font-bold mb-4">Monthly Trends</h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthly}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="tickets" stroke="#2563eb" />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default ReportCharts;