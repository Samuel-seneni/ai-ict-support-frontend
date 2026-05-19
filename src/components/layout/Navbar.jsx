import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";

// ✅ LOGO IMPORT
import logo from "../../assets/Ictlogo.png";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  // SCROLL EFFECT
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // NAVIGATION LINKS
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "FAQ", path: "/faq" },
    { name: "Contact", path: "/contact" },
  ];

  // ACTIVE LINK
  const isActive = (path) => location.pathname === path;

  // LOGOUT
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/signin");
    } catch (error) {
      console.log("Logout Error:", error);
    }
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

              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center shadow-sm border border-gray-200">
                <img
                  src={logo}
                  alt="ICT Logo"
                  className="w-10 h-10 object-cover rounded-full"
                />
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

            {/* CENTER - DESKTOP NAV */}
            <div className="hidden lg:flex justify-center items-center gap-2">

              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
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
            <div className="hidden lg:flex justify-end items-center gap-3">

              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="px-5 py-2 border border-blue-600 text-blue-600 rounded-full text-sm font-semibold hover:bg-blue-50 transition"
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="px-5 py-2 bg-red-500 text-white rounded-full text-sm font-semibold hover:bg-red-600 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="px-5 py-2 border border-blue-600 text-blue-600 rounded-full text-sm font-semibold hover:bg-blue-50 transition"
                  >
                    Login
                  </Link>

                  <Link
                    to="/signup"
                    className="px-5 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition"
                  >
                    Get Started
                  </Link>
                </>
              )}

            </div>

            {/* MOBILE MENU BUTTON */}
            <div className="lg:hidden flex justify-end">

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="text-2xl text-blue-600"
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
                  className={`block px-4 py-3 rounded-xl font-medium transition ${
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

      {/* NAVBAR SPACER */}
      <div className="h-20" />
    </>
  );
};

export default Navbar;