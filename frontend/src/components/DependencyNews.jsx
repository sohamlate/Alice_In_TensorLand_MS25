import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { X, TrendingUp, DollarSign, Target, Truck, Scale, Newspaper } from "lucide-react";

const DependencyNews = () => {
  const { id } = useParams();
  const [dependency, setDependency] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchDependency = async () => {
      try {
        const res = await axios.get(`http://localhost:5500/api/events/${id}`);
        setDependency(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDependency();
  }, [id]);

  const hasImpact = (impactObj) => impactObj && impactObj.severity > -1;

  const hasAnyImpact = (event) => {
    return (
      hasImpact(event.operationalCapabilityEfficiency) ||
      hasImpact(event.financialStabilityLiquidity) ||
      hasImpact(event.strategicViabilityLongTermSolvency) ||
      hasImpact(event.supplyChainRobustnessResilience) ||
      hasImpact(event.regulatorySocialLicense)
    );
  };

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

  if (!dependency) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-orange-400 text-xl">Dependency not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative font-mono">
      {/* Animated background */}
      <div className="fixed inset-0 bg-gradient-to-br from-orange-950/20 via-black to-red-950/20 pointer-events-none"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.1),transparent_50%)] pointer-events-none"></div>

      {/* Header */}
      <div className="relative bg-black/60 backdrop-blur-xl border-b border-orange-500/20 shadow-lg shadow-orange-500/5 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg shadow-lg shadow-orange-500/50">
              <Newspaper className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 via-amber-400 to-red-400 bg-clip-text text-transparent">
                {dependency.name}
              </h1>
              <p className="text-sm text-gray-400">Latest news and impact analysis</p>
            </div>
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="relative max-w-7xl mx-auto px-6 py-6">
        {dependency.events.length === 0 ? (
          <div className="bg-gradient-to-br from-orange-500/10 to-red-500/5 backdrop-blur-xl rounded-xl p-12 text-center shadow-2xl border border-orange-500/30">
            <div className="inline-flex p-4 bg-orange-500/20 rounded-full mb-4 border border-orange-500/30">
              <Newspaper className="w-12 h-12 text-orange-400" />
            </div>
            <h3 className="text-xl font-semibold text-orange-400 mb-2">
              No News Found
            </h3>
            <p className="text-gray-400">No news articles available for this dependency</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dependency.events.map((event) => {
              const news = event.news;
              const showImpactBadge = hasAnyImpact(event);

              return (
                <div
                  key={news._id}
                  className="bg-gradient-to-br from-blue-950/40 to-blue-900/20 backdrop-blur-xl rounded-xl shadow-lg hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 overflow-hidden group cursor-pointer border border-blue-500/30 hover:border-blue-500/60"
                  onClick={() => setSelectedEvent(event)}
                >
                  {/* Content */}
                  <div className="p-6">
                    {showImpactBadge && (
                      <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-semibold mb-4 border border-blue-500/40">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
                        Impact Analysis
                      </div>
                    )}

                    <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors">
                      {news.title}
                    </h3>

                    {news.description && (
                      <p className="text-gray-400 text-sm line-clamp-3 mb-4 leading-relaxed">
                        {news.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-blue-500/20">
                      <span className="text-xs text-gray-500">
                        {new Date(news.pubDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="text-blue-400 text-sm font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        View Details →
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Impact Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-md">
          <div className="bg-gradient-to-br from-zinc-900 to-black border border-orange-500/30 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl shadow-orange-500/20">
            {/* Modal Header */}
            <div className="sticky top-0 bg-black/95 backdrop-blur-xl border-b border-orange-500/20 px-8 py-6 flex items-start justify-between">
              <div className="flex-1 pr-4">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-400 via-amber-400 to-red-400 bg-clip-text text-transparent mb-2">
                  {selectedEvent.news.title}
                </h2>
                <p className="text-sm text-gray-400">
                  Published on{" "}
                  {new Date(selectedEvent.news.pubDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="flex-shrink-0 p-2 hover:bg-orange-500/20 rounded-full transition-colors border border-orange-500/20"
              >
                <X className="w-6 h-6 text-orange-400" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-120px)] px-8 py-6">
              {/* {selectedEvent.news.description && (
                <div className="mb-6">
                  <p className="text-gray-300 leading-relaxed">
                    {selectedEvent.news.description}
                  </p>
                </div>
              )} */}

              {selectedEvent.news.content && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-orange-400 mb-3">Full Story</h3>
                  <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {selectedEvent.news.content}
                  </p>
                </div>
              )}

              {hasAnyImpact(selectedEvent) && (
                <div className="bg-gradient-to-br from-blue-950/40 to-blue-900/20 backdrop-blur-xl rounded-xl p-6 border border-blue-500/30">
                  <h3 className="text-xl font-bold text-blue-400 mb-6 flex items-center gap-2">
                    <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                    Impact Analysis
                  </h3>

                  <div className="space-y-6">
                    {hasImpact(selectedEvent.operationalCapabilityEfficiency) && (
                      <ImpactCard
                        title="Operational Capability Efficiency"
                        icon={<TrendingUp className="w-5 h-5 text-blue-400" />}
                        impact={selectedEvent.operationalCapabilityEfficiency}
                      />
                    )}

                    {hasImpact(selectedEvent.financialStabilityLiquidity) && (
                      <ImpactCard
                        title="Financial Stability & Liquidity"
                        icon={<DollarSign className="w-5 h-5 text-blue-400" />}
                        impact={selectedEvent.financialStabilityLiquidity}
                      />
                    )}

                    {hasImpact(selectedEvent.strategicViabilityLongTermSolvency) && (
                      <ImpactCard
                        title="Strategic Viability & Long-Term Solvency"
                        icon={<Target className="w-5 h-5 text-blue-400" />}
                        impact={selectedEvent.strategicViabilityLongTermSolvency}
                      />
                    )}

                    {hasImpact(selectedEvent.supplyChainRobustnessResilience) && (
                      <ImpactCard
                        title="Supply Chain Robustness & Resilience"
                        icon={<Truck className="w-5 h-5 text-blue-400" />}
                        impact={selectedEvent.supplyChainRobustnessResilience}
                      />
                    )}

                    {hasImpact(selectedEvent.regulatorySocialLicense) && (
                      <ImpactCard
                        title="Regulatory & Social License"
                        icon={<Scale className="w-5 h-5 text-blue-400" />}
                        impact={selectedEvent.regulatorySocialLicense}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Reusable Impact Card
const ImpactCard = ({ title, icon, impact }) => {
  const getSeverityColor = (severity) => {
    if (severity === 0) return "text-gray-400 bg-gray-900 border-gray-700";
    if (severity <= 3) return "text-green-400 bg-green-950 border-green-800";
    if (severity <= 6) return "text-yellow-400 bg-yellow-950 border-yellow-800";
    return "text-red-400 bg-red-950 border-red-800";
  };

  return (
    <div className="bg-black/50 backdrop-blur-sm rounded-lg p-5 shadow-sm border border-blue-500/20">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-white">{title}</h4>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSeverityColor(
                impact.severity
              )}`}
            >
              Severity: {impact.severity}
            </span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            {impact.justification}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DependencyNews;