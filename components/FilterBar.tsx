"use client";

import type { Category } from "@/types";
import { FILTER_OPTIONS } from "@/types";

interface FilterBarProps {
  categories: Category[];
  selectedCategory: string;
  selectedFilter: string;
  onCategoryChange: (categoryId: string) => void;
  onFilterChange: (filter: string) => void;
}

export default function FilterBar({
  categories,
  selectedCategory,
  selectedFilter,
  onCategoryChange,
  onFilterChange,
}: FilterBarProps) {
  return (
    <div className="bg-[#1E1438]/50 border-b border-[#1E1438]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row gap-3">
        {/* Category Dropdown */}
        <div className="flex-1">
          <label
            htmlFor="category-select"
            className="block text-xs text-[#E9D5FF]/50 mb-1 font-[family-name:var(--font-body)]"
          >
            Category
          </label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full bg-[#0D0818] border border-[#7C3AED]/30 rounded-lg px-3 py-2 text-sm text-[#FAF7FF] font-[family-name:var(--font-body)] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/50 focus:border-[#7C3AED] transition-all cursor-pointer appearance-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23A855F7' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 12px center",
              paddingRight: "36px",
            }}
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name} ({cat.stock_count})
              </option>
            ))}
          </select>
        </div>

        {/* Filter Dropdown */}
        <div className="flex-1">
          <label
            htmlFor="filter-select"
            className="block text-xs text-[#E9D5FF]/50 mb-1 font-[family-name:var(--font-body)]"
          >
            Technical Analysis
          </label>
          <select
            id="filter-select"
            value={selectedFilter}
            onChange={(e) => onFilterChange(e.target.value)}
            className="w-full bg-[#0D0818] border border-[#7C3AED]/30 rounded-lg px-3 py-2 text-sm text-[#FAF7FF] font-[family-name:var(--font-body)] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/50 focus:border-[#7C3AED] transition-all cursor-pointer appearance-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23A855F7' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 12px center",
              paddingRight: "36px",
            }}
          >
            {FILTER_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
