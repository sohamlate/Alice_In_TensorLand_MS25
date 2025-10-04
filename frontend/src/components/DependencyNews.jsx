import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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

  const hasImpact = (impactObj) => impactObj && impactObj.severity > 0;

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
    <div className="bg-black min-h-screen p-6">
      {/* Header with Bloomberg-style border */}
      <div className="border-l-4 border-amber-400 pl-4 mb-8">
        <h1 className="text-4xl font-bold text-amber-400 font-mono tracking-tight">
          {dependency.name}
        </h1>
        <p className="text-gray-500 text-sm font-mono mt-1">NEWS FEED</p>
      </div>

      <ul className="space-y-4">
        {dependency.events.map((event) => {
          const news = event.news;

          return (
            <li
              key={news._id}
              className="bg-zinc-900 border border-zinc-800 rounded-none shadow-lg hover:border-amber-400 transition-all duration-200 cursor-pointer"
              onClick={() => setSelectedEvent(event)}
            >
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                  <span className="text-cyan-400 hover:text-amber-400 font-semibold font-mono text-sm transition-colors">
                    {news.title}
                  </span>
                </div>

                <div className="pl-5 space-y-3">
                  <div className="border-l-2 border-cyan-400 pl-3">
                    <p className="text-gray-500 text-xs font-mono uppercase mb-1">
                      Published
                    </p>
                    <p className="text-cyan-400 font-mono text-sm">
                      {new Date(news.pubDate).toLocaleString()}
                    </p>
                  </div>

                  {news.description && (
                    <div className="border-l-2 border-blue-500 pl-3">
                      <p className="text-gray-500 text-xs font-mono uppercase mb-1">
                        Description
                      </p>
                      <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
                        {news.description}
                      </p>
                    </div>
                  )}

                  {news.content && (
                    <div className="border-l-2 border-purple-500 pl-3">
                      <p className="text-gray-500 text-xs font-mono uppercase mb-1">
                        Content
                      </p>
                      <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                        {news.content}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Modal */}
      {selectedEvent && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedEvent(null)}
        >
          <div 
            className="bg-zinc-900 border border-amber-400 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-amber-400 px-6 py-4 flex items-center justify-between z-10">
              <h2 className="font-bold font-mono text-black text-lg">
                {selectedEvent.news.title}
              </h2>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-black hover:text-zinc-800 font-mono text-2xl font-bold"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              {selectedEvent.news.thumbnail && (
                <div className="border border-zinc-800 p-2">
                  <img
                    src={selectedEvent.news.thumbnail}
                    alt={selectedEvent.news.title}
                    className="w-full rounded"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 gap-4">
                <div className="border-l-2 border-cyan-400 pl-3">
                  <p className="text-gray-500 text-xs font-mono uppercase mb-1">
                    Published
                  </p>
                  <p className="text-cyan-400 font-mono text-sm">
                    {new Date(selectedEvent.news.pubDate).toLocaleString()}
                  </p>
                </div>

                {selectedEvent.news.description && (
                  <div className="border-l-2 border-blue-500 pl-3">
                    <p className="text-gray-500 text-xs font-mono uppercase mb-1">
                      Description
                    </p>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {selectedEvent.news.description}
                    </p>
                  </div>
                )}

                {selectedEvent.news.content && (
                  <div className="border-l-2 border-purple-500 pl-3">
                    <p className="text-gray-500 text-xs font-mono uppercase mb-1">
                      Content
                    </p>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {selectedEvent.news.content}
                    </p>
                  </div>
                )}
              </div>

              {/* Impact details */}
              {(hasImpact(selectedEvent.operationalCapabilityEfficiency) ||
                hasImpact(selectedEvent.financialStabilityLiquidity) ||
                hasImpact(selectedEvent.strategicViabilityLongTermSolvency) ||
                hasImpact(selectedEvent.supplyChainRobustnessResilience) ||
                hasImpact(selectedEvent.regulatorySocialLicense)) && (
                <div className="mt-6 border border-zinc-800 bg-zinc-900">
                  <div className="bg-amber-400 px-4 py-2">
                    <h3 className="font-bold font-mono text-black text-sm uppercase tracking-wide">
                      Impact Analysis
                    </h3>
                  </div>

                  <div className="p-4 space-y-4">
                    {hasImpact(selectedEvent.operationalCapabilityEfficiency) && (
                      <div className="border-l-4 border-orange-500 pl-4 py-2 bg-zinc-950">
                        <p className="text-gray-500 text-xs font-mono uppercase mb-2">
                          Operational Capability Efficiency
                        </p>
                        <p className="text-gray-300 text-sm mb-2">
                          {selectedEvent.operationalCapabilityEfficiency.justification}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500 text-xs font-mono">
                            SEVERITY:
                          </span>
                          <span
                            className={`font-bold font-mono text-lg ${getSeverityColor(
                              selectedEvent.operationalCapabilityEfficiency.severity
                            )}`}
                          >
                            {selectedEvent.operationalCapabilityEfficiency.severity}/10
                          </span>
                        </div>
                      </div>
                    )}

                    {hasImpact(selectedEvent.financialStabilityLiquidity) && (
                      <div className="border-l-4 border-red-500 pl-4 py-2 bg-zinc-950">
                        <p className="text-gray-500 text-xs font-mono uppercase mb-2">
                          Financial Stability Liquidity
                        </p>
                        <p className="text-gray-300 text-sm mb-2">
                          {selectedEvent.financialStabilityLiquidity.justification}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500 text-xs font-mono">
                            SEVERITY:
                          </span>
                          <span
                            className={`font-bold font-mono text-lg ${getSeverityColor(
                              selectedEvent.financialStabilityLiquidity.severity
                            )}`}
                          >
                            {selectedEvent.financialStabilityLiquidity.severity}/10
                          </span>
                        </div>
                      </div>
                    )}

                    {hasImpact(selectedEvent.strategicViabilityLongTermSolvency) && (
                      <div className="border-l-4 border-amber-500 pl-4 py-2 bg-zinc-950">
                        <p className="text-gray-500 text-xs font-mono uppercase mb-2">
                          Strategic Viability Long Term Solvency
                        </p>
                        <p className="text-gray-300 text-sm mb-2">
                          {selectedEvent.strategicViabilityLongTermSolvency.justification}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500 text-xs font-mono">
                            SEVERITY:
                          </span>
                          <span
                            className={`font-bold font-mono text-lg ${getSeverityColor(
                              selectedEvent.strategicViabilityLongTermSolvency.severity
                            )}`}
                          >
                            {selectedEvent.strategicViabilityLongTermSolvency.severity}/10
                          </span>
                        </div>
                      </div>
                    )}

                    {hasImpact(selectedEvent.supplyChainRobustnessResilience) && (
                      <div className="border-l-4 border-green-500 pl-4 py-2 bg-zinc-950">
                        <p className="text-gray-500 text-xs font-mono uppercase mb-2">
                          Supply Chain Robustness Resilience
                        </p>
                        <p className="text-gray-300 text-sm mb-2">
                          {selectedEvent.supplyChainRobustnessResilience.justification}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500 text-xs font-mono">
                            SEVERITY:
                          </span>
                          <span
                            className={`font-bold font-mono text-lg ${getSeverityColor(
                              selectedEvent.supplyChainRobustnessResilience.severity
                            )}`}
                          >
                            {selectedEvent.supplyChainRobustnessResilience.severity}/10
                          </span>
                        </div>
                      </div>
                    )}

                    {hasImpact(selectedEvent.regulatorySocialLicense) && (
                      <div className="border-l-4 border-cyan-500 pl-4 py-2 bg-zinc-950">
                        <p className="text-gray-500 text-xs font-mono uppercase mb-2">
                          Regulatory Social License
                        </p>
                        <p className="text-gray-300 text-sm mb-2">
                          {selectedEvent.regulatorySocialLicense.justification}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500 text-xs font-mono">
                            SEVERITY:
                          </span>
                          <span
                            className={`font-bold font-mono text-lg ${getSeverityColor(
                              selectedEvent.regulatorySocialLicense.severity
                            )}`}
                          >
                            {selectedEvent.regulatorySocialLicense.severity}/10
                          </span>
                        </div>
                      </div>
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

export default DependencyNews;