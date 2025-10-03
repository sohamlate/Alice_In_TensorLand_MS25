import React, { useEffect, useState } from "react";
import { TrendingUp, Activity, BarChart3, PieChart } from "lucide-react";
import SalesCard from "./SalesCard";

const Sales = () => {
  const [dependencies, setDependencies] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchDeps = async () => {
      try {
        const res = await fetch("http://localhost:5500/api/dependencies/");
        const data = await res.json();
        setDependencies(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDeps();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-orange-400 font-medium">Loading market data...</p>
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
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 via-amber-400 to-red-400 bg-clip-text text-transparent">
                Market Analytics Dashboard
              </h1>
              <p className="text-sm text-gray-400">Real-time trading insights and charts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="relative max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/5 backdrop-blur-xl rounded-xl p-5 shadow-lg border border-orange-500/30 hover:border-orange-500/50 hover:shadow-orange-500/20 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-300">Total Assets</p>
                <p className="text-3xl font-bold text-orange-400 mt-1">{dependencies.length}</p>
              </div>
              <div className="p-3 bg-orange-500/20 rounded-lg border border-orange-500/30">
                <BarChart3 className="w-6 h-6 text-orange-400" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/5 backdrop-blur-xl rounded-xl p-5 shadow-lg border border-green-500/30 hover:border-green-500/50 hover:shadow-green-500/20 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-300">Active Charts</p>
                <p className="text-3xl font-bold text-green-400 mt-1">{dependencies.length * 2}</p>
              </div>
              <div className="p-3 bg-green-500/20 rounded-lg border border-green-500/30">
                <Activity className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-500/10 to-rose-500/5 backdrop-blur-xl rounded-xl p-5 shadow-lg border border-red-500/30 hover:border-red-500/50 hover:shadow-red-500/20 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-300">Market Status</p>
                <p className="text-3xl font-bold text-green-400 mt-1 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Live
                </p>
              </div>
              <div className="p-3 bg-red-500/20 rounded-lg border border-red-500/30">
                <PieChart className="w-6 h-6 text-red-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Render Dependency Cards */}
        {dependencies.length > 0 ? (
          dependencies.map((dep, index) => (
            <SalesCard
              key={dep._id}
              ticker={dep.ticker}
              description={dep.description}
              material={dep.dependencyMaterial}
              index={index}
            />
          ))
        ) : (
          <div className="bg-gradient-to-br from-orange-500/10 to-red-500/5 backdrop-blur-xl rounded-xl p-12 text-center shadow-2xl border border-orange-500/30">
            <div className="inline-flex p-4 bg-orange-500/20 rounded-full mb-4 border border-orange-500/30">
              <BarChart3 className="w-12 h-12 text-orange-400" />
            </div>
            <h3 className="text-xl font-semibold text-orange-400 mb-2">No Data Available</h3>
            <p className="text-gray-400">No trading data found. Please add dependencies to view charts.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sales;
