// src/components/NavBar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut } from "lucide-react";
import * as usersAPI from "../utilities/users-api";

const NavBar = ({ user, setUser }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    usersAPI.logout();
    setUser(null);
    navigate("/");
  }

  return (
    <nav className="w-full border-b px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-semibold">
          ShareSkills
        </Link>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop nav links */}
        <ul className="hidden md:flex space-x-6 text-sm font-medium text-gray-800">
          <li>
            <Link to="/services" className="hover:text-black">
              Browse Services
            </Link>
          </li>
          <li>
              <a 
                href="#Works"
                onClick={() => setOpen(false)}
                className="block hover:text-black"
              >
                How It Works
              </a>
            </li>
          <li>
            <Link to="/become-provider" className="hover:text-black">
              Become a Provider
            </Link>
          </li>
        </ul>

        {/* Desktop auth buttons */}
        <div className="hidden md:flex space-x-3">
          {!user ? (
            <>
              <Link to="/login">
                <button className="px-4 py-1 rounded bg-gray-100 hover:bg-gray-200 text-sm">
                  Log in
                </button>
              </Link>
              <Link to="/signup">
                <button className="px-4 py-1 rounded bg-black text-white text-sm hover:bg-gray-800">
                  Get Started
                </button>
              </Link>
            </>
          ) : (
            <div className="flex items-center space-x-3">
              <Link to="/userpage">
                <button className="px-4 py-1 rounded bg-gray-100 hover:bg-gray-200 text-sm flex items-center gap-2">
                  <User size={16} /> {user.first_name || user.username}
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-1 rounded bg-red-50 text-red-600 hover:bg-red-100 text-sm flex items-center gap-2"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden mt-4 space-y-3 text-sm text-gray-800">
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="block hover:text-black"
              >
                Browse Services
              </Link>
            </li>
            <li>
              <a 
                href="#Works"
                onClick={() => setOpen(false)}
                className="block hover:text-black"
              >
                How It Works
              </a>
            </li>
            <li>
              <Link
                to="/become-provider"
                onClick={() => setOpen(false)}
                className="block hover:text-black"
              >
                Become a Provider
              </Link>
            </li>
          </ul>

          {/* Mobile auth buttons */}
          <div className="flex flex-col gap-2 mt-3">
            {!user ? (
              <>
                <Link to="/login" onClick={() => setOpen(false)}>
                  <button className="py-2 w-full rounded bg-gray-100 hover:bg-gray-200">
                    Log in
                  </button>
                </Link>
                <Link to="/signup" onClick={() => setOpen(false)}>
                  <button className="py-2 w-full rounded bg-black text-white hover:bg-gray-800">
                    Get Started
                  </button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/profile" onClick={() => setOpen(false)}>
                  <button className="py-2 w-full rounded bg-gray-100 hover:bg-gray-200 flex items-center justify-center gap-2">
                    <User size={16} /> {user.first_name || user.username}
                  </button>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className="py-2 w-full rounded bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center gap-2"
                  type="button"
                >
                  <LogOut size={16} /> Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
