import mongoose from "mongoose";

const dependencySchema = new mongoose.Schema({
    
  name: { type: String, required: true },
  ticker: { type: String, required: true },
  description: { type: String, required: true },
  dependencyMaterial: { type: [String], required: false },
  report: { type: String, required: false },


  pdfUrl: { type: String, required: false },
  // Financial Metrics
  maxAge: { type: Number, required: false },
  currentPrice: { type: Number, required: false },
  targetHighPrice: { type: Number, required: false },
  targetLowPrice: { type: Number, required: false },
  targetMeanPrice: { type: Number, required: false },
  targetMedianPrice: { type: Number, required: false },
  recommendationMean: { type: Number, required: false },
  recommendationKey: { type: String, required: false },
  numberOfAnalystOpinions: { type: Number, required: false },
  totalCash: { type: Number, required: false },
  totalCashPerShare: { type: Number, required: false },
  ebitda: { type: Number, required: false },
  totalDebt: { type: Number, required: false },
  quickRatio: { type: Number, required: false },
  currentRatio: { type: Number, required: false },
  totalRevenue: { type: Number, required: false },
  debtToEquity: { type: Number, required: false },
  revenuePerShare: { type: Number, required: false },
  returnOnAssets: { type: Number, required: false },
  returnOnEquity: { type: Number, required: false },
  grossProfits: { type: Number, required: false },
  freeCashflow: { type: Number, required: false },
  operatingCashflow: { type: Number, required: false },
  earningsGrowth: { type: Number, required: false },
  revenueGrowth: { type: Number, required: false },
  grossMargins: { type: Number, required: false },
  ebitdaMargins: { type: Number, required: false },
  operatingMargins: { type: Number, required: false },
  profitMargins: { type: Number, required: false },
  financialCurrency: { type: String, required: false },

}, { timestamps: true });

const Dependency = mongoose.model("Dependency", dependencySchema);

export default Dependency;
