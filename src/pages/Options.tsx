
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTeams, fetchOptionChain } from "@/services/marketApi";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import OptionChainVisualizer from "@/components/OptionChainVisualizer";
import { useToast } from "@/hooks/use-toast";

const Options = () => {
  const { toast } = useToast();
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  
  // Fetch teams data
  const { data: teams, isLoading: teamsLoading } = useQuery({
    queryKey: ['teams'],
    queryFn: fetchTeams,
  });
  
  // Get selected team data
  const selectedTeamData = teams?.find(team => team.symbol === selectedTeam);
  
  // Fetch option chain for selected team
  const { data: optionChain, isLoading: optionChainLoading } = useQuery({
    queryKey: ['optionChain', selectedTeam],
    queryFn: () => fetchOptionChain(selectedTeam || ''),
    enabled: !!selectedTeam,
  });
  
  const handleTeamChange = (value: string) => {
    setSelectedTeam(value);
    toast({
      title: "Bludger Analysis Selected",
      description: `Loading options data for ${value}...`,
    });
  };
  
  return (
    <div className="min-h-screen pb-16">
      <Navigation />
      
      <main className="container px-4 mx-auto pt-20">
        <h1 className="text-3xl font-wizarding mb-6 text-center text-gringotts-burgundy">
          Bludger Analysis (Options Trading)
        </h1>
        
        <div className="max-w-xl mx-auto mb-8">
          <Card className="goblin-card">
            <CardHeader>
              <CardTitle className="text-xl font-wizarding">Quidditch Options Explorer</CardTitle>
              <p className="text-sm text-muted-foreground">
                Analyze Bludger patterns to predict team performance and manage risk.
                Options trading allows wizards to speculate on future team movements.
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Select Team</label>
                  <Select value={selectedTeam || ''} onValueChange={handleTeamChange}>
                    <SelectTrigger className="magical-input">
                      <SelectValue placeholder="Choose a team for options analysis" />
                    </SelectTrigger>
                    <SelectContent>
                      {teamsLoading ? (
                        <SelectItem value="loading" disabled>Loading teams...</SelectItem>
                      ) : (
                        teams?.map(team => (
                          <SelectItem key={team.id} value={team.symbol}>
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
        
        {selectedTeam ? (
          <div className="mb-8">
            {optionChainLoading ? (
              <div className="animate-pulse">
                <div className="h-64 bg-muted rounded shadow-sm" />
              </div>
            ) : optionChain ? (
              <OptionChainVisualizer 
                options={optionChain} 
                currentPrice={selectedTeamData?.price || 0}
                symbol={selectedTeam}
              />
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-muted-foreground">No option chain data available for this team.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12 bg-gringotts-parchment/30 rounded-lg border border-gringotts-gold/20">
            <h3 className="text-xl font-wizarding mb-2">Bludger Analysis Guide</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Options in the wizarding financial world are represented as Bludger attack patterns. 
              Just as Bludgers create strategic opportunities in Quidditch, options create 
              strategic financial opportunities for traders.
            </p>
            
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto gap-6 px-4">
              <div className="text-left">
                <h4 className="font-wizarding text-lg mb-2">Golden Bludgers (Calls)</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Bet on team rising in value</li>
                  <li>Limited risk, unlimited gain potential</li>
                  <li>Higher implied volatility = more aggressive Bludgers</li>
                </ul>
              </div>
              
              <div className="text-left">
                <h4 className="font-wizarding text-lg mb-2">Iron Bludgers (Puts)</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Bet on team falling in value</li>
                  <li>Used as insurance against losses</li>
                  <li>Strike price = Bludger targeting zone</li>
                </ul>
              </div>
            </div>
          </div>
        )}
        
        {/* Options Education */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="goblin-card md:col-span-3">
            <CardHeader>
              <CardTitle className="text-xl font-wizarding">Understanding Quidditch Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-wizarding text-lg mb-2">Strike Prices</h3>
                  <p className="text-sm">
                    Just as Bludgers target specific areas of the pitch, options target specific price levels. 
                    The "strike price" represents the price at which the option can be exercised.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-wizarding text-lg mb-2">Implied Volatility</h3>
                  <p className="text-sm">
                    Measures the expected intensity of Bludger activity (price movement). 
                    Higher IV means more erratic and aggressive Bludger patterns are expected.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-wizarding text-lg mb-2">Open Interest & Volume</h3>
                  <p className="text-sm">
                    Indicates how many wizards are positioning their Bludgers at particular strike prices.
                    Higher volume shows more active trading at that level.
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

export default Options;
