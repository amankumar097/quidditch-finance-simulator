
import { StockQuote, Team, OptionChain, MarketNews, RiskMetrics, FantasyToken, UserWallet, TokenTransaction, SmartContractEvent } from "@/types/market";
import { blockchainService } from "./blockchainService";

// Mock API functions - in a real app, these would connect to real financial APIs
export const fetchStockQuotes = async (symbols: string[]): Promise<StockQuote[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Generate random price movements
  return symbols.map(symbol => {
    const basePrice = getBasePrice(symbol);
    const change = (Math.random() * 6) - 3; // Between -3 and +3
    const price = basePrice + change;
    const changePercent = (change / basePrice) * 100;
    
    return {
      symbol,
      price: parseFloat(price.toFixed(2)),
      change: parseFloat(change.toFixed(2)),
      changePercent: parseFloat(changePercent.toFixed(2))
    };
  });
};

export const fetchTeams = async (): Promise<Team[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  return [
    {
      id: "1",
      name: "Gryffindor Lions",
      abbreviation: "GRYN",
      symbol: "GRYN",
      price: 152.37,
      change: 2.84,
      changePercent: 1.9,
      volume: 3254892,
      marketCap: 1235789000,
      logo: "gryffindor.png",
      house: "Gryffindor",
      color: "#740001"
    },
    {
      id: "2",
      name: "Slytherin Serpents",
      abbreviation: "SLYN",
      symbol: "SLYN",
      price: 187.45,
      change: -3.52,
      changePercent: -1.84,
      volume: 4125789,
      marketCap: 1578932000,
      logo: "slytherin.png",
      house: "Slytherin",
      color: "#1A472A"
    },
    {
      id: "3",
      name: "Hufflepuff Badgers",
      abbreviation: "HUFF",
      symbol: "HUFF",
      price: 97.32,
      change: 0.75,
      changePercent: 0.78,
      volume: 1574982,
      marketCap: 785319000,
      logo: "hufflepuff.png",
      house: "Hufflepuff",
      color: "#FFD800"
    },
    {
      id: "4",
      name: "Ravenclaw Eagles",
      abbreviation: "RAVN",
      symbol: "RAVN",
      price: 124.83,
      change: 1.25,
      changePercent: 1.01,
      volume: 2387415,
      marketCap: 982547000,
      logo: "ravenclaw.png",
      house: "Ravenclaw",
      color: "#0E1A40"
    },
    {
      id: "5",
      name: "Puddlemere United",
      abbreviation: "PUDL",
      symbol: "PUDL",
      price: 213.67,
      change: 5.23,
      changePercent: 2.51,
      volume: 5124789,
      marketCap: 2154879000,
      logo: "puddlemere.png",
      house: "Professional",
      color: "#2b5b83"
    },
    {
      id: "6",
      name: "Holyhead Harpies",
      abbreviation: "HOLY",
      symbol: "HOLY",
      price: 175.92,
      change: -2.13,
      changePercent: -1.2,
      volume: 3257894,
      marketCap: 1457892000,
      logo: "holyhead.png",
      house: "Professional",
      color: "#0c5e1f"
    },
    {
      id: "7",
      name: "Chudley Cannons",
      abbreviation: "CHUD",
      symbol: "CHUD",
      price: 45.23,
      change: -1.25,
      changePercent: -2.69,
      volume: 987456,
      marketCap: 412578000,
      logo: "chudley.png",
      house: "Professional",
      color: "#d55e00"
    },
    {
      id: "8",
      name: "Wimbourne Wasps",
      abbreviation: "WIMB",
      symbol: "WIMB",
      price: 92.45,
      change: 1.87,
      changePercent: 2.07,
      volume: 1758942,
      marketCap: 752314000,
      logo: "wimbourne.png",
      house: "Professional",
      color: "#ffd700"
    }
  ];
};

export const fetchOptionChain = async (symbol: string): Promise<OptionChain[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const basePrice = getBasePrice(symbol);
  const strikes = [];
  
  // Generate option chain with strikes around the current price
  for (let i = -5; i <= 5; i++) {
    const strike = basePrice + (i * 10);
    const randomVolatility = 0.2 + (Math.random() * 0.3); // Between 0.2 and 0.5
    
    strikes.push({
      strike,
      callVolume: Math.floor(Math.random() * 1000) + 100,
      callOpenInterest: Math.floor(Math.random() * 5000) + 1000,
      callImpliedVolatility: parseFloat((randomVolatility + (i * -0.02)).toFixed(2)),
      putVolume: Math.floor(Math.random() * 1000) + 100,
      putOpenInterest: Math.floor(Math.random() * 5000) + 1000,
      putImpliedVolatility: parseFloat((randomVolatility + (i * 0.02)).toFixed(2))
    });
  }
  
  return strikes;
};

export const fetchMarketNews = async (): Promise<MarketNews[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return [
    {
      id: "1",
      headline: "Gryffindor's Star Seeker Returns from Injury",
      summary: "After a month on the sidelines, Gryffindor's seeker has been cleared to return to play, sending the team's market value soaring.",
      source: "Daily Prophet Financial",
      url: "#",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      relatedSymbols: ["GRYN"],
      sentiment: "positive"
    },
    {
      id: "2",
      headline: "Slytherin Faces Sanctions for Bludger Tampering",
      summary: "The wizarding sports commission is investigating allegations that Slytherin modified bludgers during their last three matches.",
      source: "Quidditch Quarterly",
      url: "#",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      relatedSymbols: ["SLYN"],
      sentiment: "negative"
    },
    {
      id: "3",
      headline: "Nimbus Racing Broom Company Announces New Sponsorship Deal with Puddlemere",
      summary: "The lucrative multi-year deal will provide Puddlemere United with exclusive access to the upcoming Nimbus 3000 series.",
      source: "WizBiz Journal",
      url: "#",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      relatedSymbols: ["PUDL"],
      sentiment: "positive"
    },
    {
      id: "4",
      headline: "Wizarding Economy Shows Signs of Recovery After Potion Ingredient Shortage",
      summary: "Markets respond positively as supply chain issues for critical potion ingredients are resolved, with Quidditch stocks leading the rally.",
      source: "Gringotts Financial Review",
      url: "#",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      relatedSymbols: ["GRYN", "SLYN", "HUFF", "RAVN"],
      sentiment: "positive"
    },
    {
      id: "5",
      headline: "Chudley Cannons Continue Longest Losing Streak in League History",
      summary: "With their 15th consecutive loss, the Chudley Cannons' market value continues to decline as fans and investors lose faith.",
      source: "Daily Prophet Financial",
      url: "#",
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      relatedSymbols: ["CHUD"],
      sentiment: "negative"
    }
  ];
};

export const fetchRiskMetrics = async (teamIds: string[]): Promise<Record<string, RiskMetrics>> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1700));
  
  const result: Record<string, RiskMetrics> = {};
  
  teamIds.forEach(id => {
    result[id] = {
      volatility: parseFloat((Math.random() * 0.5 + 0.2).toFixed(2)),
      beta: parseFloat((Math.random() * 1.5 + 0.5).toFixed(2)),
      sharpeRatio: parseFloat((Math.random() * 2 - 0.5).toFixed(2)),
      maxDrawdown: parseFloat((Math.random() * 0.3 + 0.1).toFixed(2)),
      valueAtRisk: parseFloat((Math.random() * 0.15 + 0.05).toFixed(2))
    };
  });
  
  return result;
};

// Blockchain-related API functions
export const fetchFantasyTokens = async (): Promise<FantasyToken[]> => {
  return blockchainService.getFantasyTokens();
};

export const fetchTeamToken = async (teamId: string): Promise<FantasyToken | null> => {
  const tokens = await blockchainService.getTokensByTeam(teamId);
  return tokens.length > 0 ? tokens[0] : null;
};

export const fetchUserWallet = async (address: string): Promise<UserWallet | null> => {
  return blockchainService.getUserWallet(address);
};

export const fetchTokenTransactions = async (tokenId: string): Promise<TokenTransaction[]> => {
  return blockchainService.getTokenTransactions(tokenId);
};

export const fetchSmartContractEvents = async (tokenId: string): Promise<SmartContractEvent[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return mock smart contract events for the specified token
  return [
    {
      id: "1",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      eventName: "Transfer",
      contractAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      blockNumber: 12345678,
      tokenId
    },
    {
      id: "2",
      timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
      eventName: "Approval",
      contractAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      blockNumber: 12345670,
      tokenId
    },
    {
      id: "3",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      eventName: "Mint",
      contractAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      blockNumber: 12345660,
      tokenId
    },
    {
      id: "4",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      eventName: "Transfer",
      contractAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      blockNumber: 12345650,
      tokenId
    },
    {
      id: "5",
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      eventName: "OwnershipTransferred",
      contractAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      blockNumber: 12345600,
      tokenId
    }
  ];
};

export const buyFantasyTokens = async (
  tokenId: string, 
  amount: number, 
  userAddress: string
): Promise<TokenTransaction> => {
  return blockchainService.buyTokens(tokenId, amount, userAddress);
};

// Utility function to get a base price for a symbol
function getBasePrice(symbol: string): number {
  switch (symbol) {
    case 'GRYN': return 150;
    case 'SLYN': return 190;
    case 'HUFF': return 95;
    case 'RAVN': return 125;
    case 'PUDL': return 210;
    case 'HOLY': return 175;
    case 'CHUD': return 45;
    case 'WIMB': return 90;
    default: return 100 + (symbol.charCodeAt(0) % 10) * 10; // Generate based on first character
  }
}
