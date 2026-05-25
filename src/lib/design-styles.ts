import { DesignStyle } from "@/types/builder";

export const designStyles: DesignStyle[] = [
  {
    id: "monochrome",
    name: "Minimalist Monochrome",
    description: "Stark black & white editorial elegance, extreme serif headlines, zero borders radii, and clean geometric lines.",
    colors: { primary: "#000000", secondary: "#525252", accent: "#000000", background: "#FFFFFF", text: "#000000" },
    typography: { heading: "Playfair Display", body: "Source Serif 4" },
    characteristics: ["Pure black & white", "Playfair serif", "0px border radius", "Editorial grids"],
    preview: "linear-gradient(135deg, #FFFFFF 0%, #000000 100%)",
    designDna: {
      typography: {
        heading: "font-serif font-black uppercase tracking-tighter leading-none text-black",
        body: "font-serif font-medium text-neutral-800 text-sm leading-relaxed"
      },
      spacing: { padding: "p-8", gap: "gap-8", sectionPadding: "py-20" },
      animations: { duration: "duration-300 ease-out" },
      buttons: {
        style: "border-2 border-black bg-black text-white hover:bg-white hover:text-black font-mono text-[10px] tracking-widest px-6 py-2.5 rounded-none transition-all",
        active: "active:bg-neutral-100"
      },
      cards: { style: "border border-black bg-white rounded-none shadow-none" },
      hoverEffects: { card: "hover:bg-neutral-50 transition-colors" },
      pageLayouts: { default: "Rigid column frameworks, typographic headings prioritizing editorial hierarchy" }
    }
  },
  {
    id: "bauhaus",
    name: "Bauhaus Modern",
    description: "Form follows function constructive modernism with bold primary colors, thick rules, and Outfit geometry.",
    colors: { primary: "#D02020", secondary: "#1040C0", accent: "#F0C020", background: "#FFFFFF", text: "#121212" },
    typography: { heading: "Outfit", body: "Outfit" },
    characteristics: ["Primary Red/Blue/Yellow", "Thick 4px borders", "Offset 8px shadows", "Pure shapes grid"],
    preview: "linear-gradient(135deg, #D02020 0%, #F0C020 50%, #1040C0 100%)",
    designDna: {
      typography: {
        heading: "font-sans font-black uppercase tracking-tight leading-none text-black",
        body: "font-sans font-bold text-neutral-800 text-sm"
      },
      spacing: { padding: "p-6 sm:p-8", gap: "gap-6", sectionPadding: "py-16 md:py-24" },
      animations: { duration: "duration-100 ease-linear", spin: "animate-spin-slow" },
      buttons: {
        style: "border-4 border-black bg-[#F0C020] text-black font-black uppercase text-xs tracking-wide shadow-[4px_4px_0px_0px_#000] hover:bg-yellow-400 transition-all rounded-none",
        active: "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
      },
      cards: { style: "bg-white border-4 border-black shadow-[6px_6px_0px_0px_#000] rounded-none" },
      hoverEffects: { card: "hover:-translate-y-1.5 hover:shadow-[12px_12px_0px_0px_#000] duration-150 transition-all" },
      pageLayouts: { default: "Asymmetrical 60/40 layouts, diagonal thick borders, geometric shape blocks" }
    }
  },
  {
    id: "modern-dark",
    name: "Modern Dark",
    description: "Cinematic space-grade dark mode, layered translucent cards, soft indigo glow accents, and SF Pro precision.",
    colors: { primary: "#5E6AD2", secondary: "#8A8F98", accent: "#5E6AD2", background: "#050506", text: "#EDEDEF" },
    typography: { heading: "Inter", body: "Inter" },
    characteristics: ["Space black background", "Indigo neon glows", "Glassmorphic overlay", "Fine 1px borders"],
    preview: "linear-gradient(135deg, #050506 0%, #5E6AD2 100%)",
    designDna: {
      typography: {
        heading: "font-sans font-black tracking-tight text-[#EDEDEF]",
        body: "font-sans font-medium text-neutral-400 text-xs leading-relaxed"
      },
      spacing: { padding: "p-6", gap: "gap-4", sectionPadding: "py-16" },
      animations: { duration: "duration-300 ease-out" },
      buttons: {
        style: "border border-[#5E6AD2] bg-[#5E6AD2]/10 text-white font-mono text-[9px] tracking-widest hover:bg-[#5E6AD2] transition-all rounded-md px-5 py-2",
        active: "active:scale-95"
      },
      cards: { style: "bg-[#0a0a0c]/60 border border-neutral-800 rounded-lg shadow-xl backdrop-blur-md" },
      hoverEffects: { card: "hover:border-[#5E6AD2] hover:shadow-[0_0_15px_rgba(94,106,210,0.15)] transition-all" },
      pageLayouts: { default: "Translucent bento layouts, floating panels, cinematic dark layers" }
    }
  },
  {
    id: "newsprint",
    name: "Newsprint",
    description: "Tactile print journalism design with high information density, news columns, and warm paper textures.",
    colors: { primary: "#111111", secondary: "#5A5A57", accent: "#111111", background: "#F9F9F7", text: "#111111" },
    typography: { heading: "Newsreader", body: "Georgia" },
    characteristics: ["Newsprint Warm Paper bg", "0px sharp corners", "Explicit vertical lines", "Dense multi-columns"],
    preview: "linear-gradient(135deg, #F9F9F7 0%, #DCDCDA 100%)",
    designDna: {
      typography: {
        heading: "font-serif font-black italic tracking-tight text-neutral-900",
        body: "font-serif font-medium text-neutral-700 text-xs leading-relaxed"
      },
      spacing: { padding: "p-8", gap: "gap-8", sectionPadding: "py-20" },
      animations: { duration: "duration-300 ease-out" },
      buttons: {
        style: "border-b-2 border-black bg-transparent text-black px-1 py-1 font-bold text-[10px] tracking-wide hover:opacity-80 rounded-none",
        active: "active:translate-y-0.5"
      },
      cards: { style: "bg-[#F9F9F7] border border-black/10 rounded-none shadow-none" },
      hoverEffects: { card: "hover:bg-neutral-50 transition-colors" },
      pageLayouts: { default: "Split newspaper columns, visible horizontal dividing lines, dense grids" }
    }
  },
  {
    id: "saas",
    name: "SaaS Modern",
    description: "Electrifying electric blue gradients, high-tech card modules, premium soft shadows, and clean sans-serif layouts.",
    colors: { primary: "#0052FF", secondary: "#4D7CFF", accent: "#0052FF", background: "#FFFFFF", text: "#0F172A" },
    typography: { heading: "Inter", body: "Inter" },
    characteristics: ["Electric blue gradient", "Soft radial depth", "Rounded card modules", "Startup SaaS layout"],
    preview: "linear-gradient(135deg, #FFFFFF 0%, #0052FF 100%)",
    designDna: {
      typography: {
        heading: "font-sans font-black tracking-tight text-slate-900",
        body: "font-sans font-medium text-slate-600 text-sm"
      },
      spacing: { padding: "p-6", gap: "gap-4", sectionPadding: "py-12 md:py-20" },
      animations: { duration: "duration-200 ease-in-out" },
      buttons: {
        style: "rounded-md bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] text-white hover:opacity-90 transition-all font-bold text-xs px-5 py-2",
        active: "active:scale-98"
      },
      cards: { style: "bg-white border border-neutral-100 rounded-xl shadow-sm" },
      hoverEffects: { card: "hover:shadow-md hover:border-neutral-200 transition-all duration-200" },
      pageLayouts: { default: "Clean fluid spaces, large featured products cards, premium shadow depth" }
    }
  }
];
