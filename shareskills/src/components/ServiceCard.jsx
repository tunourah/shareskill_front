import { Calendar, User, DollarSign, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
 
export default function ServiceCard({ service }) {
  // Define color constants
  const COLORS = {
    darkTeal: "#002933", // base, text, backgrounds
    brightBlue: "#0AC6F2", // primary accent
    mint: "#25DEC5", // secondary accent
    teal: "#27969A", // tertiary accent
    gold: "#F7C03E", // accent
    orange: "#F76C35", // accent
    magenta: "#A81E70" // accent
  };

  // Define custom style objects
  const styles = {
    card: {
      background: "rgba(0, 41, 51, 0.08)",
      borderColor: "rgba(39, 150, 154, 0.2)"
    },
    activeStatus: {
      backgroundColor: service.is_active ? COLORS.mint : "rgba(0, 41, 51, 0.8)"
    },
    categoryTag: {
      backgroundColor: COLORS.brightBlue
    },
    title: {
      color: COLORS.darkTeal
    },
    underline: {
      backgroundColor: COLORS.teal
    }
  };

  return (
    <Link to={`/services/${service.id}`}>
      <div
        className="relative overflow-hidden backdrop-blur-sm bg-white/10 border rounded-3xl p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 group"
        style={styles.card}
      >
        {/* Glass card effect */}
        <div className="absolute inset-0 bg-teal-50/5 rounded-3xl z-0"></div>
        <div className="absolute inset-0 backdrop-blur-sm bg-white/40 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity z-0"></div>

        {/* Animated light reflection */}
        <div className="absolute -inset-1/2 bg-white/20 rotate-45 translate-x-full group-hover:translate-x-0 transition-transform duration-1000 z-0"></div>

        {/* Content container */}
        <div className="relative z-10">
          {/* Top header section */}
          <div className="flex justify-between items-start mb-8">
            {/* Date with icon */}
            <div className="flex items-center space-x-2 text-xs font-medium text-gray-700">
              <span className="flex items-center justify-center w-6 h-6 bg-cyan-950/10 rounded-full">
                <Calendar size={14} stroke={COLORS.brightBlue} />
              </span>
              <span style={{ color: COLORS.darkTeal }}>
                {new Date(service.created_at).toLocaleDateString("en-US")}
              </span>
            </div>

            {/* Category tag with floating animation */}
            <div className="transform transition-all group-hover:translate-y-1 group-hover:scale-105 duration-300">
              <span
                className="text-white text-xs font-medium px-4 py-1.5 rounded-full shadow-md"
                style={styles.categoryTag}
              >
                {service.category_name || service.category?.name || "Unknown"}
              </span>
            </div>
          </div>

          {/* Status indicator with pill design */}
          <div className="absolute top-14 left-0">
            <span
              className="text-white text-xs font-medium px-3 py-1 rounded-full shadow-md flex items-center"
              style={styles.activeStatus}
            >
              <span className="w-2 h-2 bg-white rounded-full mr-1.5"></span>
              {service.is_active ? "Active" : "Inactive"}
            </span>
          </div>

          {/* Center title with focus effect */}
          <div className="text-center my-10 transform transition-all group-hover:scale-105 duration-300">
            <div className="relative inline-block">
              <h2 className="text-2xl font-bold" style={styles.title}>
                {service.title}
              </h2>
              <div
                className="absolute -bottom-2 left-0 right-0 h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                style={styles.underline}
              ></div>
            </div>
          </div>

          {/* Bottom info section with icons */}
          <div className="flex flex-col space-y-2 text-sm">
            <div className="flex items-center justify-end space-x-2">
              <User size={16} stroke={COLORS.brightBlue} />
              <p style={{ color: COLORS.darkTeal }}>
                {service.provider_username || service.provider?.username || "Unknown"}
              </p>
            </div>
            <div className="flex items-center justify-end space-x-2">
              <DollarSign size={16} stroke={COLORS.orange} />
              <p style={{ color: COLORS.darkTeal }}>
                {service.price_description}
              </p>
            </div>
            <div className="flex items-center justify-end space-x-2">
              <MapPin size={16} stroke={COLORS.magenta} />
              <p style={{ color: COLORS.darkTeal }}>
                {service.location_description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}