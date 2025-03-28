
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTeams, fetchRiskMetrics } from "@/services/marketApi";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import RiskAnalyzer from "@/components/RiskAnalyzer";
import { BarChart3, Shield, Wand2 } from "lucide-react";

const Risk = () => {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  
  // Fetch teams data
  const { data: teams, isLoading: teamsLoading } = useQuery({
    queryKey: ['teams'],
    queryFn: fetchTeams,
  });
  
  // Get selected team data
  const selectedTeamData = teams?.find(team => team.id === selectedTeam);
  
  // Fetch risk metrics for all teams
  const { data: allRiskMetrics, isLoading: riskMetricsLoading } = useQuery({
    queryKey: ['allRiskMetrics'],
    queryFn: () => fetchRiskMetrics(teams?.map(t => t.id) || []),
    enabled: !!teams && teams.length > 0,
  });
  
  return (
    <div className="min-h-screen pb-16">
      <Navigation />
      
      <main className="container px-4 mx-auto pt-20">
        <h1 className="text-3xl font-wizarding mb-6 text-center text-gringotts-burgundy">
          Seeker Trajectory Risk Analysis
        </h1>
        
        <div className="max-w-xl mx-auto mb-8">
          <Card className="goblin-card">
            <CardHeader>
              <CardTitle className="text-xl font-wizarding flex items-center">
                <Shield className="h-5 w-5 mr-2 text-gringotts-gold" />
                Team Risk Explorer
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Analyze the risk metrics of Quidditch teams using advanced Seeker trajectory models.
                These metrics help predict future performance and volatility.
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Select Team</label>
                  <Select value={selectedTeam || ''} onValueChange={(value) => setSelectedTeam(value)}>
                    <SelectTrigger className="magical-input">
                      <SelectValue placeholder="Choose a team for risk analysis" />
                    </SelectTrigger>
                    <SelectContent>
                      {teamsLoading ? (
                        <SelectItem value="loading" disabled>Loading teams...</SelectItem>
                      ) : (
                        teams?.map(team => (
                          <SelectItem key={team.id} value={team.id}>
                            {team.name} ({team.symbol})
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {selectedTeamData && allRiskMetrics && allRiskMetrics[selectedTeam!] ? (
          <div className="mb-8">
            <RiskAnalyzer 
              teamName={selectedTeamData.name}
              teamSymbol={selectedTeamData.symbol}
              metrics={allRiskMetrics[selectedTeam!]}
            />
          </div>
        ) : (
          <div className="text-center py-12 bg-gringotts-parchment/30 rounded-lg border border-gringotts-gold/20">
            <h3 className="text-xl font-wizarding mb-2">
              {selectedTeam && riskMetricsLoading ? "Loading risk data..." : "Select a team to view risk analysis"}
            </h3>
          </div>
        )}
        
        {/* Risk Education */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="goblin-card md:col-span-3">
            <CardHeader>
              <CardTitle className="text-xl font-wizarding">Understanding Risk Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-wizarding text-lg mb-2 flex items-center">
                    <Wand2 className="h-4 w-4 mr-2 text-gringotts-gold" />
                    Volatility
                  </h3>
                  <p className="text-sm">
                    Measures how dramatically a team's value fluctuates. Like a Snitch's evasiveness, 
                    high volatility means rapid, unpredictable movements in either direction.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-wizarding text-lg mb-2 flex items-center">
                    <BarChart3 className="h-4 w-4 mr-2 text-gringotts-gold" />
                    Beta
                  </h3>
                  <p className="text-sm">
                    Shows how a team moves in relation to the overall market. A beta of 1.0 means the team
                    matches market movements, while higher values suggest more dramatic responses.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-wizarding text-lg mb-2 flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-gringotts-gold" />
                    Sharpe Ratio
                  </h3>
                  <p className="text-sm">
                    Measures risk-adjusted returns. Like a Seeker's efficiency, it shows how much 
                    reward you get for the risk taken. Higher is better.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Risk;
