"use client";

import { useBuilderStore } from "@/store/builder-store";
import { Coffee, Plus, Trash2, ShieldCheck, Tag } from "lucide-react";
import { useState } from "react";

interface MenuItem {
  name: string;
  category: string;
  price: string;
  description: string;
  tag: string;
}

const MENU_CATEGORIES = ["Appetizers", "Main Courses", "Desserts", "Beverages"];

export function MenuStep() {
  const { categoryAnswers, setCategoryAnswers } = useBuilderStore();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Main Courses");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");

  const menu: MenuItem[] = categoryAnswers.menu || [
    { name: "Woodfired Margherita Pizza", category: "Main Courses", price: "$18", description: "San Marzano tomatoes, fresh mozzarella, organic basil, extra virgin olive oil.", tag: "Popular" },
    { name: "Truffle Arancini", category: "Appetizers", price: "$12", description: "Crispy risotto balls filled with wild mushrooms, black truffle, and molten fontina.", tag: "Chef's Special" }
  ];

  const handleAddMenuItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price.trim()) return;

    const newItem: MenuItem = {
      name: name.trim(),
      category,
      price: price.trim(),
      description: description.trim(),
      tag: tag.trim()
    };

    setCategoryAnswers({
      ...categoryAnswers,
      menu: [...menu, newItem]
    });

    setName("");
    setPrice("");
    setDescription("");
    setTag("");
  };

  const handleDeleteMenuItem = (idx: number) => {
    const updatedMenu = menu.filter((_, i) => i !== idx);
    setCategoryAnswers({
      ...categoryAnswers,
      menu: updatedMenu
    });
  };

  return (
    <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_#000] space-y-6">
      <div className="flex items-center gap-3 border-b-4 border-black pb-4">
        <div className="w-10 h-10 bg-[#A78BFA] border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_#000]">
          <Coffee className="w-5 h-5 text-black" />
        </div>
        <div>
          <h2 className="text-xl font-black uppercase text-black">Culinary Menu builder</h2>
          <p className="text-[11px] text-neutral-500 font-bold uppercase tracking-tight">Create menu items, categories, pricing, and tag listings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Form Panel */}
        <form onSubmit={handleAddMenuItem} className="md:col-span-5 border-2 border-black p-4 bg-[#FFFDF5] space-y-4 shadow-[3px_3px_0px_0px_#000]">
          <h3 className="text-xs font-black uppercase text-black flex items-center gap-1.5">
            <Plus className="w-4 h-4 text-emerald-600 stroke-[3px]" />
            Insert Menu Item
          </h3>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-black">Item Name*</label>
            <input
              type="text"
              required
              placeholder="e.g. Fettuccine Alfredo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-2.5 py-1.5 border-2 border-black bg-white text-xs font-bold outline-none shadow-[1.5px_1.5px_0px_0px_#000]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-black">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-2 py-1.5 border-2 border-black bg-white text-xs font-bold outline-none shadow-[1.5px_1.5px_0px_0px_#000]"
              >
                {MENU_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-black">Price*</label>
              <input
                type="text"
                required
                placeholder="e.g. $22"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-2.5 py-1.5 border-2 border-black bg-white text-xs font-bold outline-none shadow-[1.5px_1.5px_0px_0px_#000]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-black">Description</label>
            <textarea
              placeholder="Ingredients, preparation details, allergen warnings..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-2.5 py-1.5 border-2 border-black bg-white text-xs font-bold outline-none shadow-[1.5px_1.5px_0px_0px_#000] resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-black">Tag (Optional)</label>
            <input
              type="text"
              placeholder="e.g. Spicy, Vegan, Chef Special"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="w-full px-2.5 py-1.5 border-2 border-black bg-white text-xs font-bold outline-none shadow-[1.5px_1.5px_0px_0px_#000]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-black text-white text-xs font-black uppercase hover:bg-neutral-800 transition-colors"
          >
            Add Menu Item
          </button>
        </form>

        {/* Right Digital Menu Viewer Panel */}
        <div className="md:col-span-7 space-y-4">
          <h3 className="text-xs font-black uppercase text-black flex items-center gap-1.5 pl-1">
            <ShieldCheck className="w-4 h-4 text-[#A78BFA]" />
            Active Menu Board ({menu.length})
          </h3>

          {MENU_CATEGORIES.map((catName) => {
            const catItems = menu.filter(item => item.category === catName);
            if (catItems.length === 0) return null;

            return (
              <div key={catName} className="space-y-2.5">
                <span className="text-[10px] font-black uppercase text-neutral-400 font-mono tracking-wider">
                  // {catName}
                </span>

                <div className="space-y-2">
                  {catItems.map((item, index) => {
                    const originalIdx = menu.findIndex(i => i.name === item.name && i.category === item.category);
                    return (
                      <div key={index} className="border-2 border-black bg-white p-3 shadow-[1.5px_1.5px_0px_0px_#000] flex justify-between items-start gap-4">
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-black text-xs uppercase text-black">{item.name}</span>
                            <span className="text-[10px] font-mono font-black text-emerald-600 bg-emerald-50 px-1 border border-emerald-200">{item.price}</span>
                            {item.tag && (
                              <span className="text-[8px] font-black uppercase px-1.5 py-0.2 bg-[#FFD93D] border border-black flex items-center gap-0.5 shadow-[0.5px_0.5px_0px_0px_#000]">
                                <Tag className="w-2.5 h-2.5" />
                                {item.tag}
                              </span>
                            )}
                          </div>
                          {item.description && (
                            <p className="text-[9.5px] font-bold text-neutral-500 leading-normal">{item.description}</p>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => handleDeleteMenuItem(originalIdx)}
                          className="p-1 border border-black hover:bg-[#FF6B6B] hover:text-white transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {menu.length === 0 && (
            <div className="border-2 border-dashed border-black/30 p-8 text-center bg-neutral-50 flex flex-col items-center justify-center gap-1">
              <p className="text-xs font-bold text-neutral-500 uppercase">Your menu is empty.</p>
              <p className="text-[9px] text-neutral-400">Fill in the fields on the left to add items to your menu board.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
