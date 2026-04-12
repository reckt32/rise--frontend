"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { getStocks } from "@/lib/api";
import type { Stock } from "@/types";

const POLL_INTERVAL = 10 * 60 * 1000; // 10 minutes

export function useStocks(category: string, filter: string) {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchStocks = useCallback(
    async (silent = false) => {
      if (!category) return;
      try {
        if (!silent) setLoading(true);
        else setRefreshing(true);
        setError(null);

        const data = await getStocks(category, filter || undefined);
        setStocks(data);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Failed to fetch stocks";
        setError(msg);
        // Don't clear existing data on error
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [category, filter]
  );

  // Initial fetch when params change
  useEffect(() => {
    fetchStocks(false);
  }, [fetchStocks]);

  // Auto-poll every 10 minutes
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      fetchStocks(true);
    }, POLL_INTERVAL);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchStocks]);

  return { stocks, loading, refreshing, error, refetch: () => fetchStocks(true) };
}
