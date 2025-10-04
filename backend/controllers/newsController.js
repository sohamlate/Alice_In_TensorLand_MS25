import RssItem from "../models/RssItem.js";

// Fetch all recent RSS news
import event_impact_assessments from "../models/Event_impact_assessments.js";// your event schema
// import RssItem from "../models/RssItem.js"; // your news schema

export const getRecentEventNews = async (req, res) => {
  try {
    // Fetch all events and populate news info
    const events = await event_impact_assessments.find().sort({ createdAt: -1 }); // newest events first

    // Map events to include news info
    const eventsWithNews = await Promise.all(
      events.map(async (event) => {
        const news = await RssItem.findById(event.newsId); // fetch news by ID
        return {
          ...event.toObject(),
          news, // attach news object
        };
      })
    );

    // Optional: sort by news publication date descending
    const sortedEvents = eventsWithNews.sort((a, b) => {
      if (!a.news || !b.news) return 0;
      return new Date(b.news.pubDate) - new Date(a.news.pubDate);
    });

    res.status(200).json(sortedEvents);
  } catch (error) {
    console.error("Error fetching event news:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};
