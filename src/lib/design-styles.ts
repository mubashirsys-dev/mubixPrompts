import { DesignStyle } from "@/types/builder";

export const designStyles: DesignStyle[] = [
  {
    id: "brutalist",
    name: "Neo Brutalism",
    description: "Vibrant high-contrast solid offsets, flat heavy outlines, and retro pop badges.",
    colors: { primary: "#000000", secondary: "#FFD93D", accent: "#FF6B6B", background: "#FFFDF5", text: "#000000" },
    typography: { heading: "Space Grotesk", body: "Space Grotesk" },
    characteristics: ["Thick solid borders", "Solid offset shadows", "Cream canvas bg", "Halftone dots"],
    preview: "linear-gradient(135deg, #FFFDF5 0%, #FFD93D 100%)",
    designDna: {
      typography: { heading: "Space Grotesk font-black UPPERCASE tracking-tighter leading-none text-shadow-solid", body: "Space Grotesk font-bold tracking-tight text-lg" },
      spacing: { padding: "p-6 sm:p-8", gap: "gap-6", sectionPadding: "py-16 md:py-24" },
      animations: { duration: "duration-100 ease-linear", spin: "animate-spin-slow" },
      buttons: { style: "neo-btn border-4 border-black font-black uppercase text-xs tracking-wide bg-white shadow-[4px_4px_0px_0px_#000]", active: "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none" },
      cards: { style: "neo-card bg-white border-4 border-black shadow-[6px_6px_0px_0px_#000]" },
      hoverEffects: { card: "hover:-translate-y-1.5 hover:shadow-[12px_12px_0px_0px_#000] duration-150 transition-all" },
      pageLayouts: { default: "Rigid modular grids, asymmetrical 60/40 layouts, diagonal borders" }
    }
  },
  {
    id: "minimal-saas",
    name: "Minimal SaaS",
    description: "Clean, professional, and elegant minimalism inspired by Vercel and Linear.",
    colors: { primary: "#000000", secondary: "#171717", accent: "#3b82f6", background: "#ffffff", text: "#0a0a0a" },
    typography: { heading: "Inter", body: "Inter" },
    characteristics: ["Clean whitespace", "1px border grids", "Sleek micro-shadows", "Inter scales"],
    preview: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
    designDna: {
      typography: { heading: "Inter font-black tracking-tight text-slate-900", body: "Inter font-medium text-slate-600 text-sm" },
      spacing: { padding: "p-6", gap: "gap-4", sectionPadding: "py-12 md:py-20" },
      animations: { duration: "duration-200 ease-in-out" },
      buttons: { style: "rounded-md border border-neutral-200 bg-white px-4 py-2 hover:bg-neutral-50 font-bold text-xs" },
      cards: { style: "bg-white border border-neutral-100 rounded-xl shadow-sm" },
      hoverEffects: { card: "hover:shadow-md hover:border-neutral-200 transition-all duration-200" },
      pageLayouts: { default: "Symmetric content blocks with expansive whitespace boundaries" }
    }
  },
  {
    id: "swiss-design",
    name: "Swiss Design",
    description: "Rigid mathematical layout alignments, heavy Helvetica columns, and solid red elements.",
    colors: { primary: "#dc2626", secondary: "#1e293b", accent: "#f59e0b", background: "#f8fafc", text: "#0f172a" },
    typography: { heading: "Helvetica Neue", body: "Helvetica Neue" },
    characteristics: ["Asymmetric typography", "Solid color grids", "Zero card shadows", "Mathematical precision"],
    preview: "linear-gradient(135deg, #f8fafc 0%, #cbd5e1 100%)",
    designDna: {
      typography: { heading: "Helvetica font-black uppercase tracking-tight text-black leading-none", body: "Helvetica font-medium text-neutral-700 text-[13px]" },
      spacing: { padding: "p-8", gap: "gap-8", sectionPadding: "py-20" },
      animations: { duration: "duration-150 ease-out" },
      buttons: { style: "bg-black text-white rounded-none border border-black px-6 py-2.5 font-bold uppercase text-[10px]" },
      cards: { style: "border border-neutral-200 bg-white rounded-none shadow-none" },
      hoverEffects: { card: "hover:bg-neutral-50 transition-colors" },
      pageLayouts: { default: "Rigid column frameworks, typographic headings prioritizing hierarchy" }
    }
  },
  {
    id: "luxury-black",
    name: "Luxury Black",
    description: "Premium gold-rimmed borders, deep charcoal backdrops, and classical serif displays.",
    colors: { primary: "#d4af37", secondary: "#b8860b", accent: "#ffd700", background: "#0a0a0a", text: "#f5f5f5" },
    typography: { heading: "Playfair Display", body: "Inter" },
    characteristics: ["Gold border lines", "Serif displays", "Deep dark canvas", "Premium elegance"],
    preview: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
    designDna: {
      typography: { heading: "Playfair Display font-black tracking-widest text-[#ffd700] font-serif", body: "Inter font-light tracking-wide text-white/70 text-xs" },
      spacing: { padding: "p-8", gap: "gap-6", sectionPadding: "py-20 md:py-28" },
      animations: { duration: "duration-500 ease-out" },
      buttons: { style: "border border-[#ffd700] bg-transparent text-[#ffd700] tracking-widest font-black uppercase text-[9px] px-5 py-2" },
      cards: { style: "border border-yellow-600/10 bg-zinc-950 rounded-none shadow-2xl" },
      hoverEffects: { card: "hover:border-[#ffd700]/50 hover:shadow-[#ffd700]/5 transition-all duration-500" },
      pageLayouts: { default: "Generous black negative spaces, clean centered typographic cards" }
    }
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    description: "Electric pink glows, toxic neon borders, and raw command console terminals.",
    colors: { primary: "#ff00ff", secondary: "#00ffff", accent: "#ff6b6b", background: "#0a0a0f", text: "#e0e0e0" },
    typography: { heading: "Orbitron", body: "Rajdhani" },
    characteristics: ["Neon glow borders", "Cyber glitch accents", "Command terminal blocks", "Edgy angles"],
    preview: "linear-gradient(135deg, #0a0a0f 0%, #1a0a2e 100%)",
    designDna: {
      typography: { heading: "Orbitron font-black uppercase text-[#ff00ff] neon-glow font-mono", body: "Rajdhani font-bold text-white/80 text-sm" },
      spacing: { padding: "p-6", gap: "gap-4", sectionPadding: "py-16" },
      animations: { duration: "duration-100 ease-linear" },
      buttons: { style: "border border-[#ff00ff] bg-black text-[#ff00ff] font-mono text-[9px] tracking-widest shadow-[2px_2px_0px_0px_#00ffff]" },
      cards: { style: "bg-black border border-[#00ffff]/40 rounded-none" },
      hoverEffects: { card: "hover:border-[#ff00ff] hover:text-[#ff00ff] transition-all" },
      pageLayouts: { default: "Asymmetrical command widgets, raw console grids with code-brackets" }
    }
  },
  {
    id: "glassmorphism",
    name: "Glassmorphism",
    description: "Frosted glass card overlays, semi-transparent layers, and fluid mesh backdrops.",
    colors: { primary: "#6366f1", secondary: "#8b5cf6", accent: "#a78bfa", background: "#0f172a", text: "#f1f5f9" },
    typography: { heading: "Inter", body: "Inter" },
    characteristics: ["Frosted blur overlays", "Soft glass borders", "Backdrop glass blurs", "Fluid backgrounds"],
    preview: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    designDna: {
      typography: { heading: "Inter font-black tracking-tight text-white", body: "Inter font-medium text-white/60 text-xs" },
      spacing: { padding: "p-6", gap: "gap-6", sectionPadding: "py-16" },
      animations: { duration: "duration-300 ease-out" },
      buttons: { style: "bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full px-5 py-2 font-bold text-[10px]" },
      cards: { style: "bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl" },
      hoverEffects: { card: "hover:bg-white/10 hover:scale-[1.01] transition-transform duration-300" },
      pageLayouts: { default: "Overlapping floating panels on top of deep colorful blur spheres" }
    }
  },
  {
    id: "editorial",
    name: "Editorial",
    description: "Classical newspaper vertical borders, serif headlines, and warm paper card grids.",
    colors: { primary: "#111111", secondary: "#222222", accent: "#7c2d12", background: "#fcfaf2", text: "#1c1917" },
    typography: { heading: "Newsreader", body: "Inter" },
    characteristics: ["Newspaper columns", "Vertical lines", "Warm paper background", "Serif quotes"],
    preview: "linear-gradient(135deg, #fcfaf2 0%, #f5f2e5 100%)",
    designDna: {
      typography: { heading: "Newsreader font-black italic tracking-tight text-neutral-900 font-serif text-3xl", body: "Inter font-medium text-neutral-700 text-xs leading-relaxed" },
      spacing: { padding: "p-8", gap: "gap-8", sectionPadding: "py-20" },
      animations: { duration: "duration-300 ease-out" },
      buttons: { style: "border-b-2 border-black bg-transparent text-black px-1 py-1 font-bold text-[10px] tracking-wide" },
      cards: { style: "bg-[#f5f2e5] border-y border-black/10 rounded-none shadow-none" },
      hoverEffects: { card: "hover:bg-[#efece0] transition-colors" },
      pageLayouts: { default: "Split magazine columns, centered headings separated by thin lines" }
    }
  },
  {
    id: "sports-elite",
    name: "Sports Elite",
    description: "Skewed layout banners, Bebas Neue headers, and scarlet dynamic actions buttons.",
    colors: { primary: "#ef4444", secondary: "#f97316", accent: "#eab308", background: "#0f0f0f", text: "#fafafa" },
    typography: { heading: "Bebas Neue", body: "Inter" },
    characteristics: ["Aggressive skew angles", "Bold dynamic scarlet", "Dark sports overlay", "Extreme grids"],
    preview: "linear-gradient(135deg, #0f0f0f 0%, #2a0a0a 100%)",
    designDna: {
      typography: { heading: "Bebas Neue font-black tracking-wider text-white text-4xl leading-none italic", body: "Inter font-black text-white/90 text-[11px] uppercase tracking-wide" },
      spacing: { padding: "p-6", gap: "gap-6", sectionPadding: "py-16 md:py-24" },
      animations: { duration: "duration-200 ease-out" },
      buttons: { style: "bg-red-600 text-white rounded-none italic uppercase font-black text-[10px] tracking-widest px-6 py-2.5" },
      cards: { style: "bg-zinc-950 border-l-4 border-red-600 rounded-none" },
      hoverEffects: { card: "hover:scale-[1.02] hover:bg-zinc-900 transition-all duration-200" },
      pageLayouts: { default: "Asymmetrical skewed card containers, dramatic left-aligned titles" }
    }
  },
  {
    id: "ai-futuristic",
    name: "AI Futuristic",
    description: "Deep radial blurred overlays, pulsating spring badges, and glowing cyber grids.",
    colors: { primary: "#8b5cf6", secondary: "#06b6d4", accent: "#3b82f6", background: "#0a0a1a", text: "#e2e8f0" },
    typography: { heading: "Orbitron", body: "Inter" },
    characteristics: ["Glowing cyber lines", "Pulsating neon badges", "Deep glass blurs", "Orbital paths"],
    preview: "linear-gradient(135deg, #0a0a1a 0%, #1a1a3e 100%)",
    designDna: {
      typography: { heading: "Orbitron font-black text-white tracking-widest", body: "Inter font-medium text-white/60 text-xs" },
      spacing: { padding: "p-8", gap: "gap-6", sectionPadding: "py-20" },
      animations: { duration: "duration-300 ease-out", pulse: "animate-pulse" },
      buttons: { style: "bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-xl shadow-lg shadow-purple-500/20 px-5 py-2.5 text-[9px] font-black uppercase" },
      cards: { style: "bg-black/60 border border-purple-500/20 rounded-2xl shadow-xl backdrop-blur-md" },
      hoverEffects: { card: "hover:border-cyan-400 hover:shadow-cyan-400/10 hover:scale-[1.01] transition-all" },
      pageLayouts: { default: "Cyber bento grid clusters, floating stats cards" }
    }
  },
  {
    id: "gaming",
    name: "Gaming Grid",
    description: "Aggressive tech angles, status bar overlays, and neon yellow HUD widget slots.",
    colors: { primary: "#eab308", secondary: "#18181b", accent: "#ef4444", background: "#09090b", text: "#f4f4f5" },
    typography: { heading: "Orbitron", body: "Inter" },
    characteristics: ["HUD grid slots", "Cyber neon yellow", "Status bar overlays", "Aggressive lines"],
    preview: "linear-gradient(135deg, #09090b 0%, #27272a 100%)",
    designDna: {
      typography: { heading: "Orbitron font-black text-[#eab308] tracking-widest font-mono uppercase text-xl", body: "Inter font-bold text-white/80 text-[10px]" },
      spacing: { padding: "p-5", gap: "gap-4", sectionPadding: "py-16" },
      animations: { duration: "duration-100 ease-in-out" },
      buttons: { style: "bg-[#eab308] text-black border border-black rounded-none uppercase font-black tracking-widest text-[9px] px-4 py-2" },
      cards: { style: "bg-zinc-900 border border-zinc-700/50 rounded-none shadow-[3px_3px_0px_0px_#eab308]" },
      hoverEffects: { card: "hover:bg-zinc-800 hover:shadow-[5px_5px_0px_0px_#eab308] transition-all" },
      pageLayouts: { default: "Compact dashboard grid widgets with status bar stats HUD overlays" }
    }
  },
  {
    id: "anime",
    name: "Manga Anime",
    description: "Comic halftone background dots, hand-drawn thick line panels, and custom action stickers.",
    colors: { primary: "#000000", secondary: "#ffffff", accent: "#fb7185", background: "#fcf6f0", text: "#0f0f0f" },
    typography: { heading: "Space Grotesk", body: "Inter" },
    characteristics: ["Comic panels", "Screentone dots", "Hand-drawn borders", "Pop stickers"],
    preview: "linear-gradient(135deg, #fcf6f0 0%, #fb7185 100%)",
    designDna: {
      typography: { heading: "Space Grotesk font-black uppercase tracking-tight text-black text-2xl rotate-[-1.5deg] bg-white border-2 border-black px-2 inline-block", body: "Inter font-bold text-neutral-800 text-xs" },
      spacing: { padding: "p-6", gap: "gap-6", sectionPadding: "py-16" },
      animations: { duration: "duration-200" },
      buttons: { style: "bg-[#fb7185] text-white border-4 border-black font-black uppercase text-[10px] shadow-[3px_3px_0px_0px_#000]" },
      cards: { style: "bg-white border-4 border-black shadow-[6px_6px_0px_0px_#000]" },
      hoverEffects: { card: "hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0px_0px_#000] transition-all" },
      pageLayouts: { default: "Staggered panel layouts resembling manga sheets, stickers overlaying borders" }
    }
  },
  {
    id: "apple-minimal",
    name: "Apple Minimal",
    description: "SF-Pro styles, large fluid cards, deep radial shadows, and absolute whitespace borders.",
    colors: { primary: "#1d1d1f", secondary: "#86868b", accent: "#0066cc", background: "#f5f5f7", text: "#1d1d1f" },
    typography: { heading: "SF Pro Display", body: "SF Pro Text" },
    characteristics: ["Huge corner radius", "SF Pro typographies", "Radial soft shadows", "Generous spaces"],
    preview: "linear-gradient(135deg, #f5f5f7 0%, #e8e8ed 100%)",
    designDna: {
      typography: { heading: "SF Pro font-black tracking-tight text-[#1d1d1f] text-2xl", body: "SF Pro font-medium text-[#86868b] text-[11px]" },
      spacing: { padding: "p-8", gap: "gap-8", sectionPadding: "py-24" },
      animations: { duration: "duration-400 ease-out" },
      buttons: { style: "bg-[#0066cc] text-white rounded-full px-5 py-2 font-bold text-[10px] hover:bg-[#0077ed] transition-all" },
      cards: { style: "bg-white rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-neutral-100" },
      hoverEffects: { card: "hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:scale-[1.01] transition-all" },
      pageLayouts: { default: "Perfect symmetric alignments, massive hero segments with centralized text" }
    }
  },
  {
    id: "bento-ui",
    name: "Bento UI",
    description: "Balanced card cluster layouts, sleek 1px border lines, and micro-rounded dashboard tabs.",
    colors: { primary: "#18181b", secondary: "#27272a", accent: "#6366f1", background: "#fafafa", text: "#09090b" },
    typography: { heading: "Inter", body: "Inter" },
    characteristics: ["Bento clusters", "1px border lines", "Micro-rounded tabs", "High density"],
    preview: "linear-gradient(135deg, #fafafa 0%, #e4e4e7 100%)",
    designDna: {
      typography: { heading: "Inter font-black tracking-tight text-neutral-900 text-lg", body: "Inter font-medium text-neutral-500 text-[10px]" },
      spacing: { padding: "p-4 sm:p-5", gap: "gap-4", sectionPadding: "py-16" },
      animations: { duration: "duration-200" },
      buttons: { style: "bg-zinc-900 text-white rounded-xl font-bold text-[9px] px-4 py-2 hover:bg-black transition-all" },
      cards: { style: "bg-white border border-neutral-200 rounded-2xl shadow-sm" },
      hoverEffects: { card: "hover:shadow-md hover:border-neutral-300 transition-all duration-200" },
      pageLayouts: { default: "Cluster grids arranging widgets side-by-side inside asymmetrical boxes" }
    }
  },
  {
    id: "terminal-hacker",
    name: "Terminal Hacker",
    description: "Luminous green font lines, raw console boxes, and ASCII header border labels.",
    colors: { primary: "#22c55e", secondary: "#15803d", accent: "#16a34a", background: "#050505", text: "#4ade80" },
    typography: { heading: "Courier New", body: "Courier New" },
    characteristics: ["Green console lines", "ASCII border tags", "Mono font scales", "Retro computer feel"],
    preview: "linear-gradient(135deg, #050505 0%, #0c2010 100%)",
    designDna: {
      typography: { heading: "Courier New font-black text-[#22c55e] font-mono tracking-widest text-lg uppercase", body: "Courier New font-bold text-[#4ade80] text-[10px] leading-relaxed" },
      spacing: { padding: "p-5", gap: "gap-4", sectionPadding: "py-12" },
      animations: { duration: "duration-100 ease-linear" },
      buttons: { style: "border border-[#22c55e] bg-black text-[#22c55e] font-mono text-[9px] px-3 py-1.5 uppercase hover:bg-[#22c55e] hover:text-black transition-all" },
      cards: { style: "bg-black border border-[#22c55e]/30 rounded-none p-4" },
      hoverEffects: { card: "hover:border-[#22c55e] hover:bg-[#22c55e]/5 transition-colors" },
      pageLayouts: { default: "Single column terminal sheets separated by visual CLI markers" }
    }
  }
];
