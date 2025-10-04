import cron from "node-cron";
import axios from "axios";
import pLimit from "p-limit";
import { rss_feed_urls } from "../data/rss_feed_urls.js";
import RssItem from "../models/RssItem.js";

// Config
const CONCURRENCY = 1; // concurrent requests
const REQUEST_TIMEOUT = 300000; // 5 minutes
const DELAY_MS = 30000; // 5 seconds delay between requests
const limit = pLimit(CONCURRENCY);

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchFeed = async (urlObj) => {
  try {
    const response = await axios.get("https://api.rss2json.com/v1/api.json", {
      params: { rss_url: urlObj.url },
      timeout: REQUEST_TIMEOUT,
    });

    // console.log(JSON.stringify(response.data, null, 2));

    return response.data.items || [];
  } catch (err) {
    console.warn(`Error fetching ${urlObj.url}: ${err.message}`);
    return [];
  } finally {
    await delay(DELAY_MS);
  }
};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const fetchAndInsertRssFeeds = async () => {
  try {
    const shuffledFeeds = shuffleArray([...rss_feed_urls]);

    const feedPromises = shuffledFeeds.map((feed) =>
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
    console.error("Error in fetchAndInsertRssFeeds:", err);
    return 0;
  }
};

// cron.schedule("*/30 * * * *", async () => {
//   console.log("Cron job running...");
//   await fetchAndInsertRssFeeds();
// });
