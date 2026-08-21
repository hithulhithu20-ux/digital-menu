import React from "react";
import { ShoppingBag } from "lucide-react";

export default function OrderEmptyState({ onReset }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[#111722] border border-[#1C2430] flex items-center justify-center text-[#596474]">
        <ShoppingBag size={28} />
      </div>
      <div>
        <p className="text-white font-bold text-lg">No orders found</p>
        <p className="text-zinc-500 text-sm mt-1 max-w-xs mx-auto">
          Try changing your filters, search query, or date range.
        </p>
      </div>
      <button
        onClick={onReset}
        className="mt-2 h-9 px-5 rounded-lg border border-[#1C2430] hover:border-zinc-700 bg-[#111722] text-xs font-bold transition-all text-[#F8FAFC] cursor-pointer"
      >
        Reset Filters
      </button>
    </div>
  );
}
