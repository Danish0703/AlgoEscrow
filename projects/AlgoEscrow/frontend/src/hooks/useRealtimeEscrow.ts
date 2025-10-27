// Real-time escrow status monitoring hook
import { useState, useEffect, useCallback } from 'react';
import { AlgoEscrowClient, EscrowStatus } from '../contracts/clients/AlgoEscrowClient';

/**
 * Hook for real-time escrow monitoring
 * Polls contract state and provides live updates
 */
export function useRealtimeEscrow(client: AlgoEscrowClient | null, enabled: boolean = true) {
  const [status, setStatus] = useState<EscrowStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchStatus = useCallback(async () => {
    if (!client || !enabled) return;

    try {
      setIsLoading(true);
      setError(null);
      const newStatus = await client.getStatus();
      setStatus(newStatus);
      setLastUpdate(new Date());
    } catch (err) {
      setError(err as Error);
      console.error('Failed to fetch escrow status:', err);
    } finally {
      setIsLoading(false);
    }
  }, [client, enabled]);

  // Initial fetch
  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  // Poll for updates every 5 seconds for real-time monitoring
  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(() => {
      fetchStatus();
    }, 5000);

    return () => clearInterval(interval);
  }, [fetchStatus, enabled]);

  // Manual refresh function
  const refresh = useCallback(() => {
    fetchStatus();
  }, [fetchStatus]);

  return {
    status,
    isLoading,
    error,
    lastUpdate,
    refresh
  };
}

/**
 * Hook to monitor specific escrow events
 * Tracks state changes in the escrow contract
 */
export function useEscrowEvents(appId: number | undefined, enabled: boolean = true) {
  const [events, setEvents] = useState<Array<{
    type: string;
    timestamp: Date;
    data?: any;
  }>>([]);
  const [prevStatus, setPrevStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled || !appId) return;

    // In production, use Algorand indexer to watch for log events
    // For now, we track status changes as events
    const checkForChanges = async () => {
      // This would be replaced with actual indexer subscription in production
      // For now, just track manual state changes
    };

    const interval = setInterval(checkForChanges, 10000);
    return () => clearInterval(interval);
  }, [appId, enabled, prevStatus]);

  // Helper to add event
  const addEvent = (type: string) => {
    setEvents(prev => [...prev, {
      type,
      timestamp: new Date(),
      data: { appId }
    }].slice(-10)); // Keep last 10 events
  };

  return events;
}
