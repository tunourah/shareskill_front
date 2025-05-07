import React, { useState, useEffect } from 'react';
import { getServiceRequests } from '../utilities/serviceRequestService';
import { FileText, User, Calendar, Star, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SideBar from '../components/SideBar';

// Color constants
const COLORS = {
  darkTeal: "#002933",
  brightBlue: "#0AC6F2",
  mint: "#25DEC5",
  teal: "#27969A",
  gold: "#F7C03E",
  orange: "#F76C35"
};

// Styles
const styles = {
  page: { backgroundColor: "rgba(0, 41, 51, 0.03)" },
  container: { background: "rgba(255,255,255,0.8)", borderColor: "rgba(39,150,154,0.2)" },
  header: { background: "rgba(0,41,51,0.08)", borderBottom: "1px solid rgba(39,150,154,0.2)" },
  card: { background: "rgba(255,255,255,0.7)", borderColor: "rgba(39,150,154,0.1)" },
  requestCard: {
    completed: { borderLeft: `4px solid ${COLORS.brightBlue}` },
    rejected: { borderLeft: `4px solid ${COLORS.orange}` }
  }
};

export default function ServiceHistoryPage() {
  const [history, setHistory] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    getServiceRequests({ provider: 'current' })
      .then(data => {
        const arr = Array.isArray(data) ? data : data.results || [];
        setHistory(arr.filter(r => !['pending','accepted'].includes(r.status)));
      });
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

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
        <SideBar />
        <div className="flex-1 rounded-2xl overflow-hidden shadow-xl backdrop-blur-sm" style={styles.container}>

          {/* Header */}
          <div className="p-6" style={styles.header}>
            <h2 className="font-semibold text-xl" style={{ color: COLORS.darkTeal }}>
              <FileText size={20} className="inline-block mr-2" stroke={COLORS.brightBlue} />
              Service History
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              View your completed and rejected service requests
            </p>
          </div>

          <div className="p-6 space-y-4">
            {history.length > 0 ? (
              history.map(request => (
                <div
                  key={request.id}
                  className="p-4 rounded-xl shadow-sm"
                  style={{
                    ...styles.card,
                    ...styles.requestCard[request.status]
                  }}
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="text-sm font-medium" style={{ color: COLORS.darkTeal }}>
                            Service: <span className="font-semibold">{request.service_title}</span>
                          </span>
                          <div className="flex items-center mt-1">
                            <User size={14} stroke={COLORS.brightBlue} className="mr-1" />
                            <span className="text-sm">{typeof request.client === 'object' ? request.client.username : request.client}</span>
                            <span className="mx-2 text-gray-300">•</span>
                            <Calendar size={14} stroke={COLORS.gold} className="mr-1" />
                            <span className="text-xs text-gray-500">
                              {new Date(request.created_at).toLocaleDateString('en-US')}
                            </span>
                          </div>
                        </div>
                        <span
                          className="text-xs font-medium px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: request.status === 'completed' ? COLORS.brightBlue : COLORS.orange, color: 'white' }}
                        >
                          {request.status === 'completed' ? 'Completed' : 'Rejected'}
                        </span>
                      </div>

                      <div className="p-3 bg-gray-50 rounded-lg mb-3">
                        <p className="text-sm text-gray-700">{request.message}</p>
                      </div>

                      {/* Review section */}
                      {request.status === 'completed' && request.review && (
                        <div className="mt-3 p-3 rounded-lg" style={{ backgroundColor: 'rgba(247,192,62,0.1)' }}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-medium" style={{ color: COLORS.darkTeal }}>
                              Client Review
                            </span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={12}
                                  fill={i < request.review.rating ? COLORS.gold : 'transparent'}
                                  stroke={COLORS.gold}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-xs text-gray-700">{request.review.comment}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-xl">
                <FileText size={48} stroke={COLORS.teal} className="mx-auto mb-3" />
                <h3 className="text-xl font-medium mb-2" style={{ color: COLORS.darkTeal }}>
                  No Service History
                </h3>
                <p className="text-gray-600">
                  You don't have any completed or rejected service requests yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
