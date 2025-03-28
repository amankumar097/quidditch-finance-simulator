
export type Team = {
  id: string;
  name: string;
  abbreviation: string;
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  logo: string;
  house: 'Gryffindor' | 'Slytherin' | 'Hufflepuff' | 'Ravenclaw' | 'Professional';
  color: string;
};

export type StockQuote = {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
};

export type OptionChain = {
  strike: number;
  callVolume: number;
  callOpenInterest: number;
  callImpliedVolatility: number;
  putVolume: number;
  putOpenInterest: number;
  putImpliedVolatility: number;
};

export type PortfolioPosition = {
  teamId: string;
  shares: number;
  averageCost: number;
  currentValue: number;
};

export type Portfolio = {
  cash: number;
  totalValue: number;
  positions: PortfolioPosition[];
};

export type MarketNews = {
  id: string;
  headline: string;
  summary: string;
  source: string;
  url: string;
  timestamp: string;
  relatedSymbols: string[];
  sentiment: 'positive' | 'negative' | 'neutral';
};

export type RiskMetrics = {
  volatility: number;
  beta: number;
  sharpeRatio: number;
  maxDrawdown: number;
  valueAtRisk: number;
};
