"use client";

import { useState, useMemo } from "react";
import Badge from "./Badge";
import type { Stock } from "@/types";

interface StockTableProps {
  stocks: Stock[];
  loading: boolean;
}

type SortKey = "ticker" | "cmp" | "diff_200dma" | "trend" | "car_status";
type SortDir = "asc" | "desc";

function formatPrice(value: number | null): string {
  if (value === null || value === undefined) return "—";
  return "₹" + value.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatDiff(value: number | null): { text: string; color: string } {
  if (value === null || value === undefined) {
    return { text: "—", color: "text-[#6B7280]" };
  }
  const sign = value >= 0 ? "+" : "";
  return {
    text: `${sign}${value.toFixed(2)}%`,
    color: value >= 0 ? "text-[#22C55E]" : "text-[#EF4444]",
  };
}

export default function StockTable({ stocks, loading }: StockTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("diff_200dma");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const sorted = useMemo(() => {
    const arr = [...stocks];
    arr.sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      // Nulls last
      if (aVal === null && bVal === null) return 0;
      if (aVal === null) return 1;
      if (bVal === null) return -1;

      let cmp = 0;
      if (typeof aVal === "number" && typeof bVal === "number") {
        cmp = aVal - bVal;
      } else if (typeof aVal === "string" && typeof bVal === "string") {
        cmp = aVal.localeCompare(bVal);
      }

      return sortDir === "asc" ? cmp : -cmp;
    });
    return arr;
  }, [stocks, sortKey, sortDir]);

  const SortIcon = ({ column }: { column: SortKey }) => {
    if (sortKey !== column) {
      return (
        <svg className="w-3 h-3 ml-1 opacity-30" viewBox="0 0 12 12" fill="currentColor">
          <path d="M6 2L9 5H3zM6 10L3 7h6z" />
        </svg>
      );
    }
    return (
      <svg className="w-3 h-3 ml-1 text-[#A855F7]" viewBox="0 0 12 12" fill="currentColor">
        {sortDir === "asc" ? <path d="M6 2L9 5H3z" /> : <path d="M6 10L3 7h6z" />}
      </svg>
    );
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#7C3AED] border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-[#E9D5FF]/50 font-[family-name:var(--font-body)]">
            Loading stocks...
          </span>
        </div>
      </div>
    );
  }

  if (stocks.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-[#E9D5FF]/50 text-sm font-[family-name:var(--font-body)]">
          No stocks match this filter
        </p>
      </div>
    );
  }

  const headerClasses =
    "px-4 py-3 text-left text-xs font-medium text-[#E9D5FF]/50 uppercase tracking-wider cursor-pointer hover:text-[#A855F7] transition-colors select-none font-[family-name:var(--font-body)]";

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[700px]">
        <thead>
          <tr className="border-b border-[#1E1438]">
            <th
              className={`${headerClasses} sticky left-0 bg-[#0D0818] z-10`}
              onClick={() => toggleSort("ticker")}
            >
              <div className="flex items-center">
                Stock <SortIcon column="ticker" />
              </div>
            </th>
            <th className={headerClasses} onClick={() => toggleSort("cmp")}>
              <div className="flex items-center justify-end">
                Price (₹) <SortIcon column="cmp" />
              </div>
            </th>
            <th className={headerClasses} onClick={() => toggleSort("diff_200dma")}>
              <div className="flex items-center justify-end">
                vs 200 DMA <SortIcon column="diff_200dma" />
              </div>
            </th>
            <th className={headerClasses} onClick={() => toggleSort("trend")}>
              <div className="flex items-center">
                Trend <SortIcon column="trend" />
              </div>
            </th>
            <th className={headerClasses} onClick={() => toggleSort("car_status")}>
              <div className="flex items-center">
                CAR Status <SortIcon column="car_status" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((stock) => {
            const diff = formatDiff(stock.diff_200dma);
            return (
              <tr
                key={stock.ticker}
                className={`border-b border-[#1E1438]/50 hover:bg-[#1E1438]/30 transition-colors ${
                  stock.changed ? "border-l-2 border-l-[#F59E0B]" : ""
                }`}
              >
                <td className="px-4 py-3 sticky left-0 bg-[#0D0818] z-10">
                  <span className="text-sm font-medium text-[#FAF7FF] font-[family-name:var(--font-body)]">
                    {stock.ticker}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="text-sm text-[#FAF7FF] font-[family-name:var(--font-mono)]">
                    {formatPrice(stock.cmp)}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className={`text-sm font-[family-name:var(--font-mono)] ${diff.color}`}>
                    {diff.text}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Badge type="trend" value={stock.trend} />
                </td>
                <td className="px-4 py-3">
                  <Badge type="car" value={stock.car_status} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
