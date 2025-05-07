import React, { useState, useEffect } from 'react';
import { updateServiceRequest, getServiceRequests } from '../utilities/serviceRequestService';
import { MessageSquare, User, Calendar, Check, X, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SideBar from '../components/SideBar';

// Define color constants from original UI
const COLORS = {
  darkTeal: "#002933",   // base, text, backgrounds
  brightBlue: "#0AC6F2", // primary accent
  mint: "#25DEC5",       // secondary accent
  teal: "#27969A",       // tertiary accent
  gold: "#F7C03E",       // status accent
  orange: "#F76C35",     // danger accent
  magenta: "#A81E70"
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
    },
    accent: {
      backgroundColor: COLORS.mint,
      color: COLORS.darkTeal
    },
    danger: {
      backgroundColor: COLORS.orange,
      color: "white"
    }
  },
  card: {
    background: "rgba(255, 255, 255, 0.7)",
    borderColor: "rgba(39, 150, 154, 0.1)"
  },
  requestCard: {
    pending:    { borderLeft: `4px solid ${COLORS.gold}` },
    accepted:   { borderLeft: `4px solid ${COLORS.mint}` },
    rejected:   { borderLeft: `4px solid ${COLORS.orange}` },
    completed:  { borderLeft: `4px solid ${COLORS.brightBlue}` }
  }
};

export default function PendingRequestsPage() {
  const [list, setList] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    getServiceRequests({ provider: 'current', status: 'pending' })
      .then(data => setList(Array.isArray(data) ? data : data.results));
  }, []);

  const handle = async (id, newStatus) => {
    await updateServiceRequest(id, { status: newStatus });
    setList(l => l.filter(r => r.id !== id));
  };

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

          {/* Pending Requests header */}
          <div className="p-6" style={styles.header}>
            <h2 className="font-semibold text-xl" style={{ color: COLORS.darkTeal }}>
              <MessageSquare size={20} className="inline-block mr-2" stroke={COLORS.brightBlue} />
              Pending Service Requests
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Respond to incoming service requests from clients
            </p>
          </div>

          {/* List of requests */}
          <div className="p-6 space-y-4">
            {list.length > 0 ? (
              list.map(request => (
                <div
                  key={request.id}
                  className="p-4 rounded-xl shadow-sm"
                  style={{ ...styles.card, ...styles.requestCard[request.status] }}
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="text-sm font-medium" style={{ color: COLORS.darkTeal }}>
                            Request for: <span className="font-semibold">{request.service_title}</span>
                          </span>
                          <div className="flex items-center mt-1">
                            <User size={14} stroke={COLORS.brightBlue} className="mr-1" />
                            <span className="text-sm">
                              {typeof request.client === 'object' ? request.client.username : request.client}
                            </span>
                            <span className="mx-2 text-gray-300">•</span>
                            <Calendar size={14} stroke={COLORS.gold} className="mr-1" />
                            <span className="text-xs text-gray-500">
                              {new Date(request.created_at).toLocaleDateString('en-US')}
                            </span>
                          </div>
                        </div>
                        <span
                          className="text-xs font-medium px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: COLORS.gold, color: COLORS.darkTeal }}
                        >
                          Pending
                        </span>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg mb-3">
                        <p className="text-sm text-gray-700">{request.message}</p>
                      </div>
                    </div>
                    <div className="flex md:flex-col gap-2">
                      <button
                        className="flex-1 md:flex-initial flex items-center justify-center gap-1 px-3 py-2 rounded-full text-xs font-medium transition-all"
                        style={styles.button.accent}
                        onClick={() => handle(request.id, 'accepted')}
                      >
                        <Check size={14} />
                        <span>Accept</span>
                      </button>
                      <button
                        className="flex-1 md:flex-initial flex items-center justify-center gap-1 px-3 py-2 rounded-full text-xs font-medium transition-all"
                        style={styles.button.danger}
                        onClick={() => handle(request.id, 'rejected')}
                      >
                        <X size={14} />
                        <span>Decline</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-xl">
                <MessageSquare size={48} stroke={COLORS.teal} className="mx-auto mb-3" />
                <h3 className="text-xl font-medium mb-2" style={{ color: COLORS.darkTeal }}>
                  No Pending Requests
                </h3>
                <p className="text-gray-600">
                  You don't have any pending service requests at the moment.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
