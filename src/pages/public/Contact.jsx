import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

import Footer from "../../components/layout/Footer";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.includes("@")) newErrors.email = "Valid email required";
    if (!form.subject.trim()) newErrors.subject = "Subject is required";
    if (form.message.length < 10)
      newErrors.message = "Message must be at least 10 characters";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
        setSubmitted(true);

        setForm({
          name: "",
          email: "",
          subject: "",
          message: "",
        });

        setTimeout(() => setSubmitted(false), 3500);
      }, 900);
    }
  };

  return (
    <div className="w-full overflow-hidden bg-white">

      {/* ================= HERO ================= */}
      <section className="relative pt-28 pb-16 md:pt-32 md:pb-20 bg-gradient-to-br from-sky-50 via-white to-blue-50">

        <div className="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] bg-blue-200 blur-3xl opacity-40 rounded-full" />
        <div className="absolute bottom-[-120px] right-[-120px] w-[320px] h-[320px] bg-cyan-200 blur-3xl opacity-40 rounded-full" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-gray-900">
              Contact <span className="text-blue-600">Support</span>
            </h1>

            <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Reach out to our ICT support team anytime for assistance.
            </p>

          </motion.div>

        </div>
      </section>

      {/* ================= CONTACT SECTION ================= */}
      <section className="py-16 md:py-20 bg-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-14">

          {/* LEFT INFO */}
          <div className="space-y-6">

            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
                Get in Touch
              </h2>

              <p className="mt-3 text-gray-600 leading-relaxed">
                We help schools and organizations resolve ICT issues faster using Smart ICT Desk.
              </p>
            </div>

            <div className="space-y-4">

              <div className="flex items-center gap-3">
                <FaEnvelope className="text-blue-600 text-lg" />
                <span className="text-gray-700 text-sm sm:text-base">
                  support@smartictdesk.com
                </span>
              </div>

              <div className="flex items-center gap-3">
                <FaPhone className="text-blue-600 text-lg" />
                <span className="text-gray-700 text-sm sm:text-base">
                  +254 792 529 532
                </span>
              </div>

              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-blue-600 text-lg" />
                <span className="text-gray-700 text-sm sm:text-base">
                  Nairobi, Kenya
                </span>
              </div>

            </div>

          </div>

          {/* FORM */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-blue-50 p-5 sm:p-6 md:p-8 rounded-3xl shadow-md space-y-4"
          >

            {submitted && (
              <div className="bg-green-100 text-green-700 p-3 rounded-xl text-sm">
                Message sent successfully!
              </div>
            )}

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-3 sm:p-4 rounded-xl border focus:ring-2 focus:ring-blue-400 outline-none"
            />
            {errors.name && (
              <p className="text-red-500 text-xs sm:text-sm">{errors.name}</p>
            )}

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full p-3 sm:p-4 rounded-xl border focus:ring-2 focus:ring-blue-400 outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-xs sm:text-sm">{errors.email}</p>
            )}

            <input
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="w-full p-3 sm:p-4 rounded-xl border focus:ring-2 focus:ring-blue-400 outline-none"
            />
            {errors.subject && (
              <p className="text-red-500 text-xs sm:text-sm">{errors.subject}</p>
            )}

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="4"
              className="w-full p-3 sm:p-4 rounded-xl border focus:ring-2 focus:ring-blue-400 outline-none"
            />
            {errors.message && (
              <p className="text-red-500 text-xs sm:text-sm">{errors.message}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 sm:py-4 rounded-xl font-bold text-white transition text-sm sm:text-base ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90"
              }`}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

          </motion.form>

        </div>
      </section>

      {/* ================= MAP ================= */}
      <section className="py-14 md:py-16 bg-blue-50">

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-6">
            Find Us on the Map
          </h2>

          <div className="rounded-3xl overflow-hidden shadow-lg border">

            <iframe
              title="Smart ICT Desk Location"
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d31910.889752219136!2d36.864!3d-1.2550144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2ske!4v1778346504140!5m2!1sen!2ske"
              width="100%"
              height="380"
              loading="lazy"
              className="w-full"
            />

          </div>

        </div>

      </section>
    
    </div>
  );
};

export default Contact;