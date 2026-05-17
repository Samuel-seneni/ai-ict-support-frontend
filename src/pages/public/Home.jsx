import React from "react";
import { motion } from "framer-motion";
import Testimonials from "../../components/Testimonials";
import CTASection from "../../components/CTASection";

import ICTImage from "../../assets/ict-personel.png";

import {
  FaTicketAlt,
  FaRobot,
  FaChartLine,
  FaUserShield,
  FaBell,
  FaExclamationTriangle,
  FaArrowRight,
} from "react-icons/fa";

const features = [
  {
    title: "AI Auto Classification",
    description:
      "Automatically classify ICT issues using intelligent AI detection.",
    icon: <FaRobot className="text-blue-600 text-3xl" />,
  },
  {
    title: "Ticket Tracking",
    description:
      "Track ICT support requests in real-time from submission to resolution.",
    icon: <FaTicketAlt className="text-blue-600 text-3xl" />,
  },
  {
    title: "Smart Analytics",
    description:
      "Visualize performance metrics and ICT trends instantly.",
    icon: <FaChartLine className="text-blue-600 text-3xl" />,
  },
  {
    title: "Technician Assignment",
    description:
      "Assign technicians efficiently for faster issue resolution.",
    icon: <FaUserShield className="text-blue-600 text-3xl" />,
  },
  {
    title: "Real-Time Alerts",
    description:
      "Receive instant notifications and live ticket updates.",
    icon: <FaBell className="text-blue-600 text-3xl" />,
  },
  {
    title: "Priority Detection",
    description:
      "Detect critical issues automatically with AI-powered logic.",
    icon: <FaExclamationTriangle className="text-blue-600 text-3xl" />,
  },
];

const Home = () => {
  return (
    <div className="w-full overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-gradient-to-br from-blue-50 via-white to-cyan-50">

        {/* BACKGROUND GLOWS */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300/20 blur-3xl rounded-full" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-300/20 blur-3xl rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* LEFT SIDE */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >

              <span className="inline-block bg-blue-100 text-blue-700 px-5 py-2 rounded-full text-sm font-semibold">
                AI-Powered ICT Support System
              </span>

              <h1 className="mt-8 text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black leading-tight text-gray-900">

                AI Smart ICT{" "}

                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                  Desk
                </span>

              </h1>

              <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0">
                Modern AI-powered ICT ticketing platform designed for schools,
                colleges, and organizations to manage technical support efficiently.
              </p>

              {/* BUTTONS */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">

                <button className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-2xl transition-all flex items-center justify-center gap-3">

                  Create Ticket
                  <FaArrowRight className="group-hover:translate-x-1 transition" />

                </button>

                <button className="border border-gray-300 hover:border-blue-500 text-gray-700 px-8 py-4 rounded-2xl font-semibold hover:bg-white transition">
                  View Demo
                </button>

              </div>

              {/* STATS */}
              <div className="mt-12 grid grid-cols-3 gap-6 text-center lg:text-left">

                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-blue-600">
                    100+
                  </h3>
                  <p className="text-sm text-gray-500">Tickets</p>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-blue-600">
                    5+
                  </h3>
                  <p className="text-sm text-gray-500">Schools</p>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-blue-600">
                    24/7
                  </h3>
                  <p className="text-sm text-gray-500">AI Support</p>
                </div>

              </div>

            </motion.div>

            {/* RIGHT SIDE IMAGE */}
            <motion.div
              initial={{ opacity: 0, x: 60, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.9 }}
              className="relative flex justify-center"
            >

              {/* GLOW */}
              <div className="absolute w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-blue-300/20 blur-3xl rounded-full" />

              {/* IMAGE CARD */}
              <div className="relative bg-white/60 backdrop-blur-xl border border-white/40 rounded-[2rem] shadow-2xl p-3 sm:p-4 animate-float">

                <img
                  src={ICTImage}
                  alt="ICT Personnel"
                  className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-cover rounded-[1.5rem]"
                />

              </div>

            </motion.div>

          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-24 bg-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto mb-16">

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900">
              Powerful Features
            </h2>

            <p className="mt-4 text-gray-600">
              Everything you need to manage ICT support efficiently
            </p>

          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {features.map((f, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all"
              >

                <div className="mb-4">{f.icon}</div>

                <h3 className="text-xl font-bold text-gray-900">
                  {f.title}
                </h3>

                <p className="mt-3 text-gray-600 text-sm sm:text-base">
                  {f.description}
                </p>

              </motion.div>
            ))}

          </div>

        </div>
      </section>

      {/* ================= EXTRA SECTIONS ================= */}
      <Testimonials />
      <CTASection />

    </div>
  );
};

export default Home;