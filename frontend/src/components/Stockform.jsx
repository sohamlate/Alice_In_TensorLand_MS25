import React, { useState } from "react";

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
      newErrors.dependencyMaterial =
        "At least one dependency material is required";
    return newErrors;
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0 || pdfError) {
      setErrors(newErrors);
      return;
    }

    try {
      console.log("✅ Form submitted:", {
        name: formData.name,
        ticker: formData.ticker,
        description: formData.description,
        dependencyMaterial: dependencyMaterialList,
        pdf: pdfFile?.name,
      });
      alert("Form submitted successfully!");

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
      <div className="relative w-[90%] sm:w-[60%] md:w-[40%] lg:w-[30%] bg-gray-900 rounded-2xl shadow-2xl border border-gray-800 p-6 max-h-[85vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold bg-red-500 rounded-full  w-8 h-8 shadow-lg shadow-red-900/50 transition-transform transform hover:scale-110"
        >
          ✕
        </button>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold  mb-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">
            Stock Information
          </h1>
          <p className="text-gray-400 text-sm">
            Enter stock details, materials, and attach a PDF
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Input */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-white mb-2"
            >
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter dependency name"
              className={`w-full text-white bg-gray-800 px-3 py-2 rounded-lg border-2 focus:outline-none focus:ring-2 text-sm ${
                errors.name
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-700 focus:border-emerald-500 focus:ring-emerald-300"
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Ticker Input */}
          <div>
            <label
              htmlFor="ticker"
              className="block text-sm font-semibold text-white mb-2"
            >
              Stock Ticker <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="ticker"
              name="ticker"
              value={formData.ticker}
              onChange={handleInputChange}
              placeholder="e.g., AAPL, GOOGL, TSLA"
              className={`w-full text-white bg-gray-800 px-3 py-2 rounded-lg border-2 focus:outline-none focus:ring-2 text-sm ${
                errors.ticker
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-700 focus:border-emerald-500 focus:ring-emerald-300"
              }`}
            />
            {errors.ticker && (
              <p className="mt-1 text-xs text-red-500">{errors.ticker}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-white mb-2"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              placeholder="Enter detailed description..."
              className={`w-full text-white bg-gray-800 px-3 py-2 rounded-lg border-2 focus:outline-none focus:ring-2 resize-none text-sm ${
                errors.description
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-700 focus:border-cyan-500 focus:ring-cyan-300"
              }`}
            />
            {errors.description && (
              <p className="mt-1 text-xs text-red-500">
                {errors.description}
              </p>
            )}
          </div>

          {/* Dependency Materials */}
          <div>
            <label
              htmlFor="dependencyMaterial"
              className="block text-sm font-semibold text-white mb-2"
            >
              Dependency Materials <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="dependencyMaterial"
                name="dependencyMaterial"
                value={formData.dependencyMaterial}
                onChange={handleInputChange}
                onKeyPress={(e) => e.key === "Enter" && handleAddMaterial(e)}
                placeholder="e.g., Steel, Copper"
                className={`flex-1 px-3 py-2 text-white bg-gray-800 rounded-lg border-2 focus:outline-none focus:ring-2 text-sm ${
                  errors.dependencyMaterial
                    ? "border-red-500 focus:ring-red-300"
                    : "border-gray-700 focus:border-yellow-500 focus:ring-yellow-300"
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
            {errors.dependencyMaterial && (
              <p className="mt-1 text-xs text-red-500">
                {errors.dependencyMaterial}
              </p>
            )}
            {dependencyMaterialList.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {dependencyMaterialList.map((material, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-cyan-600 to-emerald-600 text-white rounded-full text-xs font-medium"
                  >
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
            <label
              htmlFor="pdf"
              className="block text-sm font-semibold text-white mb-2"
            >
              Upload PDF (Max 2MB)
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={handlePdfChange}
              className="w-full text-sm text-gray-400 bg-gray-800 border-2 border-gray-700 rounded-lg px-3 py-2 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-pink-600 file:text-white hover:file:bg-pink-700"
            />
            {pdfFile && (
              <p className="mt-1 text-xs text-emerald-400">
                Selected: {pdfFile.name}
              </p>
            )}
            {pdfError && (
              <p className="mt-1 text-xs text-red-500">{pdfError}</p>
            )}
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
