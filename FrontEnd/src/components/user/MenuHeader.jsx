import React from 'react';
import { Menu, Bell } from 'lucide-react';

const MenuHeader = ({ restaurantName = "La Maison Elite" }) => {
  return (
    <header className="flex items-center justify-between px-5 pt-5 pb-2">
      {/* Hamburger Menu */}
      <button
        id="menu-header-hamburger"
        className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 hover:text-orange-400 hover:border-orange-400/30 transition-all duration-300 active:scale-95"
      >
        <Menu size={20} />
      </button>

      {/* Restaurant Name */}
      <h1
        id="menu-header-restaurant-name"
        className="text-[15px] font-semibold tracking-wide text-white/90"
      >
        {restaurantName}
      </h1>

      {/* Notification Bell */}
      <button
        id="menu-header-notification"
        className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 hover:text-orange-400 hover:border-orange-400/30 transition-all duration-300 active:scale-95"
      >
        <Bell size={20} />
        {/* Notification dot */}
        <span className="absolute top-2 right-2.5 w-2 h-2 bg-orange-500 rounded-full ring-2 ring-[#0b0d12]" />
      </button>
    </header>
  );
};

export default MenuHeader;
