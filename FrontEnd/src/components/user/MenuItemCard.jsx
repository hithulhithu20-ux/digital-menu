import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const MenuItemCard = ({
  id,
  name,
  description,
  price,
  image,
  currency = "₹",
  isVeg = false,
  onAddToCart
}) => {
  const { getItemQuantity, addToCart, removeFromCart, updateQuantity } = useCart();
  const quantity = getItemQuantity(id);

  const handleAdd = () => {
    if (quantity === 0) {
      addToCart({ id, name, price, image });
    } else {
      updateQuantity(id, quantity + 1);
    }
  };

  const handleRemove = () => {
    if (quantity > 1) {
      updateQuantity(id, quantity - 1);
    } else {
      removeFromCart(id);
    }
  };

  return (
    <div
      id={`menu-item-${id}`}
      className="px-5 py-4"
    >
      <div className="rounded-3xl overflow-hidden bg-[#141619] border border-white/5 transition-all duration-300 hover:border-white/10">
        {/* Food Image */}
        <div className="relative w-full aspect-[16/10] overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#141619] to-transparent" />

          {/* Veg/Non-veg indicator */}
          <div className="absolute top-3 left-3">
            <div className={`w-5 h-5 rounded-[4px] border-2 flex items-center justify-center ${isVeg ? 'border-green-500' : 'border-red-500'}`}>
              <div className={`w-2 h-2 rounded-full ${isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-5 pb-5 -mt-2 relative z-10">
          <h3 className="text-lg font-bold text-white tracking-tight mb-2">
            {name}
          </h3>

          <p className="text-[13px] leading-[1.6] text-gray-500 mb-4 line-clamp-3">
            {description}
          </p>

          {/* Price & Add Button Row */}
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-white">
              {currency}{price}
            </span>

            {quantity === 0 ? (
              <button
                id={`menu-item-add-${id}`}
                onClick={handleAdd}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 hover:bg-orange-600 text-orange-950 transition-all duration-300 active:scale-90 shadow-lg shadow-orange-500/25"
              >
                <Plus size={20} strokeWidth={3} />
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={handleRemove}
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-white/8 text-gray-300 hover:bg-white/15 transition-all duration-200 active:scale-90"
                >
                  <Minus size={16} strokeWidth={3} />
                </button>
                <span className="text-sm font-bold text-white w-5 text-center">{quantity}</span>
                <button
                  onClick={handleAdd}
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 text-orange-950 hover:bg-orange-600 transition-all duration-200 active:scale-90"
                >
                  <Plus size={16} strokeWidth={3} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
