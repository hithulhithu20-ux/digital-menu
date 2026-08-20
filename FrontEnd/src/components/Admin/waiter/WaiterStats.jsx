import React from "react";
import {
  UserRound,
  CircleCheck,
  ShoppingBag,
} from "lucide-react";

const WaiterStats = ({
  total,
  active,
  orders,
}) => {

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">

      {/* TOTAL */}

      <div className="rounded-xl border border-[#252D38] bg-[#111722] p-4">

        <div className="mb-3 flex justify-between">

          <span className="text-xs text-[#7F8A99]">
            Total Staff
          </span>

          <UserRound
            size={17}
            className="text-[#FF7A18]"
          />

        </div>

        <p className="text-2xl font-semibold">
          {total}
        </p>

        <p className="mt-1 text-xs text-[#7F8A99]">
          Registered waiters
        </p>

      </div>


      {/* ONLINE */}

      <div className="rounded-xl border border-[#252D38] bg-[#111722] p-4">

        <div className="mb-3 flex justify-between">

          <span className="text-xs text-[#7F8A99]">
            Online Now
          </span>

          <CircleCheck
            size={17}
            className="text-[#22C55E]"
          />

        </div>

        <p className="text-2xl font-semibold">
          {active}
        </p>

        <p className="mt-1 text-xs text-[#22C55E]">
          Currently online
        </p>

      </div>


      {/* ORDERS */}

      <div className="rounded-xl border border-[#252D38] bg-[#111722] p-4">

        <div className="mb-3 flex justify-between">

          <span className="text-xs text-[#7F8A99]">
            Orders Handled
          </span>

          <ShoppingBag
            size={17}
            className="text-[#FF7A18]"
          />

        </div>

        <p className="text-2xl font-semibold">
          {orders}
        </p>

        <p className="mt-1 text-xs text-[#7F8A99]">
          Today's activity
        </p>

      </div>

    </div>
  );
};

export default WaiterStats;