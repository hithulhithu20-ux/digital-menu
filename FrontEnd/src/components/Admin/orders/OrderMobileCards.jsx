import React from "react";
import { Clock, AlertTriangle } from "lucide-react";
import { STATUS_CONFIGS } from "./orderConfig";

export default function OrderMobileCards({
  orders,
  selectedOrder,
  onSelectOrder,
  getPreparedMinutes,
  getElapsedMinutesStr,
}) {
  return (
    <div className="grid grid-cols-1 gap-3 md:hidden">
      {orders.map((order) => {
        const statusConfig = STATUS_CONFIGS[order.status] || {
          label: order.status,
          bgClass: "bg-zinc-800 text-zinc-300",
          dotClass: "bg-zinc-600",
        };
        const isDelayed = getPreparedMinutes(order) > 15;
        const isPending = order.status === "PENDING";

        return (
          <div
            key={order._id}
            onClick={() => onSelectOrder(order)}
            className={`rounded-xl border border-[#1C2430] bg-[#111722] p-4 flex flex-col gap-3 active:bg-[#161D27] transition ${
              selectedOrder?._id === order._id ? "ring-1 ring-[#FF7A18]" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-[#F8FAFC]">
                #{order._id}
              </span>
              <div className="flex items-center gap-1.5">
                {isDelayed && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#EF4444]">
                    <AlertTriangle size={10} />
                    Delayed
                  </span>
                )}
                <span
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-2 py-0.5 text-[11px] font-bold ${statusConfig.bgClass}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dotClass}`} />
                  {statusConfig.label}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-[#A1ACBA]">Table:</span>{" "}
                <span className="font-extrabold text-[#F8FAFC]">Table {order.table.number}</span>
              </div>
              <div className="flex items-center gap-1 text-[#596474]">
                <Clock size={11} />
                <span>{getElapsedMinutesStr(order)}</span>
              </div>
            </div>

            <div className="border-t border-[#1C2430]/60 pt-2 flex items-center justify-between">
              <span className="text-xs font-medium text-[#596474]">
                {order.items.reduce((sum, i) => sum + i.quantity, 0)} Items • ₹{order.total.toFixed(2)}
              </span>
              {!isPending && order.waiter && (
                <div className="flex items-center gap-1">
                  <span className="text-xs font-semibold text-[#A1ACBA]">
                    {order.waiter.name}
                  </span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
