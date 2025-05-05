// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as usersAPI from "../utilities/users-api";

export default function LoginPage({ user, setUser }) {
  const navigate = useNavigate();
  const initialState = { username: "", password: "" };
  const [formData, setFormData] = useState(initialState);

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  }

  async function handleLogin(evt) {
    evt.preventDefault();
    try {
      const loggedInUser = await usersAPI.login(formData);
      setUser(loggedInUser);
      navigate("/");               
    } catch (err) {
      console.error("Login failed", err);
      setUser(null);
    }
  }

  return (
    <div className="login-page">
      {!user ? (
        <section>
          <form onSubmit={handleLogin} className="form-container login">
            <h1>Login</h1>

            <p>
              <label htmlFor="id_username">Username:</label>
              <input
                type="text"
                name="username"
                id="id_username"
                value={formData.username}
                onChange={handleChange}
                required
                maxLength={150}
              />
            </p>

            <p>
              <label htmlFor="id_password">Password:</label>
              <input
                type="password"
                name="password"
                id="id_password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </p>

            <button type="submit" className="btn submit">
              Login
            </button>
          </form>
        </section>
      ) : (
        <p>You are already logged in as {user.username}.</p>
      )}
    </div>
  );
}
