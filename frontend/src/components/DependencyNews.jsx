import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DependencyNews = () => {
  const { id } = useParams();
  const [dependency, setDependency] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedNewsId, setSelectedNewsId] = useState(null);

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

  if (loading) return <p>Loading...</p>;
  if (!dependency) return <p>Dependency not found</p>;

  const hasImpact = (impactObj) => impactObj && impactObj.severity > 0;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">{dependency.name} - News</h1>
      <ul className="space-y-4">
        {dependency.events.map((event) => {
          const news = event.news;
          const isSelected = selectedNewsId === news._id;

        //   {console.log(event)}

          return (
            <li key={news._id} className="border rounded p-4 shadow-sm">
              {/* News title */}
              <div
                className="cursor-pointer text-cyan-400 hover:underline font-semibold"
                onClick={() =>
                  setSelectedNewsId(isSelected ? null : news._id)
                }
              >
                {news.title}
              </div>

              {/* Expanded news details */}
              {isSelected && (
                <div className="mt-4 space-y-2 bg-gray-50 p-4 rounded">
                  {news.thumbnail && (
                    <img
                      src={news.thumbnail}
                      alt={news.title}
                      className="w-full max-w-xs rounded mb-2"
                    />
                  )}

                  <p>
                    <strong>Published:</strong>{" "}
                    {new Date(news.pubDate).toLocaleString()}
                  </p>

                  {news.description && (
                    <p>
                      <strong>Description:</strong> {news.description}
                    </p>
                  )}

                  {news.content && (
                    <p>
                      <strong>Content:</strong> {news.content}
                    </p>
                  )}

                  {/* Impact details */}
                  {hasImpact(event.operationalCapabilityEfficiency) ||
                  hasImpact(event.financialStabilityLiquidity) ||
                  hasImpact(event.strategicViabilityLongTermSolvency) ||
                  hasImpact(event.supplyChainRobustnessResilience) ||
                  hasImpact(event.regulatorySocialLicense) ? (
                    <>
                      <h3 className="font-semibold mt-4">Impact Details:</h3>
                      <div className="ml-4 space-y-2">
                        {hasImpact(event.operationalCapabilityEfficiency) && (
                          <>
                            <p>
                              <strong>Operational Capability Efficiency:</strong>{" "}
                              {event.operationalCapabilityEfficiency.justification}
                            </p>
                            <p>
                              <strong>Severity:</strong>{" "}
                              {event.operationalCapabilityEfficiency.severity}
                            </p>
                          </>
                        )}
                        {hasImpact(event.financialStabilityLiquidity) && (
                          <p>
                            <strong>Financial Stability Liquidity:</strong>{" "}
                            {event.financialStabilityLiquidity.justification}
                          </p>
                        )}
                        {hasImpact(event.strategicViabilityLongTermSolvency) && (
                          <p>
                            <strong>Strategic Viability Long Term Solvency:</strong>{" "}
                            {event.strategicViabilityLongTermSolvency.justification}
                          </p>
                        )}
                        {hasImpact(event.supplyChainRobustnessResilience) && (
                          <p>
                            <strong>Supply Chain Robustness Resilience:</strong>{" "}
                            {event.supplyChainRobustnessResilience.justification}
                          </p>
                        )}
                        {hasImpact(event.regulatorySocialLicense) && (
                          <p>
                            <strong>Regulatory Social License:</strong>{" "}
                            {event.regulatorySocialLicense.justification}
                          </p>
                        )}
                      </div>
                    </>
                  ) : null}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DependencyNews;
