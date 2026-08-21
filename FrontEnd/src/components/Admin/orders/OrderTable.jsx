import React from "react";
import { Clock, AlertTriangle } from "lucide-react";
import { STATUS_CONFIGS } from "./orderConfig";

export default function OrderTable({
  orders,
  selectedOrder,
  onSelectOrder,
  getPreparedMinutes,
  getElapsedMinutesStr,
}) {
  return (
    <div className="hidden md:block overflow-hidden rounded-xl border border-[#1C2430] bg-[#111722] shadow-xs">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#0D121A] border-b border-[#1C2430]">
            <th className="px-6 py-4 text-[10px] font-bold text-[#596474] uppercase tracking-wider">Order</th>
            <th className="px-6 py-4 text-[10px] font-bold text-[#596474] uppercase tracking-wider">Table</th>
            <th className="px-6 py-4 text-[10px] font-bold text-[#596474] uppercase tracking-wider">Items</th>
            <th className="px-6 py-4 text-[10px] font-bold text-[#596474] uppercase tracking-wider">Amount</th>
            <th className="px-6 py-4 text-[10px] font-bold text-[#596474] uppercase tracking-wider">Status</th>
            <th className="px-6 py-4 text-[10px] font-bold text-[#596474] uppercase tracking-wider">Waiter</th>
            <th className="px-6 py-4 text-[10px] font-bold text-[#596474] uppercase tracking-wider">Time</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1C2430]">
          {orders.map((order) => {
            const statusConfig = STATUS_CONFIGS[order.status] || {
              label: order.status,
              bgClass: "bg-zinc-800 text-zinc-300",
              dotClass: "bg-zinc-600",
            };
            const isDelayed = getPreparedMinutes(order) > 15;
            const isPending = order.status === "PENDING";

            return (
              <tr
                key={order._id}
                onClick={() => onSelectOrder(order)}
                className={`group cursor-pointer transition hover:bg-[#161D27] ${
                  selectedOrder?._id === order._id ? "bg-[#161D27]/80" : ""
                }`}
              >
                {/* Order ID Column */}
                <td className="px-6 py-4 relative">
                  {selectedOrder?._id === order._id && (
                    <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#FF7A18]" />
                  )}
                  <span className="text-sm font-bold text-[#F8FAFC] group-hover:text-[#FF7A18] transition">
                    #{order._id}
                  </span>
                </td>

                {/* Table Column */}
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 rounded bg-[#0D121A] px-2 py-1 text-xs font-bold text-[#F8FAFC] border border-[#1C2430]">
                    Table {order.table.number}
                  </span>
                </td>

                {/* Items Column */}
                <td className="px-6 py-4 max-w-[200px] truncate">
                  <span className="text-sm font-semibold text-[#F8FAFC]">
                    {order.items.reduce((sum, i) => sum + i.quantity, 0)} items
                  </span>
                  <span className="block text-[11px] text-[#596474] truncate">
                    {order.items.map((i) => `${i.quantity}x ${i.name}`).join(", ")}
                  </span>
                </td>

                {/* Amount Column */}
                <td className="px-6 py-4">
                  <span className="text-sm font-bold text-[#F8FAFC]">
                    ₹{order.total.toFixed(2)}
                  </span>
                </td>

                {/* Status Column */}
                <td className="px-6 py-4">
                  <div className="flex flex-col items-start gap-1">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-lg border px-2 py-0.5 text-xs font-bold ${statusConfig.bgClass}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dotClass}`} />
                      {statusConfig.label}
                    </span>
                    {isDelayed && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#EF4444] animate-pulse">
                        <AlertTriangle size={10} />
                        Delayed
                      </span>
                    )}
                  </div>
                </td>

                {/* Waiter Column */}
                <td className="px-6 py-4">
                  {isPending ? (
                    <span className="text-xs text-[#596474] font-medium">
                      Not assigned
                    </span>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1C2430] border border-[#596474]/20 text-[10px] font-bold text-[#A1ACBA]">
                        {order.waiter?.avatar || "W"}
                      </div>
                      <span className="text-xs font-semibold text-[#A1ACBA]">
                        {order.waiter?.name || "Unassigned"}
                      </span>
                    </div>
                  )}
                </td>

                {/* Time Column */}
                <td className="px-6 py-4 text-xs text-[#596474]">
                  <div className="flex items-center gap-1.5">
                    <Clock size={12} />
                    {getElapsedMinutesStr(order)}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
