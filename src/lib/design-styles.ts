import { DesignStyle } from "@/types/builder";

// 1. Portfolio Themes (Updated to exact requested names & IDs)
export const portfolioThemes: DesignStyle[] = [
  {
    id: "editorial-portfolio",
    name: "Editorial Portfolio",
    description: "Stark black & white editorial elegance, extreme serif headlines, zero borders radii, and clean geometric lines.",
    colors: { primary: "#000000", secondary: "#525252", accent: "#000000", background: "#FFFFFF", text: "#000000" },
    typography: { heading: "Playfair Display", body: "Source Serif 4" },
    characteristics: ["Pure black & white", "Playfair serif", "0px border radius", "Editorial grids"],
    preview: "linear-gradient(135deg, #FFFFFF 0%, #000000 100%)",
    designDna: {
      typography: { heading: "font-serif font-black uppercase tracking-tighter leading-none text-black", body: "font-serif font-medium text-neutral-800 text-sm leading-relaxed" },
      spacing: { padding: "p-8", gap: "gap-8", sectionPadding: "py-20" },
      animations: { duration: "duration-300 ease-out" },
      buttons: { style: "border-2 border-black bg-black text-white hover:bg-white hover:text-black font-mono text-[10px] tracking-widest px-6 py-2.5 rounded-none transition-all", active: "active:bg-neutral-100" },
      cards: { style: "border border-black bg-white rounded-none shadow-none" },
      hoverEffects: { card: "hover:bg-neutral-50 transition-colors" },
      pageLayouts: { default: "Rigid column frameworks, typographic headings prioritizing editorial hierarchy" }
    }
  },
  {
    id: "brutalist-portfolio",
    name: "Brutalist Portfolio",
    description: "High-energy neobrutalist design with thick rules, vibrant yellow/orange backdrops, and heavy offset shadows.",
    colors: { primary: "#FF6B6B", secondary: "#FFD93D", accent: "#FFD93D", background: "#FFFDF5", text: "#000000" },
    typography: { heading: "Outfit", body: "Space Grotesk" },
    characteristics: ["Heavy black borders", "Offset shadows", "Neon yellow details", "Bold headers"],
    preview: "linear-gradient(135deg, #FFD93D 0%, #FF6B6B 100%)",
    designDna: {
      typography: { heading: "font-sans font-black uppercase tracking-tight leading-none text-black", body: "font-sans font-bold text-neutral-800 text-sm" },
      spacing: { padding: "p-6 sm:p-8", gap: "gap-6", sectionPadding: "py-16 md:py-24" },
      animations: { duration: "duration-100 ease-linear" },
      buttons: { style: "border-4 border-black bg-[#FFD93D] text-black font-black uppercase text-xs tracking-wide shadow-[4px_4px_0px_0px_#000] hover:bg-yellow-400 transition-all rounded-none", active: "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none" },
      cards: { style: "bg-white border-4 border-black shadow-[6px_6px_0px_0px_#000] rounded-none" },
      hoverEffects: { card: "hover:-translate-y-1.5 hover:shadow-[12px_12px_0px_0px_#000] duration-150 transition-all" },
      pageLayouts: { default: "Asymmetrical 60/40 layouts, diagonal thick borders, geometric shape blocks" }
    }
  },
  {
    id: "developer-portfolio",
    name: "Developer Portfolio",
    description: "Dark slate developer portfolio with sharp neon teal/lime green elements and high information density.",
    colors: { primary: "#0EA5E9", secondary: "#10B981", accent: "#0EA5E9", background: "#0B0F19", text: "#F3F4F6" },
    typography: { heading: "JetBrains Mono", body: "Inter" },
    characteristics: ["Slate background", "Teal code accents", "Monospace headings", "Ultra-fine borders"],
    preview: "linear-gradient(135deg, #0B0F19 0%, #0EA5E9 100%)",
    designDna: {
      typography: { heading: "font-mono font-bold tracking-tight text-white", body: "font-sans font-medium text-neutral-450 text-xs leading-relaxed" },
      spacing: { padding: "p-6", gap: "gap-4", sectionPadding: "py-16" },
      animations: { duration: "duration-200 ease-out" },
      buttons: { style: "border border-[#0EA5E9] bg-[#0EA5E9]/10 text-white font-mono text-[9px] tracking-widest hover:bg-[#0EA5E9] transition-all rounded-md px-5 py-2", active: "active:scale-95" },
      cards: { style: "bg-[#111827]/80 border border-neutral-800 rounded-lg shadow-xl" },
      hoverEffects: { card: "hover:border-[#0EA5E9] transition-all duration-200" },
      pageLayouts: { default: "Command-line interfaces boxes, structured logs timelines, data grids" }
    }
  },
  {
    id: "luxury-designer",
    name: "Luxury Designer",
    description: "Elegant off-white and champagne cream theme with golden-brass accents, serif typography, and premium spacious paddings.",
    colors: { primary: "#D4AF37", secondary: "#1A1A1A", accent: "#D4AF37", background: "#FAF9F6", text: "#1A1A1A" },
    typography: { heading: "Cormorant Garamond", body: "Inter" },
    characteristics: ["Champagne Gold", "Fine borders", "Huge typography spacing", "Luxury styling"],
    preview: "linear-gradient(135deg, #FAF9F6 0%, #D4AF37 100%)",
    designDna: {
      typography: { heading: "font-serif italic font-normal tracking-wide text-neutral-900", body: "font-sans font-normal text-neutral-600 text-xs tracking-wide leading-relaxed" },
      spacing: { padding: "p-10", gap: "gap-10", sectionPadding: "py-24" },
      animations: { duration: "duration-500 ease-in-out" },
      buttons: { style: "border border-neutral-300 bg-transparent text-neutral-900 font-sans text-[10px] tracking-widest px-8 py-3 hover:bg-neutral-900 hover:text-white transition-all rounded-none uppercase", active: "active:opacity-85" },
      cards: { style: "bg-[#FAF9F6] border border-neutral-200/50 rounded-none shadow-none" },
      hoverEffects: { card: "hover:bg-neutral-50/50 transition-all duration-300" },
      pageLayouts: { default: "Centered single-column editorial, generous margins, spacious headers" }
    }
  },
  {
    id: "creative-studio",
    name: "Creative Studio",
    description: "Vibrant and trendy design with smooth glassmorphism layers, soft violet/pink gradients, and modern circular accents.",
    colors: { primary: "#8B5CF6", secondary: "#EC4899", accent: "#3B82F6", background: "#FDFEFE", text: "#1F2937" },
    typography: { heading: "Syne", body: "Inter" },
    characteristics: ["Violet gradients", "Glass card structures", "Syne headings font", "Smooth micro-hover"],
    preview: "linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)",
    designDna: {
      typography: { heading: "font-sans font-extrabold tracking-tight text-neutral-950", body: "font-sans font-medium text-neutral-600 text-sm leading-relaxed" },
      spacing: { padding: "p-6 sm:p-8", gap: "gap-6", sectionPadding: "py-16 md:py-20" },
      animations: { duration: "duration-300 ease-out" },
      buttons: { style: "rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white hover:opacity-90 transition-all font-bold text-xs px-6 py-2.5 shadow-sm shadow-purple-500/10", active: "active:scale-95" },
      cards: { style: "bg-white/60 border border-neutral-100 rounded-2xl shadow-sm backdrop-blur-sm" },
      hoverEffects: { card: "hover:shadow-lg hover:border-purple-200 transition-all duration-300" },
      pageLayouts: { default: "Fluid bento grid boxes, asymmetrical column shifts, organic backgrounds" }
    }
  }
];

// 2. Resume Builder Themes
export const resumeThemes: DesignStyle[] = [
  {
    id: "corporate-resume",
    name: "Corporate Resume",
    description: "Classic corporate navy design with clear structure, professional Inter typography, and elegant spacing.",
    colors: { primary: "#1E3A8A", secondary: "#475569", accent: "#1E3A8A", background: "#FFFFFF", text: "#1E293B" },
    typography: { heading: "Inter", body: "Inter" },
    characteristics: ["Navy branding", "Clean grids", "Highly readable", "Professional borders"],
    preview: "linear-gradient(135deg, #FFFFFF 0%, #1E3A8A 100%)",
    designDna: {
      typography: { heading: "font-sans font-bold tracking-tight text-[#1E3A8A]", body: "font-sans text-neutral-600 text-xs" },
      spacing: { padding: "p-4", gap: "gap-4", sectionPadding: "py-8" },
      animations: { duration: "duration-200" },
      buttons: { style: "rounded bg-[#1E3A8A] text-white px-4 py-2 text-xs font-bold", active: "active:scale-95" },
      cards: { style: "bg-white border border-neutral-200 rounded p-4" },
      hoverEffects: { card: "hover:border-neutral-300" },
      pageLayouts: { default: "Grid CV layout" }
    }
  },
  {
    id: "ats-optimized",
    name: "ATS Optimized",
    description: "Stark black & white high-density text layout designed for maximum ATS system parseability.",
    colors: { primary: "#000000", secondary: "#404040", accent: "#000000", background: "#FFFFFF", text: "#000000" },
    typography: { heading: "Georgia", body: "Inter" },
    characteristics: ["Stark B&W", "No graphics", "Georgia headlines", "Standard structures"],
    preview: "linear-gradient(135deg, #FFFFFF 0%, #000000 100%)",
    designDna: {
      typography: { heading: "font-serif font-bold text-black", body: "font-sans text-black text-xs leading-normal" },
      spacing: { padding: "p-3", gap: "gap-3", sectionPadding: "py-6" },
      animations: { duration: "duration-75" },
      buttons: { style: "border border-black bg-white text-black px-4 py-2 text-xs", active: "active:bg-neutral-100" },
      cards: { style: "bg-white p-3 border-b border-dashed border-neutral-300" },
      hoverEffects: { card: "hover:bg-neutral-50" },
      pageLayouts: { default: "Linear single-column CV" }
    }
  },
  {
    id: "executive-cv",
    name: "Executive CV",
    description: "Ornate traditional layout using gold and charcoal tones, elegant Cormorant serif headings, and generous margins.",
    colors: { primary: "#B45309", secondary: "#1E293B", accent: "#B45309", background: "#FAF9F5", text: "#1E293B" },
    typography: { heading: "Cormorant Garamond", body: "Inter" },
    characteristics: ["Warm ivory bg", "Gold rules decoration", "Serif headers", "Ornate details"],
    preview: "linear-gradient(135deg, #FAF9F5 0%, #B45309 100%)",
    designDna: {
      typography: { heading: "font-serif italic font-normal text-neutral-900", body: "font-sans text-neutral-700 text-xs leading-relaxed" },
      spacing: { padding: "p-6", gap: "gap-6", sectionPadding: "py-12" },
      animations: { duration: "duration-300" },
      buttons: { style: "border border-neutral-300 bg-transparent text-neutral-900 px-6 py-2.5 text-xs font-serif uppercase", active: "active:bg-neutral-100" },
      cards: { style: "bg-transparent border-l-2 border-[#B45309] pl-4" },
      hoverEffects: { card: "hover:bg-neutral-50" },
      pageLayouts: { default: "Ornate CV layout" }
    }
  },
  {
    id: "modern-professional",
    name: "Modern Professional",
    description: "Sleek contemporary resume with violet accents, clean rounded grids, and modern Outfit typography.",
    colors: { primary: "#7C3AED", secondary: "#4B5563", accent: "#7C3AED", background: "#FDFDFD", text: "#1F2937" },
    typography: { heading: "Outfit", body: "Inter" },
    characteristics: ["Violet branding", "Outfit headings", "Rounded boundaries", "Sleek look"],
    preview: "linear-gradient(135deg, #FDFDFD 0%, #7C3AED 100%)",
    designDna: {
      typography: { heading: "font-sans font-extrabold text-[#7C3AED]", body: "font-sans text-neutral-600 text-xs" },
      spacing: { padding: "p-5", gap: "gap-5", sectionPadding: "py-10" },
      animations: { duration: "duration-300" },
      buttons: { style: "rounded-full bg-[#7C3AED] text-white px-5 py-2 text-xs font-bold", active: "active:scale-95" },
      cards: { style: "bg-white border border-neutral-100 rounded-xl shadow-sm" },
      hoverEffects: { card: "hover:shadow-md transition-shadow" },
      pageLayouts: { default: "Contemporary CV design" }
    }
  }
];

// 3. Agency Themes
export const agencyThemes: DesignStyle[] = [
  {
    id: "creative-agency",
    name: "Creative Agency",
    description: "Artistic, vibrant agency canvas with bold overlapping boxes, violet gradients, and fluid glassmorphic cards.",
    colors: { primary: "#8B5CF6", secondary: "#EC4899", accent: "#3B82F6", background: "#FFFDF9", text: "#1E1B4B" },
    typography: { heading: "Syne", body: "Inter" },
    characteristics: ["Syne Font", "Pastel purples", "Overlapping boundaries", "Bubble grids"],
    preview: "linear-gradient(135deg, #FFFDF9 0%, #8B5CF6 100%)",
    designDna: {
      typography: { heading: "font-sans font-black tracking-tight text-[#1E1B4B]", body: "font-sans text-slate-700 text-xs leading-relaxed" },
      spacing: { padding: "p-6", gap: "gap-6", sectionPadding: "py-16 md:py-24" },
      animations: { duration: "duration-300" },
      buttons: { style: "rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white px-6 py-2.5 text-xs font-bold", active: "active:scale-95" },
      cards: { style: "bg-white/70 border border-purple-100 rounded-2xl shadow-sm" },
      hoverEffects: { card: "hover:shadow-lg hover:border-purple-200 transition-all" },
      pageLayouts: { default: "Bento style grid blocks" }
    }
  },
  {
    id: "digital-marketing",
    name: "Digital Marketing",
    description: "Conversion-optimized technical template, royal blue highlights, performance telemetry, and professional grids.",
    colors: { primary: "#2563EB", secondary: "#475569", accent: "#2563EB", background: "#FFFFFF", text: "#0F172A" },
    typography: { heading: "Outfit", body: "Inter" },
    characteristics: ["Royal blue highlights", "High conversion", "Clean metrics focus", "Professional slate borders"],
    preview: "linear-gradient(135deg, #FFFFFF 0%, #2563EB 100%)",
    designDna: {
      typography: { heading: "font-sans font-extrabold tracking-tight text-[#0F172A]", body: "font-sans text-slate-600 text-xs leading-relaxed" },
      spacing: { padding: "p-6", gap: "gap-6", sectionPadding: "py-16 md:py-20" },
      animations: { duration: "duration-200" },
      buttons: { style: "rounded-lg bg-[#2563EB] text-white px-5 py-2.5 text-xs font-bold shadow-sm", active: "active:scale-98" },
      cards: { style: "bg-white border border-slate-100 rounded-xl shadow-xs" },
      hoverEffects: { card: "hover:shadow-md hover:border-blue-200 transition-all" },
      pageLayouts: { default: "Balanced content blocks" }
    }
  },
  {
    id: "premium-studio",
    name: "Premium Studio",
    description: "High-end luxury design, luxurious dark charcoal backdrop, elegant Cormorant serif headings, and golden thin details.",
    colors: { primary: "#C5A880", secondary: "#FAF9F6", accent: "#C5A880", background: "#121212", text: "#FAF9F6" },
    typography: { heading: "Cormorant Garamond", body: "Inter" },
    characteristics: ["Luxury dark mode", "Gold accents", "Serif headers", "Spacious layouts"],
    preview: "linear-gradient(135deg, #121212 0%, #C5A880 100%)",
    designDna: {
      typography: { heading: "font-serif italic font-normal tracking-wide text-[#C5A880]", body: "font-sans text-neutral-300 text-xs leading-relaxed" },
      spacing: { padding: "p-8", gap: "gap-8", sectionPadding: "py-24" },
      animations: { duration: "duration-300" },
      buttons: { style: "border border-[#C5A880] text-[#C5A880] px-8 py-3 text-[10px] font-sans tracking-widest uppercase hover:bg-[#C5A880] hover:text-black transition-all", active: "active:opacity-90" },
      cards: { style: "bg-[#181818] border border-neutral-800 rounded-none" },
      hoverEffects: { card: "hover:border-[#C5A880]" },
      pageLayouts: { default: "Symmetric grids" }
    }
  },
  {
    id: "startup-agency",
    name: "Startup Agency",
    description: "Sleek obsidian tech look with glowing purple/blue card highlights and razor-sharp border outlines.",
    colors: { primary: "#6366F1", secondary: "#9CA3AF", accent: "#6366F1", background: "#080710", text: "#F3F4F6" },
    typography: { heading: "Space Grotesk", body: "Inter" },
    characteristics: ["Obsidian background", "Glowing rules", "Space Grotesk headlines", "Tech outline blocks"],
    preview: "linear-gradient(135deg, #080710 0%, #6366F1 100%)",
    designDna: {
      typography: { heading: "font-sans font-bold tracking-tight text-white", body: "font-sans text-neutral-400 text-xs leading-relaxed" },
      spacing: { padding: "p-6", gap: "gap-5", sectionPadding: "py-16 md:py-24" },
      animations: { duration: "duration-250" },
      buttons: { style: "border border-[#6366F1] bg-[#6366F1]/10 text-white font-mono text-[9px] tracking-wider px-5 py-2 hover:bg-[#6366F1] transition-all rounded-md", active: "active:scale-95" },
      cards: { style: "bg-gray-900/40 border border-neutral-800 rounded-xl backdrop-blur-md" },
      hoverEffects: { card: "hover:border-[#6366F1] hover:shadow-[0_0_15px_rgba(99,102,241,0.15)] transition-all" },
      pageLayouts: { default: "Modular technical dashboards" }
    }
  }
];

// 4. Blogging Themes
export const bloggingThemes: DesignStyle[] = [
  {
    id: "medium-style",
    name: "Medium Style",
    description: "Clean serif typography reading canvas, spacious central text columns, and minimal layout lines.",
    colors: { primary: "#191919", secondary: "#6B6B6B", accent: "#191919", background: "#FFFFFF", text: "#292929" },
    typography: { heading: "Lora", body: "Source Serif 4" },
    characteristics: ["Serif focus", "Spacious paragraphs", "Minimal borders", "White reading background"],
    preview: "linear-gradient(135deg, #FFFFFF 0%, #191919 100%)",
    designDna: {
      typography: { heading: "font-serif font-black tracking-tight text-neutral-900", body: "font-serif text-neutral-800 text-sm leading-relaxed" },
      spacing: { padding: "p-4 sm:p-6", gap: "gap-6", sectionPadding: "py-12 md:py-16" },
      animations: { duration: "duration-200" },
      buttons: { style: "bg-neutral-900 text-white hover:bg-neutral-800 px-4 py-2 text-xs font-sans rounded-full", active: "active:scale-95" },
      cards: { style: "bg-transparent border-b border-neutral-100 rounded-none shadow-none" },
      hoverEffects: { card: "hover:bg-neutral-50/50" },
      pageLayouts: { default: "Symmetric text columns" }
    }
  },
  {
    id: "editorial-magazine",
    name: "Editorial Magazine",
    description: "Asymmetrical bold layout, large serif display titles, elegant sepia fills, and magazine article grids.",
    colors: { primary: "#402E2B", secondary: "#7C635E", accent: "#402E2B", background: "#FAF7F2", text: "#2C1E1B" },
    typography: { heading: "Playfair Display", body: "Georgia" },
    characteristics: ["Sepia canvas", "Asymmetrical headers", "Serif titles", "Magazine blocks"],
    preview: "linear-gradient(135deg, #FAF7F2 0%, #402E2B 100%)",
    designDna: {
      typography: { heading: "font-serif italic font-extrabold text-[#2C1E1B]", body: "font-serif text-neutral-800 text-xs leading-relaxed" },
      spacing: { padding: "p-6", gap: "gap-8", sectionPadding: "py-16 md:py-24" },
      animations: { duration: "duration-300" },
      buttons: { style: "border border-[#402E2B] text-[#402E2B] hover:bg-[#402E2B] hover:text-white px-6 py-2.5 text-xs font-serif uppercase rounded-none transition-all", active: "active:opacity-85" },
      cards: { style: "bg-transparent border border-[#7C635E]/15 rounded-none" },
      hoverEffects: { card: "hover:bg-[#FAF7F2]/50 transition-colors" },
      pageLayouts: { default: "Editorial grids" }
    }
  },
  {
    id: "modern-publisher",
    name: "Modern Publisher",
    description: "Sleek modular bento cards grid, modern sans headings, and soft neon violet visual anchors.",
    colors: { primary: "#7C3AED", secondary: "#4B5563", accent: "#7C3AED", background: "#FCFCFD", text: "#1F2937" },
    typography: { heading: "Outfit", body: "Inter" },
    characteristics: ["Modular bento", "Outfit headlines", "Neon violet highlights", "Modern rounded boxes"],
    preview: "linear-gradient(135deg, #FCFCFD 0%, #7C3AED 100%)",
    designDna: {
      typography: { heading: "font-sans font-black tracking-tight text-neutral-900", body: "font-sans text-neutral-600 text-xs leading-relaxed" },
      spacing: { padding: "p-6", gap: "gap-5", sectionPadding: "py-14 md:py-20" },
      animations: { duration: "duration-300" },
      buttons: { style: "rounded-xl bg-[#7C3AED] text-white px-5 py-2 text-xs font-bold shadow-sm shadow-purple-500/10 hover:opacity-90", active: "active:scale-95" },
      cards: { style: "bg-white border border-neutral-100 rounded-2xl shadow-sm" },
      hoverEffects: { card: "hover:shadow-md hover:border-purple-200 transition-all" },
      pageLayouts: { default: "Bento modular blocks" }
    }
  },
  {
    id: "newsroom",
    name: "Newsroom",
    description: "Traditional high information density journalism framework, strong borders, and fast multi-column matrices.",
    colors: { primary: "#991B1B", secondary: "#1F2937", accent: "#991B1B", background: "#FFFFFF", text: "#111827" },
    typography: { heading: "Space Grotesk", body: "Inter" },
    characteristics: ["Newsroom red accent", "Strong borders rules", "High information density", "Multi-column structures"],
    preview: "linear-gradient(135deg, #FFFFFF 0%, #991B1B 100%)",
    designDna: {
      typography: { heading: "font-sans font-black uppercase tracking-tight text-[#111827]", body: "font-sans text-neutral-800 text-xs leading-normal" },
      spacing: { padding: "p-4", gap: "gap-4", sectionPadding: "py-10 md:py-16" },
      animations: { duration: "duration-100" },
      buttons: { style: "border-2 border-black bg-white text-black font-black uppercase text-xs px-4 py-2 hover:bg-neutral-50 shadow-[2px_2px_0_0_#000] active:translate-y-0.5 active:shadow-none transition-all rounded-none", active: "active:translate-y-0.5" },
      cards: { style: "bg-white border border-black rounded-none" },
      hoverEffects: { card: "hover:border-red-700 transition-colors" },
      pageLayouts: { default: "Journalism multi-columns" }
    }
  }
];

// SaaS Themes
export const saasThemes: DesignStyle[] = [
  {
    id: "stripe",
    name: "Stripe",
    description: "Clean SaaS aesthetic with rich purple/blue gradients, gorgeous typography, and premium card depth.",
    colors: { primary: "#635BFF", secondary: "#0A2540", accent: "#635BFF", background: "#FFFFFF", text: "#0A2540" },
    typography: { heading: "Inter", body: "Inter" },
    characteristics: ["Indigo primary", "Soft depth shadows", "Smooth rounded cards", "Enterprise style"],
    preview: "linear-gradient(135deg, #FFFFFF 0%, #635BFF 100%)",
    designDna: {
      typography: { heading: "font-sans font-black tracking-tight text-neutral-900", body: "font-sans font-medium text-slate-600 text-sm leading-relaxed" },
      spacing: { padding: "p-6 sm:p-8", gap: "gap-6", sectionPadding: "py-16 md:py-24" },
      animations: { duration: "duration-300 ease-in-out" },
      buttons: { style: "rounded-lg bg-[#635BFF] text-white hover:opacity-90 transition-all font-bold text-xs px-5 py-2.5 shadow-sm shadow-indigo-500/10", active: "active:scale-95" },
      cards: { style: "bg-white border border-slate-100 rounded-xl shadow-sm" },
      hoverEffects: { card: "hover:shadow-md hover:border-slate-200 transition-all duration-300" },
      pageLayouts: { default: "Balanced layout columns, full-width content blocks, radial gradient backdrops" }
    }
  },
  {
    id: "linear",
    name: "Linear",
    description: "Deep obsidian dark mode with subtle neon violet/blue borders, glowing highlights, and precise alignment grids.",
    colors: { primary: "#5E6AD2", secondary: "#8A8F98", accent: "#5E6AD2", background: "#050506", text: "#EDEDEF" },
    typography: { heading: "Inter", body: "Inter" },
    characteristics: ["Deep obsidian black", "Fine border rules", "Translucent panels", "Indigo glow elements"],
    preview: "linear-gradient(135deg, #050506 0%, #5E6AD2 100%)",
    designDna: {
      typography: { heading: "font-sans font-black tracking-tight text-[#EDEDEF]", body: "font-sans font-medium text-neutral-400 text-xs leading-relaxed" },
      spacing: { padding: "p-6", gap: "gap-4", sectionPadding: "py-16" },
      animations: { duration: "duration-300 ease-out" },
      buttons: { style: "border border-[#5E6AD2] bg-[#5E6AD2]/10 text-white font-mono text-[9px] tracking-widest hover:bg-[#5E6AD2] transition-all rounded-md px-5 py-2", active: "active:scale-95" },
      cards: { style: "bg-[#0a0a0c]/60 border border-neutral-800 rounded-lg shadow-xl backdrop-blur-md" },
      hoverEffects: { card: "hover:border-[#5E6AD2] hover:shadow-[0_0_15px_rgba(94,106,210,0.15)] transition-all" },
      pageLayouts: { default: "Translucent bento layouts, floating panels, cinematic dark layers" }
    }
  },
  {
    id: "vercel",
    name: "Vercel",
    description: "Stark minimalist black & white developer branding with strict geometry, monospace tags, and razor-sharp borders.",
    colors: { primary: "#000000", secondary: "#666666", accent: "#000000", background: "#FFFFFF", text: "#000000" },
    typography: { heading: "Inter", body: "Inter" },
    characteristics: ["Stark black/white", "Triangular logos", "0px border radius", "Monospace metadata"],
    preview: "linear-gradient(135deg, #FFFFFF 0%, #000000 100%)",
    designDna: {
      typography: { heading: "font-sans font-black tracking-tighter text-black uppercase leading-none", body: "font-sans font-normal text-neutral-700 text-sm leading-relaxed" },
      spacing: { padding: "p-8", gap: "gap-8", sectionPadding: "py-20" },
      animations: { duration: "duration-200 ease-out" },
      buttons: { style: "bg-black text-white hover:bg-white hover:text-black font-mono text-[10px] tracking-wider px-6 py-2.5 rounded-none border border-black transition-all", active: "active:translate-y-0.5" },
      cards: { style: "border border-neutral-200 bg-white rounded-none" },
      hoverEffects: { card: "hover:border-black transition-colors" },
      pageLayouts: { default: "Grid block structures, explicit thin divider lines, top header bar" }
    }
  },
  {
    id: "ai-startup",
    name: "AI Startup",
    description: "Futuristic dark mode with vibrant neon cyan gradients, glow spots, and translucent bento cards.",
    colors: { primary: "#06B6D4", secondary: "#3B82F6", accent: "#06B6D4", background: "#030712", text: "#F9FAFB" },
    typography: { heading: "Outfit", body: "Inter" },
    characteristics: ["Cyan/Teal highlights", "Translucent cards", "Neon glow spots", "Rounded geometric style"],
    preview: "linear-gradient(135deg, #030712 0%, #06B6D4 100%)",
    designDna: {
      typography: { heading: "font-sans font-black tracking-tight text-white", body: "font-sans font-medium text-neutral-450 text-xs leading-relaxed" },
      spacing: { padding: "p-6", gap: "gap-4", sectionPadding: "py-16" },
      animations: { duration: "duration-300 ease-out" },
      buttons: { style: "rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-xs px-5 py-2.5 shadow-md shadow-cyan-500/10 hover:opacity-90 active:scale-95 transition-all", active: "active:scale-95" },
      cards: { style: "bg-gray-900/40 border border-gray-800 rounded-xl backdrop-blur-md shadow-lg" },
      hoverEffects: { card: "hover:border-cyan-500 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all" },
      pageLayouts: { default: "Layered layouts with floating components, grid pattern backdrops" }
    }
  },
  {
    id: "dashboard-pro",
    name: "Dashboard Pro",
    description: "Enterprise SaaS interface style with clean layout boxes, cool gray fills, and high data density layouts.",
    colors: { primary: "#3B82F6", secondary: "#4B5563", accent: "#3B82F6", background: "#F9FAFB", text: "#111827" },
    typography: { heading: "Inter", body: "Inter" },
    characteristics: ["Slate gray fills", "Dashboard layouts", "High density", "Rounded card styles"],
    preview: "linear-gradient(135deg, #F9FAFB 0%, #3B82F6 100%)",
    designDna: {
      typography: { heading: "font-sans font-black tracking-tight text-gray-900", body: "font-sans font-medium text-gray-600 text-sm leading-relaxed" },
      spacing: { padding: "p-5", gap: "gap-4", sectionPadding: "py-12 md:py-20" },
      animations: { duration: "duration-200 ease-in-out" },
      buttons: { style: "rounded-md bg-[#3B82F6] text-white hover:bg-blue-600 transition-all font-bold text-xs px-4 py-2", active: "active:scale-98" },
      cards: { style: "bg-white border border-gray-200 rounded-lg shadow-xs" },
      hoverEffects: { card: "hover:shadow-sm hover:border-gray-300 transition-all duration-200" },
      pageLayouts: { default: "Multi-column dashboard containers, bento cards structures, grid timelines" }
    }
  }
];

// Restaurant Themes
export const restaurantThemes: DesignStyle[] = [
  {
    id: "fine-dining",
    name: "Fine Dining",
    description: "Premium culinary branding featuring dark charcoal backgrounds, luxury gold accents, and elegant Cormorant serif.",
    colors: { primary: "#C5A880", secondary: "#FAF9F6", accent: "#C5A880", background: "#111111", text: "#FAF9F6" },
    typography: { heading: "Cormorant Garamond", body: "Inter" },
    characteristics: ["Charcoal/gold colors", "Elegant serifs", "Thick card borders", "Luxury dining vibe"],
    preview: "linear-gradient(135deg, #111111 0%, #C5A880 100%)",
    designDna: {
      typography: { heading: "font-serif italic font-normal tracking-wide text-[#C5A880]", body: "font-sans font-light text-neutral-300 text-xs tracking-wide leading-relaxed" },
      spacing: { padding: "p-8", gap: "gap-8", sectionPadding: "py-24" },
      animations: { duration: "duration-300 ease-out" },
      buttons: { style: "border border-[#C5A880] bg-transparent text-[#C5A880] hover:bg-[#C5A880] hover:text-black font-sans text-[10px] tracking-widest px-8 py-3 rounded-none uppercase transition-all", active: "active:opacity-85" },
      cards: { style: "bg-[#161616] border border-neutral-800 rounded-none shadow-none" },
      hoverEffects: { card: "hover:border-[#C5A880] transition-colors" },
      pageLayouts: { default: "Centered menu listings, symmetric grids, gold dividing rules" }
    }
  },
  {
    id: "luxury-restaurant",
    name: "Luxury Restaurant",
    description: "Royal crimson red theme with champagne gold details, serif typography, and premium card layouts.",
    colors: { primary: "#D4AF37", secondary: "#800020", accent: "#D4AF37", background: "#FAF9F6", text: "#1A1A1A" },
    typography: { heading: "Playfair Display", body: "Inter" },
    characteristics: ["Crimson red accents", "Champagne bg", "Serif headers", "Ornate details"],
    preview: "linear-gradient(135deg, #800020 0%, #D4AF37 100%)",
    designDna: {
      typography: { heading: "font-serif font-black tracking-tight text-neutral-900", body: "font-sans font-medium text-neutral-600 text-xs leading-relaxed" },
      spacing: { padding: "p-8", gap: "gap-6", sectionPadding: "py-20" },
      animations: { duration: "duration-300 ease-out" },
      buttons: { style: "bg-[#800020] text-white hover:bg-red-950 font-sans text-[10px] tracking-wider px-6 py-2.5 rounded-none transition-all uppercase", active: "active:scale-98" },
      cards: { style: "bg-[#FFFFFF] border border-[#800020]/10 rounded-none shadow-sm" },
      hoverEffects: { card: "hover:shadow-md hover:border-[#800020]/25 transition-all" },
      pageLayouts: { default: "Rigid column frameworks, typographic headings, ornate border margins" }
    }
  },
  {
    id: "cafe-modern",
    name: "Cafe Modern",
    description: "Cozy coffeehouse aesthetic using warm sage green, soft browns, and beige fills with Outfit geometry.",
    colors: { primary: "#826F66", secondary: "#5F6F65", accent: "#C9C5BA", background: "#F5F3E9", text: "#3C3633" },
    typography: { heading: "Outfit", body: "Outfit" },
    characteristics: ["Sage green fills", "Cozy warm beige bg", "Rounded organic cards", "Soft layouts"],
    preview: "linear-gradient(135deg, #F5F3E9 0%, #5F6F65 100%)",
    designDna: {
      typography: { heading: "font-sans font-black tracking-tight text-[#3C3633]", body: "font-sans font-medium text-neutral-800 text-sm" },
      spacing: { padding: "p-6", gap: "gap-6", sectionPadding: "py-16 md:py-20" },
      animations: { duration: "duration-300 ease-in-out" },
      buttons: { style: "rounded-xl bg-[#5F6F65] text-white hover:bg-[#826F66] transition-all font-bold text-xs px-5 py-2.5", active: "active:scale-95" },
      cards: { style: "bg-white border border-[#C9C5BA]/40 rounded-xl shadow-xs" },
      hoverEffects: { card: "hover:shadow-sm hover:border-[#826F66] transition-all" },
      pageLayouts: { default: "Fluid bento layouts, warm blocks spacing, organic grids" }
    }
  },
  {
    id: "street-food",
    name: "Street Food",
    description: "High-contrast neobrutalist layout using intense orange/black palettes, heavy rules, and offset shadows.",
    colors: { primary: "#FF6B00", secondary: "#000000", accent: "#FF6B00", background: "#FFFFFF", text: "#000000" },
    typography: { heading: "Space Grotesk", body: "Space Grotesk" },
    characteristics: ["Intense orange primary", "Thick 3px borders", "Offset shadows", "Heavy grid layouts"],
    preview: "linear-gradient(135deg, #FFFFFF 0%, #FF6B00 100%)",
    designDna: {
      typography: { heading: "font-sans font-extrabold uppercase tracking-tight text-black", body: "font-sans font-bold text-neutral-800 text-xs" },
      spacing: { padding: "p-6 sm:p-8", gap: "gap-6", sectionPadding: "py-16 md:py-24" },
      animations: { duration: "duration-100 ease-linear" },
      buttons: { style: "border-4 border-black bg-[#FF6B00] text-black font-black uppercase text-xs tracking-wide shadow-[4px_4px_0px_0px_#000] hover:bg-orange-500 transition-all rounded-none", active: "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none" },
      cards: { style: "bg-white border-4 border-black shadow-[6px_6px_0px_0px_#000] rounded-none" },
      hoverEffects: { card: "hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#000] duration-100 transition-all" },
      pageLayouts: { default: "Split layouts columns, vertical dividing rules, heavy cards blocks" }
    }
  }
];

// Football Academy Themes
export const footballThemes: DesignStyle[] = [
  {
    id: "elite-club",
    name: "Elite Club",
    description: "Athletic look featuring deep royal navy blue, white, and golden badges, with thick titles and clean structures.",
    colors: { primary: "#1E3A8A", secondary: "#F59E0B", accent: "#1E3A8A", background: "#F8FAFC", text: "#0F172A" },
    typography: { heading: "Space Grotesk", body: "Inter" },
    characteristics: ["Navy/gold sport fills", "Thick heading weights", "Fine slate cards", "Club branding style"],
    preview: "linear-gradient(135deg, #F8FAFC 0%, #1E3A8A 100%)",
    designDna: {
      typography: { heading: "font-sans font-extrabold uppercase tracking-tight text-neutral-900", body: "font-sans font-medium text-slate-600 text-sm leading-relaxed" },
      spacing: { padding: "p-6", gap: "gap-6", sectionPadding: "py-16 md:py-20" },
      animations: { duration: "duration-200 ease-in-out" },
      buttons: { style: "rounded-lg bg-[#1E3A8A] text-white hover:bg-blue-900 transition-all font-bold text-xs px-5 py-2.5", active: "active:scale-95" },
      cards: { style: "bg-white border border-slate-200 rounded-xl shadow-xs" },
      hoverEffects: { card: "hover:shadow-sm hover:border-[#1E3A8A] transition-all" },
      pageLayouts: { default: "Structured athletic grids, full-width schedules, team roster blocks" }
    }
  },
  {
    id: "academy-pro",
    name: "Academy Pro",
    description: "Aggressive neobrutalist sports template featuring heavy rules, energetic yellow, red highlights, and bold badges.",
    colors: { primary: "#EF4444", secondary: "#FBBF24", accent: "#EF4444", background: "#FFFFFF", text: "#000000" },
    typography: { heading: "Outfit", body: "Space Grotesk" },
    characteristics: ["Aggressive heavy borders", "Offset shadows", "Energetic yellow/red", "Bold sport headers"],
    preview: "linear-gradient(135deg, #FBBF24 0%, #EF4444 100%)",
    designDna: {
      typography: { heading: "font-sans font-black uppercase tracking-tight leading-none text-black", body: "font-sans font-bold text-neutral-800 text-xs" },
      spacing: { padding: "p-6 sm:p-8", gap: "gap-6", sectionPadding: "py-16 md:py-24" },
      animations: { duration: "duration-100 ease-linear" },
      buttons: { style: "border-4 border-black bg-[#FBBF24] text-black font-black uppercase text-xs tracking-wide shadow-[4px_4px_0px_0px_#000] hover:bg-yellow-400 transition-all rounded-none", active: "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none" },
      cards: { style: "bg-white border-4 border-black shadow-[6px_6px_0px_0px_#000] rounded-none" },
      hoverEffects: { card: "hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#000] transition-all duration-100" },
      pageLayouts: { default: "Asymmetrical 60/40 layouts, training schedules columns, visual timelines" }
    }
  },
  {
    id: "athletic-modern",
    name: "Athletic Modern",
    description: "Sleek dark design with cool gray grids, bright electric lime green highlights, and modern thin outlines.",
    colors: { primary: "#84CC16", secondary: "#374151", accent: "#84CC16", background: "#090D16", text: "#F3F4F6" },
    typography: { heading: "Syne", body: "Inter" },
    characteristics: ["Electric lime green", "Dark sports canvas", "Syne font details", "Fine borders"],
    preview: "linear-gradient(135deg, #090D16 0%, #84CC16 100%)",
    designDna: {
      typography: { heading: "font-sans font-black uppercase tracking-tight text-white", body: "font-sans font-medium text-neutral-400 text-xs leading-relaxed" },
      spacing: { padding: "p-6", gap: "gap-4", sectionPadding: "py-16" },
      animations: { duration: "duration-300 ease-out" },
      buttons: { style: "border border-[#84CC16] bg-[#84CC16]/10 text-white font-mono text-[9px] tracking-widest hover:bg-[#84CC16] transition-all rounded-md px-5 py-2", active: "active:scale-95" },
      cards: { style: "bg-[#111827]/60 border border-neutral-800 rounded-lg shadow-xl backdrop-blur-md" },
      hoverEffects: { card: "hover:border-[#84CC16] hover:shadow-[0_0_15px_rgba(132,204,22,0.15)] transition-all" },
      pageLayouts: { default: "Translucent bento layouts, schedules blocks, squad profiles" }
    }
  }
];

// Coaching Class Themes
export const coachingClassThemes: DesignStyle[] = [
  {
    id: "modern-institute",
    name: "Modern Institute",
    description: "Sleek and professional institute template featuring modern purple/indigo gradients, clean cards, and friendly typography.",
    colors: { primary: "#6366F1", secondary: "#4F46E5", accent: "#6366F1", background: "#FAF5FF", text: "#312E81" },
    typography: { heading: "Inter", body: "Inter" },
    characteristics: ["Purple/indigo theme", "Soft rounded cards", "Modern high-end layout", "Friendly design aura"],
    preview: "linear-gradient(135deg, #FAF5FF 0%, #6366F1 100%)",
    designDna: {
      typography: { heading: "font-sans font-extrabold tracking-tight text-[#312E81]", body: "font-sans font-medium text-indigo-950 text-sm leading-relaxed" },
      spacing: { padding: "p-6", gap: "gap-6", sectionPadding: "py-16 md:py-20" },
      animations: { duration: "duration-200 ease-in-out" },
      buttons: { style: "rounded-xl bg-[#4F46E5] text-white hover:bg-indigo-700 transition-all font-bold text-xs px-5 py-2.5", active: "active:scale-95" },
      cards: { style: "bg-white border border-indigo-100 rounded-2xl shadow-sm" },
      hoverEffects: { card: "hover:shadow-md hover:border-[#6366F1] transition-all" },
      pageLayouts: { default: "Bento style program cards, modern batches grid, structured testimonials sliders" }
    }
  },
  {
    id: "academic-pro",
    name: "Academic Pro",
    description: "High-end corporate academic look, elegant serif headings, professional dark borders, and structured card components.",
    colors: { primary: "#111827", secondary: "#4B5563", accent: "#111827", background: "#FFFFFF", text: "#111827" },
    typography: { heading: "Playfair Display", body: "Inter" },
    characteristics: ["Serif academic feel", "Stark contrast layouts", "Clean slate cards", "Highly corporate vibe"],
    preview: "linear-gradient(135deg, #FFFFFF 0%, #111827 100%)",
    designDna: {
      typography: { heading: "font-serif font-bold text-neutral-900 leading-tight", body: "font-sans font-normal text-neutral-600 text-sm leading-relaxed" },
      spacing: { padding: "p-6 sm:p-8", gap: "gap-6", sectionPadding: "py-16 md:py-24" },
      animations: { duration: "duration-200 ease-out" },
      buttons: { style: "rounded-none bg-[#111827] text-white hover:bg-neutral-800 transition-all font-bold text-xs tracking-wide px-6 py-2.5", active: "active:translate-y-0.5" },
      cards: { style: "bg-white border border-neutral-200 rounded-none shadow-xs" },
      hoverEffects: { card: "hover:border-[#111827] hover:shadow-sm transition-all" },
      pageLayouts: { default: "Classical multi-column departments, student success timelines, pro instructor blocks" }
    }
  },
  {
    id: "competitive-exams",
    name: "Competitive Exams",
    description: "Bold neobrutalist coaching class style with thick black borders, energetic offset shadows, yellow details, and loud grids.",
    colors: { primary: "#FFD93D", secondary: "#FF6B6B", accent: "#000000", background: "#FFFDF6", text: "#000000" },
    typography: { heading: "Space Grotesk", body: "Space Grotesk" },
    characteristics: ["Thick black rules", "Offset black shadows", "Loud yellow highlights", "Brutalist exam badges"],
    preview: "linear-gradient(135deg, #FFD93D 0%, #FF6B6B 100%)",
    designDna: {
      typography: { heading: "font-sans font-black uppercase tracking-tight text-black", body: "font-sans font-bold text-neutral-900 text-xs" },
      spacing: { padding: "p-6", gap: "gap-5", sectionPadding: "py-16 md:py-24" },
      animations: { duration: "duration-100 ease-linear" },
      buttons: { style: "border-4 border-black bg-[#FFD93D] text-black font-black uppercase text-xs tracking-wider shadow-[3px_3px_0px_0px_#000] hover:bg-yellow-400 rounded-none", active: "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none" },
      cards: { style: "bg-white border-4 border-black shadow-[4px_4px_0px_0px_#000] rounded-none" },
      hoverEffects: { card: "hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#000] transition-all" },
      pageLayouts: { default: "Asymmetric course lists, exam score bento grids, aggressive registration CTA" }
    }
  }
];

// College Website Themes
export const collegeThemes: DesignStyle[] = [
  {
    id: "university-modern",
    name: "University Modern",
    description: "Futuristic collegiate look with deep sapphire blue, gold badges, clean structured grids, and premium shadows.",
    colors: { primary: "#0F172A", secondary: "#B45309", accent: "#0F172A", background: "#F8FAFC", text: "#0F172A" },
    typography: { heading: "Outfit", body: "Inter" },
    characteristics: ["Deep slate/gold accents", "Clean modern grids", "High-fidelity headers", "Admissions flow style"],
    preview: "linear-gradient(135deg, #F8FAFC 0%, #0F172A 100%)",
    designDna: {
      typography: { heading: "font-sans font-extrabold uppercase tracking-tight text-[#0F172A]", body: "font-sans font-medium text-slate-700 text-sm leading-relaxed" },
      spacing: { padding: "p-6", gap: "gap-6", sectionPadding: "py-20" },
      animations: { duration: "duration-200 ease-in-out" },
      buttons: { style: "rounded-lg bg-[#0F172A] text-white hover:bg-slate-800 transition-all font-bold text-xs px-5 py-2.5", active: "active:scale-95" },
      cards: { style: "bg-white border border-slate-200 rounded-xl shadow-xs" },
      hoverEffects: { card: "hover:shadow-md hover:border-[#0F172A] transition-all" },
      pageLayouts: { default: "Multi-column degree program listings, campus life video showcases, admission timeline checklists" }
    }
  },
  {
    id: "campus-premium",
    name: "Campus Premium",
    description: "Elegant prestige university look with rich crimson red, warm gold accents, high-end serif titles, and elegant borders.",
    colors: { primary: "#7F1D1D", secondary: "#D97706", accent: "#7F1D1D", background: "#FAF9F6", text: "#7F1D1D" },
    typography: { heading: "Cinzel", body: "Inter" },
    characteristics: ["Crimson red/gold luxe", "Classic serif fonts", "Prestige academy branding", "Exquisite fine lines"],
    preview: "linear-gradient(135deg, #FAF9F6 0%, #7F1D1D 100%)",
    designDna: {
      typography: { heading: "font-serif font-black tracking-normal text-[#7F1D1D]", body: "font-sans font-medium text-neutral-700 text-sm leading-relaxed" },
      spacing: { padding: "p-6 sm:p-8", gap: "gap-6", sectionPadding: "py-16 md:py-24" },
      animations: { duration: "duration-300 ease-out" },
      buttons: { style: "rounded-none border border-[#7F1D1D] bg-[#7F1D1D]/5 text-[#7F1D1D] hover:bg-[#7F1D1D] hover:text-white transition-all font-serif text-[10px] tracking-widest uppercase px-6 py-2.5", active: "active:translate-y-0.5" },
      cards: { style: "bg-white border border-[#7F1D1D]/15 rounded-none shadow-xs" },
      hoverEffects: { card: "hover:border-[#7F1D1D] transition-all duration-300" },
      pageLayouts: { default: "Curated program sections, elegant traditional faculty cards, rich gold admissions headers" }
    }
  },
  {
    id: "academic-classic",
    name: "Academic Classic",
    description: "Ivy league classic look featuring deep forest green, sand background, traditional serif hierarchy, and clean lists.",
    colors: { primary: "#064E3B", secondary: "#D97706", accent: "#064E3B", background: "#FAF8F5", text: "#064E3B" },
    typography: { heading: "Lora", body: "Inter" },
    characteristics: ["Ivy League forest green", "Traditional sand canvas", "Serif headers", "Clean list patterns"],
    preview: "linear-gradient(135deg, #FAF8F5 0%, #064E3B 100%)",
    designDna: {
      typography: { heading: "font-serif font-bold text-[#064E3B] leading-tight", body: "font-sans font-normal text-neutral-750 text-sm leading-relaxed" },
      spacing: { padding: "p-6", gap: "gap-6", sectionPadding: "py-16" },
      animations: { duration: "duration-250 ease-in-out" },
      buttons: { style: "rounded-md bg-[#064E3B] text-white hover:bg-emerald-900 transition-all font-bold text-xs px-5 py-2.5", active: "active:scale-95" },
      cards: { style: "bg-white border border-[#064E3B]/10 rounded-md shadow-xs" },
      hoverEffects: { card: "hover:border-[#064E3B] hover:shadow-xs transition-all" },
      pageLayouts: { default: "Ivy academic courses grid, structured campus gallery, events list block" }
    }
  }
];

// Gym Website Themes
export const gymThemes: DesignStyle[] = [
  {
    id: "fitness-pro",
    name: "Fitness Pro",
    description: "Clean modern fitness style featuring pure light theme, vibrant energetic neon green accents, and sharp typography.",
    colors: { primary: "#4F46E5", secondary: "#10B981", accent: "#10B981", background: "#FFFFFF", text: "#111827" },
    typography: { heading: "Space Grotesk", body: "Inter" },
    characteristics: ["Vibrant green accents", "Clean gym layouts", "Sharp card outlines", "Energetic structure"],
    preview: "linear-gradient(135deg, #FFFFFF 0%, #10B981 100%)",
    designDna: {
      typography: { heading: "font-sans font-extrabold uppercase tracking-tight text-neutral-900", body: "font-sans font-medium text-neutral-600 text-sm leading-relaxed" },
      spacing: { padding: "p-6", gap: "gap-6", sectionPadding: "py-16 md:py-20" },
      animations: { duration: "duration-200 ease-in-out" },
      buttons: { style: "rounded-lg bg-neutral-900 text-white hover:bg-[#10B981] hover:text-black transition-all font-bold text-xs px-5 py-2.5", active: "active:scale-95" },
      cards: { style: "bg-white border border-slate-200 rounded-xl shadow-xs" },
      hoverEffects: { card: "hover:shadow-md hover:border-[#10B981] transition-all" },
      pageLayouts: { default: "Bento plans grids, transformations comparison panels, trainer cards list" }
    }
  },
  {
    id: "dark-athletic",
    name: "Dark Athletic",
    description: "Deep obsidian athletic theme, black slate cards, high contrast workout plans, and electric neon orange highlights.",
    colors: { primary: "#F97316", secondary: "#1F2937", accent: "#F97316", background: "#0B0F19", text: "#F3F4F6" },
    typography: { heading: "Syne", body: "Space Grotesk" },
    characteristics: ["Electric neon orange", "Obsidian gym canvas", "Syne athletic titles", "Sleek dark card glow"],
    preview: "linear-gradient(135deg, #0B0F19 0%, #F97316 100%)",
    designDna: {
      typography: { heading: "font-sans font-black uppercase tracking-tight text-white", body: "font-sans font-bold text-neutral-400 text-xs leading-relaxed" },
      spacing: { padding: "p-6", gap: "gap-5", sectionPadding: "py-16 md:py-20" },
      animations: { duration: "duration-300 ease-out" },
      buttons: { style: "border border-[#F97316] bg-[#F97316]/10 text-white font-mono text-[9px] tracking-widest hover:bg-[#F97316] hover:text-black transition-all rounded-md px-5 py-2", active: "active:scale-95" },
      cards: { style: "bg-[#161F30]/60 border border-neutral-800 rounded-lg shadow-xl backdrop-blur-md" },
      hoverEffects: { card: "hover:border-[#F97316] hover:shadow-[0_0_15px_rgba(249,115,22,0.15)] transition-all" },
      pageLayouts: { default: "Deep neon orange layouts, dark schedule timetables, athlete telemetry panels" }
    }
  },
  {
    id: "bodybuilding",
    name: "Bodybuilding",
    description: "Rugged and strong neobrutalist dark gym layout featuring solid gold badges, thick black borders, and heavy grids.",
    colors: { primary: "#D97706", secondary: "#000000", accent: "#D97706", background: "#050505", text: "#FFFFFF" },
    typography: { heading: "Outfit", body: "Space Grotesk" },
    characteristics: ["Rugged gold highlights", "Heavy dark borders", "Brutalist workout lists", "Strong solid grids"],
    preview: "linear-gradient(135deg, #050505 0%, #D97706 100%)",
    designDna: {
      typography: { heading: "font-sans font-black uppercase tracking-tight text-white", body: "font-sans font-bold text-neutral-350 text-xs" },
      spacing: { padding: "p-6 sm:p-8", gap: "gap-6", sectionPadding: "py-16 md:py-24" },
      animations: { duration: "duration-100 ease-linear" },
      buttons: { style: "border-4 border-yellow-600 bg-black text-[#D97706] font-black uppercase text-xs tracking-wider shadow-[3px_3px_0px_0px_#D97706] hover:bg-yellow-600 hover:text-black transition-all rounded-none", active: "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none" },
      cards: { style: "bg-[#0A0A0A] border-4 border-yellow-600 shadow-[4px_4px_0px_0px_#D97706] rounded-none" },
      hoverEffects: { card: "hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#D97706] transition-all" },
      pageLayouts: { default: "Solid muscle grids, golden heavy schedule lists, extreme power workouts details" }
    }
  }
];

// Mosque Themes
export const mosqueThemes: DesignStyle[] = [
  {
    id: "masjid-modern",
    name: "Masjid Modern",
    description: "Graceful and clean style featuring deep emerald green, gold borders, off-white fills, and serif headings.",
    colors: { primary: "#047857", secondary: "#D97706", accent: "#047857", background: "#FAF9F5", text: "#065F46" },
    typography: { heading: "Playfair Display", body: "Inter" },
    characteristics: ["Emerald green primary", "Soft gold borders", "Pure serene layout", "Clean readable details"],
    preview: "linear-gradient(135deg, #FAF9F5 0%, #047857 100%)",
    designDna: {
      typography: { heading: "font-serif font-black uppercase tracking-tight text-[#065F46]", body: "font-sans font-medium text-neutral-700 text-sm leading-relaxed" },
      spacing: { padding: "p-6 sm:p-8", gap: "gap-6", sectionPadding: "py-16 md:py-20" },
      animations: { duration: "duration-300 ease-in-out" },
      buttons: { style: "rounded-lg bg-[#047857] text-white hover:bg-emerald-800 transition-all font-bold text-xs px-5 py-2.5", active: "active:scale-95" },
      cards: { style: "bg-white border border-[#D97706]/20 rounded-xl shadow-xs" },
      hoverEffects: { card: "hover:shadow-sm hover:border-[#047857] transition-all" },
      pageLayouts: { default: "Clean prayer timetables grids, centered events calendars, donation programs" }
    }
  },
  {
    id: "community-mosque",
    name: "Community Mosque",
    description: "Traditional palette with warm sand desert tones, royal olive green highlights, and ornate brass borders.",
    colors: { primary: "#B45309", secondary: "#3F6212", accent: "#B45309", background: "#FFFDF6", text: "#451A03" },
    typography: { heading: "Cormorant Garamond", body: "Inter" },
    characteristics: ["Warm sand colors", "Brass borders decoration", "Serif classic headers", "Traditional styling"],
    preview: "linear-gradient(135deg, #FFFDF6 0%, #B45309 100%)",
    designDna: {
      typography: { heading: "font-serif italic font-normal tracking-wide text-[#451A03]", body: "font-sans font-normal text-neutral-600 text-xs tracking-wide leading-relaxed" },
      spacing: { padding: "p-8", gap: "gap-8", sectionPadding: "py-24" },
      animations: { duration: "duration-300 ease-out" },
      buttons: { style: "border border-[#B45309] bg-transparent text-[#B45309] hover:bg-[#B45309] hover:text-white font-sans text-[10px] tracking-widest px-8 py-3 rounded-none uppercase transition-all", active: "active:opacity-85" },
      cards: { style: "bg-[#FFFDF6] border border-[#B45309]/20 rounded-none shadow-none" },
      hoverEffects: { card: "hover:bg-[#FFFDF6]/50 transition-colors" },
      pageLayouts: { default: "Centered scripture quotes, prayer tables divisions, brass separators" }
    }
  },
  {
    id: "islamic-center",
    name: "Islamic Center",
    description: "Friendly mosque layout utilizing sky blue, clean teal fills, soft gray grids, and Outfit geometry.",
    colors: { primary: "#0F766E", secondary: "#0EA5E9", accent: "#0F766E", background: "#F8FAFC", text: "#0F172A" },
    typography: { heading: "Outfit", body: "Outfit" },
    characteristics: ["Sky blue/teal fills", "Soft gray background", "Rounded bento cards", "Readability focus"],
    preview: "linear-gradient(135deg, #F8FAFC 0%, #0F766E 100%)",
    designDna: {
      typography: { heading: "font-sans font-black tracking-tight text-[#0F172A]", body: "font-sans font-medium text-slate-600 text-sm" },
      spacing: { padding: "p-6", gap: "gap-4", sectionPadding: "py-12 md:py-20" },
      animations: { duration: "duration-200 ease-in-out" },
      buttons: { style: "rounded-md bg-[#0F766E] text-white hover:bg-teal-800 transition-all font-bold text-xs px-4 py-2", active: "active:scale-98" },
      cards: { style: "bg-white border border-slate-100 rounded-lg shadow-sm" },
      hoverEffects: { card: "hover:shadow-md hover:border-[#0EA5E9] transition-all" },
      pageLayouts: { default: "Centered community schedules lists, events grids, readable cards" }
    }
  }
];

// Islamic Website Themes
export const islamicWebsiteThemes: DesignStyle[] = [
  {
    id: "elegant-islamic",
    name: "Elegant Islamic",
    description: "Serene academic styling featuring deep emerald, gold trims, serif headers, and warm sand paper canvas.",
    colors: { primary: "#065F46", secondary: "#B45309", accent: "#065F46", background: "#FAF8F5", text: "#064E3B" },
    typography: { heading: "Playfair Display", body: "Inter" },
    characteristics: ["Deep Emerald Green", "Gold Trims & Accents", "Warm Sand Canvas", "Calligraphic serif headers"],
    preview: "linear-gradient(135deg, #FAF8F5 0%, #065F46 100%)",
    designDna: {
      typography: { heading: "font-serif font-black uppercase text-[#065F46]", body: "font-sans text-neutral-600 text-xs leading-relaxed" },
      spacing: { padding: "p-6", gap: "gap-6", sectionPadding: "py-16" },
      animations: { duration: "duration-300" },
      buttons: { style: "bg-[#065F46] text-white px-5 py-2.5 text-xs font-bold rounded-lg hover:bg-emerald-800 transition-all", active: "active:scale-98" },
      cards: { style: "bg-white border border-[#B45309]/10 rounded-xl shadow-xs" },
      hoverEffects: { card: "hover:shadow-sm" },
      pageLayouts: { default: "Centered scripture boards, beautiful prayer widgets, traditional articles list" }
    }
  },
  {
    id: "quran-academy",
    name: "Quran Academy",
    description: "Deep burgundy academic theme, beautiful cream borders, highly readable classic design.",
    colors: { primary: "#7F1D1D", secondary: "#D97706", accent: "#7F1D1D", background: "#FCFBF9", text: "#450A0A" },
    typography: { heading: "Cormorant Garamond", body: "Inter" },
    characteristics: ["Burgundy Primary", "Cream borders decoration", "Classical scripture styling"],
    preview: "linear-gradient(135deg, #FCFBF9 0%, #7F1D1D 100%)",
    designDna: {
      typography: { heading: "font-serif italic font-bold text-[#450A0A]", body: "font-sans text-neutral-600 text-xs leading-relaxed" },
      spacing: { padding: "p-8", gap: "gap-8", sectionPadding: "py-20" },
      animations: { duration: "duration-300" },
      buttons: { style: "border-2 border-[#7F1D1D] bg-transparent text-[#7F1D1D] px-6 py-2.5 text-xs font-bold hover:bg-[#7F1D1D] hover:text-white transition-all", active: "active:opacity-90" },
      cards: { style: "bg-[#FCFBF9] border border-[#7F1D1D]/10 rounded-none" },
      hoverEffects: { card: "hover:bg-[#FCFBF9]/80" },
      pageLayouts: { default: "Quran recitation layouts, detailed class schedules, study programs list" }
    }
  },
  {
    id: "community-islamic",
    name: "Community Islamic",
    description: "Modern friendly style featuring teal primary, peach accents, and clean outfits layouts.",
    colors: { primary: "#0F766E", secondary: "#F97316", accent: "#0F766E", background: "#F8FAFC", text: "#0F172A" },
    typography: { heading: "Outfit", body: "Outfit" },
    characteristics: ["Modern teal tones", "Peach highlights", "Serene bento blocks"],
    preview: "linear-gradient(135deg, #F8FAFC 0%, #0F766E 100%)",
    designDna: {
      typography: { heading: "font-sans font-extrabold tracking-tight text-[#0F172A]", body: "font-sans text-slate-600 text-sm" },
      spacing: { padding: "p-6", gap: "gap-4", sectionPadding: "py-12 md:py-20" },
      animations: { duration: "duration-200" },
      buttons: { style: "rounded-xl bg-[#0F766E] text-white px-5 py-2.5 text-xs font-bold hover:bg-teal-800 transition-all", active: "active:scale-98" },
      cards: { style: "bg-white border border-slate-100 rounded-2xl shadow-sm" },
      hoverEffects: { card: "hover:shadow-md hover:border-[#F97316]" },
      pageLayouts: { default: "Bento community updates, modern prayer times dashboard, friendly grids" }
    }
  }
];

// NGO Website Themes
export const ngoThemes: DesignStyle[] = [
  {
    id: "charity",
    name: "Charity Style",
    description: "Warm, empathetic theme with soft green primary, bright orange accents, and friendly typography.",
    colors: { primary: "#059669", secondary: "#F97316", accent: "#059669", background: "#FFFFFF", text: "#1F2937" },
    typography: { heading: "Inter", body: "Inter" },
    characteristics: ["Empathetic green", "Orange action CTA", "Friendly clean grids"],
    preview: "linear-gradient(135deg, #FFFFFF 0%, #059669 100%)",
    designDna: {
      typography: { heading: "font-sans font-extrabold text-[#1F2937]", body: "font-sans text-neutral-600 text-xs leading-relaxed" },
      spacing: { padding: "p-6", gap: "gap-6", sectionPadding: "py-16" },
      animations: { duration: "duration-200" },
      buttons: { style: "bg-[#F97316] text-white hover:bg-orange-650 px-6 py-2.5 text-xs font-bold rounded-full transition-all shadow-sm", active: "active:scale-98" },
      cards: { style: "bg-white border border-neutral-100 rounded-2xl shadow-sm" },
      hoverEffects: { card: "hover:shadow-md" },
      pageLayouts: { default: "Donation goal trackers, clean program cards, centered mission headers" }
    }
  },
  {
    id: "community-support",
    name: "Community Support",
    description: "Calm sky blue theme tailored for local and regional social aid campaigns.",
    colors: { primary: "#0284C7", secondary: "#0F172A", accent: "#0284C7", background: "#F8FAFC", text: "#0F172A" },
    typography: { heading: "Outfit", body: "Outfit" },
    characteristics: ["Sky blue main theme", "Rounded cards", "Community focused layout"],
    preview: "linear-gradient(135deg, #F8FAFC 0%, #0284C7 100%)",
    designDna: {
      typography: { heading: "font-sans font-black tracking-tight text-[#0F172A]", body: "font-sans text-slate-650 text-sm leading-relaxed" },
      spacing: { padding: "p-6", gap: "gap-4", sectionPadding: "py-12" },
      animations: { duration: "duration-200" },
      buttons: { style: "rounded-xl bg-[#0284C7] text-white px-5 py-2.5 text-xs font-bold hover:bg-sky-700 transition-all", active: "active:scale-98" },
      cards: { style: "bg-white border border-slate-100 rounded-xl shadow-xs" },
      hoverEffects: { card: "hover:shadow-md" },
      pageLayouts: { default: "Empathetic aid programs list, volunteer slots, friendly callouts" }
    }
  },
  {
    id: "global-impact",
    name: "Global Impact",
    description: "Corporate bold dark indigo theme for international non-profit organizations.",
    colors: { primary: "#312E81", secondary: "#10B981", accent: "#312E81", background: "#FCFDFE", text: "#1E1B4B" },
    typography: { heading: "Inter", body: "Inter" },
    characteristics: ["Deep Indigo Base", "Emerald success badges", "Corporate clean charts"],
    preview: "linear-gradient(135deg, #FCFDFE 0%, #312E81 100%)",
    designDna: {
      typography: { heading: "font-sans font-extrabold text-[#1E1B4B]", body: "font-sans text-neutral-600 text-xs leading-relaxed" },
      spacing: { padding: "p-8", gap: "gap-8", sectionPadding: "py-20" },
      animations: { duration: "duration-300" },
      buttons: { style: "bg-[#10B981] text-white px-6 py-2.5 text-xs font-bold rounded-lg hover:bg-emerald-600 transition-all", active: "active:scale-95" },
      cards: { style: "bg-white border border-indigo-50 rounded-xl shadow-xs" },
      hoverEffects: { card: "hover:border-[#10B981] transition-all" },
      pageLayouts: { default: "Grid map layout, multi-regional achievements, metrics showcase" }
    }
  }
];

// Job Portal Themes
export const jobPortalThemes: DesignStyle[] = [
  {
    id: "linkedin-style",
    name: "LinkedIn Style",
    description: "Professional corporate gray and deep cobalt blue theme modeled around clean feeds and lists.",
    colors: { primary: "#0A66C2", secondary: "#475569", accent: "#0A66C2", background: "#F3F2EF", text: "#191919" },
    typography: { heading: "Inter", body: "Inter" },
    characteristics: ["Cobalt Blue Primary", "Social Feed Layouts", "Card layout style"],
    preview: "linear-gradient(135deg, #F3F2EF 0%, #0A66C2 100%)",
    designDna: {
      typography: { heading: "font-sans font-bold text-[#191919]", body: "font-sans text-neutral-650 text-xs" },
      spacing: { padding: "p-5", gap: "gap-4", sectionPadding: "py-10" },
      animations: { duration: "duration-150" },
      buttons: { style: "bg-[#0A66C2] text-white px-5 py-2 text-xs font-bold rounded-full hover:bg-blue-800 transition-all", active: "active:scale-98" },
      cards: { style: "bg-white border border-neutral-200 rounded-xl shadow-xs" },
      hoverEffects: { card: "hover:shadow-sm" },
      pageLayouts: { default: "Clean filters left panels, vertical job cards, employer branding headers" }
    }
  },
  {
    id: "recruitment-hub",
    name: "Recruitment Hub",
    description: "Modern professional lavender and deep violet dashboard layouts.",
    colors: { primary: "#6D28D9", secondary: "#A78BFA", accent: "#6D28D9", background: "#FAF9FE", text: "#1F1A3A" },
    typography: { heading: "Outfit", body: "Outfit" },
    characteristics: ["Violet theme", "Modern search panels", "Creative layouts"],
    preview: "linear-gradient(135deg, #FAF9FE 0%, #6D28D9 100%)",
    designDna: {
      typography: { heading: "font-sans font-extrabold tracking-tight text-[#1F1A3A]", body: "font-sans text-slate-600 text-sm" },
      spacing: { padding: "p-6", gap: "gap-6", sectionPadding: "py-16" },
      animations: { duration: "duration-200" },
      buttons: { style: "rounded-xl bg-[#6D28D9] text-white px-5 py-2.5 text-xs font-bold hover:bg-indigo-800 transition-all", active: "active:scale-98" },
      cards: { style: "bg-white border border-slate-100 rounded-2xl shadow-sm" },
      hoverEffects: { card: "hover:shadow-md" },
      pageLayouts: { default: "Search bars panels, featured grids, corporate partner cards" }
    }
  },
  {
    id: "career-network",
    name: "Career Network",
    description: "Stark neobrutalist format featuring offset drop shadows and high energy yellow overlays.",
    colors: { primary: "#000000", secondary: "#FDE047", accent: "#000000", background: "#FFFDF5", text: "#000000" },
    typography: { heading: "Inter", body: "Inter" },
    characteristics: ["Stark neobrutalism", "Raw black offset shadows", "Yellow headers highlights"],
    preview: "linear-gradient(135deg, #FFFDF5 0%, #000000 100%)",
    designDna: {
      typography: { heading: "font-sans font-black uppercase text-black", body: "font-sans font-bold text-neutral-800 text-xs" },
      spacing: { padding: "p-5", gap: "gap-5", sectionPadding: "py-12" },
      animations: { duration: "duration-200" },
      buttons: { style: "border-3 border-black bg-[#FDE047] text-black font-black text-xs uppercase px-5 py-2 shadow-[2px_2px_0px_0px_#000] hover:bg-yellow-400 active:translate-y-0.5 active:shadow-none", active: "active:scale-98" },
      cards: { style: "bg-white border-3 border-black shadow-[3px_3px_0px_0px_#000]" },
      hoverEffects: { card: "hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_#000] transition-all" },
      pageLayouts: { default: "Heavy border grids, search forms, offset text labels list" }
    }
  }
];

// Phase 2 - Business Website Themes
export const businessThemes: DesignStyle[] = [
  {
    id: "corporate",
    name: "Corporate Style",
    description: "Classic corporate navy styling, highly readable font families, neat borders, and structured grids.",
    colors: { primary: "#1E3A8A", secondary: "#475569", accent: "#1E3A8A", background: "#FFFFFF", text: "#1E293B" },
    typography: { heading: "Inter", body: "Inter" },
    characteristics: ["Navy primary", "Clean alignment", "Professional corporate layouts"],
    preview: "linear-gradient(135deg, #FFFFFF 0%, #1E3A8A 100%)",
    designDna: {
      typography: { heading: "font-sans font-bold text-slate-900", body: "font-sans text-slate-600 text-xs" },
      spacing: { padding: "p-6", gap: "gap-6", sectionPadding: "py-16" },
      animations: { duration: "duration-200" },
      buttons: { style: "bg-[#1E3A8A] text-white px-5 py-2 text-xs font-bold rounded", active: "active:scale-95" },
      cards: { style: "bg-white border border-slate-200 rounded p-5 shadow-sm" },
      hoverEffects: { card: "hover:border-slate-350" },
      pageLayouts: { default: "Rigid grid alignments" }
    }
  },
  {
    id: "enterprise",
    name: "Enterprise Style",
    description: "Monochrome aesthetics combined with royal slate gray highlights, robust structural margins, and dense metadata.",
    colors: { primary: "#0F172A", secondary: "#64748B", accent: "#0F172A", background: "#F8FAFC", text: "#0F172A" },
    typography: { heading: "Inter", body: "Inter" },
    characteristics: ["Monochrome styling", "Slate accents", "High layout integrity"],
    preview: "linear-gradient(135deg, #F8FAFC 0%, #0F172A 100%)",
    designDna: {
      typography: { heading: "font-sans font-black text-[#0F172A]", body: "font-sans text-neutral-600 text-xs" },
      spacing: { padding: "p-6", gap: "gap-6", sectionPadding: "py-20" },
      animations: { duration: "duration-300" },
      buttons: { style: "bg-[#0F172A] text-white px-6 py-2.5 text-xs font-bold rounded-none", active: "active:opacity-90" },
      cards: { style: "bg-white border border-slate-100 rounded-none shadow-xs" },
      hoverEffects: { card: "hover:border-slate-300" },
      pageLayouts: { default: "Symmetric columns" }
    }
  },
  {
    id: "consulting",
    name: "Consulting Style",
    description: "Luxurious ivory backgrounds, gold details, and sophisticated serif typography suited for advisors.",
    colors: { primary: "#C5A880", secondary: "#1A1A1A", accent: "#C5A880", background: "#FAF9F6", text: "#1A1A1A" },
    typography: { heading: "Cormorant Garamond", body: "Inter" },
    characteristics: ["Ivory/gold tone", "Serif classic titles", "Spacious layouts"],
    preview: "linear-gradient(135deg, #FAF9F6 0%, #C5A880 100%)",
    designDna: {
      typography: { heading: "font-serif italic font-normal text-slate-900", body: "font-sans text-slate-650 text-xs leading-relaxed" },
      spacing: { padding: "p-8", gap: "gap-8", sectionPadding: "py-24" },
      animations: { duration: "duration-300" },
      buttons: { style: "border border-[#C5A880] text-[#C5A880] px-6 py-2.5 text-xs uppercase hover:bg-[#C5A880] hover:text-black", active: "active:opacity-85" },
      cards: { style: "bg-[#FAF9F6] border border-neutral-200/50 rounded-none" },
      hoverEffects: { card: "hover:border-[#C5A880]" },
      pageLayouts: { default: "Spacious luxury grids" }
    }
  },
  {
    id: "industrial",
    name: "Industrial Style",
    description: "Bold neobrutalist layout using intense safety orange accents, solid dark charcoal grids, and heavy outlines.",
    colors: { primary: "#EA580C", secondary: "#1E293B", accent: "#EA580C", background: "#FCFCFD", text: "#0F172A" },
    typography: { heading: "Space Grotesk", body: "Space Grotesk" },
    characteristics: ["Intense orange", "Neobrutalist outlines", "Technical bold layout"],
    preview: "linear-gradient(135deg, #FCFCFD 0%, #EA580C 100%)",
    designDna: {
      typography: { heading: "font-sans font-black uppercase text-black", body: "font-sans font-bold text-slate-800 text-xs" },
      spacing: { padding: "p-6", gap: "gap-6", sectionPadding: "py-16" },
      animations: { duration: "duration-100 ease-linear" },
      buttons: { style: "border-4 border-black bg-[#EA580C] text-black font-black uppercase text-xs shadow-[4px_4px_0px_0px_#000] hover:bg-orange-500", active: "active:translate-x-[2px]" },
      cards: { style: "bg-white border-4 border-black shadow-[6px_6px_0px_0px_#000]" },
      hoverEffects: { card: "hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#000]" },
      pageLayouts: { default: "Rigid blocks" }
    }
  }
];

// Phase 2 - Startup Landing Page Themes
export const startupThemes: DesignStyle[] = [
  {
    id: "yc-startup",
    name: "YC Startup Style",
    description: "Sleek minimalist interface with signature orange highlights, light cream fills, and technical data listings.",
    colors: { primary: "#FF6600", secondary: "#1A1A1A", accent: "#FF6600", background: "#F6F6EF", text: "#000000" },
    typography: { heading: "Inter", body: "Inter" },
    characteristics: ["Orange branding", "Light cream canvas", "Information dense details"],
    preview: "linear-gradient(135deg, #F6F6EF 0%, #FF6600 100%)",
    designDna: {
      typography: { heading: "font-sans font-black text-black", body: "font-sans text-neutral-800 text-xs" },
      spacing: { padding: "p-5", gap: "gap-4", sectionPadding: "py-12" },
      animations: { duration: "duration-200" },
      buttons: { style: "bg-[#FF6600] text-white px-4 py-2 text-xs font-bold rounded", active: "active:scale-95" },
      cards: { style: "bg-white border border-[#E0E0D8] rounded shadow-xs" },
      hoverEffects: { card: "hover:border-[#FF6600]" },
      pageLayouts: { default: "Dense columns feed" }
    }
  },
  {
    id: "stripe-style",
    name: "Stripe Style",
    description: "State-of-the-art SaaS layout with rich purple-indigo telemetry lines, glassmorphic card lists, and soft glow spheres.",
    colors: { primary: "#635BFF", secondary: "#0A2540", accent: "#635BFF", background: "#FFFFFF", text: "#0A2540" },
    typography: { heading: "Outfit", body: "Inter" },
    characteristics: ["Royal indigo gradient", "Soft glass panel filters", "Elite UI telemetry"],
    preview: "linear-gradient(135deg, #FFFFFF 0%, #635BFF 100%)",
    designDna: {
      typography: { heading: "font-sans font-extrabold text-[#0A2540]", body: "font-sans text-slate-605 text-xs" },
      spacing: { padding: "p-6", gap: "gap-6", sectionPadding: "py-16" },
      animations: { duration: "duration-300" },
      buttons: { style: "rounded-lg bg-[#635BFF] text-white px-5 py-2.5 text-xs font-bold shadow-md shadow-purple-500/10", active: "active:scale-95" },
      cards: { style: "bg-white border border-slate-100 rounded-2xl shadow-sm" },
      hoverEffects: { card: "hover:shadow-md transition-all" },
      pageLayouts: { default: "Fluid bento containers" }
    }
  },
  {
    id: "linear-style",
    name: "Linear Style",
    description: "Deep charcoal background layout with extremely fine dark slate border boundaries and sharp neon purple visual tags.",
    colors: { primary: "#5E6AD2", secondary: "#8A8F98", accent: "#5E6AD2", background: "#050506", text: "#EDEDEF" },
    typography: { heading: "Inter", body: "Inter" },
    characteristics: ["Dark carbon theme", "Extremely thin rules", "Neon purple details"],
    preview: "linear-gradient(135deg, #050506 0%, #5E6AD2 100%)",
    designDna: {
      typography: { heading: "font-sans font-black text-[#EDEDEF]", body: "font-sans text-neutral-400 text-xs" },
      spacing: { padding: "p-6", gap: "gap-4", sectionPadding: "py-14" },
      animations: { duration: "duration-250" },
      buttons: { style: "border border-[#5E6AD2] bg-[#5E6AD2]/10 text-white font-mono text-[9px] px-5 py-2 rounded-md", active: "active:scale-95" },
      cards: { style: "bg-[#0a0a0c]/60 border border-neutral-800 rounded-lg shadow-xl" },
      hoverEffects: { card: "hover:border-[#5E6AD2]" },
      pageLayouts: { default: "Carbon layout boxes" }
    }
  },
  {
    id: "modern-saas",
    name: "Modern SaaS",
    description: "Highly polished white canvas featuring dynamic violet visual grids, soft shadows, and clean modern headings.",
    colors: { primary: "#7C3AED", secondary: "#4F46E5", accent: "#7C3AED", background: "#FCFCFD", text: "#1F2937" },
    typography: { heading: "Outfit", body: "Inter" },
    characteristics: ["Violet elements", "Polished white borders", "Clean geometric tags"],
    preview: "linear-gradient(135deg, #FCFCFD 0%, #7C3AED 100%)",
    designDna: {
      typography: { heading: "font-sans font-extrabold text-[#1F2937]", body: "font-sans text-neutral-600 text-xs" },
      spacing: { padding: "p-6", gap: "gap-5", sectionPadding: "py-16" },
      animations: { duration: "duration-300" },
      buttons: { style: "rounded-xl bg-[#7C3AED] text-white px-5 py-2.5 text-xs font-bold", active: "active:scale-98" },
      cards: { style: "bg-white border border-neutral-100 rounded-2xl shadow-sm" },
      hoverEffects: { card: "hover:shadow-md" },
      pageLayouts: { default: "Grid block maps" }
    }
  }
];

// Phase 2 - SaaS Dashboard Themes
export const saasDashboardThemes: DesignStyle[] = [
  {
    id: "modern-analytics",
    name: "Modern Analytics",
    description: "Deep obsidian backdrop featuring bright neon electric-green telemetry borders, visual grid maps, and charts.",
    colors: { primary: "#10B981", secondary: "#6B7280", accent: "#10B981", background: "#030712", text: "#F9FAFB" },
    typography: { heading: "Space Grotesk", body: "Inter" },
    characteristics: ["Electric green", "Obsidian dashboard theme", "Modern analytics panel"],
    preview: "linear-gradient(135deg, #030712 0%, #10B981 100%)",
    designDna: {
      typography: { heading: "font-sans font-black text-white", body: "font-sans text-neutral-400 text-xs" },
      spacing: { padding: "p-5", gap: "gap-4", sectionPadding: "py-10" },
      animations: { duration: "duration-250" },
      buttons: { style: "bg-[#10B981] text-white px-4 py-2 text-xs font-bold rounded-lg", active: "active:scale-95" },
      cards: { style: "bg-gray-900/40 border border-gray-800 rounded-xl backdrop-blur-md" },
      hoverEffects: { card: "hover:border-[#10B981]" },
      pageLayouts: { default: "Dashboard grid panels" }
    }
  },
  {
    id: "fintech",
    name: "Fintech Style",
    description: "Royal blue premium styling representing global financial operations, high information density logs, and reports.",
    colors: { primary: "#2563EB", secondary: "#475569", accent: "#2563EB", background: "#F8FAFC", text: "#0F172A" },
    typography: { heading: "Outfit", body: "Inter" },
    characteristics: ["Royal blue highlights", "Financial logs spacing", "Enterprise charts"],
    preview: "linear-gradient(135deg, #F8FAFC 0%, #2563EB 100%)",
    designDna: {
      typography: { heading: "font-sans font-bold text-slate-900", body: "font-sans text-slate-600 text-xs" },
      spacing: { padding: "p-6", gap: "gap-5", sectionPadding: "py-12" },
      animations: { duration: "duration-200" },
      buttons: { style: "bg-[#2563EB] text-white px-5 py-2.5 text-xs font-bold rounded-lg", active: "active:scale-98" },
      cards: { style: "bg-white border border-slate-200 rounded-xl shadow-xs" },
      hoverEffects: { card: "hover:border-blue-300" },
      pageLayouts: { default: "Rigid financial lists" }
    }
  },
  {
    id: "crm",
    name: "CRM Style",
    description: "Highly readable layout using friendly sky-blue filters, clean structural columns, and metric telemetry panels.",
    colors: { primary: "#0EA5E9", secondary: "#4B5563", accent: "#0EA5E9", background: "#FFFFFF", text: "#1F2937" },
    typography: { heading: "Inter", body: "Inter" },
    characteristics: ["Sky blue highlights", "Friendly dashboard icons", "Fluid tables view"],
    preview: "linear-gradient(135deg, #FFFFFF 0%, #0EA5E9 100%)",
    designDna: {
      typography: { heading: "font-sans font-semibold text-slate-950", body: "font-sans text-slate-600 text-xs" },
      spacing: { padding: "p-6", gap: "gap-4", sectionPadding: "py-14" },
      animations: { duration: "duration-300" },
      buttons: { style: "bg-[#0EA5E9] text-white px-4 py-2 text-xs font-bold rounded-md", active: "active:scale-95" },
      cards: { style: "bg-white border border-slate-100 rounded-xl shadow-sm" },
      hoverEffects: { card: "hover:border-sky-300" },
      pageLayouts: { default: "Flexible client logs" }
    }
  },
  {
    id: "enterprise",
    name: "Enterprise Style",
    description: "Strict charcoal/navy premium dashboard built for large corporate compliance systems and robust data sets.",
    colors: { primary: "#0F172A", secondary: "#64748B", accent: "#0F172A", background: "#F8FAFC", text: "#0F172A" },
    typography: { heading: "Inter", body: "Inter" },
    characteristics: ["Navy compliance style", "Intense data structures", "Clean layouts grid"],
    preview: "linear-gradient(135deg, #F8FAFC 0%, #0F172A 100%)",
    designDna: {
      typography: { heading: "font-sans font-black text-slate-900", body: "font-sans text-slate-650 text-xs" },
      spacing: { padding: "p-6", gap: "gap-6", sectionPadding: "py-16" },
      animations: { duration: "duration-300" },
      buttons: { style: "bg-[#0F172A] text-white px-6 py-2.5 text-xs font-bold rounded-md", active: "active:scale-95" },
      cards: { style: "bg-white border border-slate-200 rounded-lg shadow-xs" },
      hoverEffects: { card: "hover:border-slate-350" },
      pageLayouts: { default: "Symmetric grid boxes" }
    }
  }
];

// Phase 2 - AI Tool Website Themes
export const aiToolThemes: DesignStyle[] = [
  {
    id: "openai-style",
    name: "OpenAI Style",
    description: "Extremely pristine minimalist styling, white grids, huge display serif titles, and fine borders.",
    colors: { primary: "#10A37F", secondary: "#202123", accent: "#10A37F", background: "#FFFFFF", text: "#202123" },
    typography: { heading: "Inter", body: "Inter" },
    characteristics: ["Teal accents", "OpenAI minimalist style", "Huge clear headers"],
    preview: "linear-gradient(135deg, #FFFFFF 0%, #10A37F 100%)",
    designDna: {
      typography: { heading: "font-sans font-bold text-black", body: "font-sans text-neutral-800 text-xs" },
      spacing: { padding: "p-6", gap: "gap-6", sectionPadding: "py-20" },
      animations: { duration: "duration-200" },
      buttons: { style: "bg-black text-white hover:bg-neutral-800 px-5 py-2.5 text-xs font-bold rounded-full", active: "active:scale-95" },
      cards: { style: "bg-white border border-neutral-100 rounded-2xl shadow-xs" },
      hoverEffects: { card: "hover:border-[#10A37F]" },
      pageLayouts: { default: "Clean columns grids" }
    }
  },
  {
    id: "minimal-ai",
    name: "Minimal AI Style",
    description: "Monochrome developer visual setup, standard code tags, dark slate background, and tiny highlights.",
    colors: { primary: "#FFFFFF", secondary: "#9CA3AF", accent: "#FFFFFF", background: "#0D0D0D", text: "#EDEDED" },
    typography: { heading: "Space Grotesk", body: "Inter" },
    characteristics: ["Pristine dark mode", "Mono text metrics", "Zero background noise"],
    preview: "linear-gradient(135deg, #0D0D0D 0%, #FFFFFF 100%)",
    designDna: {
      typography: { heading: "font-sans font-black text-white", body: "font-sans text-neutral-400 text-xs" },
      spacing: { padding: "p-6", gap: "gap-4", sectionPadding: "py-16" },
      animations: { duration: "duration-300" },
      buttons: { style: "bg-white text-black hover:bg-neutral-200 px-5 py-2 text-xs font-bold rounded-md", active: "active:scale-95" },
      cards: { style: "bg-neutral-900/60 border border-neutral-800 rounded-lg shadow-xl" },
      hoverEffects: { card: "hover:border-neutral-700" },
      pageLayouts: { default: "Carbon minimal layout" }
    }
  },
  {
    id: "future-tech",
    name: "Future Tech",
    description: "Vibrant neon-cyan outlines, deep void backgrounds, glowing visual blocks, and fluid tech panels.",
    colors: { primary: "#00F2FE", secondary: "#4FACFE", accent: "#00F2FE", background: "#020205", text: "#E2F1FF" },
    typography: { heading: "Syne", body: "Inter" },
    characteristics: ["Void black canvas", "Electric cyan outlines", "Cyberpunk telemetry"],
    preview: "linear-gradient(135deg, #020205 0%, #00F2FE 100%)",
    designDna: {
      typography: { heading: "font-sans font-black text-white", body: "font-sans text-neutral-400 text-xs" },
      spacing: { padding: "p-8", gap: "gap-8", sectionPadding: "py-24" },
      animations: { duration: "duration-300" },
      buttons: { style: "border border-[#00F2FE] bg-[#00F2FE]/10 text-white font-mono text-[9px] px-6 py-2.5 rounded-md hover:bg-[#00F2FE]", active: "active:scale-95" },
      cards: { style: "bg-gray-950/40 border border-neutral-900 rounded-xl backdrop-blur-md" },
      hoverEffects: { card: "hover:border-[#00F2FE]" },
      pageLayouts: { default: "Technical dashboard style" }
    }
  },
  {
    id: "productivity-ai",
    name: "Productivity AI",
    description: "Sleek and professional template with vibrant indigo details, glass panels, and modern Outfit styling.",
    colors: { primary: "#6366F1", secondary: "#4F46E5", accent: "#6366F1", background: "#FCFCFD", text: "#1F2937" },
    typography: { heading: "Outfit", body: "Inter" },
    characteristics: ["Indigo accents", "Polished white panels", "Optimal layout hierarchy"],
    preview: "linear-gradient(135deg, #FCFCFD 0%, #6366F1 100%)",
    designDna: {
      typography: { heading: "font-sans font-extrabold text-[#1F2937]", body: "font-sans text-slate-600 text-xs" },
      spacing: { padding: "p-6", gap: "gap-5", sectionPadding: "py-16" },
      animations: { duration: "duration-200" },
      buttons: { style: "rounded-xl bg-[#6366F1] text-white px-5 py-2.5 text-xs font-bold", active: "active:scale-98" },
      cards: { style: "bg-white border border-neutral-100 rounded-2xl shadow-sm" },
      hoverEffects: { card: "hover:shadow-md" },
      pageLayouts: { default: "Flexible grids layout" }
    }
  }
];

// Fallback Default Themes
export const defaultThemes: DesignStyle[] = [
  ...saasThemes.slice(0, 2),
  portfolioThemes[0], // Editorial Monochrome
  saasThemes[2], // Vercel
  mosqueThemes[0] // Islamic Modern
];

// Export all themes flattened if needed by old components
export const designStyles: DesignStyle[] = [
  ...portfolioThemes,
  ...resumeThemes,
  ...agencyThemes,
  ...bloggingThemes,
  ...saasThemes,
  ...restaurantThemes,
  ...footballThemes,
  ...mosqueThemes,
  ...businessThemes,
  ...startupThemes,
  ...saasDashboardThemes,
  ...aiToolThemes,
  ...coachingClassThemes,
  ...collegeThemes,
  ...gymThemes
];

export function getCategoryDesignStyles(categoryId: string | null): DesignStyle[] {
  if (!categoryId) return defaultThemes;
  
  if (categoryId === "portfolio") return portfolioThemes;
  if (categoryId === "resume-builder") return resumeThemes;
  if (categoryId === "agency") return agencyThemes;
  if (categoryId === "blogging") return bloggingThemes;
  
  if (categoryId === "business") return businessThemes;
  if (categoryId === "startup-landing") return startupThemes;
  if (categoryId === "saas-dashboard") return saasDashboardThemes;
  if (categoryId === "ai-tool") return aiToolThemes;
  
  if (categoryId === "restaurant") return restaurantThemes;
  if (categoryId === "football-academy") return footballThemes;
  if (categoryId === "mosque") return mosqueThemes;
  if (categoryId === "coaching-class") return coachingClassThemes;
  if (categoryId === "college") return collegeThemes;
  if (categoryId === "gym") return gymThemes;
  
  return defaultThemes;
}
