
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RiskMetrics } from "@/types/market";
import { TrendingUp, TrendingDown, AlertTriangle, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface RiskAnalyzerProps {
  teamName: string;
  teamSymbol: string;
  metrics: RiskMetrics;
}

const RiskAnalyzer: React.FC<RiskAnalyzerProps> = ({ 
  teamName, 
  teamSymbol, 
  metrics 
}) => {
  // Utility functions for risk metrics interpretation
  const getVolatilityLevel = (vol: number) => {
    if (vol < 0.3) return { label: "Low", color: "green" };
    if (vol < 0.5) return { label: "Medium", color: "yellow" };
    return { label: "High", color: "red" };
  };
  
  const getBetaDescription = (beta: number) => {
    if (beta < 0.8) return { label: "Defensive", color: "blue" };
    if (beta < 1.2) return { label: "Market", color: "purple" };
    return { label: "Aggressive", color: "orange" };
  };
  
  const getSharpeRating = (sharpe: number) => {
    if (sharpe < 0) return { label: "Poor", color: "red" };
    if (sharpe < 1) return { label: "Below Average", color: "orange" };
    if (sharpe < 2) return { label: "Good", color: "green" };
    return { label: "Excellent", color: "emerald" };
  };
  
  const volLevel = getVolatilityLevel(metrics.volatility);
  const betaDesc = getBetaDescription(metrics.beta);
  const sharpeRating = getSharpeRating(metrics.sharpeRatio);
  
  return (
    <Card className="goblin-card h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-wizarding flex items-center">
          <Shield className="h-5 w-5 mr-2 text-gringotts-gold" />
          Seeker Risk Profile: {teamName} ({teamSymbol})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Volatility (Snitch Evasiveness)</span>
              <span className={cn(
                "text-sm font-medium",
                volLevel.color === "green" && "text-green-500",
                volLevel.color === "yellow" && "text-yellow-500",
                volLevel.color === "red" && "text-red-500"
              )}>
                {volLevel.label} ({(metrics.volatility * 100).toFixed(1)}%)
              </span>
            </div>
            <Progress 
              value={metrics.volatility * 100} 
              max={70} 
              className={cn(
                "h-2",
                volLevel.color === "green" && "bg-green-100",
                volLevel.color === "yellow" && "bg-yellow-100",
                volLevel.color === "red" && "bg-red-100"
              )}
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Beta (Team Correlation)</span>
              <span className={cn(
                "text-sm font-medium",
                betaDesc.color === "blue" && "text-blue-500",
                betaDesc.color === "purple" && "text-purple-500",
                betaDesc.color === "orange" && "text-orange-500"
              )}>
                {betaDesc.label} ({metrics.beta.toFixed(2)})
              </span>
            </div>
            <Progress 
              value={metrics.beta * 50} 
              max={100} 
              className={cn(
                "h-2",
                betaDesc.color === "blue" && "bg-blue-100",
                betaDesc.color === "purple" && "bg-purple-100",
                betaDesc.color === "orange" && "bg-orange-100"
              )}
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Sharpe Ratio (Seeker Efficiency)</span>
              <span className={cn(
                "text-sm font-medium",
                sharpeRating.color === "red" && "text-red-500",
                sharpeRating.color === "orange" && "text-orange-500",
                sharpeRating.color === "green" && "text-green-500",
                sharpeRating.color === "emerald" && "text-emerald-500"
              )}>
                {sharpeRating.label} ({metrics.sharpeRatio.toFixed(2)})
              </span>
            </div>
            <Progress 
              value={(metrics.sharpeRatio + 1) * 33.3} 
              max={100} 
              className={cn(
                "h-2",
                sharpeRating.color === "red" && "bg-red-100",
                sharpeRating.color === "orange" && "bg-orange-100",
                sharpeRating.color === "green" && "bg-green-100",
                sharpeRating.color === "emerald" && "bg-emerald-100"
              )}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-gringotts-parchment/50 p-3 rounded-md">
              <div className="text-sm font-medium mb-1 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-1 text-red-500" />
                Maximum Drawdown
              </div>
              <div className="text-xl font-bold text-gringotts-burgundy">
                {(metrics.maxDrawdown * 100).toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground">
                Worst historical drop
              </div>
            </div>
            
            <div className="bg-gringotts-parchment/50 p-3 rounded-md">
              <div className="text-sm font-medium mb-1 flex items-center">
                <Shield className="h-4 w-4 mr-1 text-blue-500" />
                Value at Risk (1d, 95%)
              </div>
              <div className="text-xl font-bold text-gringotts-burgundy">
                {(metrics.valueAtRisk * 100).toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground">
                Potential daily loss
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskAnalyzer;
