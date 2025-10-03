import React, { useEffect, useState } from "react";
import { TrendingUp, Activity, BarChart3, PieChart } from "lucide-react";

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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-600 font-medium">Loading market data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Market Analytics Dashboard</h1>
              <p className="text-sm text-slate-600">Real-time trading insights and charts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Assets</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{dependencies.length}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Active Charts</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{dependencies.length * 2}</p>
              </div>
              <div className="p-3 bg-emerald-50 rounded-lg">
                <Activity className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Market Status</p>
                <p className="text-2xl font-bold text-emerald-600 mt-1">Live</p>
              </div>
              <div className="p-3 bg-emerald-50 rounded-lg">
                <PieChart className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        {dependencies.map((dep) => (
          <div key={dep._id} className="mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              {/* Chart Header */}
              <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1 bg-blue-600 text-white text-sm font-bold rounded-md">
                    {dep.ticker}
                  </div>
                  <h2 className="text-lg font-semibold text-slate-900">{dep.description}</h2>
                </div>
              </div>

              {/* Chart Content - 2 Column Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
                {/* Advanced Chart */}
                <div className="p-4">
                  <div className="mb-3">
                    <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      Advanced Chart
                    </h3>
                  </div>
                  <div className="rounded-lg overflow-hidden border border-slate-200">
                    <iframe
                      src={`https://s.tradingview.com/embed-widget/advanced-chart/?locale=en#%7B"symbol":"${dep.ticker}","interval":"D","theme":"light","toolbar_bg":"#f8fafc","withdateranges":true,"hide_side_toolbar":false,"allow_symbol_change":true,"height":"400","width":"100%25"%7D`}
                      width="100%"
                      height="400"
                      frameBorder="0"
                      allowFullScreen
                      title={`advanced-chart-${dep.ticker}`}
                    ></iframe>
                  </div>
                </div>

                {/* Mini Chart */}
                <div className="p-4">
                  <div className="mb-3">
                    <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Market Overview
                    </h3>
                  </div>
                  <div className="rounded-lg overflow-hidden border border-slate-200">
                    <iframe
                      src={`https://s.tradingview.com/embed-widget/mini-symbol-overview/?locale=en#%7B"symbol":"${dep.ticker}","width":"100%25","height":"400","dateRange":"12M","colorTheme":"light","isTransparent":false,"autosize":true,"largeChartUrl":""%7D`}
                      width="100%"
                      height="400"
                      frameBorder="0"
                      allowFullScreen
                      title={`mini-chart-${dep.ticker}`}
                    ></iframe>
                  </div>
                </div>
              </div>

              {/* Technical Analysis and Company Profile */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 border-t border-slate-200">
                {/* Technical Analysis */}
                <div className="p-4">
                  <div className="mb-3">
                    <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      Technical Analysis
                    </h3>
                  </div>
                  <div className="rounded-lg overflow-hidden border border-slate-200">
                    <iframe
                      src={`https://s.tradingview.com/embed-widget/technical-analysis/?locale=en#%7B"interval":"1m","width":"100%25","height":"300","isTransparent":false,"symbol":"${dep.ticker}","showIntervalTabs":true,"colorTheme":"light"%7D`}
                      width="100%"
                      height="300"
                      frameBorder="0"
                      allowFullScreen
                      title={`technical-${dep.ticker}`}
                    ></iframe>
                  </div>
                </div>

                {/* Market Sentiment */}
                <div className="p-4">
                <div className="mb-3">
                    <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <PieChart className="w-4 h-4" />
                    Market Sentiment
                    </h3>
                </div>
                <div className="rounded-lg overflow-hidden border border-slate-200">
                    <iframe
                    src={`https://s.tradingview.com/embed-widget/single-quote/?locale=en#%7B"symbol":"${dep.ticker}","width":"100%25","colorTheme":"light","isTransparent":false,"showSymbolLogo":true,"height":300%7D`}
                    width="100%"
                    height="300"
                    frameBorder="0"
                    allowFullScreen
                    title={`market-sentiment-${dep.ticker}`}
                    ></iframe>
                </div>
                </div>

              </div>
            </div>
          </div>
        ))}

        {dependencies.length === 0 && (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-slate-200">
            <div className="inline-flex p-4 bg-slate-100 rounded-full mb-4">
              <BarChart3 className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No Data Available</h3>
            <p className="text-slate-600">No trading data found. Please add dependencies to view charts.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sales;