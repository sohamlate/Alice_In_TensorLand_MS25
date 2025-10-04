import event_impact_assessments from "../models/Event_impact_assessments.js";
import Dependency from "../models/Dependency.js";
import RssItem from "../models/RssItem.js";

// ✅ Get all events (with populate)
export const getEvents = async (req, res) => {
  try {
    // Fetch all events
    const events = await event_impact_assessments.find();

    // For each event, manually fetch dependency + news
    const enrichedEvents = await Promise.all(
      events.map(async (event) => {
        const dependency = await Dependency.findById(event.dependencyId); 
        const news = await RssItem.findById(event.newsId);

        return {
          ...event._doc,  // spread original event fields
          dependency,
          news,
        };
      })
    );

    res.status(200).json(enrichedEvents);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Server error while fetching events" });
  }
};



// ✅ Get dependency by ID with all events + their news
export const getDependencyWithEvents = async (req, res) => {
  try {
    const dependency = await Dependency.findById(req.params.id);
    if (!dependency) {
      return res.status(404).json({ message: "Dependency not found" });
    }

    // find all events linked to this dependency
    const events = await event_impact_assessments.find({
      dependencyId: dependency._id.toString(),
    });

    // for each event, fetch its news (1–1 mapping)
    const enrichedEvents = await Promise.all(
      events.map(async (event) => {
        const news = await RssItem.findById(event.newsId);
        return {
          ...event._doc,
          news: news || null,
        };
      })
    );

    res.status(200).json({
      ...dependency._doc,
      events: enrichedEvents,
    });
  } catch (error) {
    console.error("Error fetching dependency with events:", error);
    res.status(500).json({ message: "Server error while fetching dependency" });
  }
};





// ✅ Create new event
export const createEvent = async (req, res) => {
  try {
    const newEvent = new event_impact_assessments(req.body);
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Get single event
export const getEventById = async (req, res) => {
  try {
    // Fetch the event
    const event = await event_impact_assessments.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Manually fetch dependency + news using stored string IDs
    const dependency = await Dependency.findById(event.dependencyId);
    const news = await RssItem.findById(event.newsId);

    // Merge and send enriched object
    res.status(200).json({
      ...event._doc,
      dependency,
      news,
    });
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Update event
export const updateEvent = async (req, res) => {
  try {
    const updatedEvent = await event_impact_assessments.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedEvent) return res.status(404).json({ message: "Event not found" });

    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Delete event
export const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await event_impact_assessments.findByIdAndDelete(req.params.id);

    if (!deletedEvent) return res.status(404).json({ message: "Event not found" });

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Server Error" });
  }
};



