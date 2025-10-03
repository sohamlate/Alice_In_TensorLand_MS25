import React, { useState, useEffect } from "react";
import axios from "axios";

const EditDependency = ({ dependency }) => {
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
      alert("Dependency updated successfully!");
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500 mb-8 text-center">
          Edit Dependency
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 shadow-2xl"
        >
          {/* Ticker Field */}
          <div>
            <label
              htmlFor="ticker"
              className="block text-slate-200 font-semibold mb-2 text-sm uppercase tracking-wide"
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
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
            />
          </div>

          {/* Materials Field */}
          <div>
            <label
              htmlFor="materials"
              className="block text-slate-200 font-semibold mb-2 text-sm uppercase tracking-wide"
            >
              Dependency Materials
            </label>
            <input
              type="text"
              id="materials"
              name="materials"
              value={formData.materials}
              onChange={handleChange}
              placeholder="e.g., new tech, AI, cloud computing"
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
            />
            <p className="text-slate-400 text-sm mt-2">
              Separate multiple materials with commas
            </p>
          </div>

          {/* Description Field */}
          <div>
            <label
              htmlFor="description"
              className="block text-slate-200 font-semibold mb-2 text-sm uppercase tracking-wide"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description..."
              rows="5"
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all resize-none"
            />
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-orange-500/30"
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
