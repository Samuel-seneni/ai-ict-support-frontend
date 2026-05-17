import React from "react";
import { motion } from "framer-motion";

import {
  FaBrain,
  FaTicketAlt,
  FaChartLine,
  FaSchool,
  FaCheckCircle,
} from "react-icons/fa";

import Footer from "../../components/layout/Footer";

const About = () => {
  return (
    <div className="w-full overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-gradient-to-br from-sky-50 via-white to-blue-50">

        {/* BACKGROUND GLOWS */}
        <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] bg-blue-200 blur-3xl opacity-40 rounded-full"></div>
        <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-cyan-200 blur-3xl opacity-40 rounded-full"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900"
          >
            About{" "}
            <span className="text-blue-600">Smart ICT Desk</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-6 text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            A modern AI-powered ICT support platform designed to help schools
            and organizations manage technical issues faster, smarter, and more efficiently.
          </motion.p>

        </div>
      </section>

      {/* ================= MISSION ================= */}
      <section className="py-24 bg-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >

            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
              Our Mission
            </h2>

            <p className="mt-6 text-gray-600 text-lg leading-relaxed">
              Smart ICT Desk eliminates delays in ICT support by combining AI automation,
              smart ticketing, and real-time tracking into one unified system.
            </p>

            <div className="mt-8 space-y-4">

              {[
                "Reduce ICT downtime in schools",
                "Automate issue classification using AI",
                "Improve response time and efficiency",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-gray-700">
                  <FaCheckCircle className="text-green-500 mt-1" />
                  <span>{item}</span>
                </div>
              ))}

            </div>

          </motion.div>

          {/* RIGHT CARD */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl p-10 text-white shadow-2xl"
          >

            <FaSchool className="text-5xl mb-6" />

            <h3 className="text-2xl sm:text-3xl font-bold">
              Built for Schools & Organizations
            </h3>

            <p className="mt-4 text-blue-100 leading-relaxed">
              A centralized ICT support platform connecting staff, technicians,
              and administrators in one intelligent system.
            </p>

          </motion.div>

        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-24 bg-blue-50">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
            What Makes It Powerful
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">

            {[
              {
                icon: <FaBrain />,
                title: "AI Classification",
                desc: "Automatically detects issue type and priority.",
              },
              {
                icon: <FaTicketAlt />,
                title: "Smart Ticketing",
                desc: "Track issues from submission to resolution.",
              },
              {
                icon: <FaChartLine />,
                title: "Analytics",
                desc: "Visual insights into ICT performance.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-3xl shadow-md hover:shadow-xl transition-all"
              >

                <div className="text-blue-600 text-4xl flex justify-center">
                  {item.icon}
                </div>

                <h3 className="mt-6 font-bold text-xl text-gray-900">
                  {item.title}
                </h3>

                <p className="text-gray-600 mt-3">
                  {item.desc}
                </p>

              </motion.div>
            ))}

          </div>

        </div>
      </section>

      {/* ================= IMPACT ================= */}
      <section className="py-24 bg-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
            Real Impact
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-14">

            {[
              { value: "5+", label: "Schools Supported" },
              { value: "100+", label: "Tickets Managed" },
              { value: "24/7", label: "System Availability" },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-10 shadow-sm"
              >

                <h3 className="text-4xl sm:text-5xl font-black text-blue-600">
                  {item.value}
                </h3>

                <p className="text-gray-600 mt-2">
                  {item.label}
                </p>

              </motion.div>
            ))}

          </div>

        </div>
      </section>

     

    </div>
  );
};

export default About;