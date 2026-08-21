import React, { createContext, useContext, useReducer, useMemo } from 'react';

const OrderContext = createContext(null);

const orderReducer = (state, action) => {
  switch (action.type) {
    case 'PLACE_ORDER': {
      const newOrder = {
        id: `ORD-${Date.now()}`,
        items: action.payload.items,
        subtotal: action.payload.subtotal,
        discount: action.payload.discount,
        tax: action.payload.tax,
        total: action.payload.total,
        tableNumber: action.payload.tableNumber || 12,
        timestamp: new Date().toISOString(),
        status: 'Preparing', // Preparing → Ready → Delivered
      };
      return {
        ...state,
        orders: [newOrder, ...state.orders],
      };
    }
    case 'UPDATE_STATUS': {
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload.id
            ? { ...order, status: action.payload.status }
            : order
        ),
      };
    }
    case 'CLEAR_ORDERS':
      return { ...state, orders: [] };
    default:
      return state;
  }
};

export const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, { orders: [] });

  const placeOrder = ({ items, subtotal, discount, tax, total, tableNumber }) => {
    dispatch({
      type: 'PLACE_ORDER',
      payload: { items, subtotal, discount, tax, total, tableNumber },
    });
  };

  const updateOrderStatus = (id, status) => {
    dispatch({ type: 'UPDATE_STATUS', payload: { id, status } });
  };

  const clearOrders = () => dispatch({ type: 'CLEAR_ORDERS' });

  const orderCount = useMemo(() => state.orders.length, [state.orders]);

  return (
    <OrderContext.Provider value={{
      orders: state.orders,
      placeOrder,
      updateOrderStatus,
      clearOrders,
      orderCount,
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
