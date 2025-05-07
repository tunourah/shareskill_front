// src/components/ServiceCard.jsx
import{ useState } from "react";

import { Calendar, User, DollarSign, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { deleteServiceListing } from "../utilities/serviceListingService";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
export default function ServiceCard({
  service,
  showActions = false,
  onDeleted = () => {}
}) {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // Navigate to detail if not owner
  const handleCardClick = () => {
    if (!showActions) {
      navigate(`/services/${service.id}`);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/services/${service.id}/edit`);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    setIsDeleteModalOpen(true);
     
  };
   const confirmDelete = async () => {
     await deleteServiceListing(service.id);
     onDeleted(service.id);
       setIsDeleteModalOpen(false);
   };
  // your COLORS & styles...
  const COLORS = { darkTeal:"#002933", brightBlue:"#0AC6F2", mint:"#25DEC5", teal:"#27969A", gold:"#F7C03E", orange:"#F76C35", magenta:"#A81E70" };
  const styles = {
    card: { background:"rgba(0,41,51,0.08)", borderColor:"rgba(39,150,154,0.2)" },
    activeStatus: { backgroundColor: service.is_active ? COLORS.mint : "rgba(0,41,51,0.8)" },
    categoryTag: { backgroundColor: COLORS.brightBlue },
    title:     { color: COLORS.darkTeal },
    underline: { backgroundColor: COLORS.teal },
  };

  return (
    <div
      onClick={handleCardClick}
      className={`relative p-8 border overflow-hidden  rounded-3xl shadow-lg transition-transform 
                  duration-300 hover:shadow-2xl hover:scale-105 group
                  ${!showActions ? "cursor-pointer" : ""}`}
      style={styles.card}
    >
  {/* Overlays (pointer-events-none so clicks pass through) */}
  <div
    className="
      absolute inset-0
      bg-teal-50/5
      rounded-3xl
      z-0
      pointer-events-none
    "
  />
  <div
    className="
      absolute inset-0
      backdrop-blur-sm bg-white/40
      rounded-3xl
      opacity-0 group-hover:opacity-10
      transition-opacity
      z-0 pointer-events-none
    "
  />
  <div
    className="
      absolute inset-0
      bg-white/20
      rotate-45
      translate-x-full
      group-hover:translate-x-0
      transition-transform duration-1000
      z-0 pointer-events-none
    "
  />

      {/* Main content */}
      <div className="relative z-10 pointer-events-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center space-x-2 text-xs font-medium text-gray-700">
            <span className="flex items-center justify-center w-6 h-6 bg-cyan-950/10 rounded-full">
              <Calendar size={14} stroke={COLORS.brightBlue} />
            </span>
            <span style={styles.title}>
              {new Date(service.created_at).toLocaleDateString("en-US")}
            </span>
          </div>
          <div className="transform transition-all group-hover:translate-y-1 group-hover:scale-105 duration-300">
            <span
              className="text-white text-xs font-medium px-4 py-1.5 rounded-full shadow-md"
              style={styles.categoryTag}
            >
              {service.category_name || service.category?.name}
            </span>
          </div>
        </div>

        {/* Status pill */}
        <div className="absolute top-14 left-0 pointer-events-none">
          <span
            className="text-white text-xs font-medium px-3 py-1 rounded-full shadow-md flex items-center"
            style={styles.activeStatus}
          >
            <span className="w-2 h-2 bg-white rounded-full mr-1.5"></span>
            {service.is_active ? "Active" : "Inactive"}
          </span>
        </div>

        {/* Title */}
        <div className="text-center my-10 mt-20 transform transition-all group-hover:scale-105 duration-300">
          <h4 className="text-lg  leading-10
font-bold truncate" style={styles.title}>
            {service.title}
          </h4>
          <div
            className="h-0.5 mt-1 transform scale-x-0 group-hover:scale-x-100
                        transition-transform duration-300 origin-left"
            style={styles.underline}
          />
        </div>

        {/* Footer info */}
        <div className="flex flex-col space-y-2 text-sm">
          <div className="flex items-center justify-end space-x-2">
            <User size={16} stroke={COLORS.brightBlue} />
            <p style={styles.title}>{service.provider_username}</p>
          </div>
          <div className="flex items-center justify-end space-x-2">
            <DollarSign size={16} stroke={COLORS.orange} />
            <p style={styles.title}>{service.price_description}</p>
          </div>
          <div className="flex items-center justify-end space-x-2">
            <MapPin size={16} stroke={COLORS.magenta} />
            <p style={styles.title}>{service.location_description}</p>
          </div>
        </div>

        {/* Edit/Delete buttons */}
        {showActions && (
          <div className="mt-6 flex justify-end gap-2 pointer-events-auto">
            <button
              onClick={handleEdit}
              className="px-3 py-1 bg-yellow-500 text-white rounded-lg"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-3 py-1 bg-red-600 text-white rounded-lg"
            >
              Delete
            </button>
          </div>
        )}
      </div>
          <DeleteConfirmationModal
      isOpen={isDeleteModalOpen}
       title="Delete Service"
      message="This action is permanent. Do you really want to delete this service?"       onCancel={() => setIsDeleteModalOpen(false)}
       onConfirm={confirmDelete}
     />
    </div>
  );
}

