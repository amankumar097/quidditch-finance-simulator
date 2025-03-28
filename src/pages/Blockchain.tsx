
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchFantasyTokens, buyFantasyTokens } from "@/services/marketApi";
import { FantasyToken, TokenTransaction } from "@/types/market";
import Navigation from "@/components/Navigation";
import FantasyTokenCard from "@/components/FantasyTokenCard";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Wallet, ChevronRight, Clock } from "lucide-react";

const Blockchain = () => {
  const { toast } = useToast();
  const [selectedToken, setSelectedToken] = useState<FantasyToken | null>(null);
  const [purchaseAmount, setPurchaseAmount] = useState<number>(100);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userWalletAddress, setUserWalletAddress] = useState<string>("0xUserWalletAddress");
  const [purchaseComplete, setPurchaseComplete] = useState<TokenTransaction | null>(null);

  // Fetch fantasy tokens
  const { data: tokens, isLoading } = useQuery({
    queryKey: ["fantasy-tokens"],
    queryFn: fetchFantasyTokens
  });

  const handleBuyClick = (token: FantasyToken) => {
    setSelectedToken(token);
    setIsDialogOpen(true);
  };

  const handlePurchase = async () => {
    if (!selectedToken) return;
    
    try {
      const transaction = await buyFantasyTokens(
        selectedToken.id,
        purchaseAmount,
        userWalletAddress
      );
      
      setPurchaseComplete(transaction);
      
      // Show toast notification
      toast({
        title: "Purchase Initiated",
        description: `Your purchase of ${purchaseAmount} ${selectedToken.symbol} tokens is being processed.`,
      });
    } catch (error) {
      console.error("Purchase error:", error);
      toast({
        title: "Purchase Failed",
        description: "There was an error processing your purchase. Please try again.",
        variant: "destructive",
      });
    }
  };

  const resetPurchase = () => {
    setSelectedToken(null);
    setPurchaseAmount(100);
    setPurchaseComplete(null);
    setIsDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-gringotts-parchment pb-16">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24">
        <div className="mb-8">
          <h1 className="font-wizarding text-3xl text-gringotts-burgundy mb-2">
            Fantasy Team Tokens
          </h1>
          <p className="text-muted-foreground">
            Trade magical blockchain tokens backed by team performance and secured by Gringott's own goblin-approved smart contracts.
          </p>
        </div>

        <div className="flex items-center space-x-2 mb-6 p-4 rounded-lg bg-gringotts-gold/10 border border-gringotts-gold">
          <Wallet className="h-5 w-5 text-gringotts-burgundy" />
          <span className="font-medium">Wallet Address:</span>
          <code className="text-sm bg-white/50 px-2 py-1 rounded">
            {userWalletAddress}
          </code>
          <div className="flex-1"></div>
          <Button 
            variant="outline" 
            className="border-gringotts-gold text-gringotts-burgundy hover:bg-gringotts-gold/20"
            onClick={() => {
              const newAddress = prompt("Enter your wallet address:", userWalletAddress);
              if (newAddress && newAddress.trim() !== "") {
                setUserWalletAddress(newAddress.trim());
              }
            }}
          >
            Change
          </Button>
        </div>

        <Tabs defaultValue="tokens" className="mb-8">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="tokens" className="font-wizarding">Available Tokens</TabsTrigger>
            <TabsTrigger value="your-tokens" className="font-wizarding">Your Token Portfolio</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tokens">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin h-8 w-8 border-4 border-gringotts-gold border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading fantasy tokens...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tokens?.map(token => (
                  <FantasyTokenCard 
                    key={token.id} 
                    token={token} 
                    onBuy={() => handleBuyClick(token)}
                  />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="your-tokens">
            <Card>
              <CardHeader>
                <CardTitle className="font-wizarding text-gringotts-burgundy">Your Token Portfolio</CardTitle>
                <CardDescription>
                  Connect your wallet to view your fantasy team tokens
                </CardDescription>
              </CardHeader>
              <CardContent className="grid place-items-center py-8">
                <div className="text-center space-y-4">
                  <Wallet className="h-12 w-12 text-muted-foreground mx-auto" />
                  <p className="text-muted-foreground">
                    Your token portfolio will appear here after you make a purchase
                  </p>
                  <Button 
                    className="bg-gringotts-gold hover:bg-gringotts-gold/90 text-gringotts-burgundy"
                    onClick={() => {
                      // Switch to tokens tab
                      document.querySelector('button[value="tokens"]')?.click();
                    }}
                  >
                    Browse Available Tokens
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="font-wizarding text-gringotts-burgundy">
              About Fantasy Team Tokens
            </CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p>
              Fantasy Team Tokens are magical blockchain assets backed by the performance of your favorite Quidditch teams. Each token represents fractional ownership in a team's success and grants voting rights for certain team decisions.
            </p>
            <h3 className="font-wizarding text-gringotts-burgundy mt-4">How it Works</h3>
            <ul>
              <li>Tokens automatically increase in value when teams win matches</li>
              <li>Smart contracts enforce fair distribution of rewards</li>
              <li>Token holders can vote on team strategy and player acquisitions</li>
              <li>Special rewards for long-term holders during tournaments</li>
            </ul>
            <div className="bg-gringotts-gold/10 p-4 rounded-lg border border-gringotts-gold mt-4">
              <h4 className="font-wizarding text-gringotts-burgundy mt-0">Goblin Security Guarantee</h4>
              <p className="mb-0">
                All Fantasy Team Tokens are secured by Gringotts' proprietary goblin-approved smart contracts, with 24/7 protection from curse-breakers and arithmancy experts.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-wizarding text-gringotts-burgundy">
              {purchaseComplete ? "Purchase Confirmed" : `Buy ${selectedToken?.symbol} Tokens`}
            </DialogTitle>
            <DialogDescription>
              {purchaseComplete 
                ? "Your transaction has been submitted to the blockchain" 
                : "Enter the amount of tokens you want to purchase"}
            </DialogDescription>
          </DialogHeader>

          {purchaseComplete ? (
            // Purchase complete view
            <div className="space-y-4 py-4">
              <div className="bg-gringotts-gold/10 p-4 rounded-lg border border-gringotts-gold">
                <div className="flex items-center mb-2">
                  <Clock className="h-4 w-4 mr-2 text-gringotts-burgundy" />
                  <span className="font-medium">Status:</span>
                  <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                    {purchaseComplete.status}
                  </span>
                </div>
                <div className="text-sm space-y-1">
                  <div><span className="font-medium">Amount:</span> {purchaseComplete.amount} {selectedToken?.symbol}</div>
                  <div><span className="font-medium">Transaction Hash:</span></div>
                  <code className="text-xs block bg-white/50 p-1 rounded overflow-x-auto">
                    {purchaseComplete.txHash}
                  </code>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Your transaction has been submitted to the {purchaseComplete.network} network. It may take a few minutes to be confirmed.
              </p>
            </div>
          ) : (
            // Purchase form view
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="token-amount">Amount</Label>
                <Input
                  id="token-amount"
                  type="number"
                  min="1"
                  value={purchaseAmount}
                  onChange={(e) => setPurchaseAmount(parseInt(e.target.value))}
                  className="col-span-3"
                />
              </div>
              
              <div className="bg-muted rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Price per token:</span>
                  <span className="font-medium">${selectedToken?.price.toFixed(5)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Quantity:</span>
                  <span className="font-medium">{purchaseAmount} tokens</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Total cost:</span>
                    <span className="font-bold">${(purchaseAmount * (selectedToken?.price || 0)).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            {purchaseComplete ? (
              <Button className="w-full bg-gringotts-gold hover:bg-gringotts-gold/90 text-gringotts-burgundy" onClick={resetPurchase}>
                Done
              </Button>
            ) : (
              <Button className="w-full bg-gringotts-gold hover:bg-gringotts-gold/90 text-gringotts-burgundy" onClick={handlePurchase}>
                Purchase Tokens
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Blockchain;
