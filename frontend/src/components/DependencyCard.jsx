import React, { useState } from "react";
import EditDependency from "./EditDependency";

const DependencyCard = ({ dependency, onDelete }) => {
  const [showUpdate, setShowUpdate] = useState(false);

  return (
    <>
      <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl p-6 border font-mono border-gray-800 hover:border-gray-700 transition-all duration-300 shadow-2xl hover:shadow-gray-800/50 group">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm font-mono font-semibold">
                {dependency.ticker || "N/A"}
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {dependency.description || "No description available"}
            </p>
          </div>
        </div>

        {/* Materials Section */}
        {dependency.dependencyMaterial &&
          dependency.dependencyMaterial.length > 0 && (
            <div className="mb-5">
              <h4 className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-3">
                Materials
              </h4>
              <div className="flex flex-wrap gap-2">
                {dependency.dependencyMaterial.map((material, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-purple-500/10 border border-purple-500/30 rounded-lg text-purple-300 text-sm font-medium hover:bg-purple-500/20 transition-colors duration-200"
                  >
                    {typeof material === "object" ? material.name : material}
                  </span>
                ))}
              </div>
            </div>
          )}

        {/* PDF Link Section */}

        {/* Metadata Section */}
        <div className="mb-5 pb-5 border-b border-gray-800">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-gray-500 block mb-1">Created</span>
              <span className="text-gray-300 font-mono">
                {new Date(dependency.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div>
              <span className="text-gray-500 block mb-1">Updated</span>
              <span className="text-gray-300 font-mono">
                {new Date(dependency.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => setShowUpdate(true)}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-900/50"
          >
            Update
          </button>
          <button
            onClick={() => onDelete(dependency._id)}
            className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-red-900/50"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Modal */}
      {showUpdate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Background overlay */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowUpdate(false)}
          ></div>

          {/* Modal content */}
          <div className="relative z-10 w-full max-w-3xl bg-zinc-950 rounded-2xl shadow-2xl p-6 border border-gray-700 max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setShowUpdate(false)}
              className="absolute top-4 right-4 bg-red-600 rounded-full p-2 text-white hover:scale-105 transition-transform duration-200 shadow-lg shadow-red-900/50"
            >
              ✕
            </button>
            <EditDependency dependency={dependency} />
          </div>
        </div>
      )}
    </>
  );
};

export default DependencyCard;
