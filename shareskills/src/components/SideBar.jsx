import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Plus, List, MessageSquare, Briefcase, FileText } from 'lucide-react';
import { getAllServiceListings } from '../utilities/serviceListingService';
import { useState, useEffect } from 'react';
import { getServiceRequests } from '../utilities/serviceRequestService';
// Define color constants - same as card component for consistency
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
  activeStatus: {
    backgroundColor: "#25DEC5"
  },
  inactiveStatus: {
    backgroundColor: "rgba(0, 41, 51, 0.8)"
  },
  categoryTag: {
    backgroundColor: COLORS.brightBlue
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
    },
    cancel: {
      backgroundColor: "#E2E8F0",
      color: COLORS.darkTeal
    }
  },
  iconBg: {
    primary: {
      backgroundColor: "rgba(10, 198, 242, 0.1)"
    },
    secondary: {
      backgroundColor: "rgba(37, 222, 197, 0.1)"
    },
    tertiary: {
      backgroundColor: "rgba(39, 150, 154, 0.1)"
    },
    accent: {
      backgroundColor: "rgba(247, 192, 62, 0.1)"
    }
  },
  card: {
    background: "rgba(255, 255, 255, 0.7)",
    borderColor: "rgba(39, 150, 154, 0.1)"
  },
  serviceCard: {
    active: {
      borderLeft: `4px solid ${COLORS.mint}`
    },
    inactive: {
      borderLeft: `4px solid ${COLORS.darkTeal}`
    }
  },
  requestCard: {
    pending: {
      borderLeft: `4px solid ${COLORS.gold}`
    },
    accepted: {
      borderLeft: `4px solid ${COLORS.mint}`
    },
    rejected: {
      borderLeft: `4px solid ${COLORS.orange}`
    },
    completed: {
      borderLeft: `4px solid ${COLORS.brightBlue}`
    }
  },
  sideNav: {
    backgroundColor: "rgba(0, 41, 51, 0.05)",
    itemActive: {
      backgroundColor: "rgba(10, 198, 242, 0.1)",
      color: COLORS.brightBlue,
      borderLeft: `3px solid ${COLORS.brightBlue}`
    }
  }
};

const SideBar = ({ services = [], pendingRequests = [], activeRequests = [] }) => {
  // Use location to determine which route is active
  const location = useLocation();
  const currentPath = location.pathname;
  const [myCount, setMyCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [activeCount,  setActiveCount]  = useState(0);
  const [historyCount, setHistoryCount] = useState(0);
  const [requestCount, setRequestCount] = useState(0);

  useEffect(() => {
    // My listings count
    getAllServiceListings({ provider: 'current' })
      .then(data => {
        const arr = Array.isArray(data) ? data : (data.results || []);
        setMyCount(arr.length);
      })
      .catch(() => {});

    // My requests count (client view)
    getServiceRequests({ client: 'current' })
      .then(data => {
        const arr = Array.isArray(data) ? data : (data.results || []);
        setRequestCount(arr.length);
      })
      .catch(() => {});

    // Pending (provider)
    getServiceRequests({ provider: 'current', status: 'pending' })
      .then(data => {
        const arr = Array.isArray(data) ? data : (data.results || []);
        setPendingCount(arr.length);
      })
      .catch(() => {});

    // Active jobs (provider)
    getServiceRequests({ provider: 'current', status: 'accepted' })
      .then(data => {
        const arr = Array.isArray(data) ? data : (data.results || []);
        setActiveCount(arr.length);
      })
      .catch(() => {});

    // History (provider)
    getServiceRequests({ provider: 'current' })
      .then(data => {
        const arr = Array.isArray(data) ? data : (data.results || []);
        setHistoryCount(arr.filter(r => !['pending','accepted'].includes(r.status)).length);
      })
      .catch(() => {});
  }, []);

  const isActive = (path) => currentPath === path;
  // Helper function to check if a path is active
 

  return (
    <div>
      {/* Side navigation */}
      <div className="w-full md:w-64 rounded-2xl overflow-hidden shadow-md" style={styles.container}>
        <div className="p-4" style={styles.header}>
          <h2 className="font-medium" style={{color: COLORS.darkTeal}}>Service Management</h2>
        </div>
        <div className="p-4">
          <nav>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/serviceform"
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-sm transition-all ${isActive('/services/new') ? 'pl-2' : ''}`}
                  style={isActive('/serviceform') ? 
                    { ...styles.sideNav.itemActive } : 
                    { color: COLORS.darkTeal }}
                >
                  <Plus size={18} stroke={isActive('/serviceform') ? COLORS.brightBlue : COLORS.darkTeal} />
                  <span>Offer a New Service</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/my-listings"
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-sm transition-all ${isActive('/services/listings') ? 'pl-2' : ''}`}
                  style={isActive('/my-listings') ? 
                    { ...styles.sideNav.itemActive } : 
                    { color: COLORS.darkTeal }}
                >
                  <List size={18} stroke={isActive('/my-listings') ? COLORS.brightBlue : COLORS.darkTeal} />
                  <span>My Service Listings</span>
                  <span className="ml-auto bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full">
                  {myCount}
                  </span>
                </Link>
              </li>
              <li>
              <Link
                to="/requests"
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-sm transition-all ${isActive('/requests') ? 'pl-2' : ''}`}
                style={isActive('/requests') ? styles.sideNav.itemActive : { color: COLORS.darkTeal }}
              >
                <MessageSquare size={18} stroke={isActive('/requests') ? COLORS.brightBlue : COLORS.darkTeal} />
                <span>My Requests</span>
                <span className="ml-auto bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full">{requestCount}</span>
              </Link>
            </li>
              <li>
                <Link 
                  to="/requests/pending"
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-sm transition-all ${isActive('/requests/pending') ? 'pl-2' : ''}`}
                  style={isActive('/requests/pending') ? 
                    { ...styles.sideNav.itemActive } : 
                    { color: COLORS.darkTeal }}
                >
                  <MessageSquare size={18} stroke={isActive('/requests/pending') ? COLORS.brightBlue : COLORS.darkTeal} />
                  <span>Pending Requests</span>
                  <span className="ml-auto bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">
                  {pendingCount}

                  </span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/requests/active"
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-sm transition-all ${isActive('//requests/active') ? 'pl-2' : ''}`}
                  style={isActive('/requests/active') ? 
                    { ...styles.sideNav.itemActive } : 
                    { color: COLORS.darkTeal }}
                >
                  <Briefcase size={18} stroke={isActive('/requests/active') ? COLORS.brightBlue : COLORS.darkTeal} />
                  <span>Active Jobs</span>
                  <span className="ml-auto bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                  {activeCount}

                  </span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/requests/history"
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-sm transition-all ${isActive('/requests/history') ? 'pl-2' : ''}`}
                  style={isActive('/requests/history') ? 
                    { ...styles.sideNav.itemActive } : 
                    { color: COLORS.darkTeal }}
                >
                  <FileText size={18} stroke={isActive('/requests/history') ? COLORS.brightBlue : COLORS.darkTeal} />
                  <span>Service History</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default SideBar;