import React from "react";
import { Calendar, ChevronDown } from "lucide-react";

export default function OrderFilters({
  dateFilter,
  setDateFilter,
  customStartDate,
  setCustomStartDate,
  customEndDate,
  setCustomEndDate,
}) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
      {/* Date Filter Dropdown */}
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#596474]">
          <Calendar size={16} />
        </span>
        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="h-11 pl-10 pr-10 rounded-xl border border-[#1C2430] bg-[#111722] text-sm font-medium text-[#F8FAFC] appearance-none focus:outline-none focus:border-[#FF7A18] transition cursor-pointer min-w-[150px]"
        >
          <option value="TODAY">Today</option>
          <option value="YESTERDAY">Yesterday</option>
          <option value="WEEK">Last 7 Days</option>
          <option value="MONTH">Last 30 Days</option>
          <option value="CUSTOM">Custom Range</option>
        </select>
        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-[#596474]">
          <ChevronDown size={14} />
        </span>
      </div>

      {/* Custom Date Range Inline Fields (if CUSTOM is selected) */}
      {dateFilter === "CUSTOM" && (
        <div className="flex flex-wrap items-center gap-2.5 p-2 rounded-xl bg-[#0D121A] border border-[#1C2430] text-xs">
          <div className="flex items-center gap-1.5">
            <input
              type="date"
              value={customStartDate}
              onChange={(e) => setCustomStartDate(e.target.value)}
              className="h-8 px-2 rounded-lg border border-[#1C2430] bg-[#111722] text-[#F8FAFC] focus:outline-none focus:border-[#FF7A18] transition"
            />
            <span className="text-[#596474]">to</span>
            <input
              type="date"
              value={customEndDate}
              onChange={(e) => setCustomEndDate(e.target.value)}
              className="h-8 px-2 rounded-lg border border-[#1C2430] bg-[#111722] text-[#F8FAFC] focus:outline-none focus:border-[#FF7A18] transition"
            />
          </div>
          {(customStartDate || customEndDate) && (
            <button
              onClick={() => {
                setCustomStartDate("");
                setCustomEndDate("");
              }}
              className="text-[#EF4444] hover:underline font-bold"
            >
              Reset
            </button>
          )}
        </div>
      )}
    </div>
  );
}
