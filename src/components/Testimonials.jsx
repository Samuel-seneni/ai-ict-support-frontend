import React from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

// ✅ MOVE OUTSIDE (best practice)
const testimonials = [
  {
    name: "Samuel Ochieng",
    role: "ICT Administrator",
    organization: "Green Valley School",
    message:
      "Smart ICT Desk has transformed how we manage technical issues in our school. Ticket tracking and AI suggestions are incredibly helpful.",
  },
  {
    name: "Grace Wanjiku",
    role: "School Principal",
    organization: "Sunrise Academy",
    message:
      "The dashboard analytics and technician assignment features have improved response times significantly.",
  },
  {
    name: "David Mwangi",
    role: "Network Technician",
    organization: "Bright Future College",
    message:
      "A professional modern support platform that simplifies ICT issue management and improves communication.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-28 bg-gradient-to-br from-blue-50 via-white to-cyan-50 overflow-hidden">

      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full text-sm font-semibold shadow-sm">
            Testimonials
          </span>

          <h2 className="text-5xl font-black text-gray-900 mt-6">
            Trusted by Schools & Organizations
          </h2>

          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Institutions are transforming ICT support management using Smart ICT Desk.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative bg-white/70 backdrop-blur-2xl border border-white/40 rounded-[2rem] p-8 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >

              {/* GLOW */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 opacity-20 blur-3xl rounded-full"></div>

              {/* STARS */}
              <div className="flex gap-1 mb-6 text-yellow-400 relative z-10">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>

              {/* MESSAGE */}
              <p className="text-gray-600 leading-relaxed text-lg relative z-10">
                "{t.message}"
              </p>

              {/* USER */}
              <div className="mt-8 flex items-center gap-4 relative z-10">

                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {t.name.charAt(0)}
                </div>

                <div>
                  <h4 className="font-bold text-gray-900">
                    {t.name}
                  </h4>

                  <p className="text-sm text-gray-500">
                    {t.role}
                  </p>

                  <p className="text-sm text-blue-600 font-medium">
                    {t.organization}
                  </p>
                </div>

              </div>

            </motion.div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default Testimonials;