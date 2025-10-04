import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  dependencyId: {
    type: String,
    ref: "Dependency", // Dependency collection
    required: true
  },
  newsId: {
    type: String,
    ref: "News", // News collection
    required: true
  },
  operationalCapabilityEfficiency: {
    justification: String,
    severity: Number
  },
  financialStabilityLiquidity: {
    justification: String,
    severity: Number
  },
  strategicViabilityLongTermSolvency: {
    justification: String,
    severity: Number
  },
  supplyChainRobustnessResilience: {
    justification: String,
    severity: Number
  },
  regulatorySocialLicense: {
    justification: String,
    severity: Number
  }
}, { timestamps: true });

export default mongoose.model("event_impact_assessments", eventSchema);
