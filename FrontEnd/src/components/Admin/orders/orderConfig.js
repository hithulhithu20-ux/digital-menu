// DINE QR Admin Orders configuration schema
export const ORDER_STATUSES = [
  "PENDING",
  "CONFIRMED",
  "PREPARING",
  "READY",
  "SERVED",
  "BILL_REQUESTED",
  "COMPLETED",
];

export const STATUS_CONFIGS = {
  PENDING: {
    label: "Pending",
    bgClass: "bg-[#F59E0B]/10 border-[#F59E0B]/25 text-[#F59E0B]",
    dotClass: "bg-[#F59E0B]",
  },
  CONFIRMED: {
    label: "Confirmed",
    bgClass: "bg-[#3B82F6]/10 border-[#3B82F6]/25 text-[#3B82F6]",
    dotClass: "bg-[#3B82F6]",
  },
  PREPARING: {
    label: "Preparing",
    bgClass: "bg-[#FF7A18]/10 border-[#FF7A18]/25 text-[#FF7A18]",
    dotClass: "bg-[#FF7A18]",
  },
  READY: {
    label: "Ready",
    bgClass: "bg-[#22C55E]/10 border-[#22C55E]/25 text-[#22C55E]",
    dotClass: "bg-[#22C55E]",
  },
  SERVED: {
    label: "Served",
    bgClass: "bg-[#22C55E]/10 border-[#22C55E]/25 text-[#22C55E]",
    dotClass: "bg-[#22C55E]",
  },
  BILL_REQUESTED: {
    label: "Bill Requested",
    bgClass: "bg-[#FF7A18]/10 border-[#FF7A18]/25 text-[#FF7A18] font-semibold animate-pulse",
    dotClass: "bg-[#FF7A18]",
  },
  COMPLETED: {
    label: "Completed",
    bgClass: "bg-[#22C55E]/10 border-[#22C55E]/25 text-[#22C55E]",
    dotClass: "bg-[#22C55E]",
  },
};

export const ACTIVITY_LABELS = {
  PLACED: "Order placed",
  CONFIRMED: "Order accepted",
  PREPARING: "Kitchen preparation started",
  READY: "Order marked ready",
  SERVED: "Order served",
  BILL_REQUESTED: "Bill requested",
  COMPLETED: "Payment completed",
};
