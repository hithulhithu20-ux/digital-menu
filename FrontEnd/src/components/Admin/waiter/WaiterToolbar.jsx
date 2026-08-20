import React from "react";
import {
  Search,
  ChevronDown,
} from "lucide-react";

const WaiterToolbar = ({
  search,
  setSearch,
  filter,
  setFilter,
}) => {

  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row">

      {/* SEARCH */}

      <div className="relative flex-1">

        <Search
          size={17}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7F8A99]"
        />

        <input
          type="text"
          placeholder="Search waiters..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="
            h-10
            w-full
            rounded-lg
            border
            border-[#252D38]
            bg-[#111722]
            pl-10
            pr-4
            text-sm
            text-[#F8FAFC]
            outline-none
            placeholder:text-[#66717F]
            focus:border-[#FF7A18]
          "
        />

      </div>


      {/* FILTER */}

      <div className="relative">

        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value)
          }
          className="
            h-10
            min-w-[145px]
            appearance-none
            rounded-lg
            border
            border-[#252D38]
            bg-[#111722]
            px-4
            pr-10
            text-sm
            text-[#A1ACBA]
            outline-none
            focus:border-[#FF7A18]
          "
        >
          <option value="All">
            All
          </option>

          <option value="Online">
            Online
          </option>

          <option value="Offline">
            Offline
          </option>

        </select>

        <ChevronDown
          size={15}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#7F8A99]"
        />

      </div>

    </div>
  );
};

export default WaiterToolbar;