import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebase";

import ReportCards from "./ReportCards";
import ReportCharts from "./ReportCharts";

const Reports = () => {
  const [tickets, setTickets] = useState([]);
  const [technicians, setTechnicians] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tSnap = await getDocs(collection(db, "tickets"));
        const techSnap = await getDocs(collection(db, "technicians"));

        setTickets(tSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setTechnicians(techSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-10">

      <div>
        <h1 className="text-3xl font-black">Reports Dashboard</h1>
        <p className="text-gray-500">Clean analytics overview</p>
      </div>

      <ReportCards tickets={tickets} technicians={technicians} />

      <ReportCharts tickets={tickets} technicians={technicians} />

    </div>
  );
};

export default Reports;