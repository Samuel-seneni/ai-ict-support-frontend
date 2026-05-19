import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { updateProfile } from "firebase/auth";

import logo from "../../assets/Ictlogo.png";

const SignUp = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.firstName.trim() || !form.lastName.trim()) {
      return setError("First and Last name are required");
    }

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match");
    }

    if (form.password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    try {
      setLoading(true);

      const userCredential = await register(form.email, form.password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: `${form.firstName} ${form.lastName}`,
      });

      setSuccess("Account created successfully 🎉");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (err) {
      setError(err.message.replace("Firebase:", ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">

      <div className="w-full max-w-md bg-white shadow-xl rounded-3xl p-8">

        {/* LOGO (FIXED) */}
      
<div className="flex justify-center mb-6">
  <div className="p-3 bg-blue-50 rounded-2xl shadow-sm border border-blue-100">
    <img src={logo} alt="Logo"
      className="h-14 w-auto object-contain"
    />
  </div>
</div>

        <h2 className="text-3xl font-bold text-center text-blue-600">
          Create Account
        </h2>

        <p className="text-center text-gray-500 mt-2">
          Smart ICT Desk Registration
        </p>

        {success && (
          <div className="bg-green-100 text-green-700 p-3 rounded-xl mt-4 text-sm">
            {success}
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-xl mt-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
            required
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full p-3 border rounded-xl pr-10"
              required
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              className="w-full p-3 border rounded-xl pr-10"
              required
            />
            <div
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-3 cursor-pointer text-gray-500"
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

        </form>

        <div className="text-center mt-6 text-sm space-y-2">

  <p className="text-gray-600">
    Already have an account?
  </p>

  <Link to="/signin" className="text-blue-600 font-semibold">
    Sign In
  </Link>

  <br />

  <Link
    to="/"
    className="text-gray-500 text-sm hover:text-blue-600"
  >
    ← Back to Home
  </Link>

</div>

      </div>
    </div>
  );
};

export default SignUp;