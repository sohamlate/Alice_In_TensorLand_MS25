import React from "react";
import { TrendingUp, Activity, BarChart3, PieChart, Package, Edit, Trash2 } from "lucide-react";

const SalesCard = ({ ticker, description, material, index, onUpdate, onDelete }) => {
 
  const colors = [
    { from: 'from-orange-500/10', to: 'to-amber-500/5', border: 'border-orange-500/30', badge: 'bg-gradient-to-r from-orange-500 to-amber-500', text: 'text-orange-400' },
    { from: 'from-red-500/10', to: 'to-rose-500/5', border: 'border-red-500/30', badge: 'bg-gradient-to-r from-red-500 to-rose-500', text: 'text-red-400' },
    { from: 'from-green-500/10', to: 'to-emerald-500/5', border: 'border-green-500/30', badge: 'bg-gradient-to-r from-green-500 to-emerald-500', text: 'text-green-400' },
    { from: 'from-amber-500/10', to: 'to-yellow-500/5', border: 'border-amber-500/30', badge: 'bg-gradient-to-r from-amber-500 to-yellow-500', text: 'text-amber-400' }
  ];
  const color = colors[index % colors.length];

  return (
    <div className="mb-8">
      <div className={`bg-gradient-to-br ${color.from} ${color.to} backdrop-blur-xl rounded-xl shadow-2xl border ${color.border} overflow-hidden hover:shadow-orange-500/10 transition-all duration-300`}>
        {/* Chart Header */}
        <div className="px-6 py-4 border-b border-white/10 bg-black/20">
          <div className="flex items-center gap-3">
            <div className={`px-3 py-1 ${color.badge} text-white text-sm font-bold rounded-md shadow-lg`}>
              {ticker}
            </div>
            <h2 className={`text-lg font-semibold ${color.text}`}>{description}</h2>
          </div>
        </div>

        {/* Chart Content - 2 Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
          {/* Advanced Chart */}
          <div className="p-4">
            <div className="mb-3">
              <h3 className={`text-sm font-semibold ${color.text} flex items-center gap-2`}>
                <Activity className="w-4 h-4" />
                Advanced Chart
              </h3>
            </div>
            <div className="rounded-lg overflow-hidden border border-white/20 shadow-lg">
              <iframe
                src={`https://s.tradingview.com/embed-widget/advanced-chart/?locale=en#%7B"symbol":"${ticker}","interval":"D","theme":"dark","toolbar_bg":"#000000","withdateranges":true,"hide_side_toolbar":false,"allow_symbol_change":true,"height":"400","width":"100%25"%7D`}
                width="100%"
                height="400"
                frameBorder="0"
                allowFullScreen
                title={`advanced-chart-${ticker}`}
              ></iframe>
            </div>
          </div>

          {/* Mini Chart */}
          <div className="p-4">
            <div className="mb-3">
              <h3 className={`text-sm font-semibold ${color.text} flex items-center gap-2`}>
                <TrendingUp className="w-4 h-4" />
                Market Overview
              </h3>
            </div>
            <div className="rounded-lg overflow-hidden border border-white/20 shadow-lg">
              <iframe
                src={`https://s.tradingview.com/embed-widget/mini-symbol-overview/?locale=en#%7B"symbol":"${ticker}","width":"100%25","height":"400","dateRange":"12M","colorTheme":"dark","isTransparent":false,"autosize":true,"largeChartUrl":""%7D`}
                width="100%"
                height="400"
                frameBorder="0"
                allowFullScreen
                title={`mini-chart-${ticker}`}
              ></iframe>
            </div>
          </div>
        </div>

        {/* Technical Analysis and Market Sentiment */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-white/10 border-t border-white/10">
          {/* Technical Analysis */}
          <div className="p-4">
            <div className="mb-3">
              <h3 className={`text-sm font-semibold ${color.text} flex items-center gap-2`}>
                <BarChart3 className="w-4 h-4" />
                Technical Analysis
              </h3>
            </div>
            <div className="rounded-lg overflow-hidden border border-white/20 shadow-lg">
              <iframe
                src={`https://s.tradingview.com/embed-widget/technical-analysis/?locale=en#%7B"interval":"1m","width":"100%25","height":"300","isTransparent":false,"symbol":"${ticker}","showIntervalTabs":true,"colorTheme":"dark"%7D`}
                width="100%"
                height="300"
                frameBorder="0"
                allowFullScreen
                title={`technical-${ticker}`}
              ></iframe>
            </div>
          </div>

          {/* Market Sentiment */}
          <div className="p-4">
            <div className="mb-3">
              <h3 className={`text-sm font-semibold ${color.text} flex items-center gap-2`}>
                <PieChart className="w-4 h-4" />
                Market Sentiment
              </h3>
            </div>
            <div className="rounded-lg overflow-hidden border border-white/20 shadow-lg">
              <iframe
                src={`https://s.tradingview.com/embed-widget/single-quote/?locale=en#%7B"symbol":"${ticker}","width":"100%25","colorTheme":"dark","isTransparent":false,"showSymbolLogo":true,"height":300%7D`}
                width="100%"
                height="300"
                frameBorder="0"
                allowFullScreen
                title={`market-sentiment-${ticker}`}
              ></iframe>
            </div>
          </div>
        </div>

        {/* Materials Section */}
        {material && material.length > 0 && (
          <div className="border-t border-white/10 bg-black/10">
            <div className="px-6 py-4">
              <h3 className={`text-sm font-semibold ${color.text} flex items-center gap-2 mb-4`}>
                <Package className="w-4 h-4" />
                Related Materials ({material.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {material.map((mat, idx) => (
                  <div 
                    key={idx}
                    className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10 hover:border-white/30 transition-all duration-200"
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${color.badge}`}></div>
                      <span className="text-white/90 text-sm font-medium truncate">
                        {typeof mat === 'string' ? mat : mat.name || mat.material || 'Material'}
                      </span>
                    </div>
                    {typeof mat === 'object' && mat.quantity && (
                      <div className="mt-1 ml-4 text-xs text-white/60">
                        Qty: {mat.quantity}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="border-t border-white/10 bg-black/20 px-6 py-4">
          <div className="flex gap-3 justify-end">
            <button
              onClick={onUpdate}
              className={`flex items-center gap-2 px-4 py-2 ${color.badge} text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-all duration-200 shadow-lg`}
            >
              <Edit className="w-4 h-4" />
              Update
            </button>
            <button
              onClick={onDelete}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-all duration-200 shadow-lg"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesCard;