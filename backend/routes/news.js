import express from "express";
import { getRecentEventNews } from "../controllers/newsController.js";

const router = express.Router();

// GET all recent RSS news
router.get("/", getRecentEventNews);

export default router;
