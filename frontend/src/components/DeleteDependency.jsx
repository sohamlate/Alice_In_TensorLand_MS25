import React from "react";
import axios from "axios";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";

const DeleteDependency = ({
  dependency,
  onDelete,
  setShowDelete,
  needupdate,
  setNeedUpdate,
}) => {
  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5500/api/dependencies/${dependency._id}`
      );

      // Call parent delete handler if provided
      if (onDelete) onDelete(dependency._id);

      // Refresh data
      setNeedUpdate(!needupdate);

      // Close modal
      setShowDelete(false);
    } catch (error) {
      console.error("Error deleting dependency:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6 p-3">
      <h2 className="text-lg font-semibold text-gray-200">
        Are you sure you want to delete{" "}
        <span className="text-red-400">{dependency.ticker}</span>?
      </h2>

      <div className="flex gap-6">
        {/* Confirm (Green check) */}
        <button
          onClick={handleDelete}
          className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg shadow-green-900/50 transition-transform transform hover:scale-110 flex items-center justify-center"
          title="Confirm Delete"
        >
          <TiTick size={24} />

          
        </button>

        {/* Cancel (Red cross) */}
        <button
          onClick={() => setShowDelete(false)}
          className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg shadow-red-900/50 transition-transform transform hover:scale-110 flex items-center justify-center"
          title="Cancel"
        >
          <ImCross size={20} />
        </button>
      </div>
    </div>
  );
};

export default DeleteDependency;
