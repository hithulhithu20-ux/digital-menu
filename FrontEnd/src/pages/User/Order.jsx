import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useOrders } from '../../context/OrderContext';
import OrderCard from '../../components/user/order/OrderCard';
import BottomNavBar from '../../components/user/BottomNavBar';

const Order = () => {
  const navigate = useNavigate();
  const { orders } = useOrders();

  return (
    <div className="min-h-screen bg-[#0b0d12] flex items-start justify-center font-sans">
      <div className="relative w-full max-w-[430px] min-h-screen bg-[#0b0d12] pb-28">
        
        {/* Header */}
        <div className="flex items-center px-5 py-4 border-b border-white/5 bg-[#0b0d12] sticky top-0 z-20">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-gray-300 hover:text-white transition-colors"
          >
            <ChevronLeft size={22} />
          </button>
          <div className="flex-1 text-center pr-10">
            <h1 className="text-[15px] font-bold text-white tracking-wide">My Orders</h1>
          </div>
        </div>

        <div className="p-5">
          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8A929B" strokeWidth="1.5">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-white mb-2">No orders yet</h2>
              <p className="text-gray-500 mb-8 max-w-[250px]">You haven't placed any orders today.</p>
              <button
                onClick={() => navigate('/menu')}
                className="px-8 py-3 rounded-full bg-orange-500 text-orange-950 font-bold tracking-wide hover:bg-orange-600 transition-colors"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map(order => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </div>

        <BottomNavBar activeTab="orders" onTabChange={(tab) => navigate(tab === 'menu' ? '/menu' : tab === 'home' ? '/' : `/${tab}`)} />
      </div>
    </div>
  );
};

export default Order;
