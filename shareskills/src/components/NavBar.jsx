import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import * as usersAPI from "../utilities/users-api";

const NavBar = ({ user, setUser }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  
 // will refresh state and set us back to home without a user
 function handleLogout() {
    usersAPI.logout()
    setUser(null);
    navigate("/")
}


  return (
    <nav className="w-full border-b px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-semibold">ShareSkills</span>
            {/* <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">Beta</span> */}
          </Link>
        </div>

        {/* Menu Icon for Mobile */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-6 text-sm font-medium text-gray-800">
          <Link to="/"><li className="hover:text-black cursor-pointer">Browse Services</li></Link>
          <li className="hover:text-black cursor-pointer">How It Works</li>
          <li className="hover:text-black cursor-pointer">Become a Provider</li>
        </ul>

        {/* Desktop Buttons - Conditional based on auth state */}
        <div className="hidden md:flex space-x-3">
          {!user ? (
            <>
              <Link to="/"> 
                <button className="px-4 py-1 rounded bg-gray-100 hover:bg-gray-200 text-sm">Log in</button>
              </Link>
              <Link to="/signup">
                <button className="px-4 py-1 rounded bg-black text-white text-sm hover:bg-gray-800">Get Started</button>
              </Link>
            </>
          ) : (
            <div className="relative">
              <div className="flex items-center space-x-3">
                <Link to="/">
                  <button className="px-4 py-1 rounded bg-gray-100 hover:bg-gray-200 text-sm flex items-center gap-2">
                    <User size={16} /> 
                    {user.first_name || user.username}
                  </button>
                </Link>
                <button 
                  className="relative px-4 py-1 rounded bg-red-50 text-red-600 hover:bg-red-100 text-sm flex items-center gap-2"
                  onClick={handleLogout}
                  type="button"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden mt-4 space-y-3 text-sm text-gray-800">
          <ul className="space-y-2">
            <Link to="/services" onClick={() => setOpen(false)}>
              <li className="hover:text-black">Browse Services</li>
            </Link>
            <li className="hover:text-black">How It Works</li>
            <li className="hover:text-black">Become a Provider</li>
          </ul>
          <div className="flex flex-col gap-2 mt-3">
            {!user ? (
              <>
                <Link to="/user/login" onClick={() => setOpen(false)}>
                  <button className="py-2 w-full rounded bg-gray-100 hover:bg-gray-200">Log in</button>
                </Link>
                <Link to="/user/signup" onClick={() => setOpen(false)}>
                  <button className="py-2 w-full rounded bg-black text-white hover:bg-gray-800">Get Started</button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/" onClick={() => setOpen(false)}>
                  <button className="py-2 w-full rounded bg-gray-100 hover:bg-gray-200 flex items-center justify-center gap-2">
                    <User size={16} /> 
                    {user.first_name || user.username}
                  </button>
                </Link>
                <button 
                  className="py-2 w-full rounded bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center gap-2"
                  onClick={handleLogout}
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