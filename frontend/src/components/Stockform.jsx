import React, { useState } from "react";
import axios from "axios";
const Stockform = ({ setShowAdd, showAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    ticker: "",
    description: "",
    dependencyMaterial: "",
  });

  const [dependencyMaterialList, setDependencyMaterialList] = useState([]);
  const [pdfFile, setPdfFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [pdfError, setPdfError] = useState("");

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Add dependency material
  const handleAddMaterial = (e) => {
    e.preventDefault();
    const material = formData.dependencyMaterial.trim();
    if (material && !dependencyMaterialList.includes(material)) {
      setDependencyMaterialList((prev) => [...prev, material]);
      setFormData((prev) => ({ ...prev, dependencyMaterial: "" }));
    }
  };

  // Remove dependency material
  const handleRemoveMaterial = (index) => {
    setDependencyMaterialList((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle PDF file change
  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) {
      setPdfError("PDF must be less than 2MB");
      setPdfFile(null);
    } else {
      setPdfFile(file);
      setPdfError("");
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.ticker.trim()) newErrors.ticker = "Ticker is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (dependencyMaterialList.length === 0)
      newErrors.dependencyMaterial = "At least one dependency material is required";
    return newErrors;
  };

  // Submit form
// Submit form
const handleSubmit = async (e) => {
  e.preventDefault();
  const newErrors = validateForm();
  if (Object.keys(newErrors).length > 0 || pdfError) {
    setErrors(newErrors);
    return;
  }

  try {
    // Prepare payload
    const payload = {
      name: formData.name,
      ticker: formData.ticker,
      description: formData.description,
      dependencyMaterial: dependencyMaterialList,
    };

    // Send POST request
     const response = await axios.post(
      "http://localhost:5500/api/dependencies/",
      payload // Axios converts this to JSON automatically
    );

    // if (!response.ok) {
    //   throw new Error("Failed to submit form");
    // }

    // const data = await response.json();
    console.log("✅ Form submitted successfully:", response);
    alert("Form submitted successfully!");

    // Reset form
    setFormData({ name: "", ticker: "", description: "", dependencyMaterial: "" });
    setDependencyMaterialList([]);
    setPdfFile(null);
    setErrors({});
    setPdfError("");
  } catch (error) {
    console.error("❌ Error submitting form:", error);
    alert("Something went wrong while submitting");
  }
};


  const handleReset = (e) => {
    e.preventDefault();
    setFormData({ name: "", ticker: "", description: "", dependencyMaterial: "" });
    setDependencyMaterialList([]);
    setPdfFile(null);
    setErrors({});
    setPdfError("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="relative w-[90%] sm:w-[60%] md:w-[50%] lg:w-[40%] bg-gray-900 rounded-2xl shadow-2xl border border-gray-800 p-6 h-[90vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold bg-red-500 rounded-full w-8 h-8 shadow-lg shadow-red-900/50 transition-transform transform hover:scale-110"
        >
          ✕
        </button>

        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">
            Stock Information
          </h1>
          <p className="text-gray-400 text-sm">
            Enter stock details, materials, and attach a PDF
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between overflow-hidden space-y-4">
          <div className="flex-1 overflow-y-auto space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-white mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter dependency name"
                className={`w-full text-white bg-gray-800 px-3 py-2 rounded-lg border-2 focus:outline-none focus:ring-2 text-sm ${
                  errors.name ? "border-red-500 focus:ring-red-300" : "border-gray-700 focus:border-emerald-500 focus:ring-emerald-300"
                }`}
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>

            {/* Ticker */}
            <div>
              <label className="block text-sm font-semibold text-white mb-1">
                Stock Ticker <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="ticker"
                value={formData.ticker}
                onChange={handleInputChange}
                placeholder="e.g., AAPL, GOOGL, TSLA"
                className={`w-full text-white bg-gray-800 px-3 py-2 rounded-lg border-2 focus:outline-none focus:ring-2 text-sm ${
                  errors.ticker ? "border-red-500 focus:ring-red-300" : "border-gray-700 focus:border-emerald-500 focus:ring-emerald-300"
                }`}
              />
              {errors.ticker && <p className="text-xs text-red-500 mt-1">{errors.ticker}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-white mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                placeholder="Enter detailed description..."
                className={`w-full text-white bg-gray-800 px-3 py-2 rounded-lg border-2 focus:outline-none focus:ring-2 resize-none text-sm max-h-32 ${
                  errors.description ? "border-red-500 focus:ring-red-300" : "border-gray-700 focus:border-cyan-500 focus:ring-cyan-300"
                }`}
              />
              {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
            </div>

            {/* Dependency Materials */}
            <div>
              <label className="block text-sm font-semibold text-white mb-1">
                Dependency Materials <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  name="dependencyMaterial"
                  value={formData.dependencyMaterial}
                  onChange={handleInputChange}
                  onKeyPress={(e) => e.key === "Enter" && handleAddMaterial(e)}
                  placeholder="e.g., Steel, Copper"
                  className={`flex-1 px-3 py-2 text-white bg-gray-800 rounded-lg border-2 focus:outline-none focus:ring-2 text-sm ${
                    errors.dependencyMaterial ? "border-red-500 focus:ring-red-300" : "border-gray-700 focus:border-yellow-500 focus:ring-yellow-300"
                  }`}
                />
                <button
                  onClick={handleAddMaterial}
                  type="button"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-sm"
                >
                  Add
                </button>
              </div>
              {errors.dependencyMaterial && <p className="text-xs text-red-500 mt-1">{errors.dependencyMaterial}</p>}
              {dependencyMaterialList.length > 0 && (
                <div className="flex flex-wrap gap-2 max-h-28 overflow-y-auto">
                  {dependencyMaterialList.map((material, index) => (
                    <span key={index} className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-cyan-600 to-emerald-600 text-white rounded-full text-xs font-medium">
                      {material}
                      <button
                        onClick={() => handleRemoveMaterial(index)}
                        type="button"
                        className="hover:bg-white hover:bg-opacity-20 rounded-full p-1"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* PDF Upload */}
            <div>
              <label className="block text-sm font-semibold text-white mb-1">
                Upload PDF (Max 2MB)
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={handlePdfChange}
                className="w-full text-sm text-gray-400 bg-gray-800 border-2 border-gray-700 rounded-lg px-3 py-2 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:text-xs file:font-semibold file:bg-pink-600 file:text-white hover:file:bg-pink-700"
              />
              {pdfFile && <p className="text-xs text-emerald-400 mt-1">Selected: {pdfFile.name}</p>}
              {pdfError && <p className="text-xs text-red-500 mt-1">{pdfError}</p>}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 pt-3">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-bold rounded-lg text-sm"
            >
              Submit
            </button>
            <button
              onClick={handleReset}
              type="button"
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg text-sm"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Stockform;
