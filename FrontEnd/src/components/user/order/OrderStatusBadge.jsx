import React from 'react';

const OrderStatusBadge = ({ status }) => {
  let config = {
    bg: 'bg-orange-500/10',
    text: 'text-orange-500',
    border: 'border-orange-500/20',
    dot: 'bg-orange-500',
    pulse: true
  };

  if (status === 'Ready') {
    config = {
      bg: 'bg-green-500/10',
      text: 'text-green-500',
      border: 'border-green-500/20',
      dot: 'bg-green-500',
      pulse: true
    };
  } else if (status === 'Delivered') {
    config = {
      bg: 'bg-gray-500/10',
      text: 'text-gray-400',
      border: 'border-gray-500/20',
      dot: 'bg-gray-400',
      pulse: false
    };
  }

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${config.bg} ${config.border}`}>
      <div className={`w-2 h-2 rounded-full ${config.dot} ${config.pulse ? 'animate-pulse' : ''}`} />
      <span className={`text-[13px] font-semibold tracking-wide ${config.text}`}>{status}</span>
    </div>
  );
};

export default OrderStatusBadge;
