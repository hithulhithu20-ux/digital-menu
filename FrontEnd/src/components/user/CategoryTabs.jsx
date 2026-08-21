import React from 'react';

const CategoryTabs = ({
  categories = ["All", "Starters", "Biriyani", "Mains", "Desserts", "Drinks"],
  activeCategory = "All",
  onCategoryChange
}) => {
  return (
    <section className="pt-4 pb-2">
      <div
        id="category-tabs-scroll"
        className="flex items-center gap-2.5 px-5 overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              id={`category-tab-${category.toLowerCase()}`}
              onClick={() => onCategoryChange?.(category)}
              className={`
                flex-shrink-0 px-5 py-2.5 rounded-full text-[13px] font-semibold tracking-wide
                transition-all duration-300 active:scale-95
                ${isActive
                  ? 'bg-orange-500 text-orange-950 shadow-lg shadow-orange-500/25'
                  : 'bg-white/6 text-gray-400 border border-white/8 hover:text-white hover:border-white/15'
                }
              `}
            >
              {category}
            </button>
          );
        })}
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
};

export default CategoryTabs;
