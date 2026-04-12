"use client";

import MarketStatusBadge from "./MarketStatusBadge";

interface TopBarProps {
  lastRefreshed: string | null;
  isMarketOpen: boolean;
  refreshing: boolean;
  onSignOut: () => void;
}

function RiseLogo() {
  return (
    <svg
      viewBox="0 0 48 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-12"
    >
      {/* Arch / rainbow shape */}
      <path
        d="M4 28 C4 12, 44 12, 44 28"
        stroke="url(#archGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M10 28 C10 16, 38 16, 38 28"
        stroke="url(#archGradient2)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
      {/* Small circle at top center */}
      <circle cx="24" cy="10" r="3" fill="url(#circleGradient)" />
      <defs>
        <linearGradient id="archGradient" x1="4" y1="20" x2="44" y2="20">
          <stop offset="0%" stopColor="#7C3AED" />
          <stop offset="50%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        <linearGradient id="archGradient2" x1="10" y1="20" x2="38" y2="20">
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#FB923C" />
        </linearGradient>
        <radialGradient id="circleGradient">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#FB923C" />
        </radialGradient>
      </defs>
    </svg>
  );
}

function formatRefreshTime(isoString: string | null): string {
  if (!isoString) return "—";
  try {
    const date = new Date(isoString);
    return `Updated ${date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Kolkata",
    })} IST`;
  } catch {
    return "—";
  }
}

export default function TopBar({
  lastRefreshed,
  isMarketOpen,
  refreshing,
  onSignOut,
}: TopBarProps) {
  return (
    <header className="sticky top-0 z-50 bg-[#0D0818]/95 backdrop-blur-md border-b border-[#1E1438]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left: Logo + Wordmark */}
        <div className="flex items-center gap-3">
          <RiseLogo />
          <span className="text-xl font-medium tracking-wide text-[#FAF7FF] font-[family-name:var(--font-body)]">
            RISE
          </span>
        </div>

        {/* Centre: Refresh timestamp */}
        <div className="hidden sm:flex items-center gap-2">
          {refreshing && (
            <span className="text-xs text-[#A855F7] animate-pulse font-[family-name:var(--font-body)]">
              Refreshing...
            </span>
          )}
          <span className="text-sm text-[#E9D5FF]/70 font-[family-name:var(--font-mono)]">
            {formatRefreshTime(lastRefreshed)}
          </span>
        </div>

        {/* Right: Market status + Sign out */}
        <div className="flex items-center gap-4">
          <MarketStatusBadge isOpen={isMarketOpen} />
          <button
            onClick={onSignOut}
            className="px-3 py-1.5 text-sm rounded-lg border border-[#1E1438] text-[#E9D5FF]/70 hover:text-[#FAF7FF] hover:border-[#7C3AED]/50 transition-all duration-200 font-[family-name:var(--font-body)]"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}
