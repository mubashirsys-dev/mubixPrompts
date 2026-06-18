"use client";

import { useBuilderStore } from "@/store/builder-store";
import { designStyles, getCategoryDesignStyles } from "@/lib/design-styles";
import { getCategoryWorkflowMeta } from "@/lib/workflows-meta";
import { ThemePreview } from "@/components/builder/theme-preview";
import {
  ArrowRight, ArrowLeft, Search, Layers, Cpu, BookOpen,
  Laptop, Palette, Activity, Database, Shield, Star,
  Sliders, SlidersHorizontal, Monitor, Tablet, Smartphone, Upload, Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useRef, useEffect } from "react";

// Lucide icon mapping to styles
const styleIcons: Record<string, any> = {
  "monochrome": BookOpen,
  "bauhaus": Palette,
  "modern-dark": Cpu,
  "newsprint": Layers,
  "saas": Laptop
};

// Custom theme insights metadata
const styleMetadata: Record<string, {
  tags: string[];
  bestFor: string;
  complexity: "Standard" | "Artistic" | "Sophisticated" | "High Integrity";
  badge?: string;
  supportsDark: boolean;
  score: string;
  explanation: string;
}> = {
  "monochrome": {
    tags: ["High Contrast", "Solid Lines"],
    bestFor: "Luxury Portfolios & Publications",
    complexity: "High Integrity",
    badge: "EDITORIAL MASTER",
    supportsDark: false,
    score: "99%",
    explanation: "Austere editorial design utilizing mathematical font hierarchies and pure black/white ratios."
  },
  "bauhaus": {
    tags: ["Form Follows Function", "Solid Shadow"],
    bestFor: "Art Studios & Agencies",
    complexity: "Artistic",
    badge: "CONSTRUCTIVIST MODERN",
    supportsDark: false,
    score: "98%",
    explanation: "Tactile constructivist grid composition layering Red, Yellow, Blue shapes and 4px heavy borders."
  },
  "modern-dark": {
    tags: ["Frosted Glass", "Indigo spotlights"],
    bestFor: "Engineering SaaS & Crypto Apps",
    complexity: "Sophisticated",
    badge: "CINEMATIC DARK",
    supportsDark: true,
    score: "100%",
    explanation: "Deep space-grade backdrop using layered translucent modules and interactive cursor glows."
  },
  "newsprint": {
    tags: ["Newsprint Paper", "Explicit Grid dividers"],
    bestFor: "Writers, Journalists & Blogs",
    complexity: "Standard",
    badge: "VINTAGE PRINT",
    supportsDark: false,
    score: "97%",
    explanation: "High-density editorial column divisions mimicking the classic tactile quality of vintage morning print."
  },
  "saas": {
    tags: ["Electric Blue", "Rounded modules"],
    bestFor: "Startup Landing Pages & Dashboards",
    complexity: "Sophisticated",
    badge: "AI RECOMMENDED",
    supportsDark: true,
    score: "99%",
    explanation: "Clean fluid workspace grids featuring vibrant electric blue gradients, modern margins, and soft shadows."
  }
};

export function DesignStep() {
  const {
    selectedDesignStyle,
    setDesignStyle,
    customThemePrompt,
    setCustomThemePrompt,
    brandBuilder,
    setBrandBuilder,
    nextStep,
    prevStep,
    selectedCategory,
    codingLevel,
    complexityTier,
    selectedSections,
    setupApis,
    selectedFeatures
  } = useBuilderStore();

  const steps = getCategoryWorkflowMeta(selectedCategory?.id || null);
  const themeStep = steps.find((s) => s.id === "theme");
  const stepLabel = themeStep ? themeStep.label : "Visual Theme";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"popularity" | "complexity" | "alphabetical">("popularity");
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [themeImage, setThemeImage] = useState(brandBuilder.themeReferenceUrl || "");
  const categoriesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = categoriesRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        container.scrollLeft += e.deltaY * 1.2;
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const handleThemeImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setThemeImage(file.name);
    setBrandBuilder({ themeReferenceUrl: file.name });
  };

  const categoryStyles = useMemo(() => {
    return getCategoryDesignStyles(selectedCategory?.id || null);
  }, [selectedCategory]);

  useEffect(() => {
    if (!selectedDesignStyle || !categoryStyles.some(s => s.id === selectedDesignStyle.id)) {
      if (categoryStyles[0]) {
        setDesignStyle(categoryStyles[0]);
      }
    }
  }, [categoryStyles, selectedDesignStyle, setDesignStyle]);

  const activeStyle = selectedDesignStyle && categoryStyles.some(s => s.id === selectedDesignStyle.id)
    ? selectedDesignStyle
    : categoryStyles[0] || designStyles[0];

  const meta = useMemo(() => {
    const defaultMeta = {
      tags: activeStyle.characteristics || [],
      bestFor: activeStyle.description || "General Category Usage",
      complexity: "Sophisticated" as const,
      badge: activeStyle.name.toUpperCase(),
      supportsDark: activeStyle.id.includes("dark") || activeStyle.id.includes("stripe") || activeStyle.id.includes("linear") || activeStyle.id.includes("vercel") || activeStyle.id.includes("dashboard") || activeStyle.id.includes("developer"),
      score: "99%",
      explanation: activeStyle.description
    };
    return styleMetadata[activeStyle.id] || defaultMeta;
  }, [activeStyle]);

  // Sticky Category Toggles
  const categories = [
    { id: "all", label: "All Themes" },
    { id: "light", label: "Light Mode" },
    { id: "dark", label: "Dark Mode" },
    { id: "minimal", label: "Minimalist" },
    { id: "editorial", label: "Editorial" },
    { id: "modern", label: "Modern / SaaS" }
  ];

  // Search + Filter + Sorting algorithm
  const filteredAndSortedStyles = useMemo(() => {
    // 1. Filter
    const filtered = categoryStyles.filter(style => {
      const matchesSearch = style.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        style.description.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;

      if (selectedFilter === "all") return true;
      
      const isDark = style.id.includes("dark") || 
                     style.id.includes("stripe") || 
                     style.id.includes("linear") || 
                     style.id.includes("vercel") || 
                     style.id.includes("dashboard") || 
                     style.id.includes("developer");
                     
      if (selectedFilter === "light") {
        return !isDark;
      }
      if (selectedFilter === "dark") {
        return isDark;
      }
      if (selectedFilter === "minimal") {
        return style.id.includes("minimal") || style.id.includes("monochrome") || style.id.includes("editorial");
      }
      if (selectedFilter === "editorial") {
        return style.id.includes("editorial") || style.id.includes("monochrome") || style.id.includes("brutalist") || style.id.includes("luxury");
      }
      if (selectedFilter === "modern") {
        return style.id.includes("modern") || style.id.includes("saas") || style.id.includes("stripe") || style.id.includes("linear") || style.id.includes("vercel") || style.id.includes("startup") || style.id.includes("dashboard");
      }
      return true;
    });

    // 2. Sort
    return [...filtered].sort((a, b) => {
      if (sortBy === "alphabetical") {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === "complexity") {
        const complMap: Record<string, number> = { "Standard": 1, "Artistic": 2, "Sophisticated": 3, "High Integrity": 4 };
        const compA = complMap[styleMetadata[a.id]?.complexity || "Standard"] || 1;
        const compB = complMap[styleMetadata[b.id]?.complexity || "Standard"] || 1;
        return compB - compA; // Higher complexity first
      }
      // default: popularity / score
      const scoreA = parseInt(styleMetadata[a.id]?.score || "99%");
      const scoreB = parseInt(styleMetadata[b.id]?.score || "99%");
      return scoreB - scoreA;
    });
  }, [categoryStyles, searchQuery, selectedFilter, sortBy]);

  return (
    <div className="space-y-6 bg-[#FFFDF5] border-4 border-black p-4 sm:p-6 shadow-[8px_8px_0px_0px_#000] max-w-full mx-auto relative overflow-hidden">

      {/* Wizard Step Title */}
      <div className="text-center mb-6">
        <span className="inline-block px-3 py-1 bg-[#FFD93D] border-2 border-black font-black uppercase text-[10px] tracking-widest rotate-[-1deg] mb-3">
          STEP 4: AI DESIGN SYSTEM DIRECTORY
        </span>
        <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black">
          SELECT YOUR {stepLabel.toUpperCase()}
        </h2>
        <p className="text-[11px] sm:text-xs font-bold text-black/70 mt-1.5 max-w-2xl mx-auto">
          Pre-load verified UI tokens natively. Watch the central responsive browser sandbox synthesize layouts in real time.
        </p>
      </div>

      {/* ==================================================== */}
      {/* TOP: STICKY UTILITY BAR */}
      {/* ==================================================== */}
      <div className="sticky top-0 z-40 bg-white border-4 border-black p-3.5 shadow-[4px_4px_0px_0px_#000] flex flex-col md:flex-row md:items-center justify-between gap-4">

        {/* Category Filters Toggle */}
        <div ref={categoriesRef} className="flex gap-1.5 overflow-x-auto pb-1 md:pb-0 scroll-smooth">
          {categories.map((cat) => {
            const isActive = selectedFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedFilter(cat.id)}
                className={`px-3 py-1.5 border-2 border-black text-[9px] font-black uppercase tracking-wider transition-all duration-100 shrink-0 ${isActive ? "bg-[#FFD93D] text-black shadow-[2px_2px_0px_0px_#000]" : "bg-neutral-50 hover:bg-neutral-100 text-black"
                  }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search, View, Device & Sort Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search bar */}
          <div className="relative flex items-center border-2 border-black bg-neutral-50 px-2.5 py-1.5 shadow-[1.5px_1.5px_0px_0px_#000] w-full sm:w-44">
            <Search className="w-3.5 h-3.5 text-black/55 mr-1.5 shrink-0" />
            <input
              type="text"
              placeholder="Search designs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-[10px] font-bold w-full focus:outline-none placeholder-black/40 text-black"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1 border-2 border-black bg-neutral-50 px-2 py-1 shadow-[1.5px_1.5px_0px_0px_#000]">
            <SlidersHorizontal className="w-3 h-3 text-black/60 shrink-0" />
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-transparent text-[9.5px] font-black uppercase focus:outline-none cursor-pointer text-black"
            >
              <option value="popularity">Popularity</option>
              <option value="complexity">Complexity</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </div>

          {/* Quick View Device Switcher */}
          <div className="flex items-center border-2 border-black bg-white shadow-[1.5px_1.5px_0px_0px_#000] rounded-none shrink-0 overflow-hidden">
            <button
              onClick={() => setDevice("desktop")}
              className={`p-1.5 hover:bg-neutral-100 border-r border-black ${device === "desktop" ? "bg-[#C4B5FD] text-black" : "text-black"}`}
              title="Simulate Desktop Viewport"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDevice("tablet")}
              className={`p-1.5 hover:bg-neutral-100 border-r border-black ${device === "tablet" ? "bg-[#C4B5FD] text-black" : "text-black"}`}
              title="Simulate Tablet Viewport"
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDevice("mobile")}
              className={`p-1.5 hover:bg-neutral-100 ${device === "mobile" ? "bg-[#C4B5FD] text-black" : "text-black"}`}
              title="Simulate Mobile Viewport"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* ==================================================== */}
      {/* 2-COLUMN COHESIVE FIGMA-LIKE WORKSPACE BOARD */}
      {/* ==================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* ---------------------------------------------------- */}
        {/* LEFT COLUMN: Controls & Configurations (col-span-5, 40%) */}
        {/* ---------------------------------------------------- */}
        <div className="lg:col-span-5 space-y-6">

          {/* Swatches Deck: Style Theme Selection Card Directory */}
          <div className="bg-white border-4 border-black p-5 shadow-[4px_4px_0px_0px_#000] space-y-4">
            <div className="flex items-center justify-between border-b-2 border-black pb-2">
              <span className="text-[9.5px] font-black uppercase text-black tracking-wider">AVAILABLE SYSTEM DNA ({filteredAndSortedStyles.length})</span>
              <span className="text-[7.5px] font-black uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 border border-emerald-600/30">VERIFIED ORIGINAL</span>
            </div>

            <div className="space-y-3.5 max-h-[360px] overflow-y-auto pr-1.5 scrollbar-thin">
              <AnimatePresence mode="popLayout">
                {filteredAndSortedStyles.length > 0 ? (
                  filteredAndSortedStyles.map((style) => {
                    const isSelected = activeStyle.id === style.id;
                    const Icon = styleIcons[style.id] || Layers;
                    const metaInfo = styleMetadata[style.id] || { tags: [], bestFor: "SaaS", complexity: "Sophisticated", score: "95%", badge: "" };

                    return (
                      <motion.div
                        layoutId={`theme-card-${style.id}`}
                        key={style.id}
                        onClick={() => setDesignStyle(style)}
                        className={`w-full text-left p-3.5 border-4 transition-all duration-150 flex flex-col gap-3 relative shadow-[3.5px_3.5px_0px_0px_#000] cursor-pointer hover:shadow-[5px_5px_0px_0px_#000] ${isSelected
                            ? "bg-[#C4B5FD] text-black border-black shadow-none translate-y-[1.5px]"
                            : "bg-white border-black text-black"
                          }`}
                      >
                        {/* Visual Quality Badge */}
                        {metaInfo.badge && (
                          <div className="absolute -top-2 right-2 rotate-[1deg] z-10">
                            <span className="px-1.5 py-0.5 bg-[#FF6B6B] text-white border border-black font-black uppercase text-[7px] tracking-widest shadow-[1px_1px_0px_0px_#000]">
                              {metaInfo.badge}
                            </span>
                          </div>
                        )}

                        {/* Left Swatch header row */}
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-9 h-9 border-2 border-black flex items-center justify-center shadow-[1px_1px_0px_0px_#000] shrink-0"
                            style={{ background: style.preview }}
                          >
                            <Icon className="w-3.5 h-3.5 text-black stroke-[3px] bg-white/70 p-0.5 rounded border border-black/10" />
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h3 className="font-black uppercase text-[11px] text-black tracking-tight">{style.name}</h3>
                              {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B6B] animate-ping" />}
                            </div>
                            <span className="text-[7px] font-black uppercase text-black/50 tracking-wider">
                              Score: {metaInfo.score} • {style.typography.heading}
                            </span>
                          </div>
                        </div>

                        {/* Short explanation */}
                        <p className="text-[10px] font-bold text-black/75 leading-relaxed line-clamp-2">
                          {style.description}
                        </p>

                        {/* Swatches preview */}
                        <div className="flex justify-between items-center border-t border-black/10 pt-2 shrink-0">
                          <span className="text-[7.5px] font-black bg-neutral-100 border border-black/15 px-1.5 py-0.5 font-mono text-black/60">
                            {metaInfo.complexity}
                          </span>
                          <div className="flex gap-1">
                            {Object.values(style.colors).slice(0, 3).map((c, idx) => (
                              <div
                                key={idx}
                                className="w-3 h-3 rounded-full border border-black/20"
                                style={{ backgroundColor: c }}
                              />
                            ))}
                          </div>
                        </div>

                      </motion.div>
                    );
                  })
                ) : (
                  <div className="border-4 border-dashed border-black p-8 text-center bg-white space-y-2">
                    <Search className="w-8 h-8 text-black/40 mx-auto stroke-[2.5px]" />
                    <span className="text-xs font-black uppercase text-black/60 block">NO ALIGNED THEMES FOUND</span>
                    <p className="text-[10px] text-black/40 font-bold">Refine your search descriptors or filters query.</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* DNA Controls: custom overrides and DNA mockups upload */}
          <div className="border-4 border-black p-5 bg-[#FFFDF5] shadow-[4px_4px_0px_0px_#000] space-y-3.5">
            <div className="border-b border-black pb-2 flex justify-between items-center">
              <span className="text-[10.5px] font-black uppercase text-black flex items-center gap-1">
                <Sliders className="w-4 h-4 text-[#FFD93D]" />
                CUSTOM DESIGN CODES (DNA OVERRIDES)
              </span>
              <span className="text-[7.5px] font-mono font-bold text-neutral-400 bg-zinc-900 border border-black px-1.5 py-0.2 uppercase text-white rounded">LIVE INJECTOR</span>
            </div>

            <textarea
              placeholder="e.g. Injected 1px light gray borders, Outfit typography headings, spring button active click compression states..."
              value={customThemePrompt}
              onChange={(e) => setCustomThemePrompt(e.target.value)}
              className="w-full border-2 border-black p-2.5 font-bold text-[10px] bg-white focus:outline-none min-h-[60px] resize-none shadow-[2px_2px_0px_0px_#000] placeholder-neutral-400"
            />

            <div className="relative border-2 border-dashed border-black bg-white p-3 text-center flex flex-col items-center justify-center gap-1.5 shadow-[2px_2px_0px_0px_#000]">
              <Upload className="w-4 h-4 text-black/60" />
              <span className="text-[9px] font-black uppercase text-black/50">
                {themeImage ? `✅ Reference: ${themeImage}` : "Drop Reference UI Mockup..."}
              </span>
              <label className="cursor-pointer bg-[#C4B5FD] border border-black px-2 py-0.5 text-[8.5px] font-black uppercase shadow-[1px_1px_0px_0px_#000] hover:bg-purple-300 transition-colors">
                Select reference
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThemeImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Metadata, deep insights, and compiler telemetry stack */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Telemetry metadata card */}
            <div className="border-4 border-black bg-white p-4 shadow-[4px_4px_0px_0px_#000] space-y-2.5">
              <span className="neo-sticker bg-[#FFD93D] text-[8.5px] font-black uppercase tracking-wide">SYSTEM METADATA</span>

              <div className="space-y-1.5 text-[10.5px] font-bold pt-1.5 border-t border-black/10">
                <div className="flex justify-between items-center gap-1">
                  <span className="text-black/55">Theme:</span>
                  <span className="font-black text-black uppercase truncate max-w-[100px]">{activeStyle.name}</span>
                </div>
                <div className="flex justify-between items-center gap-1">
                  <span className="text-black/55">Fonts:</span>
                  <span className="font-black text-neutral-800 bg-neutral-100 border border-black/15 px-1 py-0.2 rounded font-mono truncate max-w-[90px]" title={activeStyle.typography.heading}>
                    {activeStyle.typography.heading}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-black/55">Score:</span>
                  <span className="font-black text-emerald-600">{meta.score}</span>
                </div>
              </div>
            </div>

            {/* Workspace Telemetry */}
            <div className="border-4 border-black bg-white p-4 shadow-[4px_4px_0px_0px_#000] space-y-2.5">
              <span className="text-[8px] font-black text-black/55 uppercase tracking-wider block">COMPILER STATS</span>

              <div className="space-y-1.5 text-[10.5px] font-bold pt-1.5 border-t border-black/10">
                <div className="flex justify-between items-center">
                  <span className="text-black/55 flex items-center gap-1"><Activity className="w-3 h-3 text-emerald-500" /> State:</span>
                  <span className="font-black text-green-600 uppercase text-[9.5px]">Ready</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-black/55 flex items-center gap-1"><Database className="w-3 h-3 text-blue-500" /> Pipeline:</span>
                  <span className="font-black text-black uppercase text-[9.5px]">{selectedSections.length} Secs</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-black/55 flex items-center gap-1"><Shield className="w-3 h-3 text-purple-500" /> APIs:</span>
                  <span className="font-black text-black uppercase text-[9.5px]">{setupApis.length} Active</span>
                </div>
              </div>
            </div>

            {/* Deep Insights */}
            <div className="border-4 border-black bg-white p-4 shadow-[4px_4px_0px_0px_#000] space-y-2 md:col-span-2">
              <h4 className="text-[9.5px] font-black uppercase text-black flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-blue-500 stroke-[3px]" />
                THEME VISUAL EXPLANATION
              </h4>
              <p className="text-[10px] font-bold text-neutral-600 leading-relaxed italic">
                "{meta.explanation}"
              </p>
            </div>

            {/* Context DNA AI recommendation */}
            <div className="border-4 border-black bg-zinc-950 text-white p-4 shadow-[4px_4px_0px_0px_#000] space-y-1 md:col-span-2">
              <span className="text-[7.5px] font-mono tracking-widest text-[#FFD93D] uppercase block">AI PLANNER TIP</span>
              <p className="text-[9.5px] font-bold text-white/80 leading-relaxed italic">
                Selected category is aligned with the **{activeStyle.name}** visual framework. The AI planner has calibrated style guidelines.
              </p>
            </div>

          </div>

        </div>

        {/* ---------------------------------------------------- */}
        {/* RIGHT COLUMN: Large Immersive Preview Sandbox (col-span-7, 60%) */}
        {/* ---------------------------------------------------- */}
        <div className="lg:col-span-7 lg:sticky lg:top-24 w-full">
          <ThemePreview style={activeStyle} device={device} setDevice={setDevice} />
        </div>

      </div>

      {/* Navigations footer block */}
      <div className="flex justify-between mt-10 border-t-4 border-black pt-6">
        <button
          onClick={prevStep}
          className="neo-btn text-sm py-2 px-6 font-black uppercase"
        >
          Back
        </button>
        <button
          onClick={nextStep}
          className="neo-btn neo-btn-accent text-sm py-2.5 px-8 font-black uppercase flex items-center gap-2"
        >
          Continue
          <ArrowRight className="w-4 h-4 stroke-[3px]" />
        </button>
      </div>

    </div>
  );
}
