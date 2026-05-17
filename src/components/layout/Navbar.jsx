import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "../../assets/Logo.png";

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "FAQ", path: "/faq" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 w-full z-50 transition-all duration-300
          ${scrolled 
            ? "bg-white/80 backdrop-blur-xl shadow-md border-b border-gray-200"
            : "bg-transparent"
          }
        `}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          
          {/* 🔥 3 COLUMN GRID (FIX FOR CENTER ALIGNMENT) */}
          <div className="grid grid-cols-3 items-center h-20">

            {/* LEFT - LOGO */}
            <Link to="/" className="flex items-center gap-3 justify-start">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                <img src={Logo} alt="Logo" className="w-full h-full object-cover" />
              </div>

              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-blue-600 leading-tight">
                  Smart ICT Desk
                </h1>
                <p className="text-xs text-gray-500 leading-tight">
                  AI ICT Support System
                </p>
              </div>
            </Link>

            {/* CENTER - NAVIGATION (YOUR REQUEST) */}
            <div className="hidden lg:flex justify-center items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    isActive(link.path)
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* RIGHT - AUTH BUTTONS */}
            <div className="hidden lg:flex justify-end items-center gap-2">
              <Link
                to="/signin"
                className="px-5 py-2 border border-blue-600 text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-50 transition"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
              >
                Get Started
              </Link>
            </div>

            {/* MOBILE BUTTON */}
            <div className="lg:hidden flex justify-end col-span-1">
              <button
                className="text-2xl text-blue-600"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>

          </div>

          {/* MOBILE MENU */}
          {mobileOpen && (
            <div className="lg:hidden pb-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-2 rounded-lg transition ${
                    isActive(link.path)
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-2 space-y-2">
                <Link
                  to="/signin"
                  className="block text-center px-4 py-2 border border-blue-600 text-blue-600 rounded-lg"
                  onClick={() => setMobileOpen(false)}
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="block text-center px-4 py-2 bg-blue-600 text-white rounded-lg"
                  onClick={() => setMobileOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-20"></div>
    </>
  );
};

export default Navbar;