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
  trend: string | null; // Raw sheet value: "In Bull Run" | "In Bear Run" | "Unconfirmed" | null
  car_status: string | null; // Raw sheet value: "Buy/Average Out" | "Avoid/Hold" | "Short History" | null
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

// Filter options for the UI — use raw sheet values directly
export const FILTER_OPTIONS = [
  { value: "", label: "All" },
  { value: "In Bull Run", label: "In Bull Run" },
  { value: "In Bear Run", label: "In Bear Run" },
  { value: "Unconfirmed", label: "Unconfirmed" },
  { value: "Buy/Average Out", label: "Buy/Average Out" },
  { value: "Avoid/Hold", label: "Avoid/Hold" },
] as const;
