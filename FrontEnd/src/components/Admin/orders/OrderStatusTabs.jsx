import React from "react";

const TABS = [
  { key: "ALL", label: "All" },
  { key: "PENDING", label: "Pending" },
  { key: "CONFIRMED", label: "Confirmed" },
  { key: "PREPARING", label: "Preparing" },
  { key: "READY", label: "Ready" },
  { key: "SERVED", label: "Served" },
  { key: "BILL_REQUESTED", label: "Bill Requested" },
  { key: "COMPLETED", label: "Completed" },
];

export default function OrderStatusTabs({ statusFilter, setStatusFilter, statusCounts }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#1C2430] border-b border-[#1C2430]">
      {TABS.map((tab) => {
        const isActive = statusFilter === tab.key;
        return (
          <button
            key={tab.key}
            onClick={() => setStatusFilter(tab.key)}
            className={`flex items-center gap-1.5 h-10 px-4 rounded-xl text-xs font-bold transition-all whitespace-nowrap border cursor-pointer ${
              isActive
                ? "bg-[#FF7A18]/15 border-[#FF7A18] text-[#FF7A18] shadow-sm"
                : "bg-[#111722] border-[#1C2430] text-[#A1ACBA] hover:text-[#F8FAFC] hover:border-[#596474]"
            }`}
          >
            {tab.label}
            <span
              className={`px-1.5 py-0.5 rounded-md text-[10px] font-semibold ${
                isActive ? "bg-[#FF7A18]/20 text-[#FF7A18]" : "bg-[#1C2430] text-[#596474]"
              }`}
            >
              {statusCounts[tab.key] || 0}
            </span>
          </button>
        );
      })}
    </div>
  );
}
