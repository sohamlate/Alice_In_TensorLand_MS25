import React, { useState, useEffect } from "react";
import axios from "axios";
import { Newspaper, TrendingUp, Calendar, User, AlertCircle } from "lucide-react";

const NewsFeed = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get("http://localhost:5500/api/news");
        console.log("Fetched news:", res);

        if (res.data && Array.isArray(res.data)) {
          const processed = res.data.map((item) => {
            const scores = [
              item.news?.operationalCapabilityEfficiency?.severity || 0,
              item.news?.financialStabilityLiquidity?.severity || 0,
              item.news?.regulatorySocialLicense?.severity || 0,
              item.news?.strategicViabilityLongTermSolvency?.severity || 0,
              item.news?.supplyChainRobustnessResilience?.severity || 0,
            ];
            const avgSeverity =
              scores.reduce((sum, val) => sum + val, 0) / scores.length;

            return { ...item, avgSeverity: avgSeverity.toFixed(2) };
          });

          processed.sort((a, b) => b.avgSeverity - a.avgSeverity);
          setNews(processed);
        } else {
          setNews([]);
        }
      } catch (err) {
        console.error("Error fetching news:", err);
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // ✅ Converted functions to JSX (no type annotations)
  const getSeverityColor = (severity) => {
    if (severity >= 7) return "from-red-500 to-red-600";
    if (severity >= 5) return "from-orange-500 to-orange-600";
    if (severity >= 3) return "from-amber-500 to-amber-600";
    return "from-yellow-500 to-yellow-600";
  };

  const getSeverityLabel = (severity) => {
    if (severity >= 7) return "Critical";
    if (severity >= 5) return "High";
    if (severity >= 3) return "Moderate";
    return "Low";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-orange-500/30 rounded-full"></div>
            <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin absolute top-0"></div>
          </div>
          <p className="text-orange-400 font-semibold tracking-wide text-lg">Loading news feed...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative font-sans">
      {/* Animated background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-40 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 -right-40 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative bg-slate-900/80 backdrop-blur-xl border-b border-orange-500/20 shadow-2xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl blur-lg opacity-60"></div>
                <div className="relative p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-lg">
                  <Newspaper className="w-7 h-7 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">
                  News Intelligence Feed
                </h1>
                <p className="text-sm text-gray-400 mt-1">Real-time severity analysis and insights</p>
              </div>
            </div>
            {news.length > 0 && (
              <div className="bg-slate-800/60 backdrop-blur-sm px-4 py-2 rounded-lg border border-orange-500/20">
                <p className="text-sm text-gray-400">
                  <span className="text-orange-400 font-semibold">{news.length}</span> Articles
                </p>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* News Grid */}
      <main className="relative max-w-7xl mx-auto px-6 py-12">
        {news.length > 0 ? (
          <div className="grid gap-6">
            {news.map((item, index) => (
              <article
                key={item._id}
                className="group bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-700/50 hover:border-orange-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/10 overflow-hidden"
              >
                <div className="p-8">
                  {/* Top badge and severity */}
                  <div className="flex items-start justify-between mb-4 gap-4">
                    <div className="flex items-center gap-2">
                      <div className="px-3 py-1 bg-slate-700/50 rounded-full border border-slate-600/50">
                        <span className="text-xs font-medium text-gray-300">#{index + 1}</span>
                      </div>
                      <div className={`px-4 py-1.5 bg-gradient-to-r ${getSeverityColor(parseFloat(item.avgSeverity))} rounded-full shadow-lg`}>
                        <div className="flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5 text-white" />
                          <span className="text-xs font-bold text-white uppercase tracking-wide">
                            {getSeverityLabel(parseFloat(item.avgSeverity))}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-orange-400">{item.avgSeverity}</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">Severity</div>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-orange-400 transition-colors duration-300">
                    {item.news.title}
                  </h2>

                  {/* Meta information */}
                  <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
                    <div className="flex items-center gap-2 text-gray-400">
                      <User className="w-4 h-4 text-orange-500/70" />
                      <span>{item.news.author || "Unknown Author"}</span>
                    </div>
                    <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar className="w-4 h-4 text-orange-500/70" />
                      <span>
                        {item.news.createdAt
                          ? new Date(item.news.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : "Unknown Date"}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 leading-relaxed text-base mb-6">
                    {item.news.description}
                  </p>

                  {/* Bottom bar */}
                 
                </div>

                {/* Hover gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </article>
            ))}
          </div>
        ) : (
          <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl rounded-2xl p-16 text-center border border-slate-700/50 shadow-2xl">
            <div className="inline-flex p-6 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl mb-6 border border-orange-500/30 shadow-xl shadow-orange-500/10">
              <Newspaper className="w-16 h-16 text-orange-400" />
            </div>
            <h3 className="text-2xl font-bold text-orange-400 mb-3">
              No News Available
            </h3>
            <p className="text-gray-400 text-lg">
              No news articles available at the moment. Check back later for updates.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default NewsFeed;
