import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "../../assets/Logo.png";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, logout } = useAuth(); // ✅ AUTH HOOK

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

  const handleLogout = () => {
    logout();            // clear auth
    navigate("/signin"); // redirect
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl shadow-md border-b border-gray-200"
            : "bg-transparent"
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 items-center h-20">

            {/* LEFT - LOGO */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                <img src={Logo} alt="Logo" className="w-full h-full object-cover" />
              </div>

              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-blue-600">
                  Smart ICT Desk
                </h1>
                <p className="text-xs text-gray-500">
                  AI ICT Support System
                </p>
              </div>
            </Link>

            {/* CENTER - NAV */}
            <div className="hidden lg:flex justify-center items-center gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                    isActive(link.path)
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* RIGHT - AUTH */}
            <div className="hidden lg:flex justify-end items-center gap-3">

              {/* ✅ LOGGED IN STATE */}
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="px-5 py-2 border border-blue-600 text-blue-600 rounded-full text-sm font-semibold hover:bg-blue-50"
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="px-5 py-2 bg-red-500 text-white rounded-full text-sm font-semibold hover:bg-red-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="px-5 py-2 border border-blue-600 text-blue-600 rounded-full text-sm font-semibold hover:bg-blue-50"
                  >
                    Login
                  </Link>

                  <Link
                    to="/signup"
                    className="px-5 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* MOBILE BUTTON */}
            <div className="lg:hidden flex justify-end">
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
            <div className="lg:hidden pb-5 space-y-3 bg-white rounded-2xl shadow-lg mt-2 p-4">

              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-xl font-medium ${
                    isActive(link.path)
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <hr />

              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="block text-center px-4 py-3 border border-blue-600 text-blue-600 rounded-xl"
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      handleLogout();
                    }}
                    className="w-full px-4 py-3 bg-red-500 text-white rounded-xl"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/signin"
                    onClick={() => setMobileOpen(false)}
                    className="block text-center px-4 py-3 border border-blue-600 text-blue-600 rounded-xl"
                  >
                    Login
                  </Link>

                  <Link
                    to="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="block text-center px-4 py-3 bg-blue-600 text-white rounded-xl"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </nav>

      <div className="h-20" />
    </>
  );
};

export default Navbar;