import { useState, useRef } from "react";
import { X, Upload, ChevronDown, Plus, Tag, Check } from "lucide-react";

const STATUSES = ["available", "low_stock", "unavailable", "draft"];

const STATUS_LABELS = {
  available: "Available",
  low_stock: "Low Stock",
  unavailable: "Unavailable",
  draft: "Draft",
};

const STATUS_DOTS = {
  available: "bg-[#34d399]",
  low_stock: "bg-[#fb923c]",
  unavailable: "bg-zinc-500",
  draft: "bg-[#f87171]",
};

export default function AddProducts({
  onClose,
  onSave,
  editProduct,
  categories = [],
  onAddCategory,
}) {
  const isEdit = !!editProduct;
  const fileRef = useRef(null);

  const [form, setForm] = useState({
    name: editProduct?.name || "",
    description: editProduct?.description || "",
    price: editProduct?.price || "",
    prepTime: editProduct?.prepTime || "",
    category: editProduct?.category || categories[0] || "",
    status: editProduct?.status || "available",
    image: editProduct?.image || null,
    imagePreview: editProduct?.image || null,
  });

  const [errors, setErrors] = useState({});
  const [catOpen, setCatOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  /* New category state */
  const [newCatInput, setNewCatInput] = useState("");
  const [showNewCatInput, setShowNewCatInput] = useState(false);
  const [newCatError, setNewCatError] = useState("");

  const set = (key, value) => setForm((p) => ({ ...p, [key]: value }));

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setForm((p) => ({ ...p, image: file, imagePreview: url }));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file || !file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setForm((p) => ({ ...p, image: file, imagePreview: url }));
  };

  const handleAddCategory = () => {
    const trimmed = newCatInput.trim();
    if (!trimmed) {
      setNewCatError("Category name cannot be empty");
      return;
    }
    if (categories.map((c) => c.toLowerCase()).includes(trimmed.toLowerCase())) {
      setNewCatError("Category already exists");
      return;
    }
    onAddCategory?.(trimmed);
    set("category", trimmed);
    setNewCatInput("");
    setShowNewCatInput(false);
    setNewCatError("");
    setCatOpen(false);
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Product name is required";
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0)
      e.price = "Enter a valid price";
    if (!form.prepTime || isNaN(form.prepTime) || Number(form.prepTime) <= 0)
      e.prepTime = "Enter valid prep time";
    if (!form.category) e.category = "Select a category";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    await new Promise((r) => setTimeout(r, 400));
    const saved = {
      id: editProduct?.id || Date.now(),
      name: form.name.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      prepTime: Number(form.prepTime),
      category: form.category,
      status: form.status,
      image: form.imagePreview,
    };
    onSave?.(saved);
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Slide-in Panel */}
      <div className="relative ml-auto h-full w-full max-w-[480px] bg-[#0e1118] border-l border-[#1d2230] flex flex-col shadow-2xl animate-slide-in">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#1d2230]">
          <div>
            <h2 className="text-white font-bold text-lg tracking-tight">
              {isEdit ? "Edit Product" : "Add New Product"}
            </h2>
            <p className="text-zinc-400 text-xs mt-0.5">
              {isEdit
                ? "Update the product details below"
                : "Fill in the details to add a new menu item"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#161a26] border border-[#242b3d] flex items-center justify-center text-zinc-400 hover:bg-[#202738] hover:text-white transition-all"
          >
            <X size={15} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

          {/* Image Upload */}
          <div>
            <Label>Product Image</Label>
            <div
              onClick={() => fileRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="relative h-44 rounded-xl border-2 border-dashed border-[#242b3d] hover:border-zinc-500 transition-colors cursor-pointer overflow-hidden group bg-[#111522]"
            >
              {form.imagePreview ? (
                <>
                  <img
                    src={form.imagePreview}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-sm font-medium">Change Image</span>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#171c2a] flex items-center justify-center">
                    <Upload size={18} className="text-zinc-400" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-zinc-300">
                      Drag & drop or{" "}
                      <span className="text-amber-400 font-medium underline underline-offset-2">
                        browse
                      </span>
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">PNG, JPG up to 5MB</p>
                  </div>
                </div>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImage}
              />
            </div>
          </div>

          {/* Product Name */}
          <Field label="Product Name" error={errors.name}>
            <input
              type="text"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="e.g. Butter Chicken"
              className={iCls(errors.name)}
            />
          </Field>

          {/* Description */}
          <Field label="Description">
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Describe the dish, ingredients, taste..."
              rows={3}
              className={`${iCls()} resize-none`}
            />
          </Field>

          {/* Price & Prep Time */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Price (₹)" error={errors.price}>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-sm font-bold">
                  ₹
                </span>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => set("price", e.target.value)}
                  placeholder="0"
                  className={`${iCls(errors.price)} pl-7`}
                />
              </div>
            </Field>
            <Field label="Prep Time (min)" error={errors.prepTime}>
              <input
                type="number"
                value={form.prepTime}
                onChange={(e) => set("prepTime", e.target.value)}
                placeholder="0"
                className={iCls(errors.prepTime)}
              />
            </Field>
          </div>

          {/* ── Category Dropdown ────────────────────────────── */}
          <Field label="Category" error={errors.category}>
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setCatOpen((p) => !p);
                  setStatusOpen(false);
                  setShowNewCatInput(false);
                  setNewCatError("");
                }}
                className={`${iCls(errors.category)} flex items-center justify-between w-full text-left`}
              >
                <span className={form.category ? "text-zinc-200" : "text-zinc-500"}>
                  {form.category || "Select category"}
                </span>
                <ChevronDown
                  size={14}
                  className={`text-zinc-500 transition-transform ${catOpen ? "rotate-180" : ""}`}
                />
              </button>

              {catOpen && (
                <div className="absolute z-30 top-full mt-1 w-full rounded-xl bg-[#141824] border border-[#242b3d] shadow-2xl overflow-hidden">
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        set("category", c);
                        setCatOpen(false);
                        setShowNewCatInput(false);
                      }}
                      className={`w-full text-left flex items-center justify-between px-4 py-2.5 text-sm hover:bg-[#1e2436] transition-colors ${
                        form.category === c ? "text-amber-400 font-semibold" : "text-zinc-300"
                      }`}
                    >
                      {c}
                      {form.category === c && (
                        <Check size={14} className="text-amber-400" />
                      )}
                    </button>
                  ))}

                  <div className="border-t border-[#1d2334] my-1" />

                  {/* Add New Category option */}
                  {!showNewCatInput ? (
                    <button
                      onClick={() => setShowNewCatInput(true)}
                      className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-amber-400 hover:bg-[#1e2436] transition-colors"
                    >
                      <Plus size={14} />
                      Add new category
                    </button>
                  ) : (
                    <div className="p-3 space-y-2 bg-[#111420]">
                      <div className="flex items-center gap-2">
                        <div className="relative flex-1">
                          <Tag
                            size={12}
                            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-500"
                          />
                          <input
                            autoFocus
                            type="text"
                            value={newCatInput}
                            onChange={(e) => {
                              setNewCatInput(e.target.value);
                              setNewCatError("");
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleAddCategory();
                              if (e.key === "Escape") {
                                setShowNewCatInput(false);
                                setNewCatInput("");
                                setNewCatError("");
                              }
                            }}
                            placeholder="Category name..."
                            className="w-full h-8 pl-7 pr-2 rounded-lg bg-[#0a0c12] border border-[#242b3d] text-xs text-white placeholder-zinc-500 outline-none focus:border-amber-500/70 transition-all"
                          />
                        </div>
                        <button
                          onClick={handleAddCategory}
                          className="h-8 px-3 rounded-lg bg-amber-500 text-black text-xs font-bold hover:bg-amber-400 transition-all flex-shrink-0"
                        >
                          Add
                        </button>
                      </div>
                      {newCatError && (
                        <p className="text-xs text-rose-400 px-0.5">{newCatError}</p>
                      )}
                      <p className="text-[10px] text-zinc-500 px-0.5">
                        Press Enter to add · Esc to cancel
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Field>

          {/* ── Status Dropdown ────────────────────────────── */}
          <Field label="Status">
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setStatusOpen((p) => !p);
                  setCatOpen(false);
                }}
                className={`${iCls()} flex items-center justify-between w-full text-left`}
              >
                <span className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${STATUS_DOTS[form.status]}`}
                  />
                  <span className="text-zinc-200">{STATUS_LABELS[form.status]}</span>
                </span>
                <ChevronDown
                  size={14}
                  className={`text-zinc-500 transition-transform ${statusOpen ? "rotate-180" : ""}`}
                />
              </button>
              {statusOpen && (
                <div className="absolute z-30 top-full mt-1 w-full rounded-xl bg-[#141824] border border-[#242b3d] shadow-2xl overflow-hidden">
                  {STATUSES.map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        set("status", s);
                        setStatusOpen(false);
                      }}
                      className={`w-full text-left flex items-center justify-between px-4 py-2.5 text-sm hover:bg-[#1e2436] transition-colors ${
                        form.status === s ? "text-white font-medium" : "text-zinc-400"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${STATUS_DOTS[s]}`} />
                        {STATUS_LABELS[s]}
                      </span>
                      {form.status === s && <Check size={14} className="text-amber-400" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </Field>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#1d2230] flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 h-11 rounded-xl bg-[#161a26] border border-[#242b3d] text-zinc-300 text-sm font-medium hover:bg-[#202738] hover:text-white transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 h-11 rounded-xl bg-amber-500 text-black text-sm font-bold hover:bg-amber-400 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-md shadow-amber-500/20"
          >
            {saving ? (
              <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
              <Plus size={16} />
            )}
            {saving ? "Saving..." : isEdit ? "Update Product" : "Add Product"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* Helpers */
function Label({ children }) {
  return (
    <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
      {children}
    </p>
  );
}

function Field({ label, error, children }) {
  return (
    <div>
      <Label>{label}</Label>
      {children}
      {error && <p className="text-xs text-rose-400 mt-1.5">{error}</p>}
    </div>
  );
}

function iCls(hasError) {
  return `w-full h-10 px-3.5 rounded-xl bg-[#111522] border ${
    hasError
      ? "border-rose-500/60 focus:border-rose-500"
      : "border-[#22283a] focus:border-amber-500/70"
  } text-xs sm:text-sm text-zinc-200 placeholder-zinc-500 outline-none transition-all`;
}
