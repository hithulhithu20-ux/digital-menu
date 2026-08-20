import React from "react";
import { UserRound } from "lucide-react";
import WaiterCard from "./WaiterCard";

const WaiterGrid = ({
  waiters,
  onToggleStatus,
  onView,
  onEdit,
  onDelete,
}) => {

  if (waiters.length === 0) {

    return (
      <div className="rounded-xl border border-[#252D38] bg-[#111722] px-5 py-16 text-center">

        <UserRound
          size={32}
          className="mx-auto mb-3 text-[#66717F]"
        />

        <p className="text-sm font-semibold">
          No waiters found
        </p>

        <p className="mt-1 text-xs text-[#7F8A99]">
          Try changing your search or add a new waiter.
        </p>

      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

      {waiters.map((waiter) => (

        <WaiterCard
          key={waiter.id}
          waiter={waiter}
          onToggleStatus={onToggleStatus}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />

      ))}

    </div>
  );
};

export default WaiterGrid;