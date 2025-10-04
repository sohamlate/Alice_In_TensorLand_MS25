import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { X, TrendingUp, DollarSign, Target, Truck, Scale } from "lucide-react";

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

  const getSeverityColor = (severity) => {
    if (severity === 0) return "text-slate-400 bg-slate-800 border-slate-700";
    if (severity <= 3) return "text-green-400 bg-green-950 border-green-800";
    if (severity <= 6) return "text-yellow-400 bg-yellow-950 border-yellow-800";
    return "text-red-400 bg-red-950 border-red-800";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400 text-lg">Loading news...</p>
        </div>
      </div>
    );
  }

  if (!dependency) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 text-xl">Dependency not found</p>
        </div>
      </div>
    );
  }

  const getSeverityColor = (severity) => {
    if (severity >= 8) return "text-red-500";
    if (severity >= 5) return "text-orange-500";
    if (severity >= 3) return "text-amber-400";
    return "text-green-500";
  };

  if (loading)
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <p className="text-amber-400 text-xl font-mono">Loading...</p>
      </div>
    );
  if (!dependency)
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-xl font-mono">Dependency not found</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="bg-slate-900/50 backdrop-blur-sm shadow-lg border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold text-white mb-2">{dependency.name}</h1>
          <p className="text-slate-400">Latest news and impact analysis</p>
        </div>
      </div>

      {/* News Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dependency.events.map((event) => {
            const news = event.news;
            const showImpactBadge = hasAnyImpact(event);

            return (
              <div
                key={news._id}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 overflow-hidden group cursor-pointer border border-slate-700 hover:border-blue-500/50"
                onClick={() => setSelectedEvent(event)}
              >
                {/* Content */}
                <div className="p-6">
                  {showImpactBadge && (
                    <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-semibold mb-4 border border-blue-500/30">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
                      Impact Analysis
                    </div>
                  )}

                  <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors">
                    {news.title}
                  </h3>

                  {news.description && (
                    <p className="text-slate-400 text-sm line-clamp-3 mb-4 leading-relaxed">
                      {news.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                    <span className="text-xs text-slate-500">
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
      </div>

      {/* Impact Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl shadow-blue-500/10">
            {/* Modal Header */}
            <div className="sticky top-0 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 px-8 py-6 flex items-start justify-between">
              <div className="flex-1 pr-4">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {selectedEvent.news.title}
                </h2>
                <p className="text-sm text-slate-400">
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
                className="flex-shrink-0 p-2 hover:bg-slate-800 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-120px)] px-8 py-6">
              {selectedEvent.news.description && (
                <div className="mb-6">
                  <p className="text-slate-300 leading-relaxed">
                    {selectedEvent.news.description}
                  </p>
                </div>
              )}

              {selectedEvent.news.content && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-white mb-3">Full Story</h3>
                  <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {selectedEvent.news.content}
                  </p>
                </div>
              )}

              {hasAnyImpact(selectedEvent) && (
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                    Impact Analysis
                  </h3>

                  <div className="space-y-6">
                    {hasImpact(selectedEvent.operationalCapabilityEfficiency) && (
                      <ImpactCard
                        title="Operational Capability Efficiency"
                        icon={<TrendingUp className="w-5 h-5 text-blue-400" />}
                        impact={selectedEvent.operationalCapabilityEfficiency}
                        color="blue"
                      />
                    )}

                    {hasImpact(selectedEvent.financialStabilityLiquidity) && (
                      <ImpactCard
                        title="Financial Stability & Liquidity"
                        icon={<DollarSign className="w-5 h-5 text-green-400" />}
                        impact={selectedEvent.financialStabilityLiquidity}
                        color="green"
                      />
                    )}

                    {hasImpact(selectedEvent.strategicViabilityLongTermSolvency) && (
                      <ImpactCard
                        title="Strategic Viability & Long-Term Solvency"
                        icon={<Target className="w-5 h-5 text-fuchsia-400" />}
                        impact={selectedEvent.strategicViabilityLongTermSolvency}
                        color="fuchsia"
                      />
                    )}

                    {hasImpact(selectedEvent.supplyChainRobustnessResilience) && (
                      <ImpactCard
                        title="Supply Chain Robustness & Resilience"
                        icon={<Truck className="w-5 h-5 text-orange-400" />}
                        impact={selectedEvent.supplyChainRobustnessResilience}
                        color="orange"
                      />
                    )}

                    {hasImpact(selectedEvent.regulatorySocialLicense) && (
                      <ImpactCard
                        title="Regulatory & Social License"
                        icon={<Scale className="w-5 h-5 text-teal-400" />}
                        impact={selectedEvent.regulatorySocialLicense}
                        color="teal"
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
const ImpactCard = ({ title, icon, impact, color }) => {
  const getSeverityColor = (severity) => {
    if (severity === 0) return "text-slate-400 bg-slate-800 border-slate-700";
    if (severity <= 3) return `text-${color}-400 bg-${color}-950 border-${color}-800`;
    if (severity <= 6) return `text-yellow-400 bg-yellow-950 border-yellow-800`;
    return `text-red-400 bg-red-950 border-red-800`;
  };

  return (
    <div className="bg-slate-800 rounded-lg p-5 shadow-sm border border-slate-700">
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 w-10 h-10 bg-${color}-500/20 rounded-lg flex items-center justify-center border border-${color}-500/30`}>
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-white">{title}</h4>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSeverityColor(impact.severity)}`}>
              Severity: {impact.severity}
            </span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">{impact.justification}</p>
        </div>
      </div>
    </div>
  );
};

export default DependencyNews;