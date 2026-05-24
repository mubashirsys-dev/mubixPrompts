"use client";

import { useBuilderStore } from "@/store/builder-store";
import { designStyles } from "@/lib/design-styles";
import { ThemePreview } from "@/components/builder/theme-preview";
import {
  ArrowRight, ArrowLeft, Check, Sparkles, Upload, Search, Filter,
  Layers, Zap, Gem, Cpu, BookOpen, Trophy, Compass, Layout, Laptop,
  Terminal, Gamepad2, Palette, Info, HelpCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";

// Map unique custom Lucide icons contextually to all 14 themes
const styleIcons: Record<string, any> = {
  "brutalist": Layout,
  "minimal-saas": Layers,
  "swiss-design": Compass,
  "luxury-black": Gem,
  "cyberpunk": Zap,
  "glassmorphism": Compass,
  "editorial": BookOpen,
  "sports-elite": Trophy,
  "ai-futuristic": Cpu,
  "gaming": Gamepad2,
  "anime": Palette,
  "apple-minimal": Laptop,
  "bento-ui": Layout,
  "terminal-hacker": Terminal
};

// Custom layout tags for each theme
const styleMetadata: Record<string, {
  tags: string[];
  bestFor: string;
  complexity: string;
  badge?: string;
  supportsDark: boolean;
}> = {
  "brutalist": { tags: ["High Contrast", "Solid Outlines"], bestFor: "Branded Portfolios & Agencies", complexity: "Easy to Customize", badge: "Highly Popular", supportsDark: false },
  "minimal-saas": { tags: ["Sleek", "Minimalist"], bestFor: "Tech Startups & SaaS Products", complexity: "Production Ready", badge: "AI Recommended", supportsDark: true },
  "swiss-design": { tags: ["Helvetica", "Mathematical"], bestFor: "Design Portfolios & Publications", complexity: "Fastest to Build", supportsDark: false },
  "luxury-black": { tags: ["Premium Gold", "Serif Spacing"], bestFor: "Luxury Goods & High-End Brands", complexity: "Sleek Customization", badge: "Premium Elite", supportsDark: true },
  "cyberpunk": { tags: ["Neon Zap", "Scanlines HUD"], bestFor: "Indie Hackers & Crypto Projects", complexity: "Highly Interactive", supportsDark: true },
  "glassmorphism": { tags: ["Frosted Blur", "Orb Overlay"], bestFor: "Modern SaaS & Creative Portfolios", complexity: "Dynamic Styling", supportsDark: true },
  "editorial": { tags: ["Warm Paper", "News Columns"], bestFor: "Personal Blogs & Writers", complexity: "Fastest to Build", supportsDark: false },
  "sports-elite": { tags: ["Skewed Angles", "Speed Scarlett"], bestFor: "Fitness Brands & Tournaments", complexity: "Aggressive Layouts", supportsDark: true },
  "ai-futuristic": { tags: ["Neural Glow", "Glass Bento"], bestFor: "AI Tools & Cybernetic SaaS", complexity: "Premium Interactive", badge: "Futuristic Choice", supportsDark: true },
  "gaming": { tags: ["HUD widgets", "Cyber Yellow"], bestFor: "Streamers & Game Dashboards", complexity: "Sleek HUD Layouts", supportsDark: true },
  "anime": { tags: ["Comic Panels", "Halftone Dots"], bestFor: "Creatives & Fan Sites", complexity: "Playful Outlines", supportsDark: false },
  "apple-minimal": { tags: ["SF Pro font", "Huge Corners"], bestFor: "Hardware & Premium SaaS Apps", complexity: "Easy to Customize", badge: "Most Modern", supportsDark: true },
  "bento-ui": { tags: ["Cluster Grids", "Rounded Tabs"], bestFor: "Productivity Dashboards & SaaS", complexity: "Clean Density", supportsDark: true },
  "terminal-hacker": { tags: ["Green Mono", "ASCII tags"], bestFor: "CLI Tools & Hacking Portfolios", complexity: "Retro Fast", supportsDark: true }
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
    prevStep
  } = useBuilderStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [themeImage, setThemeImage] = useState(brandBuilder.themeReferenceUrl || "");

  const handleThemeImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setThemeImage(file.name);
    setBrandBuilder({ themeReferenceUrl: file.name });
  };

  const activeStyle = selectedDesignStyle || designStyles[0];

  // List of distinct visual categories for filters bar
  const categories = [
    { id: "all", label: "All Themes" },
    { id: "minimal", label: "Minimalist" },
    { id: "dark", label: "Dark Mode" },
    { id: "futuristic", label: "Futuristic / AI" },
    { id: "brutalist", label: "Brutalist / Anime" },
    { id: "editorial", label: "Editorial" }
  ];

  // Map theme styles contextually to categories
  const filteredStyles = useMemo(() => {
    return designStyles.filter(style => {
      // 1. Search Query check
      const matchesSearch = style.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            style.description.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;

      // 2. Category selection check
      if (selectedFilter === "all") return true;
      if (selectedFilter === "minimal") {
        return ["minimal-saas", "apple-minimal", "swiss-design", "bento-ui"].includes(style.id);
      }
      if (selectedFilter === "dark") {
        return ["luxury-black", "cyberpunk", "ai-futuristic", "gaming", "terminal-hacker"].includes(style.id);
      }
      if (selectedFilter === "futuristic") {
        return ["ai-futuristic", "cyberpunk", "bento-ui"].includes(style.id);
      }
      if (selectedFilter === "brutalist") {
        return ["brutalist", "anime", "terminal-hacker"].includes(style.id);
      }
      if (selectedFilter === "editorial") {
        return ["editorial", "swiss-design"].includes(style.id);
      }
      return true;
    });
  }, [searchQuery, selectedFilter]);

  return (
    <div className="space-y-8 bg-[#FFFDF5] border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_0px_#000] max-w-7xl mx-auto">
      
      {/* Wizard Step Title */}
      <div className="text-center mb-6">
        <span className="inline-block px-3 py-1 bg-[#FFD93D] border-2 border-black font-black uppercase text-xs rotate-[-1deg] mb-4">
          STEP 4: DESIGN DNA MARKETPLACE
        </span>
        <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-black">
          SELECT YOUR VISUAL THEME
        </h2>
        <p className="text-xs sm:text-sm font-bold text-black/70 mt-2 max-w-xl mx-auto">
          Choose an original visual aesthetic layout. Every theme maps custom components, borders, and typography DNA rules natively.
        </p>
      </div>

      {/* Categories Filtering & Search Console */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-4 border-black bg-white p-4 shadow-[4px_4px_0px_0px_#000]">
        
        {/* Category Toggles */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1.5 md:pb-0 scroll-smooth">
          {categories.map((cat) => {
            const isActive = selectedFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedFilter(cat.id)}
                className={`px-3 py-1.5 border-2 border-black text-[10px] font-black uppercase tracking-wider transition-all duration-100 shrink-0 ${
                  isActive ? "bg-[#FFD93D] text-black shadow-[2px_2px_0px_0px_#000]" : "bg-neutral-50 hover:bg-neutral-100"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Live Search Panel */}
        <div className="relative max-w-xs w-full flex items-center border-2 border-black bg-neutral-50 px-3 py-1.5 shadow-[2px_2px_0px_0px_#000]">
          <Search className="w-4 h-4 text-black/55 mr-2 shrink-0" />
          <input
            type="text"
            placeholder="Search visual themes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-xs font-bold w-full focus:outline-none placeholder-black/40 text-black"
          />
        </div>
      </div>

      {/* Main interactive Columns layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar: Premium Visual Themes List Grid */}
        <div className="lg:col-span-5 space-y-3 max-h-[560px] overflow-y-auto pr-3 scrollbar-thin">
          <div className="flex items-center justify-between border-b-2 border-black pb-2">
            <span className="text-[10px] font-black uppercase text-black/50">AVAILABLE SYSTEM DNA ({filteredStyles.length})</span>
            <span className="text-[8.5px] font-black uppercase text-green-600 bg-green-50 px-2 py-0.5 border border-green-600/30">Verified original</span>
          </div>

          <AnimatePresence mode="popLayout">
            {filteredStyles.length > 0 ? (
              filteredStyles.map((style) => {
                const isSelected = activeStyle.id === style.id;
                const IconComponent = styleIcons[style.id] || Layers;
                const meta = styleMetadata[style.id] || { tags: [], bestFor: "Startups", complexity: "Easy", supportsDark: true };

                return (
                  <motion.button
                    layoutId={`theme-card-${style.id}`}
                    key={style.id}
                    onClick={() => setDesignStyle(style)}
                    className={`w-full text-left p-4 border-4 transition-all duration-150 flex items-start gap-4 relative shadow-[4px_4px_0px_0px_#000] active:translate-y-[1px] active:shadow-none hover:shadow-[6px_6px_0px_0px_#000] ${
                      isSelected
                        ? "bg-[#C4B5FD] text-black border-black shadow-none translate-y-[2px]"
                        : "bg-white border-black text-black"
                    }`}
                  >
                    {/* Badge Indicator */}
                    {meta.badge && (
                      <div className="absolute -top-2.5 right-3 rotate-[2deg] z-10">
                        <span className="px-2 py-0.5 bg-[#FF6B6B] text-white border border-black font-black uppercase text-[7.5px] tracking-wide shadow-[1.5px_1.5px_0px_0px_#000]">
                          {meta.badge}
                        </span>
                      </div>
                    )}

                    {/* Left Icon Swatch Container */}
                    <div className="flex flex-col items-center gap-2 shrink-0">
                      <div
                        className="w-12 h-12 border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_#000] relative"
                        style={{ background: style.preview }}
                      >
                        <IconComponent className="w-5 h-5 text-black stroke-[3px] bg-white/70 p-0.5 rounded border border-black/10" />
                      </div>
                      <span className="text-[7.5px] font-black uppercase text-black/50">
                        {meta.supportsDark ? "🌙 Dark/Light" : "☀️ Light Mode"}
                      </span>
                    </div>

                    {/* Middle Details Grid */}
                    <div className="space-y-1.5 overflow-hidden flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-black uppercase text-xs text-black tracking-tight">{style.name}</h3>
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B6B] animate-ping" />}
                      </div>
                      <p className="text-[10px] font-bold text-black/60 leading-normal line-clamp-2">{style.description}</p>
                      
                      {/* Tags & Recommendations */}
                      <div className="flex flex-wrap gap-1 pt-1">
                        <span className="text-[7.5px] font-black uppercase bg-neutral-100 border border-black/10 px-1.5 py-0.5 text-black/60">
                          {meta.bestFor}
                        </span>
                        {meta.tags.slice(0, 2).map(t => (
                          <span key={t} className="text-[7.5px] font-black uppercase bg-[#FFD93D]/10 border border-[#FFD93D]/40 px-1.5 py-0.5 text-black/60">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.button>
                );
              })
            ) : (
              <div className="border-4 border-dashed border-black p-8 text-center bg-white space-y-2">
                <Compass className="w-8 h-8 text-black/40 mx-auto stroke-[2.5px]" />
                <span className="text-xs font-black uppercase text-black/60 block">NO THEMES MATCH SEARCH</span>
                <p className="text-[10px] text-black/40 font-bold">Try searching another styling characteristic keyword.</p>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Sidebar: Dynamic Full Preview Simulator Chrome */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase text-black/50 block">LIVE BROWSER SIMULATOR</span>
            <span className="text-[8.5px] font-black uppercase text-blue-600 bg-blue-50 px-2 py-0.5 border border-blue-600/30">Live Synthesized page</span>
          </div>
          <ThemePreview style={activeStyle} />
          
          {/* Expanded Blueprint Details Panel */}
          <div className="border-4 border-black bg-white p-5 shadow-[4px_4px_0px_0px_#000] space-y-4">
            <div className="flex items-center gap-2 border-b-2 border-black pb-2">
              <Info className="w-4 h-4 text-purple-600 stroke-[3px]" />
              <h4 className="text-xs font-black uppercase text-black">
                {activeStyle.name} System Blueprint Details
              </h4>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-bold">
              <div className="space-y-1 p-2.5 bg-neutral-50 border border-black/10">
                <span className="text-[8.5px] font-black text-black/45 uppercase block">PRIMARY USE CASE</span>
                <span className="text-[10.5px] font-black text-black">{styleMetadata[activeStyle.id]?.bestFor || "Universal Websites"}</span>
              </div>
              <div className="space-y-1 p-2.5 bg-neutral-50 border border-black/10">
                <span className="text-[8.5px] font-black text-black/45 uppercase block">COMPLEXITY</span>
                <span className="text-[10.5px] font-black text-black">{styleMetadata[activeStyle.id]?.complexity || "Highly Modular"}</span>
              </div>
              <div className="space-y-1 p-2.5 bg-neutral-50 border border-black/10 col-span-2">
                <span className="text-[8.5px] font-black text-black/45 uppercase block">TYPOGRAPHY SCALES & SYSTEM</span>
                <span className="text-[10.5px] font-black text-black/75">
                  Heading font family sets to **{activeStyle.typography.heading}**, body paragraphs sets to **{activeStyle.typography.body}**.
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Advanced Custom theme generators prompt overrides */}
      <div className="border-4 border-black p-6 bg-[#FFFDF5] shadow-[4px_4px_0px_0px_#000] space-y-4 mt-6">
        <h4 className="text-md font-black uppercase text-black flex items-center gap-2">
          🎨 CUSTOM THEME & DESIGN DNA OVERRIDE
        </h4>
        <p className="text-xs font-bold text-black/60">
          Paste a custom design layout description (e.g. &ldquo;Apple Minimal with glass cards&rdquo;) or upload a visual UI design mockup image for AI code reference.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Custom prompt text */}
          <div className="space-y-1">
            <label className="text-xs font-black uppercase text-black">CUSTOM THEME PROMPT</label>
            <textarea
              placeholder="e.g., Clean Apple-style aesthetics, thin 1px gray borders, huge whitespace gaps, deep radial blurred card overlays, typography Outfit + Inter, dynamic spring-motion buttons..."
              value={customThemePrompt}
              onChange={(e) => setCustomThemePrompt(e.target.value)}
              className="w-full border-4 border-black p-3 font-bold text-xs bg-white focus:outline-none min-h-[110px] resize-none shadow-[2px_2px_0px_0px_#000]"
            />
          </div>

          {/* Reference Image Uploader */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-black block">THEME REFERENCE IMAGE</label>
            <div className="relative border-4 border-dashed border-black bg-white p-6 text-center flex flex-col items-center justify-center gap-2 shadow-[2px_2px_0px_0px_#000] min-h-[110px]">
              <Upload className="w-6 h-6 text-black/60 stroke-[2.5px]" />
              <span className="text-xs font-black uppercase">
                {themeImage ? `✅ ${themeImage}` : "Drag / Drop Reference UI Layout..."}
              </span>
              <label className="cursor-pointer bg-[#C4B5FD] border-2 border-black px-3 py-1 text-[10px] font-black uppercase shadow-[2px_2px_0px_0px_#000] active:translate-y-[1px] active:shadow-none transition-all">
                Select File
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThemeImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

        </div>
      </div>

      {/* Navigations */}
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
