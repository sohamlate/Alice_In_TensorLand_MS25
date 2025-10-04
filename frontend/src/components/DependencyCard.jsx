import React, { useState } from "react";
import { TrendingUp, TrendingDown, Activity, Clock, Package, CreditCard as Edit2, Trash2, FileText, ChevronRight } from "lucide-react";
import EditDependency from "./EditDependency";
import DeleteDependency from "./DeleteDependency";
import Reportcard from "./Reportcard";

const DependencyCard = ({ dependency, needupdate, setNeedUpdate }) => {
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "text-emerald-400 bg-emerald-500/10 border-emerald-500/30";
      case "warning":
        return "text-amber-400 bg-amber-500/10 border-amber-500/30";
      case "inactive":
        return "text-red-400 bg-red-500/10 border-red-500/30";
      default:
        return "text-cyan-400 bg-cyan-500/10 border-cyan-500/30";
    }
  };

  const getTrendIcon = (change) => {
    if (!change) return <Activity className="w-3 h-3" />;
    return change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />;
  };

  const getTrendColor = (change) => {
    if (!change) return "text-gray-400";
    return change >= 0 ? "text-emerald-400" : "text-red-400";
  };

  const truncateText = (text, length = 50) => {
    if (!text) return "";
    return text.length <= length ? text : text.slice(0, length) + "...";
  };

  return (
    <>
      <div
        className="relative bg-[#0a0e17] rounded-md border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 overflow-hidden group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
        />

        <div
          className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent transform transition-transform duration-500 ${
            isHovered ? "translate-x-0" : "-translate-x-full"
          }`}
        />

        <div className="relative p-5">
          <div className="flex items-start justify-between mb-4 pb-3 border-b border-cyan-500/10">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-2xl font-bold text-white tracking-tight bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  {dependency.name || "N/A"}
                </span>
                <div
                  className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono ${getTrendColor(
                    dependency.changePercent
                  )}`}
                >
                  {getTrendIcon(dependency.changePercent)}
                  {dependency.changePercent && (
                    <span>{Math.abs(dependency.changePercent).toFixed(2)}%</span>
                  )}
                </div>
              </div>
              <div
                className={`inline-flex items-center gap-2 mr-3 px-2 py-1 rounded-sm text-[10px] font-mono uppercase tracking-wider border ${getStatusColor(
                  dependency.status
                )}`}
              >
                <div className="w-1 h-1 rounded-full bg-current animate-pulse" />
                {dependency.status || "LIVE"}
              </div>


                {/* Health */}
              <div
                className={`inline-flex items-center  px-2 py-1 rounded-sm text-[10px] font-mono uppercase tracking-wider border ${
                  dependency.health === 0
                    ? "text-red-400 border-red-500/30 bg-red-500/10"
                    : dependency.health === 1
                    ? "text-orange-400 border-orange-500/30 bg-orange-500/10"
                    : dependency.health === 2
                    ? "text-yellow-400 border-yellow-500/30 bg-yellow-500/10"
                    : dependency.health === 3
                    ? "text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
                    : "text-gray-400 border-gray-500/30 bg-gray-500/10"
                }`}
              >
                <div className="w-1 h-1 rounded-full animate-pulse" />
                {dependency.health === 0
                  ? "High Risk"
                  : dependency.health === 1
                  ? "Moderate Risk"
                  : dependency.health === 2
                  ? "Low Risk"
                  : dependency.health === 3
                  ? "Safe"
                  : "Unknown"}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-3 bg-cyan-400" />
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">
                  Description
                </span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed font-light pl-3">
                {dependency.description || "No description available"}
              </p>
            </div>

            {dependency.dependencyMaterial && dependency.dependencyMaterial.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1 h-3 bg-amber-400" />
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 flex items-center gap-1">
                    <Package className="w-3 h-3" />
                    Materials ({dependency.dependencyMaterial.length})
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 pl-3">
                  {dependency.dependencyMaterial.map((material, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-1 bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700/50 text-gray-300 text-xs font-mono rounded-sm hover:border-amber-500/30 hover:text-amber-200 transition-all duration-200 cursor-default"
                    >
                      {typeof material === "object" ? material.name : material}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-cyan-500/10">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-gray-500">
                  <Clock className="w-3 h-3" />
                  Created
                </div>
                <div className="text-xs font-mono text-gray-400 pl-4">
                  {new Date(dependency.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-gray-500">
                  <Activity className="w-3 h-3" />
                  Updated
                </div>
                <div className="text-xs font-mono text-gray-400 pl-4">
                  {new Date(dependency.updatedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>

            {dependency.report && (
              <div className="pt-3 border-t border-cyan-500/10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1 h-3 bg-blue-400" />
                  <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 flex items-center gap-1">
                    <FileText className="w-3 h-3" />
                    Report
                  </span>
                </div>
                <div className="text-xs text-gray-400 leading-relaxed pl-3">
                  {truncateText(dependency.report, 80)}{" "}
                  {dependency.report.length > 80 && (
                    <button
                      onClick={() => setShowReport(true)}
                      className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors font-mono"
                    >
                      View Full Report
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2 mt-5 pt-4 border-t border-cyan-500/10">
            <button
              onClick={() => setShowUpdate(true)}
              className="flex-1 group/btn relative overflow-hidden bg-gradient-to-r from-cyan-600/20 to-blue-600/20 hover:from-cyan-600/30 hover:to-blue-600/30 text-cyan-400 font-mono text-xs uppercase tracking-wider py-2.5 px-4 rounded-sm transition-all duration-200 border border-cyan-500/30 hover:border-cyan-400/50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/10 to-cyan-400/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
              <span className="relative flex items-center justify-center gap-2">
                <Edit2 className="w-3.5 h-3.5" />
                Edit
              </span>
            </button>
            <button
              onClick={() => setShowDelete(true)}
              className="flex-1 group/btn relative overflow-hidden bg-gradient-to-r from-red-600/20 to-orange-600/20 hover:from-red-600/30 hover:to-orange-600/30 text-red-400 font-mono text-xs uppercase tracking-wider py-2.5 px-4 rounded-sm transition-all duration-200 border border-red-500/30 hover:border-red-400/50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-400/0 via-red-400/10 to-red-400/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
              <span className="relative flex items-center justify-center gap-2">
                <Trash2 className="w-3.5 h-3.5" />
                Delete
              </span>
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      </div>

      {showUpdate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            onClick={() => setShowUpdate(false)}
          />
          <div className="relative z-10 w-full max-w-3xl bg-[#0a0e17] rounded-sm shadow-2xl shadow-cyan-500/10 border border-cyan-500/30 max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#0a0e17] border-b border-cyan-500/20 px-6 py-4 flex items-center justify-between z-10">
              <h3 className="text-lg font-mono text-cyan-400 uppercase tracking-wider">
                Edit Dependency
              </h3>
              <button
                onClick={() => setShowUpdate(false)}
                className="bg-gray-800 hover:bg-gray-700 rounded-sm p-2 text-gray-400 hover:text-white transition-all duration-200"
              >
                <span className="text-lg">✕</span>
              </button>
            </div>
            <div className="p-6">
              <EditDependency
                dependency={dependency}
                showUpdate={showUpdate}
                setShowUpdate={setShowUpdate}
                needupdate={needupdate}
                setNeedUpdate={setNeedUpdate}
              />
            </div>
          </div>
        </div>
      )}

      {showDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={() => setShowDelete(false)}
          />
          <div className="relative z-10 w-full max-w-md bg-[#0a0e17] rounded-sm shadow-2xl shadow-red-500/10 border border-red-500/30">
            <DeleteDependency
              dependency={dependency}
              showDelete={showDelete}
              setShowDelete={setShowDelete}
              needupdate={needupdate}
              setNeedUpdate={setNeedUpdate}
            />
          </div>
        </div>
      )}

      {showReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            onClick={() => setShowReport(false)}
          />
          <div className="relative z-10 w-full max-w-3xl bg-[#0a0e17] rounded-sm shadow-2xl shadow-blue-500/10 border border-blue-500/30 max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#0a0e17] border-b border-blue-500/20 px-6 py-4 flex items-center scrollbar-hide justify-between z-10">
              <h3 className="text-lg font-mono text-blue-400 uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Dependency Report
              </h3>
              <button
                onClick={() => setShowReport(false)}
                className="bg-gray-800 hover:bg-gray-700 rounded-sm p-2 text-gray-400 hover:text-white transition-all duration-200"
              >
                <span className="text-lg">✕</span>
              </button>
            </div>
            <div className="p-6 scrollbar-hide">
              <Reportcard report={dependency.report} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DependencyCard;
