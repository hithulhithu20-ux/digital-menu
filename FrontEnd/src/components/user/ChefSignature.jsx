import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const ChefSignature = ({
  name = "Chicken Biriyani",
  price = 180,
  image = "/chicken-biriyani.jpg",
  tags = ["Spicy", "Contains Nuts"],
  currency = "₹"
}) => {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToOrder = () => {
    setIsAdding(true);
    setTimeout(() => setIsAdding(false), 600);
  };

  return (
    <section className="px-5 pt-8 pb-4">
      {/* Section Label */}
      <p className="text-[10px] font-semibold tracking-[2.5px] uppercase text-orange-400/70 mb-3">
        Chef's Signature
      </p>

      {/* Card */}
      <div
        id="chef-signature-card"
        className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#1a1d24] to-[#12141a] border border-white/5"
      >
        {/* Title & Price Row */}
        <div className="flex items-start justify-between px-5 pt-5 pb-3">
          <h3 className="text-xl font-bold text-white tracking-tight">{name}</h3>
          <span className="text-xl font-bold text-white/90">
            {currency}{price}
          </span>
        </div>

        {/* Food Image */}
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#12141a] to-transparent" />
        </div>

        {/* Tags */}
        <div className="flex items-center gap-2 px-5 -mt-4 relative z-10">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full text-[11px] font-medium tracking-wide bg-white/8 text-gray-300 border border-white/5"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Add to Order Button */}
        <div className="px-5 pt-4 pb-5">
          <button
            id="chef-signature-add-btn"
            onClick={handleAddToOrder}
            className={`
              w-full h-[50px] rounded-2xl font-bold text-[14px] tracking-wide uppercase
              flex items-center justify-center gap-2
              transition-all duration-300 active:scale-[0.97]
              ${isAdding
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-orange-500 hover:bg-orange-600 text-orange-950 border border-orange-400/20'
              }
            `}
          >
            {isAdding ? (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Added!
              </>
            ) : (
              <>
                <Plus size={18} strokeWidth={3} />
                Add to Order
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ChefSignature;
