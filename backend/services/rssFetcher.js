import cron from "node-cron";
import axios from "axios";
import pLimit from "p-limit";
import { rss_feed_urls } from "../data/rss_feed_urls.js";
import RssItem from "../models/RssItem.js";

// Config
const CONCURRENCY = 3;
const REQUEST_TIMEOUT = 300000; // 5 minutes
const limit = pLimit(CONCURRENCY);

const fetchFeed = async (urlObj) => {
  try {
    const response = await axios.get("https://api.rss2json.com/v1/api.json", {
      params: { rss_url: urlObj.url},
      timeout: REQUEST_TIMEOUT,
    });

    return response.data.items || [];
  } catch (err) {
    console.warn(`Error fetching ${urlObj.url}: ${err.message}`);
    return [];
  }
};

export const fetchAndInsertRssFeeds = async () => {
  try {
    const feedPromises = rss_feed_urls.map((feed) =>
      limit(() => fetchFeed(feed))
    );
    const results = await Promise.all(feedPromises);
    const allItems = [].concat(...results);

    if (!allItems.length) {
      return 0;
    }

    const itemsToInsert = allItems.map((item) => ({
      ...item,
      pubDate: item.pubDate ? new Date(item.pubDate) : undefined,
    }));

    const inserted = await RssItem.insertMany(itemsToInsert, {
      ordered: false,
    });
    console.log(`Inserted ${inserted.length} new RSS items.`);
    return inserted.length;
  } catch (err) {
    return 0;
  }
};

cron.schedule("*/10 * * * *", async () => {
  console.log("Cron job running...");
  await fetchAndInsertRssFeeds();
});
