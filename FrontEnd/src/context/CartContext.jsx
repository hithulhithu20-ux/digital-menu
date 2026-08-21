import React, { createContext, useContext, useReducer, useMemo } from 'react';

const CartContext = createContext(null);

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(item => item.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }
    case 'REMOVE_ITEM': {
      const existing = state.items.find(item => item.id === action.payload.id);
      if (existing && existing.quantity > 1) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
      };
    }
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload.id),
        };
      }
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    }
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addToCart = (item) => dispatch({ type: 'ADD_ITEM', payload: item });
  const removeFromCart = (id) => dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  const updateQuantity = (id, quantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const getItemQuantity = (id) => {
    const item = state.items.find(i => i.id === id);
    return item ? item.quantity : 0;
  };

  const cartTotal = useMemo(() =>
    state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [state.items]
  );

  const cartCount = useMemo(() =>
    state.items.reduce((sum, item) => sum + item.quantity, 0),
    [state.items]
  );

  return (
    <CartContext.Provider value={{
      cartItems: state.items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getItemQuantity,
      cartTotal,
      cartCount,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
