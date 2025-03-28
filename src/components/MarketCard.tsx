
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Team } from "@/types/market";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MarketCardProps {
  team: Team;
  onClick?: () => void;
}

const MarketCard: React.FC<MarketCardProps> = ({ team, onClick }) => {
  const isPositive = team.change >= 0;
  
  return (
    <Card 
      className={cn(
        "goblin-card cursor-pointer hover:shadow-lg transition-shadow duration-300",
        "border-l-4",
        isPositive ? "border-l-green-500" : "border-l-red-500"
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-wizarding flex items-center">
            <div 
              className="w-4 h-4 rounded-full mr-2" 
              style={{ backgroundColor: team.color }} 
            />
            {team.name}
          </CardTitle>
          <span className="text-xs font-medium bg-gringotts-parchment px-2 py-1 rounded-full">
            {team.symbol}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-gringotts-gold">${team.price.toFixed(2)}</div>
          <div className={cn(
            "flex items-center text-sm font-medium",
            isPositive ? "text-green-500" : "text-red-500"
          )}>
            {isPositive ? (
              <TrendingUp className="h-4 w-4 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 mr-1" />
            )}
            <span>{team.change.toFixed(2)} ({team.changePercent.toFixed(2)}%)</span>
          </div>
        </div>
        <div className="mt-2 text-xs text-muted-foreground">
          Vol: {(team.volume / 1000).toFixed(0)}K | Cap: ${(team.marketCap / 1000000).toFixed(0)}M
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketCard;
