import React, { useEffect, useState } from "react";
import { TrendingUp, Activity, BarChart3, PieChart } from "lucide-react";
import SalesCard from "./SalesCard";

const Sales = () => {
  const [dependencies, setDependencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicker, setSelectedTicker] = useState(""); // <-- selected ticker

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

  // Extract all tickers
  const tickers = dependencies.map((dep) => dep.ticker);

  // Filter by selected ticker
  const filteredDeps = selectedTicker
    ? dependencies.filter((dep) => dep.ticker === selectedTicker)
    : dependencies;

  return (
    <div className="min-h-screen bg-black relative font-mono">
      {/* Background */}
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
              <p className="text-sm text-gray-400">
                Real-time trading insights and charts
              </p>
            </div>
          </div>

          {/* Select Dropdown for Tickers */}
          <div className="mt-6 relative max-w-md">
            <select
              value={selectedTicker}
              onChange={(e) => setSelectedTicker(e.target.value)}
              className="w-full pl-4 pr-4 py-2 rounded-lg bg-black text-white border border-orange-500/40 focus:border-orange-500/80 focus:ring-2 focus:ring-orange-500 outline-none appearance-none"
            >
              <option value="" className="bg-black text-gray-400">
                -- Select a Ticker --
              </option>
              {tickers.map((ticker, idx) => (
                <option
                  key={idx}
                  value={ticker}
                  className="bg-black text-white hover:bg-orange-600"
                >
                  {ticker}
                </option>
              ))}
            </select>

            {/* Custom dropdown arrow */}
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-orange-400">
              ▼
            </div>
          </div>
        </div>
      </div>

      {/* Stats + Cards */}
      <div className="relative max-w-7xl mx-auto px-6 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Total Assets */}
          <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/5 backdrop-blur-xl rounded-xl p-5 shadow-lg border border-orange-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-300">
                  Total Assets
                </p>
                <p className="text-3xl font-bold text-orange-400 mt-1">
                  {dependencies.length}
                </p>
              </div>
              <div className="p-3 bg-orange-500/20 rounded-lg border border-orange-500/30">
                <BarChart3 className="w-6 h-6 text-orange-400" />
              </div>
            </div>
          </div>

          {/* Active Charts */}
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/5 backdrop-blur-xl rounded-xl p-5 shadow-lg border border-green-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-300">
                  Active Charts
                </p>
                <p className="text-3xl font-bold text-green-400 mt-1">
                  {dependencies.length * 2}
                </p>
              </div>
              <div className="p-3 bg-green-500/20 rounded-lg border border-green-500/30">
                <Activity className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>

          {/* Market Status */}
          <div className="bg-gradient-to-br from-red-500/10 to-rose-500/5 backdrop-blur-xl rounded-xl p-5 shadow-lg border border-red-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-300">
                  Market Status
                </p>
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

        {/* Render Only Selected Dependency */}
        {filteredDeps.length > 0 ? (
          filteredDeps.map((dep, index) => (
            <SalesCard
              key={dep._id}
              ticker={dep.ticker}
              health = {dep.health}
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
            <h3 className="text-xl font-semibold text-orange-400 mb-2">
              No Data Found
            </h3>
            <p className="text-gray-400">Select a ticker to view details.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sales;
