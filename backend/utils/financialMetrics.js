import yahooFinance from 'yahoo-finance2';

export const fetchFinancialMetrics = async (ticker) => {
  try {
    const data = await yahooFinance.quoteSummary(ticker, {
      modules: ['financialData', 'defaultKeyStatistics']
    });

    const financial = data.financialData || {};

    return {
      debtToEquity: financial.debtToEquity ?? null,
      interestCoverage: financial.interestCoverage ?? null,
      netProfitMargin: financial.profitMargins ?? null,
      ROA: financial.returnOnAssets ?? null,
      ROCE: financial.returnOnCapital ?? null,
      currentRatio: financial.currentRatio ?? null,
      quickRatio: financial.quickRatio ?? null,
      operatingCashFlow: financial.operatingCashflow ?? null,
      totalCash: financial.totalCash ?? null,
      totalDebt: financial.totalDebt ?? null
    };

  } catch (error) {
    console.error('Error fetching financial metrics:', error);
    return {
      debtToEquity: null,
      interestCoverage: null,
      netProfitMargin: null,
      ROA: null,
      ROCE: null,
      currentRatio: null,
      quickRatio: null,
      operatingCashFlow: null
    };
  }
};
