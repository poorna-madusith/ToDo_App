import React, { useEffect, useState } from "react";
import UserDetails from "./UserDetails";
import { updateUserProfile } from "../services/authServices";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    username: "",
    email: "",
    oldPassword: "",
    newPassword: "",
    currentEmail: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsed = JSON.parse(userData);
      setUser(parsed);
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("You are not logged in. Please log in again.");
        setLoading(false);
        return;
      }
      await updateUserProfile(form, token);
      window.alert("Porifle Updated")
      setUser((u) => ({ ...u, username: form.username, email: form.email }));
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, username: form.username, email: form.email })
      );
      setEdit(false);
    } catch (err) {
      setMessage(err.response?.data || err.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSetEdit = () => {
    setEdit(true);
    if (user) {
      setForm((f) => ({
        ...f,
        username: user.username || "",
        email: user.email || "",
        currentEmail: user.email || "",
        oldPassword: "",
        newPassword: "",
      }));
    }
  };
  const handleCancelEdit = () => {
    setEdit(false);
    setForm({
      username: "",
      email: "",
      oldPassword: "",
      newPassword: "",
      currentEmail: "",
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen bg-gradient-to-br  flex flex-col items-center justify-center">
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-8">
        <UserDetails user={user} />
        <button
          onClick={handleSetEdit}
          className="mt-6 mb-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-200"
        >
          Edit
        </button>
        {edit && (
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-inner rounded-xl p-6 mt-8 border border-blue-200"
          >
            <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">
              Update Profile
            </h2>
            <div className="mb-5">
              <label className="block mb-2 font-semibold text-gray-700">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                className="w-full border border-blue-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                required
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-blue-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                required
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 font-semibold text-gray-700">
                Old Password
              </label>
              <input
                type="password"
                name="oldPassword"
                value={form.oldPassword}
                onChange={handleChange}
                className="w-full border border-blue-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                required
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 font-semibold text-gray-700">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                className="w-full border border-blue-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>
            <div className="flex gap-4 mt-6">
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow transition duration-200 disabled:opacity-60"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>
              <button
                type="button"
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded-lg shadow transition duration-200"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            </div>
            {message && (
              <div className="mt-6 text-center text-red-600 font-medium">
                {message}
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
