import React from "react";

export default function OrderLoadingSkeleton() {
  return (
    <div className="space-y-4">
      {/* Desktop Skeleton list */}
      <div className="hidden md:block rounded-xl border border-[#1C2430] overflow-hidden bg-[#111722]">
        <div className="h-12 border-b border-[#1C2430] bg-[#0D121A] flex items-center px-6">
          <div className="h-3 w-16 bg-[#1C2430] rounded-sm animate-pulse" />
          <div className="h-3 w-20 bg-[#1C2430] rounded-sm animate-pulse ml-24" />
          <div className="h-3 w-28 bg-[#1C2430] rounded-sm animate-pulse ml-36" />
        </div>
        <div className="divide-y divide-[#1C2430]">
          {[1, 2, 3, 4, 5].map((idx) => (
            <div key={idx} className="h-16 flex items-center px-6 justify-between">
              <div className="flex items-center gap-4">
                <div className="h-8 w-12 bg-[#1C2430] rounded-lg animate-pulse" />
                <div className="h-4 w-16 bg-[#1C2430] rounded-md animate-pulse" />
              </div>
              <div className="h-4 w-28 bg-[#1C2430] rounded-md animate-pulse" />
              <div className="h-8 w-20 bg-[#1C2430] rounded-xl animate-pulse" />
              <div className="h-8 w-8 bg-[#1C2430] rounded-full animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Skeleton list */}
      <div className="md:hidden space-y-3">
        {[1, 2, 3].map((idx) => (
          <div key={idx} className="h-32 rounded-xl border border-[#1C2430] bg-[#111722] p-4 flex flex-col justify-between animate-pulse">
            <div className="flex justify-between">
              <div className="h-4 w-12 bg-[#1C2430] rounded-md" />
              <div className="h-5 w-20 bg-[#1C2430] rounded-lg" />
            </div>
            <div className="h-4 w-24 bg-[#1C2430] rounded-md" />
            <div className="flex justify-between">
              <div className="h-4 w-20 bg-[#1C2430] rounded-md" />
              <div className="h-4 w-16 bg-[#1C2430] rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
