import React, { useState } from 'react';
import axios from 'axios';
const Stockform = () => {
  const [formData, setFormData] = useState({
    ticker: '',
    description: '',
    dependencyMaterial: ''
  });

  const [dependencyMaterialList, setDependencyMaterialList] = useState([]);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleAddMaterial = (e) => {
    e.preventDefault();
    const material = formData.dependencyMaterial.trim();

    if (material && !dependencyMaterialList.includes(material)) {
      setDependencyMaterialList(prev => [...prev, material]);
      setFormData(prev => ({
        ...prev,
        dependencyMaterial: ''
      }));
    }
  };

  const handleRemoveMaterial = (index) => {
    setDependencyMaterialList(prev => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.ticker.trim()) {
      newErrors.ticker = 'Ticker is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (dependencyMaterialList.length === 0) {
      newErrors.dependencyMaterial = 'At least one dependency material is required';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }



    try {
      const data = await axios.post('http://localhost:5500/api/dependencies', { 
        ticker: formData.ticker, 
        description: formData.description, 
        dependencyMaterial: dependencyMaterialList  
      });

    //   if (!response.ok) throw new Error('Failed to submit data');
    //   const data = await response.json();
      console.log('✅ Form submitted:', data);

      setFormData({ ticker: '', description: '', dependencyMaterial: '' });
      setDependencyMaterialList([]);
      setErrors({});
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('❌ Error submitting form:', error);
      alert('Something went wrong while submitting');
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setFormData({
      ticker: '',
      description: '',
      dependencyMaterial: ''
    });
    setDependencyMaterialList([]);
    setErrors({});
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Stock Information Form</h1>
          <p className="text-gray-600">Enter stock details and dependency materials</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Ticker Input */}
          <div>
            <label htmlFor="ticker" className="block text-sm font-semibold text-gray-700 mb-2">
              Stock Ticker <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="ticker"
              name="ticker"
              value={formData.ticker}
              onChange={handleInputChange}
              placeholder="e.g., AAPL, GOOGL, TSLA"
              className={`w-full text-black px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all ${
                errors.ticker 
                  ? 'border-red-500 focus:ring-red-300' 
                  : 'border-gray-300 focus:border-purple-500 focus:ring-purple-300'
              }`}
            />
            {errors.ticker && (
              <p className="mt-1 text-sm text-red-600">{errors.ticker}</p>
            )}
          </div>

          {/* Description Textarea */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter detailed description of the stock..."
              rows="5"
              className={`w-full text-black px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all resize-none ${
                errors.description 
                  ? 'border-red-500 focus:ring-red-300' 
                  : 'border-gray-300 focus:border-purple-500 focus:ring-purple-300'
              }`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          {/* Dependency Material Input */}
          <div>
            <label htmlFor="dependencyMaterial" className="block text-sm font-semibold text-gray-700 mb-2">
              Dependency Materials <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="dependencyMaterial"
                name="dependencyMaterial"
                value={formData.dependencyMaterial}
                onChange={handleInputChange}
                onKeyPress={(e) => e.key === 'Enter' && handleAddMaterial(e)}
                placeholder="e.g., Steel, Copper, Lithium"
                className={`flex-1 px-4 text-black py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all ${
                  errors.dependencyMaterial 
                    ? 'border-red-500 focus:ring-red-300' 
                    : 'border-gray-300 focus:border-purple-500 focus:ring-purple-300'
                }`}
              />
              <button
                onClick={handleAddMaterial}
                type="button"
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-300"
              >
                Add
              </button>
            </div>
            {errors.dependencyMaterial && (
              <p className="mt-1 text-sm text-red-600">{errors.dependencyMaterial}</p>
            )}

            {/* Materials List */}
            {dependencyMaterialList.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {dependencyMaterialList.map((material, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                  >
                    {material}
                    <button
                      onClick={() => handleRemoveMaterial(index)}
                      type="button"
                      className="hover:bg-purple-200 rounded-full p-1 transition-colors"
                      aria-label="Remove material"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-300"
            >
              Submit
            </button>
            <button
              onClick={handleReset}
              type="button"
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
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