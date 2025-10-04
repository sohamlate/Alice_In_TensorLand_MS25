import React, { useState, useEffect } from "react";
import axios from "axios";
import { Newspaper } from "lucide-react";

const dummyNews = [
  {
    _id: "1",
    title: "Global Markets Rally After Economic Boost",
    author: "Jane Doe",
    description:
      "Stock markets around the world surged today after central banks announced coordinated measures to stabilize the global economy.",
    pubDate: "2025-10-02T12:00:00Z",
  },
  {
    _id: "2",
    title: "Tech Giants Report Record Profits",
    author: "John Smith",
    description:
      "Major tech companies have reported record-breaking profits this quarter, driven by demand for cloud computing and AI technologies.",
    pubDate: "2025-10-01T08:30:00Z",
  },
  {
    _id: "3",
    title: "Supply Chain Disruptions Ease Globally",
    author: "Emily Brown",
    description:
      "After months of delays, global supply chains are showing signs of recovery, according to logistics industry reports.",
    pubDate: "2025-09-30T15:45:00Z",
  },
];

const NewsFeed = () => {
  const [news, setNews] = useState(dummyNews); // dummy fallback
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get("http://localhost:5500/api/news");
        console.log("Fetched news:", res);
        // if (res.data && res.data.length > 0) {
        //   setNews(res.data);
        // }
      } catch (err) {
        console.error("Error fetching news:", err);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-orange-400 font-medium">Loading news...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative font-mono">
      {/* Background effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-orange-950/20 via-black to-red-950/20 pointer-events-none"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.1),transparent_50%)] pointer-events-none"></div>

      {/* Header */}
      <div className="relative bg-black/60 backdrop-blur-xl border-b border-orange-500/20 shadow-lg shadow-orange-500/5 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg shadow-lg shadow-orange-500/50">
            <Newspaper className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 via-amber-400 to-red-400 bg-clip-text text-transparent">
            Latest News
          </h1>
        </div>
      </div>

      {/* News List */}
      <div className="relative max-w-7xl mx-auto px-6 py-10">
        {news.length > 0 ? (
          <div className="space-y-6">
            {news.map((item) => (
              <div
                key={item._id}
                className="bg-gradient-to-br from-blue-950/40 to-blue-900/20 backdrop-blur-xl rounded-xl p-6 border border-blue-500/30 hover:border-blue-500/60 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
              >
                {/* Content only (removed thumbnail) */}
                <h2 className="text-lg font-semibold text-white mb-2 hover:text-orange-400 transition-colors">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-400 mb-3">
                  By {item.author || "Unknown Author"} •{" "}
                  {new Date(item.pubDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <p className="text-gray-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gradient-to-br from-orange-500/10 to-red-500/5 backdrop-blur-xl rounded-xl p-12 text-center shadow-2xl border border-orange-500/30">
            <div className="inline-flex p-4 bg-orange-500/20 rounded-full mb-4 border border-orange-500/30">
              <Newspaper className="w-12 h-12 text-orange-400" />
            </div>
            <h3 className="text-xl font-semibold text-orange-400 mb-2">
              No News Found
            </h3>
            <p className="text-gray-400">
              No news articles available at the moment
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsFeed;
