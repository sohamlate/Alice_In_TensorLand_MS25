import express from "express";
import {
  createDependency,
  getDependencies,
  getDependencyById,
  updateDependency,
  deleteDependency,
} from "../controllers/dependencyController.js";

const router = express.Router();

router.post("/", createDependency);     // Create
router.get("/", getDependencies);       // Read all
router.get("/:id", getDependencyById);  // Read one
router.put("/:id", updateDependency);   // Update
router.delete("/:id", deleteDependency);// Delete

export default router;
