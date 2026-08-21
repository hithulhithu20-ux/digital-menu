import React from "react";

export default function OrderTimeline({ timeline }) {
  return (
    <div className="space-y-4">
      <h3 className="text-xs font-bold text-[#596474] tracking-wider uppercase border-b border-[#1C2430]/60 pb-1.5">
        Order Timeline
      </h3>
      
      <div className="relative pl-6 space-y-6">
        {/* Vertical connector line */}
        <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-[#1C2430]" />

        {timeline.map((step, index) => {
          const isActiveStep = index === timeline.length - 1;
          
          let dotColor = "bg-[#1C2430]";
          if (step.status === "PREPARING") dotColor = "bg-[#FF7A18]";
          else if (step.status === "CONFIRMED") dotColor = "bg-[#3B82F6]";
          else if (["READY", "SERVED", "COMPLETED"].includes(step.status)) dotColor = "bg-[#22C55E]";
          else if (step.status === "BILL_REQUESTED") dotColor = "bg-[#F59E0B]";

          return (
            <div key={index} className="relative flex flex-col gap-0.5">
              {/* Timeline node dot */}
              <div
                className={`absolute -left-6 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-[#111722] ${dotColor} ${
                  isActiveStep ? "ring-2 ring-white/10 scale-110" : ""
                }`}
              />

              <div className="flex items-center justify-between text-xs">
                <span
                  className={`font-bold uppercase tracking-wider ${
                    isActiveStep ? "text-[#F8FAFC]" : "text-[#A1ACBA]"
                  }`}
                >
                  {step.status.replace("_", " ")}
                </span>
                <span className="text-[#596474] font-medium">{step.timestamp}</span>
              </div>

              <span className="text-[11px] text-[#A1ACBA] font-medium">
                Performed by: {step.performedBy}
              </span>
              
              {step.note && (
                <span className="text-[11px] text-[#596474] italic mt-0.5">
                  Note: "{step.note}"
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
