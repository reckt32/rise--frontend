"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useStocks } from "@/hooks/useStocks";
import { useAlerts } from "@/hooks/useAlerts";
import { getCategories, getMarketStatus } from "@/lib/api";
import type { Category, MarketStatus } from "@/types";
import TopBar from "@/components/TopBar";
import FilterBar from "@/components/FilterBar";
import StockTable from "@/components/StockTable";
import AlertsPanel from "@/components/AlertsPanel";

export default function DashboardPage() {
  const { user, loading: authLoading, signOut } = useAuth();

  // Categories
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");

  // Market status
  const [marketStatus, setMarketStatus] = useState<MarketStatus | null>(null);

  // Toast
  const [toast, setToast] = useState<string | null>(null);

  // Stocks
  const { stocks, loading: stocksLoading, refreshing, error } = useStocks(
    selectedCategory,
    selectedFilter
  );

  // Alerts
  const { alerts, count: alertCount } = useAlerts();

  // Fetch categories & market status on mount
  const loadInitialData = useCallback(async () => {
    try {
      const [cats, status] = await Promise.all([
        getCategories(),
        getMarketStatus(),
      ]);
      setCategories(cats);
      setMarketStatus(status);
      if (cats.length > 0 && !selectedCategory) {
        setSelectedCategory(cats[0].id);
      }
    } catch {
      setToast("Could not refresh data — retrying");
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (user) {
      loadInitialData();
    }
  }, [user, loadInitialData]);

  // Periodically refresh market status
  useEffect(() => {
    if (!user) return;
    const interval = setInterval(async () => {
      try {
        const status = await getMarketStatus();
        setMarketStatus(status);
      } catch {
        // Silently fail
      }
    }, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, [user]);

  // Show toast on stock fetch error
  useEffect(() => {
    if (error) {
      setToast("Could not refresh data — retrying");
      const timeout = setTimeout(() => setToast(null), 5000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0D0818]">
        <div className="w-8 h-8 border-2 border-[#7C3AED] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null; // useAuth will redirect to /login
  }

  return (
    <div className="min-h-screen bg-[#0D0818] flex flex-col">
      {/* Toast */}
      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[60] animate-slide-in">
          <div className="bg-[#1E1438] border border-[#F59E0B]/40 rounded-lg px-4 py-2.5 shadow-lg flex items-center gap-2">
            <svg className="w-4 h-4 text-[#F59E0B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <span className="text-sm text-[#E9D5FF] font-[family-name:var(--font-body)]">
              {toast}
            </span>
          </div>
        </div>
      )}

      <TopBar
        lastRefreshed={marketStatus?.last_refreshed ?? null}
        isMarketOpen={marketStatus?.is_open ?? false}
        refreshing={refreshing}
        onSignOut={signOut}
      />

      <FilterBar
        categories={categories}
        selectedCategory={selectedCategory}
        selectedFilter={selectedFilter}
        onCategoryChange={setSelectedCategory}
        onFilterChange={setSelectedFilter}
      />

      <main className="flex-1 max-w-[1400px] mx-auto w-full px-4 sm:px-6 py-4">
        <StockTable stocks={stocks} loading={stocksLoading} />
      </main>

      <AlertsPanel alerts={alerts} count={alertCount} />
    </div>
  );
}
