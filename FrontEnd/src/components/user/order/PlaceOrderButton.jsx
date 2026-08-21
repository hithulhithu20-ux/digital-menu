import React from 'react';

const PlaceOrderButton = ({ onClick, disabled }) => {
  return (
    <div className="mt-8 flex flex-col items-center gap-3">
      <button
        onClick={onClick}
        disabled={disabled}
        className="w-full py-4 rounded-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 disabled:cursor-not-allowed text-orange-950 font-bold text-[15px] tracking-wide transition-all duration-300 active:scale-[0.98] shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2"
      >
        PLACE ORDER <span className="text-lg leading-none">→</span>
      </button>
      <p className="text-xs font-medium text-gray-500">Orders are sent directly to the kitchen.</p>
    </div>
  );
};

export default PlaceOrderButton;
