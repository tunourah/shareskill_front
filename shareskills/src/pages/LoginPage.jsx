import React, { useState, useEffect } from "react"; // ✅ You missed useEffect
import { Link, useNavigate } from "react-router-dom";
import * as usersAPI from "../utilities/users-api";

export default function LoginPage({ user, setUser }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  function handleChange(evt) {
    setFormData(f => ({ ...f, [evt.target.name]: evt.target.value }));
  }

  async function handleLogin(evt) {
    evt.preventDefault();
    try {
      const loggedInUser = await usersAPI.login(formData);
    //   console.log("🔥 login returned user:", loggedInUser);
      setUser(loggedInUser);
  
      // ✅ Navigate immediately after login
      navigate("/userpage", { replace: true });
    } catch (err) {
      console.error("Login failed", err);
      setError(err.message || "Login failed");
    }
  }
  

  // ✅ Navigate to /userpage only *after* user is set
  useEffect(() => {
    // console.log("📣 LoginPage: user =", user);
    if (user) {
      navigate("/userpage");
    }
  }, [user, navigate]);

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-700">You’re already logged in as <strong>{user.username}</strong>.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8">
        <Link to="/" className="block text-2xl mb-4 text-gray-500 hover:text-gray-700">
          &larr;
        </Link>

        <h1 className="text-3xl font-semibold text-center text-gray-900 mb-2">
          Log In
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Welcome back! Please log in to your account.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="id_username" className="block text-sm font-medium text-gray-700 mb-1">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              id="id_username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="id_password" className="block text-sm font-medium text-gray-700 mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              id="id_password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-full border border-gray-800 text-gray-800 font-medium hover:bg-gray-100 transition"
          >
            Log In
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-rose-500 font-medium hover:underline">
            Sign up
          </Link>
        </p>

        <p className="text-xs text-gray-400 text-center mt-4">
          By logging in you agree to our{" "}
          <span className="underline cursor-pointer text-gray-600">
            Terms of Service
          </span>{" "}
          and{" "}
          <span className="underline cursor-pointer text-gray-600">
            Privacy Policy
          </span>.
        </p>
      </div>
    </div>
  );
}
