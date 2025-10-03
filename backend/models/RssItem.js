import mongoose from "mongoose";

const rssItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    pubDate: {
      type: Date, // Store as Date type
      required: true,
    },
    link: {
      type: String,
      required: true,
      unique: true, // Each feed item is unique by link
    },
    guid: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: String,
      required: false,
    },
    thumbnail: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    content: {
      type: String,
      required: false,
    },
    enclosure: {
      type: mongoose.Schema.Types.Mixed, // Can store any object
      required: false,
    },
    categories: {
      type: [String], // Array of strings
      required: false,
    },
  },
  { timestamps: true }
);

const RssItem = mongoose.model("RssItem", rssItemSchema);

export default RssItem;
