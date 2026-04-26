"use client";

import { useState } from "react";
import type { Alert } from "@/types";

interface AlertsPanelProps {
  alerts: Alert[];
  count: number;
}

function formatAlertTime(isoString: string): string {
  try {
    const date = new Date(isoString);
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Kolkata",
    }) + " IST";
  } catch {
    return "—";
  }
}

function describeChange(alert: Alert): string {
  const parts: string[] = [];

  if (alert.previous_trend !== alert.current_trend && alert.current_trend) {
    parts.push(`Trend changed to ${alert.current_trend}`);
  }

  if (alert.previous_car !== alert.current_car && alert.current_car) {
    parts.push(`CAR status changed to ${alert.current_car}`);
  }

  return parts.join(" • ") || "Status updated";
}

export default function AlertsPanel({ alerts, count }: AlertsPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle button — fixed on the right */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-4 bottom-4 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-[#1E1438] border border-[#7C3AED]/40 text-[#FAF7FF] shadow-lg shadow-[#7C3AED]/10 hover:border-[#A855F7] hover:shadow-[#7C3AED]/20 transition-all font-[family-name:var(--font-body)]"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        <span className="text-sm">Alerts</span>
        {count > 0 && (
          <span className="flex items-center justify-center w-5 h-5 text-xs rounded-full bg-gradient-to-r from-[#F59E0B] to-[#FB923C] text-[#0D0818] font-bold">
            {count > 99 ? "99+" : count}
          </span>
        )}
      </button>

      {/* Slide-out panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setIsOpen(false)}
          />
          {/* Panel */}
          <div className="fixed right-0 top-0 bottom-0 w-full sm:w-96 z-50 bg-[#0D0818] border-l border-[#1E1438] shadow-2xl overflow-y-auto animate-slide-in">
            {/* Header */}
            <div className="sticky top-0 bg-[#0D0818] border-b border-[#1E1438] px-4 py-4 flex items-center justify-between">
              <h2 className="text-lg font-medium text-[#FAF7FF] font-[family-name:var(--font-body)]">
                Recent Alerts
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-[#1E1438] transition-colors text-[#E9D5FF]/50 hover:text-[#FAF7FF]"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Alert cards */}
            <div className="p-4 space-y-3">
              {alerts.length === 0 ? (
                <p className="text-center text-sm text-[#6B7280] py-8 font-[family-name:var(--font-body)]">
                  No changes since last update
                </p>
              ) : (
                alerts.map((alert, idx) => (
                  <div
                    key={`${alert.ticker}-${idx}`}
                    className="border-l-2 border-l-[#F59E0B] bg-[#1E1438]/50 rounded-r-lg px-4 py-3"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold text-[#FAF7FF] font-[family-name:var(--font-body)]">
                        {alert.ticker}
                      </span>
                      <span className="text-xs text-[#E9D5FF]/40 font-[family-name:var(--font-mono)]">
                        {formatAlertTime(alert.timestamp)}
                      </span>
                    </div>
                    <p className="text-xs text-[#E9D5FF]/70 font-[family-name:var(--font-body)]">
                      {describeChange(alert)}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
