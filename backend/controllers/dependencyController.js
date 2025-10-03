import Dependency from "../models/Dependency.js";

// Create Dependency
export const createDependency = async (req, res) => {
  try {
    const { ticker, description, dependencyMaterial } = req.body;

    const dependency = new Dependency({ ticker, description, dependencyMaterial });
    await dependency.save();

    res.status(201).json(dependency);
  } catch (err) {
    res.status(400).json({ message: err.message });
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
