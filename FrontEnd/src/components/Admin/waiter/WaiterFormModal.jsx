import React from "react";
import { X } from "lucide-react";

const WaiterFormModal = ({
  type,
  form,
  onChange,
  onClose,
  onSave,
}) => {

  const isEdit = type === "edit";

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">

      <div className="w-full max-w-md overflow-hidden rounded-xl border border-[#252D38] bg-[#111722] shadow-2xl">

        {/* HEADER */}

        <div className="flex items-center justify-between border-b border-[#252D38] px-5 py-4">

          <div>

            <h2 className="text-base font-semibold">
              {isEdit
                ? "Edit Waiter"
                : "Add Waiter"}
            </h2>

            <p className="mt-1 text-xs text-[#7F8A99]">
              {isEdit
                ? "Update staff information."
                : "Add a new floor staff member."}
            </p>

          </div>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-md text-[#7F8A99] hover:bg-[#202936] hover:text-white"
          >
            <X size={17} />
          </button>

        </div>


        {/* FORM */}

        <div className="space-y-4 p-5">

          {/* NAME */}

          <div>

            <label className="mb-1.5 block text-xs font-medium text-[#A1ACBA]">
              Name
            </label>

            <input
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder="Enter waiter name"
              className="h-10 w-full rounded-md border border-[#252D38] bg-[#080B12] px-3 text-sm text-white outline-none placeholder:text-[#66717F] focus:border-[#FF7A18]"
            />

          </div>


          {/* PHONE */}

          <div>

            <label className="mb-1.5 block text-xs font-medium text-[#A1ACBA]">
              Phone
            </label>

            <input
              name="phone"
              value={form.phone}
              onChange={onChange}
              placeholder="+91 XXXXX XXXXX"
              className="h-10 w-full rounded-md border border-[#252D38] bg-[#080B12] px-3 text-sm text-white outline-none placeholder:text-[#66717F] focus:border-[#FF7A18]"
            />

          </div>


          {/* STATUS */}

          <div>

            <label className="mb-1.5 block text-xs font-medium text-[#A1ACBA]">
              Status
            </label>

            <select
              name="status"
              value={form.status}
              onChange={onChange}
              className="h-10 w-full rounded-md border border-[#252D38] bg-[#080B12] px-3 text-sm text-white outline-none focus:border-[#FF7A18]"
            >

              <option value="Active">
                Active
              </option>

              <option value="Not Active">
                Not Active
              </option>

            </select>

          </div>


          {/* LOGIN INFO */}

          <div className="rounded-lg border border-[#252D38] bg-[#080B12] p-3">

            <p className="text-[10px] font-semibold uppercase tracking-wide text-[#66717F]">
              Login Credentials
            </p>

            <p className="mt-2 text-xs text-[#A1ACBA]">
              Email: waiter@dineqr.com
            </p>

            <p className="mt-1 text-xs text-[#A1ACBA]">
              Password: dineqr123
            </p>

          </div>

        </div>


        {/* FOOTER */}

        <div className="flex justify-end gap-2 border-t border-[#252D38] px-5 py-4">

          <button
            onClick={onClose}
            className="rounded-md border border-[#252D38] bg-[#161D27] px-4 py-2 text-sm text-[#A1ACBA]"
          >
            Cancel
          </button>

          <button
            onClick={onSave}
            className="rounded-md bg-[#FF7A18] px-5 py-2 text-sm font-semibold text-white hover:bg-[#FF8A32]"
          >
            {isEdit
              ? "Save Changes"
              : "Add Waiter"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default WaiterFormModal;