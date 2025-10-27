// Wallet provider using @txnlab/use-wallet-react
// Following AlgoKit and web3 best practices for professional wallet integration

import { WalletProvider, WalletManager, NetworkId, WalletId } from '@txnlab/use-wallet-react';
import { ReactNode, useMemo } from 'react';

interface WalletProviderWrapperProps {
  children: ReactNode;
}

/**
 * Wallet Provider following AlgoKit patterns
 * Supports Pera Wallet with proper network configuration
 */
export function WalletProviderWrapper({ children }: WalletProviderWrapperProps) {
  // Create wallet manager instance with Pera Wallet support
  const walletManager = useMemo(
    () =>
      new WalletManager({
        wallets: [WalletId.PERA],
        defaultNetwork: NetworkId.TESTNET,
      }),
    []
  );

  return <WalletProvider manager={walletManager}>{children}</WalletProvider>;
}

// Re-export hooks and create custom wallet hook
export { useNetwork } from '@txnlab/use-wallet-react';
import { useWallet as useWalletBase } from '@txnlab/use-wallet-react';
import algosdk from 'algosdk';

/**
 * Custom wallet hook that ensures proper typing and signer compatibility
 */
export function useWallet() {
  const wallet = useWalletBase();
  
  // Create algosdk-compatible transaction signer
  const transactionSigner: algosdk.TransactionSigner | undefined = wallet.activeAddress
    ? async (txnGroup: algosdk.Transaction[], indexesToSign: number[]) => {
        // Use the signTransactions method from use-wallet
        if (!wallet.signTransactions) {
          throw new Error('Wallet does not support transaction signing');
        }
        
        // Select only the transactions that need to be signed
        const txnsToSign = indexesToSign.map(index => txnGroup[index]);
        
        // Sign the transactions
        const signedTxns = await wallet.signTransactions(txnsToSign);
        
        // Map back to full array with unsigned txns for non-signed indices
        return txnGroup.map((txn, idx) => {
          const signedIndex = indexesToSign.indexOf(idx);
          if (signedIndex >= 0 && signedTxns[signedIndex]) {
            return signedTxns[signedIndex];
          }
          return new Uint8Array();
        });
      }
    : undefined;
  
  return {
    ...wallet,
    transactionSigner,
    activeAccount: wallet.activeAddress ? { address: wallet.activeAddress } : null,
  };
}
