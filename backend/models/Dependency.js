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
    type: [String], // Array of strings
    required: false,
  },
  pdfUrl: {
    type: String,
    required: false,
  },

 
  debtToEquity: { type: Number, required: false },
  interestCoverage: { type: Number, required: false },
  netProfitMargin: { type: Number, required: false },
  ROA: { type: Number, required: false },
  ROCE: { type: Number, required: false },
  currentRatio: { type: Number, required: false },
  quickRatio: { type: Number, required: false },
  totalDebt: { type: Number, required: false },
  totalCash: { type: Number, required: false },
  operatingCashFlow: { type: Number, required: false },

}, { timestamps: true });

const Dependency = mongoose.model("Dependency", dependencySchema);

export default Dependency;
