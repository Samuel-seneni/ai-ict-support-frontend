import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { FaEye, FaEyeSlash, FaCheckCircle } from "react-icons/fa";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebase";

import logo from "../../assets/logo.png";

const SignIn = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetMsg, setResetMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      setLoading(true);
      await login(form.email, form.password);

      setSuccess("Login successful 🎉");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (err) {
      setError("Login failed. Check credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!form.email) {
      return setError("Enter your email first");
    }

    try {
      await sendPasswordResetEmail(auth, form.email);
      setResetMsg("Password reset email sent ✔");
    } catch (err) {
      setError("Failed to send reset email");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">

      <div className="w-full max-w-md bg-white shadow-xl rounded-3xl p-8">

        {/* LOGO */}
        <div className="flex justify-center mb-4">
          <img src={logo} className="h-16" />
        </div>

        <h2 className="text-2xl font-bold text-center text-blue-600">
          Welcome Back
        </h2>

        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
        {success && (
          <p className="text-green-600 flex items-center gap-2 mt-3">
            <FaCheckCircle /> {success}
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-3">

          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          />

          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={handleChange}
              className="w-full p-3 border rounded-xl pr-10"
            />

            <div onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 cursor-pointer">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* FORGOT PASSWORD */}
        <div className="text-center mt-4">
          <button
            onClick={handleResetPassword}
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot Password?
          </button>

          {resetMsg && (
            <p className="text-green-600 text-sm mt-2">{resetMsg}</p>
          )}
        </div>

        <div className="text-center mt-6 text-sm">
          <Link to="/signup" className="text-blue-600 font-semibold">
            Create Account
          </Link>
        </div>

      </div>
    </div>
  );
};

export default SignIn;