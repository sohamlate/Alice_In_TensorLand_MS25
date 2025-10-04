import React from "react";
import { TrendingUp, Activity, BarChart3, PieChart } from "lucide-react";

const SalesCard = ({ ticker, health, description, material, index, onUpdate, onDelete }) => {
  // Updated colors to match DependencyCard style
  const colors = [
    { from: 'from-gray-900', to: 'to-gray-950', border: 'border-gray-800', badge: 'bg-gray-800/30', text: 'text-gray-400' },
    { from: 'from-gray-900', to: 'to-gray-950', border: 'border-gray-800', badge: 'bg-gray-800/30', text: 'text-gray-400' },
    { from: 'from-gray-900', to: 'to-gray-950', border: 'border-gray-800', badge: 'bg-gray-800/30', text: 'text-gray-400' },
    { from: 'from-gray-900', to: 'to-gray-950', border: 'border-gray-800', badge: 'bg-gray-800/30', text: 'text-gray-400' }
  ];

  const color = colors[index % colors.length];

  // Calculate rotation angle for the needle (-90 to 90 degrees)
  const getNeedleRotation = () => {
    const rotations = {
      0: 75,   // Safe
      1: 25,   // Low Risk
      2: -25,  // Moderate Risk
      3: -75   // High Risk
    };
    return rotations[health] || 0;
  };

  const getHealthColor = () => {
    const colors = {
      0: '#34d399',  // emerald - Safe
      1: '#facc15',  // yellow - Low Risk
      2: '#fb923c',  // orange - Moderate Risk
      3: '#f87171'   // red - High Risk
    };
    return colors[health] || '#9ca3af';
  };

  const getHealthLabel = () => {
    const labels = {
      0: 'Safe',
      1: 'Low Risk',
      2: 'Moderate Risk',
      3: 'High Risk'
    };
    return labels[health] || 'Unknown';
  };

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
          {/* Supply Chain Health Meter */}
          <div className="p-4">
            <div className="mb-3">
              <h3 className={`text-sm font-semibold ${color.text} flex items-center gap-2`}>
                <BarChart3 className="w-4 h-4" />
                Supply Chain Health
              </h3>
            </div>

            <div className="rounded-lg overflow-hidden border border-white/20 shadow-lg p-6 bg-gradient-to-br from-gray-900 to-gray-800">
              {/* Semicircular Gauge */}
              <div className="flex flex-col items-center">
                {/* Gauge Container */}
                <div className="relative w-full max-w-xs h-32 mb-4">
                  {/* SVG Gauge */}
                  <svg className="w-full h-full" viewBox="0 0 200 100">
                    {/* Gradient Definitions */}
                    <defs>
                      <linearGradient id={`gaugeGradient-${ticker}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f87171" />
                        <stop offset="33%" stopColor="#fb923c" />
                        <stop offset="66%" stopColor="#facc15" />
                        <stop offset="100%" stopColor="#34d399" />
                      </linearGradient>
                      
                      {/* Glow filter */}
                      <filter id={`glow-${ticker}`}>
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>

                    {/* Background track */}
                    <path
                      d="M 20 90 A 80 80 0 0 1 180 90"
                      fill="none"
                      stroke="#374151"
                      strokeWidth="12"
                      strokeLinecap="round"
                    />

                    {/* Colored arc */}
                    <path
                      d="M 20 90 A 80 80 0 0 1 180 90"
                      fill="none"
                      stroke={`url(#gaugeGradient-${ticker})`}
                      strokeWidth="12"
                      strokeLinecap="round"
                      filter={`url(#glow-${ticker})`}
                    />

                    {/* Tick marks */}
                    {[0, 1, 2, 3, 4].map((i) => {
                      const angle = -90 + (i * 45);
                      const radians = (angle * Math.PI) / 180;
                      const x1 = 100 + 70 * Math.cos(radians);
                      const y1 = 90 + 70 * Math.sin(radians);
                      const x2 = 100 + 80 * Math.cos(radians);
                      const y2 = 90 + 80 * Math.sin(radians);
                      
                      return (
                        <line
                          key={i}
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke="#6b7280"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      );
                    })}

                    {/* Needle with Arrow Pointer */}
                    <g transform={`rotate(${getNeedleRotation()}, 100, 90)`} className="transition-all duration-700 ease-out" style={{ transformOrigin: '100px 90px' }}>
                      {/* Needle shaft */}
                      <line
                        x1="100"
                        y1="90"
                        x2="100"
                        y2="30"
                        stroke={getHealthColor()}
                        strokeWidth="4"
                        strokeLinecap="round"
                        filter={`url(#glow-${ticker})`}
                      />
                      
                      {/* Arrow pointer */}
                      <polygon
                        points="100,20 95,32 100,28 105,32"
                        fill={getHealthColor()}
                        filter={`url(#glow-${ticker})`}
                      />
                      
                      {/* Needle base circle */}
                      <circle
                        cx="100"
                        cy="90"
                        r="8"
                        fill={getHealthColor()}
                        filter={`url(#glow-${ticker})`}
                      />
                      
                      {/* Inner circle for depth */}
                      <circle
                        cx="100"
                        cy="90"
                        r="5"
                        fill="#1f2937"
                      />
                    </g>

                    {/* Center circle with border */}
                    <circle
                      cx="100"
                      cy="90"
                      r="3"
                      fill="#1f2937"
                      stroke={getHealthColor()}
                      strokeWidth="1"
                    />
                  </svg>

                  {/* Labels */}
                  <div className="absolute bottom-0 left-0 text-xs text-emerald-400 font-semibold">
                    SAFE
                  </div>
                  <div className="absolute bottom-0 right-0 text-xs text-red-400 font-semibold">
                    HIGH
                  </div>
                </div>

                {/* Status Display */}
                <div className="flex flex-col items-center gap-2">
                  {/* Pulsing indicator */}
                  <div className="relative">
                    <div
                      className="w-3 h-3 rounded-full animate-pulse"
                      style={{ backgroundColor: getHealthColor() }}
                    />
                    <div
                      className="absolute inset-0 w-3 h-3 rounded-full animate-ping"
                      style={{ backgroundColor: getHealthColor(), opacity: 0.4 }}
                    />
                  </div>

                  {/* Status text */}
                  <div className="text-center">
                    <div
                      className="text-lg font-bold tracking-tight"
                      style={{ color: getHealthColor() }}
                    >
                      {getHealthLabel()}
                    </div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">
                      Supply Chain Status
                    </div>
                  </div>

                  {/* Numerical score */}
                  <div className="flex items-center gap-2 mt-2 px-3 py-1 bg-gray-800/50 rounded-full border border-white/10">
                    <span className="text-xs text-gray-400">Score:</span>
                    <span
                      className="text-base font-bold font-mono"
                      style={{ color: getHealthColor() }}
                    >
                      {((3 - health + 1) * 25)}%
                    </span>
                  </div>
                </div>
              </div>
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