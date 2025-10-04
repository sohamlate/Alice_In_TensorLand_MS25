import Dependency from "../models/Dependency.js";
import cloudinary from '../config/cloudinary.js';


import { fetchFinancialMetrics } from "../utils/financialMetrics.js"; // helper to fetch metrics

export const createDependency = async (req, res) => {
  try {
    const { name, ticker, description, dependencyMaterial } = req.body;
    let pdfUrl;

    console.log(req.body , "dfsfs");


    if (req.files && req.files.pdf) {
      const pdfFile = req.files.pdf;
      if (pdfFile.size > 2 * 1024 * 1024) {
        return res.status(400).json({ error: 'PDF must be less than 2MB' });
      }

      const uploaded = await cloudinary.uploader.upload(pdfFile.tempFilePath, {
        resource_type: 'raw', // for PDF
        folder: 'dependencies'
      });

      pdfUrl = uploaded.secure_url;
    }

  
    const financialMetrics = await fetchFinancialMetrics(ticker);

   
    const dependency = new Dependency({
        name ,
      ticker,
      description,
      dependencyMaterial: dependencyMaterial ,
      pdfUrl,
      ...financialMetrics // Spread fetched metrics
    });



    const saved = await dependency.save();
    res.status(201).json(saved);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};


// Get All Dependencies
export const getDependencies = async (req, res) => {
  try {
    const dependencies = await Dependency.find();
    res.json(dependencies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Single Dependency by ID
export const getDependencyById = async (req, res) => {
  try {
    const dependency = await Dependency.findById(req.params.id);
    if (!dependency) return res.status(404).json({ message: "Dependency not found" });
    res.json(dependency);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Dependency
export const updateDependency = async (req, res) => {
  try {
    const dependency = await Dependency.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!dependency) return res.status(404).json({ message: "Dependency not found" });
    console.log(dependency.ticker);
    const financialMetrics = await fetchFinancialMetrics(dependency.ticker);
    console.log(financialMetrics);
     Object.assign(dependency, req.body, financialMetrics);
    // Save updated document
    await dependency.save();

    res.json(dependency);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete Dependency
export const deleteDependency = async (req, res) => {
  try {
    const dependency = await Dependency.findByIdAndDelete(req.params.id);
    if (!dependency) return res.status(404).json({ message: "Dependency not found" });
    res.json({ message: "Dependency deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
