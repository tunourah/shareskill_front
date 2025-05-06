// src/pages/MyListingsPage.jsx
import React, { useState, useEffect } from 'react';
import SideBar from '../components/SideBar';
import ServiceCard from '../components/ServiceCard';
import { getAllServiceListings } from '../utilities/serviceListingService';
import { Plus, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

// Define color constants from original UI
const COLORS = {
    darkTeal: "#002933", // 40% usage - base, text, backgrounds
    brightBlue: "#0AC6F2", // primary accent
    mint: "#25DEC5", // secondary accent
    teal: "#27969A", // tertiary accent
    gold: "#F7C03E", // 5% accent
    orange: "#F76C35", // 5% accent
    magenta: "#A81E70" // 5% accent
  };
  
  // Define custom style objects
  const styles = {
    page: {
      backgroundColor: "rgba(0, 41, 51, 0.03)",
    },
    container: {
      background: "rgba(255, 255, 255, 0.8)",
      borderColor: "rgba(39, 150, 154, 0.2)"
    },
    header: {
      background: "rgba(0, 41, 51, 0.08)",
      borderBottom: "1px solid rgba(39, 150, 154, 0.2)"
    },
    button: {
      primary: {
        backgroundColor: COLORS.brightBlue,
        color: "white"
      },
      secondary: {
        backgroundColor: COLORS.darkTeal,
        color: "white"
      }
    },
    activeStatus: {
      backgroundColor: COLORS.mint
    },
    inactiveStatus: {
      backgroundColor: "rgba(0, 41, 51, 0.2)"
    },
    input: {
      borderColor: "rgba(39, 150, 154, 0.3)",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      color: COLORS.darkTeal
    }
  };
export default function MyListingsPage() {
  const [services, setServices] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  useEffect(() => {
    const fetchMyListings = async () => {
      try {
        const data = await getAllServiceListings({ provider: 'current' });
        setServices(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        console.error('Failed to fetch your listings:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyListings();
  }, []);

  return (
    <div className="min-h-screen py-8 px-4 md:px-8" style={styles.page}>
    {/* Back button */}
    <div className="max-w-6xl mx-auto mb-6">
      <button
        className="flex items-center text-sm font-medium"
        style={{ color: COLORS.darkTeal }}
        onClick={() => nav('/my-listings')}
      >
        <ChevronLeft size={16} stroke={COLORS.brightBlue} />
        <span>Back to My Listings</span>
      </button>
    </div>
  
    {/* Centered page wrapper */}
    <div className="max-w-6xl mx-auto">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold" style={{ color: COLORS.darkTeal }}>
          My Listings
        </h1>
        <p className="text-gray-600 mt-2">
          Here are all of the services you’ve created
        </p>
      </div>
  
      {/* Two-column layout: sidebar + content */}
      <div className="flex flex-col md:flex-row gap-6">
        <SideBar />
  
        <div
          className="flex-1 rounded-2xl overflow-hidden shadow-xl backdrop-blur-sm"
          style={styles.container}
        >
          {/* loading / error / list */}
          {loading ? (
            <p className="p-6">Loading your listings…</p>
          ) : error ? (
            <p className="p-6 text-red-500">
              Error loading listings. Please try again.
            </p>
          ) : services.length > 0 ? (
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map(service => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <div className="p-6 text-center">
              <p>You haven’t created any listings yet.</p>
              <Link
                to="/serviceform"
                className="mt-4 inline-block bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-700"
              >
                Create Your First Service
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
  
  );
}
