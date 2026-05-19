import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuestionCircle } from "react-icons/fa";

import Footer from "../../components/layout/Footer";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is Smart ICT Desk?",
      answer:
        "Smart ICT Desk is an AI-powered ICT support system that helps schools and organizations manage technical issues using smart ticketing, automation, and real-time tracking.",
    },
    {
      question: "How does AI classification work?",
      answer:
        "The system analyzes the user’s problem description and automatically detects category, priority level, and suggests possible solutions using AI logic.",
    },
    {
      question: "Who can use this system?",
      answer:
        "It is designed for schools, colleges, universities, and organizations that need efficient ICT support management.",
    },
    {
      question: "Can I track my ICT issues?",
      answer:
        "Yes. Every ticket is tracked in real-time from submission to resolution with status updates like Open, Pending, In Progress, and Resolved.",
    },
    {
      question: "Does it support technicians?",
      answer:
        "Yes. Administrators can assign tickets to technicians and monitor progress through a dashboard system.",
    },
    {
      question: "Is the system mobile friendly?",
      answer:
        "Yes. The platform is fully responsive and works on mobile, tablet, and desktop devices.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full overflow-hidden bg-white">

      {/* ================= HERO ================= */}
      <section className="relative pt-28 pb-16 md:pt-32 md:pb-20 bg-gradient-to-br from-sky-50 via-white to-blue-50">

        <div className="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] bg-blue-200 blur-3xl opacity-40 rounded-full" />
        <div className="absolute bottom-[-120px] right-[-120px] w-[320px] h-[320px] bg-cyan-200 blur-3xl opacity-40 rounded-full" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >

            <FaQuestionCircle className="text-blue-600 text-4xl sm:text-5xl mx-auto" />

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-gray-900 mt-5">
              Frequently Asked <span className="text-blue-600">Questions</span>
            </h1>

            <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Everything you need to know about Smart ICT Desk and how it works.
            </p>

          </motion.div>

        </div>
      </section>

      {/* ================= FAQ LIST ================= */}
      <section className="py-16 md:py-20 bg-white">

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">

          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
              className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
            >

              {/* QUESTION */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-4 sm:p-5 text-left hover:bg-blue-50 transition"
              >
                <h3 className="font-semibold text-gray-800 text-sm sm:text-base md:text-lg pr-3 leading-snug">
                  {faq.question}
                </h3>

                <span className="text-blue-600 text-xl sm:text-2xl font-bold flex-shrink-0">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {/* ANSWER */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="px-4 sm:px-5 pb-4 sm:pb-5 text-gray-600 text-sm sm:text-base leading-relaxed"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          ))}

        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="relative py-16 md:py-20 bg-gradient-to-br from-blue-600 to-cyan-500 text-white overflow-hidden">

        <div className="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] bg-white/20 blur-3xl rounded-full" />
        <div className="absolute bottom-[-120px] right-[-120px] w-[320px] h-[320px] bg-white/10 blur-3xl rounded-full" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black">
            Still have questions?
          </h2>

          <p className="mt-3 text-blue-100 text-sm sm:text-base md:text-lg">
            Contact our support team for help anytime. We are here to assist you.
          </p>

          <button className="mt-6 sm:mt-8 w-full sm:w-auto bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold hover:bg-blue-50 transition shadow-lg text-sm sm:text-base">
            Contact Support
          </button>

        </div>
      </section>
    </div>
  );
};

export default FAQ;