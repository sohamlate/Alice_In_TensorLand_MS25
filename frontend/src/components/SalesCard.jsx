import React from "react";
import { TrendingUp, Activity, BarChart3, PieChart } from "lucide-react";

const SalesCard = ({ ticker, description, material, index, onUpdate, onDelete }) => {
  // Updated colors to match DependencyCard style
  const colors = [
    { from: 'from-gray-900', to: 'to-gray-950', border: 'border-gray-800', badge: 'bg-gray-800/30', text: 'text-gray-400' },
    { from: 'from-gray-900', to: 'to-gray-950', border: 'border-gray-800', badge: 'bg-gray-800/30', text: 'text-gray-400' },
    { from: 'from-gray-900', to: 'to-gray-950', border: 'border-gray-800', badge: 'bg-gray-800/30', text: 'text-gray-400' },
    { from: 'from-gray-900', to: 'to-gray-950', border: 'border-gray-800', badge: 'bg-gray-800/30', text: 'text-gray-400' }
  ];

  const color = colors[index % colors.length];

  return (
    <div className="mb-8">
      <div className={`bg-gradient-to-br ${color.from} ${color.to} rounded-xl shadow-2xl border ${color.border} overflow-hidden hover:border-gray-700 hover:shadow-gray-800/50 transition-all duration-300`}>
        {/* Chart Header */}
        <div className="px-6 py-4 border-b border-white/10 bg-black/20">
          <div className="flex items-center gap-3">
            <div className={`px-3 py-1 ${color.badge} text-white text-sm font-bold rounded-md shadow-lg`}>
              {ticker}
            </div>
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
      </div>
    </div>
  );
};

export default SalesCard;
