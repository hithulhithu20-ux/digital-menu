import React from 'react';
import { UtensilsCrossed, ShoppingCart, ShoppingBag, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '../../context/OrderContext';

const navItems = [
  { id: 'menu',     label: 'Menu',     icon: UtensilsCrossed, path: '/menu' },
  { id: 'checkout', label: 'Checkout', icon: ShoppingCart,    path: '/checkout' },
  { id: 'orders',   label: 'Orders',   icon: ShoppingBag,     path: '/orders' },
  { id: 'help',     label: 'Help',     icon: HelpCircle,      path: null },
];

const BottomNavBar = ({ activeTab = 'menu', onTabChange }) => {
  const navigate = useNavigate();
  const { orderCount } = useOrders();

  const handleClick = (item) => {
    onTabChange?.(item.id);
    if (item.path) navigate(item.path);
  };

  return (
    <nav
      id="bottom-nav-bar"
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50"
    >
      {/* Gradient fade above the bar */}
      <div className="absolute -top-8 inset-x-0 h-8 bg-gradient-to-t from-[#0b0d12] to-transparent pointer-events-none" />

      {/* Bar */}
      <div className="relative bg-[#0f1117]/95 backdrop-blur-xl border-t border-white/5 px-2 pt-2 pb-5">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                id={`bottom-nav-${item.id}`}
                onClick={() => handleClick(item)}
                className={`
                  flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl
                  transition-all duration-300 active:scale-90
                  ${isActive ? 'text-orange-400' : 'text-gray-500 hover:text-gray-300'}
                `}
              >
                <div className="relative">
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
                  {item.id === 'orders' && orderCount > 0 && (
                    <span className="absolute -top-1 -right-2 min-w-[14px] h-[14px] px-1 rounded-full bg-orange-500 text-orange-950 flex items-center justify-center text-[9px] font-bold ring-2 ring-[#0f1117]">
                      {orderCount}
                    </span>
                  )}
                  {isActive && item.id !== 'orders' && (
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-orange-400" />
                  )}
                </div>
                <span className={`text-[10px] font-semibold tracking-wide ${isActive ? 'text-orange-400' : ''}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNavBar;
