"use client";

import { useState } from "react";
import { useBuilderStore } from "@/store/builder-store";
import { categories } from "@/lib/categories";
import { ArrowRight, Search, Star, Zap, Eye, Compass, Heart } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CategoryStep() {
  const { selectedCategory, setCategory, nextStep } = useBuilderStore();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"main" | "all">("main");

  // Define the core 9 categories requested
  const mainCategoryIds = [
    "portfolio",
    "saas-dashboard", // SaaS / Dashboard
    "business",
    "ecommerce",
    "football-academy", // Sports Academy
    "agency",
    "ai-tool",
    "school-erp", // Education
  ];

  // Helper metadata details for cards (estimated complexity & recommendation)
  const getCardDetails = (id: string) => {
    switch (id) {
      case "portfolio":
        return { complexity: "Easy", rec: "Beginner Friendly", color: "bg-green-100 text-green-700" };
      case "saas-dashboard":
        return { complexity: "Advanced", rec: "AI Recommended", color: "bg-purple-100 text-purple-700" };
      case "business":
        return { complexity: "Medium", rec: "Popular", color: "bg-blue-100 text-blue-700" };
      case "ecommerce":
        return { complexity: "Advanced", rec: "Stripe Ready", color: "bg-pink-100 text-pink-700" };
      case "football-academy":
        return { complexity: "Medium", rec: "Highly Visual", color: "bg-yellow-100 text-yellow-700" };
      case "agency":
        return { complexity: "Medium", rec: "Popular", color: "bg-indigo-100 text-indigo-700" };
      case "ai-tool":
        return { complexity: "Medium", rec: "Future Proof", color: "bg-cyan-100 text-cyan-700" };
      case "school-erp":
        return { complexity: "Advanced", rec: "Multi-Role", color: "bg-red-100 text-red-700" };
      default:
        return { complexity: "Medium", rec: "Popular", color: "bg-neutral-100 text-neutral-700" };
    }
  };

  const filtered = categories.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase()) ||
      c.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

    if (search.trim() !== "") return matchesSearch;

    if (activeTab === "main") {
      return mainCategoryIds.includes(c.id) && matchesSearch;
    }
    return matchesSearch;
  });

  const getIcon = (iconName: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const icons = LucideIcons as any;
    const Icon = icons[iconName];
    return Icon ? <Icon className="w-5 h-5 stroke-[2.5px]" /> : <LucideIcons.FileText className="w-5 h-5 stroke-[2.5px]" />;
  };

  return (
    <div className="space-y-8 bg-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_0px_#000] max-w-5xl mx-auto">
      <div className="text-center mb-6">
        <span className="inline-block px-3 py-1 bg-[#FFD93D] border-2 border-black font-black uppercase text-xs rotate-[-1deg] mb-4">
          STEP 1: SELECT CATEGORY
        </span>
        <h2 className="text-3xl font-black uppercase text-black">What are you building today?</h2>
        <p className="text-sm font-bold text-black/70 mt-2">
          Choose a project category to instantly unlock pre-calibrated feature recommendations.
        </p>
      </div>

      {/* Tabs selector */}
      <div className="flex justify-center gap-3">
        <button
          onClick={() => { setActiveTab("main"); setSearch(""); }}
          className={`px-4 py-2 border-2 border-black font-black uppercase text-xs transition-all flex items-center gap-1.5 shadow-[2px_2px_0px_0px_#000] active:translate-y-[1px] active:shadow-none ${
            activeTab === "main" && !search ? "bg-[#C4B5FD] text-black" : "bg-white text-black"
          }`}
        >
          <Star className="w-4 h-4" />
          Main Categories
        </button>
        <button
          onClick={() => { setActiveTab("all"); setSearch(""); }}
          className={`px-4 py-2 border-2 border-black font-black uppercase text-xs transition-all flex items-center gap-1.5 shadow-[2px_2px_0px_0px_#000] active:translate-y-[1px] active:shadow-none ${
            activeTab === "all" || search ? "bg-[#FF6B6B] text-white" : "bg-white text-black"
          }`}
        >
          <Compass className="w-4 h-4" />
          View More Categories (45+)
        </button>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md mx-auto shadow-[4px_4px_0px_0px_#000]">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black stroke-[3px]" />
        <input
          type="text"
          placeholder="Search categories (e.g. 'Sports', 'SaaS', 'Clinic')..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full neo-input pl-12 py-3.5 font-bold text-xs bg-[#FFFDF5]"
        />
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((cat, i) => {
          const isSelected = selectedCategory?.id === cat.id;
          const meta = getCardDetails(cat.id);

          return (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.015, duration: 0.18 }}
              onClick={() => setCategory(cat)}
              className={`text-left p-5 border-4 border-black transition-all duration-100 flex flex-col justify-between ${
                isSelected
                  ? "bg-[#FFFDF5] shadow-[6px_6px_0px_0px_#000] translate-x-[-2px] translate-y-[-2px] border-4 border-black"
                  : "bg-white hover:bg-neutral-50 shadow-[2px_2px_0px_0px_#000]"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-10 h-10 border-2 border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#000] ${
                      isSelected ? "bg-[#FFD93D] text-black" : "bg-[#C4B5FD] text-black"
                    }`}
                  >
                    {getIcon(cat.icon)}
                  </div>

                  <span className={`text-[9px] font-black uppercase border border-black px-2 py-0.5 ${meta.color}`}>
                    {meta.rec}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-black uppercase text-sm text-black flex items-center gap-1.5">
                    {cat.name}
                    {isSelected && <span className="w-2 h-2 rounded-full bg-[#FF6B6B]" />}
                  </h3>
                  <p className="text-xs font-bold text-black/70 leading-relaxed">{cat.description}</p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-black/10 pt-3 mt-4 text-[9px] font-black uppercase text-black/55">
                <span>Complexity: <strong>{meta.complexity}</strong></span>
                <span className="bg-neutral-100 px-2 py-0.5 border border-black/10">{cat.id}</span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-black/25">
          <p className="font-bold text-black/55 text-sm">No templates matched your query. Try a different keyword!</p>
        </div>
      )}

      {/* Action Footer */}
      <div className="flex justify-between items-center pt-6 border-t-4 border-black">
        <div className="text-xs font-bold text-black/60">
          {selectedCategory ? `Active: ${selectedCategory.name}` : "Select a category to unlock features"}
        </div>
        <button
          onClick={nextStep}
          disabled={!selectedCategory}
          className="neo-btn neo-btn-accent text-sm py-2.5 px-8 font-black uppercase flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Continue
          <ArrowRight className="w-4 h-4 stroke-[3px]" />
        </button>
      </div>
    </div>
  );
}
