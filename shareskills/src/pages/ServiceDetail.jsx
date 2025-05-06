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

export default function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

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
        setReviews(Array.isArray(revResp) ? revResp : revResp.results ?? []);
      } catch (err) {
        setError(err.message || 'Failed to load details');
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

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
                  <span className="ml-1 text-gray-500">
                    ({service.review_count} reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b mb-6" style={{ borderColor: 'rgba(39, 150, 154, 0.2)' }}>
            <div className="flex space-x-8">
              {['details', 'reviews'].map((tab) => (
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
          <div>
            {activeTab === 'details' && (
              <div className="space-y-8">
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
                      { icon: MapPin, label: 'Location', value: service.location_description },
                      { icon: Calendar, label: 'Listed Since', value: new Date(service.created_at).toLocaleDateString() }
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
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                {reviews.length > 0 ? (
                  <div className="space-y-4">
                    {reviews.map((rev) => (
                      <div key={rev.id} className="p-4 rounded-2xl shadow-sm" style={styles.reviewCard}>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className="font-medium" style={{ color: COLORS.darkTeal }}>
                              {rev.user?.username || rev.reviewer?.username}
                            </span>
                            <span className="ml-4 text-xs text-gray-500">
                              {new Date(rev.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={14} fill={i < rev.rating ? COLORS.gold : 'transparent'} stroke={COLORS.gold} />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700">{rev.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    <p>No reviews yet.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
