import React from "react";
import {
  Eye,
  Pencil,
  Trash2,
  ShoppingBag,
  Clock3,
} from "lucide-react";

const WaiterCard = ({
  waiter,
  onToggleStatus,
  onView,
  onEdit,
  onDelete,
}) => {

  const isActive =
    waiter.status === "Active";

  return (

    <div
      className="
        group
        relative
        overflow-hidden
        rounded-xl
        border
        border-[#252D38]
        bg-[#111722]
        p-5
        transition-all
        duration-200
        hover:border-[#394554]
      "
    >

      {/* TOP STATUS LINE */}

      <div
        className={`
          absolute
          left-0
          top-0
          h-[2px]
          w-full
          ${
            isActive
              ? "bg-[#22C55E]"
              : "bg-[#252D38]"
          }
        `}
      />


      {/* HEADER */}

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          {/* LETTER */}

          <div
            className={`
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              border
              text-base
              font-bold
              ${
                isActive
                  ? "border-[#FF7A18]/50 bg-[#1E1916] text-[#FF7A18]"
                  : "border-[#252D38] bg-[#161D27] text-[#7F8A99]"
              }
            `}
          >
            {waiter.name.charAt(0).toUpperCase()}
          </div>


          {/* NAME */}

          <div>

            <h3 className="text-sm font-semibold text-[#F8FAFC]">
              {waiter.name}
            </h3>

            <div className="mt-1 flex items-center gap-1.5">

              <span
                className={`
                  h-2
                  w-2
                  rounded-full
                  ${
                    isActive
                      ? "bg-[#22C55E]"
                      : "bg-[#64748B]"
                  }
                `}
              />

              <span
                className={`
                  text-[11px]
                  font-medium
                  ${
                    isActive
                      ? "text-[#22C55E]"
                      : "text-[#7F8A99]"
                  }
                `}
              >
                {isActive
                  ? "Online"
                  : "Offline"}
              </span>

            </div>

          </div>

        </div>


        {/* SWITCH */}

        <button
          type="button"
          onClick={() =>
            onToggleStatus(waiter.id)
          }
          className={`
            relative
            flex
            h-6
            w-11
            items-center
            rounded-full
            p-1
            transition-all
            ${
              isActive
                ? "bg-[#22C55E]"
                : "bg-[#252D38]"
            }
          `}
        >

          <span
            className={`
              h-4
              w-4
              rounded-full
              bg-white
              shadow-sm
              transition-transform
              ${
                isActive
                  ? "translate-x-5"
                  : "translate-x-0"
              }
            `}
          />

        </button>

      </div>


      {/* STATS */}

      <div className="mt-5 grid grid-cols-2 gap-3">

        <div className="rounded-lg border border-[#252D38] bg-[#080B12] p-3">

          <div className="flex justify-between">

            <span className="text-[9px] font-semibold uppercase tracking-wider text-[#66717F]">
              Orders
            </span>

            <ShoppingBag
              size={13}
              className="text-[#FF7A18]"
            />

          </div>

          <p className="mt-2 text-lg font-semibold">
            {waiter.orders}
          </p>

          <p className="text-[9px] text-[#66717F]">
            Handled today
          </p>

        </div>


        <div className="rounded-lg border border-[#252D38] bg-[#080B12] p-3">

          <div className="flex justify-between">

            <span className="text-[9px] font-semibold uppercase tracking-wider text-[#66717F]">
              Last Active
            </span>

            <Clock3
              size={13}
              className="text-[#7F8A99]"
            />

          </div>

          <p className="mt-2 truncate text-sm font-semibold">
            {waiter.lastActive}
          </p>

          <p className="text-[9px] text-[#66717F]">
            Activity status
          </p>

        </div>

      </div>


      {/* ACTION BAR */}

      <div className="mt-5 flex items-center justify-between border-t border-[#252D38] pt-3">

        <div className="flex items-center gap-1.5">

          <span
            className={`
              h-1.5
              w-1.5
              rounded-full
              ${
                isActive
                  ? "bg-[#22C55E]"
                  : "bg-[#64748B]"
              }
            `}
          />

          <span className="text-[10px] text-[#66717F]">
            {isActive
              ? "Available for orders"
              : "Currently unavailable"}
          </span>

        </div>


        <div className="flex items-center gap-1">

          {/* VIEW */}

          <button
            onClick={() => onView(waiter)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#252D38] bg-[#161D27] text-[#7F8A99] hover:border-[#3B82F6]/50 hover:text-[#3B82F6]"
            title="View"
          >
            <Eye size={14} />
          </button>


          {/* EDIT */}

          <button
            onClick={() => onEdit(waiter)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#252D38] bg-[#161D27] text-[#7F8A99] hover:border-[#FF7A18]/50 hover:text-[#FF7A18]"
            title="Edit"
          >
            <Pencil size={14} />
          </button>


          {/* DELETE */}

          <button
            onClick={() => onDelete(waiter.id)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#252D38] bg-[#161D27] text-[#7F8A99] hover:border-[#EF4444]/50 hover:text-[#EF4444]"
            title="Delete"
          >
            <Trash2 size={14} />
          </button>

        </div>

      </div>

    </div>
  );
};

export default WaiterCard;