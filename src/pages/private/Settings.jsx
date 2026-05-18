import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  FaUserCog,
  FaBell,
  FaLock,
  FaSave,
  FaCheckCircle,
  FaLaptop,
} from "react-icons/fa";

import {
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendEmailVerification,
} from "firebase/auth";

import {
  doc,
  updateDoc,
  collection,
  getDocs,
} from "firebase/firestore";

import { auth, db } from "../../firebase/firebase";
import { useAuth } from "../../contexts/AuthContext";
import ProfileUpload from "../../components/ProfileUpload";
import { addLog } from "../../services/logService";

const Settings = () => {
  const { user } = useAuth();

  const [settings, setSettings] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    notifications: true,
  });

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const snapshot = await getDocs(collection(db, "sessions"));
        setSessions(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (error) {
        console.log(error);
      }
    };

    fetchSessions();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      await updateDoc(doc(db, "users", user.uid), {
        fullName: settings.fullName,
        notifications: settings.notifications,
      });

      await addLog("Updated Settings", user.fullName, user.role || "User");

      setMessage("Settings saved successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handleVerifyEmail = async () => {
    try {
      await sendEmailVerification(auth.currentUser);
      setMessage("Verification email sent");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangePassword = async () => {
    setMessage("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      return setMessage("All fields required");
    }

    if (newPassword !== confirmPassword) {
      return setMessage("Passwords do not match");
    }

    try {
      setLoading(true);

      const currentUser = auth.currentUser;

      const credential = EmailAuthProvider.credential(
        currentUser.email,
        currentPassword
      );

      await reauthenticateWithCredential(currentUser, credential);
      await updatePassword(currentUser, newPassword);

      await addLog("Changed Password", user.fullName, user.role || "User");

      setMessage("Password updated successfully");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.log(error);
      setMessage("Password update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 text-gray-800 transition-colors duration-300">

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-4xl font-black">Enterprise Settings</h1>
        <p className="text-gray-500 mt-2">
          Manage security, preferences, and enterprise controls
        </p>
      </div>

      {/* MESSAGE */}
      {message && (
        <div className="mb-8 bg-blue-50 text-blue-700 border border-blue-200 rounded-2xl p-4 flex items-center gap-3">
          <FaCheckCircle />
          {message}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">

        {/* PROFILE */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl shadow-lg border p-8"
        >
          <div className="flex flex-col items-center text-center">

            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-blue-100"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white flex items-center justify-center text-5xl font-black">
                {user?.fullName?.charAt(0) || "U"}
              </div>
            )}

            <h2 className="mt-6 text-2xl font-black">{user?.fullName}</h2>
            <p className="text-gray-500">{user?.email}</p>

            <div className="mt-4 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-bold">
              {user?.role || "Admin"}
            </div>

            {user?.emailVerified ? (
              <div className="mt-4 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                <FaCheckCircle />
                Verified Email
              </div>
            ) : (
              <button
                onClick={handleVerifyEmail}
                className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl font-semibold"
              >
                Verify Email
              </button>
            )}

            <ProfileUpload />
          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <div className="lg:col-span-2 space-y-8">

          {/* ACCOUNT SETTINGS */}
          <motion.form
            onSubmit={handleSave}
            className="bg-white rounded-3xl shadow-lg border p-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <FaUserCog className="text-blue-600 text-2xl" />
              <h2 className="text-2xl font-black">Account Settings</h2>
            </div>

            <input
              type="text"
              name="fullName"
              value={settings.fullName}
              onChange={handleChange}
              className="w-full border rounded-2xl p-4 mb-4"
              placeholder="Full Name"
            />

            <input
              value={settings.email}
              disabled
              className="w-full border rounded-2xl p-4 bg-gray-100"
            />

            {/* NOTIFICATIONS ONLY */}
            <div className="flex justify-between mt-6">
              <label className="flex items-center gap-2">
                <FaBell />
                Notifications
              </label>

              <input
                type="checkbox"
                name="notifications"
                checked={settings.notifications}
                onChange={handleChange}
              />
            </div>

            <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2">
              <FaSave />
              Save Settings
            </button>
          </motion.form>

          {/* SECURITY */}
          <div className="bg-white rounded-3xl shadow-lg border p-8">
            <h2 className="text-2xl font-black mb-4">Security</h2>

            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full border p-3 rounded-xl mb-3"
            />

            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border p-3 rounded-xl mb-3"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border p-3 rounded-xl mb-3"
            />

            <button
              onClick={handleChangePassword}
              disabled={loading}
              className="bg-red-500 text-white px-6 py-3 rounded-xl"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Settings;