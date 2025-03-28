
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MarketNews } from "@/types/market";
import { cn } from "@/lib/utils";

interface NewsCardProps {
  news: MarketNews;
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  // Format the timestamp to a readable format
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  return (
    <Card className="goblin-card h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-md font-goblin">{news.headline}</CardTitle>
          <Badge 
            variant="outline" 
            className={cn(
              "ml-2",
              news.sentiment === 'positive' && "bg-green-100 text-green-800 border-green-300",
              news.sentiment === 'negative' && "bg-red-100 text-red-800 border-red-300",
              news.sentiment === 'neutral' && "bg-blue-100 text-blue-800 border-blue-300"
            )}
          >
            {news.sentiment}
          </Badge>
        </div>
        <div className="text-xs text-muted-foreground">
          {news.source} • {formatTimestamp(news.timestamp)}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-2">{news.summary}</p>
        <div className="flex flex-wrap gap-1 mt-2">
          {news.relatedSymbols.map(symbol => (
            <Badge key={symbol} variant="secondary" className="text-xs">
              ${symbol}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
