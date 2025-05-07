// src/pages/ServicePage.jsx
import { useState, useEffect } from "react";
import ServiceCard from "../components/ServiceCard";
import { getAllCategories } from "../utilities/categoryService";
import { getAllServiceListings } from "../utilities/serviceListingService";

const COLORS = {
    darkTeal: "#002933", 
    brightBlue: "#0AC6F2", 
    mint: "#25DEC5", 
    teal: "#27969A", 
    gold: "#F7C03E", 
    orange: "#F76C35", 
    magenta: "#A81E70"
  };
  
  // Button styles
  const buttonStyles = {
    primary: {
      backgroundColor: COLORS.brightBlue,
      color: "white"
    }
  };
  

export default function Services() {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 1️⃣ Load categories once
  useEffect(() => {
    getAllCategories()
      .then(setCategories)
      .catch((err) => console.error("Cats:", err));
  }, []);

  // 2️⃣ Load services whenever filters change
  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);
  
    getAllServiceListings({ search, category, location })
      .then((data) => {
        if (!cancelled) {
         
          const list = Array.isArray(data)
            ? data
            : Array.isArray(data.results)
            ? data.results
            : [];
          setServices(list);
        }
      })
      .catch((_) => {
        if (!cancelled) setError("Could not load services");
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
  
    return () => { cancelled = true; };
  }, [search, category, location]);
  return (
    <div className="min-h-screen bg-[rgba(0,41,51,0.03)]">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold" style={{ color: COLORS.darkTeal }}>
            Available Services
          </h1>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
          <h2 className="text-lg font-medium mb-4" style={{ color: COLORS.darkTeal }}>
            Find Services
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2" style={{ color: COLORS.darkTeal }}>
                Search
              </label>
              <input
                type="text"
                placeholder="Search by title or description…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="sm:w-48">
              <label className="block text-sm font-medium mb-2" style={{ color: COLORS.darkTeal }}>
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:w-48">
              <label className="block text-sm font-medium mb-2" style={{ color: COLORS.darkTeal }}>
                Location
              </label>
              <input
                type="text"
                placeholder="Any location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
          </div>
        )}

        {/* Error */}
        {error && !isLoading && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
            <p>{error}</p>
            <button
              className="mt-2 text-red-600 underline"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        )}

        {/* No Results */}
        {!isLoading && !error && (services?.length ?? 0) === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-medium mb-2" style={{ color: COLORS.darkTeal }}>
              No Services Found
            </h3>
            <button
              className="px-4 py-2 rounded-full text-sm font-medium"
              style={{ backgroundColor: COLORS.brightBlue, color: "white" }}
              onClick={() => {
                setSearch(""); setCategory(""); setLocation("");
              }}
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Service Cards */}
        {!isLoading && !error && (services?.length ?? 0) > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc) => (
              <ServiceCard key={svc.id} service={svc} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
