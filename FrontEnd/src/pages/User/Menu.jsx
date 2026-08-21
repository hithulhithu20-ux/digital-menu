import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuHeader from '../../components/user/MenuHeader';
import MenuGreeting from '../../components/user/MenuGreeting';
import ChefSignature from '../../components/user/ChefSignature';
import CategoryTabs from '../../components/user/CategoryTabs';
import SectionLabel from '../../components/user/SectionLabel';
import MenuItemCard from '../../components/user/MenuItemCard';
import BottomNavBar from '../../components/user/BottomNavBar';
import { useCart } from '../../context/CartContext';

// Mock menu data
const menuItems = [
  {
    id: 1,
    name: "Alfaham Chicken",
    description: "Arabian spiced grilled chicken, slow-cooked over charcoal for an intense, smoky flavor. Served with fresh pita and garlic aioli.",
    price: 320,
    image: "/alfaham-chicken.jpg",
    category: "Mains",
    isVeg: false,
    isTodaySpecial: true,
  },
  {
    id: 2,
    name: "Paneer Tikka",
    description: "Chunks of cottage cheese marinated in spiced yogurt, grilled to smoky perfection in a tandoor oven. Served with mint chutney.",
    price: 240,
    image: "/chicken-biriyani.jpg",
    category: "Starters",
    isVeg: true,
    isTodaySpecial: false,
  },
  {
    id: 3,
    name: "Mutton Biriyani",
    description: "Slow-cooked mutton layered with fragrant basmati rice, saffron, and caramelized onions. A royal feast in every bite.",
    price: 350,
    image: "/chicken-biriyani.jpg",
    category: "Biriyani",
    isVeg: false,
    isTodaySpecial: false,
  },
  {
    id: 4,
    name: "Chicken Shawarma",
    description: "Thinly sliced marinated chicken wrapped in warm pita bread with garlic sauce, pickles, and fresh vegetables.",
    price: 180,
    image: "/alfaham-chicken.jpg",
    category: "Starters",
    isVeg: false,
    isTodaySpecial: true,
  },
];

const categories = ["All", "Starters", "Biriyani", "Mains", "Desserts", "Drinks"];

const Menu = () => {
  const navigate = useNavigate();
  const { cartCount, cartTotal, addToCart } = useCart();

  const handleAddToCart = (item) => {
    addToCart(item);
  };
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTab, setActiveTab] = useState("menu");
  const [searchQuery, setSearchQuery] = useState("");
  const [vegFilter, setVegFilter] = useState("all"); // "all" | "veg" | "nonveg"

  // Filter items by category and search
  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = !searchQuery || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVeg = vegFilter === "all" || 
      (vegFilter === "veg" && item.isVeg) || 
      (vegFilter === "nonveg" && !item.isVeg);
    return matchesCategory && matchesSearch && matchesVeg;
  });

  const todaySpecials = filteredItems.filter((item) => item.isTodaySpecial);
  const regularItems = filteredItems.filter((item) => !item.isTodaySpecial);

  return (
    <div className="min-h-screen bg-[#0b0d12] flex items-start justify-center">
      {/* Mobile container */}
      <div className="relative w-full max-w-[430px] min-h-screen bg-[#0b0d12] pb-28">

        {/* Header */}
        <MenuHeader restaurantName="La Maison Elite" />

        {/* Greeting & Search */}
        <MenuGreeting greeting="Good Evening" onSearch={setSearchQuery} />

        {/* Chef's Signature */}
        <ChefSignature
          name="Chicken Biriyani"
          price={180}
          image="/chicken-biriyani.jpg"
          tags={["Spicy", "Contains Nuts"]}
        />

        {/* Sticky Filter Bar: Veg/Non-Veg Toggle + Category Tabs */}
        <div className="sticky top-0 z-20 bg-[#0b0d12] pb-1 pt-2" style={{ backdropFilter: 'blur(12px)' }}>
          {/* Veg / Non-Veg Toggle */}
          <div className="flex items-center gap-2 px-5 pb-3">
            <button
              id="filter-all"
              onClick={() => setVegFilter("all")}
              className={`px-4 py-2 rounded-full text-[12px] font-semibold tracking-wide transition-all duration-300 active:scale-95 ${
                vegFilter === "all"
                  ? "bg-orange-500 text-orange-950 shadow-lg shadow-orange-500/25"
                  : "bg-white/[0.06] text-gray-400 border border-white/[0.08] hover:text-white hover:border-white/[0.15]"
              }`}
            >
              All
            </button>
            <button
              id="filter-veg"
              onClick={() => setVegFilter("veg")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[12px] font-semibold tracking-wide transition-all duration-300 active:scale-95 ${
                vegFilter === "veg"
                  ? "bg-green-500 text-green-950 shadow-lg shadow-green-500/25"
                  : "bg-white/[0.06] text-gray-400 border border-white/[0.08] hover:text-white hover:border-white/[0.15]"
              }`}
            >
              <span className="w-3.5 h-3.5 rounded-sm border-2 border-current flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
              </span>
              Veg
            </button>
            <button
              id="filter-nonveg"
              onClick={() => setVegFilter("nonveg")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[12px] font-semibold tracking-wide transition-all duration-300 active:scale-95 ${
                vegFilter === "nonveg"
                  ? "bg-red-500 text-red-950 shadow-lg shadow-red-500/25"
                  : "bg-white/[0.06] text-gray-400 border border-white/[0.08] hover:text-white hover:border-white/[0.15]"
              }`}
            >
              <span className="w-3.5 h-3.5 rounded-sm border-2 border-current flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
              </span>
              Non-Veg
            </button>
          </div>

          {/* Category Tabs */}
          <CategoryTabs
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>

        {/* Today's Special Section */}
        {todaySpecials.length > 0 && (
          <>
            <SectionLabel label="Today's Special" />
            {todaySpecials.map((item) => (
              <MenuItemCard
                key={item.id}
                id={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
                isVeg={item.isVeg}
                onAddToCart={handleAddToCart}
              />
            ))}
          </>
        )}

        {/* Regular Menu Items */}
        {regularItems.length > 0 && (
          <>
            <SectionLabel label="Menu" />
            {regularItems.map((item) => (
              <MenuItemCard
                key={item.id}
                id={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
                isVeg={item.isVeg}
                onAddToCart={handleAddToCart}
              />
            ))}
          </>
        )}

        {/* Empty state */}
        {filteredItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF6200" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-gray-300 mb-1">No dishes found</p>
            <p className="text-xs text-gray-500">Try a different search or category</p>
          </div>
        )}

        {/* Floating Cart Button */}
        {cartCount > 0 && (
          <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-[390px] px-5 z-40">
            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-orange-500 hover:bg-orange-600 text-orange-950 px-5 py-3.5 rounded-full flex items-center justify-between shadow-lg shadow-orange-500/30 transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
                  {cartCount}
                </span>
                <span className="font-bold text-[15px]">View Cart</span>
              </div>
              <span className="font-bold text-[15px]">₹{cartTotal}</span>
            </button>
          </div>
        )}

        {/* Bottom Navigation */}
        <BottomNavBar activeTab={activeTab} onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab === 'orders') navigate('/orders');
          else if (tab === 'home') navigate('/');
        }} />
      </div>
    </div>
  );
};

export default Menu;
