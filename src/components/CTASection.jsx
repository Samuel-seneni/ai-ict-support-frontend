import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaTicketAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-sky-50 to-blue-50 py-32">

      {/* BACKGROUND GRID */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.06)_1px,transparent_0)] [background-size:28px_28px] opacity-30"></div>

      {/* GLOW ORBS */}
      <div className="absolute top-[-150px] left-[-150px] w-[420px] h-[420px] bg-blue-200 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-[-150px] right-[-150px] w-[420px] h-[420px] bg-sky-200 rounded-full blur-3xl opacity-40"></div>

      <div className="relative max-w-6xl mx-auto px-6 text-center">

        {/* HERO TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >

          <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6">
            AI-Powered ICT Support Platform
          </span>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 leading-tight">
            Modern ICT Support,
            <br />
            <span className="text-blue-600">Reimagined for Schools</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Automate ticketing, resolve ICT issues faster, and empower staff with AI-driven support built for modern institutions.
          </p>

          {/* CTA BUTTONS */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">

            <Link
              to="/signup"
              className="group inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <FaTicketAlt />
              Get Started
              <FaArrowRight className="group-hover:translate-x-1 transition" />
            </Link>

            <Link
              to="/about"
              className="inline-flex items-center px-8 py-4 rounded-xl font-semibold border border-gray-300 hover:border-blue-400 hover:bg-white hover:-translate-y-1 transition-all duration-300"
            >
              Learn More
            </Link>

          </div>
        </motion.div>

        {/* STATS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >

          {[
            { value: "100+", label: "Tickets Resolved" },
            { value: "24/7", label: "AI Support" },
            { value: "98%", label: "Satisfaction Rate" },
            { value: "5+", label: "Schools Supported" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/70 backdrop-blur border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <h3 className="text-3xl font-bold text-gray-900">
                {item.value}
              </h3>
              <p className="text-gray-500 mt-2 text-sm">{item.label}</p>
            </div>
          ))}

        </motion.div>

      </div>
    </section>
  );
};

export default CTASection;