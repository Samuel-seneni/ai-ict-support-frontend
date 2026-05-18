import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignIn = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return; // prevent double clicks
    setError("");

    try {
      setLoading(true);

      const email = form.email.trim();

      if (!email || !form.password) {
        setError("Please fill in all fields");
        return;
      }

      await login(email, form.password);

      navigate("/dashboard");
    } catch (err) {
      console.error(err);

      // Firebase friendly error messages
      let message = "Login failed. Please try again.";

      if (err.code === "auth/user-not-found") {
        message = "No account found with this email.";
      } else if (err.code === "auth/wrong-password") {
        message = "Incorrect password.";
      } else if (err.code === "auth/invalid-email") {
        message = "Invalid email format.";
      } else if (err.code === "auth/too-many-requests") {
        message = "Too many attempts. Try again later.";
      }

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">

      <div className="w-full max-w-md bg-white shadow-xl rounded-3xl p-8">

        <h2 className="text-3xl font-bold text-center text-blue-600">
          Welcome Back
        </h2>

        <p className="text-center text-gray-500 mt-2">
          Sign in to Smart ICT Desk
        </p>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-xl mt-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400"
            required
          />

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 pr-10"
              required
            />

            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold transition ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

        </form>

        {/* LINKS */}
        <div className="text-center mt-6 space-y-2">

          <p className="text-sm text-gray-600">
            Don’t have an account?
          </p>

          <Link to="/signup" className="text-blue-600 font-semibold">
            Create Account
          </Link>

          <br />

          <Link to="/" className="text-gray-500 text-sm hover:text-blue-600">
            ← Back to Home
          </Link>

        </div>

      </div>

    </div>
  );
};

export default SignIn;