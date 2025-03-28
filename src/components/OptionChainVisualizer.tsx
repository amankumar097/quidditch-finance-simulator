
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OptionChain } from "@/types/market";
import { cn } from "@/lib/utils";

interface OptionChainVisualizerProps {
  options: OptionChain[];
  currentPrice: number;
  symbol: string;
}

const OptionChainVisualizer: React.FC<OptionChainVisualizerProps> = ({ 
  options, 
  currentPrice,
  symbol 
}) => {
  const [activeTab, setActiveTab] = useState("calls");
  
  // Find max values for visualization scaling
  const maxCallVolume = Math.max(...options.map(o => o.callVolume));
  const maxPutVolume = Math.max(...options.map(o => o.putVolume));
  
  // Calculate which strikes are in-the-money
  const getMoneyStatus = (strike: number, isCall: boolean) => {
    if (isCall) {
      return currentPrice > strike ? "in-the-money" : "out-of-the-money";
    } else {
      return currentPrice < strike ? "in-the-money" : "out-of-the-money";
    }
  };
  
  return (
    <Card className="goblin-card animate-float">
      <CardHeader>
        <CardTitle className="text-xl font-wizarding">
          Bludger Attack Patterns for {symbol}
        </CardTitle>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calls" className="font-wizarding">Golden Bludgers (Calls)</TabsTrigger>
            <TabsTrigger value="puts" className="font-wizarding">Iron Bludgers (Puts)</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <TabsContent value="calls" className="mt-0">
            <div className="space-y-2">
              {options.map((option) => (
                <div key={`call-${option.strike}`} className="relative">
                  <div className="flex justify-between items-center mb-1">
                    <span className={cn(
                      "text-sm font-medium",
                      getMoneyStatus(option.strike, true) === "in-the-money" 
                        ? "text-green-600" 
                        : "text-muted-foreground"
                    )}>
                      Strike: ${option.strike.toFixed(1)}
                    </span>
                    <span className="text-xs">
                      IV: {(option.callImpliedVolatility * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 text-xs text-right">
                      Vol: {option.callVolume}
                    </div>
                    <div className="flex-1 bg-muted rounded-full h-6 overflow-hidden flex items-center">
                      <div 
                        className={cn(
                          "h-full flex items-center justify-end px-2 transition-all",
                          getMoneyStatus(option.strike, true) === "in-the-money" 
                            ? "bg-gradient-to-r from-yellow-300 to-gringotts-gold" 
                            : "bg-gradient-to-r from-amber-200 to-amber-300"
                        )}
                        style={{ 
                          width: `${(option.callVolume / maxCallVolume) * 100}%`,
                        }}
                      >
                        <span className="text-xs font-medium text-gringotts-burgundy">
                          {option.callOpenInterest > 1000 ? `${(option.callOpenInterest / 1000).toFixed(1)}K` : option.callOpenInterest}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="puts" className="mt-0">
            <div className="space-y-2">
              {options.map((option) => (
                <div key={`put-${option.strike}`} className="relative">
                  <div className="flex justify-between items-center mb-1">
                    <span className={cn(
                      "text-sm font-medium",
                      getMoneyStatus(option.strike, false) === "in-the-money" 
                        ? "text-green-600" 
                        : "text-muted-foreground"
                    )}>
                      Strike: ${option.strike.toFixed(1)}
                    </span>
                    <span className="text-xs">
                      IV: {(option.putImpliedVolatility * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 text-xs text-right">
                      Vol: {option.putVolume}
                    </div>
                    <div className="flex-1 bg-muted rounded-full h-6 overflow-hidden flex items-center">
                      <div 
                        className={cn(
                          "h-full flex items-center justify-end px-2 transition-all",
                          getMoneyStatus(option.strike, false) === "in-the-money" 
                            ? "bg-gradient-to-r from-gray-500 to-gray-700" 
                            : "bg-gradient-to-r from-gray-300 to-gray-400"
                        )}
                        style={{ 
                          width: `${(option.putVolume / maxPutVolume) * 100}%`,
                        }}
                      >
                        <span className="text-xs font-medium text-white">
                          {option.putOpenInterest > 1000 ? `${(option.putOpenInterest / 1000).toFixed(1)}K` : option.putOpenInterest}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </div>
      </CardContent>
    </Card>
  );
};

export default OptionChainVisualizer;
