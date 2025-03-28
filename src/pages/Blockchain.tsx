import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchFantasyTokens,
  fetchTokenTransactions,
  fetchSmartContractEvents,
} from "@/services/marketApi";
import {
  FantasyToken,
  TokenTransaction,
  SmartContractEvent,
} from "@/types/market";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CalendarClock, FileJson2, Network } from "lucide-react";
import { format } from 'date-fns';

const Blockchain = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedToken, setSelectedToken] = useState<string | null>(null);

  // Fetch fantasy tokens
  const { data: tokens, isLoading: tokensLoading } = useQuery({
    queryKey: ["fantasyTokens"],
    queryFn: fetchFantasyTokens,
  });

  // Filter tokens based on search term
  const filteredTokens = tokens?.filter((token) =>
    token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fetch token transactions for selected token
  const { data: transactions, isLoading: transactionsLoading } = useQuery({
    queryKey: ["tokenTransactions", selectedToken],
    queryFn: () => fetchTokenTransactions(selectedToken || ""),
    enabled: !!selectedToken,
  });

  // Fetch smart contract events for selected token
  const { data: events, isLoading: eventsLoading } = useQuery({
    queryKey: ["smartContractEvents", selectedToken],
    queryFn: () => fetchSmartContractEvents(selectedToken || ""),
    enabled: !!selectedToken,
  });

  const handleTokenSelect = (tokenId: string) => {
    setSelectedToken(tokenId);
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'MMM dd, yyyy hh:mm a');
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid Date";
    }
  };

  // Fix the TypeScript error by replacing the click property with a correct approach 
  // This should be somewhere around line 148
  const handleBuyButtonClick = (tokenId: string) => {
    // Get the button reference directly when needed
    const buyButton = document.getElementById(`buy-token-${tokenId}`);
    if (buyButton) {
      // Use proper DOM methods instead of the click property
      buyButton.dispatchEvent(new Event('click'));
    }
  };

  return (
    <div className="min-h-screen pb-16">
      <Navigation />

      <main className="container px-4 mx-auto pt-20">
        <h1 className="text-3xl font-wizarding mb-6 text-center text-gringotts-burgundy">
          Fantasy Tokens (Blockchain)
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Token List Section */}
          <section className="md:col-span-1">
            <Card className="goblin-card">
              <CardHeader>
                <CardTitle className="text-xl font-wizarding">
                  Wizarding Tokens
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Explore fantasy tokens representing Quidditch teams.
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="search">Search Tokens</Label>
                    <Input
                      type="search"
                      id="search"
                      placeholder="Search by name or symbol..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <ScrollArea className="h-[400px] w-full rounded-md border">
                    <div className="space-y-2 p-4">
                      {tokensLoading ? (
                        <div className="text-center text-muted-foreground">
                          Loading tokens...
                        </div>
                      ) : filteredTokens && filteredTokens.length > 0 ? (
                        filteredTokens.map((token) => (
                          <Button
                            key={token.id}
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={() => handleTokenSelect(token.id)}
                          >
                            {token.name} ({token.symbol})
                          </Button>
                        ))
                      ) : (
                        <div className="text-center text-muted-foreground">
                          No tokens found.
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Token Details Section */}
          <section className="md:col-span-2 space-y-6">
            {selectedToken ? (
              <>
                {/* Transactions Table */}
                <Card className="goblin-card">
                  <CardHeader>
                    <CardTitle className="text-xl font-wizarding flex items-center">
                      <FileJson2 className="h-5 w-5 mr-2 text-gringotts-gold" />
                      Token Transactions
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Recent transactions for the selected token.
                    </p>
                  </CardHeader>
                  <CardContent className="p-0">
                    {transactionsLoading ? (
                      <div className="text-center p-4 text-muted-foreground">
                        Loading transactions...
                      </div>
                    ) : transactions && transactions.length > 0 ? (
                      <ScrollArea className="h-[400px] w-full rounded-md">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[150px]">Timestamp</TableHead>
                              <TableHead>From</TableHead>
                              <TableHead>To</TableHead>
                              <TableHead>Amount</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {transactions.map((tx) => (
                              <TableRow key={tx.id}>
                                <TableCell className="font-medium">{formatDate(tx.timestamp)}</TableCell>
                                <TableCell>{tx.fromAddress}</TableCell>
                                <TableCell>{tx.toAddress}</TableCell>
                                <TableCell>{tx.amount}</TableCell>
                                <TableCell>
                                  <Badge variant="outline">{tx.status}</Badge>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </ScrollArea>
                    ) : (
                      <div className="text-center p-4 text-muted-foreground">
                        No transactions found for this token.
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Smart Contract Events Table */}
                <Card className="goblin-card">
                  <CardHeader>
                    <CardTitle className="text-xl font-wizarding flex items-center">
                      <Network className="h-5 w-5 mr-2 text-gringotts-gold" />
                      Smart Contract Events
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Events triggered by the token's smart contract.
                    </p>
                  </CardHeader>
                  <CardContent className="p-0">
                    {eventsLoading ? (
                      <div className="text-center p-4 text-muted-foreground">
                        Loading events...
                      </div>
                    ) : events && events.length > 0 ? (
                      <ScrollArea className="h-[400px] w-full rounded-md">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[150px]">Timestamp</TableHead>
                              <TableHead>Event Name</TableHead>
                              <TableHead>Contract</TableHead>
                              <TableHead>Block #</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {events.map((event) => (
                              <TableRow key={event.id}>
                                <TableCell className="font-medium">{formatDate(event.timestamp)}</TableCell>
                                <TableCell>{event.eventName}</TableCell>
                                <TableCell>{event.contractAddress}</TableCell>
                                <TableCell>{event.blockNumber}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </ScrollArea>
                    ) : (
                      <div className="text-center p-4 text-muted-foreground">
                        No events found for this token.
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            ) : (
              <div className="text-center py-12 bg-gringotts-parchment/30 rounded-lg border border-gringotts-gold/20">
                <h3 className="text-xl font-wizarding mb-2">
                  Select a token to view details
                </h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Explore the wizarding world of fantasy tokens. Select a token
                  from the list to view its transactions and smart contract
                  events.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default Blockchain;
