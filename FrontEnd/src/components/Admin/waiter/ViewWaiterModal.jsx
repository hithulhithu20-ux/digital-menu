import React from "react";
import {
  X,
  Pencil,
  Eye,
  EyeOff,
} from "lucide-react";
import { useState } from "react";

const ViewWaiterModal = ({
  waiter,
  onClose,
  onEdit,
}) => {

  const [showPassword, setShowPassword] =
    useState(false);

  const isActive =
    waiter.status === "Active";

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">

      <div className="w-full max-w-md overflow-hidden rounded-xl border border-[#252D38] bg-[#111722] shadow-2xl">

        {/* HEADER */}

        <div className="flex items-center justify-between border-b border-[#252D38] px-5 py-4">

          <div>

            <h2 className="text-base font-semibold">
              Waiter Details
            </h2>

            <p className="mt-1 text-xs text-[#7F8A99]">
              Staff profile and login information
            </p>

          </div>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-md text-[#7F8A99] hover:bg-[#202936] hover:text-white"
          >
            <X size={17} />
          </button>

        </div>


        {/* BODY */}

        <div className="space-y-4 p-5">

          {/* PROFILE */}

          <div className="flex items-center gap-4">

            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#FF7A18]/40 bg-[#1E1916] text-xl font-bold text-[#FF7A18]">
              {waiter.name.charAt(0)}
            </div>

            <div>

              <h3 className="text-lg font-semibold">
                {waiter.name}
              </h3>

              <div className="mt-1 flex items-center gap-2">

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
                  className={
                    isActive
                      ? "text-xs text-[#22C55E]"
                      : "text-xs text-[#7F8A99]"
                  }
                >
                  {isActive
                    ? "Online"
                    : "Offline"}
                </span>

              </div>

            </div>

          </div>


          {/* EMAIL */}

          <div className="rounded-lg border border-[#252D38] bg-[#080B12] p-3">

            <p className="text-[10px] uppercase tracking-wide text-[#66717F]">
              Email
            </p>

            <p className="mt-1 text-sm text-[#F8FAFC]">
              {waiter.email}
            </p>

          </div>


          {/* PASSWORD */}

          <div className="rounded-lg border border-[#252D38] bg-[#080B12] p-3">

            <p className="text-[10px] uppercase tracking-wide text-[#66717F]">
              Password
            </p>

            <div className="mt-1 flex items-center justify-between">

              <p className="text-sm text-[#F8FAFC]">
                {showPassword
                  ? waiter.password
                  : "••••••••••"}
              </p>

              <button
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="text-[#7F8A99] hover:text-white"
              >
                {showPassword ? (
                  <EyeOff size={15} />
                ) : (
                  <Eye size={15} />
                )}
              </button>

            </div>

          </div>


          {/* PHONE */}

          <div className="rounded-lg border border-[#252D38] bg-[#080B12] p-3">

            <p className="text-[10px] uppercase tracking-wide text-[#66717F]">
              Phone
            </p>

            <p className="mt-1 text-sm">
              {waiter.phone}
            </p>

          </div>


          {/* STATS */}

          <div className="grid grid-cols-2 gap-3">

            <div className="rounded-lg border border-[#252D38] bg-[#080B12] p-3">

              <p className="text-[10px] uppercase tracking-wide text-[#66717F]">
                Orders
              </p>

              <p className="mt-1 text-lg font-semibold">
                {waiter.orders}
              </p>

            </div>

            <div className="rounded-lg border border-[#252D38] bg-[#080B12] p-3">

              <p className="text-[10px] uppercase tracking-wide text-[#66717F]">
                Last Active
              </p>

              <p className="mt-1 text-sm font-medium">
                {waiter.lastActive}
              </p>

            </div>

          </div>

        </div>


        {/* FOOTER */}

        <div className="flex justify-end gap-2 border-t border-[#252D38] px-5 py-4">

          <button
            onClick={onClose}
            className="rounded-md border border-[#252D38] bg-[#161D27] px-4 py-2 text-sm text-[#A1ACBA]"
          >
            Close
          </button>

          <button
            onClick={onEdit}
            className="flex items-center gap-2 rounded-md bg-[#FF7A18] px-4 py-2 text-sm font-semibold text-white hover:bg-[#FF8A32]"
          >
            <Pencil size={15} />
            Edit
          </button>

        </div>

      </div>

    </div>
  );
};

export default ViewWaiterModal;