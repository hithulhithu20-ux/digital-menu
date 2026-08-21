import React from "react";

export default function OrderPriceBreakdown({ subtotal, tax, serviceCharge, total }) {
  return (
    <div className="rounded-xl border border-[#1C2430] p-4 bg-[#0D121A]/30 space-y-2.5">
      <div className="flex justify-between text-xs font-semibold text-[#A1ACBA]">
        <span>Subtotal</span>
        <span>₹{subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-xs font-semibold text-[#A1ACBA]">
        <span>Tax (8%)</span>
        <span>₹{tax.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-xs font-semibold text-[#A1ACBA]">
        <span>Service Charge (10%)</span>
        <span>₹{serviceCharge.toFixed(2)}</span>
      </div>
      <div className="border-t border-[#1C2430]/60 pt-2.5 flex justify-between items-center">
        <span className="text-sm font-bold text-[#F8FAFC]">Total</span>
        <span className="text-base font-extrabold text-[#FF7A18]">
          ₹{total.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
