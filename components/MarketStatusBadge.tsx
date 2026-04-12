"use client";

interface MarketStatusBadgeProps {
  isOpen: boolean;
}

export default function MarketStatusBadge({ isOpen }: MarketStatusBadgeProps) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`w-2.5 h-2.5 rounded-full ${
          isOpen
            ? "bg-[#22C55E] shadow-[0_0_8px_rgba(34,197,94,0.6)]"
            : "bg-[#6B7280]"
        }`}
      />
      <span className="text-sm font-[family-name:var(--font-body)] text-[#E9D5FF]">
        {isOpen ? "Market Open" : "Market Closed"}
      </span>
    </div>
  );
}
