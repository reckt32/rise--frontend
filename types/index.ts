// Shared TypeScript types for the RISE frontend

export interface Category {
  id: string;
  name: string;
  stock_count: number;
}

export interface Stock {
  ticker: string;
  cmp: number | null;
  diff_200dma: number | null;
  trend: string | null; // "bull_run" | "bear_run" | "unconfirmed" | null
  car_status: string | null; // "meets_car" | "not_car" | "insufficient_data" | null
  changed: boolean;
}

export interface Alert {
  ticker: string;
  previous_trend: string | null;
  current_trend: string | null;
  previous_car: string | null;
  current_car: string | null;
  timestamp: string;
}

export interface MarketStatus {
  is_open: boolean;
  next_open: string;
  last_refreshed: string;
}

// Display label maps — compliance transform
export const TREND_LABELS: Record<string, string> = {
  bull_run: "Above all averages",
  bear_run: "Below all averages",
  unconfirmed: "Mixed signals",
};

export const CAR_LABELS: Record<string, string> = {
  meets_car: "Meets CAR criteria",
  not_car: "Does not meet CAR criteria",
  insufficient_data: "Insufficient data",
};

export function getTrendLabel(value: string | null): string {
  if (!value) return "—";
  return TREND_LABELS[value] || "—";
}

export function getCarLabel(value: string | null): string {
  if (!value) return "—";
  return CAR_LABELS[value] || "—";
}

// Filter options for the UI
export const FILTER_OPTIONS = [
  { value: "", label: "All" },
  { value: "bull_run", label: "Above all averages" },
  { value: "bear_run", label: "Below all averages" },
  { value: "unconfirmed", label: "Mixed signals" },
  { value: "meets_car", label: "Meets CAR criteria" },
  { value: "not_car", label: "Does not meet CAR criteria" },
] as const;
