import React, { useState } from "react";

import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import {
  doc,
  updateDoc,
} from "firebase/firestore";

import {
  updateProfile,
} from "firebase/auth";

import {
  storage,
  db,
  auth,
} from "../firebase/firebase";

import {
  FaCamera,
  FaCheckCircle,
} from "react-icons/fa";

const ProfileUpload = () => {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");

  // =====================================
  // UPLOAD PROFILE PICTURE (ENTERPRISE SAFE)
  // =====================================
  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // instant preview
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    const user = auth.currentUser;

    if (!user) {
      setMessage("❌ User not authenticated");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      // safe file path (prevents overwrite conflicts later if needed)
      const storageRef = ref(
        storage,
        `profiles/${user.uid}/profile.jpg`
      );

      // upload
      await uploadBytes(storageRef, file);

      // download URL
      const imageUrl = await getDownloadURL(storageRef);

      // update auth profile
      await updateProfile(user, {
        photoURL: imageUrl,
      });

      // update firestore safely
      await updateDoc(doc(db, "users", user.uid), {
        photoURL: imageUrl,
      });

      // force local sync
      user.photoURL = imageUrl;

      setMessage("✅ Profile updated successfully");

    } catch (error) {
      console.error("UPLOAD ERROR:", error);
      setMessage("❌ Upload failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // UI
  // =====================================
  return (
    <div className="w-full mt-6">

      <label className="block mb-3 font-bold text-gray-700">
        Upload Profile Picture
      </label>

      {/* PROFILE PREVIEW */}
      <div className="flex justify-center mb-4">

        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="w-28 h-28 rounded-full object-cover border-4 border-blue-100 shadow-md"
          />
        ) : auth.currentUser?.photoURL ? (
          <img
            src={auth.currentUser.photoURL}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-blue-100 shadow-md"
          />
        ) : (
          <div className="w-28 h-28 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white flex items-center justify-center text-4xl font-black">
            {auth.currentUser?.email?.charAt(0)?.toUpperCase()}
          </div>
        )}

      </div>

      {/* UPLOAD BUTTON */}
      <label className="flex items-center justify-center gap-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-2xl px-5 py-4 cursor-pointer transition disabled:opacity-50">

        <FaCamera className="text-blue-600" />

        <span className="font-semibold text-blue-700">
          {loading ? "Uploading..." : "Choose Photo"}
        </span>

        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
          disabled={loading}
        />

      </label>

      {/* STATUS MESSAGE */}
      {message && (
        <div className={`mt-4 rounded-2xl p-3 flex items-center gap-2 text-sm font-semibold ${
          message.includes("❌")
            ? "bg-red-50 border border-red-200 text-red-600"
            : "bg-green-50 border border-green-200 text-green-700"
        }`}>
          <FaCheckCircle />
          <span>{message}</span>
        </div>
      )}

    </div>
  );
};

export default ProfileUpload;