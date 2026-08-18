import React from 'react';

export const FilterList = ({
  isOpen,
  onClose,
  selectedStatus,
  onSelectStatus,
  onReset
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-full mt-2 w-64 bg-[#131822] border border-[#1F2736] rounded-xl shadow-2xl z-40 p-4 animate-in fade-in slide-in-from-top-2 duration-150 flex flex-col max-h-64">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#1F2736] pb-2 shrink-0">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#E2E2E9]">
          Filter By Status
        </h3>
        <button
          onClick={onClose}
          className="text-[#8A929B] hover:text-white text-xs cursor-pointer"
        >
          ✕
        </button>
      </div>

      {/* Filter by Status List (Fixed Height with Scroll) */}
      <div className="py-2 space-y-1.5 overflow-y-auto max-h-40 pr-1 flex-1">
        <label className="block text-[11px] font-semibold text-[#8A929B] uppercase tracking-wider mb-1">
          Select Status
        </label>
        {['All', 'Available', 'Occupied', 'Bill Req.'].map((status) => (
          <button
            key={status}
            onClick={() => {
              onSelectStatus(status);
            }}
            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center justify-between ${
              selectedStatus === status
                ? 'bg-[#FF6200]/15 text-[#FF6200] border border-[#FF6200]/30'
                : 'text-[#8A929B] hover:bg-[#1A212E] hover:text-white'
            }`}
          >
            <span>{status === 'All' ? 'All Statuses' : status}</span>
            {selectedStatus === status && <span className="font-bold">✓</span>}
          </button>
        ))}
      </div>

      {/* Footer / Reset Action */}
      <div className="pt-2 mt-2 border-t border-[#1F2736] flex items-center justify-between shrink-0">
        <button
          onClick={() => {
            onReset();
            onClose();
          }}
          className="text-xs text-[#8A929B] hover:text-white underline cursor-pointer"
        >
          Reset Filters
        </button>
        <button
          onClick={onClose}
          className="px-3 py-1 rounded-md text-xs font-medium bg-[#FF6200] hover:bg-[#E05600] text-white transition-colors cursor-pointer"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default FilterList;
