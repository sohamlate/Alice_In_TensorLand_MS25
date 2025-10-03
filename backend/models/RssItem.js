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

rssItemSchema.post("save", async function (doc) {
  try {
    await axios.post(
      "https://caffeinekeyboard.app.n8n.cloud/webhook-test/webhook",
      doc.toObject(),
      { headers: { "Content-Type": "application/json" } }
    );
    console.log(`Webhook posted for RSS item: ${doc.title}`);
  } catch (error) {
    console.error("Error posting to webhook:", error.message);
  }
});

const RssItem = mongoose.model("RssItem", rssItemSchema);

export default RssItem;
