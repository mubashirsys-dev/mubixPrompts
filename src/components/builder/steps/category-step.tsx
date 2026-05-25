"use client";

import { useState } from "react";
import { useBuilderStore } from "@/store/builder-store";
import { categories } from "@/lib/categories";
import { ArrowRight, Search, Sparkles, Check, HelpCircle } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { motion } from "framer-motion";

// Popular Templates
const POPULAR_TEMPLATES = [
  { id: "portfolio", name: "Portfolio", icon: "User", desc: "Showcase personal work" },
  { id: "business", name: "Business", icon: "Building2", desc: "Corporate business page" },
  { id: "saas-dashboard", name: "SaaS Dashboard", icon: "LayoutDashboard", desc: "Interactive client app" },
  { id: "ecommerce", name: "Ecommerce", icon: "ShoppingCart", desc: "Sell products online" },
  { id: "restaurant", name: "Restaurant", icon: "UtensilsCrossed", desc: "Food menu & booking" },
  { id: "football-academy", name: "Football Academy", icon: "Trophy", desc: "Schedules & bookings" },
];

export function CategoryStep() {
  const { selectedCategory, setCategory, nextStep } = useBuilderStore();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "personal" | "business" | "tech" | "lifestyle">("all");

  const categoryGroups: Record<string, string[]> = {
    personal: ["portfolio", "resume-builder", "blogging", "job-portal"],
    business: ["business", "startup-landing", "agency", "ecommerce", "real-estate"],
    tech: ["ai-tool", "saas-dashboard", "prompt-generator"],
    lifestyle: ["football-academy", "gym", "restaurant", "hospital", "appointment-booking", "barber-shop", "travel-agency", "islamic-website", "mosque", "ngo"],
  };

  const getCategoryGroup = (catId: string): string => {
    for (const [group, ids] of Object.entries(categoryGroups)) {
      if (ids.includes(catId)) return group;
    }
    return "lifestyle";
  };

  const getDifficultyBadge = (id: string) => {
    if (["portfolio", "resume-builder", "blogging", "mosque", "ngo"].includes(id)) {
      return { label: "Simple Layout", color: "bg-green-100 text-green-700 border-green-300" };
    }
    if (["saas-dashboard", "ecommerce", "real-estate", "appointment-booking"].includes(id)) {
      return { label: "Advanced System", color: "bg-purple-100 text-purple-700 border-purple-300" };
    }
    return { label: "Standard Layout", color: "bg-yellow-100 text-yellow-700 border-yellow-300" };
  };

  // Filter categories
  const filtered = categories.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase()) ||
      c.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

    if (search.trim() !== "") return matchesSearch;

    if (activeTab !== "all") {
      return getCategoryGroup(c.id) === activeTab;
    }

    return true;
  });

  const getIcon = (iconName: string) => {
    const icons = LucideIcons as any;
    const Icon = icons[iconName];
    return Icon ? <Icon className="w-5 h-5 stroke-[2.5px]" /> : <LucideIcons.FileText className="w-5 h-5 stroke-[2.5px]" />;
  };

  return (
    <div className="space-y-8 bg-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_0px_#000] max-w-5xl mx-auto relative overflow-hidden">
      {/* Title */}
      <div className="text-center mb-6">
        <span className="inline-block px-3 py-1 bg-[#FF6B6B] text-white border-2 border-black font-black uppercase text-xs rotate-[-1deg] mb-4">
          STEP 1: SELECT CATEGORY
        </span>
        <h2 className="text-3xl font-black uppercase text-black">
          What are you building?
        </h2>
        <p className="text-sm font-bold text-black/70 mt-2">
          Select a template from our 24 streamlined categories. Zero enterprise complexity by default.
        </p>
      </div>

      {/* POPULAR TEMPLATES QUICK-SELECT */}
      <div className="space-y-3">
        <span className="text-[10px] font-black uppercase text-black/55 tracking-wider block">
          ⭐ Popular Templates
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {POPULAR_TEMPLATES.map((tpl) => {
            const isSelected = selectedCategory?.id === tpl.id;
            const targetCategory = categories.find((c) => c.id === tpl.id);
            return (
              <button
                key={tpl.id}
                onClick={() => {
                  if (targetCategory) {
                    setCategory(targetCategory);
                  }
                }}
                className={`p-3 border-2 border-black text-left flex flex-col justify-between transition-all active:translate-y-[1px] active:shadow-none shadow-[2px_2px_0px_0px_#000] ${
                  isSelected ? "bg-[#FFD93D] text-black" : "bg-neutral-50 hover:bg-neutral-100 text-black/70"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="w-7 h-7 bg-white border border-black flex items-center justify-center rounded">
                    {getIcon(tpl.icon)}
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-black stroke-[3px]" />}
                </div>
                <div className="mt-3">
                  <span className="text-[10px] font-black uppercase block truncate">{tpl.name}</span>
                  <span className="text-[8px] font-bold block opacity-60 leading-tight">{tpl.desc}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation & Search Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-t-2 border-black/10 pt-6">
        {/* Industry Group Tabs */}
        <div className="flex flex-wrap gap-2">
          {(["all", "personal", "business", "tech", "lifestyle"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setSearch(""); }}
              className={`px-3 py-1.5 border-2 border-black font-black uppercase text-[10px] transition-all shadow-[1px_1px_0px_0px_#000] active:translate-y-[1px] active:shadow-none ${
                activeTab === tab ? "bg-[#C4B5FD] text-black" : "bg-white text-black hover:bg-neutral-50"
              }`}
            >
              {tab === "all" ? "All Sectors" : tab}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64 shadow-[2px_2px_0px_0px_#000]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-black stroke-[3px]" />
          <input
            type="text"
            placeholder="Search templates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full neo-input pl-9 py-2 font-bold text-[11px] bg-[#FFFDF5]"
          />
        </div>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((cat, i) => {
          const isSelected = selectedCategory?.id === cat.id;
          const badge = getDifficultyBadge(cat.id);

          return (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.01, duration: 0.12 }}
              onClick={() => setCategory(cat)}
              className={`text-left p-4 border-4 border-black transition-all flex flex-col justify-between ${
                isSelected
                  ? "bg-[#C4B5FD]/10 border-[#C4B5FD] shadow-[4px_4px_0px_0px_#C4B5FD]"
                  : "bg-white hover:bg-neutral-50 shadow-[2px_2px_0px_0px_#000]"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-9 h-9 border-2 border-black flex items-center justify-center shrink-0 shadow-[1px_1px_0px_0px_#000] ${
                      isSelected ? "bg-[#C4B5FD] text-black" : "bg-neutral-100 text-black/55"
                    }`}
                  >
                    {getIcon(cat.icon)}
                  </div>

                  <span className={`text-[8px] font-black uppercase border px-2 py-0.5 ${badge.color}`}>
                    {badge.label}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-black uppercase text-xs text-black flex items-center gap-1.5">
                    {cat.name}
                  </h3>
                  <p className="text-[10px] font-bold text-black/60 leading-relaxed min-h-[30px] line-clamp-2">
                    {cat.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-black/10 pt-2.5 mt-3 text-[8px] font-black uppercase text-black/45">
                <span>Sector: <strong>{getCategoryGroup(cat.id)}</strong></span>
                <span className="bg-neutral-100 px-1.5 py-0.2 border border-black/10">{cat.id}</span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 border-4 border-dashed border-black bg-[#FFFDF5]">
          <HelpCircle className="w-8 h-8 text-black/40 mx-auto mb-2" />
          <p className="font-black text-black/60 text-xs uppercase">No matching templates found.</p>
          <button
            onClick={() => { setSearch(""); setActiveTab("all"); }}
            className="mt-3 px-4 py-1.5 bg-[#C4B5FD] border-2 border-black font-black uppercase text-[10px] shadow-[1px_1px_0px_0px_#000]"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Action Footer */}
      <div className="flex justify-between items-center pt-6 border-t-4 border-black">
        <div className="text-xs font-black uppercase text-black/50">
          {selectedCategory ? (
            <span className="flex items-center gap-1">
              <Check className="w-4 h-4 text-green-600 stroke-[3px]" />
              Selected: <strong className="text-black">{selectedCategory.name}</strong>
            </span>
          ) : (
            "Select a template to configure planning context"
          )}
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
