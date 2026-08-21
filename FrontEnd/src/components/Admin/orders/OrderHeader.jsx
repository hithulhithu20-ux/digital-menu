import React from "react";
import { Search } from "lucide-react";

export default function OrderHeader({ searchQuery, setSearchQuery, children }) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-[#1C2430] pb-6">
      <div className="space-y-1.5">
        <h1 className="text-3xl font-extrabold tracking-tight text-[#F8FAFC]">
          Orders
        </h1>
        <p className="text-sm font-medium text-[#A1ACBA]">
          Monitor every order across your restaurant.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1 sm:w-72">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#596474]">
            <Search size={16} />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search orders, tables or waiters..."
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#1C2430] bg-[#111722] text-sm text-[#F8FAFC] placeholder-[#596474] focus:outline-none focus:border-[#FF7A18] focus:ring-1 focus:ring-[#FF7A18] transition"
          />
        </div>

        {/* Date Filters Component will render here as children */}
        {children}
      </div>
    </div>
  );
}
