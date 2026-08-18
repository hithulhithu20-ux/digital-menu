import React, { useState } from 'react';

export const AddTableForm = ({ isOpen, onClose, onAddTable }) => {
  const [tableNo, setTableNo] = useState('');
  const [area, setArea] = useState('Indoor');
  const [seats, setSeats] = useState(4);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tableNo.trim()) return;

    const formattedNo = tableNo.toUpperCase().startsWith('T-')
      ? tableNo.toUpperCase()
      : `T-${tableNo.padStart(2, '0')}`;

    onAddTable({
      id: Date.now(),
      tableNo: formattedNo,
      status: 'Available',
      seats: parseInt(seats, 10) || 4,
      area,
      lastScan: 'Just now',
      currentOrder: null,
      hasNotification: false,
      qrCode: `TBL-${formattedNo.replace('T-', '')}`
    });

    // Reset Form
    setTableNo('');
    setArea('Indoor');
    setSeats(4);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-[#131822] border border-[#1F2736] rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1F2736] pb-3">
          <h2 className="text-xl font-bold text-[#E2E2E9]">Add New Table</h2>
          <button
            onClick={onClose}
            className="text-[#8A929B] hover:text-white transition-colors cursor-pointer text-lg font-bold"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#8A929B] uppercase tracking-wider mb-1.5">
              Table Number
            </label>
            <input
              type="text"
              required
              placeholder="e.g. T-16 or 16"
              value={tableNo}
              onChange={(e) => setTableNo(e.target.value)}
              className="w-full bg-[#1A212E] border border-[#252E40] rounded-lg px-4 py-2.5 text-[#E2E2E9] placeholder-[#505A69] outline-none focus:border-[#FF6200] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#8A929B] uppercase tracking-wider mb-1.5">
              Dining Area
            </label>
            <select
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full bg-[#1A212E] border border-[#252E40] rounded-lg px-4 py-2.5 text-[#E2E2E9] outline-none focus:border-[#FF6200] transition-colors cursor-pointer"
            >
              <option value="Indoor">Indoor</option>
              <option value="Terrace">Terrace</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#8A929B] uppercase tracking-wider mb-1.5">
              Seating Capacity
            </label>
            <input
              type="number"
              min="1"
              max="20"
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
              className="w-full bg-[#1A212E] border border-[#252E40] rounded-lg px-4 py-2.5 text-[#E2E2E9] outline-none focus:border-[#FF6200] transition-colors"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#1F2736]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm text-[#8A929B] hover:text-white hover:bg-[#1A212E] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg text-sm font-medium bg-[#FF6200] hover:bg-[#E05600] text-white shadow-lg shadow-[#FF6200]/20 transition-all cursor-pointer"
            >
              Add Table
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTableForm;
