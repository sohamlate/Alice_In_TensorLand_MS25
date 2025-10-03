import axios from "axios";
import {rss_feed_urls} from "../data/rss_feed_urls.js";

export const fetchAndMergeRssFeeds = async (req, res) => {
  try {
    const urls = req.body?.urls || rss_feed_urls;

    const fetchPromises = urls.map((url) =>
      axios
        .get(`https://api.rss2json.com/v1/api.json`, {
          params: { rss_url: url.url },
        })
        .then((response) => {
            console.log(response);
            return response.data.items;
        })
    );

    const results = await Promise.all(fetchPromises);

    const mergedItems = [].concat(...results);

    res.status(200).json({ items: mergedItems });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
