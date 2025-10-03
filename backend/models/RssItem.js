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

import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "rss-client",
  brokers: ["localhost:9092"], // adjust if not local
});

const producer = kafka.producer();

await producer.connect();

rssItemSchema.post("save", async function (doc) {
  try {
    await producer.send({
      topic: "rss-items",  // create this topic in Kafka
      messages: [
        {
          key: doc._id.toString(),   // optional
          value: JSON.stringify(doc.toObject()),
        },
      ],
    });
    console.log(`Kafka message produced for RSS item: ${doc.title}`);
  } catch (error) {
    console.error("Error sending to Kafka:", error.message);
  }
});


const RssItem = mongoose.model("RssItem", rssItemSchema);

export default RssItem;
