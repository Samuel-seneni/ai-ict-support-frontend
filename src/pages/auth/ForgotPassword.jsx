import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    await sendPasswordResetEmail(auth, email);
    setMsg("Reset email sent!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleReset} className="w-96 p-6 bg-white shadow rounded">

        <h2 className="text-xl font-bold mb-4">Reset Password</h2>

        {msg && <p className="text-green-600">{msg}</p>}

        <input
          className="w-full p-2 border mb-2"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="w-full bg-blue-600 text-white p-2 rounded">
          Send Reset Email
        </button>

        <p className="text-center text-sm mt-2">
          <Link to="/signin">Back to Login</Link>
        </p>

        <p className="text-center text-sm mt-2">
          <Link to="/">← Home</Link>
        </p>

      </form>
    </div>
  );
};

export default ForgotPassword;