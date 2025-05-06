// src/pages/NewServicePage.jsx
import React, { useState, useEffect } from 'react';
import { createServiceListing } from '../utilities/serviceListingService';
import { getAllCategories }      from '../utilities/categoryService';
import { useNavigate }           from 'react-router-dom';

export default function NewServicePage() {
    const nav = useNavigate();
    const [categories, setCategories] = useState([]);
    const [form, setForm] = useState({
      title: '',
      description: '',
      price_description: '',
      location_description: '',
      category: '',
      is_active: true,
    });
    const [error, setError] = useState('');
  
    useEffect(() => {
      getAllCategories()
        .then(data => {
          if (Array.isArray(data)) {
            setCategories(data);
          } else if (Array.isArray(data.results)) {
            setCategories(data.results);
          } else {
            console.warn('Unexpected categories response:', data);
            setCategories([]);
          }
        })
        .catch(() => setCategories([]));
    }, []);
  
    const handleChange = e => {
      const { name, value, type, checked } = e.target;
      setForm(f => ({
        ...f,
        [name]: type === 'checkbox' ? checked : value,
      }));
    };
  
    const handleSubmit = async e => {
        e.preventDefault();
        setError('');
        try {
          // await the POST; it either succeeds or throws
          await createServiceListing(form);
          nav('/my-listings');
        } catch (err) {
          console.error(err);
          setError(err.message || 'Failed to create service');
        }
      };
      
  
      return (
        <div className="max-w-md mt-7 mx-auto p-6 rounded-xl shadow-md" style={{backgroundColor: "rgba(0, 41, 51, 0.03)"}}>
          <h2 className="text-2xl font-semibold mb-6" style={{color: "#002933"}}>
            Create New Service
            <div className="h-1 w-24 mt-2 rounded-full" style={{backgroundColor: "#0AC6F2"}}></div>
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-sm font-medium" style={{color: "#002933"}}>
                Title
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                style={{
                  borderColor: "rgba(39, 150, 154, 0.3)",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  color: "#002933"
                }}
              />
            </div>
      
            <div className="space-y-2">
              <label className="block text-sm font-medium" style={{color: "#002933"}}>
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                style={{
                  borderColor: "rgba(39, 150, 154, 0.3)",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  color: "#002933"
                }}
              />
            </div>
      
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium" style={{color: "#002933"}}>
                  Price
                </label>
                <input
                  name="price_description"
                  value={form.price_description}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                  style={{
                    borderColor: "rgba(39, 150, 154, 0.3)",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    color: "#002933"
                  }}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium" style={{color: "#002933"}}>
                  Location
                </label>
                <input
                  name="location_description"
                  value={form.location_description}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                  style={{
                    borderColor: "rgba(39, 150, 154, 0.3)",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    color: "#002933"
                  }}
                />
              </div>
            </div>
      
            <div className="space-y-2">
              <label className="block text-sm font-medium" style={{color: "#002933"}}>
                Category
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 appearance-none"
                style={{
                  borderColor: "rgba(39, 150, 154, 0.3)",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  color: "#002933"
                }}
              >
                <option value="">Select one…</option>
                {categories.length === 0 ? (
                  <option disabled>Loading categories…</option>
                ) : (
                  categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))
                )}
              </select>
            </div>
      
            <div className="flex items-center gap-3 py-2">
              <div className="relative inline-block">
                <input
                  type="checkbox"
                  name="is_active"
                  checked={form.is_active}
                  onChange={handleChange}
                  id="activeToggle"
                  className="sr-only"
                />
                <label 
                  htmlFor="activeToggle" 
                  className="relative block w-12 h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out"
                  style={{backgroundColor: form.is_active ? "#25DEC5" : "rgba(0, 41, 51, 0.2)"}}
                >
                  <span 
                    className="absolute top-1 left-1 block w-4 h-4 rounded-full transition-transform duration-200 ease-in-out bg-white"
                    style={{transform: form.is_active ? 'translateX(24px)' : 'translateX(0)'}}
                  ></span>
                </label>
              </div>
              <label htmlFor="activeToggle" className="text-sm font-medium" style={{color: "#002933"}}>
                Active
              </label>
            </div>
      
            {error && (
              <div className="p-3 rounded-lg" style={{backgroundColor: "rgba(247, 108, 53, 0.1)"}}>
                <p style={{color: "#F76C35"}}>{error}</p>
              </div>
            )}
      
            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-lg text-white font-medium shadow-sm transition-all duration-150 hover:shadow focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{
                backgroundColor: "#0AC6F2",
                borderColor: "#0AC6F2"
              }}
            >
              Create Service
            </button>
          </form>
        </div>
      );
}
