import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

export const QRCodeCard = ({ table, onClose, onOpenOrderForm }) => {
  if (!table) return null;

  const tableNo = table.tableNo || `T-${table.number || '01'}`;
  const qrCodeStr = table.qrCode || `TBL-${table.number || '001'}`;
  const orderUrl = `${window.location.origin}/?table=${encodeURIComponent(tableNo)}`;

  const handleDownloadQR = () => {
    const canvas = document.getElementById(`qr-canvas-${tableNo}`);
    if (!canvas) return;

    // Create high-resolution download canvas with Table branding
    const downloadCanvas = document.createElement('canvas');
    const ctx = downloadCanvas.getContext('2d');
    const width = 400;
    const height = 480;
    downloadCanvas.width = width;
    downloadCanvas.height = height;

    // White background card
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);

    // Header Title
    ctx.fillStyle = '#FF6200';
    ctx.font = 'bold 26px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`TABLE ${tableNo}`, width / 2, 48);

    ctx.fillStyle = '#505A69';
    ctx.font = '14px sans-serif';
    ctx.fillText('Scan to View Digital Menu & Order Food', width / 2, 75);

    // Draw QR Code from DOM Canvas
    ctx.drawImage(canvas, 60, 95, 280, 280);

    // Footer Text
    ctx.fillStyle = '#8A929B';
    ctx.font = '12px monospace';
    ctx.fillText(`Code: ${qrCodeStr}`, width / 2, 410);

    ctx.fillStyle = '#131822';
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText('Digital Dining Menu • Instant Kitchen Dispatch', width / 2, 440);

    // Trigger PNG file download
    const link = document.createElement('a');
    link.download = `Table-${tableNo}-QRCode.png`;
    link.href = downloadCanvas.toDataURL('image/png');
    link.click();
  };

  const handleOpenForm = () => {
    if (onOpenOrderForm) {
      onOpenOrderForm(tableNo);
    } else {
      window.location.href = orderUrl;
    }
  };

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
        <div className="bg-white p-5 rounded-2xl mx-auto w-52 h-52 flex flex-col items-center justify-center shadow-lg relative group">
          <QRCodeCanvas
            id={`qr-canvas-${tableNo}`}
            value={orderUrl}
            size={160}
            bgColor={"#FFFFFF"}
            fgColor={"#000000"}
            level={"H"}
            includeMargin={true}
          />
          <span className="text-[10px] font-mono text-gray-500 mt-1">
            {qrCodeStr}
          </span>
        </div>

        {/* URL Link details */}
        <div className="space-y-1">
          <p className="text-sm font-medium text-[#E2E2E9]">
            Scan URL (Customer Food Order Link)
          </p>
          <p className="text-xs text-[#8A929B] font-mono select-all truncate bg-[#1A212E] p-2 rounded-lg border border-[#252E40]">
            {orderUrl}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center gap-3">
            {onClose && (
              <button
                onClick={onClose}
                className="flex-1 bg-[#1A212E] hover:bg-[#252E40] border border-[#252E40] text-sm text-[#E2E2E9] py-2.5 rounded-lg transition-colors cursor-pointer"
              >
                Close
              </button>
            )}
            <button
              onClick={handleDownloadQR}
              className="flex-1 bg-[#FF6200] hover:bg-[#E05600] text-sm font-medium text-white py-2.5 rounded-lg shadow-lg shadow-[#FF6200]/20 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Download QR</span>
            </button>
          </div>

          <button
            onClick={handleOpenForm}
            className="w-full bg-[#10B981]/15 hover:bg-[#10B981]/25 border border-[#10B981] text-[#10B981] text-xs font-semibold py-2.5 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>📱 Test Scan / Open Food Order Form</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default QRCodeCard;
