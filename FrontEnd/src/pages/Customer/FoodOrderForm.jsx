import React, { useState } from 'react';
import { categories, menuItems } from './menuData';

export const FoodOrderForm = ({ tableNo = 'T-12', onBackToAdmin }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [cart, setCart] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(null);

  // Customer Form Details
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Pay at Table');

  // Filter menu items
  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVeg = !vegOnly || item.isVeg;
    return matchesCategory && matchesSearch && matchesVeg;
  });

  // Cart operations
  const handleAddToCart = (itemId) => {
    setCart((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const handleRemoveFromCart = (itemId) => {
    setCart((prev) => {
      const updated = { ...prev };
      if (updated[itemId] > 1) {
        updated[itemId] -= 1;
      } else {
        delete updated[itemId];
      }
      return updated;
    });
  };

  const cartItemIds = Object.keys(cart);
  const totalCartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  const subtotal = cartItemIds.reduce((sum, id) => {
    const item = menuItems.find((m) => m.id === id);
    return sum + (item ? item.price * cart[id] : 0);
  }, 0);

  const tax = subtotal * 0.05; // 5% GST
  const grandTotal = subtotal + tax;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (totalCartCount === 0) return;

    const newOrder = {
      orderId: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      tableNo,
      customerName: customerName || 'Valued Guest',
      phone,
      items: cartItemIds.map((id) => {
        const item = menuItems.find((m) => m.id === id);
        return {
          name: item.name,
          qty: cart[id],
          price: item.price,
        };
      }),
      subtotal,
      tax,
      grandTotal,
      specialNotes,
      paymentMethod,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setOrderPlaced(newOrder);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setCart({});
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] text-[#E2E2E9] font-['Inter',sans-serif] pb-28">
      {/* HEADER / NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-[#131822]/90 backdrop-blur-md border-b border-[#1F2736] px-4 py-3 sm:px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF6200] to-[#FF8533] flex items-center justify-center text-white font-black text-xl shadow-lg shadow-[#FF6200]/20">
              🍴
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-lg text-white leading-tight">Digital Dining Menu</h1>
                <span className="bg-[#FF6200]/20 border border-[#FF6200] text-[#FF6200] text-xs font-bold px-2.5 py-0.5 rounded-full animate-pulse">
                  Table {tableNo}
                </span>
              </div>
              <p className="text-xs text-[#8A929B]">Scan, Select & Instant Kitchen Order</p>
            </div>
          </div>

          {onBackToAdmin && (
            <button
              onClick={onBackToAdmin}
              className="text-xs font-semibold bg-[#1A212E] hover:bg-[#252E40] border border-[#252E40] text-[#E2E2E9] px-3.5 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>←</span>
              <span className="hidden sm:inline">Admin View</span>
            </button>
          )}
        </div>
      </header>

      {/* HERO BANNER & TABLE INFO */}
      <section className="bg-gradient-to-r from-[#18100C] via-[#1F1511] to-[#131822] border-b border-[#1F2736] px-4 py-6 sm:px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-[#FF6200]">
              Welcome Guest
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Order Food for Table <span className="text-[#FF6200]">{tableNo}</span>
            </h2>
            <p className="text-sm text-[#8A929B] mt-1">
              Select dishes below to send your order straight to the kitchen staff.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-[#131822] border border-[#252E40] px-4 py-2 rounded-xl text-xs text-[#E2E2E9]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
            <span>Kitchen Live & Ready</span>
          </div>
        </div>
      </section>

      {/* MAIN CONTAINER */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 space-y-6">

        {/* SEARCH & VEG FILTER */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:flex-1">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A929B]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" strokeWidth="2" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2" />
            </svg>
            <input
              type="text"
              placeholder="Search dishes, drinks, desserts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#131822] border border-[#1F2736] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-[#505A69] outline-none focus:border-[#FF6200] transition-colors"
            />
          </div>

          {/* Veg Only Toggle */}
          <button
            onClick={() => setVegOnly(!vegOnly)}
            className={`w-full sm:w-auto px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all ${vegOnly
                ? 'bg-[#10B981]/20 border-[#10B981] text-[#10B981]'
                : 'bg-[#131822] border-[#1F2736] text-[#8A929B] hover:text-white'
              }`}
          >
            <span className={`w-3 h-3 rounded-full border flex items-center justify-center ${vegOnly ? 'border-[#10B981] bg-[#10B981]' : 'border-gray-500'}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
            </span>
            <span>Veg Only</span>
          </button>
        </div>

        {/* CATEGORY NAV TABS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${isActive
                    ? 'bg-[#FF6200] text-white shadow-lg shadow-[#FF6200]/20'
                    : 'bg-[#131822] border border-[#1F2736] text-[#8A929B] hover:text-white hover:border-[#2E3A50]'
                  }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* MENU ITEMS GRID */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#131822] border border-[#1F2736] rounded-2xl p-6">
            <p className="text-4xl mb-3">🔍</p>
            <h3 className="text-lg font-bold text-white">No dishes found</h3>
            <p className="text-sm text-[#8A929B] mt-1">Try clearing your search or changing category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {filteredItems.map((dish) => {
              const qtyInCart = cart[dish.id] || 0;

              return (
                <div
                  key={dish.id}
                  className="bg-[#131822] border border-[#1F2736] hover:border-[#2E3A50] rounded-2xl p-4 flex gap-4 transition-all duration-200 shadow-md group"
                >
                  {/* Dish Image */}
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden shrink-0 bg-[#1A212E]">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {dish.popular && (
                      <span className="absolute top-2 left-2 bg-[#FF6200] text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-md">
                        ★ Popular
                      </span>
                    )}
                  </div>

                  {/* Dish Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`w-3.5 h-3.5 border flex items-center justify-center p-0.5 ${dish.isVeg ? 'border-green-500' : 'border-red-500'
                              }`}
                          >
                            <span
                              className={`w-2 h-2 rounded-full ${dish.isVeg ? 'bg-green-500' : 'bg-red-500'
                                }`}
                            />
                          </span>
                          <h3 className="font-bold text-base text-white leading-snug">
                            {dish.name}
                          </h3>
                        </div>
                      </div>

                      <p className="text-xs text-[#8A929B] line-clamp-2 mt-1">
                        {dish.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#1F2736]">
                      <div className="flex flex-col">
                        <span className="text-lg font-bold text-[#FF6200]">
                          ${dish.price.toFixed(2)}
                        </span>
                        <span className="text-[10px] text-[#8A929B]">⏱ {dish.prepTime}</span>
                      </div>

                      {/* Quantity Add Counter */}
                      {qtyInCart === 0 ? (
                        <button
                          onClick={() => handleAddToCart(dish.id)}
                          className="bg-[#FF6200]/15 border border-[#FF6200] text-[#FF6200] hover:bg-[#FF6200] hover:text-white px-4 py-1.5 rounded-lg font-bold text-xs transition-all cursor-pointer shadow-sm"
                        >
                          + ADD
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 bg-[#1A212E] border border-[#FF6200] rounded-lg px-2 py-1">
                          <button
                            onClick={() => handleRemoveFromCart(dish.id)}
                            className="text-white font-bold px-1.5 hover:text-[#FF6200] transition-colors cursor-pointer text-sm"
                          >
                            -
                          </button>
                          <span className="font-bold text-sm text-white px-1">
                            {qtyInCart}
                          </span>
                          <button
                            onClick={() => handleAddToCart(dish.id)}
                            className="text-white font-bold px-1.5 hover:text-[#FF6200] transition-colors cursor-pointer text-sm"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* FLOATING BOTTOM CART BAR */}
      {totalCartCount > 0 && (
        <div className="fixed bottom-4 left-4 right-4 z-40 max-w-xl mx-auto">
          <div className="bg-gradient-to-r from-[#FF6200] to-[#E05600] text-white rounded-2xl p-4 shadow-2xl shadow-[#FF6200]/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 px-3 py-1.5 rounded-xl text-sm font-bold">
                {totalCartCount} {totalCartCount === 1 ? 'Item' : 'Items'}
              </div>
              <div>
                <p className="text-xs text-white/80">Total Amount</p>
                <p className="text-lg font-extrabold">${grandTotal.toFixed(2)}</p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-white text-[#FF6200] font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-gray-100 transition-colors shadow-md cursor-pointer flex items-center gap-2"
            >
              <span>View Cart &amp; Order</span>
              <span>→</span>
            </button>
          </div>
        </div>
      )}

      {/* CART & CHECKOUT DRAWER MODAL */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex justify-end">
          <div className="bg-[#131822] border-l border-[#1F2736] w-full max-w-md h-full flex flex-col justify-between p-6 animate-in slide-in-from-right duration-200 overflow-y-auto">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between border-b border-[#1F2736] pb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Your Food Order</h2>
                  <p className="text-xs text-[#8A929B]">Table {tableNo}</p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-[#8A929B] hover:text-white text-xl font-bold transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Items List */}
              <div className="space-y-4 my-6">
                {cartItemIds.map((id) => {
                  const item = menuItems.find((m) => m.id === id);
                  const qty = cart[id];
                  if (!item) return null;

                  return (
                    <div key={id} className="flex items-center justify-between bg-[#1A212E] p-3 rounded-xl border border-[#252E40]">
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                        <div>
                          <h4 className="font-semibold text-sm text-white">{item.name}</h4>
                          <p className="text-xs text-[#FF6200] font-bold">${item.price.toFixed(2)} each</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 bg-[#131822] border border-[#252E40] rounded-lg px-2 py-1">
                        <button onClick={() => handleRemoveFromCart(id)} className="text-[#8A929B] hover:text-white text-sm font-bold px-1 cursor-pointer">-</button>
                        <span className="text-white font-bold text-xs px-1">{qty}</span>
                        <button onClick={() => handleAddToCart(id)} className="text-[#8A929B] hover:text-white text-sm font-bold px-1 cursor-pointer">+</button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bill Details */}
              <div className="bg-[#1A212E] rounded-xl p-4 space-y-2 text-xs border border-[#252E40]">
                <div className="flex justify-between text-[#8A929B]">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#8A929B]">
                  <span>Taxes &amp; Service (5%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-[#252E40] pt-2 flex justify-between font-bold text-sm text-white">
                  <span>Grand Total</span>
                  <span className="text-[#FF6200]">${grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-[#1F2736] space-y-3">
              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full bg-[#FF6200] hover:bg-[#E05600] text-white font-bold py-3 rounded-xl shadow-lg shadow-[#FF6200]/20 transition-all cursor-pointer"
              >
                Proceed to Details &amp; Confirm
              </button>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-full text-xs text-[#8A929B] hover:text-white transition-colors cursor-pointer py-1"
              >
                + Add More Dishes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CHECKOUT MODAL FORM */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#131822] border border-[#1F2736] rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-[#1F2736] pb-3">
              <div>
                <h3 className="text-lg font-bold text-white">Confirm Order - Table {tableNo}</h3>
                <p className="text-xs text-[#8A929B]">Total Amount: <span className="text-[#FF6200] font-bold">${grandTotal.toFixed(2)}</span></p>
              </div>
              <button onClick={() => setIsCheckoutOpen(false)} className="text-[#8A929B] hover:text-white font-bold text-lg cursor-pointer">✕</button>
            </div>

            <form onSubmit={handlePlaceOrder} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#8A929B] font-semibold uppercase tracking-wider mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-[#1A212E] border border-[#252E40] rounded-lg px-3.5 py-2 text-white outline-none focus:border-[#FF6200]"
                />
              </div>

              <div>
                <label className="block text-[#8A929B] font-semibold uppercase tracking-wider mb-1">Phone Number (Optional)</label>
                <input
                  type="tel"
                  placeholder="e.g. +1 555-0192"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#1A212E] border border-[#252E40] rounded-lg px-3.5 py-2 text-white outline-none focus:border-[#FF6200]"
                />
              </div>

              <div>
                <label className="block text-[#8A929B] font-semibold uppercase tracking-wider mb-1">Special Cooking Requests</label>
                <textarea
                  rows="2"
                  placeholder="e.g. Less spicy, extra sauce, allergies..."
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  className="w-full bg-[#1A212E] border border-[#252E40] rounded-lg px-3.5 py-2 text-white outline-none focus:border-[#FF6200] resize-none"
                />
              </div>

              <div>
                <label className="block text-[#8A929B] font-semibold uppercase tracking-wider mb-1">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full bg-[#1A212E] border border-[#252E40] rounded-lg px-3.5 py-2 text-white outline-none focus:border-[#FF6200] cursor-pointer"
                >
                  <option value="Pay at Table">Pay at Table (Cash / Card)</option>
                  <option value="UPI / Online">Pay Online (UPI / Card)</option>
                </select>
              </div>

              <div className="pt-3 border-t border-[#1F2736] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCheckoutOpen(false)}
                  className="px-4 py-2 rounded-lg text-[#8A929B] hover:text-white cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-[#FF6200] hover:bg-[#E05600] text-white font-bold shadow-lg shadow-[#FF6200]/20 cursor-pointer"
                >
                  Send Order to Kitchen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SUCCESS CONFIRMATION MODAL */}
      {orderPlaced && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#131822] border border-[#1F2736] rounded-2xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-[#10B981]/20 border border-[#10B981] rounded-full flex items-center justify-center mx-auto text-3xl text-[#10B981]">
              ✓
            </div>
            <div>
              <span className="text-xs text-[#FF6200] font-mono font-bold">{orderPlaced.orderId}</span>
              <h3 className="text-xl font-bold text-white mt-1">Order Placed Successfully!</h3>
              <p className="text-xs text-[#8A929B] mt-1">
                Your order for <strong className="text-white">Table {orderPlaced.tableNo}</strong> has been dispatched to our chef.
              </p>
            </div>

            <div className="bg-[#1A212E] rounded-xl p-3 text-left space-y-1 text-xs border border-[#252E40]">
              <div className="flex justify-between text-white font-semibold">
                <span>Guest: {orderPlaced.customerName}</span>
                <span className="text-[#10B981]">Confirmed</span>
              </div>
              <p className="text-[#8A929B]">Items: {orderPlaced.items.map(i => `${i.qty}x ${i.name}`).join(', ')}</p>
              <div className="flex justify-between text-[#8A929B] pt-1">
                <span>Total Amount:</span>
                <span className="text-white font-bold">${orderPlaced.grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => setOrderPlaced(null)}
                className="w-full bg-[#FF6200] hover:bg-[#E05600] text-white text-xs font-bold py-2.5 rounded-xl shadow-md cursor-pointer transition-colors"
              >
                + Order More Dishes
              </button>
              {onBackToAdmin && (
                <button
                  onClick={onBackToAdmin}
                  className="w-full bg-[#1A212E] hover:bg-[#252E40] border border-[#252E40] text-xs text-[#8A929B] hover:text-white py-2 rounded-xl transition-colors cursor-pointer"
                >
                  Return to Admin Dashboard
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodOrderForm;
