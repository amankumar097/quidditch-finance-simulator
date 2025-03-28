
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleDollarSign, TrendingUp, TrendingDown, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface MarketSummaryProps {
  marketValue: number;
  marketChange: number;
  topGainer: { name: string; change: number };
  topLoser: { name: string; change: number };
  totalVolume: number;
}

const MarketSummary: React.FC<MarketSummaryProps> = ({
  marketValue,
  marketChange,
  topGainer,
  topLoser,
  totalVolume
}) => {
  const isPositive = marketChange >= 0;
  
  return (
    <Card className="goblin-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-wizarding">Wizarding Market Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-gringotts-parchment/50 p-3 rounded-md">
            <div className="text-sm font-medium mb-1 flex items-center">
              <CircleDollarSign className="h-4 w-4 mr-1 text-gringotts-gold" />
              Market Value
            </div>
            <div className="text-xl font-bold text-gringotts-burgundy">
              {marketValue.toLocaleString()} G
            </div>
            <div className={cn(
              "text-xs flex items-center",
              isPositive ? "text-green-500" : "text-red-500"
            )}>
              {isPositive ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              <span>{marketChange > 0 ? "+" : ""}{marketChange.toFixed(2)}%</span>
            </div>
          </div>
          
          <div className="bg-gringotts-parchment/50 p-3 rounded-md">
            <div className="text-sm font-medium mb-1 flex items-center">
              <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
              Top Gainer
            </div>
            <div className="text-xl font-bold text-gringotts-burgundy">
              {topGainer.name}
            </div>
            <div className="text-xs text-green-500">
              +{topGainer.change.toFixed(2)}%
            </div>
          </div>
          
          <div className="bg-gringotts-parchment/50 p-3 rounded-md">
            <div className="text-sm font-medium mb-1 flex items-center">
              <TrendingDown className="h-4 w-4 mr-1 text-red-500" />
              Top Loser
            </div>
            <div className="text-xl font-bold text-gringotts-burgundy">
              {topLoser.name}
            </div>
            <div className="text-xs text-red-500">
              {topLoser.change.toFixed(2)}%
            </div>
          </div>
          
          <div className="bg-gringotts-parchment/50 p-3 rounded-md">
            <div className="text-sm font-medium mb-1 flex items-center">
              <BarChart3 className="h-4 w-4 mr-1 text-gringotts-burgundy" />
              Trading Volume
            </div>
            <div className="text-xl font-bold text-gringotts-burgundy">
              {(totalVolume / 1000000).toFixed(1)}M
            </div>
            <div className="text-xs text-muted-foreground">
              Galleons exchanged
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketSummary;
