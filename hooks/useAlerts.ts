"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { getAlerts } from "@/lib/api";
import type { Alert } from "@/types";

const POLL_INTERVAL = 10 * 60 * 1000; // 10 minutes

export function useAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchAlerts = useCallback(async () => {
    try {
      const data = await getAlerts();
      setAlerts(data);
    } catch {
      // Silently fail — don't clear existing alerts
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  useEffect(() => {
    intervalRef.current = setInterval(fetchAlerts, POLL_INTERVAL);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchAlerts]);

  return { alerts, count: alerts.length, loading };
}
