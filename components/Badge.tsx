"use client";

type BadgeType = "trend" | "car";

interface BadgeProps {
  type: BadgeType;
  value: string | null;
}

// Colour maps keyed on raw sheet values
const TREND_COLORS: Record<string, string> = {
  "In Bull Run": "bg-[#7C3AED]/20 text-[#A855F7] border-[#7C3AED]/40",
  "In Bear Run": "bg-[#EF4444]/20 text-[#EF4444] border-[#EF4444]/40",
  "Unconfirmed": "bg-[#6B7280]/20 text-[#6B7280] border-[#6B7280]/40",
};

const CAR_COLORS: Record<string, string> = {
  "Buy/Average Out": "bg-[#22C55E]/20 text-[#22C55E] border-[#22C55E]/40",
  "Avoid/Hold": "bg-[#EF4444]/20 text-[#EF4444] border-[#EF4444]/40",
  "Short History": "bg-[#6B7280]/20 text-[#6B7280] border-[#6B7280]/40",
};

export default function Badge({ type, value }: BadgeProps) {
  if (!value) {
    return <span className="text-[#6B7280] text-sm font-[family-name:var(--font-body)]">—</span>;
  }

  const colorMap = type === "trend" ? TREND_COLORS : CAR_COLORS;
  const colors = colorMap[value] || "bg-[#6B7280]/20 text-[#6B7280] border-[#6B7280]/40";

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors} font-[family-name:var(--font-body)] whitespace-nowrap`}
    >
      {value}
    </span>
  );
}
