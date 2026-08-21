import React from "react";
import { X, AlertTriangle, MapPin, UserRound, Clock } from "lucide-react";
import { STATUS_CONFIGS } from "./orderConfig";
import OrderItems from "./OrderItems";
import OrderPriceBreakdown from "./OrderPriceBreakdown";
import OrderTimeline from "./OrderTimeline";
import OrderActivityLog from "./OrderActivityLog";

export default function OrderDrawer({ order, onClose, getPreparedMinutes }) {
  if (!order) return null;

  const isPending = order.status === "PENDING";
  const isPreparing = order.status === "PREPARING";
  const preparedMinutes = getPreparedMinutes(order);
  const isDelayed = isPreparing && preparedMinutes > 15;
  const statusConfig = STATUS_CONFIGS[order.status] || {
    label: order.status,
    bgClass: "bg-zinc-855 text-zinc-300",
  };
  
  const placedTime = order.timeline.find((t) => t.status === "PLACED")?.timestamp || "00:00";

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Slide-out Panel */}
      <div className="fixed top-0 right-0 h-full w-full sm:w-[440px] bg-[#111722] border-l border-[#1C2430] shadow-2xl z-50 flex flex-col transition-transform duration-300 transform translate-x-0">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#1C2430] flex items-center justify-between bg-[#0D121A]">
          <div>
            <span className="text-[10px] font-bold tracking-wider text-[#596474] uppercase block">
              Order Details
            </span>
            <div className="flex items-center gap-2 mt-1">
              <h2 className="text-lg font-bold text-[#F8FAFC]">
                ORDER #{order._id}
              </h2>
              <span
                className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-semibold ${statusConfig.bgClass}`}
              >
                {statusConfig.label}
              </span>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 rounded-lg border border-[#1C2430] hover:border-[#596474] text-[#A1ACBA] hover:text-[#F8FAFC] transition cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Drawer Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          
          {/* Delayed Indicator Warning */}
          {isDelayed && (
            <div className="p-3 rounded-lg border border-[#EF4444]/20 bg-[#EF4444]/5 flex items-start gap-2.5">
              <AlertTriangle size={16} className="text-[#EF4444] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-[#EF4444]">
                  ⚠ Delayed preparation warning
                </p>
                <p className="text-[11px] text-[#A1ACBA] mt-0.5">
                  This order has been preparing for {preparedMinutes} minutes. Consider alerting the kitchen staff.
                </p>
              </div>
            </div>
          )}

          {/* Key Metadata Cards */}
          <div className="grid grid-cols-2 gap-3">
            
            {/* Table Info */}
            <div className="p-3 rounded-lg border border-[#1C2430] bg-[#0D121A]/50 space-y-1">
              <div className="flex items-center gap-1.5 text-[#596474]">
                <MapPin size={12} />
                <span className="text-[10px] font-bold uppercase tracking-wider">Table</span>
              </div>
              <p className="text-sm font-bold text-[#F8FAFC]">
                Table {order.table.number}
              </p>
              <p className="text-[10px] text-[#A1ACBA]">
                {order.table.floor}
              </p>
            </div>

            {/* Waiter Info - Handles Pending Unassigned State */}
            {isPending ? (
              <div className="p-3 rounded-lg border border-[#1C2430] bg-[#0D121A]/50 space-y-1">
                <div className="flex items-center gap-1.5 text-[#596474]">
                  <UserRound size={12} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Waiter</span>
                </div>
                <p className="text-sm font-bold text-[#596474]">
                  Not assigned
                </p>
                <p className="text-[10px] text-[#A1ACBA]">
                  Waiting for staff acceptance
                </p>
              </div>
            ) : (
              <div className="p-3 rounded-lg border border-[#1C2430] bg-[#0D121A]/50 space-y-1">
                <div className="flex items-center gap-1.5 text-[#596474]">
                  <UserRound size={12} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Waiter</span>
                </div>
                <p className="text-sm font-bold text-[#F8FAFC]">
                  {order.waiter?.name || "Unassigned"}
                </p>
                <p className="text-[10px] text-[#A1ACBA]">
                  Active staff
                </p>
              </div>
            )}

            {/* Customer Info */}
            <div className="p-3 rounded-lg border border-[#1C2430] bg-[#0D121A]/50 space-y-1">
              <div className="flex items-center gap-1.5 text-[#596474]">
                <UserRound size={12} />
                <span className="text-[10px] font-bold uppercase tracking-wider">Customer</span>
              </div>
              <p className="text-sm font-bold text-[#F8FAFC] truncate">
                {order.customer.name}
              </p>
            </div>

            {/* Order Time */}
            <div className="p-3 rounded-lg border border-[#1C2430] bg-[#0D121A]/50 space-y-1">
              <div className="flex items-center gap-1.5 text-[#596474]">
                <Clock size={12} />
                <span className="text-[10px] font-bold uppercase tracking-wider">Order Time</span>
              </div>
              <p className="text-sm font-bold text-[#F8FAFC]">
                {placedTime}
              </p>
            </div>
          </div>

          {/* Ordered Items List */}
          <OrderItems items={order.items} />

          {/* Price Breakdown */}
          <OrderPriceBreakdown
            subtotal={order.subtotal}
            tax={order.tax}
            serviceCharge={order.serviceCharge}
            total={order.total}
          />

          {/* Timeline Visual Progress */}
          <OrderTimeline timeline={order.timeline} />

          {/* Activity logs */}
          <OrderActivityLog timeline={order.timeline} />

        </div>
      </div>
    </>
  );
}
