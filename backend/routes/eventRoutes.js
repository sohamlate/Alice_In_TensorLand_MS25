import express from "express";
import {
  getEvents,
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
  getDependencyWithEvents,
} from "../controllers/eventController.js";

const router = express.Router();

// GET all events
router.get("/", getEvents);

// POST create event
router.post("/", createEvent);

// GET single event by ID
router.get("/:id", getDependencyWithEvents);

// PUT update event
router.put("/:id", updateEvent);

// DELETE event
router.delete("/:id", deleteEvent);

export default router;
