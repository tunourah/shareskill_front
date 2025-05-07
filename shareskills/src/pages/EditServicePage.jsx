// src/pages/EditServicePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getServiceListing, updateServiceListing } from '../utilities/serviceListingService';
import { getAllCategories } from '../utilities/categoryService';
import { Plus, ChevronLeft, X, Camera } from 'lucide-react';
import SideBar from '../components/SideBar';

// Color constants
const COLORS = {
  darkTeal: "#002933",
  brightBlue: "#0AC6F2",
  mint: "#25DEC5",
  teal: "#27969A",
  gold: "#F7C03E",
  orange: "#F76C35",
  magenta: "#A81E70"
};

// Style objects
const styles = {
  page: { backgroundColor: "rgba(0, 41, 51, 0.03)" },
  container: {
    background: "rgba(255, 255, 255, 0.8)",
    borderColor: "rgba(39, 150, 154, 0.2)"
  },
  header: {
    background: "rgba(0, 41, 51, 0.08)",
    borderBottom: "1px solid rgba(39, 150, 154, 0.2)"
  },
  button: {
    primary: { backgroundColor: COLORS.brightBlue, color: "white" },
    secondary: { backgroundColor: COLORS.darkTeal, color: "white" }
  },
  input: {
    borderColor: "rgba(39, 150, 154, 0.3)",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    color: COLORS.darkTeal
  }
};

export default function EditServicePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');

  // Load service and categories
  useEffect(() => {
    Promise.all([getServiceListing(id), getAllCategories()])
      .then(([svc, cats]) => {
        setForm({
          title: svc.title,
          description: svc.description,
          price_description: svc.price_description,
          location_description: svc.location_description,
          category: svc.category,
          is_active: svc.is_active,
          image: null  // no new file by default
        });
        // existing image URL for preview
        setImagePreview(svc.image_url || null);
        setCategories(Array.isArray(cats) ? cats : cats.results || []);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load data');
      });
  }, [id]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (!file) return;
    setForm(f => ({ ...f, image: file }));
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const data = new FormData();
      // append all form fields
      Object.entries(form).forEach(([key, val]) => {
        if (val != null) data.append(key, val);
      });
      // append image if user selected one
      if (form.image) {
        data.append('image', form.image);
      }
      await updateServiceListing(id, data);
      navigate('/my-listings');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to update service');
    }
  };

  if (!form) return <p>Loading…</p>;

  return (
    <div className="min-h-screen py-8 px-4 md:px-8" style={styles.page}>
      <div className="max-w-6xl mx-auto mb-6">
        <button
          className="flex items-center text-sm font-medium"
          style={{ color: COLORS.darkTeal }}
          onClick={() => navigate('/my-listings')}
        >
          <ChevronLeft size={16} stroke={COLORS.brightBlue} />
          <span>Back to My Listings</span>
        </button>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
        <SideBar />

        <div className="flex-1 rounded-2xl overflow-hidden shadow-xl backdrop-blur-sm" style={styles.container}>
          <div className="p-6" style={styles.header}>
            <h2 className="text-2xl font-semibold" style={{ color: COLORS.darkTeal }}>
              Edit Service
            </h2>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Service Title */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.darkTeal }}>
                  Service Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2"
                  style={styles.input}
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.darkTeal }}>
                  Service Description *
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2"
                  style={{ ...styles.input, minHeight: '120px' }}
                  required
                />
              </div>

              {/* Price & Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.darkTeal }}>
                    Price Description *
                  </label>
                  <input
                    type="text"
                    name="price_description"
                    value={form.price_description}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2"
                    style={styles.input}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.darkTeal }}>
                    Location Description *
                  </label>
                  <input
                    type="text"
                    name="location_description"
                    value={form.location_description}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2"
                    style={styles.input}
                    required
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.darkTeal }}>
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
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Active Toggle */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="activeToggle"
                  name="is_active"
                  checked={form.is_active}
                  onChange={handleChange}
                  className="sr-only"
                />
                <label
                  htmlFor="activeToggle"
                  className="relative block w-12 h-6 rounded-full cursor-pointer transition-colors duration-200"
                  style={{ backgroundColor: form.is_active ? COLORS.mint : 'rgba(0,41,51,0.2)' }}
                >
                  <span
                    className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-200"
                    style={{ transform: form.is_active ? 'translateX(24px)' : 'translateX(0)' }}
                  />
                </label>
                <span className="text-sm font-medium" style={{ color: COLORS.darkTeal }}>
                  Active Service
                </span>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.darkTeal }}>
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
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div
                      className="w-full h-48 border-2 border-dashed rounded-xl flex flex-col items-center justify-center"
                      style={{ borderColor: "rgba(39, 150, 154, 0.3)" }}
                    >
                      <Camera size={32} stroke={COLORS.teal} />
                      <p className="mt-2 text-sm text-gray-500">Click to upload an image</p>
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

              {/* Error */}
              {error && <p className="text-red-500">{error}</p>}

              {/* Submit */}
              <div className="mt-8 text-right">
                <button
                  type="submit"
                  className="px-8 py-3 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all"
                  style={styles.button.primary}
                >
                  <Plus size={16} className="inline-block mr-2" /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
