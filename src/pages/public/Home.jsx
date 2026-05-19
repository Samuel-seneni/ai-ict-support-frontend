import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

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
    icon: <FaRobot className="text-blue-600 text-2xl" />,
  },
  {
    title: "Ticket Tracking",
    description:
      "Track ICT support requests in real-time from submission to resolution.",
    icon: <FaTicketAlt className="text-blue-600 text-2xl" />,
  },
  {
    title: "Smart Analytics",
    description:
      "Visualize performance metrics and ICT trends instantly.",
    icon: <FaChartLine className="text-blue-600 text-2xl" />,
  },
  {
    title: "Technician Assignment",
    description:
      "Assign technicians efficiently for faster issue resolution.",
    icon: <FaUserShield className="text-blue-600 text-2xl" />,
  },
  {
    title: "Real-Time Alerts",
    description:
      "Receive instant notifications and live ticket updates.",
    icon: <FaBell className="text-blue-600 text-2xl" />,
  },
  {
    title: "Priority Detection",
    description:
      "Detect critical issues automatically with AI-powered logic.",
    icon: <FaExclamationTriangle className="text-blue-600 text-2xl" />,
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white text-gray-900">

      {/* ================= HERO ================= */}
      <section className="relative pt-28 pb-20 overflow-hidden bg-white">

        {/* soft stripe glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-100/40 blur-[120px] rounded-full" />

        <div className="max-w-6xl mx-auto px-6 relative">

          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center lg:text-left"
            >

              <p className="text-sm text-blue-600 font-semibold tracking-wide">
                AI-Powered ICT Support System
              </p>

              <h1 className="mt-4 text-5xl md:text-6xl font-semibold tracking-tight leading-tight">
                AI Smart ICT{" "}
                <span className="text-blue-600">Desk</span>
              </h1>

              <p className="mt-6 text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                A Stripe-level ICT ticketing system for modern schools and enterprises.
                Fast, intelligent, and built for real-time operations.
              </p>

              {/* CTA */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">

                {/* PRIMARY CTA → ROUTE */}
                <button
                  onClick={() => navigate("/create-ticket")}
                  className="px-7 py-3.5 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-sm"
                >
                  Create Ticket
                  <FaArrowRight className="text-sm" />
                </button>

                <button className="px-7 py-3.5 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 transition">
                  View Demo
                </button>

              </div>

              {/* STRIPE STYLE KPIs (BLUE EMPHASIS) */}
              <div className="mt-10 flex gap-10 justify-center lg:justify-start">

                <div>
                  <p className="text-3xl font-semibold text-blue-600">100+</p>
                  <p className="text-sm text-gray-500">Tickets</p>
                </div>

                <div>
                  <p className="text-3xl font-semibold text-blue-600">5+</p>
                  <p className="text-sm text-gray-500">Schools</p>
                </div>

                <div>
                  <p className="text-3xl font-semibold text-blue-600">24/7</p>
                  <p className="text-sm text-gray-500">AI Support</p>
                </div>

              </div>

            </motion.div>

            {/* RIGHT */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative flex justify-center"
            >

              <div className="absolute w-[420px] h-[420px] bg-blue-100/40 blur-[100px] rounded-full" />

              <div className="relative rounded-[2rem] overflow-hidden shadow-xl border border-gray-100 bg-white">

                <img
                  src={ICTImage}
                  alt="ICT Personnel"
                  className="w-full max-w-md object-cover"
                />

              </div>

            </motion.div>

          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-20 bg-white border-t border-gray-100">

        <div className="max-w-6xl mx-auto px-6">

          <div className="text-center mb-14">

            <h2 className="text-4xl font-semibold tracking-tight">
              Enterprise-grade ICT Control System
            </h2>

            <p className="mt-3 text-gray-500">
              Built for speed, intelligence, and real-time operations
            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {features.map((f, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="p-6 rounded-2xl border border-gray-100 bg-white hover:shadow-md transition"
              >

                <div className="mb-3">{f.icon}</div>

                <h3 className="text-lg font-semibold text-gray-900">
                  {f.title}
                </h3>

                <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                  {f.description}
                </p>

              </motion.div>
            ))}

          </div>

        </div>
      </section>

      {/* ================= EXTRA ================= */}
      <div className="bg-white">
        <Testimonials />
        <CTASection />
      </div>

    </div>
  );
};

export default Home;