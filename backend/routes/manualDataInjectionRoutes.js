import express from "express";
import { fetchAndMergeRssFeeds } from "../controllers/dataInjectionController.js";

const router = express.Router();

router.get("/trigger-data-injection", fetchAndMergeRssFeeds);

export default router;
