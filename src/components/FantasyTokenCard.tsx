
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coins, ArrowUp, ArrowDown, Users } from "lucide-react";
import { FantasyToken } from "@/types/market";
import { cn } from "@/lib/utils";

interface FantasyTokenCardProps {
  token: FantasyToken;
  onBuy?: () => void;
}

const FantasyTokenCard: React.FC<FantasyTokenCardProps> = ({ token, onBuy }) => {
  const formatNumber = (num: number) => {
    return num >= 1000000
      ? `${(num / 1000000).toFixed(2)}M`
      : num >= 1000
      ? `${(num / 1000).toFixed(2)}K`
      : num.toString();
  };

  return (
    <Card className="fantasy-token-card w-full animate-float border-2" style={{ borderColor: token.change24h >= 0 ? '#22c55e' : '#ef4444' }}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center text-lg font-wizarding">
              <Coins className="mr-2 h-5 w-5 text-gringotts-gold" />
              {token.name}
            </CardTitle>
            <CardDescription>{token.symbol} • {token.network}</CardDescription>
          </div>
          <div className={cn(
            "text-lg font-bold flex items-center",
            token.change24h >= 0 ? "text-green-500" : "text-red-500"
          )}>
            {token.change24h >= 0 
              ? <ArrowUp className="mr-1 h-4 w-4" /> 
              : <ArrowDown className="mr-1 h-4 w-4" />}
            {Math.abs(token.change24h).toFixed(2)}%
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-background rounded-lg p-2">
            <div className="text-sm text-muted-foreground">Price</div>
            <div className="text-lg font-semibold">${token.price.toFixed(5)}</div>
          </div>
          <div className="bg-background rounded-lg p-2">
            <div className="text-sm text-muted-foreground">Market Cap</div>
            <div className="text-lg font-semibold">${formatNumber(token.marketCap)}</div>
          </div>
          <div className="bg-background rounded-lg p-2">
            <div className="text-sm text-muted-foreground">Circulating Supply</div>
            <div className="text-lg font-semibold">{formatNumber(token.circulatingSupply)}</div>
          </div>
          <div className="bg-background rounded-lg p-2">
            <div className="text-sm flex items-center text-muted-foreground">
              <Users className="mr-1 h-3 w-3" /> Holders
            </div>
            <div className="text-lg font-semibold">{formatNumber(token.holders)}</div>
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground mb-2">
          Contract: {token.contractAddress.substring(0, 8)}...{token.contractAddress.substring(token.contractAddress.length - 6)}
        </div>
        
        {onBuy && (
          <Button 
            onClick={onBuy} 
            className="w-full bg-gringotts-gold hover:bg-gringotts-gold/90 text-gringotts-burgundy"
          >
            Buy {token.symbol} Tokens
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default FantasyTokenCard;
