import React from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiPlusCircle } from 'react-icons/fi';
import skill2 from "../assets/images/skill3.png"; // Ensure this path is correct for your project

const UserPage = ({ user }) => {
  return user ? (
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

   

      {/* Cards Section - Centered */}
      <div className="px-4 pb-20">
        {/* Centered Cards Container */}
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-center items-stretch gap-8">
          
          {/* Browse Services Card */}
          <Link to="/services" className="group md:w-1/2 lg:w-2/5 xl:w-1/3 flex">
            <div className="bg-white rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden h-full flex flex-col w-full">
              <div className="h-40 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <FiSearch className="text-white w-20 h-20 opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                  Browse Services
                </h3>
                <p className="text-gray-600 mb-6 flex-grow">
                  Explore a wide range of services offered by our community members. Find exactly what you need from professional providers.
                </p>
                <div className="flex items-center text-blue-600 font-medium mt-auto">
                  Discover Services
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
          
          {/* Your Profile & Services Card */}
          <Link to="/serviceform" className="group md:w-1/2 lg:w-2/5 xl:w-1/3 flex">
            <div className="bg-white rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden h-full flex flex-col w-full">
              <div className="h-40 bg-gradient-to-r from-emerald-500 to-teal-600 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <FiPlusCircle className="text-white w-20 h-20 opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors duration-200">
                  Your Profile & Services
                </h3>
                <p className="text-gray-600 mb-6 flex-grow">
                  Share your skills with others and start earning. Create a listing for your specialized services and connect with potential clients.
                </p>
                <div className="flex items-center text-emerald-600 font-medium mt-auto">
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
  ) : <div className="min-h-screen flex items-center justify-center text-xl text-gray-700">Please sign in to view your page.</div>;
};

export default UserPage;

