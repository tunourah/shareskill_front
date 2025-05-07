// src/components/DeleteConfirmationModal.jsx
import { createPortal } from "react-dom";
import { X, Trash2 } from "lucide-react";

export default function DeleteConfirmationModal({
  isOpen,
  title = "Confirm Deletion",
  message = "This cannot be undone. Proceed?",
  onCancel,
  onConfirm,
}) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            <Trash2 size={16} className="mr-2" />
            Delete
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
