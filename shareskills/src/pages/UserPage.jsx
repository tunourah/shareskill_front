import React from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiPlusCircle } from 'react-icons/fi';

const UserPage = ({ user }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Welcome Section */}
      <div className="pt-16 pb-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Welcome, {user ? (user.first_name || user.username) : 'Guest'}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose an option below to get started with ShareSkills
          </p>
        </div>
      </div>

      {/* Cards Section */}
      <div className="max-w-5xl mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Browse Services Card */}
          <Link to="/" className="group">
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full">
              <div className="h-40 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <FiSearch className="text-white w-20 h-20 opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                  Browse Services
                </h3>
                <p className="text-gray-600 mb-6">
                  Explore a wide range of services offered by our community members. Find exactly what you need from professional providers.
                </p>
                <div className="flex items-center text-blue-600 font-medium">
                  Discover Services
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
          
          {/* Offer a Service Card */}
          <Link to="/serviceform" className="group">
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full">
              <div className="h-40 bg-gradient-to-r from-emerald-500 to-teal-600 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <FiPlusCircle className="text-white w-20 h-20 opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors duration-200">
                  Offer a Service
                </h3>
                <p className="text-gray-600 mb-6">
                  Share your skills with others and start earning. Create a listing for your specialized services and connect with potential clients.
                </p>
                <div className="flex items-center text-emerald-600 font-medium">
                  Create Listing
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default UserPage;