
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  fetchTeams, 
  fetchMarketNews, 
  fetchOptionChain,
  fetchRiskMetrics
} from "@/services/marketApi";
import { Team, MarketNews, OptionChain, RiskMetrics } from "@/types/market";
import Navigation from "@/components/Navigation";
import MarketCard from "@/components/MarketCard";
import NewsCard from "@/components/NewsCard";
import MarketSummary from "@/components/MarketSummary";
import OptionChainVisualizer from "@/components/OptionChainVisualizer";
import RiskAnalyzer from "@/components/RiskAnalyzer";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  
  // Fetch teams data
  const { data: teams, isLoading: teamsLoading } = useQuery({
    queryKey: ['teams'],
    queryFn: fetchTeams,
  });
  
  // Fetch market news
  const { data: news, isLoading: newsLoading } = useQuery({
    queryKey: ['marketNews'],
    queryFn: fetchMarketNews,
  });
  
  // Get selected team data
  const selectedTeamData = teams?.find(team => team.id === selectedTeam);
  
  // Fetch option chain for selected team
  const { data: optionChain, isLoading: optionChainLoading } = useQuery({
    queryKey: ['optionChain', selectedTeam],
    queryFn: () => fetchOptionChain(selectedTeamData?.symbol || ''),
    enabled: !!selectedTeamData,
  });
  
  // Fetch risk metrics for selected team
  const { data: riskMetrics, isLoading: riskMetricsLoading } = useQuery({
    queryKey: ['riskMetrics', selectedTeam],
    queryFn: () => fetchRiskMetrics([selectedTeam!]),
    enabled: !!selectedTeam,
  });
  
  useEffect(() => {
    // Set default selected team if teams are loaded and none is selected
    if (teams && teams.length > 0 && !selectedTeam) {
      setSelectedTeam(teams[0].id);
      toast({
        title: "Welcome to Gringotts Trading",
        description: "The wizarding financial markets are open for business!",
      });
    }
  }, [teams, selectedTeam, toast]);
  
  // Calculate market summary
  const calculateMarketSummary = (teamsData: Team[] | undefined) => {
    if (!teamsData || teamsData.length === 0) {
      return {
        marketValue: 0,
        marketChange: 0,
        topGainer: { name: "", change: 0 },
        topLoser: { name: "", change: 0 },
        totalVolume: 0
      };
    }
    
    let totalMarketValue = 0;
    let totalChange = 0;
    let totalVolume = 0;
    let topGainer = { name: teamsData[0].abbreviation, change: teamsData[0].changePercent };
    let topLoser = { name: teamsData[0].abbreviation, change: teamsData[0].changePercent };
    
    teamsData.forEach(team => {
      totalMarketValue += team.marketCap;
      totalChange += team.changePercent * team.marketCap; // Weighted change
      totalVolume += team.volume;
      
      if (team.changePercent > topGainer.change) {
        topGainer = { name: team.abbreviation, change: team.changePercent };
      }
      
      if (team.changePercent < topLoser.change) {
        topLoser = { name: team.abbreviation, change: team.changePercent };
      }
    });
    
    // Calculate weighted average market change
    const marketChange = totalChange / totalMarketValue;
    
    return {
      marketValue: totalMarketValue,
      marketChange,
      topGainer,
      topLoser,
      totalVolume
    };
  };
  
  const marketSummary = calculateMarketSummary(teams);
  
  const handleTeamSelect = (teamId: string) => {
    setSelectedTeam(teamId);
    const team = teams?.find(t => t.id === teamId);
    if (team) {
      toast({
        title: `${team.name} Selected`,
        description: `Current price: $${team.price.toFixed(2)}`,
      });
    }
  };
  
  return (
    <div className="min-h-screen pb-16">
      <Navigation />
      
      <main className="container px-4 mx-auto pt-20">
        <h1 className="text-3xl font-wizarding mb-6 text-center text-gringotts-burgundy">
          Gringotts Trading Pitch: Quidditch Finance Simulator
        </h1>
        
        {/* Market Summary */}
        <section className="mb-8">
          <MarketSummary {...marketSummary} />
        </section>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Teams Section */}
          <section className="lg:col-span-1">
            <h2 className="text-xl font-wizarding mb-4">Quidditch Teams Market</h2>
            <div className="space-y-4">
              {teamsLoading ? (
                <div className="animate-pulse space-y-4">
                  {[1, 2, 3, 4].map(i => (
                    <div 
                      key={i} 
                      className="h-32 bg-muted rounded shadow-sm"
                    />
                  ))}
                </div>
              ) : (
                <>
                  {teams?.map(team => (
                    <MarketCard 
                      key={team.id} 
                      team={team} 
                      onClick={() => handleTeamSelect(team.id)}
                    />
                  ))}
                </>
              )}
            </div>
          </section>
          
          {/* Main Content - Risk and Options */}
          <section className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {/* Selected Team Options Chain */}
              {selectedTeamData && optionChain && (
                <OptionChainVisualizer 
                  options={optionChain} 
                  currentPrice={selectedTeamData.price}
                  symbol={selectedTeamData.symbol}
                />
              )}
              
              {/* Risk Analysis */}
              {selectedTeamData && riskMetrics && riskMetrics[selectedTeam!] && (
                <RiskAnalyzer 
                  teamName={selectedTeamData.name}
                  teamSymbol={selectedTeamData.symbol}
                  metrics={riskMetrics[selectedTeam!]}
                />
              )}
            </div>
            
            {/* Market News */}
            <div>
              <h2 className="text-xl font-wizarding mb-4">Wizarding Financial News</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {newsLoading ? (
                  <div className="animate-pulse space-y-4 md:col-span-2">
                    {[1, 2].map(i => (
                      <div 
                        key={i} 
                        className="h-40 bg-muted rounded shadow-sm"
                      />
                    ))}
                  </div>
                ) : (
                  news?.map(item => (
                    <NewsCard key={item.id} news={item} />
                  ))
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="mt-12 py-6 border-t border-gringotts-gold/30">
        <div className="container px-4 mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Gringotts Trading | The Premier Wizarding Financial Platform
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            <span className="font-goblin">Warning:</span> Investing in magical markets involves substantial risk.
            Past performance of Quidditch teams is not indicative of future results.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
