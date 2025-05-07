// src/pages/MyRequestsPage.jsx

import React, { useState, useEffect } from 'react';
import { getServiceRequests } from '../utilities/serviceRequestService';
import sendRequest from '../utilities/sendRequest';
import { MessageSquare, User, Calendar, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SideBar from '../components/SideBar';
import ReviewPage from './ReviewPage';

// Color constants
const COLORS = {
  darkTeal: "#002933",
  brightBlue: "#0AC6F2",
  mint: "#25DEC5",
  teal: "#27969A",
  gold: "#F7C03E",
  orange: "#F76C35"
};

// Shared styles
const styles = {
  page:      { backgroundColor: "rgba(0, 41, 51, 0.03)" },
  container: {
    background: "rgba(255,255,255,0.8)",
    border:     "1px solid rgba(39,150,154,0.2)"
  },
  header: {
    background:   "rgba(0,41,51,0.08)",
    borderBottom: "1px solid rgba(39,150,154,0.2)"
  },
  card: {
    background:  "rgba(255,255,255,0.7)",
    borderColor: "rgba(39,150,154,0.1)"
  },
  requestCard: {
    pending:   { borderLeft: `4px solid ${COLORS.gold}` },
    accepted:  { borderLeft: `4px solid ${COLORS.mint}` },
    rejected:  { borderLeft: `4px solid ${COLORS.orange}` },
    completed: { borderLeft: `4px solid ${COLORS.brightBlue}` }
  }
};

export default function MyRequestsPage() {
  const [reqs,        setReqs]        = useState([]);
  const [reviewsMap,  setReviewsMap]  = useState({});   // { [service_request]: review }
  const [reviewingId, setReviewingId] = useState(null);
  const nav = useNavigate();

  // 1️⃣ load your requests
  useEffect(() => {
    getServiceRequests({ client: 'current' })
      .then(data => {
        const arr = Array.isArray(data) ? data : data.results || [];
        setReqs(arr);
      });
  }, []);

  // 2️⃣ once you have requests, fetch all reviews at once
  useEffect(() => {
    if (!reqs.length) return;

    (async () => {
      const data = await sendRequest('/reviews/', 'GET');
      const list = Array.isArray(data) ? data : data.results || [];
      // build map: review.service_request → review object
      const m = list.reduce((acc, r) => {
        acc[r.service_request] = r;
        return acc;
      }, {});
      setReviewsMap(m);
    })();
  }, [reqs]);

  // 3️⃣ inline review panel mode
  if (reviewingId !== null) {
    const existing = reviewsMap[reviewingId];
    return (
      <div className="min-h-screen py-8 px-4 md:px-8" style={styles.page}>
        <div className="max-w-6xl mx-auto mb-6">
          <button
            className="flex items-center text-sm font-medium"
            style={{ color: COLORS.darkTeal }}
            onClick={() => setReviewingId(null)}
          >
            <ChevronLeft size={16} stroke={COLORS.brightBlue} />
            <span>Back to My Requests</span>
          </button>
        </div>

        <div
          className="max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-xl backdrop-blur-sm"
          style={styles.container}
        >
          <ReviewPage
            id={reviewingId}
            existingReview={existing}
            onSuccess={newReview => {
              // put the newly created review into the map
              setReviewsMap(m => ({ ...m, [reviewingId]: newReview }));
              setReviewingId(null);
            }}
          />
        </div>
      </div>
    );
  }

  // 4️⃣ normal list mode
  return (
    <div className="min-h-screen py-8 px-4 md:px-8" style={styles.page}>
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

        <div
          className="flex-1 rounded-2xl overflow-hidden shadow-xl backdrop-blur-sm"
          style={styles.container}
        >
          <div className="p-6" style={styles.header}>
            <h2 className="font-semibold text-xl" style={{ color: COLORS.darkTeal }}>
              <MessageSquare
                size={20}
                className="inline-block mr-2"
                stroke={COLORS.brightBlue}
              />
              My Requests
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              View all service requests you’ve made
            </p>
          </div>

          <div className="p-6 space-y-4">
            {reqs.length > 0 ? (
              reqs.map(req => {
                const hasReview = Boolean(reviewsMap[req.id]);
                return (
                  <div
                    key={req.id}
                    className="p-4 rounded-xl shadow-sm"
                    style={{ ...styles.card, ...styles.requestCard[req.status] }}
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <p className="text-sm font-medium" style={{ color: COLORS.darkTeal }}>
                          Service: <span className="font-semibold">{req.service_title}</span>
                        </p>
                        <div className="flex items-center mt-1">
                          <User size={14} stroke={COLORS.brightBlue} className="mr-1" />
                          <span className="text-sm">
                            {typeof req.client === 'object' ? req.client.username : req.client}
                          </span>
                          <span className="mx-2 text-gray-300">•</span>
                          <Calendar size={14} stroke={COLORS.gold} className="mr-1" />
                          <span className="text-xs text-gray-500">
                            {new Date(req.created_at).toLocaleDateString('en-US')}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className="text-xs font-medium px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: {
                              pending:  COLORS.gold,
                              accepted: COLORS.mint,
                              rejected: COLORS.orange,
                              completed: COLORS.brightBlue
                            }[req.status],
                            color: COLORS.darkTeal
                          }}
                        >
                          {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                        </span>

                        {req.status === 'completed' && (
                          <button
                            onClick={() => setReviewingId(req.id)}
                            className="text-blue-500 text-xs underline cursor-pointer bg-transparent p-0"
                          >
                            {hasReview ? 'View Your Review' : 'Leave a Review'}
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">{req.message}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-xl">
                <MessageSquare size={48} stroke={COLORS.teal} className="mx-auto mb-3" />
                <h3 className="text-xl font-medium mb-2" style={{ color: COLORS.darkTeal }}>
                  No Requests
                </h3>
                <p className="text-gray-600">
                  You haven't made any service requests yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
