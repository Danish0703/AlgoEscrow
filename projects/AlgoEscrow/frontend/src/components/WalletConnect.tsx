// Wallet connection component following web3 best practices

import { useWallet } from '../contexts/WalletProvider';
import { Button } from './ui/button';
import { Wallet, LogOut, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

export function WalletConnect() {
  const { wallets, activeAddress } = useWallet();
  const [isConnecting, setIsConnecting] = useState(false);

  const peraWallet = wallets?.find(w => w.id === 'pera');

  const handleConnect = async () => {
    if (!peraWallet) {
      toast.error('Pera Wallet not available');
      return;
    }

    setIsConnecting(true);
    try {
      await peraWallet.connect();
      toast.success('Wallet connected successfully');
    } catch (error) {
      console.error('Wallet connection failed:', error);
      if (error instanceof Error) {
        toast.error(`Connection failed: ${error.message}`);
      } else {
        toast.error('Failed to connect wallet');
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    if (!peraWallet) return;

    try {
      await peraWallet.disconnect();
      toast.success('Wallet disconnected');
    } catch (error) {
      console.error('Wallet disconnection failed:', error);
      toast.error('Failed to disconnect wallet');
    }
  };

  if (activeAddress) {
    return (
      <div className="flex items-center gap-3">
        <div className="px-4 py-2 rounded-lg bg-secondary border border-border">
          <p className="text-xs text-muted-foreground">Connected</p>
          <p className="text-sm font-mono text-foreground">
            {activeAddress.slice(0, 6)}...{activeAddress.slice(-4)}
          </p>
        </div>
        <Button
          onClick={handleDisconnect}
          variant="outline"
          size="icon"
          className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={handleConnect}
      disabled={isConnecting}
      className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow"
    >
      {isConnecting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Connecting...
        </>
      ) : (
        <>
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </>
      )}
    </Button>
  );
}
