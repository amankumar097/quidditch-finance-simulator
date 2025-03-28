
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTeams } from "@/services/marketApi";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CircleDollarSign, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

const Portfolio = () => {
  const { toast } = useToast();
  const [selectedTeam, setSelectedTeam] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [portfolio, setPortfolio] = useState<{
    cash: number;
    positions: Array<{
      symbol: string;
      name: string;
      shares: number;
      avgCost: number;
      currentPrice: number;
      currentValue: number;
      color: string;
    }>;
  }>({
    cash: 10000,
    positions: []
  });
  
  const { data: teams, isLoading } = useQuery({
    queryKey: ['teams'],
    queryFn: fetchTeams,
  });
  
  // Calculate total portfolio value
  const totalValue = portfolio.cash + portfolio.positions.reduce((sum, pos) => sum + pos.currentValue, 0);
  
  // Calculate total gain/loss
  const totalCost = portfolio.positions.reduce((sum, pos) => sum + (pos.avgCost * pos.shares), 0);
  const totalGainLoss = portfolio.positions.reduce(
    (sum, pos) => sum + ((pos.currentPrice - pos.avgCost) * pos.shares), 
    0
  );
  const totalGainLossPercent = totalCost > 0 ? (totalGainLoss / totalCost) * 100 : 0;
  
  const handleBuy = () => {
    const team = teams?.find(t => t.symbol === selectedTeam);
    if (!team) {
      toast({
        title: "Error",
        description: "Please select a valid team",
        variant: "destructive"
      });
      return;
    }
    
    const shares = parseInt(quantity);
    if (isNaN(shares) || shares <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid quantity",
        variant: "destructive"
      });
      return;
    }
    
    const cost = shares * team.price;
    if (cost > portfolio.cash) {
      toast({
        title: "Insufficient Funds",
        description: "You don't have enough Galleons for this purchase",
        variant: "destructive"
      });
      return;
    }
    
    // Update portfolio
    setPortfolio(prev => {
      const existingPosition = prev.positions.find(p => p.symbol === team.symbol);
      
      if (existingPosition) {
        // Update existing position
        const newTotalShares = existingPosition.shares + shares;
        const newTotalCost = (existingPosition.shares * existingPosition.avgCost) + (shares * team.price);
        const newAvgCost = newTotalCost / newTotalShares;
        
        return {
          cash: prev.cash - cost,
          positions: prev.positions.map(p => 
            p.symbol === team.symbol 
              ? {
                  ...p,
                  shares: newTotalShares,
                  avgCost: newAvgCost,
                  currentValue: newTotalShares * team.price
                }
              : p
          )
        };
      } else {
        // Add new position
        return {
          cash: prev.cash - cost,
          positions: [
            ...prev.positions,
            {
              symbol: team.symbol,
              name: team.name,
              shares,
              avgCost: team.price,
              currentPrice: team.price,
              currentValue: shares * team.price,
              color: team.color
            }
          ]
        };
      }
    });
    
    toast({
      title: "Purchase Successful",
      description: `Bought ${shares} shares of ${team.name}`,
    });
  };
  
  const handleSell = (symbol: string) => {
    const position = portfolio.positions.find(p => p.symbol === symbol);
    if (!position) return;
    
    const team = teams?.find(t => t.symbol === symbol);
    if (!team) return;
    
    const saleValue = position.shares * team.price;
    
    setPortfolio(prev => ({
      cash: prev.cash + saleValue,
      positions: prev.positions.filter(p => p.symbol !== symbol)
    }));
    
    toast({
      title: "Sale Successful",
      description: `Sold ${position.shares} shares of ${position.name} for ${saleValue.toFixed(2)} Galleons`,
    });
  };
  
  const refreshPrices = () => {
    if (!teams) return;
    
    setPortfolio(prev => ({
      ...prev,
      positions: prev.positions.map(pos => {
        const team = teams.find(t => t.symbol === pos.symbol);
        if (!team) return pos;
        
        return {
          ...pos,
          currentPrice: team.price,
          currentValue: pos.shares * team.price
        };
      })
    }));
    
    toast({
      title: "Prices Updated",
      description: "Latest Quidditch team values loaded from Gringotts",
    });
  };
  
  return (
    <div className="min-h-screen pb-16">
      <Navigation />
      
      <main className="container px-4 mx-auto pt-20">
        <h1 className="text-3xl font-wizarding mb-6 text-center text-gringotts-burgundy">
          Your Trading Portfolio
        </h1>
        
        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="goblin-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Wallet className="h-5 w-5 mr-2 text-gringotts-gold" />
                Total Value
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gringotts-burgundy">
                {totalValue.toFixed(2)} G
              </div>
              <div className="text-xs text-muted-foreground">
                Your complete wizarding wealth
              </div>
            </CardContent>
          </Card>
          
          <Card className="goblin-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <CircleDollarSign className="h-5 w-5 mr-2 text-gringotts-gold" />
                Available Cash
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gringotts-burgundy">
                {portfolio.cash.toFixed(2)} G
              </div>
              <div className="text-xs text-muted-foreground">
                Ready for investment
              </div>
            </CardContent>
          </Card>
          
          <Card className="goblin-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                {totalGainLoss >= 0 ? (
                  <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
                ) : (
                  <TrendingDown className="h-5 w-5 mr-2 text-red-500" />
                )}
                Total Gain/Loss
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={cn(
                "text-2xl font-bold",
                totalGainLoss >= 0 ? "text-green-500" : "text-red-500"
              )}>
                {totalGainLoss >= 0 ? "+" : ""}{totalGainLoss.toFixed(2)} G
              </div>
              <div className={cn(
                "text-xs",
                totalGainLoss >= 0 ? "text-green-500" : "text-red-500"
              )}>
                {totalGainLossPercent >= 0 ? "+" : ""}{totalGainLossPercent.toFixed(2)}%
              </div>
            </CardContent>
          </Card>
          
          <Card className="goblin-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                Team Positions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gringotts-burgundy">
                {portfolio.positions.length}
              </div>
              <div className="text-xs text-muted-foreground">
                Unique teams in portfolio
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Trading Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="goblin-card">
            <CardHeader>
              <CardTitle className="text-xl font-wizarding">Trade Quidditch Teams</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Select Team</label>
                  <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                    <SelectTrigger className="magical-input">
                      <SelectValue placeholder="Choose a team" />
                    </SelectTrigger>
                    <SelectContent>
                      {isLoading ? (
                        <SelectItem value="loading" disabled>Loading teams...</SelectItem>
                      ) : (
                        teams?.map(team => (
                          <SelectItem key={team.id} value={team.symbol}>
                            {team.name} - ${team.price.toFixed(2)}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Quantity</label>
                  <Input 
                    type="number" 
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="magical-input"
                  />
                </div>
                
                <div>
                  <Button 
                    onClick={handleBuy}
                    className="w-full bg-gringotts-gold hover:bg-gringotts-darkGold text-gringotts-burgundy"
                    disabled={!selectedTeam || !quantity || isLoading}
                  >
                    Buy Shares
                  </Button>
                </div>
                
                <div className="text-xs text-muted-foreground mt-2">
                  <p>
                    Cost: {!isLoading && selectedTeam ? 
                      `${(parseInt(quantity || "0") * (teams?.find(t => t.symbol === selectedTeam)?.price || 0)).toFixed(2)} G` : 
                      "0.00 G"
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="goblin-card lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-wizarding">Your Holdings</CardTitle>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={refreshPrices}
                className="border-gringotts-gold text-gringotts-burgundy"
              >
                Refresh Prices
              </Button>
            </CardHeader>
            <CardContent>
              {portfolio.positions.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">You don't own any Quidditch team shares yet.</p>
                  <p className="text-sm text-muted-foreground">Use the trading interface to build your portfolio.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Team</TableHead>
                      <TableHead className="text-right">Shares</TableHead>
                      <TableHead className="text-right">Avg Cost</TableHead>
                      <TableHead className="text-right">Current</TableHead>
                      <TableHead className="text-right">Value</TableHead>
                      <TableHead className="text-right">Gain/Loss</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {portfolio.positions.map((position) => {
                      const gainLoss = position.currentPrice - position.avgCost;
                      const gainLossPercent = (gainLoss / position.avgCost) * 100;
                      const totalGainLoss = gainLoss * position.shares;
                      
                      return (
                        <TableRow key={position.symbol}>
                          <TableCell className="font-medium flex items-center">
                            <div 
                              className="w-3 h-3 rounded-full mr-2" 
                              style={{ backgroundColor: position.color }} 
                            />
                            {position.symbol}
                          </TableCell>
                          <TableCell className="text-right">{position.shares}</TableCell>
                          <TableCell className="text-right">{position.avgCost.toFixed(2)}</TableCell>
                          <TableCell className="text-right">{position.currentPrice.toFixed(2)}</TableCell>
                          <TableCell className="text-right">{position.currentValue.toFixed(2)}</TableCell>
                          <TableCell className={cn(
                            "text-right",
                            gainLoss >= 0 ? "text-green-500" : "text-red-500"
                          )}>
                            {totalGainLoss.toFixed(2)} ({gainLossPercent.toFixed(2)}%)
                          </TableCell>
                          <TableCell>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleSell(position.symbol)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              Sell
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Portfolio;
