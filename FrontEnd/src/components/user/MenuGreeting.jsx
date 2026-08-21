import React from 'react';
import { Search } from 'lucide-react';

const MenuGreeting = ({ greeting = "Good Evening", onSearch }) => {
  return (
    <section className="px-5 pt-6 pb-2">
      {/* Greeting */}
      <p
        id="menu-greeting-label"
        className="text-[11px] font-semibold tracking-[2.5px] uppercase text-orange-400/80 mb-2"
      >
        {greeting}
      </p>

      {/* Headline */}
      <h2
        id="menu-greeting-headline"
        className="text-[28px] font-extrabold leading-[1.15] text-white tracking-tight mb-6"
      >
        What's on your<br />mind?
      </h2>

      {/* Search Bar */}
      <div
        id="menu-greeting-search"
        className="relative group"
      >
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-500 group-focus-within:text-orange-400 transition-colors duration-300" />
        </div>
        <input
          type="text"
          placeholder="Search for dishes, ingredients..."
          className="w-full h-[50px] pl-11 pr-4 rounded-2xl bg-[#1a1d24] border border-white/8 text-sm text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-orange-500/40 focus:ring-1 focus:ring-orange-500/20 focus:bg-[#1e2128] transition-all duration-300"
          onChange={(e) => onSearch?.(e.target.value)}
        />
      </div>
    </section>
  );
};

export default MenuGreeting;
