import React from "react";
import { ACTIVITY_LABELS } from "./orderConfig";

export default function OrderActivityLog({ timeline }) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-bold text-[#596474] tracking-wider uppercase border-b border-[#1C2430]/60 pb-1.5">
        Activity Audit Log
      </h3>
      
      <div className="rounded-xl border border-[#1C2430] p-4 bg-[#0D121A]/30 space-y-3">
        {timeline.map((step, idx) => (
          <div key={idx} className="flex items-start justify-between gap-3 text-xs">
            <div className="flex gap-2">
              <span className="text-[#596474] font-medium shrink-0 mt-0.5">
                {step.timestamp}
              </span>
              <p className="text-[#A1ACBA]">
                <span className="font-semibold text-white">
                  {ACTIVITY_LABELS[step.status] || step.status}
                </span>
                <span className="block text-[10px] text-[#596474] mt-0.5">
                  {step.performedBy} {step.note ? `(${step.note})` : ""}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
