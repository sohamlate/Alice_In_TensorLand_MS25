import React, { useState, useEffect } from "react";
import { TrendingUp, Plus, Search, X } from "lucide-react";
import DependencyCard from "./DependencyCard";
import Stockform from "./Stockform";

const Dependency = () => {
  const [dependencies, setDependencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [needupdate, setNeedUpdate] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
  }, [needupdate]);

  // Filter dependencies based on search query
  const filteredDependencies = dependencies.filter((dep) =>
    dep.ticker?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-orange-400 font-medium">Loading dependencies...</p>
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg shadow-lg shadow-orange-500/50">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 via-amber-400 to-red-400 bg-clip-text text-transparent">
                  Dependencies Manager
                </h1>
                <p className="text-sm text-gray-400">Manage your trading dependencies</p>
              </div>
            </div>
            <button
              onClick={() => setShowAdd(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-2.5 px-5 rounded-lg shadow-lg shadow-green-900/50 transition-all duration-300 hover:scale-105 border border-green-500/30"
            >
              <Plus className="w-5 h-5" />
              Add Dependency
            </button>
          </div>

          {/* Search Bar */}
          <div className="mt-6 relative">
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-400" />
              <input
                type="text"
                placeholder="Search by ticker name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900/80 border border-orange-500/30 rounded-lg py-3 pl-12 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-400 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="mt-2 text-sm text-gray-400">
                Found {filteredDependencies.length} {filteredDependencies.length === 1 ? 'result' : 'results'}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-6">
        {filteredDependencies.length === 0 ? (
          <div className="bg-gradient-to-br from-orange-500/10 to-red-500/5 backdrop-blur-xl rounded-xl p-12 text-center shadow-2xl border border-orange-500/30">
            <div className="inline-flex p-4 bg-orange-500/20 rounded-full mb-4 border border-orange-500/30">
              {searchQuery ? (
                <Search className="w-12 h-12 text-orange-400" />
              ) : (
                <TrendingUp className="w-12 h-12 text-orange-400" />
              )}
            </div>
            <h3 className="text-xl font-semibold text-orange-400 mb-2">
              {searchQuery ? `No dependencies found for "${searchQuery}"` : 'No Dependencies Found'}
            </h3>
            <p className="text-gray-400">
              {searchQuery ? 'Try a different search term' : 'Add your first dependency to get started'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDependencies.map((dependency) => (
              <DependencyCard
                key={dependency._id}
                dependency={dependency}
                needupdate={needupdate}
                setNeedUpdate={setNeedUpdate}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add Dependency Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Background overlay */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setShowAdd(false)}
          ></div>

          {/* Modal content */}
          <div className="relative z-10 w-full max-w-3xl bg-gradient-to-br from-zinc-900 to-black rounded-2xl shadow-2xl shadow-orange-500/20 p-6 border border-orange-500/30 max-h-[80vh] overflow-y-auto">
            <Stockform setShowAdd={setShowAdd} showAdd={showAdd} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dependency;