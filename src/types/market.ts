
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

// Blockchain related types
export type BlockchainNetwork = 'Ethereum' | 'Binance Smart Chain' | 'Polygon' | 'Solana' | 'Avalanche';

export type FantasyToken = {
  id: string;
  teamId: string;
  name: string;
  symbol: string;
  contractAddress: string;
  network: BlockchainNetwork;
  totalSupply: number;
  circulatingSupply: number;
  price: number;
  change24h: number;
  marketCap: number;
  holders: number;
};

export type TokenTransaction = {
  id: string;
  tokenId: string;
  fromAddress: string;
  toAddress: string;
  amount: number;
  timestamp: string;
  txHash: string;
  status: 'pending' | 'confirmed' | 'failed';
  network: BlockchainNetwork;
};

export type SmartContractEvent = {
  id: string;
  contractAddress: string;
  eventName: string;
  parameters?: Record<string, any>;
  blockNumber: number;
  timestamp: string;
  txHash?: string;
  network?: BlockchainNetwork;
  tokenId: string; // Added this property to fix the type error
};

export type WalletBalance = {
  tokenId: string;
  balance: number;
};

export type UserWallet = {
  address: string;
  network: BlockchainNetwork;
  balances: WalletBalance[];
};
