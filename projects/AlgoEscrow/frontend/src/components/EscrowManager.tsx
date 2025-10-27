// Real-time Escrow Manager Component
import { useState } from 'react';
import { useWallet } from '../contexts/WalletProvider';
import { useAlgoEscrowClient } from '../hooks/useAlgoEscrowClient';
import { useRealtimeEscrow, useEscrowEvents } from '../hooks/useRealtimeEscrow';
import { validateEscrowParams } from '../utils/validation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { useToast } from '../hooks/use-toast';
import { Wallet, Clock, CheckCircle2, AlertCircle, RefreshCw, Zap } from 'lucide-react';

export function EscrowManager() {
  const { activeAccount } = useWallet();
  const { toast } = useToast();
  
  const [appId, setAppId] = useState<number>();
  const [sellerAddress, setSellerAddress] = useState('');
  const [arbiterAddress, setArbiterAddress] = useState('');
  const [totalMilestones, setTotalMilestones] = useState(3);
  const [paymentAmount, setPaymentAmount] = useState(1000000); // 1 ALGO
  const [isCreating, setIsCreating] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState(0);

  const creationClient = useAlgoEscrowClient(undefined, true);
  const escrowClient = useAlgoEscrowClient(appId);
  const { status, lastUpdate, refresh, isLoading } = useRealtimeEscrow(escrowClient, !!appId);
  const events = useEscrowEvents(appId, !!appId);

  const handleCreateEscrow = async () => {
    if (!activeAccount) {
      toast({
        title: "Error",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }

    // Validate inputs
    const validation = validateEscrowParams({
      seller: sellerAddress,
      arbiter: arbiterAddress,
      buyer: activeAccount.address,
      milestones: totalMilestones,
      amount: paymentAmount,
    });

    if (!validation.valid) {
      toast({
        title: "Validation Error",
        description: validation.error,
        variant: "destructive",
      });
      return;
    }

    if (!creationClient) {
      toast({
        title: "Error",
        description: "Wallet not properly connected",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsCreating(true);
      
      toast({
        title: "Creating Escrow...",
        description: "Please approve the transaction in your wallet",
      });

      // Create the escrow contract on blockchain
      const { appId: newAppId, txId } = await creationClient.createEscrow({
        seller: sellerAddress,
        arbiter: arbiterAddress,
        totalMilestones,
        paymentAmount,
      });
      
      setAppId(newAppId);
      
      toast({
        title: "Escrow Created! 🎉",
        description: `Contract deployed with ID: ${newAppId}. Transaction: ${txId.slice(0, 8)}...`,
      });
    } catch (error) {
      console.error('Escrow creation failed:', error);
      toast({
        title: "Creation Failed",
        description: error instanceof Error ? error.message : "Failed to create escrow contract",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleApproveMilestone = async () => {
    if (!escrowClient) return;

    try {
      await escrowClient.approveMilestone(selectedMilestone);
      toast({
        title: "Milestone Approved ✅",
        description: "Payment released to seller",
      });
      refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  const handleRequestApproval = async () => {
    if (!escrowClient) return;

    try {
      const deliverableHash = 'QmX' + Math.random().toString(36).substring(7);
      await escrowClient.requestMilestoneApproval(selectedMilestone, deliverableHash);
      toast({
        title: "Approval Requested 📤",
        description: "Buyer notified to review milestone",
      });
      refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (statusValue?: string) => {
    switch (statusValue) {
      case 'active': return 'bg-primary';
      case 'milestone_completed': return 'bg-green-500';
      case 'disputed': return 'bg-destructive';
      case 'completed': return 'bg-green-600';
      case 'refunded': return 'bg-muted';
      default: return 'bg-muted';
    }
  };

  const getStatusIcon = (statusValue?: string) => {
    switch (statusValue) {
      case 'active': return <Clock className="h-4 w-4" />;
      case 'milestone_completed': return <CheckCircle2 className="h-4 w-4" />;
      case 'disputed': return <AlertCircle className="h-4 w-4" />;
      case 'completed': return <CheckCircle2 className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  if (!activeAccount) {
    return (
      <Card className="max-w-2xl mx-auto mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-6 w-6" />
            Algorand Escrow Manager
          </CardTitle>
          <CardDescription>
            Real-time milestone-based escrow system on Algorand
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              Connect your wallet to create or manage escrows
            </p>
            <Badge variant="outline">Wallet Required</Badge>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 space-y-6">
      {/* Create Escrow */}
      {!appId && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-primary" />
              Create New Escrow
            </CardTitle>
            <CardDescription>
              Set up a milestone-based payment escrow with real-time tracking
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Seller Address</Label>
                <Input
                  placeholder="ALGORAND_ADDRESS"
                  value={sellerAddress}
                  onChange={(e) => setSellerAddress(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Arbiter Address</Label>
                <Input
                  placeholder="ALGORAND_ADDRESS"
                  value={arbiterAddress}
                  onChange={(e) => setArbiterAddress(e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Total Milestones</Label>
                <Input
                  type="number"
                  min="1"
                  value={totalMilestones}
                  onChange={(e) => setTotalMilestones(parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label>Total Amount (microAlgos)</Label>
                <Input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(parseInt(e.target.value))}
                />
              </div>
            </div>

            <Button 
              onClick={handleCreateEscrow} 
              disabled={isCreating || !sellerAddress || !arbiterAddress}
              className="w-full"
            >
              {isCreating ? 'Creating...' : 'Create Escrow Contract'}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Real-time Status Dashboard */}
      {appId && status && (
        <>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    Escrow Status
                    <Badge className={getStatusColor(status.status)}>
                      {getStatusIcon(status.status)}
                      <span className="ml-1">{status.status}</span>
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Contract ID: {appId} | Last update: {lastUpdate?.toLocaleTimeString()}
                  </CardDescription>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={refresh}
                  disabled={isLoading}
                >
                  <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Milestone Progress</span>
                  <span className="font-medium">
                    {status.completed} / {status.total} completed
                  </span>
                </div>
                <Progress value={(status.completed / status.total) * 100} />
              </div>

              {/* Financial Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Released</p>
                  <p className="text-2xl font-bold text-green-600">
                    {(status.released / 1000000).toFixed(2)} Ⱥ
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Remaining</p>
                  <p className="text-2xl font-bold">
                    {(status.remaining / 1000000).toFixed(2)} Ⱥ
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Per Milestone</p>
                  <p className="text-2xl font-bold text-primary">
                    {((status.released + status.remaining) / status.total / 1000000).toFixed(2)} Ⱥ
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-4 pt-4 border-t">
                <div className="flex gap-2 items-center">
                  <Label>Milestone:</Label>
                  <Input
                    type="number"
                    min="0"
                    max={status.total - 1}
                    value={selectedMilestone}
                    onChange={(e) => setSelectedMilestone(parseInt(e.target.value))}
                    className="w-24"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Button onClick={handleRequestApproval} variant="outline">
                    Request Approval (Seller)
                  </Button>
                  <Button onClick={handleApproveMilestone}>
                    Approve & Release Payment (Buyer)
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real-time Events */}
          {events.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Real-time Events
                </CardTitle>
                <CardDescription>
                  Live contract activity feed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {events.map((event, i) => (
                    <div 
                      key={i}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50 animate-in fade-in slide-in-from-left-2"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                        <span className="font-medium">{event.type}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {event.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
