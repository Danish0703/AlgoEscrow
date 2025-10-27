// Hook for accessing AlgoEscrow client
import { useMemo } from 'react';
import { useWallet } from '../contexts/WalletProvider';
import { AlgoEscrowClient } from '../contracts/clients/AlgoEscrowClient';
import { getAlgodClient } from '../utils/algorand';

/**
 * Hook that provides configured AlgoEscrowClient
 * @param appId - The escrow contract application ID (optional for creation)
 * @param forCreation - Set to true to get a client for creating contracts
 */
export function useAlgoEscrowClient(appId?: number, forCreation: boolean = false) {
  const { activeAccount, transactionSigner } = useWallet();

  const client = useMemo(() => {
    if (!activeAccount || !transactionSigner) {
      return null;
    }

    // For creation mode, we need a client but without requiring appId
    if (forCreation && !appId) {
      // Return a temporary client that can be used for creation
      // We'll use appId 0 as placeholder since actual ID will be assigned on creation
      const algodClient = getAlgodClient();
      return new AlgoEscrowClient(
        {
          sender: { 
            addr: activeAccount.address, 
            signer: transactionSigner,
          },
          resolveBy: 'id',
          id: 0, // Placeholder for creation
        },
        algodClient
      );
    }

    // For interaction mode, require appId
    if (!appId) {
      return null;
    }

    const algodClient = getAlgodClient();

    return new AlgoEscrowClient(
      {
        sender: { 
          addr: activeAccount.address, 
          signer: transactionSigner,
        },
        resolveBy: 'id',
        id: appId,
      },
      algodClient
    );
  }, [activeAccount, transactionSigner, appId, forCreation]);

  return client;
}

/**
 * Check if escrow client is ready
 */
export function useIsEscrowClientReady(appId?: number): boolean {
  const client = useAlgoEscrowClient(appId);
  return client !== null;
}
