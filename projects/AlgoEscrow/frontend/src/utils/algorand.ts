// Algorand blockchain utilities following AlgoKit patterns

import algosdk from 'algosdk';
import { AlgorandClient } from '@algorandfoundation/algokit-utils';

export type NetworkId = 'testnet' | 'mainnet' | 'localnet';

interface NetworkConfig {
  algodUrl: string;
  algodToken: string;
  indexerUrl: string;
  indexerToken: string;
}

const NETWORK_CONFIGS: Record<NetworkId, NetworkConfig> = {
  testnet: {
    algodUrl: 'https://testnet-api.algonode.cloud',
    algodToken: '',
    indexerUrl: 'https://testnet-idx.algonode.cloud',
    indexerToken: '',
  },
  mainnet: {
    algodUrl: 'https://mainnet-api.algonode.cloud',
    algodToken: '',
    indexerUrl: 'https://mainnet-idx.algonode.cloud',
    indexerToken: '',
  },
  localnet: {
    algodUrl: 'http://localhost',
    algodToken: 'a'.repeat(64),
    indexerUrl: 'http://localhost',
    indexerToken: 'a'.repeat(64),
  },
};

/**
 * Get the current network configuration
 */
export function getNetworkConfig(): NetworkConfig {
  // In production, this would come from environment variables
  const network: NetworkId = 'testnet';
  return NETWORK_CONFIGS[network];
}

/**
 * Returns an Algod client connected to the configured network
 */
export function getAlgodClient(): algosdk.Algodv2 {
  const config = getNetworkConfig();
  return new algosdk.Algodv2(config.algodToken, config.algodUrl, '');
}

/**
 * Returns an indexer client for querying blockchain data
 */
export function getIndexerClient(): algosdk.Indexer {
  const config = getNetworkConfig();
  return new algosdk.Indexer(config.indexerToken, config.indexerUrl, '');
}

/**
 * Returns an AlgorandClient instance with full AlgoKit utilities
 */
export function getAlgorandClient(): AlgorandClient {
  const config = getNetworkConfig();
  
  return AlgorandClient.fromClients({
    algod: getAlgodClient(),
    indexer: getIndexerClient(),
  });
}
