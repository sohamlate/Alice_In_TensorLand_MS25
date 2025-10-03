import mongoose from "mongoose";

const dependencySchema = new mongoose.Schema({
  ticker: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dependencyMaterial: {
    type: [String], // ✅ Now it's an array of strings
    required: false,
  }
}, { timestamps: true });

const Dependency = mongoose.model("Dependency", dependencySchema);

export default Dependency;
