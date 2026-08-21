import React from "react";

export default function OrderStats({ stats }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">

      {/* TOTAL ORDERS */}
      <div className="group bg-[#111722] border border-[#1C2430] rounded-xl p-4 flex flex-col justify-between shadow-xs transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-[#131A26] hover:border-[#3B82F6] hover:shadow-lg hover:shadow-blue-500/10">
        <span className="text-[11px] font-bold text-[#596474] tracking-wider uppercase transition-colors duration-300 group-hover:text-[#60A5FA]">
          Total Orders
        </span>

        <span className="text-2xl font-bold text-[#F8FAFC] mt-2 transition-colors duration-300 group-hover:text-[#60A5FA]">
          {stats.total}
        </span>
      </div>


      {/* ACTIVE */}
      <div className="group bg-[#111722] border border-[#1C2430] rounded-xl p-4 flex flex-col justify-between shadow-xs transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-[#131A26] hover:border-[#FF7A18] hover:shadow-lg hover:shadow-orange-500/10">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-[#596474] tracking-wider uppercase transition-colors duration-300 group-hover:text-[#FF9A4D]">
            Active
          </span>

          <span className="w-2 h-2 rounded-full bg-[#FF7A18] transition-all duration-300 group-hover:scale-125 group-hover:shadow-[0_0_8px_#FF7A18]" />
        </div>

        <span className="text-2xl font-bold text-[#FF7A18] mt-2 transition-colors duration-300 group-hover:text-[#FFB067]">
          {stats.active}
        </span>
      </div>


      {/* PREPARING */}
      <div className="group bg-[#111722] border border-[#1C2430] rounded-xl p-4 flex flex-col justify-between shadow-xs transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-[#131A26] hover:border-[#F59E0B] hover:shadow-lg hover:shadow-amber-500/10">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-[#596474] tracking-wider uppercase transition-colors duration-300 group-hover:text-[#FBBF24]">
            Preparing
          </span>

          <span className="w-2 h-2 rounded-full bg-[#F59E0B] transition-all duration-300 group-hover:scale-125 group-hover:shadow-[0_0_8px_#F59E0B]" />
        </div>

        <span className="text-2xl font-bold text-[#F59E0B] mt-2 transition-colors duration-300 group-hover:text-[#FBBF24]">
          {stats.preparing}
        </span>
      </div>


      {/* READY */}
      <div className="group bg-[#111722] border border-[#1C2430] rounded-xl p-4 flex flex-col justify-between shadow-xs transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-[#131A26] hover:border-[#22C55E] hover:shadow-lg hover:shadow-green-500/10">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-[#596474] tracking-wider uppercase transition-colors duration-300 group-hover:text-[#4ADE80]">
            Ready
          </span>

          <span className="w-2 h-2 rounded-full bg-[#22C55E] transition-all duration-300 group-hover:scale-125 group-hover:shadow-[0_0_8px_#22C55E]" />
        </div>

        <span className="text-2xl font-bold text-[#22C55E] mt-2 transition-colors duration-300 group-hover:text-[#4ADE80]">
          {stats.ready}
        </span>
      </div>


      {/* BILL REQUESTED */}
      <div className="group bg-[#111722] border border-[#1C2430] rounded-xl p-4 flex flex-col justify-between shadow-xs transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-[#131A26] hover:border-[#FF7A18] hover:shadow-lg hover:shadow-orange-500/10">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-[#596474] tracking-wider uppercase transition-colors duration-300 group-hover:text-[#FF9A4D]">
            Bill Requested
          </span>

          <span className="w-2 h-2 rounded-full bg-[#FF7A18] animate-ping transition-all duration-300 group-hover:shadow-[0_0_8px_#FF7A18]" />
        </div>

        <span className="text-2xl font-bold text-[#FF7A18] mt-2 transition-colors duration-300 group-hover:text-[#FFB067]">
          {stats.billReq}
        </span>
      </div>


      {/* COMPLETED */}
      <div className="group bg-[#111722] border border-[#1C2430] rounded-xl p-4 flex flex-col justify-between shadow-xs transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-[#131A26] hover:border-[#22C55E] hover:shadow-lg hover:shadow-green-500/10">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-[#596474] tracking-wider uppercase transition-colors duration-300 group-hover:text-[#4ADE80]">
            Completed
          </span>

          <span className="w-2 h-2 rounded-full bg-[#22C55E] transition-all duration-300 group-hover:scale-125 group-hover:shadow-[0_0_8px_#22C55E]" />
        </div>

        <span className="text-2xl font-bold text-[#22C55E] mt-2 transition-colors duration-300 group-hover:text-[#4ADE80]">
          {stats.completed}
        </span>
      </div>

    </div>
  );
}