import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaArrowRight,
} from "react-icons/fa";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 border-t border-blue-800">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-700 opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-700 opacity-20 blur-3xl rounded-full"></div>

      <div className="w-full px-6 pt-16 pb-8 relative z-10">

        {/* TOP GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* BRAND */}
          <div>

            <h2 className="text-3xl font-black text-white">
              Smart ICT Desk
            </h2>

            <p className="mt-6 text-blue-200 leading-relaxed">
              AI-powered ICT support and ticket management platform
              designed for schools and organizations.
            </p>

            {/* SOCIALS */}
            <div className="flex gap-4 mt-8">

              <a className="w-11 h-11 rounded-2xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white hover:-translate-y-1 transition-all duration-300">
                <FaFacebookF />
              </a>

              <a className="w-11 h-11 rounded-2xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white hover:-translate-y-1 transition-all duration-300">
                <FaTwitter />
              </a>

              <a className="w-11 h-11 rounded-2xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white hover:-translate-y-1 transition-all duration-300">
                <FaLinkedinIn />
              </a>

              <a className="w-11 h-11 rounded-2xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white hover:-translate-y-1 transition-all duration-300">
                <FaInstagram />
              </a>

            </div>

          </div>

          {/* QUICK LINKS */}
          <div>

            <h3 className="text-xl font-bold text-white mb-6">
              Quick Links
            </h3>

            <div className="flex flex-col gap-4">

              <Link to="/" className="text-blue-200 hover:text-white transition flex items-center gap-2">
                <FaArrowRight className="text-sm" />
                Home
              </Link>

              <Link to="/about" className="text-blue-200 hover:text-white transition flex items-center gap-2">
                <FaArrowRight className="text-sm" />
                About
              </Link>

              <Link to="/faq" className="text-blue-200 hover:text-white transition flex items-center gap-2">
                <FaArrowRight className="text-sm" />
                FAQ
              </Link>

              <Link to="/contact" className="text-blue-200 hover:text-white transition flex items-center gap-2">
                <FaArrowRight className="text-sm" />
                Contact
              </Link>

            </div>

          </div>

          {/* SYSTEM */}
          <div>

            <h3 className="text-xl font-bold text-white mb-6">
              System Features
            </h3>

            <div className="flex flex-col gap-4 text-blue-200">

              <p>AI Auto Classification</p>
              <p>Ticket Tracking</p>
              <p>Technician Assignment</p>
              <p>Smart Analytics</p>
              <p>Real-Time Notifications</p>

            </div>

          </div>

          {/* CONTACT */}
          <div>

            <h3 className="text-xl font-bold text-white mb-6">
              Contact
            </h3>

            <div className="flex flex-col gap-4 text-blue-200">

              <p>Nairobi, Kenya</p>
              <p>support@smartictdesk.com</p>
              <p>+254 700 000 000</p>
              <p>Available 24/7</p>

            </div>

          </div>

        </div>

        {/* DIVIDER */}
        <div className="border-t border-blue-800 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-blue-300 text-center md:text-left">
            © 2026 Smart ICT Desk. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-blue-300">

            <a className="hover:text-white transition">
              Privacy Policy
            </a>

            <a className="hover:text-white transition">
              Terms of Service
            </a>

            <a className="hover:text-white transition">
              Support
            </a>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;