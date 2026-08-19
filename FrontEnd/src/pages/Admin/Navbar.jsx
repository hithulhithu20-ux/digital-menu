import React from "react";
import { Bell, Grid2X2, Search } from "lucide-react";

const Navbar = () => {
  return (
    <header className="fixed right-0 top-0 z-30 h-[72px] border-b border-white/[0.06] bg-[#0D0F15]/95 backdrop-blur-xl lg:left-[250px]">
      <nav className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Admin navigation">
        
        <div className="flex min-w-0 flex-1 items-center">
          <div className="relative hidden w-full max-w-[300px] sm:block">
            <Search size={18} strokeWidth={1.7} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#70747E]" />
            <input type="search" placeholder="Search tables..." aria-label="Search tables" className="h-10 w-full rounded-md border border-transparent bg-[#0A0C11] pl-10 pr-4 text-[13px] text-[#D9DBE0] outline-none placeholder:text-[#686C75] transition-all duration-200 focus:border-[#D9793B]/30 focus:bg-[#101217] focus:ring-1 focus:ring-[#D9793B]/10" />
          </div>

          <button type="button" aria-label="Search tables" className="flex h-10 w-10 items-center justify-center rounded-lg text-[#858992] transition-all duration-200 hover:bg-white/[0.04] hover:text-[#D7D9DE] sm:hidden">
            <Search size={19} strokeWidth={1.8} />
          </button>
        </div>

        <div className="flex items-center">
          <button type="button" aria-label="Notifications" className="flex h-10 w-10 items-center justify-center rounded-lg text-[#858992] transition-all duration-200 hover:bg-white/[0.04] hover:text-[#D7D9DE]">
            <Bell size={19} strokeWidth={1.7} />
          </button>

          <button type="button" aria-label="Open applications menu" className="ml-1 flex h-10 w-10 items-center justify-center rounded-lg text-[#858992] transition-all duration-200 hover:bg-white/[0.04] hover:text-[#D7D9DE]">
            <Grid2X2 size={18} strokeWidth={1.7} />
          </button>

          <div className="mx-3 hidden h-7 w-px bg-white/[0.08] sm:block lg:mx-5" />

          <button type="button" aria-label="Open admin profile" className="flex items-center gap-3 rounded-lg px-1.5 py-1.5 transition-all duration-200 hover:bg-white/[0.04]">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#D9793B]/20 bg-gradient-to-br from-[#5E4639] to-[#29201C] text-xs font-semibold text-[#F5E4D5] shadow-[0_3px_12px_rgba(0,0,0,0.25)]">
              AP
            </div>

            <div className="hidden text-left md:block">
              <p className="text-[13px] font-medium leading-tight text-[#E3E4E7]">Admin Profile</p>
              <p className="mt-1 text-[11px] leading-tight text-[#777B84]">La Maison Elite</p>
            </div>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;