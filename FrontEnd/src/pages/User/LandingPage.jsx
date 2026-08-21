import React from "react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      {/* Mobile-sized container */}
      <div
        className="relative w-full max-w-[415px] min-h-screen overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: "url('/restaurant-bg.avif')",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/65" />

        {/* Content */}
        <div className="relative z-10 min-h-screen flex flex-col px-6 py-8">
          
          {/* Logo */}
          <div className="flex flex-col items-center mt-14">
            <div className="flex items-center gap-2">
              
              {/* QR Icon */}
              <div className="text-orange-400">
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="6" height="6" />
                  <rect x="15" y="3" width="6" height="6" />
                  <rect x="3" y="15" width="6" height="6" />

                  <path d="M15 15h2v2h-2z" />
                  <path d="M19 15h2v2h-2z" />
                  <path d="M15 19h2v2h-2z" />
                  <path d="M19 19h2v2h-2z" />
                </svg>
              </div>

              <h1 className="text-2xl font-semibold text-orange-300 tracking-tight">
                DINE QR
              </h1>
            </div>

            <p className="mt-4 text-[12px] tracking-[2px] text-gray-400">
              SCAN. ORDER. ENJOY.
            </p>
          </div>

          {/* Restaurant Name */}
          <div className="flex-1 flex flex-col items-center justify-center -mt-4">
            <h2 className="text-center text-[48px] leading-[0.95] font-extrabold text-white tracking-tight">
              LA MAISON
              <br />
              ELITE
            </h2>

            {/* Table */}
            <div className="mt-5 flex items-center gap-3 rounded-full border border-gray-700 bg-black/40 px-6 py-2.5">
              
              {/* Table icon */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#f97316"
                strokeWidth="2"
              >
                <path d="M4 10h16" />
                <path d="M6 10v8" />
                <path d="M18 10v8" />
                <path d="M4 7h16" />
              </svg>

              <span className="text-[12px] font-semibold tracking-[1px] text-gray-300">
                TABLE 12
              </span>
            </div>
          </div>

          {/* Explore Button */}
          <div className="mb-16">
            <button
              className="
                w-full
                h-[58px]
                bg-orange-500
                hover:bg-orange-600
                active:scale-[0.98]
                transition-all
                text-[26px]
                font-bold
                text-orange-950
                tracking-tight
              "
            >
              EXPLORE MENU →
            </button>
          </div>

          {/* Footer */}
          <div className="absolute bottom-7 left-0 right-0 text-center">
            <p className="text-[14px] tracking-wide text-gray-400">
              Digital menu powered by DINE QR
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LandingPage;