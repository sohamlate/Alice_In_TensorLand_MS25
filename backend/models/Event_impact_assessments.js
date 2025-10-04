import mongoose from "mongoose";
import Dependency from "./Dependency.js"; // adjust path as needed

const eventSchema = new mongoose.Schema({
  dependencyId: {
    type: String,
    ref: "Dependency",
    required: true
  },
  newsId: {
    type: String,
    ref: "News",
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

// Post-save hook
eventSchema.post('save', async function(doc) {
  try {
    const severities = [
      doc.operationalCapabilityEfficiency?.severity || 0,
      doc.financialStabilityLiquidity?.severity || 0,
      doc.strategicViabilityLongTermSolvency?.severity || 0,
      doc.supplyChainRobustnessResilience?.severity || 0,
      doc.regulatorySocialLicense?.severity || 0
    ];

    const maxSeverity = Math.max(...severities);

    // Update the dependency's health field
    await Dependency.findByIdAndUpdate(doc.dependencyId, {
      $max: { health: maxSeverity } // assumes you add a 'health' field in Dependency
    });



  } catch (error) {
    console.error("Error updating dependency health:", error);
  }
});

export default mongoose.model("event_impact_assessments", eventSchema);
