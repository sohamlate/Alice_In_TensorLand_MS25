import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import dependencyRoutes from "./routes/dependencyRoutes.js";
import dataInjectionRoutes from "./routes/manualDataInjectionRoutes.js"
import { fetchAndInsertRssFeeds } from "./services/rssFetcher.js";
import eventRoutes from "./routes/eventRoutes.js";
import news from "./routes/news.js";


dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/dependencies", dependencyRoutes);
app.use("/api/data", dataInjectionRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/news", news);
app.get("/feeds", async (req, res) => {
  const items = await fetchAndInsertRssFeeds();
  res.json({ items });
});

app.get("/", (req, res) => {
  res.send("MERN backend running with pnpm 🚀");
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
server.timeout = 10 * 60 * 1000;
