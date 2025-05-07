// src/pages/NewServicePage.jsx
import React, { useState, useEffect } from 'react';
import { createServiceListing } from '../utilities/serviceListingService';
import { getAllCategories }      from '../utilities/categoryService';
import { useNavigate }           from 'react-router-dom';
import { Plus, ChevronLeft, X, Camera } from 'lucide-react';   
import SideBar from '../components/SideBar';
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
export default function NewServicePage() {
    const nav = useNavigate();
    const [categories, setCategories] = useState([]);
    const [imagePreview, setImagePreview] = useState(null);  

    const [form, setForm] = useState({
      title: '',
      description: '',
      price_description: '',
      location_description: '',
      category: '',
      is_active: true,
      image: null,               

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
        const data = new FormData();
        Object.entries(form).forEach(([k, v]) => {
          if (v != null) data.append(k, v);
        });
        await createServiceListing(data);
        nav('/my-listings');
      } catch (err) {
        console.error(err);
        setError(err.message || 'Failed to create service');
      }
    };
        // ← new handler
  const handleImageChange = e => {
    const file = e.target.files[0];
    if (!file) return;
    setForm(f => ({ ...f, image: file }));
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

      
      return (
     
          
        <div className="min-h-screen py-8 px-4 md:px-8" style={styles.page}>
          {/* Back button - from original UI */}
          <div className="max-w-6xl mx-auto mb-6">
            <button 
              className="flex items-center text-sm font-medium" 
              style={{color: COLORS.darkTeal}}
              onClick={() => nav('/my-listings')}
            >
              <ChevronLeft size={16} stroke={COLORS.brightBlue} />
              <span>Back to My Listings</span>
            </button>
          </div>
        
          {/* Main container */}
          <div className="max-w-6xl mx-auto">
        
            {/* Page header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold" style={{color: COLORS.darkTeal}}>
                Create New Service
              </h1>
              <p className="text-gray-600 mt-2">
                Create a new service to offer to the community
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
            <SideBar></SideBar>
            {/* Form container */}
            <div className="flex-1 rounded-2xl overflow-hidden shadow-xl backdrop-blur-sm" style={styles.container}>            
              <div className="p-6" style={styles.header}>
                <h2 className="font-semibold text-xl" style={{color: COLORS.darkTeal}}>
                  <Plus size={20} className="inline-block mr-2" stroke={COLORS.brightBlue} />
                  New Service Details
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Fill out the form below to create your new service listing
                </p>
              </div>
              
              {/* Form content */}
              <div className="p-6">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    {/* Title */}
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{color: COLORS.darkTeal}}>
                        Service Title *
                      </label>
                      <input 
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2"
                        style={styles.input}
                        placeholder="E.g., Professional Cooking Service"
                        required
                      />
                    </div>
                    
                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{color: COLORS.darkTeal}}>
                        Service Description *
                      </label>
                      <textarea 
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows="4"
                        className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2"
                        style={{...styles.input, minHeight: "120px"}}
                        placeholder="Describe your service in detail, including what you offer, your experience, and any other relevant information..."
                        required
                      />
                    </div>
                    
                    {/* Two-column layout for price and location */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Price */}
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{color: COLORS.darkTeal}}>
                          Price Description *
                        </label>
                        <input 
                          type="text"
                          name="price_description"
                          value={form.price_description}
                          onChange={handleChange}
                          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2"
                          style={styles.input}
                          placeholder="E.g., $25 per hour, $50 per session"
                          required
                        />
                      </div>
                      
                      {/* Location */}
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{color: COLORS.darkTeal}}>
                          Location Description *
                        </label>
                        <input 
                          type="text"
                          name="location_description"
                          value={form.location_description}
                          onChange={handleChange}
                          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2"
                          style={styles.input}
                          placeholder="E.g., Remote, Your home, Within 10 miles"
                          required
                        />
                      </div>
                    </div>
                    
                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{color: COLORS.darkTeal}}>
                        Category *
                      </label>
                      <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2"
                        style={styles.input}
                        required
                      >
                        <option value="">Select a category</option>
                        {categories.length === 0 ? (
                          <option disabled>Loading categories...</option>
                        ) : (
                          categories.map(cat => (
                            <option key={cat.id} value={cat.id}>
                              {cat.name}
                            </option>
                          ))
                        )}
                      </select>
                    </div>
                      {/* Image upload */}
              <div>
                <label className="block text-sm font-medium mb-2"
                       style={{color: COLORS.darkTeal}}>
                  Service Image
                </label>
                <div className="mb-2">
                  {imagePreview ? (
                    <div className="relative w-full h-48 rounded-xl overflow-hidden">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        className="absolute top-2 right-2 p-1 rounded-full bg-red-500 text-white"
                        onClick={() => {
                          setImagePreview(null);
                          setForm(f => ({ ...f, image: null }));
                        }}
                      >
                        <X size={16}/>
                      </button>
                    </div>
                  ) : (
                    <div
                      className="w-full h-48 border-2 border-dashed rounded-xl flex flex-col items-center justify-center"
                      style={{borderColor: "rgba(39, 150, 154, 0.3)"}}
                    >
                      <Camera size={32} stroke={COLORS.teal}/>
                      <p className="mt-2 text-sm text-gray-500">
                        Click to upload an image
                      </p>
                    </div>
                  )}
                </div>

                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <label
                  htmlFor="image-upload"
                  className="inline-block px-4 py-2 rounded-full text-sm font-medium cursor-pointer"
                  style={styles.button.secondary}
                >
                  {imagePreview ? "Change Image" : "Upload Image"}
                </label>
              </div>

              {error && (
                <div className="p-4 rounded-lg mt-4" style={{backgroundColor: `rgba(${COLORS.orange}, 0.1)`}}>
                  <p className="text-sm" style={{color: COLORS.orange}}>{error}</p>
                </div>
              )}
                    {/* Active status toggle */}
                    <div className="flex items-center gap-3 mt-4">
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
                          style={{backgroundColor: form.is_active ? COLORS.mint : "rgba(0, 41, 51, 0.2)"}}
                        >
                          <span 
                            className="absolute top-1 left-1 block w-4 h-4 rounded-full transition-transform duration-200 ease-in-out bg-white"
                            style={{transform: form.is_active ? 'translateX(24px)' : 'translateX(0)'}}
                          ></span>
                        </label>
                      </div>
                      <label htmlFor="activeToggle" className="text-sm font-medium" style={{color: COLORS.darkTeal}}>
                        List as Active Service
                      </label>
                    </div>
                    
                    {/* Error display */}
                    {error && (
                      <div className="p-4 rounded-lg mt-4" style={{backgroundColor: `rgba(${COLORS.orange}, 0.1)`}}>
                        <p className="text-sm" style={{color: COLORS.orange}}>{error}</p>
                      </div>
                    )}
                    
                    {/* Submit button */}
                    <div className="mt-8 text-right">
                      <button 
                        type="submit"
                        className="px-8 py-3 rounded-full text-sm font-medium transition-all shadow-md hover:shadow-lg"
                        style={styles.button.primary}
                      >
                        <Plus size={16} className="inline-block mr-2" />
                        Create Service Listing
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
         </div>
      );
    }