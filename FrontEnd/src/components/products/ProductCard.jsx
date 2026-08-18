import { useState } from "react";
import {
  Clock,
  Utensils,
  Croissant,
  Soup,
  FileText,
  ImagePlus,
  MoreVertical,
  Edit2,
  Trash2,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";

const STATUS_CONFIG = {
  available: {
    label: "AVAILABLE",
    dot: "bg-[#34d399]",
    text: "text-[#34d399]",
    badge: "bg-[#0d261a]/90 border border-[#105e3a]/60 backdrop-blur-md",
  },
  low_stock: {
    label: "LOW STOCK",
    dot: "bg-[#fb923c]",
    text: "text-[#fb923c]",
    badge: "bg-[#2a1708]/90 border border-[#7c2d12]/60 backdrop-blur-md",
  },
  draft: {
    label: "DRAFT",
    dot: "bg-[#f87171]",
    text: "text-[#f87171]",
    badge: "bg-[#2a080c]/90 border border-[#881337]/60 backdrop-blur-md",
  },
  unavailable: {
    label: "UNAVAILABLE",
    dot: "bg-zinc-500",
    text: "text-zinc-400",
    badge: "bg-zinc-900/90 border border-zinc-700/60 backdrop-blur-md",
  },
};

const CATEGORY_BOTTOM_ICONS = {
  Biriyani: <Utensils size={18} className="text-zinc-300" />,
  Naan: <Croissant size={18} className="text-zinc-300" />,
  Rice: <Soup size={18} className="text-zinc-300" />,
  Risotto: <FileText size={18} className="text-zinc-300" />,
  "Main Course": <Utensils size={18} className="text-zinc-300" />,
  Appetizers: <Croissant size={18} className="text-zinc-300" />,
  Desserts: <Soup size={18} className="text-zinc-300" />,
  Beverages: <Utensils size={18} className="text-zinc-300" />,
};

export default function ProductCard({ product, onEdit, onDelete, onToggleStatus }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const status = STATUS_CONFIG[product.status] || STATUS_CONFIG.draft;
  const isDraft = product.status === "draft";
  const isUnavailable = product.status === "unavailable";

  const getBottomIcon = () => {
    if (isDraft) return <FileText size={18} className="text-zinc-400" />;
    if (product.name.includes("Biriyani")) return <Utensils size={18} className="text-zinc-300" />;
    if (product.name.includes("Naan")) return <Croissant size={18} className="text-zinc-300" />;
    if (product.name.includes("Rice")) return <Soup size={18} className="text-zinc-300" />;
    return CATEGORY_BOTTOM_ICONS[product.category] || <Utensils size={18} className="text-zinc-300" />;
  };

  return (
    <div
      className={`relative rounded-2xl overflow-hidden flex flex-col group transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl hover:shadow-black/70 ${
        isDraft
          ? "bg-[#0e1016] border border-[#1a1e28]"
          : "bg-[#11141c] border border-[#1c212d]"
      }`}
    >
      {/* Top Right Status Badge */}
      <div className="absolute top-3 right-3 z-10">
        <span
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider ${status.badge} ${status.text}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
          {status.label}
        </span>
      </div>

      {/* 3-Dot Options Button on Top Left */}
      <div className="absolute top-3 left-3 z-10">
        <div className="relative">
          <button
            onClick={() => setMenuOpen((p) => !p)}
            className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-zinc-300 hover:bg-black/90 hover:text-white transition-all opacity-0 group-hover:opacity-100"
            title="Options"
          >
            <MoreVertical size={14} />
          </button>
          {menuOpen && (
            <div className="absolute left-0 top-9 w-44 rounded-xl bg-[#161a24] border border-[#262c3a] shadow-2xl z-30 overflow-hidden">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onEdit?.(product);
                }}
                className="flex items-center gap-2.5 w-full px-4 py-2.5 text-xs text-zinc-300 hover:bg-[#202736] hover:text-white transition-colors"
              >
                <Edit2 size={13} /> Edit Product
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onToggleStatus?.(product);
                }}
                className="flex items-center gap-2.5 w-full px-4 py-2.5 text-xs text-zinc-300 hover:bg-[#202736] hover:text-white transition-colors"
              >
                {product.status === "available" ? (
                  <><ToggleLeft size={13} /> Mark Unavailable</>
                ) : (
                  <><ToggleRight size={13} /> Mark Available</>
                )}
              </button>
              <div className="border-t border-[#242b3a]" />
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onDelete?.(product.id);
                }}
                className="flex items-center gap-2.5 w-full px-4 py-2.5 text-xs text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors"
              >
                <Trash2 size={13} /> Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Image / Draft Area */}
      <div className="h-48 overflow-hidden relative">
        {product.image && !isDraft ? (
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
              isUnavailable ? "grayscale opacity-50" : ""
            }`}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#0d0f15] border-b border-[#181c26] gap-2 p-4 text-center">
            <div className="w-12 h-12 rounded-xl bg-[#141822] border border-[#222836] flex items-center justify-center text-zinc-500">
              <ImagePlus size={24} />
            </div>
            <span className="text-xs text-zinc-500 font-medium">
              Draft: {product.name}
            </span>
          </div>
        )}
      </div>

      {/* Card Content Area */}
      <div className="p-5 flex flex-col gap-2 flex-1 justify-between">
        <div>
          {/* Title */}
          <h3
            className={`font-bold text-xl leading-tight ${
              isDraft || isUnavailable ? "text-zinc-500" : "text-white"
            }`}
          >
            {product.name}
          </h3>

          {/* Description */}
          <p
            className={`text-xs mt-2 leading-relaxed line-clamp-2 ${
              isDraft || isUnavailable ? "text-zinc-600" : "text-zinc-400"
            }`}
          >
            {product.description}
          </p>
        </div>

        {/* Footer Row */}
        <div className="mt-4 pt-3 flex items-end justify-between">
          <div>
            {/* Prep Time */}
            <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-medium mb-1">
              <Clock size={13} className="text-zinc-400" />
              <span>
                {product.prepTime}
                {product.prepTime > 15 ? "-30" : ""} min
              </span>
            </div>
            {/* Price */}
            <span
              className={`font-extrabold text-2xl tracking-tight block ${
                isDraft || isUnavailable ? "text-zinc-500" : "text-white"
              }`}
            >
              ₹{product.price}
            </span>
          </div>

          {/* Bottom Right Icon Box */}
          <div className="w-11 h-11 rounded-xl bg-[#161a24] border border-[#222836] flex items-center justify-center shadow-md">
            {getBottomIcon()}
          </div>
        </div>
      </div>
    </div>
  );
}
