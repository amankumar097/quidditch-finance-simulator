
import { FantasyToken, TokenTransaction, UserWallet, BlockchainNetwork, SmartContractEvent } from "@/types/market";

// Mock blockchain service - in a real app, this would connect to Web3 providers or blockchain APIs
class BlockchainService {
  private mockTokens: FantasyToken[] = [];
  private mockTransactions: TokenTransaction[] = [];
  private mockWallets: Record<string, UserWallet> = {};
  private mockEvents: SmartContractEvent[] = [];

  constructor() {
    // Initialize with mock data
    this.initializeMockData();
  }

  private initializeMockData(): void {
    // Create fantasy tokens for each team
    this.mockTokens = [
      {
        id: "token-1",
        teamId: "1",
        name: "Gryffindor Lion Token",
        symbol: "GRYN",
        contractAddress: "0x7c2C195CD6D34B8F845992d380aADB2730bB9C6F",
        network: "Ethereum",
        totalSupply: 1000000,
        circulatingSupply: 750000,
        price: 0.025,
        change24h: 5.2,
        marketCap: 18750,
        holders: 1240
      },
      {
        id: "token-2",
        teamId: "2",
        name: "Slytherin Serpent Token",
        symbol: "SLYN",
        contractAddress: "0x8D3E4LF28D6A34B9F825992d380aADB2730bB9C6F",
        network: "Polygon",
        totalSupply: 2000000,
        circulatingSupply: 1200000,
        price: 0.031,
        change24h: -2.8,
        marketCap: 37200,
        holders: 1855
      },
      {
        id: "token-3",
        teamId: "3",
        name: "Hufflepuff Badger Token",
        symbol: "HUFF",
        contractAddress: "0x9F4C195CD6D34B8F845992d380aADB2730bB9C6F",
        network: "Binance Smart Chain",
        totalSupply: 5000000,
        circulatingSupply: 3750000,
        price: 0.008,
        change24h: 1.2,
        marketCap: 30000,
        holders: 2120
      },
      {
        id: "token-4",
        teamId: "4",
        name: "Ravenclaw Eagle Token",
        symbol: "RAVN",
        contractAddress: "0x1A2B195CD6D34B8F845992d380aADB2730bB9C6F",
        network: "Avalanche",
        totalSupply: 800000,
        circulatingSupply: 650000,
        price: 0.018,
        change24h: 3.5,
        marketCap: 11700,
        holders: 980
      },
      {
        id: "token-5",
        teamId: "5",
        name: "Puddlemere United Token",
        symbol: "PUDL",
        contractAddress: "0x3F5E195CD6D34B8F845992d380aADB2730bB9C6F",
        network: "Ethereum",
        totalSupply: 1500000,
        circulatingSupply: 1200000,
        price: 0.042,
        change24h: 7.8,
        marketCap: 50400,
        holders: 2450
      }
    ];

    // Create a mock wallet
    this.mockWallets["0xUserWalletAddress"] = {
      address: "0xUserWalletAddress",
      network: "Ethereum",
      balances: [
        { tokenId: "token-1", balance: 5000 },
        { tokenId: "token-5", balance: 2500 }
      ]
    };

    // Create some mock transactions
    this.mockTransactions = [
      {
        id: "tx-1",
        tokenId: "token-1",
        fromAddress: "0xTeamTreasuryAddress",
        toAddress: "0xUserWalletAddress",
        amount: 5000,
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        txHash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
        status: "confirmed",
        network: "Ethereum"
      },
      {
        id: "tx-2",
        tokenId: "token-5",
        fromAddress: "0xTeamTreasuryAddress",
        toAddress: "0xUserWalletAddress",
        amount: 2500,
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        txHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
        status: "confirmed",
        network: "Ethereum"
      }
    ];

    // Create some mock smart contract events
    this.mockEvents = [
      {
        id: "event-1",
        contractAddress: "0x7c2C195CD6D34B8F845992d380aADB2730bB9C6F",
        eventName: "Transfer",
        parameters: {
          from: "0xTeamTreasuryAddress",
          to: "0xUserWalletAddress",
          value: "5000000000000000000000"
        },
        blockNumber: 15424871,
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        txHash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
        network: "Ethereum"
      },
      {
        id: "event-2",
        contractAddress: "0x3F5E195CD6D34B8F845992d380aADB2730bB9C6F",
        eventName: "PerformanceUpdate",
        parameters: {
          teamId: "5",
          oldScore: "75",
          newScore: "85",
          matchId: "match-123"
        },
        blockNumber: 15427912,
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        txHash: "0x0987654321fedcba0987654321fedcba0987654321fedcba0987654321fedcba",
        network: "Ethereum"
      }
    ];
  }

  // Get all fantasy tokens
  public async getFantasyTokens(): Promise<FantasyToken[]> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    return [...this.mockTokens];
  }

  // Get token by id
  public async getTokenById(tokenId: string): Promise<FantasyToken | null> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return this.mockTokens.find(token => token.id === tokenId) || null;
  }

  // Get tokens for a team
  public async getTokensByTeam(teamId: string): Promise<FantasyToken[]> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return this.mockTokens.filter(token => token.teamId === teamId);
  }

  // Get user wallet
  public async getUserWallet(address: string): Promise<UserWallet | null> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 900));
    return this.mockWallets[address] || null;
  }

  // Get token transactions
  public async getTokenTransactions(tokenId: string): Promise<TokenTransaction[]> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1100));
    return this.mockTransactions.filter(tx => tx.tokenId === tokenId);
  }

  // Get user transactions
  public async getUserTransactions(address: string): Promise<TokenTransaction[]> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1300));
    return this.mockTransactions.filter(tx => 
      tx.fromAddress === address || tx.toAddress === address
    );
  }

  // Buy tokens (mock implementation)
  public async buyTokens(tokenId: string, amount: number, userAddress: string): Promise<TokenTransaction> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const token = this.mockTokens.find(t => t.id === tokenId);
    if (!token) {
      throw new Error("Token not found");
    }

    // Create a new transaction
    const newTx: TokenTransaction = {
      id: `tx-${Date.now()}`,
      tokenId,
      fromAddress: token.contractAddress,
      toAddress: userAddress,
      amount,
      timestamp: new Date().toISOString(),
      txHash: `0x${Math.random().toString(16).substr(2, 64)}`,
      status: "pending",
      network: token.network
    };

    // Add to mock transactions
    this.mockTransactions.push(newTx);

    // Update user wallet
    if (!this.mockWallets[userAddress]) {
      this.mockWallets[userAddress] = {
        address: userAddress,
        network: token.network,
        balances: []
      };
    }

    const walletBalance = this.mockWallets[userAddress].balances.find(b => b.tokenId === tokenId);
    if (walletBalance) {
      walletBalance.balance += amount;
    } else {
      this.mockWallets[userAddress].balances.push({
        tokenId,
        balance: amount
      });
    }

    // Simulate blockchain delay then update transaction status
    setTimeout(() => {
      newTx.status = "confirmed";
      
      // Create a new transfer event
      const newEvent: SmartContractEvent = {
        id: `event-${Date.now()}`,
        contractAddress: token.contractAddress,
        eventName: "Transfer",
        parameters: {
          from: token.contractAddress,
          to: userAddress,
          value: (amount * Math.pow(10, 18)).toString()
        },
        blockNumber: 15430000 + Math.floor(Math.random() * 10000),
        timestamp: new Date().toISOString(),
        txHash: newTx.txHash,
        network: token.network
      };

      this.mockEvents.push(newEvent);
    }, 3000);

    return newTx;
  }

  // Get smart contract events
  public async getSmartContractEvents(contractAddress: string): Promise<SmartContractEvent[]> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return this.mockEvents.filter(event => event.contractAddress === contractAddress);
  }
}

// Export a singleton instance
export const blockchainService = new BlockchainService();
