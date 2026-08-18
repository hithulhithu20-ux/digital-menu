import React from 'react';

export const Card = ({ table, onSelect }) => {
  const isAvailable = table.status === 'Available';
  const isOccupied = table.status === 'Occupied';
  const isBillReq = table.status === 'Bill Req.';

  return (
    <div
      onClick={() => onSelect && onSelect(table)}
      className={`rounded-2xl p-6 border transition-all duration-200 shadow-xl flex flex-col justify-between cursor-pointer hover:scale-[1.015] ${
        isAvailable
          ? 'bg-[#0B1516] border-[#153D31] hover:border-[#1F5C4A]'
          : isOccupied
          ? 'bg-[#150F0B] border-[#52350C] hover:border-[#7C4E0F]'
          : 'bg-[#1A0E12] border-[#5C1920] hover:border-[#82242D]'
      }`}
    >
      {/* TOP HEADER ROW */}
      <div className="flex items-start justify-between">
        {/* Table Number & Notification Star */}
        <div className="flex items-center gap-2">
          <h2 className="font-bold text-3xl tracking-tight text-white">
            {table.tableNo}
          </h2>
          {table.hasNotification && (
            <span className="text-[#FF6200] font-bold text-2xl leading-none">*</span>
          )}
        </div>

        {/* Status Badge */}
        <div
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold border ${
            isAvailable
              ? 'bg-[#0B2A1E] border-[#164E37] text-[#10B981]'
              : isOccupied
              ? 'bg-[#2E1E09] border-[#48300E] text-[#FF9F1C]'
              : 'bg-[#331116] border-[#521C22] text-[#EF4444]'
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              isAvailable
                ? 'bg-[#10B981]'
                : isOccupied
                ? 'bg-[#FF9F1C]'
                : 'bg-[#EF4444]'
            }`}
          />
          <span>{table.status}</span>
        </div>
      </div>

      {/* SUBTITLE: Seats & Area Stacked Layout */}
      <div className="flex items-start gap-3 mt-3 text-sm text-[#8A929B]">
        {/* Seats Icon */}
        <svg
          className="w-4 h-4 text-[#8A929B] shrink-0 mt-0.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>

        <div className="flex flex-col leading-snug">
          <span>{table.seats} Seats •</span>
          <span>{table.area}</span>
        </div>
      </div>

      {/* DIVIDER LINE */}
      <div className="border-t border-[#262B36]/60 my-5" />

      {/* BOTTOM ROW: QR Code Thumbnail & Order Value */}
      <div className="flex items-center justify-between gap-4">
        {/* QR Code White Thumbnail Container */}
        <div className="w-16 h-16 bg-white rounded-xl p-1.5 flex items-center justify-center shrink-0 shadow-md">
          <div className="w-full h-10 bg-black rounded-sm p-1 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" viewBox="0 0 100 100" fill="none">
              <rect width="100" height="100" fill="black" />
              <rect x="10" y="10" width="30" height="30" fill="white" />
              <rect x="15" y="15" width="20" height="20" fill="black" />
              <rect x="20" y="20" width="10" height="10" fill="white" />

              <rect x="60" y="10" width="30" height="30" fill="white" />
              <rect x="65" y="15" width="20" height="20" fill="black" />
              <rect x="70" y="20" width="10" height="10" fill="white" />

              <rect x="10" y="60" width="30" height="30" fill="white" />
              <rect x="15" y="65" width="20" height="20" fill="black" />
              <rect x="20" y="70" width="10" height="10" fill="white" />

              <rect x="45" y="10" width="8" height="8" fill="white" />
              <rect x="45" y="25" width="8" height="15" fill="white" />
              <rect x="10" y="45" width="15" height="8" fill="white" />
              <rect x="30" y="45" width="25" height="8" fill="white" />
              <rect x="60" y="45" width="30" height="8" fill="white" />
              <rect x="45" y="60" width="12" height="12" fill="white" />
              <rect x="65" y="60" width="25" height="10" fill="white" />
              <rect x="60" y="75" width="12" height="15" fill="white" />
              <rect x="78" y="75" width="12" height="15" fill="white" />
            </svg>
          </div>
        </div>

        {/* Right Info Section */}
        <div className="text-right flex flex-col justify-center">
          {isAvailable && (
            <>
              <span className="text-sm text-[#8A929B]">
                Last scan: {table.lastScan}
              </span>
              <span className="text-lg font-bold text-[#8A929B] mt-1">-</span>
            </>
          )}

          {isOccupied && (
            <>
              <span className="text-sm text-[#8A929B]">Current Order</span>
              <span className="text-2xl font-bold text-white mt-1">
                {table.currentOrder}
              </span>
            </>
          )}

          {isBillReq && (
            <>
              <span className="text-sm text-[#EF4444] font-medium">Waiter alerted</span>
              <span className="text-2xl font-bold text-[#EF4444] mt-1">
                {table.currentOrder}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;