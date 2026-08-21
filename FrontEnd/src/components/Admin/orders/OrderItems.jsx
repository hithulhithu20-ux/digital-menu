import React from "react";
import { Package } from "lucide-react";

export default function OrderItems({ items }) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-bold text-[#596474] tracking-wider uppercase border-b border-[#1C2430]/60 pb-1.5">
        ITEMS ({items.length})
      </h3>
      
      <div className="divide-y divide-[#1C2430]/50 space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className="flex gap-3 pt-3 first:pt-0">
            {/* Thumbnail */}
            <div className="w-12 h-12 rounded-lg bg-[#0D121A] border border-[#1C2430] overflow-hidden flex items-center justify-center shrink-0">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Package size={16} className="text-[#596474]" />
              )}
            </div>

            {/* Item Details */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#F8FAFC] truncate">
                {item.name}
              </p>
              <p className="text-xs text-[#A1ACBA] mt-0.5">
                {item.quantity} × ₹{item.price.toFixed(2)}
              </p>
              {item.addons && item.addons.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {item.addons.map((add, i) => (
                    <span
                      key={i}
                      className="text-[9px] font-medium bg-[#1C2430] text-[#A1ACBA] px-1.5 py-0.5 rounded"
                    >
                      + {add}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Item total */}
            <span className="text-sm font-bold text-[#F8FAFC] shrink-0">
              ₹{(item.quantity * item.price).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
