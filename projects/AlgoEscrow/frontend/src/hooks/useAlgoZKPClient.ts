// Custom hook for accessing the ZK Verifier client
// Following AlgoKit patterns with proper wallet integration

import { useMemo } from 'react';
import { useWallet } from '../contexts/WalletProvider';
import { AlgoZKPVerifierClient } from '../contracts/clients/AlgoZKPVerifierClient';
import { getAlgodClient } from '../utils/algorand';

// Application ID - in production, this would come from environment or deployment
const ZKP_VERIFIER_APP_ID = 123456789; // Mock app ID for demo

/**
 * Hook that provides a configured AlgoZKPVerifierClient instance
 * Following AlgoKit best practices for client hooks
 * 
 * @returns {AlgoZKPVerifierClient | null} The configured client or null if wallet not connected
 */
export function useAlgoZKPClient() {
  const { activeAccount, transactionSigner } = useWallet();

  const client = useMemo(() => {
    // Ensure wallet is connected and we have a transaction signer
    if (!activeAccount || !transactionSigner) {
      return null;
    }

    const algodClient = getAlgodClient();

    // Create client instance with proper transaction signer
    return new AlgoZKPVerifierClient(
      {
        sender: { 
          addr: activeAccount.address, 
          signer: transactionSigner,
        },
        resolveBy: 'id',
        id: ZKP_VERIFIER_APP_ID,
      },
      algodClient
    );
  }, [activeAccount, transactionSigner]);

  return client;
}

/**
 * Hook to check if the ZK Verifier client is ready to use
 */
export function useIsZKPClientReady(): boolean {
  const client = useAlgoZKPClient();
  return client !== null;
}
