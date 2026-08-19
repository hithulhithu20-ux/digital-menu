import React from "react";
import { NavLink } from "react-router-dom";
import { ChefHat } from "lucide-react";
import { sidebarItems } from "../../MockData/sidebarTabs";

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-18 flex-col border-r border-white/5 bg-[#0B0D12] px-2 py-3 lg:w-62.5 lg:px-3" aria-label="Restaurant administration sidebar">
      <header className="flex h-19 items-center justify-center border-b border-white/5 lg:justify-start lg:px-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#D9793B]/20 bg-linear-to-br from-[#2A211C] to-[#151515] shadow-[0_4px_15px_rgba(0,0,0,0.3)]" aria-label="DINE QR restaurant logo">
          <ChefHat size={20} className="text-[#D9793B]" strokeWidth={1.8} />
        </div>

        <div className="ml-3 hidden min-w-0 lg:block">
          <h1 className="text-[18px] font-bold leading-tight tracking-wide text-[#FFF4E6]">DINE QR</h1>
          <p className="mt-0.5 text-[11px] font-medium tracking-wide text-[#8D8F98]">Premium Restaurant</p>
        </div>
      </header>

      <nav className="mt-5 flex-1" aria-label="Main navigation">
        <ul className="space-y-1.5">
          {sidebarItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.id}>
                <NavLink to={item.path} aria-label={item.label} title={item.label} className={({ isActive }) => `group relative flex h-11 items-center justify-center rounded-lg px-3 transition-all duration-200 lg:justify-start lg:gap-4 ${isActive ? "bg-[#1A1717] text-[#F29A68] shadow-[0_5px_20px_rgba(217,121,59,0.10)]" : "text-[#858992] hover:bg-white/[0.035] hover:text-[#D7D9DE]"}`}>
                  {({ isActive }) => (
                    <>
                      {isActive && <span className="absolute left-0 top-1/2 hidden h-8 w-0.5 -translate-y-1/2 rounded-full bg-[#F29A68] lg:block" />}
                      <Icon size={19} strokeWidth={1.8} className={`shrink-0 transition-colors ${isActive ? "text-[#F29A68]" : "text-[#858992] group-hover:text-[#B8BBC3]"}`} />
                      <span className="hidden truncate text-[13px] font-medium lg:block">{item.label}</span>
                    </>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <footer className="hidden border-t border-white/5 pt-3 lg:block">
        <p className="px-3 text-[10px] font-medium uppercase tracking-[0.15em] text-[#555861]">Restaurant Management</p>
      </footer>
    </aside>
  );
};

export default Sidebar;