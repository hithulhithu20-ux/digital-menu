import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useOrders } from '../../context/OrderContext';
import CheckoutItemCard from '../../components/user/order/CheckoutItemCard';
import PriceSummary from '../../components/user/order/PriceSummary';
import PlaceOrderButton from '../../components/user/order/PlaceOrderButton';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, clearCart, cartTotal } = useCart();
  const { placeOrder } = useOrders();

  const discount = 0; // Can implement discount logic here
  const taxRate = 0.05;
  const tax = Math.round((cartTotal - discount) * taxRate);
  const finalTotal = cartTotal - discount + tax;

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return;
    
    placeOrder({
      items: cartItems,
      subtotal: cartTotal,
      discount,
      tax,
      total: finalTotal,
      tableNumber: 12 // Hardcoded for now, can be dynamic
    });
    
    clearCart();
    navigate('/orders');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#0b0d12] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF6200" strokeWidth="1.5">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 max-w-[250px]">Add some delicious items from our menu to get started.</p>
        <button
          onClick={() => navigate('/menu')}
          className="px-8 py-3 rounded-full bg-orange-500 text-orange-950 font-bold tracking-wide hover:bg-orange-600 transition-colors"
        >
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0d12] flex items-start justify-center font-sans">
      <div className="relative w-full max-w-[430px] min-h-screen bg-[#0b0d12]">
        
        {/* Header */}
        <div className="flex items-center px-5 py-4 border-b border-white/5 bg-[#0b0d12] sticky top-0 z-20">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-gray-300 hover:text-white transition-colors"
          >
            <ChevronLeft size={22} />
          </button>
          <div className="flex-1 text-center pr-10">
            <h1 className="text-[15px] font-bold text-white tracking-wide">Checkout</h1>
          </div>
        </div>

        <div className="p-5 pb-24">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xs font-bold text-gray-500 tracking-[0.2em] uppercase">Your Order • Table 12</h2>
          </div>

          <div className="mb-8">
            {cartItems.map((item) => (
              <CheckoutItemCard
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
              />
            ))}
          </div>

          <PriceSummary 
            subtotal={cartTotal}
            discount={discount}
            tax={tax}
            total={finalTotal}
          />

          <PlaceOrderButton onClick={handlePlaceOrder} disabled={cartItems.length === 0} />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
