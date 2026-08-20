import { useState, useMemo } from "react";
import {
  Plus,
  Search,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";
import ProductCard from "../../components/admin/ProductCard";
import AddProducts from "../../components/admin/Addproducts";

/* ── Initial Products matching the screenshot ─────────────────────── */
const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Awadhi Chicken Biriyani",
    description:
      "Aromatic basmati rice layered with marinated chicken...",
    price: 480,
    prepTime: 25,
    category: "Main Course",
    status: "available",
    image:
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80",
  },
  {
    id: 2,
    name: "Garlic Butter Naan",
    description:
      "Soft, pillowy Indian flatbread cooked in a...",
    price: 85,
    prepTime: 10,
    category: "Appetizers",
    status: "available",
    image:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&q=80",
  },
  {
    id: 3,
    name: "Classic Veg Fried Rice",
    description:
      "Wok-tossed long grain rice with finely chopped...",
    price: 260,
    prepTime: 15,
    category: "Main Course",
    status: "low_stock",
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&q=80",
  },
  {
    id: 4,
    name: "Truffle Mushroom Risotto",
    description:
      "Creamy arborio rice cooked with wild forest...",
    price: 750,
    prepTime: 35,
    category: "Main Course",
    status: "draft",
    image: null,
  },
];

const BASE_CATEGORIES = ["Main Course", "Appetizers", "Desserts"];

const STATUS_FILTER_OPTIONS = [
  { value: "all", label: "In Stock", dot: "bg-[#34d399]" },
  { value: "available", label: "Available", dot: "bg-[#34d399]" },
  { value: "low_stock", label: "Low Stock", dot: "bg-[#fb923c]" },
  { value: "draft", label: "Draft", dot: "bg-[#f87171]" },
  { value: "unavailable", label: "Unavailable", dot: "bg-zinc-500" },
];

export default function Products() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [categories, setCategories] = useState(BASE_CATEGORIES);
  const [activeCategory, setActiveCategory] = useState("All Items");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [statusDropOpen, setStatusDropOpen] = useState(false);

  const allCategoryTabs = ["All Items", ...categories];

  /* ── Filtered Products ──────────────────────────────── */
  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat =
        activeCategory === "All Items" || p.category === activeCategory;
      const matchStatus =
        statusFilter === "all"
          ? p.status !== "unavailable"
          : p.status === statusFilter;
      const matchSearch =
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchStatus && matchSearch;
    });
  }, [products, activeCategory, statusFilter, searchQuery]);

  /* ── Handlers ───────────────────────────────────────── */
  const handleSave = (product) => {
    setProducts((prev) => {
      const idx = prev.findIndex((p) => p.id === product.id);
      if (idx !== -1) {
        const updated = [...prev];
        updated[idx] = product;
        return updated;
      }
      return [...prev, product];
    });
    setShowForm(false);
    setEditProduct(null);
  };

  const handleAddCategory = (newCat) => {
    if (!newCat || categories.includes(newCat)) return;
    setCategories((prev) => [...prev, newCat]);
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleToggleStatus = (product) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === product.id
          ? {
              ...p,
              status:
                p.status === "available" ? "unavailable" : "available",
            }
          : p
      )
    );
  };

  const openAdd = () => {
    setEditProduct(null);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditProduct(null);
  };

  const selectedStatus =
    STATUS_FILTER_OPTIONS.find((o) => o.value === statusFilter) ||
    STATUS_FILTER_OPTIONS[0];

  return (
    <div className="min-h-screen bg-[#0b0d12] text-white p-6 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* ── Top Bar ─────────────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Left: Category filter pills */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-1 sm:pb-0">
            {allCategoryTabs.map((cat) => {
              const isActive = activeCategory === cat;
              const count =
                cat === "All Items"
                  ? products.length
                  : products.filter((p) => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex items-center gap-1.5 h-10 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-[#261507]/60 border border-[#d97706] text-[#f59e0b] shadow-sm"
                      : "bg-[#10141d] border border-[#1e2330] text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>

          {/* Right: Status Filter + Sliders Icon */}
          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="relative hidden md:block">
              <Search
                size={14}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search menu..."
                className="h-10 pl-9 pr-4 w-48 rounded-xl bg-[#10141d] border border-[#1e2330] text-xs text-zinc-300 placeholder-zinc-500 outline-none focus:border-zinc-700 transition-all"
              />
            </div>

            {/* Status Dropdown Pill */}
            <div className="relative">
              <button
                onClick={() => setStatusDropOpen((p) => !p)}
                className="flex items-center gap-2 h-10 px-4 rounded-xl border border-[#1e2330] bg-[#10141d] text-xs sm:text-sm text-zinc-300 hover:border-zinc-700 transition-all font-medium"
              >
                <span className={`w-2 h-2 rounded-full ${selectedStatus.dot}`} />
                {selectedStatus.label}
                <ChevronDown
                  size={14}
                  className={`text-zinc-500 transition-transform ${statusDropOpen ? "rotate-180" : ""}`}
                />
              </button>
              {statusDropOpen && (
                <div className="absolute right-0 top-12 w-44 rounded-xl bg-[#141824] border border-[#242b3d] shadow-2xl z-30 overflow-hidden">
                  {STATUS_FILTER_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setStatusFilter(opt.value);
                        setStatusDropOpen(false);
                      }}
                      className={`w-full text-left flex items-center gap-2.5 px-4 py-2.5 text-xs sm:text-sm hover:bg-[#1e2436] transition-colors ${
                        statusFilter === opt.value
                          ? "text-white font-semibold"
                          : "text-zinc-400"
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${opt.dot}`} />
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filter Sliders Box */}
            <button
              className="w-10 h-10 rounded-xl border border-[#1e2330] bg-[#10141d] flex items-center justify-center text-zinc-400 hover:border-zinc-700 hover:text-white transition-all"
              title="Filters"
            >
              <SlidersHorizontal size={16} />
            </button>

            {/* Add Product Button */}
            <button
              onClick={openAdd}
              className="flex items-center gap-2 h-10 px-4 rounded-xl bg-amber-500 text-black text-xs sm:text-sm font-bold hover:bg-amber-400 active:scale-95 transition-all shadow-lg shadow-amber-500/20"
            >
              <Plus size={16} />
              Add Product
            </button>
          </div>
        </div>

        {/* ── Product Grid ────────────────────────────────── */}
        <div>
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filtered.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onToggleStatus={handleToggleStatus}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#10141d] border border-[#1e2330] flex items-center justify-center">
                <Search size={26} className="text-zinc-500" />
              </div>
              <div>
                <p className="text-white font-bold text-lg">No products found</p>
                <p className="text-zinc-500 text-xs mt-1">
                  {searchQuery
                    ? `No results for "${searchQuery}"`
                    : "No items match the current filters"}
                </p>
              </div>
              <button
                onClick={openAdd}
                className="mt-2 h-9 px-5 rounded-xl bg-amber-500 text-black text-xs font-bold hover:bg-amber-400 transition-all flex items-center gap-2"
              >
                <Plus size={14} /> Add Product
              </button>
            </div>
          )}
        </div>

        {/* ── Add / Edit Form Panel ─────────────────────── */}
        {showForm && (
          <AddProducts
            onClose={closeForm}
            onSave={handleSave}
            editProduct={editProduct}
            categories={categories}
            onAddCategory={handleAddCategory}
          />
        )}
      </div>
    </div>
  );
}
