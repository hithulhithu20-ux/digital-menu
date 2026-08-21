import React from 'react';
import OrderStatusBadge from './OrderStatusBadge';

const OrderCard = ({ order }) => {
  const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
  const timeString = new Date(order.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="bg-[#141619] rounded-2xl p-5 border border-white/5 mb-4 last:mb-0">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-white font-bold text-[15px] mb-1">Order #{order.id.slice(-6)}</h3>
          <p className="text-gray-500 text-sm">{timeString} • {itemCount} {itemCount === 1 ? 'item' : 'items'}</p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="border-t border-white/5 border-dashed pt-4 mb-4">
        {order.items.map((item, index) => (
          <div key={index} className="flex justify-between items-center text-[14px] mb-2 last:mb-0">
            <span className="text-gray-400">
              <span className="text-white/60 w-6 inline-block">{item.quantity}x</span> {item.name}
            </span>
            <span className="text-white/90">₹{item.price * item.quantity}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center pt-3 border-t border-white/5">
        <span className="text-gray-400 text-sm font-medium">Total</span>
        <span className="text-white font-bold tracking-wide">₹{order.total}</span>
      </div>
    </div>
  );
};

export default OrderCard;
