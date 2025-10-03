import React, { useState, useEffect } from "react";
import axios from "axios";

const EditDependency = ({
  dependency,
  showUpdate,
  setShowUpdate,
  needupdate,
  setNeedUpdate,
}) => {
  const [formData, setFormData] = useState({
    ticker: "",
    materials: "",
    description: "",
  });

  // Prefill form when dependency prop changes
  useEffect(() => {
    if (dependency) {
      setFormData({
        ticker: dependency.ticker || "",
        materials: dependency.dependencyMaterial?.join(", ") || "",
        description: dependency.description || "",
      });
    }
  }, [dependency]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateHandler = async () => {
    try {
      const updatedData = {
        ...formData,
        materials: formData.materials
          .split(",")
          .map((m) => m.trim())
          .filter((m) => m),
      };

      const res = await axios.put(
        `http://localhost:5500/api/dependencies/${dependency._id}`,
        updatedData
      );

      console.log("Dependency updated successfully:", res.data);
      setShowUpdate(false);
      setNeedUpdate(!needupdate);
    } catch (error) {
      console.error("Error updating dependency:", error);
      alert("Failed to update dependency.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateHandler();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg bg-slate-900/80 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-700 p-6 max-h-[90vh] overflow-y-auto">
        
        {/* Close button */}
        <button
          onClick={() => setShowUpdate(false)}
          className="absolute top-4 right-4 flex items-center justify-center 
                     w-8 h-8 bg-red-500 rounded-full text-white 
                     shadow-lg shadow-red-900/50 
                     text-sm font-bold 
                     transition-transform transform hover:scale-110"
        >
          ✕
        </button>

        <h1 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500 mb-6">
          Edit Dependency
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* Ticker Field */}
          <div>
            <label
              htmlFor="ticker"
              className="block text-slate-300 font-semibold mb-1 text-sm"
            >
              Ticker Symbol
            </label>
            <input
              type="text"
              id="ticker"
              name="ticker"
              value={formData.ticker}
              onChange={handleChange}
              placeholder="e.g., GOOGL"
              className="w-full bg-slate-800/70 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
            />
          </div>

          {/* Materials Field */}
          <div>
            <label
              htmlFor="materials"
              className="block text-slate-300 font-semibold mb-1 text-sm"
            >
              Dependency Materials
            </label>
            <input
              type="text"
              id="materials"
              name="materials"
              value={formData.materials}
              onChange={handleChange}
              placeholder="e.g., AI, cloud, steel"
              className="w-full bg-slate-800/70 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
            />
            <p className="text-slate-500 text-xs mt-1">
              Separate multiple materials with commas
            </p>
          </div>

          {/* Description Field */}
          <div>
            <label
              htmlFor="description"
              className="block text-slate-300 font-semibold mb-1 text-sm"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description..."
              rows="4"
              className="w-full bg-slate-800/70 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all resize-none"
            />
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-semibold py-2.5 rounded-lg transition-all transform hover:scale-[1.02] active:scale-95 shadow-md shadow-orange-500/30"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDependency;
