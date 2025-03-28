
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTeams } from "@/services/marketApi";
import Navigation from "@/components/Navigation";
import MarketCard from "@/components/MarketCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { ChartBarIcon, TrendingDown, TrendingUp } from "lucide-react";

const Market = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  
  const { data: teams, isLoading } = useQuery({
    queryKey: ['teams'],
    queryFn: fetchTeams,
  });
  
  // Filter and sort teams
  const filteredTeams = teams?.filter(team => 
    team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const sortedTeams = React.useMemo(() => {
    if (!filteredTeams) return [];
    
    return [...filteredTeams].sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "priceAsc":
          return a.price - b.price;
        case "priceDesc":
          return b.price - a.price;
        case "changeAsc":
          return a.changePercent - b.changePercent;
        case "changeDesc":
          return b.changePercent - a.changePercent;
        case "volumeDesc":
          return b.volume - a.volume;
        default:
          return 0;
      }
    });
  }, [filteredTeams, sortBy]);
  
  // Group teams by house
  const teamsByHouse = React.useMemo(() => {
    const houses: Record<string, typeof teams> = {
      "Hogwarts Houses": [],
      "Professional Teams": []
    };
    
    sortedTeams?.forEach(team => {
      if (team.house === "Gryffindor" || team.house === "Slytherin" || 
          team.house === "Hufflepuff" || team.house === "Ravenclaw") {
        houses["Hogwarts Houses"] = [...(houses["Hogwarts Houses"] || []), team];
      } else {
        houses["Professional Teams"] = [...(houses["Professional Teams"] || []), team];
      }
    });
    
    return houses;
  }, [sortedTeams]);
  
  return (
    <div className="min-h-screen pb-16">
      <Navigation />
      
      <main className="container px-4 mx-auto pt-20">
        <h1 className="text-3xl font-wizarding mb-6 text-center text-gringotts-burgundy">
          Quidditch Market Exchange
        </h1>
        
        {/* Market statistics cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="goblin-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
                Top Gainers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {isLoading ? (
                  <div className="animate-pulse space-y-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-6 bg-muted rounded" />
                    ))}
                  </div>
                ) : (
                  teams
                    ?.filter(team => team.change > 0)
                    .sort((a, b) => b.changePercent - a.changePercent)
                    .slice(0, 3)
                    .map(team => (
                      <div key={team.id} className="flex justify-between items-center">
                        <span className="font-medium">{team.symbol}</span>
                        <span className="text-green-500">+{team.changePercent.toFixed(2)}%</span>
                      </div>
                    ))
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card className="goblin-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <TrendingDown className="h-5 w-5 mr-2 text-red-500" />
                Top Losers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {isLoading ? (
                  <div className="animate-pulse space-y-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-6 bg-muted rounded" />
                    ))}
                  </div>
                ) : (
                  teams
                    ?.filter(team => team.change < 0)
                    .sort((a, b) => a.changePercent - b.changePercent)
                    .slice(0, 3)
                    .map(team => (
                      <div key={team.id} className="flex justify-between items-center">
                        <span className="font-medium">{team.symbol}</span>
                        <span className="text-red-500">{team.changePercent.toFixed(2)}%</span>
                      </div>
                    ))
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card className="goblin-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <ChartBarIcon className="h-5 w-5 mr-2 text-gringotts-burgundy" />
                Highest Volume
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {isLoading ? (
                  <div className="animate-pulse space-y-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-6 bg-muted rounded" />
                    ))}
                  </div>
                ) : (
                  teams
                    ?.sort((a, b) => b.volume - a.volume)
                    .slice(0, 3)
                    .map(team => (
                      <div key={team.id} className="flex justify-between items-center">
                        <span className="font-medium">{team.symbol}</span>
                        <span>{(team.volume / 1000).toFixed(0)}K</span>
                      </div>
                    ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Search and filter controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-grow">
            <Input
              placeholder="Search teams by name or symbol..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="magical-input"
            />
          </div>
          <div className="w-full sm:w-48">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="magical-input">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name (A-Z)</SelectItem>
                <SelectItem value="priceAsc">Price (Low to High)</SelectItem>
                <SelectItem value="priceDesc">Price (High to Low)</SelectItem>
                <SelectItem value="changeDesc">% Change (Highest)</SelectItem>
                <SelectItem value="changeAsc">% Change (Lowest)</SelectItem>
                <SelectItem value="volumeDesc">Volume (Highest)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Display teams grouped by house */}
        {Object.entries(teamsByHouse).map(([houseName, houseTeams]) => (
          houseTeams && houseTeams.length > 0 ? (
            <section key={houseName} className="mb-8">
              <h2 className="text-xl font-wizarding mb-4">{houseName}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {houseTeams.map(team => (
                  <MarketCard key={team.id} team={team} />
                ))}
              </div>
            </section>
          ) : null
        ))}
        
        {/* No results message */}
        {sortedTeams?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No teams found matching your search criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Market;
