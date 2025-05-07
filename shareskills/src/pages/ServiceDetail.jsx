import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  Camera,
  User,
  Star,
  Calendar,
  DollarSign,
  MapPin
} from 'lucide-react';
import sendRequest from '../utilities/sendRequest';
import { createServiceRequest } from '../utilities/serviceRequestService';

// Define color constants  
const COLORS = {
  darkTeal: "#002933",
  brightBlue: "#0AC6F2",
  mint: "#25DEC5",
  teal: "#27969A",
  gold: "#F7C03E",
  orange: "#F76C35",
  magenta: "#A81E70"
};

// Define custom style objects
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
  iconBg: {
    primary: { backgroundColor: "rgba(10, 198, 242, 0.1)" },
    secondary: { backgroundColor: "rgba(37, 222, 197, 0.1)" },
    accent: { backgroundColor: "rgba(247, 192, 62, 0.1)" }
  }
};

export default function ServiceDetail({user}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [req, setReq] = useState({ message: '', proposed_datetime: '' });
  
  const [service, setService] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState('details');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const svc = await sendRequest(`/service-listings/${id}/`, 'GET');
        const revResp = await sendRequest(
          `/reviews/?service_listing=${id}`,
          'GET'
        );
        setService(svc);
        const arr     = Array.isArray(revResp) ? revResp : revResp.results || [];
        console.log('💬 REVIEWS:', arr);
        setReviews(arr);

    } catch (err) {
        setError(err.message || 'Failed to load details');
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);
  const handleRequestSubmit = async e => {
    e.preventDefault();
    await createServiceRequest({
      service_listing: id,
      message: req.message,
      proposed_datetime: req.proposed_datetime || null
    });
    setShowRequestForm(false);
    // optionally toast or navigate to "My Requests"
  };
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center" style={styles.page}>
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-8" style={styles.page}>
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold text-red-600">Error</h2>
          <p className="mt-2 text-gray-700">{error}</p>
          <button
            className="mt-4 px-4 py-2 rounded-full text-sm font-medium"
            style={{ backgroundColor: COLORS.brightBlue, color: 'white' }}
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  if (!service) return null;

  return (
    <div className="min-h-screen py-8 px-4 md:px-8" style={styles.page}>
      {/* Back */}
      <div className="max-w-4xl mx-auto mb-6">
        <button
          className="flex items-center text-sm font-medium"
          style={{ color: COLORS.darkTeal }}
          onClick={() => navigate(-1)}
        >
          <ChevronLeft size={16} stroke={COLORS.brightBlue} />
          <span>Back to Services</span>
        </button>
      </div>

      {/* Container */}
      <div
        className="max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-xl backdrop-blur-sm"
        style={styles.container}
      >
        {/* Hero */}
        <div className="relative h-64 md:h-80 bg-gray-100 flex items-center justify-center">
          {service.image_url ? (
            <img
              src={service.image_url}
              alt={service.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center text-gray-400">
              <Camera size={48} stroke={COLORS.teal} />
              <p className="mt-2">No image available</p>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Header */}
          
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2" style={{ color: COLORS.darkTeal }}>
                {service.title}
              </h1>
              <div className="flex items-center gap-2 text-sm">
                <User size={16} stroke={COLORS.brightBlue} />
                <span style={{ color: COLORS.darkTeal }}>
                  {service.provider?.username || 'Unknown'}
                </span>
                <div className="flex items-center ml-4">
                  <Star size={16} fill={COLORS.gold} stroke="none" />
                  <span className="ml-1 font-medium">{service.avg_rating}</span>
                  <span className="ml-1 text-gray-500">({service.review_count} reviews)</span>
                </div>
              </div>
            
            </div>
                   {/* Request button & form -  */}
                   {service.provider?.id !== user?.id && (
                <div className="mt-8 text-center">
                  <button
                    className="px-8 py-3 bg-mint font-medium border-2 border-cyan-700 rounded-full hover:bg-teal-100 transition-colors duration-300 shadow-sm"
                    style={{ color: COLORS.darkTeal }}
                    onClick={() => setShowRequestForm(true)}
                  >
                    Request This Service
                  </button>
                </div>
              )}
          </div>

          {/* Tabs */}
          <div className="border-b mb-6" style={{ borderColor: 'rgba(39,150,154,0.2)' }}>
            <div className="flex space-x-8">
              {['details', 'reviews'].map(tab => (
                <button
                  key={tab}
                  className={`pb-2 font-medium text-sm ${activeTab === tab ? 'border-b-2' : ''}`}
                  style={{
                    color: activeTab === tab ? COLORS.brightBlue : COLORS.darkTeal,
                    borderColor: COLORS.brightBlue
                  }}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {tab === 'reviews' && ` (${reviews.length})`}
                </button>
              ))}
            </div>
          </div>

          {/* Tab panels */}
          {activeTab === 'details' && (
            <div className="space-y-8">
              {/* Description & Info */}
              <div>
                <h2 className="text-lg font-medium mb-2" style={{ color: COLORS.darkTeal }}>
                  Description
                </h2>
                <p className="text-gray-700 leading-relaxed">{service.description}</p>
              </div>
              <div>
                <h2 className="text-lg font-medium mb-2" style={{ color: COLORS.darkTeal }}>
                  Service Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { icon: DollarSign, label: 'Price', value: service.price_description },
                    { icon: MapPin,    label: 'Location', value: service.location_description },
                    { icon: Calendar,  label: 'Listed Since', value: new Date(service.created_at).toLocaleDateString() }
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start space-x-3">
                      <div className="p-2 rounded-full" style={styles.iconBg.primary}>
                        <Icon size={18} stroke={COLORS.brightBlue} />
                      </div>
                      <div>
                        <p className="text-sm font-medium" style={{ color: COLORS.darkTeal }}>{label}</p>
                        <p className="text-gray-700">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

         
              {showRequestForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                  <div className="w-full max-w-md animate-fadeIn">
                    <form
                      className="p-6 bg-white rounded-2xl shadow-xl border border-gray-100"
                      onSubmit={handleRequestSubmit}
                      style={{ borderColor: 'rgba(39, 150, 154, 0.1)' }}
                    >
                      <h3 className="text-xl font-semibold mb-4" style={{ color: COLORS.darkTeal }}>Request Service</h3>
                      
                      <div className="space-y-5">
                        <div>
                          <label htmlFor="message" className="block text-sm font-medium mb-1" style={{ color: COLORS.darkTeal }}>
                            Your Message
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            placeholder="Describe what you're looking for..."
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-brightBlue transition-all"
                            style={{ minHeight: "120px", borderColor: 'rgba(39, 150, 154, 0.3)' }}
                            value={req.message}
                            onChange={e => setReq({ ...req, message: e.target.value })}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="datetime" className="block text-sm font-medium mb-1" style={{ color: COLORS.darkTeal }}>
                            Proposed Date & Time
                          </label>
                          <input
                            id="datetime"
                            type="datetime-local"
                            name="proposed_datetime"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-brightBlue transition-all"
                            style={{ borderColor: 'rgba(39, 150, 154, 0.3)' }}
                            value={req.proposed_datetime}
                            onChange={e => setReq({ ...req, proposed_datetime: e.target.value })}
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-3 mt-6">
                        <button
                          type="button"
                          onClick={() => setShowRequestForm(false)}
                          className="px-5 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-300"
                          style={{ backgroundColor: '#E2E8F0', color: COLORS.darkTeal }}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 font-medium"
                          style={{ backgroundColor: COLORS.brightBlue }}
                        >
                          Send Request
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {reviews.length > 0 ? (
                reviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-2xl shadow-sm">
                    {/* Reviewer & rating */}
                    <div className="flex justify-between items-start mb-2">
                      <strong className="text-gray-800">{rev.reviewer}</strong>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            fill={i < rev.rating ? COLORS.gold : 'transparent'}
                            stroke={COLORS.gold}
                          />
                        ))}
                      </div>
                    </div>

                    {/* **This** is the review message */}
                    <p className="text-gray-700">{rev.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">No reviews yet.</p>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}