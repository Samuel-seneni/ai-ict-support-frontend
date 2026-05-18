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
  const [loading, setLoading] =
    useState(false);

  const [preview, setPreview] =
    useState(null);

  const [message, setMessage] =
    useState("");

  // =====================================
  // AUTO UPLOAD
  // =====================================
  const handleUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      setLoading(true);
      setMessage("");

      // PREVIEW IMAGE
      const previewUrl =
        URL.createObjectURL(file);

      setPreview(previewUrl);

      // CURRENT USER
      const user =
        auth.currentUser;

      if (!user) {
        alert(
          "User not authenticated"
        );
        return;
      }

      // FAST STORAGE PATH
      const storageRef = ref(
        storage,
        `profiles/${user.uid}`
      );

      // DIRECT FAST UPLOAD
      await uploadBytes(
        storageRef,
        file
      );

      // GET URL
      const imageUrl =
        await getDownloadURL(
          storageRef
        );

      // UPDATE AUTH
      await updateProfile(user, {
        photoURL: imageUrl,
      });

      // UPDATE FIRESTORE
      await updateDoc(
        doc(db, "users", user.uid),
        {
          photoURL: imageUrl,
        }
      );

      // UPDATE LOCAL USER
      user.photoURL = imageUrl;

      setMessage(
        "Profile picture updated successfully"
      );

    } catch (error) {
      console.log(error);

      setMessage(
        "Upload failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mt-6">

      <label className="block mb-3 font-bold text-gray-700">
        Upload Profile Picture
      </label>

      {/* IMAGE PREVIEW */}
      <div className="flex justify-center mb-4">

        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="w-28 h-28 rounded-full object-cover border-4 border-blue-100 shadow-md"
          />
        ) : auth.currentUser
            ?.photoURL ? (
          <img
            src={
              auth.currentUser
                .photoURL
            }
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-blue-100 shadow-md"
          />
        ) : (
          <div className="w-28 h-28 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white flex items-center justify-center text-4xl font-black">
            {auth.currentUser?.email?.charAt(
              0
            )}
          </div>
        )}

      </div>

      {/* FILE INPUT */}
      <label className="flex items-center justify-center gap-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-2xl px-5 py-4 cursor-pointer transition">

        <FaCamera className="text-blue-600" />

        <span className="font-semibold text-blue-700">
          {loading
            ? "Uploading..."
            : "Choose Photo"}
        </span>

        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
        />

      </label>

      {/* SUCCESS MESSAGE */}
      {message && (
        <div className="mt-4 bg-green-50 border border-green-200 text-green-700 rounded-2xl p-3 flex items-center gap-2">

          <FaCheckCircle />

          <span className="text-sm font-semibold">
            {message}
          </span>

        </div>
      )}

    </div>
  );
};

export default ProfileUpload;