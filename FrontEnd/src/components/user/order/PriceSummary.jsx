import React from 'react';

const PriceSummary = ({ subtotal, discount, tax, total }) => {
  return (
    <div className="py-4 border-y border-white/5 border-dashed space-y-3">
      <div className="flex justify-between items-center text-[15px]">
        <span className="text-gray-400">Subtotal</span>
        <span className="text-white/90 font-medium">₹{subtotal}</span>
      </div>
      
      <div className="flex justify-between items-center text-[15px]">
        <span className="text-gray-400">Discount</span>
        <span className="text-[#00B4D8] font-medium">-₹{discount}</span>
      </div>

      <div className="flex justify-between items-center text-[15px]">
        <span className="text-gray-400">Tax</span>
        <span className="text-white/90 font-medium">₹{tax}</span>
      </div>

      <div className="pt-3 mt-3 border-t border-white/5 flex justify-between items-center">
        <span className="text-base font-bold text-white tracking-wide">TOTAL</span>
        <span className="text-xl font-bold text-orange-500">₹{total}</span>
      </div>
    </div>
  );
};

export default PriceSummary;
