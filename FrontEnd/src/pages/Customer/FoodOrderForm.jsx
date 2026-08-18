import React, { useState } from 'react';

const MENU_CATEGORIES = ['All', 'Starters', 'Main Course', 'Beverages', 'Desserts', 'Chef Specials'];

const MENU_ITEMS = [
  {
    id: 1,
    name: 'Truffle Mushroom Risotto',
    category: 'Main Course',
    price: 18.50,
    rating: 4.9,
    description: 'Creamy arborio rice with wild forest mushrooms, white truffle oil & parmesan.',
    tags: ['Vegetarian', 'Popular'],
    image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=400&q=80',
    preparationTime: '15-20 min'
  },
  {
    id: 2,
    name: 'Grilled Salmon Teriyaki',
    category: 'Main Course',
    price: 24.00,
    rating: 4.8,
    description: 'Fresh Atlantic salmon fillet glazed with house teriyaki, served with asparagus.',
    tags: ['Chef Special', 'Gluten Free'],
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=400&q=80',
    preparationTime: '20 min'
  },
  {
    id: 3,
    name: 'Crispy Calamari Fritti',
    category: 'Starters',
    price: 12.00,
    rating: 4.7,
    description: 'Golden fried calamari rings served with lemon garlic aioli and fresh herbs.',
    tags: ['Seafood', 'Popular'],
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=400&q=80',
    preparationTime: '10-12 min'
  },
  {
    id: 4,
    name: 'Smoked Bruschetta Platter',
    category: 'Starters',
    price: 9.50,
    rating: 4.6,
    description: 'Toasted sourdough with heirloom tomatoes, fresh basil, garlic & aged balsamic.',
    tags: ['Vegetarian', 'Vegan'],
    image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=400&q=80',
    preparationTime: '8 min'
  },
  {
    id: 5,
    name: 'Wagyu Smash Burger',
    category: 'Main Course',
    price: 19.50,
    rating: 4.9,
    description: 'Double wagyu beef patties, aged cheddar, caramelised onions & truffle mayo.',
    tags: ['Chef Special', 'Popular'],
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80',
    preparationTime: '15 min'
  },
  {
    id: 6,
    name: 'Artisan Molten Lava Cake',
    category: 'Desserts',
    price: 10.00,
    rating: 4.9,
    description: 'Rich dark chocolate cake with a molten core, paired with vanilla bean gelato.',
    tags: ['Sweet', 'Popular'],
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400&q=80',
    preparationTime: '10 min'
  },
  {
    id: 7,
    name: 'Signature Passionfruit Spritz',
    category: 'Beverages',
    price: 7.50,
    rating: 4.8,
    description: 'Sparkling blend of fresh passionfruit pulp, lime juice, mint leaves & tonic.',
    tags: ['Refreshing', 'Signature'],
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400&q=80',
    preparationTime: '5 min'
  },
  {
    id: 8,
    name: 'Classic Iced Matcha Latte',
    category: 'Beverages',
    price: 6.50,
    rating: 4.7,
    description: 'Ceremonial grade Japanese Uji matcha shaken with creamy oat milk & honey.',
    tags: ['Beverage'],
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=400&q=80',
    preparationTime: '5 min'
  }
];

export const FoodOrderForm = ({ tableNo = 'T-12', onBackToAdmin }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState({});
  const [notes, setNotes] = useState('');
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredItems = selectedCategory === 'All'
    ? MENU_ITEMS
    : selectedCategory === 'Chef Specials'
    ? MENU_ITEMS.filter(item => item.tags.includes('Chef Special'))
    : MENU_ITEMS.filter(item => item.category === selectedCategory);

  const addToCart = (item) => {
    setCart((prev) => ({
      ...prev,
      [item.id]: {
        ...item,
        quantity: (prev[item.id]?.quantity || 0) + 1
      }
    }));
  };

  const removeFromCart = (itemId) => {
    setCart((prev) => {
      const updated = { ...prev };
      if (!updated[itemId]) return prev;
      if (updated[itemId].quantity > 1) {
        updated[itemId] = {
          ...updated[itemId],
          quantity: updated[itemId].quantity - 1
        };
      } else {
        delete updated[itemId];
      }
      return updated;
    });
  };

  const cartList = Object.values(cart);
  const totalCartCount = cartList.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartList.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const grandTotal = subtotal + tax;

  const handlePlaceOrder = () => {
    if (cartList.length === 0) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderSubmitted(true);
    }, 1200);
  };

  const handleResetOrder = () => {
    setCart({});
    setNotes('');
    setOrderSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] text-[#E2E2E9] font-['Inter',sans-serif] pb-24">
      {/* Top Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#131822]/90 backdrop-blur-md border-b border-[#1F2736] px-4 py-3 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF6200] to-[#FF8C38] flex items-center justify-center font-bold text-white shadow-lg shadow-[#FF6200]/25">
              🍽️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-white">Digital Dining Menu</span>
                <span className="bg-[#FF6200]/15 text-[#FF6200] border border-[#FF6200]/30 text-xs font-semibold px-2 py-0.5 rounded-md">
                  Table {tableNo}
                </span>
              </div>
              <p className="text-xs text-[#8A929B]">Instant kitchen order & contactless dispatch</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {onBackToAdmin && (
              <button
                onClick={onBackToAdmin}
                className="bg-[#1A212E] hover:bg-[#252E40] border border-[#252E40] text-xs font-medium text-[#E2E2E9] px-3.5 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>←</span>
                <span className="hidden sm:inline">Back to Dashboard</span>
                <span className="sm:hidden">Admin</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 pt-6">
        {orderSubmitted ? (
          /* Order Confirmation Screen */
          <div className="max-w-md mx-auto bg-[#131822] border border-[#1F2736] rounded-2xl p-8 text-center space-y-6 shadow-2xl mt-12 animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 bg-[#10B981]/15 border border-[#10B981]/30 rounded-full flex items-center justify-center mx-auto text-4xl text-[#10B981]">
              ✓
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Order Sent to Kitchen!</h2>
              <p className="text-[#8A929B] text-sm mt-2">
                Your order for <span className="text-[#FF6200] font-semibold">Table {tableNo}</span> has been received and is currently being prepared.
              </p>
            </div>

            <div className="bg-[#0B0E14] border border-[#1F2736] rounded-xl p-4 text-left space-y-2">
              <div className="flex justify-between text-xs text-[#8A929B] pb-2 border-b border-[#1F2736]">
                <span>Items ({totalCartCount})</span>
                <span>Total: ${grandTotal.toFixed(2)}</span>
              </div>
              {cartList.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-[#E2E2E9]">{item.quantity}x {item.name}</span>
                  <span className="text-[#8A929B] font-mono">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleResetOrder}
                className="w-full bg-[#FF6200] hover:bg-[#E05600] text-white font-medium py-3 rounded-xl transition-all cursor-pointer shadow-lg shadow-[#FF6200]/25"
              >
                Order More Items
              </button>
              {onBackToAdmin && (
                <button
                  onClick={onBackToAdmin}
                  className="w-full bg-[#1A212E] hover:bg-[#252E40] border border-[#252E40] text-[#E2E2E9] text-sm py-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  Return to Admin Dashboard
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Normal Food Browsing & Ordering View */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Menu & Categories */}
            <div className="lg:col-span-8 space-y-6">
              {/* Category Pills Bar */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
                {MENU_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-[#FF6200] text-white shadow-md shadow-[#FF6200]/25'
                        : 'bg-[#131822] border border-[#1F2736] text-[#8A929B] hover:text-white hover:border-[#2E3A50]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Menu Items Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredItems.map((item) => {
                  const inCartQty = cart[item.id]?.quantity || 0;
                  return (
                    <div
                      key={item.id}
                      className="bg-[#131822] border border-[#1F2736] hover:border-[#2E3A50] rounded-2xl p-4 flex flex-col justify-between transition-all duration-150 hover:shadow-xl hover:shadow-black/40 group"
                    >
                      <div>
                        {/* Image & Tags */}
                        <div className="relative w-full h-40 rounded-xl overflow-hidden mb-3 bg-[#1A212E]">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                          <div className="absolute top-2 left-2 flex gap-1.5 flex-wrap">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className="bg-[#0B0E14]/80 backdrop-blur-xs text-[#FF6200] text-[10px] font-semibold px-2 py-0.5 rounded-md border border-[#FF6200]/30"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <span className="absolute bottom-2 right-2 bg-[#0B0E14]/80 backdrop-blur-xs text-white text-[11px] px-2 py-0.5 rounded-md font-mono">
                            ⏱ {item.preparationTime}
                          </span>
                        </div>

                        {/* Title & Rating */}
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-bold text-[#E2E2E9] text-base group-hover:text-white">
                            {item.name}
                          </h3>
                          <span className="text-xs text-amber-400 font-semibold flex items-center gap-0.5 shrink-0">
                            ★ {item.rating}
                          </span>
                        </div>

                        <p className="text-xs text-[#8A929B] line-clamp-2 mt-1.5">
                          {item.description}
                        </p>
                      </div>

                      {/* Price & Add to Cart Controls */}
                      <div className="flex items-center justify-between pt-4 mt-2 border-t border-[#1F2736]">
                        <span className="text-lg font-bold text-white font-mono">
                          ${item.price.toFixed(2)}
                        </span>

                        {inCartQty > 0 ? (
                          <div className="flex items-center gap-2 bg-[#1A212E] border border-[#252E40] rounded-xl p-1">
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="w-7 h-7 rounded-lg bg-[#252E40] hover:bg-[#333E54] text-white flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
                            >
                              -
                            </button>
                            <span className="w-5 text-center font-bold text-sm text-white">
                              {inCartQty}
                            </span>
                            <button
                              onClick={() => addToCart(item)}
                              className="w-7 h-7 rounded-lg bg-[#FF6200] hover:bg-[#E05600] text-white flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => addToCart(item)}
                            className="bg-[#1A212E] hover:bg-[#FF6200] text-[#E2E2E9] hover:text-white border border-[#252E40] hover:border-[#FF6200] text-xs font-semibold px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                          >
                            <span>+</span>
                            <span>Add</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Cart & Summary Panel */}
            <div className="lg:col-span-4">
              <div className="bg-[#131822] border border-[#1F2736] rounded-2xl p-5 sticky top-20 shadow-xl space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#1F2736]">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-white">Your Order</span>
                    <span className="bg-[#FF6200]/20 text-[#FF6200] text-xs font-bold px-2 py-0.5 rounded-full">
                      {totalCartCount} items
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#8A929B]">
                    Table #{tableNo}
                  </span>
                </div>

                {cartList.length === 0 ? (
                  <div className="py-12 text-center text-[#8A929B] space-y-2">
                    <p className="text-3xl">🛒</p>
                    <p className="text-sm">No items in order yet.</p>
                    <p className="text-xs">Browse menu items on the left to add food.</p>
                  </div>
                ) : (
                  <>
                    {/* Item list in Cart */}
                    <div className="space-y-3 max-h-60 overflow-y-auto pr-1 scrollbar-thin">
                      {cartList.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between bg-[#1A212E] border border-[#252E40] rounded-xl p-2.5"
                        >
                          <div className="flex-1 min-w-0 pr-2">
                            <h4 className="text-xs font-semibold text-white truncate">
                              {item.name}
                            </h4>
                            <span className="text-[11px] text-[#8A929B] font-mono">
                              ${item.price.toFixed(2)} each
                            </span>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="w-6 h-6 rounded-md bg-[#252E40] hover:bg-[#333E54] text-white flex items-center justify-center font-bold text-xs cursor-pointer"
                            >
                              -
                            </button>
                            <span className="text-xs font-bold text-white w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => addToCart(item)}
                              className="w-6 h-6 rounded-md bg-[#FF6200] hover:bg-[#E05600] text-white flex items-center justify-center font-bold text-xs cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Kitchen Instructions / Notes */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-[#8A929B]">
                        Special Cooking Instructions (Optional)
                      </label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="E.g., Extra spicy, no onions, dressing on side..."
                        rows={2}
                        className="w-full bg-[#1A212E] border border-[#252E40] rounded-xl p-2.5 text-xs text-white placeholder-[#505A69] focus:outline-none focus:border-[#FF6200] resize-none"
                      />
                    </div>

                    {/* Price Breakdown */}
                    <div className="space-y-2 pt-2 border-t border-[#1F2736] text-xs">
                      <div className="flex justify-between text-[#8A929B]">
                        <span>Subtotal</span>
                        <span className="font-mono text-white">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-[#8A929B]">
                        <span>Tax &amp; Service (8%)</span>
                        <span className="font-mono text-white">${tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-[#1F2736]">
                        <span>Total</span>
                        <span className="font-mono text-[#FF6200]">${grandTotal.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Submit Order Button */}
                    <button
                      onClick={handlePlaceOrder}
                      disabled={isSubmitting}
                      className="w-full bg-[#FF6200] hover:bg-[#E05600] disabled:bg-[#FF6200]/50 text-white font-semibold py-3 rounded-xl transition-all cursor-pointer shadow-lg shadow-[#FF6200]/30 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin text-sm">⏳</span>
                          <span>Dispatching to Kitchen...</span>
                        </>
                      ) : (
                        <>
                          <span>⚡ Place Order for {tableNo}</span>
                        </>
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default FoodOrderForm;
