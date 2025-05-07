import React, { useState, useEffect } from 'react';
import { useParams, useNavigate }        from 'react-router-dom';
import { getServiceListing, updateServiceListing } from '../utilities/serviceListingService';
import { getAllCategories }              from '../utilities/categoryService';
import { Plus, ChevronLeft }             from 'lucide-react';
import SideBar                            from '../components/SideBar';

export default function EditServicePage() {
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
  const { id } = useParams();
  const nav    = useNavigate();

  const [categories, setCategories] = useState([]);
  const [form, setForm]             = useState(null);
  const [error, setError]           = useState('');

  useEffect(() => {
    // load both service & categories in parallel
    Promise.all([
      getServiceListing(id),
      getAllCategories()
    ])
    .then(([svc, cats]) => {
      setForm({
        title: svc.title,
        description: svc.description,
        price_description: svc.price_description,
        location_description: svc.location_description,
        category: svc.category,
        is_active: svc.is_active
      });
      setCategories(Array.isArray(cats) ? cats : cats.results || []);
    })
    .catch(console.error);
  }, [id]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await updateServiceListing(id, form);
      nav('/my-listings');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to update');
    }
  };

  if (!form) return <p>Loading…</p>;

  return (
    <div className="min-h-screen py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto mb-6">
        <button 
          className="flex items-center text-sm font-medium text-gray-800"
          onClick={() => nav('/my-listings')}
        >
          <ChevronLeft size={16} /> Back to My Listings
        </button>
      </div>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
        <SideBar />
        <div className="flex-1 rounded-2xl overflow-hidden shadow-xl backdrop-blur-sm p-6 bg-white/80 border">
          <h2 className="text-2xl font-semibold mb-4">Edit Service</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* reuse your inputs exactly like NewServicePage */}
            {/* Title, Description, Price, Location, Category, Active toggle… */}
            {/* for brevity, copy-paste the same JSX but wired to `form` & `handleChange` */}
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
                                
                               
                              </div>
                            </form>
                          </div>
           {/* Submit button */}
           <div className="mt-8 text-right">
                                  <button 
                                    type="submit"
                                    className="px-8 py-3 rounded-full text-sm font-medium transition-all shadow-md hover:shadow-lg"
                                    style={styles.button.primary}
                                  >
                                    <Plus size={16} className="inline-block mr-2" />
                                    Edit Service Listing
                                  </button>
                                </div>
            {error && <p className="text-red-500">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
