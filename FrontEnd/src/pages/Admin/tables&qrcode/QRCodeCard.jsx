import React from 'react';

export const QRCodeCard = ({ table, onClose }) => {
  if (!table) return null;

  const tableNo = table.tableNo || `T-${table.number || '01'}`;
  const qrCodeStr = table.qrCode || `TBL-${table.number || '001'}`;

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-[#131822] border border-[#1F2736] rounded-2xl p-6 max-w-sm w-full shadow-2xl space-y-5 text-center animate-in fade-in zoom-in-95 duration-150">

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#1F2736] pb-3">
          <h2 className="text-lg font-bold text-[#E2E2E9]">
            QR Code - {tableNo}
          </h2>
          {onClose && (
            <button
              onClick={onClose}
              className="text-[#8A929B] hover:text-white transition-colors cursor-pointer text-lg font-bold"
            >
              ✕
            </button>
          )}
        </div>

        {/* QR Code Container */}
        <div className="bg-white p-6 rounded-xl mx-auto w-48 h-48 flex flex-col items-center justify-center shadow-inner relative group">
          <svg className="w-36 h-36" viewBox="0 0 100 100" fill="none">
            <rect width="100" height="100" fill="white" />
            <rect x="10" y="10" width="30" height="30" fill="black" />
            <rect x="15" y="15" width="20" height="20" fill="white" />
            <rect x="20" y="20" width="10" height="10" fill="black" />

            <rect x="60" y="10" width="30" height="30" fill="black" />
            <rect x="65" y="15" width="20" height="20" fill="white" />
            <rect x="70" y="20" width="10" height="10" fill="black" />

            <rect x="10" y="60" width="30" height="30" fill="black" />
            <rect x="15" y="65" width="20" height="20" fill="white" />
            <rect x="20" y="70" width="10" height="10" fill="black" />

            <rect x="45" y="10" width="8" height="8" fill="black" />
            <rect x="45" y="25" width="8" height="15" fill="black" />
            <rect x="10" y="45" width="15" height="8" fill="black" />
            <rect x="30" y="45" width="25" height="8" fill="black" />
            <rect x="60" y="45" width="30" height="8" fill="black" />
            <rect x="45" y="60" width="12" height="12" fill="black" />
            <rect x="65" y="60" width="25" height="10" fill="black" />
            <rect x="60" y="75" width="12" height="15" fill="black" />
            <rect x="78" y="75" width="12" height="15" fill="black" />
          </svg>
          <span className="text-[10px] font-mono text-gray-600 mt-1">
            {qrCodeStr}
          </span>
        </div>

        {/* URL Link details */}
        <div className="space-y-1">
          <p className="text-sm font-medium text-[#E2E2E9]">
            Digital Menu Link
          </p>
          <p className="text-xs text-[#8A929B] font-mono select-all">
            https://menu.restaurant.com/table/{tableNo.toLowerCase().replace(/[^a-z0-9]/g, '')}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          {onClose && (
            <button
              onClick={onClose}
              className="flex-1 bg-[#1A212E] hover:bg-[#252E40] border border-[#252E40] text-sm text-[#E2E2E9] py-2.5 rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>
          )}
          <button
            onClick={() => alert(`Downloaded QR Code for ${tableNo}`)}
            className="flex-1 bg-[#FF6200] hover:bg-[#E05600] text-sm font-medium text-white py-2.5 rounded-lg shadow-lg shadow-[#FF6200]/20 transition-colors cursor-pointer"
          >
            Download QR
          </button>
        </div>

      </div>
    </div>
  );
};

export default QRCodeCard;
