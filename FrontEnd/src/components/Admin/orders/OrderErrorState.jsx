import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function OrderErrorState({ onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-[#EF4444]/20 bg-[#EF4444]/5 max-w-xl mx-auto my-8">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EF4444]/10 text-[#EF4444] mb-4">
        <AlertTriangle size={28} />
      </div>
      <h3 className="text-lg font-bold text-[#F8FAFC]">Unable to load orders</h3>
      <p className="mt-1 text-sm text-[#A1ACBA] max-w-sm">
        Something went wrong while loading restaurant orders. Please try again.
      </p>
      <button
        onClick={onRetry}
        className="mt-4 flex items-center gap-2 h-10 px-6 rounded-lg bg-[#FF7A18] hover:bg-[#FF8A32] text-sm font-semibold text-white transition active:scale-95"
      >
        <RefreshCw size={14} />
        <span>Retry</span>
      </button>
    </div>
  );
}
