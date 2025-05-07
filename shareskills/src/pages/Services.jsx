// src/pages/Services.jsx
import React, { useState, useEffect } from 'react';
import ServiceCard from '../components/ServiceCard';
import { getAllCategories } from '../utilities/categoryService';
import { getAllServiceListings } from '../utilities/serviceListingService';

const COLORS = {
  darkTeal: "#002933",
  brightBlue: "#0AC6F2",
  mint: "#25DEC5",
  teal: "#27969A",
  gold: "#F7C03E",
  orange: "#F76C35",
  magenta: "#A81E70"
};

export default function Services() {
  const [services, setServices]   = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch]       = useState('');
  const [category, setCategory]   = useState('');
  const [location, setLocation]   = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]         = useState(null);

  // Load categories once
  useEffect(() => {
    getAllCategories()
      .then(data => {
        setCategories(Array.isArray(data) ? data : data.results || []);
      })
      .catch(err => console.error('Categories load error:', err));
  }, []);

  // Load services on filter change
  useEffect(() => {
    let canceled = false;
    setIsLoading(true);
    setError(null);

    getAllServiceListings({ search, category, location })
      .then(data => {
        if (!canceled) {
          const list = Array.isArray(data)
            ? data
            : Array.isArray(data.results)
            ? data.results
            : [];
          setServices(list);
        }
      })
      .catch(() => {
        if (!canceled) setError('Could not load services');
      })
      .finally(() => {
        if (!canceled) setIsLoading(false);
      });

    return () => { canceled = true; };
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
            <input
              type="text"
              placeholder="Search by title or description…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-1 border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="sm:w-48 border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Any location"
              value={location}
              onChange={e => setLocation(e.target.value)}
              className="sm:w-48 border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center py-12">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
          </div>
        )}

        {/* Error */}
        {error && !isLoading && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
            <p>{error}</p>
            <button className="mt-2 text-red-600 underline" onClick={() => window.location.reload()}>
              Try Again
            </button>
          </div>
        )}

        {/* No results */}
        {!isLoading && !error && services.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-medium mb-2" style={{ color: COLORS.darkTeal }}>
              No Services Found
            </h3>
            <button
              className="px-4 py-2 rounded-full text-sm font-medium"
              style={{ backgroundColor: COLORS.brightBlue, color: 'white' }}
              onClick={() => { setSearch(''); setCategory(''); setLocation(''); }}
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Service cards */}
        {!isLoading && !error && services.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(svc => (
              <ServiceCard key={svc.id} service={svc} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
