import React from 'react';
import { Plus, Minus } from 'lucide-react';

const CheckoutItemCard = ({ item, onUpdateQuantity }) => {
  return (
    <div className="flex items-center gap-4 py-4 border-b border-white/5 last:border-0">
      {/* Image */}
      <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#141619] shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex-1">
        <h3 className="text-[15px] font-semibold text-white/90 mb-1">{item.name}</h3>
        <p className="text-sm font-medium text-gray-400">₹{item.price}</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-3 bg-white/5 rounded-full px-2 py-1 border border-white/10">
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          className="w-6 h-6 flex items-center justify-center rounded-full text-gray-400 hover:text-white transition-colors"
        >
          <Minus size={14} strokeWidth={2.5} />
        </button>
        <span className="w-4 text-center text-sm font-semibold text-white">{item.quantity}</span>
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="w-6 h-6 flex items-center justify-center rounded-full text-orange-500 hover:text-orange-400 transition-colors"
        >
          <Plus size={14} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};

export default CheckoutItemCard;
