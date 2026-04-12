// API call wrappers — all requests include Firebase auth token

import { getFirebaseAuth } from "./firebase";
import type { Category, Stock, Alert, MarketStatus } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function getAuthHeaders(): Promise<HeadersInit> {
  const auth = getFirebaseAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");
  const token = await user.getIdToken();
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  };
}

async function apiFetch<T>(path: string): Promise<T> {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_URL}${path}`, { headers });
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function getCategories(): Promise<Category[]> {
  return apiFetch<Category[]>("/categories");
}

export async function getStocks(
  category: string,
  filter?: string
): Promise<Stock[]> {
  const params = new URLSearchParams({ category });
  if (filter) params.set("filter", filter);
  return apiFetch<Stock[]>(`/stocks?${params.toString()}`);
}

export async function getAlerts(): Promise<Alert[]> {
  return apiFetch<Alert[]>("/alerts");
}

export async function getMarketStatus(): Promise<MarketStatus> {
  return apiFetch<MarketStatus>("/market-status");
}
