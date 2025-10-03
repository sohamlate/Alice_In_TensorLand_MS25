import yahooFinance from 'yahoo-finance2';

export const fetchFinancialMetrics = async (ticker) => {
  try {
    const data = await yahooFinance.quoteSummary(ticker, {
      modules: ['financialData', 'defaultKeyStatistics']
    });

    const financial = data.financialData || {};

    return {
      // Existing metrics
      debtToEquity: financial.debtToEquity ?? null,
      interestCoverage: financial.interestCoverage ?? null,
      netProfitMargin: financial.profitMargins ?? null,
      ROA: financial.returnOnAssets ?? null,
      ROCE: financial.returnOnCapital ?? null,
      currentRatio: financial.currentRatio ?? null,
      quickRatio: financial.quickRatio ?? null,
      operatingCashFlow: financial.operatingCashflow ?? null,
      totalCash: financial.totalCash ?? null,
      totalDebt: financial.totalDebt ?? null,

      // Additional metrics from your financialData object
      maxAge: financial.maxAge ?? null,
      currentPrice: financial.currentPrice ?? null,
      targetHighPrice: financial.targetHighPrice ?? null,
      targetLowPrice: financial.targetLowPrice ?? null,
      targetMeanPrice: financial.targetMeanPrice ?? null,
      targetMedianPrice: financial.targetMedianPrice ?? null,
      recommendationMean: financial.recommendationMean ?? null,
      recommendationKey: financial.recommendationKey ?? null,
      numberOfAnalystOpinions: financial.numberOfAnalystOpinions ?? null,
      totalCashPerShare: financial.totalCashPerShare ?? null,
      ebitda: financial.ebitda ?? null,
      totalRevenue: financial.totalRevenue ?? null,
      revenuePerShare: financial.revenuePerShare ?? null,
      returnOnEquity: financial.returnOnEquity ?? null,
      grossProfits: financial.grossProfits ?? null,
      freeCashflow: financial.freeCashflow ?? null,
      earningsGrowth: financial.earningsGrowth ?? null,
      revenueGrowth: financial.revenueGrowth ?? null,
      grossMargins: financial.grossMargins ?? null,
      ebitdaMargins: financial.ebitdaMargins ?? null,
      operatingMargins: financial.operatingMargins ?? null,
      profitMargins: financial.profitMargins ?? null,
      financialCurrency: financial.financialCurrency ?? null
    };

  } catch (error) {
    console.error('Error fetching financial metrics:', error);
    // Return all fields as null on error
    return {
      debtToEquity: null,
      interestCoverage: null,
      netProfitMargin: null,
      ROA: null,
      ROCE: null,
      currentRatio: null,
      quickRatio: null,
      operatingCashFlow: null,
      totalCash: null,
      totalDebt: null,
      maxAge: null,
      currentPrice: null,
      targetHighPrice: null,
      targetLowPrice: null,
      targetMeanPrice: null,
      targetMedianPrice: null,
      recommendationMean: null,
      recommendationKey: null,
      numberOfAnalystOpinions: null,
      totalCashPerShare: null,
      ebitda: null,
      totalRevenue: null,
      revenuePerShare: null,
      returnOnEquity: null,
      grossProfits: null,
      freeCashflow: null,
      earningsGrowth: null,
      revenueGrowth: null,
      grossMargins: null,
      ebitdaMargins: null,
      operatingMargins: null,
      profitMargins: null,
      financialCurrency: null
    };
  }
};
