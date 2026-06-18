"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import { DesignStyle } from "@/types/builder";
import { useBuilderStore } from "@/store/builder-store";
import {
  Monitor, Tablet, Smartphone, Globe, RefreshCw, Maximize2, Minimize2,
  ExternalLink, Mail, Check, Star, Menu, X, ChevronDown, ChevronUp, Zap, Sparkles,
  ArrowLeft
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ====================================================
// 🖼️ DUMMY GRAPHICS & THEME VISUAL SYSTEM
// ====================================================
interface VisualProps {
  type: "hero" | "card" | "content" | "avatar";
  themeId: string;
  index?: number;
}

interface SmartImageProps {
  src: string;
  alt: string;
  themeId: string;
  type: "hero" | "content" | "avatar";
  className?: string;
}

export function SmartPortraitImage({ src, alt, themeId, type, className = "" }: SmartImageProps) {
  const { brandBuilder } = useBuilderStore();
  const avatarUrl = brandBuilder?.avatarUrl || src;

  const getFilterClass = () => {
    switch (themeId) {
      case "monochrome":
        return "grayscale contrast-125 brightness-[0.98]";
      case "newsprint":
        return "sepia-[25%] contrast-[95%] saturate-[80%]";
      case "modern-dark":
        return "brightness-[0.92] contrast-[110%] saturate-[105%]";
      default:
        return "contrast-[102%] saturate-[102%]";
    }
  };

  return (
    <img
      src={avatarUrl}
      alt={alt}
      className={`w-full h-full object-cover ${getFilterClass()} ${className}`}
      style={{ objectPosition: "center 20%" }}
    />
  );
}

export function ThemeVisualPlaceholder({ type, themeId, index = 0 }: VisualProps) {
  const id = themeId.toLowerCase();

  // Map theme IDs to generated image paths
  let imageSrc = "";
  if (id.includes("monochrome") || id.includes("editorial") || id === "editorial-portfolio") {
    imageSrc = "/demo/portfolio-editorial.png";
  } else if (id.includes("luxury") || id === "luxury-designer") {
    imageSrc = "/demo/portfolio-designer.png";
  } else if (id.includes("stripe") || id.includes("saas-dashboard") || id.includes("dashboard-pro") || id.includes("ai-startup") || id.includes("linear") || id.includes("vercel")) {
    imageSrc = "/demo/saas-dashboard.png";
  } else if (id.includes("fine-dining") || id.includes("restaurant") || id.includes("cafe") || id.includes("street-food")) {
    imageSrc = "/demo/restaurant-interior.png";
  } else if (id.includes("football") || id.includes("sports-club") || id.includes("academy") || id.includes("athletic") || id.includes("elite-club")) {
    imageSrc = "/demo/football-academy.png";
  } else if (id.includes("mosque") || id.includes("islamic") || id.includes("arabic") || id.includes("community")) {
    imageSrc = "/demo/mosque-exterior.png";
  } else if (id.includes("coaching") || id.includes("exams") || id.includes("institute")) {
    imageSrc = "/demo/coaching_hero_demo.png";
  } else if (id.includes("college") || id.includes("university") || id.includes("campus")) {
    imageSrc = "/demo/college_hero_demo.png";
  } else if (id.includes("gym") || id.includes("fitness") || id.includes("bodybuilding")) {
    imageSrc = "/demo/gym_hero_demo.png";
  } else {
    imageSrc = "/mubashir.jpeg";
  }

  const borderStyle = id.includes("brutalist") || id.includes("street-food") || id.includes("academy-pro")
    ? "border-4 border-black shadow-[4px_4px_0px_0px_#000]"
    : id.includes("luxury") || id.includes("fine-dining") || id.includes("arabic-premium")
    ? "border border-amber-400"
    : "border border-zinc-800 rounded-lg";

  return (
    <div className={`w-full h-full relative overflow-hidden bg-neutral-900 flex items-center justify-center ${borderStyle}`}>
      <img
        src={imageSrc}
        alt="Visual Preview"
        className="w-full h-full object-cover select-none"
      />
      <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors duration-300" />
      
      {/* Decorative layout overlay based on archetype */}
      {id.includes("brutalist") && (
        <div className="absolute top-2 left-2 bg-[#FFD93D] text-black text-[7px] font-black uppercase px-1.5 py-0.5 border border-black shadow-[1px_1px_0px_0px_#000]">
          RAW_LIVE_VIEW
        </div>
      )}
      {id.includes("monochrome") && (
        <div className="absolute bottom-2 left-2 bg-black text-white text-[7px] font-serif uppercase px-2 py-0.5">
          Editorial Plate
        </div>
      )}
      {id.includes("luxury") && (
        <div className="absolute top-2 right-2 border border-amber-400 bg-black/80 text-amber-300 text-[6.5px] font-mono uppercase px-2 py-0.5 tracking-wider">
          LUXE
        </div>
      )}
    </div>
  );
}

// ====================================================
// 📱 MAIN COMPONENT OVERHAUL
// ====================================================
interface ThemePreviewProps {
  style: DesignStyle;
  device: "desktop" | "tablet" | "mobile";
  setDevice: (device: "desktop" | "tablet" | "mobile") => void;
  isStandalone?: boolean;
}

const renderSocialIcon = (id: string) => {
  const iconClass = "w-3 h-3 stroke-[2.5px] shrink-0 fill-none text-current";
  const solidIconClass = "w-3 h-3 shrink-0 fill-current text-current";

  switch (id.toLowerCase()) {
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      );
    case "x":
    case "twitter":
      return (
        <svg viewBox="0 0 24 24" className={solidIconClass}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" fill="currentColor" />
        </svg>
      );
    case "github":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
          <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" />
        </svg>
      );
    case "dribbble":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
          <path d="M21.75 12.84c-6.62-1.41-12.15 1-14.88 6.65" />
          <path d="M5.16 19.17c3.73-8.87 11-12.63 16.59-13.78" />
        </svg>
      );
    case "behance":
      return (
        <svg viewBox="0 0 24 24" className={solidIconClass}>
          <path d="M22 12c0-3-2-4.5-4.5-4.5S13 9 13 12.5s2 4.5 4.5 4.5S22 15.5 22 12zm-4.5 2.5c-.8 0-1.5-.4-1.5-1.5h3c0 1.1-.7 1.5-1.5 1.5zm0-4c.7 0 1.3.4 1.3 1.2h-2.6c0-.8.6-1.2 1.3-1.2zM9 13c0 1.7-1.3 2-3.3 2H2V7h3.7c1.7 0 3 .5 3 2 0 1-.7 1.5-1.5 1.7.9.3 1.8.8 1.8 2.3zm-5-4v2h1.5c.7 0 1-.2 1-1s-.3-1-1-1H4zm0 3.5v2h1.7c.7 0 1.1-.3 1.1-1s-.4-1-1.1-1H4zM15 6h5v1h-5z" />
        </svg>
      );
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      );
    case "discord":
      return (
        <svg viewBox="0 0 127.14 96.36" className={solidIconClass}>
          <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.43-5c.87-.64,1.72-1.32,2.53-2a75.76,75.76,0,0,0,72.63,0c.81.71,1.66,1.39,2.53,2a68.43,68.43,0,0,1-10.43,5,77.7,77.7,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31-18.83C129.87,48.24,123.63,25.41,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      );
    case "telegram":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" x2="11" y1="2" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className={iconClass} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" x2="22" y1="12" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      );
  }
};

export function ThemePreview({ style, device, setDevice, isStandalone = false }: ThemePreviewProps) {
  const { selectedCategory, selectedSections, websiteContent, resumeData, activeSocials, currentStep, prevStep } = useBuilderStore();
  const isPortfolio = selectedCategory?.id === "portfolio";

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [modalDevice, setModalDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Interactive simulator states
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [emailInput, setEmailInput] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [activePricingTier, setActivePricingTier] = useState<"starter" | "pro" | "enterprise">("pro");
  const [dashboardTab, setDashboardTab] = useState<"overview" | "analytics" | "reports" | "settings">("overview");
  const [aiPromptInput, setAiPromptInput] = useState("Explain Next.js 16 compiler optimization paths...");
  const [aiPromptResult, setAiPromptResult] = useState("Response: Next.js 16 leverages an AST telemetry engine combined with incremental Rust parsing grids...");

  // Dynamic Simulator ResizeObserver and Zoom/Scale states
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(800);
  const [zoomScale, setZoomScale] = useState<number>(0.75);
  const [isAutoFit, setIsAutoFit] = useState<boolean>(true);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Dynamic window sizing detection for auto-fitting scaling factor calculations
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [isFullscreen]);

  // Lock body scroll when fullscreen is active
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFullscreen]);

  // Support ESC key to exit fullscreen mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const triggerRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setIsSubscribed(false);
      setEmailInput("");
    }, 2000);
  };

  // Theme-specific CSS classes based on visual DNA system
  const getThemeClasses = () => {
    const id = style.id.toLowerCase();
    
    // Archetype 1: Brutalist (Heavy borders, offset shadows, bold fonts, neon details)
    if (
      id.includes("brutalist") || 
      id.includes("street-food") || 
      id.includes("academy-pro") || 
      id.includes("bauhaus")
    ) {
      return {
        archetype: "brutalist",
        canvas: "bg-white text-black font-sans relative overflow-hidden transition-all duration-300",
        navbar: "border-4 border-black p-4 bg-white flex justify-between items-center mx-4 my-3 rounded-none shadow-[3px_3px_0px_0px_#000]",
        logo: "font-sans font-black uppercase tracking-tight text-xs bg-[#FFD93D] text-black px-2.5 py-1 border-2 border-black",
        navLinks: "hidden md:flex gap-6 items-center",
        navLink: "text-[10px] font-black uppercase text-black hover:underline cursor-pointer",
        navBtn: "hidden md:inline-block px-4 py-1.5 bg-white text-black font-black uppercase text-[10px] border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:bg-neutral-50 active:translate-y-0.5 active:shadow-none",
        mobileMenuBtn: "p-1 text-black",
        mobileMenuOverlay: "border-4 border-black bg-white p-6 space-y-4 flex flex-col font-black text-xs uppercase relative z-50 text-black shadow-[4px_4px_0px_0px_#000]",
        hero: "border-4 border-black bg-white mx-4 my-3 shadow-[6px_6px_0px_0px_#000] rounded-none p-6",
        badge: "inline-block px-2.5 py-0.5 bg-black text-white font-mono uppercase tracking-widest text-[8px] font-black",
        h1: "font-sans font-black uppercase tracking-tight leading-none text-black",
        h1Span: "text-neutral-700 block mt-1 font-black",
        lead: "font-bold text-neutral-800 leading-relaxed",
        btnGroup: "flex flex-wrap gap-3",
        btnPrimary: "px-5 py-2.5 border-4 border-black text-black font-black uppercase tracking-wide transition-all rounded-none shadow-[3px_3px_0px_0px_#000] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-none",
        btnSecondary: "px-5 py-2.5 border-4 border-black bg-white text-black font-black uppercase tracking-wide shadow-[3px_3px_0px_0px_#000] hover:bg-neutral-100 rounded-none",
        heroVisual: "border-4 border-black bg-white p-0 overflow-hidden flex items-center justify-center shadow-[4px_4px_0px_0px_#000]",
        statsSec: "bg-white border-4 border-black mx-4 shadow-[4px_4px_0px_0px_#000] text-center",
        statNum: "font-black text-black tracking-tight block",
        statLabel: "font-sans font-black uppercase text-black block",
        featuresSec: "space-y-8",
        card: "border-4 border-black bg-white p-5 shadow-[4px_4px_0px_0px_#000] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#000] transition-all rounded-none space-y-2",
        cardTitle: "font-sans font-black uppercase text-[11px] text-black tracking-tight",
        cardDesc: "text-[11px] font-bold text-neutral-700 leading-normal",
        contentSec: "mx-4 my-3 border-4 border-black bg-white shadow-[4px_4px_0px_0px_#000]",
        contentTag: "text-[8px] font-black uppercase text-black tracking-wider block",
        contentH: "font-black uppercase tracking-tight text-black",
        contentBody: "font-bold text-neutral-800 leading-relaxed space-y-3",
        contentVisual: "border-4 border-black bg-white h-52 overflow-hidden flex flex-col justify-between p-0 shadow-[4px_4px_0px_0px_#000]",
        pricingSec: "mx-4 my-3 border-4 border-black bg-white text-center space-y-8 shadow-[6px_6px_0px_0px_#000]",
        priceCard: "border-4 border-black p-5 text-left rounded-none space-y-3 shadow-[3px_3px_0px_0px_#000] cursor-pointer transition-all bg-white",
        priceTitle: "font-sans font-black uppercase text-[10px] tracking-wide",
        priceNum: "font-black text-black tracking-tight",
        priceBtn: "w-full py-2.5 border-4 border-black text-black font-black uppercase tracking-wide shadow-[2px_2px_0px_0px_#000]",
        faqSec: "mx-4 border-4 border-black bg-white shadow-[4px_4px_0px_0px_#000] space-y-6",
        faqItem: "border-2 border-black p-4 bg-white shadow-[2px_2px_0px_0px_#000]",
        faqQ: "flex justify-between items-center cursor-pointer font-black uppercase tracking-wider text-black",
        faqA: "text-[11px] font-bold text-neutral-700 leading-relaxed pt-2.5 pl-1",
        ctaSec: "mx-4 my-4 border-4 border-black bg-white shadow-[4px_4px_0px_0px_#000] text-center space-y-4",
        input: "border-4 border-black p-1.5 text-xs font-bold bg-white focus:outline-none placeholder-black/40 rounded-none",
        footer: "border-t-4 border-black p-5 flex flex-col justify-between items-center gap-4 text-[9px] font-black uppercase text-black bg-white"
      };
    }

    // Archetype 2: Editorial / Luxury / Serif (Elegant margins, thin outlines, serif pairs)
    if (
      id.includes("monochrome") || 
      id.includes("luxury") || 
      id.includes("fine-dining") || 
      id.includes("arabic-premium") || 
      id.includes("vercel") || 
      id.includes("newsprint")
    ) {
      return {
        archetype: "editorial",
        canvas: "bg-white text-black font-serif relative overflow-hidden transition-all duration-300",
        navbar: "border-b border-black py-4 px-6 flex justify-between items-center bg-white",
        logo: "font-serif font-black uppercase tracking-tighter text-sm bg-black text-white px-2 py-0.5",
        navLinks: "hidden md:flex gap-6 items-center",
        navLink: "text-[10px] font-bold uppercase text-black hover:underline tracking-wider cursor-pointer",
        navBtn: "hidden md:inline-block px-4 py-1.5 bg-black text-white font-mono uppercase text-[9px] border border-black hover:bg-white hover:text-black transition-colors rounded-none",
        mobileMenuBtn: "p-1 text-black",
        mobileMenuOverlay: "border-b border-black bg-white p-6 space-y-4 flex flex-col font-bold text-xs uppercase relative z-50",
        hero: "border-b border-black bg-white",
        badge: "inline-block px-3 py-0.5 bg-black text-white font-mono uppercase tracking-widest text-[8px]",
        h1: "font-black uppercase tracking-tighter leading-none text-black",
        h1Span: "underline decoration-2 underline-offset-4 block mt-1 font-normal italic lowercase",
        lead: "text-neutral-800 leading-relaxed",
        btnGroup: "flex flex-wrap gap-3",
        btnPrimary: "px-5 py-2.5 bg-black text-white font-mono uppercase tracking-wider border border-black hover:bg-white hover:text-black transition-colors rounded-none",
        btnSecondary: "px-5 py-2.5 border border-black bg-white text-black font-mono uppercase tracking-wider hover:bg-black hover:text-white transition-colors rounded-none",
        heroVisual: "border border-black p-0 overflow-hidden flex flex-col justify-center items-center bg-[#F5F5F5] font-mono text-[9px] uppercase",
        statsSec: "bg-white border-b border-black text-center",
        statNum: "font-black tracking-tighter border-b border-black/10 pb-1 inline-block",
        statLabel: "font-mono uppercase tracking-widest text-neutral-500 block pt-1",
        featuresSec: "border-b border-black bg-white space-y-8",
        card: "border border-black bg-white p-6 space-y-3 rounded-none shadow-none hover:bg-[#F5F5F5] transition-colors",
        cardTitle: "font-serif font-black uppercase text-xs text-black border-b border-black/10 pb-1.5",
        cardDesc: "text-[11px] text-neutral-700 leading-relaxed",
        contentSec: "border-b border-black bg-[#F5F5F5]",
        contentTag: "text-[8px] font-mono text-neutral-500 uppercase tracking-widest block",
        contentH: "font-black uppercase tracking-tight text-black font-serif",
        contentBody: "leading-relaxed space-y-3",
        contentVisual: "border border-black bg-white p-0 overflow-hidden h-52 flex flex-col justify-between font-serif italic text-sm text-neutral-800",
        pricingSec: "bg-white border-b border-black text-center space-y-8",
        priceCard: "border border-black p-6 rounded-none text-left space-y-4 cursor-pointer transition-all",
        priceTitle: "font-serif font-black uppercase text-xs tracking-wider",
        priceNum: "tracking-tight font-black",
        priceBtn: "w-full py-2 bg-black text-white font-mono uppercase text-[9.5px] tracking-wider border border-black hover:bg-white hover:text-black transition-colors rounded-none",
        faqSec: "bg-white border-b border-black space-y-8 max-w-3xl mx-auto",
        faqItem: "border-b border-black py-4",
        faqQ: "flex justify-between items-center cursor-pointer font-bold uppercase tracking-wide",
        faqA: "text-[11px] text-neutral-700 leading-relaxed pt-2.5 pl-1.5",
        ctaSec: "bg-[#F5F5F5] text-center space-y-4 border-b border-black",
        input: "border border-black p-2 text-xs font-mono bg-white focus:outline-none placeholder-neutral-400 rounded-none",
        footer: "grid gap-6 text-[10px] font-mono uppercase text-neutral-500 rounded-none bg-white"
      };
    }

    // Archetype 3: Modern SaaS (Default - clean borders, rounded styles, elegant gradients)
    return {
      archetype: "modern",
      canvas: "bg-white text-slate-900 font-sans relative overflow-hidden transition-all duration-300",
      navbar: "border-b border-slate-100 py-3.5 px-5 flex justify-between items-center bg-white",
      logo: "font-sans font-black tracking-tight text-xs text-black",
      navLinks: "hidden md:flex gap-6 items-center",
      navLink: "text-[9.5px] font-bold text-slate-500 hover:text-black transition-colors cursor-pointer",
      navBtn: "hidden md:inline-block px-4 py-1.5 bg-blue-600 text-white font-bold text-[9px] rounded-lg hover:opacity-90 transition-all",
      mobileMenuBtn: "p-1 text-slate-500 hover:text-black",
      mobileMenuOverlay: "border-b border-slate-100 bg-white p-6 space-y-4 flex flex-col font-bold text-xs uppercase relative z-50 text-slate-600",
      hero: "border border-slate-100 bg-slate-50/20 mx-4 my-3 rounded-2xl shadow-sm",
      badge: "inline-block px-2.5 py-0.5 bg-blue-50 text-blue-600 rounded-full font-bold text-[8px]",
      h1: "font-sans font-black tracking-tight text-slate-900 leading-tight",
      h1Span: "text-blue-600 block mt-1",
      lead: "text-slate-500 leading-relaxed",
      btnGroup: "flex flex-wrap gap-3",
      btnPrimary: "px-5 py-2.5 bg-blue-600 text-white font-bold tracking-wide rounded-lg hover:opacity-90 shadow-sm shadow-blue-500/10 active:scale-[0.98]",
      btnSecondary: "px-5 py-2.5 border border-slate-200 bg-white text-slate-600 font-bold tracking-wide rounded-lg hover:bg-slate-50 transition-colors",
      heroVisual: "bg-slate-50 border border-slate-150 p-0 overflow-hidden rounded-2xl shadow-inner flex items-center justify-center",
      statsSec: "bg-white border-y border-slate-100 text-center",
      statNum: "font-black text-slate-900 tracking-tight block",
      statLabel: "text-[9px] font-bold text-slate-400 uppercase tracking-widest block",
      featuresSec: "space-y-8",
      card: "bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-200 transition-all space-y-2.5",
      cardTitle: "font-sans font-black text-[11px] text-slate-900 tracking-tight",
      cardDesc: "text-[11px] text-slate-500 leading-relaxed",
      contentSec: "border border-slate-100 bg-slate-50/30 rounded-2xl mx-4",
      contentTag: "text-[8px] font-bold uppercase text-blue-600 tracking-wider block",
      contentH: "font-black tracking-tight text-slate-900",
      contentBody: "text-slate-550 leading-relaxed space-y-3",
      contentVisual: "bg-white border border-slate-150 p-0 overflow-hidden h-52 rounded-2xl shadow-sm flex flex-col justify-between",
      pricingSec: "mx-4 my-3 border border-slate-100 bg-slate-50/50 rounded-2xl text-center space-y-6",
      priceCard: "bg-white border border-slate-200 p-5 text-left rounded-xl space-y-3 cursor-pointer transition-all hover:border-blue-500",
      priceTitle: "font-sans font-bold text-[10px] text-slate-400 uppercase tracking-wider",
      priceNum: "font-black text-slate-900 tracking-tight",
      priceBtn: "w-full py-2 bg-blue-600 text-white font-bold rounded-lg",
      faqSec: "border border-slate-100 bg-white rounded-2xl max-w-2xl mx-auto space-y-6",
      faqItem: "border-b border-slate-100 pb-4",
      faqQ: "flex justify-between items-center cursor-pointer font-bold uppercase tracking-wider text-slate-900",
      faqA: "text-[11px] text-slate-555 leading-relaxed pt-2.5 pl-1",
      ctaSec: "mx-4 my-3 border border-slate-100 bg-slate-50/30 rounded-2xl text-center space-y-4",
      input: "border border-slate-200 rounded-lg p-1.5 text-xs focus:outline-none focus:border-blue-600",
      footer: "border-t border-slate-100 p-5 flex flex-col justify-between items-center gap-4 text-[9px] font-bold text-slate-400 bg-white"
    };
  };

  const css = getThemeClasses();

  // Active device widths
  const activeDeviceWidth = device === "desktop" ? 1440 : device === "tablet" ? 768 : 390;
  const activeModalDeviceWidth = modalDevice === "desktop" ? 1440 : modalDevice === "tablet" ? 768 : 390;

  // Auto-fit calculations for workspace panel
  const autoFitScale = useMemo(() => {
    const pad = 48;
    const scaleFactor = (containerWidth - pad) / activeDeviceWidth;
    return Math.min(Math.max(scaleFactor, 0.15), 1.25);
  }, [containerWidth, activeDeviceWidth]);

  // Auto-fit calculations for fullscreen modal (workbench canvas width)
  const autoFitModalScale = useMemo(() => {
    const pad = 96;
    const scaleFactor = (windowSize.width - pad) / activeModalDeviceWidth;
    return Math.min(Math.max(scaleFactor, 0.15), 1.25);
  }, [windowSize.width, activeModalDeviceWidth]);

  const activeScale = isAutoFit ? autoFitScale : zoomScale;
  const activeModalScale = isAutoFit ? autoFitModalScale : zoomScale;

  // Fully styled website sections components with custom responsive simulator state logic
  const renderWebsiteSections = (isModal: boolean, currentDev: "desktop" | "tablet" | "mobile") => {
    const isMobile = currentDev === "mobile";
    const isTablet = currentDev === "tablet";

    const categoryId = selectedCategory?.id || "";
    const styleId = style.id;

    // --- PORTFOLIO CATEGORY RENDERING ---
    // Sequence: Navbar → Hero → About → Skills → Projects → Experience → Testimonials → Contact → Footer
    if (categoryId === "portfolio") {
      if (styleId === "editorial-portfolio") {
        return (
          <div className="font-serif bg-white text-black p-8 space-y-20 min-h-full">
            {/* Navbar */}
            <div className="border-b border-black pb-4 flex justify-between items-center text-xs tracking-widest font-mono">
              <span className="font-black uppercase">{websiteContent.about.title || "MUBASHIR"} // VOLUME I</span>
              <div className="hidden md:flex gap-6 uppercase tracking-wider text-[10px]">
                <span>Home</span>
                <span>About</span>
                <span>Skills</span>
                <span>Projects</span>
                <span>Experience</span>
                <span>Testimonials</span>
                <span>Contact</span>
              </div>
              <span>EST. 2026</span>
            </div>

            {/* Hero */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center py-8">
              <div className="md:col-span-7 space-y-6 text-left">
                <span className="px-2 py-0.5 bg-black text-white text-[8px] font-mono tracking-widest uppercase">
                  MONOCHROME ART
                </span>
                <h1 className="text-5xl md:text-7xl font-serif font-black tracking-tighter leading-none uppercase text-left">
                  {websiteContent.hero.headline || "Visual Architect & Design Director"}
                </h1>
                <p className="text-sm font-sans text-neutral-600 leading-relaxed max-w-lg">
                  {websiteContent.hero.subheadline || "A meticulous approach to designing neobrutalist responsive website layouts and developer prompt schemas."}
                </p>
                <div className="flex gap-4 font-mono text-xs pt-4">
                  <span className="underline cursor-pointer tracking-widest uppercase">{websiteContent.hero.ctaText || "VIEW CASE STUDIES"}</span>
                  <span className="text-neutral-450">//</span>
                  <span className="underline cursor-pointer tracking-widest uppercase">{websiteContent.hero.secondaryCtaText || "GET IN TOUCH"}</span>
                </div>
              </div>
              <div className="md:col-span-5 border border-black p-1 bg-white">
                <div className="h-72 w-full overflow-hidden bg-neutral-100">
                  <img src="/demo/portfolio-editorial.png" alt="Editorial" className="w-full h-full object-cover filter grayscale" />
                </div>
              </div>
            </div>

            {/* About */}
            <div className="border-t border-black pt-16 grid grid-cols-1 md:grid-cols-12 gap-8 text-left">
              <div className="md:col-span-4">
                <h2 className="text-xs uppercase tracking-widest font-mono text-neutral-500">01 // THE STORY</h2>
              </div>
              <div className="md:col-span-8 space-y-6">
                <h3 className="text-3xl font-serif italic tracking-tight">{websiteContent.about.title || "Crafting experiences with strict geometry."}</h3>
                <p className="text-sm text-neutral-600 font-sans leading-relaxed">
                  {websiteContent.about.description || "With a decade of experience designing and engineering pristine web artifacts, I bridge high-fidelity aesthetics with high-performance code, ensuring every project is delivered natively and cleanly."}
                </p>
              </div>
            </div>

            {/* Skills */}
            <div className="border-t border-black pt-16 grid grid-cols-1 md:grid-cols-12 gap-8 text-left">
              <div className="md:col-span-4">
                <h2 className="text-xs uppercase tracking-widest font-mono text-neutral-500">02 // SKILL SET</h2>
              </div>
              <div className="md:col-span-8">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 font-mono text-xs">
                  {(resumeData?.skills || ["UI/UX Engineering", "Next.js & React", "TypeScript Architect", "Neobrutalism Design", "Tailwind Variables", "AST Telemetry"]).map((skill, idx) => (
                    <div key={idx} className="border-b border-black/10 pb-2">
                      <span className="text-neutral-400 mr-2">/0{idx + 1}</span> {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Projects */}
            <div className="border-t border-black pt-16 grid grid-cols-1 md:grid-cols-12 gap-8 text-left">
              <div className="md:col-span-4">
                <h2 className="text-xs uppercase tracking-widest font-mono text-neutral-500">03 // SELECTED WORKS</h2>
              </div>
              <div className="md:col-span-8 space-y-12">
                {(resumeData?.projects || [
                  { title: "Mubix Prompts App", description: "Design studio and website blueprint planner tool." },
                  { title: "Aesthetic Sandbox Generator", description: "Framer-like interactive visual simulator." }
                ]).map((proj, idx) => (
                  <div key={idx} className="group border-b border-black pb-8 space-y-3">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-2xl font-serif font-black uppercase tracking-tight">{proj.title}</h3>
                      <span className="font-mono text-xs text-neutral-400">0{idx + 1}</span>
                    </div>
                    <p className="text-sm text-neutral-600 font-sans">{proj.description}</p>
                    <div className="pt-2 text-xs font-mono underline cursor-pointer uppercase">View Details</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="border-t border-black pt-16 grid grid-cols-1 md:grid-cols-12 gap-8 text-left">
              <div className="md:col-span-4">
                <h2 className="text-xs uppercase tracking-widest font-mono text-neutral-500">04 // TIMELINE</h2>
              </div>
              <div className="md:col-span-8 space-y-8">
                {(resumeData?.companies || [
                  { name: "Mubix Systems", role: "Principal Design Engineer", duration: "2024 - Present" },
                  { name: "Aesthetic Core Lab", role: "Senior Frontend Lead", duration: "2022 - 2024" }
                ]).map((job, idx) => (
                  <div key={idx} className="flex justify-between items-start border-b border-black/10 pb-4">
                    <div>
                      <h4 className="font-bold font-serif text-lg">{job.role}</h4>
                      <span className="text-xs font-mono text-neutral-550">{job.name}</span>
                    </div>
                    <span className="font-mono text-xs bg-neutral-100 px-2 py-0.5">{job.duration}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div className="border-t border-black pt-16 text-center max-w-xl mx-auto space-y-6">
              <span className="font-mono text-[8px] uppercase tracking-widest text-neutral-400">05 // FEEDBACK</span>
              <p className="text-xl font-serif italic text-neutral-800">
                "Mohammed has a pristine eye for asymmetrical layouts, zero radii components, and stark black-white editorial perfection."
              </p>
              <span className="block font-mono text-xs uppercase tracking-widest">— Alex Rivera, Design Director at Vercel Labs</span>
            </div>

            {/* Contact */}
            <div className="border-t border-black pt-16 max-w-xl mx-auto space-y-8 text-left">
              <h2 className="text-3xl font-serif uppercase tracking-tight text-center">Let's craft the next blueprint</h2>
              <div className="flex flex-col gap-4">
                <input type="text" placeholder="YOUR NAME" className="border-b border-black py-2 text-xs font-mono uppercase bg-transparent outline-none focus:border-neutral-500" />
                <input type="email" placeholder="EMAIL ADDRESS" className="border-b border-black py-2 text-xs font-mono uppercase bg-transparent outline-none focus:border-neutral-500" />
                <textarea placeholder="PROJECT OUTLINE" rows={3} className="border-b border-black py-2 text-xs font-mono uppercase bg-transparent outline-none focus:border-neutral-500 resize-none" />
                <button className="bg-black text-white hover:bg-neutral-800 text-xs font-mono uppercase tracking-widest py-3 mt-4">
                  SUBMIT ENGAGEMENT
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t-2 border-black pt-8 flex flex-col md:flex-row justify-between items-start text-xs font-mono text-neutral-500 gap-4">
              <span>© 2026 MUBASHIR DESIGN. SHIPPED NATIVELY.</span>
              <div className="flex gap-4 uppercase">
                <span>Github</span>
                <span>Twitter</span>
                <span>LinkedIn</span>
              </div>
            </div>
          </div>
        );
      }

      if (styleId === "brutalist-portfolio") {
        return (
          <div className="font-mono bg-[#FFFDF5] text-black p-6 space-y-20 border-4 border-black min-h-full">
            {/* Navbar */}
            <div className="border-4 border-black bg-white p-4 flex justify-between items-center shadow-[3px_3px_0px_0px_#000]">
              <span className="font-sans font-black uppercase tracking-tight text-sm bg-[#FFD93D] px-2 py-0.5 border-2 border-black">
                {websiteContent.about.title || "MUBASHIR"} // DEV
              </span>
              <div className="hidden md:flex gap-4 text-xs font-black uppercase">
                <span>Home</span>
                <span>About</span>
                <span>Skills</span>
                <span>Projects</span>
                <span>Contact</span>
              </div>
              <span className="font-bold text-xs uppercase bg-black text-[#FFD93D] px-2 py-0.5">WORK.EXE</span>
            </div>

            {/* Hero */}
            <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_#000] grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-4 text-left">
                <span className="px-2 py-0.5 bg-black text-white text-[8px] font-black uppercase tracking-widest">
                  BRUTALIST ARCHETYPE
                </span>
                <h1 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-tighter leading-none text-black text-left">
                  {websiteContent.hero.headline || "Mohammed Mubashir — UI/UX Architect"}
                </h1>
                <p className="text-xs font-bold text-neutral-700 leading-relaxed">
                  {websiteContent.hero.subheadline || "Building ultra-high contrast web layouts with offset shadows and neobrutalist components."}
                </p>
                <div className="flex flex-wrap gap-3 pt-4">
                  <button className="px-5 py-2 border-4 border-black bg-[#FFD93D] font-black text-xs uppercase tracking-wide shadow-[3px_3px_0px_0px_#000] hover:bg-yellow-400 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
                    {websiteContent.hero.ctaText || "VIEW WORK"}
                  </button>
                  <button className="px-5 py-2 border-4 border-black bg-white font-black text-xs uppercase tracking-wide shadow-[3px_3px_0px_0px_#000] hover:bg-neutral-100 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
                    {websiteContent.hero.secondaryCtaText || "HIRE ME"}
                  </button>
                </div>
              </div>
              <div className="border-4 border-black h-64 overflow-hidden relative shadow-[4px_4px_0px_0px_#000] bg-neutral-100">
                <img src="/demo/portfolio-editorial.png" alt="Editorial Graphic" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* About */}
            <div className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_#000] space-y-4 text-left">
              <h2 className="text-xl font-sans font-black bg-black text-white px-3 py-1 inline-block uppercase">ABOUT THE SYSTEM //</h2>
              <p className="text-xs font-bold leading-relaxed text-neutral-750">
                {websiteContent.about.description || "A rigorous neobrutalist developer archetype built to optimize layouts natively without bloating dependencies. High contrast variables, thick rules, and pure layout asymmetry."}
              </p>
            </div>

            {/* Skills */}
            <div className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_#000] space-y-4 text-left">
              <h2 className="text-xl font-sans font-black bg-[#FF6B6B] text-black px-3 py-1 inline-block uppercase">TECH_CAPABILITIES //</h2>
              <div className="flex flex-wrap gap-2 pt-2">
                {(resumeData?.skills || ["React Engine", "Typescript", "AST Telemetry", "Next.js", "Zustand Core"]).map((skill, idx) => (
                  <span key={idx} className="border-2 border-black bg-white px-3 py-1 text-xs font-black shadow-[2px_2px_0px_0px_#000]">
                    {skill.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div className="space-y-6 text-left">
              <h2 className="font-sans font-black uppercase text-xl text-black">BENTO WORKS //</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
                {(resumeData?.projects || [
                  { title: "Blueprint Planner", description: "Unified website generation sandbox." },
                  { title: "OS Lite Builder", description: "Futuristic system controller mockup tool." },
                  { title: "Monochrome Portfolio", description: "Ultra-minimal editorial design portfolio." }
                ]).map((proj, idx) => (
                  <div key={idx} className="border-4 border-black bg-white p-5 shadow-[4px_4px_0px_0px_#000] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#000] transition-all space-y-2 text-left">
                    <span className="text-[8px] font-black uppercase bg-black text-white px-1.5 py-0.5">PROJECT 0{idx + 1}</span>
                    <h3 className="font-sans font-black uppercase text-sm text-left">{proj.title}</h3>
                    <p className="text-[10px] font-bold text-neutral-600 text-left">{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_#000] space-y-4 text-left">
              <h2 className="text-xl font-sans font-black bg-black text-white px-3 py-1 inline-block uppercase">EXPERIENCE_LOG //</h2>
              <div className="space-y-4">
                {(resumeData?.companies || [
                  { name: "Mubix Systems", role: "Principal Design Engineer", duration: "2024 - Present" },
                  { name: "Aesthetic Core Lab", role: "Senior Frontend Lead", duration: "2022 - 2024" }
                ]).map((job, idx) => (
                  <div key={idx} className="border-2 border-black p-3 bg-neutral-50 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div>
                      <span className="text-xs font-black uppercase block">{job.role}</span>
                      <span className="text-[9px] font-bold text-neutral-500 uppercase">{job.name}</span>
                    </div>
                    <span className="text-[9px] font-black px-2 py-0.5 bg-[#FFD93D] border-2 border-black mt-2 sm:mt-0">{job.duration}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div className="border-4 border-black bg-[#FFD93D] p-6 shadow-[5px_5px_0px_0px_#000] text-center space-y-3">
              <span className="text-[8px] font-black uppercase bg-black text-white px-2 py-0.5">TELEMETRY_LOG</span>
              <p className="text-sm font-black text-black">
                "HIGH ENERGY DESIGNS, ULTRA-STABLE AST LOGS, AND MASSIVE OFFSET SHADOWS."
              </p>
              <span className="block text-[10px] font-bold uppercase">— Technical Director at Figma Labs</span>
            </div>

            {/* Contact */}
            <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_#000] max-w-xl mx-auto space-y-4 text-left">
              <h3 className="font-sans font-black uppercase text-lg text-center">INITIATE CONNECTION //</h3>
              <input type="text" placeholder="NAME_ENTRY" className="w-full border-4 border-black p-2 text-xs font-black uppercase bg-white outline-none focus:bg-neutral-50" />
              <input type="email" placeholder="EMAIL_REGISTRY" className="w-full border-4 border-black p-2 text-xs font-black uppercase bg-white outline-none focus:bg-neutral-50" />
              <textarea placeholder="PROJECT_SPECS" rows={3} className="w-full border-4 border-black p-2 text-xs font-black uppercase bg-white outline-none focus:bg-neutral-50 resize-none" />
              <button className="w-full border-4 border-black py-2.5 bg-[#FF6B6B] hover:bg-red-500 text-black font-black uppercase text-xs shadow-[3px_3px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all">
                TRANSMIT MESSAGE
              </button>
            </div>

            {/* Footer */}
            <div className="border-4 border-black bg-black text-white p-4 flex flex-col sm:flex-row justify-between items-center text-[10px] font-bold gap-4">
              <span>© 2026 MUBASHIR SYSTEMS. ALL RIGHTS RESERVED.</span>
              <div className="flex gap-4 uppercase">
                <span>GITHUB</span>
                <span>TWITTER</span>
                <span>DISCORD</span>
              </div>
            </div>
          </div>
        );
      }

      if (styleId === "luxury-designer") {
        return (
          <div className="font-serif bg-[#FAF9F6] text-neutral-900 p-10 space-y-20 min-h-full">
            {/* Navbar */}
            <div className="flex justify-between items-center text-xs tracking-widest font-sans uppercase border-b border-neutral-200 pb-6 text-neutral-500">
              <span className="font-bold text-neutral-900 tracking-[0.2em]">{websiteContent.about.title || "MUBASHIR"}</span>
              <div className="hidden md:flex gap-8 text-[9px] tracking-[0.2em] text-neutral-500">
                <span>La Maison</span>
                <span>L'Histoire</span>
                <span>Skills</span>
                <span>Oeuvres</span>
                <span>Contact</span>
              </div>
              <span className="text-neutral-400">EST. 2026</span>
            </div>

            {/* Hero */}
            <div className="max-w-4xl mx-auto text-center space-y-8 py-12">
              <span className="font-sans text-[8px] tracking-[0.3em] text-[#D4AF37] uppercase font-bold">
                CURATED DESIGN DNA
              </span>
              <h1 className="text-4xl md:text-6xl font-normal italic leading-tight text-neutral-900 text-center">
                {websiteContent.hero.headline || "Premium Visual Systems for High-End Brands"}
              </h1>
              <p className="font-sans text-xs tracking-wide text-[#555555] leading-relaxed max-w-xl mx-auto text-center">
                {websiteContent.hero.subheadline || "A luxury layout layout system featuring large white space, classic Cormorant typography, and brass accents."}
              </p>
              <div className="h-96 max-w-2xl mx-auto border border-neutral-200/50 p-2 bg-white shadow-sm overflow-hidden">
                <img src="/demo/portfolio-designer.png" alt="Luxury Portfolio" className="w-full h-full object-cover" />
              </div>
              <div className="pt-6 text-center">
                <button className="px-8 py-3 border border-neutral-300 bg-transparent text-neutral-950 font-sans text-[10px] tracking-widest hover:bg-neutral-900 hover:text-white transition-all uppercase">
                  {websiteContent.hero.ctaText || "DISCOVER CREATIONS"}
                </button>
              </div>
            </div>

            {/* About */}
            <div className="max-w-2xl mx-auto text-center space-y-6 py-8 border-t border-b border-neutral-200/50">
              <span className="font-sans text-[7px] tracking-[0.3em] text-neutral-450 uppercase font-bold">L'ETHIQUE</span>
              <h3 className="text-2xl font-light text-neutral-900 italic">"Simplicity is the ultimate luxury."</h3>
              <p className="font-sans text-xs tracking-wide text-neutral-550 leading-relaxed max-w-lg mx-auto">
                {websiteContent.about.description || "An elegant, bespoke designer experience created with generous margins, soft tones, and spacious typographical hierarchies. We design digital landmarks for high-end luxury products."}
              </p>
            </div>

            {/* Skills */}
            <div className="max-w-3xl mx-auto space-y-8">
              <h3 className="text-center text-xs tracking-[0.3em] font-sans text-neutral-450 uppercase font-bold">SAVOIR-FAIRE</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center font-sans text-[10px] tracking-wider text-neutral-700">
                {(resumeData?.skills || ["Bespoke UI Design", "NextJS Luxury Ecosystems", "Micro Typography", "Aura Aesthetics"]).map((skill, idx) => (
                  <div key={idx} className="border border-neutral-200/40 p-4 bg-white/50">
                    <span className="text-[#D4AF37] block font-serif italic text-base pb-1">0{idx + 1}</span>
                    <span className="uppercase">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div className="border-t border-neutral-200 pt-16 space-y-12 text-left">
              <h2 className="text-center text-xs tracking-[0.4em] text-neutral-450 uppercase font-bold">L'EXPOSITION</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
                {(resumeData?.projects || [
                  { title: "Holo Suite Branding", description: "Design concept and visual framework for high-end AI software." },
                  { title: "Mubix Visual Planner", description: "Luxury custom builder application client mockup." }
                ]).map((proj, idx) => (
                  <div key={idx} className="space-y-4 border-b border-neutral-200/60 pb-8 text-left">
                    <h3 className="text-xl font-normal text-neutral-900 tracking-wide text-left">{proj.title}</h3>
                    <p className="font-sans text-xs text-neutral-555 leading-relaxed text-left">{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="border-t border-neutral-200 pt-16 max-w-2xl mx-auto space-y-8 text-left">
              <h3 className="text-center text-xs tracking-[0.3em] font-sans text-neutral-450 uppercase font-bold">CHRONOLOGIE</h3>
              <div className="space-y-6">
                {(resumeData?.companies || [
                  { name: "Mubix Systems", role: "Principal Design Engineer", duration: "2024 - Present" },
                  { name: "Aesthetic Core Lab", role: "Senior Frontend Lead", duration: "2022 - 2024" }
                ]).map((job, idx) => (
                  <div key={idx} className="flex justify-between items-baseline font-sans text-xs text-neutral-700">
                    <div>
                      <span className="font-serif italic text-sm text-neutral-900 block">{job.role}</span>
                      <span className="text-[9px] tracking-widest uppercase text-neutral-400">{job.name}</span>
                    </div>
                    <span className="text-[10px] italic text-[#D4AF37]">{job.duration}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div className="max-w-xl mx-auto text-center space-y-4 py-6 italic text-neutral-800 text-lg">
              <p>"Mohammed's approach is pure luxury. Generous margins, exquisite typographic hierarchies, and flawless performance."</p>
              <span className="block font-sans text-[8px] tracking-[0.3em] text-[#D4AF37] uppercase font-bold">— Cartier Digital Director</span>
            </div>

            {/* Contact */}
            <div className="max-w-md mx-auto space-y-8 text-center pt-8 border-t border-neutral-200">
              <h3 className="text-xs tracking-[0.3em] font-sans text-neutral-450 uppercase font-bold">SOUMETTRE UN PROJET</h3>
              <div className="space-y-4 flex flex-col">
                <input type="text" placeholder="NOM COMPLET" className="border-b border-neutral-200 bg-transparent py-2 text-center text-[10px] tracking-widest outline-none focus:border-neutral-900 font-sans" />
                <input type="email" placeholder="EMAIL" className="border-b border-neutral-200 bg-transparent py-2 text-center text-[10px] tracking-widest outline-none focus:border-neutral-900 font-sans" />
                <button className="px-8 py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-sans text-[10px] tracking-widest uppercase transition-all mt-4">
                  INITIER L'ENGAGEMENT
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-neutral-200 pt-8 flex flex-col sm:flex-row justify-between items-center text-[9px] tracking-widest font-sans text-neutral-400 gap-4 uppercase font-bold">
              <span>© 2026 MOHAMMED MUBASHIR. ALL RIGHTS RESERVED.</span>
              <div className="flex gap-6">
                <span>Github</span>
                <span>Twitter</span>
                <span>LinkedIn</span>
              </div>
            </div>
          </div>
        );
      }

      if (styleId === "creative-studio") {
        return (
          <div className="font-sans bg-gradient-to-tr from-violet-50 to-pink-50 text-neutral-900 p-8 space-y-20 min-h-full">
            {/* Navbar */}
            <div className="flex justify-between items-center bg-white/60 border border-neutral-100 rounded-full px-6 py-3 shadow-sm backdrop-blur-sm">
              <span className="font-sans font-extrabold text-sm tracking-tight text-neutral-900 bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
                {websiteContent.about.title || "Creative Studio"}
              </span>
              <div className="hidden md:flex gap-5 text-[10px] font-bold text-neutral-500 uppercase">
                <span>Home</span>
                <span>About</span>
                <span>Skills</span>
                <span>Creations</span>
                <span>Contact</span>
              </div>
              <span className="text-[10px] font-bold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full">EST 2026</span>
            </div>

            {/* Hero */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-left">
              <div className="space-y-6 text-left">
                <span className="px-3 py-1 bg-violet-100 text-violet-650 rounded-full text-[10px] font-bold">
                  STUDIO ARCHETYPE
                </span>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-950 leading-tight text-left">
                  {websiteContent.hero.headline || "Fluid Designs & Playful Bento Interfaces"}
                </h1>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {websiteContent.hero.subheadline || "A beautiful showcase of rounded bento cards, glassmorphic header accents, and interactive web elements."}
                </p>
                <div className="flex gap-3 pt-4">
                  <button className="rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white hover:opacity-90 transition-all font-bold text-xs px-6 py-2.5 shadow-md shadow-purple-500/10">
                    {websiteContent.hero.ctaText || "Explore Works"}
                  </button>
                </div>
              </div>
              <div className="bg-white/60 border border-neutral-100 rounded-2xl p-3 shadow-md backdrop-blur-sm">
                <div className="h-64 rounded-xl overflow-hidden bg-neutral-150">
                  <img src="/demo/portfolio-designer.png" alt="Creative Graphic" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* About */}
            <div className="bg-white/40 border border-neutral-100 rounded-3xl p-8 backdrop-blur-sm text-left space-y-4">
              <span className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-[9px] font-bold">THE CREATIVE MIND</span>
              <p className="text-lg font-bold text-neutral-850">
                {websiteContent.about.description || "We believe websites should feel alive. By crafting playful interactive bento cards, fluid layout shifts, and micro-hover states, we translate complex schemas into beautiful visual stories."}
              </p>
            </div>

            {/* Skills */}
            <div className="space-y-6 text-left">
              <h3 className="font-extrabold text-xl tracking-tight">Our Visual Toolbox</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
                {(resumeData?.skills || ["UI Design", "Framer Motion", "Vibe Curation", "Tailwind 4"]).map((skill, idx) => (
                  <div key={idx} className="bg-white/60 border border-neutral-100 rounded-2xl p-4 shadow-xs">
                    <span className="block text-xl font-bold bg-gradient-to-r from-violet-650 to-pink-650 bg-clip-text text-transparent">✦</span>
                    <span className="text-xs font-extrabold text-neutral-700">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div className="space-y-6 text-left">
              <h2 className="font-extrabold text-xl tracking-tight text-left">Selected Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                {(resumeData?.projects || [
                  { title: "Bento Builder App", description: "Bubbly rounded portfolio interface builder." },
                  { title: "Aura UI Library", description: "Glassmorphism React components for modern startups." }
                ]).map((proj, idx) => (
                  <div key={idx} className="bg-white/60 border border-neutral-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-purple-200 transition-all duration-300 space-y-3 text-left">
                    <h3 className="font-extrabold text-base text-neutral-950 text-left">{proj.title}</h3>
                    <p className="text-xs text-neutral-600 leading-relaxed text-left">{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="space-y-6 text-left">
              <h3 className="font-extrabold text-xl tracking-tight">Studio Path</h3>
              <div className="space-y-4">
                {(resumeData?.companies || [
                  { name: "Mubix Systems", role: "Principal Design Engineer", duration: "2024 - Present" },
                  { name: "Aesthetic Core Lab", role: "Senior Frontend Lead", duration: "2022 - 2024" }
                ]).map((job, idx) => (
                  <div key={idx} className="bg-white/50 border border-neutral-100 rounded-2xl p-4 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-sm text-neutral-955">{job.role}</h4>
                      <span className="text-xs text-neutral-500">{job.name}</span>
                    </div>
                    <span className="text-xs font-bold text-purple-650 bg-purple-50 rounded-full px-3 py-1">{job.duration}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div className="bg-white/80 border border-purple-100 rounded-3xl p-8 max-w-xl mx-auto text-center space-y-4">
              <p className="text-base text-neutral-700 italic">
                "Beautiful bubble layouts, micro-animations, and extremely vibrant colors that keep our clients hooked."
              </p>
              <span className="block font-bold text-xs text-purple-650">— Creative Director, DesignPrompts.dev</span>
            </div>

            {/* Contact */}
            <div className="bg-white/60 border border-neutral-100 rounded-3xl p-8 max-w-md mx-auto text-center space-y-6">
              <h3 className="font-extrabold text-lg">Let's build something beautiful</h3>
              <div className="space-y-3 flex flex-col">
                <input type="text" placeholder="Your Name" className="bg-white/80 border border-neutral-100 rounded-full px-4 py-2 text-xs outline-none focus:border-purple-300" />
                <input type="email" placeholder="Your Email" className="bg-white/80 border border-neutral-100 rounded-full px-4 py-2 text-xs outline-none focus:border-purple-300" />
                <button className="rounded-full bg-gradient-to-r from-violet-650 to-pink-650 text-white font-bold text-xs py-2.5 shadow-md shadow-purple-500/10">
                  Transmit Request
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row justify-between items-center text-xs font-bold text-neutral-500 gap-4 uppercase">
              <span>© 2026 CREATIVE STUDIO. NATIVE WORK.</span>
              <div className="flex gap-4">
                <span>Instagram</span>
                <span>Dribbble</span>
                <span>Behance</span>
              </div>
            </div>
          </div>
        );
      }

      if (styleId === "developer-portfolio") {
        return (
          <div className="font-mono bg-[#0B0F19] text-neutral-300 p-6 space-y-16 min-h-full">
            {/* Navbar */}
            <div className="border border-neutral-800 bg-[#111827]/80 rounded-lg p-3 flex justify-between items-center shadow-lg">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
              </div>
              <div className="hidden md:flex gap-4 text-[10px] text-neutral-400">
                <span className="text-[#0EA5E9]">~/home</span>
                <span>~/about</span>
                <span>~/skills</span>
                <span>~/commits</span>
                <span>~/contact</span>
              </div>
              <span className="text-[10px] text-[#0EA5E9]">v1.0.0-stable</span>
            </div>

            {/* Hero */}
            <div className="border border-neutral-800 bg-[#111827]/50 rounded-lg p-6 space-y-4 text-left">
              <div className="text-[10px] text-neutral-550">$ cat profile.json</div>
              <h1 className="text-2xl md:text-3xl font-bold text-white text-left font-mono">
                {websiteContent.hero.headline || "Mohammed Mubashir // Design Engineer"}
              </h1>
              <p className="text-xs text-[#10B981] leading-relaxed">
                {websiteContent.hero.subheadline || "Designing code-centric monospace interfaces, dark grids, and telemetry visualizations."}
              </p>
              <div className="text-[10px] text-neutral-550 border-t border-neutral-800 pt-4">
                $ npm run build
              </div>
              <div className="bg-black/40 border border-neutral-900 p-4 rounded text-[9.5px] text-neutral-400 leading-relaxed font-mono">
                <span className="text-emerald-400">✓</span> Optimized production bundle created successfully.<br />
                <span className="text-blue-400">ℹ</span> Route (app) - Size: 114kB / Compiled: 0.2ms<br />
                <span className="text-purple-400">⚡</span> Framework: Next.js 16.2.6 (Turbopack)
              </div>
            </div>

            {/* About */}
            <div className="border border-neutral-800 bg-[#111827]/40 p-6 rounded-lg space-y-3 text-left">
              <span className="text-xs text-[#0EA5E9] font-bold block">// DESCRIPTION_REGISTRY</span>
              <p className="text-xs leading-relaxed text-neutral-400">
                {websiteContent.about.description || "Designing premium layouts for engineering-focused products. Bridging structural CSS variables with strict TypeScript codebases. Shipped natively."}
              </p>
            </div>

            {/* Skills */}
            <div className="border border-neutral-800 bg-[#111827]/30 p-6 rounded-lg space-y-4 text-left">
              <span className="text-xs text-[#0EA5E9] font-bold block">// TECH_COMPILATION</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                {(resumeData?.skills || ["TypeScript", "Next.js", "Zustand Core", "CSS Variables"]).map((skill, idx) => (
                  <div key={idx} className="border border-neutral-800 bg-black/40 p-3 rounded text-[#10B981]">
                    [ok] {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div className="space-y-4 text-left">
              <h2 className="text-xs uppercase text-neutral-500 tracking-wider text-left">Active Deployments (git log)</h2>
              <div className="space-y-3 text-left">
                {(resumeData?.projects || [
                  { title: "mubix-planner", description: "Design studio and website generator." },
                  { title: "neobrutalist-compiler", description: "Advanced prompt sandbox telemetry tool." }
                ]).map((proj, idx) => (
                  <div key={idx} className="border border-neutral-800 hover:border-[#0EA5E9] bg-[#111827]/40 p-4 rounded-lg flex items-center justify-between gap-4 transition-all text-left">
                    <div className="space-y-1 text-left">
                      <span className="text-[8px] text-[#0EA5E9] font-bold block">commit_e45a0f{idx}</span>
                      <h3 className="text-xs font-bold text-white text-left">{proj.title}</h3>
                      <p className="text-[10px] text-neutral-400 text-left">{proj.description}</p>
                    </div>
                    <span className="px-2 py-0.5 bg-[#10B981]/15 text-[#10B981] text-[8px] rounded border border-[#10B981]/30">PROD</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="space-y-4 text-left">
              <h3 className="text-xs uppercase text-neutral-500 tracking-wider block">// WORK_TIMELINE</h3>
              <div className="space-y-2">
                {(resumeData?.companies || [
                  { name: "Mubix Systems", role: "Principal Design Engineer", duration: "2024 - Present" },
                  { name: "Aesthetic Core Lab", role: "Senior Frontend Lead", duration: "2022 - 2024" }
                ]).map((job, idx) => (
                  <div key={idx} className="border border-neutral-800 bg-[#111827]/20 p-3 rounded flex justify-between items-center text-xs">
                    <div>
                      <span className="font-bold text-white block">{job.role}</span>
                      <span className="text-[9px] text-[#0EA5E9]">{job.name}</span>
                    </div>
                    <span className="text-[9px] bg-[#111827] border border-neutral-800 px-2 py-0.5 text-neutral-400">{job.duration}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div className="border border-neutral-800 bg-[#111827]/40 p-6 rounded-lg text-center space-y-2">
              <span className="text-[9px] text-[#10B981]">// FEEDBACK</span>
              <p className="text-xs text-neutral-300">
                "Pristine terminal aesthetics, extremely dense structures, and zero runtime overhead."
              </p>
              <span className="block text-[8.5px] text-neutral-500">— Chief Engineer, Telemetry Systems</span>
            </div>

            {/* Contact */}
            <div className="border border-neutral-800 bg-[#111827]/60 p-6 rounded-lg max-w-md mx-auto space-y-4 text-left">
              <span className="text-xs text-[#0EA5E9] font-bold block">// ESTABLISH_SHELL_CONNECTION</span>
              <input type="text" placeholder="bash_name" className="w-full bg-[#0B0F19] border border-neutral-800 rounded p-2 text-xs font-mono text-white outline-none focus:border-[#0EA5E9]" />
              <input type="email" placeholder="bash_email" className="w-full bg-[#0B0F19] border border-neutral-800 rounded p-2 text-xs font-mono text-white outline-none focus:border-[#0EA5E9]" />
              <button className="w-full py-2 bg-[#0EA5E9]/15 border border-[#0EA5E9]/50 hover:bg-[#0EA5E9] hover:text-black transition-all text-xs font-bold rounded">
                ssh mubashir@mubix-core
              </button>
            </div>

            {/* Footer */}
            <div className="border-t border-neutral-800 pt-8 flex justify-between items-center text-[10px] text-neutral-500">
              <span>© 2026 MUBASHIR@WORKSPACE. ALL SYSTEMS STABLE.</span>
              <div className="flex gap-4">
                <span>/github</span>
                <span>/twitter</span>
              </div>
            </div>
          </div>
        );
      }
    }

    // --- RESUME BUILDER CATEGORY RENDERING ---
    // Sequence: Profile Info → Experience Timeline → Skills Details → Education → Certificates → Projects Details → Contact Card
    if (categoryId === "resume-builder") {
      const pInfo = (websiteContent as any).profile || {
        fullName: "Mohammed Mubashir",
        title: "Principal Design Engineer",
        summary: "Meticulous design engineer specialized in high-performance AST compilation schemas and neobrutalist frontend architecture. Bridging structural CSS design tokens with strict type-safety."
      };
      
      const skillsList = resumeData?.skills || ["TypeScript & Next.js", "AST Prompt Schema", "Neobrutalist Styling", "UX Optimization", "Tailwind 4 Engine", "Production Building"];
      const expList = resumeData?.companies || [
        { name: "Mubix Systems", role: "Principal Design Engineer", duration: "2024 - Present", desc: "Spearheaded custom website generation engine leading to 4x faster compiler speeds." },
        { name: "Aesthetic Core Lab", role: "Senior Frontend Lead", duration: "2022 - 2024", desc: "Designed premium bento grids, glassmorphism templates, and interactive visual state models." }
      ];
      const certsList = [
        "Certified Next.js Specialist (Vercel Labs)",
        "Advanced AST Architecture (Compiler Guild)"
      ];
      const projList = resumeData?.projects || [
        { title: "Mubix Prompts Generator", description: "Design studio and website blueprint compiler application." },
        { title: "OS Lite Builder Sandbox", description: "Futuristic hardware-style UI controller mockup tool." }
      ];

      if (styleId === "corporate-resume") {
        return (
          <div className="font-sans bg-white text-slate-800 p-8 space-y-8 min-h-full text-left">
            {/* Profile Header */}
            <div className="border-b-2 border-[#1E3A8A] pb-6 flex justify-between items-end">
              <div>
                <h1 className="text-3xl font-bold text-[#1E3A8A] tracking-tight">{pInfo.fullName}</h1>
                <p className="text-sm font-semibold text-slate-500 mt-1 uppercase tracking-wide">{pInfo.title}</p>
              </div>
              <div className="text-right text-[10px] font-mono text-slate-400">
                <span>mubashir@mubix.dev</span><br />
                <span>+1 (800) MUBASHIR</span>
              </div>
            </div>

            {/* Profile Info Summary */}
            <div className="space-y-2">
              <h2 className="text-xs uppercase font-bold tracking-widest text-[#1E3A8A] border-b border-slate-200 pb-1">Profile Summary</h2>
              <p className="text-xs text-slate-650 leading-relaxed">{pInfo.summary}</p>
            </div>

            {/* Experience Timeline */}
            <div className="space-y-3">
              <h2 className="text-xs uppercase font-bold tracking-widest text-[#1E3A8A] border-b border-slate-200 pb-1">Professional Experience</h2>
              <div className="space-y-4">
                {expList.map((job, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between items-baseline font-sans text-xs">
                      <h3 className="text-xs font-bold text-slate-900">{job.role} — <span className="text-[#1E3A8A]">{job.name}</span></h3>
                      <span className="text-[10px] font-mono text-slate-500">{job.duration}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-normal">{(job as any).desc || (job as any).description || "Led robust engineering developments and curated pristine layouts."}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Details */}
            <div className="space-y-2">
              <h2 className="text-xs uppercase font-bold tracking-widest text-[#1E3A8A] border-b border-slate-200 pb-1">Core Competencies</h2>
              <div className="flex flex-wrap gap-2 pt-1 font-sans text-xs">
                {skillsList.map((skill, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-slate-100 text-slate-700 text-[10px] font-medium rounded border border-slate-200">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Education & Certificates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h2 className="text-xs uppercase font-bold tracking-widest text-[#1E3A8A] border-b border-slate-200 pb-1">Education</h2>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">B.S. in Computer Science</h4>
                  <p className="text-[10px] text-slate-500 font-sans">Stanford University // 2018 - 2022</p>
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-xs uppercase font-bold tracking-widest text-[#1E3A8A] border-b border-slate-200 pb-1">Certifications</h2>
                <ul className="list-disc pl-4 space-y-1 text-[10px] text-slate-600 font-sans">
                  {certsList.map((cert, idx) => (
                    <li key={idx}>{cert}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Projects Details */}
            <div className="space-y-3">
              <h2 className="text-xs uppercase font-bold tracking-widest text-[#1E3A8A] border-b border-slate-200 pb-1">Key Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projList.map((proj, idx) => (
                  <div key={idx} className="border border-slate-200 rounded p-3 bg-slate-50/50">
                    <h4 className="text-xs font-bold text-slate-900">{proj.title}</h4>
                    <p className="text-[10px] text-slate-600 mt-1 leading-normal font-sans">{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Card */}
            <div className="border border-[#1E3A8A]/10 bg-[#1E3A8A]/5 p-4 rounded text-center space-y-2">
              <span className="text-[10px] font-mono text-[#1E3A8A] font-bold">REPRESENTATIVE CONNECTION CARD</span>
              <p className="text-[11px] text-slate-600 font-sans">Interested in acquiring custom portfolio telemetry? Reach out directly.</p>
              <div className="text-[10px] font-semibold text-[#1E3A8A]">mubashir@mubix.dev</div>
            </div>
          </div>
        );
      }

      if (styleId === "ats-optimized") {
        return (
          <div className="font-serif bg-white text-black p-8 space-y-6 min-h-full text-left">
            {/* Header (No borders, pure text hierarchy) */}
            <div className="text-center space-y-1">
              <h1 className="text-2xl font-bold tracking-tight">{pInfo.fullName.toUpperCase()}</h1>
              <p className="text-xs font-mono text-neutral-500">{pInfo.title.toUpperCase()}</p>
              <p className="text-[9px] font-mono text-neutral-400">EMAIL: mubashir@mubix.dev | TEL: +1 (800) MUBASHIR | ADDR: AST COORDS</p>
            </div>

            {/* Summary */}
            <div className="space-y-1">
              <h2 className="text-[11px] font-bold border-b border-black uppercase tracking-wide">Professional Summary</h2>
              <p className="text-[10px] leading-relaxed text-black font-sans">{pInfo.summary}</p>
            </div>

            {/* Experience */}
            <div className="space-y-2">
              <h2 className="text-[11px] font-bold border-b border-black uppercase tracking-wide">Work Experience</h2>
              <div className="space-y-3">
                {expList.map((job, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="flex justify-between items-baseline font-mono text-[10px] font-bold">
                      <span>{job.role.toUpperCase()} — {job.name.toUpperCase()}</span>
                      <span>{job.duration}</span>
                    </div>
                    <p className="text-[10px] leading-relaxed text-neutral-850 font-sans">{(job as any).desc || (job as any).description || "Handled high contrast structures and telemetry variables."}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-1.5">
              <h2 className="text-[11px] font-bold border-b border-black uppercase tracking-wide">Technical Skills</h2>
              <p className="text-[10px] leading-normal font-sans">
                <strong>Core Competencies:</strong> {skillsList.join(", ")}
              </p>
            </div>

            {/* Education */}
            <div className="space-y-1">
              <h2 className="text-[11px] font-bold border-b border-black uppercase tracking-wide">Education</h2>
              <div className="flex justify-between text-[10px] font-sans">
                <span>Bachelor of Science in Computer Science — Stanford University</span>
                <span className="font-mono text-neutral-500">2018 - 2022</span>
              </div>
            </div>

            {/* Certifications */}
            <div className="space-y-1">
              <h2 className="text-[11px] font-bold border-b border-black uppercase tracking-wide">Certifications</h2>
              <ul className="list-disc pl-4 text-[10px] space-y-0.5 font-sans">
                {certsList.map((cert, idx) => (
                  <li key={idx}>{cert}</li>
                ))}
              </ul>
            </div>

            {/* Projects */}
            <div className="space-y-2">
              <h2 className="text-[11px] font-bold border-b border-black uppercase tracking-wide">Personal Projects</h2>
              <div className="space-y-2">
                {projList.map((proj, idx) => (
                  <div key={idx} className="space-y-0.5 text-[10px] font-sans">
                    <div className="font-bold font-serif">{proj.title.toUpperCase()}</div>
                    <p className="text-neutral-800 leading-normal">{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }

      if (styleId === "executive-cv") {
        return (
          <div className="font-serif bg-[#FAF9F5] text-neutral-800 p-10 space-y-8 min-h-full text-left border border-neutral-200">
            {/* Header with Luxury Gold Accent */}
            <div className="text-center space-y-3 pb-8 border-b border-neutral-200/50">
              <span className="text-[8px] tracking-[0.3em] text-[#B45309] font-bold font-sans block uppercase">CURATED EXPERT DOSSIER</span>
              <h1 className="text-4xl font-normal text-neutral-900 tracking-tight italic">{pInfo.fullName}</h1>
              <p className="text-xs font-sans tracking-[0.2em] text-neutral-500 uppercase">{pInfo.title}</p>
              <div className="text-[9.5px] tracking-wide text-neutral-400 font-sans mt-2">
                mubashir@mubix.dev  |  +1 (800) MUBASHIR  |  Stanford Alumnus
              </div>
            </div>

            {/* Profile summary */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-3">
                <h2 className="text-[10px] font-sans font-bold tracking-[0.25em] text-[#B45309] uppercase">L'ETHIQUE</h2>
              </div>
              <div className="md:col-span-9 font-sans text-xs">
                <p className="text-xs leading-relaxed italic text-neutral-700 font-serif">{pInfo.summary}</p>
              </div>
            </div>

            {/* Experience */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 border-t border-neutral-200/50 pt-6">
              <div className="md:col-span-3">
                <h2 className="text-[10px] font-sans font-bold tracking-[0.25em] text-[#B45309] uppercase">CHRONOLOGIE</h2>
              </div>
              <div className="md:col-span-9 space-y-6">
                {expList.map((job, idx) => (
                  <div key={idx} className="space-y-1 border-l border-neutral-200 pl-4 relative">
                    <div className="absolute w-2 h-2 rounded-full bg-[#B45309] -left-[4.5px] top-1.5" />
                    <div className="flex justify-between items-baseline font-sans text-xs">
                      <h3 className="font-serif italic text-sm text-neutral-900">{job.role} — <span className="font-sans font-bold uppercase text-[10px] text-neutral-400">{job.name}</span></h3>
                      <span className="text-[9.5px] text-[#B45309] font-sans italic">{job.duration}</span>
                    </div>
                    <p className="text-[11px] text-neutral-600 leading-relaxed mt-1 font-serif">{(job as any).desc || (job as any).description || "Engineered scalable telemetry portals."}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 border-t border-neutral-200/50 pt-6">
              <div className="md:col-span-3">
                <h2 className="text-[10px] font-sans font-bold tracking-[0.25em] text-[#B45309] uppercase">SAVOIR-FAIRE</h2>
              </div>
              <div className="md:col-span-9">
                <div className="grid grid-cols-2 gap-4 font-sans text-[10px] tracking-wide text-neutral-700">
                  {skillsList.map((skill, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-[#B45309]">✦</span>
                      <span className="uppercase">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Projects */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 border-t border-neutral-200/50 pt-6">
              <div className="md:col-span-3">
                <h2 className="text-[10px] font-sans font-bold tracking-[0.25em] text-[#B45309] uppercase">L'EXPOSITION</h2>
              </div>
              <div className="md:col-span-9 space-y-4">
                {projList.map((proj, idx) => (
                  <div key={idx} className="space-y-1">
                    <h4 className="text-xs font-bold text-neutral-900">
                      {proj.title}
                    </h4>
                    <p className="text-[10px] text-neutral-500 leading-relaxed font-sans">{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }

      // Modern Professional theme fallback
      return (
        <div className="font-sans bg-slate-50 text-neutral-800 p-6 space-y-6 min-h-full text-left">
          {/* Main Rounded Box Card */}
          <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-50 pb-5">
              <div>
                <h1 className="text-2xl font-black text-violet-600 tracking-tight">{pInfo.fullName}</h1>
                <p className="text-xs font-bold text-neutral-450 uppercase tracking-widest mt-0.5">{pInfo.title}</p>
              </div>
              <span className="px-3 py-1 bg-violet-50 text-violet-600 text-[10px] font-bold rounded-full">active_status: open</span>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">// PROFILE SUMMARY</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">{pInfo.summary}</p>
            </div>

            {/* Timeline Experience */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">// EXPERIENCE LOG</h3>
              <div className="space-y-3">
                {expList.map((job, idx) => (
                  <div key={idx} className="bg-slate-50/50 border border-slate-100 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">{job.role}</h4>
                      <span className="text-[10px] font-semibold text-neutral-500">{job.name}</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-violet-600 bg-violet-50 rounded-full px-2.5 py-0.5">{job.duration}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">// TECHNICAL STACK</h3>
              <div className="flex flex-wrap gap-2 pt-1">
                {skillsList.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 bg-white border border-slate-200 rounded-xl text-[10px] font-bold text-neutral-600 hover:border-violet-300 transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-gradient-to-r from-violet-500 to-indigo-500 rounded-2xl p-5 text-white text-center space-y-2">
              <h3 className="font-black text-xs uppercase tracking-widest">Connect Directly</h3>
              <p className="text-[10px] text-violet-100">Send an AST prompt request to configure a dedicated workspace.</p>
              <div className="text-xs font-black underline">mubashir@mubix.dev</div>
            </div>
          </div>
        </div>
      );
    }

    // --- AGENCY CATEGORY RENDERING ---
    // Sequence: Hero → Services → Case Studies → Team → Process → Testimonials → Clients → Contact → Footer
    if (categoryId === "agency") {
      const agencyName = websiteContent.about.title || "VORTEX CREATIVE";
      const services = [
        { title: "Design Systems", desc: "Crafting pristine component tokens and layout definitions." },
        { title: "AST Engineering", desc: "Automating structured web compilers and prompt telemetry." },
        { title: "Performance Scaling", desc: "Achieving perfect lighthouse results and native rendering." }
      ];
      const caseStudies = [
        { title: "Mubix OS Launch", category: "Full System Architecture", metric: "4.2M Operations/sec" },
        { title: "Aura Component Engine", category: "UI System Overhaul", metric: "99% Customer SAT" }
      ];
      const teamList = [
        { name: "Sarah Chen", role: "Design Director", bio: "Ex-Stripe creative lead specializing in systemic interface design." },
        { name: "Mohammed Mubashir", role: "Principal Engineer", bio: "AST prompt compiler architect with deep interest in layout telemetry." }
      ];
      const processSteps = [
        { num: "01", title: "Discovery & AST Planning", desc: "We map layout structures, typography parameters, and semantic components." },
        { num: "02", title: "Visual Prototyping", desc: "Curating harmonious design styles, bento grids, and typography tokens." },
        { num: "03", title: "Production Compile", desc: "Optimizing layouts for native performance, responsive fluidness, and type-safety." }
      ];
      const testimonials = [
        { quote: "Mubix transformed our SaaS preview experience. The layouts feel alive, custom, and extremely premium.", author: "Alexander Wright, CEO at QuantumSoft" }
      ];
      const clientsList = ["Zenith Core", "Vercel Labs", "Stripe Capital", "Linear Inc"];

      if (styleId === "creative-agency") {
        return (
          <div className="font-sans bg-gradient-to-tr from-[#FFFDF9] to-violet-50 text-neutral-900 p-8 space-y-24 min-h-full text-left">
            {/* Navbar */}
            <div className="flex justify-between items-center bg-white/70 border border-purple-100 rounded-full px-6 py-3 shadow-sm backdrop-blur-sm">
              <span className="font-black text-sm tracking-tight text-neutral-900 bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">{agencyName}</span>
              <div className="hidden md:flex gap-5 text-[10px] font-bold text-neutral-500 uppercase">
                <span>Studio</span>
                <span>Services</span>
                <span>Works</span>
                <span>Team</span>
                <span>Contact</span>
              </div>
              <span className="text-[10px] font-bold text-purple-650 bg-purple-50 rounded-full px-3 py-1">CREATIVE.HQ</span>
            </div>

            {/* 1. Hero */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-left">
              <div className="space-y-6">
                <span className="px-3 py-1 bg-violet-100 text-violet-750 rounded-full text-[10px] font-bold uppercase tracking-wider">CREATIVE AGENCY AT WORK</span>
                <h1 className="text-4xl md:text-5xl font-black text-neutral-955 leading-tight tracking-tight text-left">
                  {websiteContent.hero.headline || "We Craft Pristine Digital Landmarks"}
                </h1>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {websiteContent.hero.subheadline || "A beautiful showcase of bento layouts, aesthetic pastel gradients, and playful layout asymmetry."}
                </p>
                <button className="rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white px-6 py-2.5 text-xs font-bold shadow-md shadow-purple-500/10 hover:opacity-90">
                  {websiteContent.hero.ctaText || "Explore Our Creations"}
                </button>
              </div>
              <div className="bg-white/60 border border-neutral-100 rounded-2xl p-3 shadow-md backdrop-blur-sm">
                <img src="/demo/portfolio-editorial.png" alt="Creative Agency" className="w-full h-48 object-cover rounded-xl" />
              </div>
            </div>

            {/* 2. Services */}
            <div className="space-y-6 text-left">
              <h2 className="font-black text-2xl tracking-tight">Our Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {services.map((srv, idx) => (
                  <div key={idx} className="bg-white/70 border border-purple-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-purple-200 transition-all space-y-3">
                    <span className="text-xl font-bold bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">✦</span>
                    <h3 className="font-black text-sm text-neutral-955">{srv.title}</h3>
                    <p className="text-xs text-slate-550 leading-relaxed">{srv.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Case Studies */}
            <div className="space-y-6 text-left">
              <h2 className="font-black text-2xl tracking-tight">Selected Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {caseStudies.map((caseStudy, idx) => (
                  <div key={idx} className="bg-white border border-neutral-100 rounded-3xl p-6 shadow-sm space-y-3">
                    <span className="text-[10px] font-bold text-[#EC4899] uppercase tracking-wider">{caseStudy.category}</span>
                    <h3 className="font-black text-lg text-neutral-955">{caseStudy.title}</h3>
                    <div className="text-2xl font-black bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">{caseStudy.metric}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Team */}
            <div className="space-y-6 text-left">
              <h2 className="font-black text-2xl tracking-tight">Meet The Architects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {teamList.map((tm, idx) => (
                  <div key={idx} className="bg-white border border-purple-100 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row gap-4 items-start">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#8B5CF6] to-[#EC4899] flex items-center justify-center text-white font-black text-sm shrink-0">
                      {tm.name[0]}
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-black text-sm text-neutral-950">{tm.name}</h3>
                      <span className="text-[9px] font-bold text-[#EC4899] uppercase tracking-wider">{tm.role}</span>
                      <p className="text-xs text-neutral-500 leading-relaxed mt-1">{tm.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Process */}
            <div className="space-y-6 text-left">
              <h2 className="font-black text-2xl tracking-tight">Workflow Paradigm</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {processSteps.map((step, idx) => (
                  <div key={idx} className="bg-white/60 border border-neutral-100 rounded-2xl p-6 relative overflow-hidden space-y-2">
                    <span className="absolute -right-2 -top-4 text-6xl font-black text-neutral-100/50">{step.num}</span>
                    <h3 className="font-black text-sm text-neutral-955 relative z-10">{step.title}</h3>
                    <p className="text-xs text-neutral-500 leading-relaxed relative z-10">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Testimonials */}
            <div className="bg-[#FFFDF5] border border-purple-100 rounded-3xl p-8 text-center space-y-4">
              <span className="text-3xl">“</span>
              <p className="text-sm font-medium italic text-neutral-850 leading-relaxed max-w-xl mx-auto">
                {testimonials[0].quote}
              </p>
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#EC4899]">
                {testimonials[0].author}
              </div>
            </div>

            {/* 7. Clients */}
            <div className="space-y-4 text-center">
              <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">// ALIGNED PARTNERS</span>
              <div className="flex flex-wrap justify-center gap-8 items-center pt-2">
                {clientsList.map((client, idx) => (
                  <span key={idx} className="font-black text-xs text-neutral-400 tracking-wider hover:text-[#8B5CF6] transition-colors">{client}</span>
                ))}
              </div>
            </div>

            {/* 8. Contact */}
            <div className="bg-white border border-purple-100 rounded-3xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="px-3 py-1 bg-violet-100 text-violet-750 rounded-full text-[9px] font-bold uppercase tracking-wider">PROJECT DEPLOYMENT FORM</span>
                <h3 className="font-black text-2xl text-neutral-955">Let's Compile Something Sublime</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Have an AST blueprint schema you want to synthesize? Reach out directly. Our compilers are fully operational.
                </p>
              </div>
              <div className="space-y-3">
                <input type="text" placeholder="Name" className="w-full bg-slate-50 border border-purple-100 rounded-xl p-3 text-xs outline-none focus:border-purple-300" />
                <input type="email" placeholder="Email" className="w-full bg-slate-50 border border-purple-100 rounded-xl p-3 text-xs outline-none focus:border-purple-300" />
                <button className="w-full py-3 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white font-bold text-xs rounded-xl shadow-md hover:opacity-90 transition-all">
                  Transmit Telemetry
                </button>
              </div>
            </div>

            {/* 9. Footer */}
            <div className="border-t border-purple-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-neutral-400">
              <span>© 2026 {agencyName}. AUTOMATED COMPILING COMPLIANT.</span>
              <div className="flex gap-4">
                <span>[Studio]</span>
                <span>[Services]</span>
                <span>[Works]</span>
              </div>
            </div>
          </div>
        );
      }

      if (styleId === "digital-marketing") {
        return (
          <div className="font-sans bg-white text-slate-900 p-8 space-y-24 min-h-full text-left">
            {/* Navbar */}
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <span className="font-extrabold text-sm text-[#2563EB] tracking-tight">{agencyName}</span>
              <div className="hidden md:flex gap-6 text-xs font-semibold text-slate-500">
                <span>Services</span>
                <span>Performance</span>
                <span>Case Studies</span>
                <span>Team</span>
                <span>Contact</span>
              </div>
              <button className="rounded-lg bg-[#2563EB] text-white hover:opacity-90 font-bold text-xs px-4 py-1.5 shadow-sm">
                Get Propelled
              </button>
            </div>

            {/* 1. Hero */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-left">
              <div className="space-y-6">
                <span className="px-2.5 py-0.5 bg-blue-50 text-[#2563EB] rounded-full font-bold text-[8.5px] uppercase">PERFORMANCE-ORIENTED</span>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                  {websiteContent.hero.headline || "Propel Your Digital Conversion Channels"}
                </h1>
                <p className="text-xs text-slate-550 leading-relaxed">
                  {websiteContent.hero.subheadline || "A beautiful, conversion-optimized marketing container using deep blue buttons and professional data metrics grids."}
                </p>
                <button className="rounded-lg bg-[#2563EB] text-white hover:opacity-90 font-bold text-xs px-5 py-2.5 shadow-sm shadow-blue-500/10">
                  {websiteContent.hero.ctaText || "Deploy Conversion Engine"}
                </button>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-2 rounded-xl shadow-lg">
                <img src="/demo/saas-dashboard.png" alt="Marketing Telemetry" className="w-full h-48 object-cover rounded-lg" />
              </div>
            </div>

            {/* 2. Services */}
            <div className="space-y-6 text-left">
              <span className="text-[#2563EB] font-bold text-xs uppercase tracking-wider block font-sans">// Core Verticals</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans text-xs">
                {services.map((srv, idx) => (
                  <div key={idx} className="bg-white border border-slate-100 rounded-xl p-5 shadow-xs hover:shadow-md transition-all duration-300">
                    <h4 className="font-bold text-xs text-slate-900 mb-1">{srv.title}</h4>
                    <p className="text-[10px] text-slate-500 leading-relaxed">{srv.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Case Studies */}
            <div className="space-y-6 text-left">
              <span className="text-[#2563EB] font-bold text-xs uppercase tracking-wider block font-sans">// Performance Metrics</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {caseStudies.map((caseStudy, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-xl p-6 bg-slate-50/50 space-y-2">
                    <span className="text-[9px] font-bold text-slate-450 uppercase tracking-widest">{caseStudy.category}</span>
                    <h4 className="font-bold text-sm text-slate-900">{caseStudy.title}</h4>
                    <span className="text-xl font-extrabold text-[#2563EB] block">{caseStudy.metric}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Team */}
            <div className="space-y-6 text-left">
              <span className="text-[#2563EB] font-bold text-xs uppercase tracking-wider block font-sans">// Growth Analysts</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {teamList.map((tm, idx) => (
                  <div key={idx} className="border border-slate-100 rounded-xl p-4 bg-white flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-[#2563EB] font-bold flex items-center justify-center text-xs">
                      {tm.name[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">{tm.name}</h4>
                      <span className="text-[9px] font-bold text-slate-450 uppercase">{tm.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Process */}
            <div className="space-y-6 text-left">
              <span className="text-[#2563EB] font-bold text-xs uppercase tracking-wider block font-sans">// Execution Pipeline</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {processSteps.map((step, idx) => (
                  <div key={idx} className="bg-slate-50 rounded-xl p-5 border border-slate-100 space-y-1">
                    <span className="text-xs font-mono font-bold text-[#2563EB]">{step.num}.</span>
                    <h4 className="font-bold text-xs text-slate-900">{step.title}</h4>
                    <p className="text-[10px] text-slate-500 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Testimonials */}
            <div className="border border-slate-200 bg-slate-50 p-6 rounded-xl text-left space-y-3">
              <div className="flex gap-1 text-yellow-400">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p className="text-xs font-medium text-slate-700 leading-relaxed">
                "{testimonials[0].quote}"
              </p>
              <span className="text-[9px] font-bold text-slate-450 block uppercase tracking-wider">{testimonials[0].author}</span>
            </div>

            {/* 7. Clients */}
            <div className="text-center py-4 border-y border-slate-100">
              <span className="text-[9px] font-bold text-slate-450 uppercase tracking-widest block mb-4">TRUSTED BY INDUSTRY TITANS</span>
              <div className="flex flex-wrap justify-center gap-8 items-center">
                {clientsList.map((client, idx) => (
                  <span key={idx} className="font-extrabold text-xs text-slate-450 tracking-wider">{client.toUpperCase()}</span>
                ))}
              </div>
            </div>

            {/* 8. Contact */}
            <div className="bg-[#2563EB] rounded-2xl p-8 text-white grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="px-2 py-0.5 bg-blue-600 rounded text-[9px] font-bold uppercase tracking-wider">CONVERSION CHANNELS</span>
                <h3 className="font-extrabold text-2xl">Propel Your Business Today</h3>
                <p className="text-xs text-blue-100 leading-relaxed">
                  Send your business objectives to our growth operations. Let's maximize pipeline telemetry.
                </p>
              </div>
              <div className="space-y-3 text-slate-900">
                <input type="text" placeholder="Workspace Name" className="w-full bg-white rounded-lg p-3 text-xs outline-none" />
                <input type="email" placeholder="Business Mail" className="w-full bg-white rounded-lg p-3 text-xs outline-none" />
                <button className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg transition-all">
                  Acquire Growth Plan
                </button>
              </div>
            </div>

            {/* 9. Footer */}
            <div className="border-t border-slate-100 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-450 font-sans">
              <span>© 2026 {agencyName}. COMPILING GROWTH TELEMETRY.</span>
              <div className="flex gap-4">
                <span>Privacy</span>
                <span>Terms</span>
                <span>Telemetry Specs</span>
              </div>
            </div>
          </div>
        );
      }

      if (styleId === "premium-studio") {
        return (
          <div className="font-serif bg-[#121212] text-neutral-300 p-10 space-y-24 min-h-full text-left">
            {/* Navbar */}
            <div className="flex justify-between items-center text-xs tracking-widest uppercase border-b border-neutral-800 pb-6 text-neutral-500">
              <span className="font-bold text-[#C5A880] tracking-[0.2em]">{agencyName}</span>
              <div className="hidden md:flex gap-8 text-[9px] tracking-[0.2em] text-neutral-500 font-sans">
                <span>Le Studio</span>
                <span>Services</span>
                <span>Oeuvres</span>
                <span>Processus</span>
                <span>Contact</span>
              </div>
              <span className="text-neutral-600">EST. 2026</span>
            </div>

            {/* 1. Hero */}
            <div className="max-w-4xl mx-auto text-center space-y-8 py-12">
              <span className="font-sans text-[8px] tracking-[0.3em] text-[#C5A880] uppercase font-bold">bespoke luxury studio</span>
              <h1 className="text-4xl md:text-6xl font-normal italic leading-tight text-neutral-100 text-center">
                {websiteContent.hero.headline || "Architects of Premium Digital Landings"}
              </h1>
              <p className="font-sans text-xs tracking-wide text-neutral-450 leading-relaxed max-w-xl mx-auto text-center">
                {websiteContent.hero.subheadline || "Curating ultra-clean off-white configurations and charcoal interfaces for high-end luxury client portfolios."}
              </p>
              <button className="px-8 py-3 border border-[#C5A880] bg-transparent text-[#C5A880] hover:bg-[#C5A880] hover:text-black font-sans text-[10px] tracking-widest uppercase transition-all">
                {websiteContent.hero.ctaText || "DISCOVER BESPOKE WORK"}
              </button>
            </div>

            {/* 2. Services */}
            <div className="space-y-6 text-left max-w-3xl mx-auto">
              <h2 className="text-[10px] font-sans font-bold tracking-[0.3em] text-[#C5A880] uppercase">// PREVALENT DISCIPLINES</h2>
              <div className="space-y-4 divide-y divide-neutral-800 font-sans text-xs">
                {services.map((srv, idx) => (
                  <div key={idx} className="pt-4 flex justify-between items-baseline">
                    <span className="font-serif italic text-sm text-neutral-100">{srv.title}</span>
                    <span className="text-[10px] text-neutral-500 max-w-sm text-right leading-relaxed">{srv.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Case Studies */}
            <div className="space-y-6 text-left max-w-3xl mx-auto">
              <h2 className="text-[10px] font-sans font-bold tracking-[0.3em] text-[#C5A880] uppercase">// SELECTED ARCHIVES</h2>
              <div className="space-y-6">
                {caseStudies.map((caseStudy, idx) => (
                  <div key={idx} className="border-b border-neutral-800 pb-4 flex justify-between items-end">
                    <div>
                      <span className="text-[8px] font-sans tracking-[0.2em] text-[#C5A880] uppercase block">{caseStudy.category}</span>
                      <h4 className="font-serif italic text-base text-neutral-100 mt-1">{caseStudy.title}</h4>
                    </div>
                    <span className="font-sans text-xs tracking-wider text-neutral-500 font-bold">{caseStudy.metric}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Team */}
            <div className="space-y-6 text-left max-w-3xl mx-auto">
              <h2 className="text-[10px] font-sans font-bold tracking-[0.3em] text-[#C5A880] uppercase">// ART DIRECTORY</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans text-xs">
                {teamList.map((tm, idx) => (
                  <div key={idx} className="space-y-1">
                    <h4 className="font-serif italic text-sm text-neutral-100">{tm.name}</h4>
                    <span className="text-[9px] tracking-wider text-[#C5A880] uppercase">{tm.role}</span>
                    <p className="text-[11px] text-neutral-500 leading-relaxed mt-2">{tm.bio}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Process */}
            <div className="space-y-6 text-left max-w-3xl mx-auto">
              <h2 className="text-[10px] font-sans font-bold tracking-[0.3em] text-[#C5A880] uppercase">// L'INTUITION ET LA METHODE</h2>
              <div className="space-y-6">
                {processSteps.map((step, idx) => (
                  <div key={idx} className="flex gap-6 items-start font-sans text-xs">
                    <span className="text-[#C5A880] font-serif italic text-sm">{step.num}.</span>
                    <div>
                      <h4 className="font-serif italic text-sm text-neutral-100">{step.title}</h4>
                      <p className="text-[11px] text-neutral-500 leading-relaxed mt-1">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Testimonials */}
            <div className="max-w-xl mx-auto text-center space-y-4 py-8 border-y border-neutral-800">
              <p className="font-serif italic text-base text-neutral-100 leading-relaxed">
                “{testimonials[0].quote}”
              </p>
              <span className="font-sans text-[8px] tracking-[0.3em] text-[#C5A880] uppercase font-bold">{testimonials[0].author}</span>
            </div>

            {/* 7. Clients */}
            <div className="text-center py-4">
              <span className="text-[8px] font-sans tracking-[0.3em] text-neutral-600 uppercase block mb-4">// SELECT ALIGNMENTS</span>
              <div className="flex flex-wrap justify-center gap-10 items-center">
                {clientsList.map((client, idx) => (
                  <span key={idx} className="font-serif italic text-xs text-neutral-500 tracking-wider">{client}</span>
                ))}
              </div>
            </div>

            {/* 8. Contact */}
            <div className="max-w-3xl mx-auto border border-neutral-800 p-8 space-y-6 bg-neutral-900/30">
              <div className="text-center space-y-2">
                <span className="text-[8px] font-sans tracking-[0.3em] text-[#C5A880] uppercase block">INQUIRIES</span>
                <h3 className="font-serif italic text-2xl text-neutral-100">Bespoke Consultations</h3>
                <p className="font-sans text-xs text-neutral-500 leading-relaxed">
                  We invite luxury entities to commission layout designs through our principal office.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-xs">
                <input type="text" placeholder="REPRESENTATIVE" className="w-full bg-neutral-900 border border-neutral-800 p-3 outline-none text-[#C5A880] focus:border-[#C5A880]" />
                <input type="email" placeholder="EMAIL ADRESSE" className="w-full bg-neutral-900 border border-neutral-800 p-3 outline-none text-[#C5A880] focus:border-[#C5A880]" />
                <button className="sm:col-span-2 py-3 border border-[#C5A880] bg-transparent text-[#C5A880] hover:bg-[#C5A880] hover:text-black font-sans text-[9px] tracking-widest uppercase transition-all">
                  TRANSMIT COMMISION DETAILS
                </button>
              </div>
            </div>

            {/* 9. Footer */}
            <div className="max-w-3xl mx-auto border-t border-neutral-800 pt-6 flex justify-between items-center text-[9px] tracking-widest text-neutral-600 font-sans uppercase">
              <span>© 2026 {agencyName}. TOUTES SPECIFICATIONS COMPILATIONS.</span>
              <span>EST. 2026</span>
            </div>
          </div>
        );
      }

      // Startup Agency theme fallback
      return (
        <div className="font-mono bg-[#080710] text-neutral-300 p-6 space-y-24 min-h-full text-left">
          {/* Navbar */}
          <div className="border border-neutral-800 bg-gray-900/40 rounded-xl p-3 flex justify-between items-center shadow-lg backdrop-blur-md">
            <span className="font-sans font-bold tracking-tight text-xs text-white uppercase">{agencyName}</span>
            <div className="hidden md:flex gap-4 text-[10px] text-neutral-400">
              <span className="text-[#6366F1]">~/services</span>
              <span>~/portfolio</span>
              <span>~/process</span>
              <span>~/contact</span>
            </div>
            <span className="text-[10px] text-[#6366F1]">stable_build</span>
          </div>

          {/* 1. Hero */}
          <div className="border border-neutral-800 bg-gray-900/30 rounded-xl p-6 space-y-4 text-left">
            <span className="text-[9px] text-[#6366F1] font-bold">// TECH_COMPILATION</span>
            <h1 className="text-2xl md:text-3xl font-bold text-white text-left font-sans">
              {websiteContent.hero.headline || "Rapid Technical Startup Engineering & Design"}
            </h1>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans">
              {websiteContent.hero.subheadline || "Obsidian tech styling displaying sharp glowing neon purple borders and dense modular grids."}
            </p>
            <button className="border border-[#6366F1] bg-[#6366F1]/10 text-white font-mono text-[9px] tracking-wider px-5 py-2 hover:bg-[#6366F1] transition-all rounded-md">
              {websiteContent.hero.ctaText || "DEPLOY BLUEPRINT"}
            </button>
          </div>

          {/* 2. Services */}
          <div className="space-y-4">
            <span className="text-[9px] text-neutral-500 uppercase tracking-widest block">// CORE_CAPABILITIES.CFG</span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map((srv, idx) => (
                <div key={idx} className="border border-neutral-800 bg-neutral-900/30 p-5 rounded-lg space-y-2">
                  <h4 className="text-xs font-bold text-white">{srv.title}</h4>
                  <p className="text-[10px] text-neutral-400 leading-relaxed">{srv.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Case Studies */}
          <div className="space-y-4">
            <span className="text-[9px] text-neutral-500 uppercase tracking-widest block">// RUN_BENCHMARKS.SH</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {caseStudies.map((caseStudy, idx) => (
                <div key={idx} className="border border-neutral-800 bg-neutral-900/20 p-5 rounded-lg space-y-1">
                  <span className="text-[8px] text-[#6366F1]">{caseStudy.category}</span>
                  <h4 className="text-xs font-bold text-white">{caseStudy.title}</h4>
                  <span className="text-base font-bold text-white block">{caseStudy.metric}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Team */}
          <div className="space-y-4">
            <span className="text-[9px] text-neutral-500 uppercase tracking-widest block">// WORKSPACE_CONTRIBUTORS</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teamList.map((tm, idx) => (
                <div key={idx} className="border border-neutral-850 p-4 rounded-lg bg-neutral-900/40">
                  <h4 className="text-xs font-bold text-white">{tm.name}</h4>
                  <span className="text-[8px] text-[#6366F1]">{tm.role}</span>
                  <p className="text-[10px] text-neutral-400 mt-2 leading-relaxed">{tm.bio}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Process */}
          <div className="space-y-4">
            <span className="text-[9px] text-neutral-500 uppercase tracking-widest block">// PIPELINE_STEPS</span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {processSteps.map((step, idx) => (
                <div key={idx} className="border border-neutral-855 p-4 rounded-lg bg-neutral-900/10">
                  <span className="text-[8px] text-[#6366F1] font-mono">[{step.num}]</span>
                  <h4 className="text-xs font-bold text-white mt-1">{step.title}</h4>
                  <p className="text-[10px] text-neutral-450 mt-1 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Testimonials */}
          <div className="border border-neutral-800 bg-neutral-900/50 p-6 rounded-lg space-y-2">
            <span className="text-[8px] text-[#6366F1] font-bold">// USER_LOGS.JSON</span>
            <p className="text-xs text-neutral-350 leading-relaxed italic">
              "{testimonials[0].quote}"
            </p>
            <span className="text-[8px] text-neutral-500 uppercase block tracking-wider mt-1">{testimonials[0].author}</span>
          </div>

          {/* 7. Clients */}
          <div className="space-y-2 text-center">
            <span className="text-[8px] text-neutral-500 uppercase block tracking-widest mb-2">// PEER_NETWORK</span>
            <div className="flex flex-wrap justify-center gap-6 text-[10px] text-neutral-400">
              {clientsList.map((client, idx) => (
                <span key={idx}>[{client.toLowerCase()}]</span>
              ))}
            </div>
          </div>

          {/* 8. Contact */}
          <div className="border border-neutral-800 bg-neutral-900/30 p-6 rounded-lg space-y-4">
            <div>
              <span className="text-[8px] text-[#6366F1] font-bold">// ESTABLISH_SESSION</span>
              <h4 className="text-xs font-bold text-white mt-1">Submit Technical Spec</h4>
            </div>
            <div className="space-y-2 text-[10px]">
              <input type="text" placeholder="payload.name" className="w-full bg-[#080710] border border-neutral-800 rounded p-2 text-white outline-none focus:border-[#6366F1]" />
              <input type="email" placeholder="payload.email" className="w-full bg-[#080710] border border-neutral-800 rounded p-2 text-white outline-none focus:border-[#6366F1]" />
              <button className="w-full py-2 bg-[#6366F1]/10 border border-[#6366F1] text-white hover:bg-[#6366F1] hover:text-black transition-all font-bold rounded">
                ssh mubashir@mubix-studio
              </button>
            </div>
          </div>

          {/* 9. Footer */}
          <div className="border-t border-neutral-800 pt-6 flex justify-between items-center text-[9px] text-neutral-500 font-mono uppercase">
            <span>© 2026 {agencyName}. TELEMETRY VERIFIED.</span>
            <span>build_v1.0.8</span>
          </div>
        </div>
      );
    }

    // --- BLOGGING CATEGORY RENDERING ---
    // Sequence: Navbar → Featured Post → Latest Articles → Categories → Author Section → Newsletter → Footer
    if (categoryId === "blogging") {
      const blogName = websiteContent.about.title || "MUBIX PRESS";
      const featuredPost = {
        title: websiteContent.hero.headline || "The Future of Asymmetrical Layouts in AST Compilers",
        excerpt: websiteContent.hero.subheadline || "How modular bento boxes and zero-radius borders are shaping the next generation of visual telemetry generators.",
        date: "May 31, 2026",
        author: "Mohammed Mubashir",
        readTime: "5 min read"
      };
      const posts = [
        { title: "Clean Design Tokens in Tailwind 4", desc: "Understanding the paradigm shift towards pure CSS variable custom properties.", date: "May 28, 2026", readTime: "4 min read" },
        { title: "Building a Neobrutalist Blueprint Generator", desc: "A deep dive into high contrast ratios, offset borders, and rigid columns.", date: "May 25, 2026", readTime: "6 min read" }
      ];
      const categoriesList = ["Engineering", "Design Systems", "AI Compilers", "Layout Telemetry"];
      const authorInfo = {
        name: "Mohammed Mubashir",
        role: "Principal AST Compiler Architect",
        bio: "Specializing in visual prompt compiling, aesthetic neobrutalist borders, and automated Next.js telemetry systems."
      };

      if (styleId === "medium-style") {
        return (
          <div className="font-serif bg-white text-neutral-900 p-8 space-y-20 min-h-full text-left">
            {/* 1. Navbar */}
            <div className="border-b border-neutral-100 pb-4 flex justify-between items-center text-xs font-sans tracking-wide">
              <span className="font-black text-sm tracking-tight text-neutral-900">{blogName}</span>
              <div className="hidden md:flex gap-6 uppercase text-[9px] tracking-wider text-neutral-400 font-bold font-sans">
                <span>Reading Room</span>
                <span>Our Story</span>
                <span>Membership</span>
                <span>Write</span>
              </div>
              <button className="bg-neutral-900 text-white hover:bg-neutral-800 text-[10px] font-sans font-bold px-4 py-1.5 rounded-full">Subscribe</button>
            </div>

            {/* 2. Featured Post */}
            <div className="max-w-2xl mx-auto space-y-4 py-6 border-b border-neutral-100">
              <span className="text-[9px] font-sans text-neutral-450 uppercase tracking-widest font-bold">// FEATURED SPOTLIGHT</span>
              <h1 className="text-3xl md:text-4xl font-serif font-black tracking-tight leading-tight text-neutral-900">{featuredPost.title}</h1>
              <p className="text-xs text-neutral-600 leading-relaxed font-sans">{featuredPost.excerpt}</p>
              <div className="text-[10px] text-neutral-450 font-sans font-bold flex gap-3">
                <span>{featuredPost.author}</span>
                <span>•</span>
                <span>{featuredPost.date}</span>
                <span>•</span>
                <span>{featuredPost.readTime}</span>
              </div>
            </div>

            {/* 3. Latest Articles */}
            <div className="max-w-2xl mx-auto space-y-6">
              <h3 className="text-xs tracking-widest font-sans text-neutral-400 uppercase font-bold">// LATEST PIECES</h3>
              <div className="space-y-6 divide-y divide-neutral-100 font-sans text-xs">
                {posts.map((post, idx) => (
                  <div key={idx} className="pt-6 space-y-2">
                    <h4 className="text-xl font-bold font-serif hover:text-[#635BFF] cursor-pointer">{post.title}</h4>
                    <p className="text-xs text-neutral-500 leading-relaxed font-sans">{post.desc}</p>
                    <div className="text-[9px] text-neutral-400 font-bold flex gap-2">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Categories */}
            <div className="max-w-2xl mx-auto space-y-3 font-sans">
              <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">// EXPLORE VERTICALS</span>
              <div className="flex flex-wrap gap-2">
                {categoriesList.map((cat, idx) => (
                  <span key={idx} className="px-3 py-1 bg-neutral-50 border border-neutral-100 rounded-full text-[10px] font-semibold text-neutral-600">{cat}</span>
                ))}
              </div>
            </div>

            {/* 5. Author Section */}
            <div className="max-w-2xl mx-auto bg-neutral-50/50 border border-neutral-100 rounded-2xl p-6 font-sans flex flex-col sm:flex-row gap-4 items-start">
              <div className="w-12 h-12 rounded-full bg-neutral-900 text-white font-bold flex items-center justify-center text-sm shrink-0">
                {authorInfo.name[0]}
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-xs text-neutral-900">{authorInfo.name}</h4>
                <span className="text-[9px] font-bold text-neutral-400 uppercase">{authorInfo.role}</span>
                <p className="text-[11px] text-neutral-500 leading-relaxed mt-2">{authorInfo.bio}</p>
              </div>
            </div>

            {/* 6. Newsletter */}
            <div className="bg-neutral-50 rounded-2xl p-6 max-w-xl mx-auto text-center space-y-4 font-sans text-xs">
              <h4 className="text-base font-bold font-serif">Inbox Delivery</h4>
              <p className="text-xs text-neutral-500 font-sans max-w-xs mx-auto">Get meticulous layout engineering direct in your mailbox weekly.</p>
              <div className="flex gap-2 max-w-sm mx-auto font-sans">
                <input type="email" placeholder="Mail Address" className="border border-neutral-200 rounded-full px-4 py-2 text-xs flex-1 outline-none font-sans" />
                <button className="bg-neutral-900 text-white rounded-full px-5 py-2 text-xs font-bold font-sans">Transmit</button>
              </div>
            </div>

            {/* 7. Footer */}
            <div className="border-t border-neutral-100 pt-8 flex justify-between items-center text-[10px] text-neutral-400 font-sans">
              <span>© 2026 {blogName}. METICULOUS COMPILING DIRECTORY.</span>
              <div className="flex gap-4">
                <span>About</span>
                <span>Terms</span>
                <span>RSS</span>
              </div>
            </div>
          </div>
        );
      }

      if (styleId === "editorial-magazine") {
        return (
          <div className="font-serif bg-[#FAF7F2] text-[#2C1E1B] p-8 space-y-24 min-h-full text-left">
            {/* 1. Navbar */}
            <div className="border-b border-[#402E2B]/10 pb-4 flex justify-between items-center text-xs tracking-widest font-mono">
              <span className="font-black uppercase tracking-tight text-sm">{blogName} // ARCHIVE</span>
              <div className="hidden md:flex gap-6 uppercase text-[9px] tracking-widest text-[#7C635E]">
                <span>Spotlight</span>
                <span>Magazine</span>
                <span>Donations</span>
                <span>Contact</span>
              </div>
              <span className="text-[#402E2B]">VOLUME IV</span>
            </div>

            {/* 2. Featured Post */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-8 border-b border-[#402E2B]/10">
              <div className="md:col-span-8 space-y-6 text-left">
                <span className="px-2 py-0.5 bg-[#402E2B] text-white text-[8px] font-mono tracking-widest uppercase">COVER PIECE</span>
                <h1 className="text-3xl md:text-5xl font-serif font-black italic tracking-tight leading-none text-[#2C1E1B]">{featuredPost.title}</h1>
                <p className="text-xs text-[#7C635E] leading-relaxed font-sans">{featuredPost.excerpt}</p>
                <div className="text-[10px] text-[#7C635E] font-sans font-bold flex gap-3 pt-2">
                  <span>{featuredPost.author}</span>
                  <span>•</span>
                  <span>{featuredPost.readTime}</span>
                </div>
              </div>
              <div className="md:col-span-4 border border-[#402E2B]/20 p-1 bg-white">
                <img src="/demo/portfolio-editorial.png" alt="Editorial Magazine" className="w-full h-40 object-cover filter sepia-[20%] grayscale" />
              </div>
            </div>

            {/* 3. Latest Articles */}
            <div className="space-y-6">
              <span className="text-[9px] font-mono tracking-widest text-[#7C635E] uppercase block">// CHRONOLOGICAL ARCHIVE</span>
              <div className="space-y-6 divide-y divide-[#402E2B]/10">
                {posts.map((post, idx) => (
                  <div key={idx} className="pt-6 grid grid-cols-1 md:grid-cols-12 gap-4">
                    <span className="md:col-span-3 text-[10px] font-mono text-[#7C635E]">{post.date}</span>
                    <div className="md:col-span-9 space-y-2">
                      <h4 className="text-lg font-bold italic text-[#2C1E1B]">{post.title}</h4>
                      <p className="text-xs text-[#7C635E] leading-relaxed font-sans">{post.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Categories */}
            <div className="space-y-3 font-sans text-xs">
              <span className="text-[8px] font-mono tracking-widest text-[#7C635E] uppercase block">// REGISTERED COLUMNS</span>
              <div className="flex flex-wrap gap-2">
                {categoriesList.map((cat, idx) => (
                  <span key={idx} className="px-3 py-1.5 border border-[#402E2B]/20 bg-white text-[9px] font-mono uppercase text-[#2C1E1B]">{cat}</span>
                ))}
              </div>
            </div>

            {/* 5. Author Section */}
            <div className="border border-[#402E2B]/20 p-6 bg-white grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-3 text-center">
                <div className="w-16 h-16 rounded-full bg-[#402E2B] text-white flex items-center justify-center text-xl font-serif italic mx-auto">
                  {authorInfo.name[0]}
                </div>
              </div>
              <div className="md:col-span-9 space-y-2 font-sans text-xs">
                <h4 className="font-serif italic text-base text-[#2C1E1B] font-bold">{authorInfo.name}</h4>
                <span className="text-[9px] font-mono tracking-widest text-[#7C635E] uppercase block">{authorInfo.role}</span>
                <p className="text-[11px] text-[#7C635E] leading-relaxed mt-2">{authorInfo.bio}</p>
              </div>
            </div>

            {/* 6. Newsletter */}
            <div className="bg-[#402E2B] text-[#FAF7F2] p-8 text-center space-y-4">
              <span className="text-[8px] font-mono tracking-widest uppercase block">// CIRCULAR TRANSMISSION</span>
              <h4 className="text-xl font-serif italic text-white">Join The Reading Archive</h4>
              <p className="text-xs text-[#FAF7F2]/70 max-w-sm mx-auto leading-relaxed">
                Receive weekly print telemetry specifications in high contrast ink.
              </p>
              <div className="flex gap-2 max-w-md mx-auto pt-2 font-mono">
                <input type="email" placeholder="EMAIL" className="bg-[#FAF7F2]/10 border border-[#FAF7F2]/20 text-white placeholder-[#FAF7F2]/50 p-2.5 text-xs outline-none flex-grow" />
                <button className="bg-[#FAF7F2] text-[#402E2B] px-5 text-xs font-black uppercase tracking-wider">SUBMIT</button>
              </div>
            </div>

            {/* 7. Footer */}
            <div className="border-t border-[#402E2B]/10 pt-6 flex justify-between items-center text-[9px] tracking-widest text-[#7C635E] font-mono uppercase">
              <span>© 2026 {blogName}. SOVEREIGN PUBLISHING.</span>
              <span>VOL. IV</span>
            </div>
          </div>
        );
      }

      if (styleId === "modern-publisher") {
        return (
          <div className="font-sans bg-[#FCFCFD] text-neutral-900 p-8 space-y-24 min-h-full text-left">
            {/* 1. Navbar */}
            <div className="flex justify-between items-center bg-white border border-neutral-100 rounded-2xl px-5 py-3 shadow-sm">
              <span className="font-black text-sm text-[#7C3AED] uppercase">{blogName}</span>
              <div className="hidden md:flex gap-5 text-[10px] font-bold text-neutral-500 uppercase">
                <span>Spotlight</span>
                <span>Bento Feed</span>
                <span>Newsletter</span>
              </div>
              <span className="text-[10px] font-bold text-[#7C3AED] bg-purple-50 rounded-full px-3 py-1">v2.1</span>
            </div>

            {/* 2. Featured Post */}
            <div className="bg-white border border-neutral-100 rounded-3xl p-6 shadow-sm space-y-4">
              <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-[9px] font-bold uppercase tracking-wider font-sans">featured_spotlight.txt</span>
              <h2 className="text-2xl font-black text-neutral-950 tracking-tight">{featuredPost.title}</h2>
              <p className="text-xs text-neutral-555 leading-relaxed">{featuredPost.excerpt}</p>
              <div className="text-[10px] text-neutral-400 font-bold flex gap-3">
                <span>{featuredPost.author}</span>
                <span>•</span>
                <span>{featuredPost.readTime}</span>
              </div>
            </div>

            {/* 3. Latest Articles */}
            <div className="space-y-6">
              <span className="text-[10px] font-bold text-neutral-450 uppercase tracking-wider">// LATEST_ARTICLES</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {posts.map((post, idx) => (
                  <div key={idx} className="bg-white border border-neutral-100 rounded-2xl p-5 shadow-xs space-y-2">
                    <h4 className="font-bold text-sm text-neutral-955">{post.title}</h4>
                    <p className="text-[11px] text-neutral-500 leading-relaxed">{post.desc}</p>
                    <span className="text-[9px] font-bold text-[#7C3AED] uppercase block">{post.readTime}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Categories */}
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-neutral-450 uppercase tracking-wider">// CLASSIFIED_TAGS</span>
              <div className="flex flex-wrap gap-2">
                {categoriesList.map((cat, idx) => (
                  <span key={idx} className="px-3 py-1 bg-[#7C3AED]/5 text-[#7C3AED] rounded-md text-[10px] font-bold">{cat}</span>
                ))}
              </div>
            </div>

            {/* 5. Author Section */}
            <div className="bg-white border border-neutral-100 rounded-3xl p-6 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-500 text-white font-bold flex items-center justify-center text-sm shrink-0">
                {authorInfo.name[0]}
              </div>
              <div className="space-y-1 font-sans text-xs">
                <h4 className="font-bold text-xs text-neutral-900">{authorInfo.name}</h4>
                <span className="text-[9px] font-bold text-purple-650 uppercase block">{authorInfo.role}</span>
                <p className="text-[11px] text-neutral-400 leading-relaxed mt-1">{authorInfo.bio}</p>
              </div>
            </div>

            {/* 6. Newsletter */}
            <div className="bg-gradient-to-tr from-[#7C3AED]/10 to-indigo-50 border border-purple-100 rounded-3xl p-6 text-center space-y-4">
              <h4 className="text-base font-black text-[#7C3AED]">Synchronize Newsletter</h4>
              <p className="text-xs text-neutral-500 max-w-xs mx-auto leading-relaxed">
                Pre-load verified UI tokens natively. Receive static layouts.
              </p>
              <div className="flex gap-2 max-w-sm mx-auto">
                <input type="email" placeholder="Mail Address" className="w-full bg-white border border-purple-100 rounded-xl p-3 text-xs outline-none" />
                <button className="bg-[#7C3AED] text-white font-bold text-xs px-6 rounded-xl hover:opacity-90 transition-all">Transmit</button>
              </div>
            </div>

            {/* 7. Footer */}
            <div className="border-t border-neutral-100 pt-6 flex justify-between items-center text-[10px] text-neutral-450 font-bold uppercase">
              <span>© 2026 {blogName}. v2.1 COMPLIANT.</span>
              <span>build_v2.1.0</span>
            </div>
          </div>
        );
      }

      // Newsroom theme fallback
      return (
        <div className="font-sans bg-white text-black p-6 space-y-24 min-h-full text-left border-4 border-black">
          {/* 1. Navbar */}
          <div className="border-b-4 border-black pb-4 flex justify-between items-center text-[10px] font-black uppercase font-mono">
            <span className="bg-[#991B1B] text-white px-3 py-1 text-sm border-2 border-black">{blogName}</span>
            <div className="hidden md:flex gap-6">
              <span>NEWSROOM FEED</span>
              <span>LATEST ARCHIVES</span>
              <span>OPINION</span>
            </div>
            <span>STABLE DAILY</span>
          </div>

          {/* 2. Featured Post */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-b-4 border-black">
            <div className="md:col-span-2 space-y-4">
              <span className="bg-[#991B1B] text-white text-[8px] font-black px-2 py-0.5 uppercase tracking-widest font-mono">FLASH DAILY</span>
              <h1 className="text-3xl font-black uppercase tracking-tight leading-none">{featuredPost.title}</h1>
              <p className="text-xs text-neutral-700 leading-relaxed font-sans">{featuredPost.excerpt}</p>
              <div className="text-[9px] font-bold font-mono pt-2">
                <span>{featuredPost.author.toUpperCase()}</span>
                <span className="mx-2">/</span>
                <span>{featuredPost.readTime.toUpperCase()}</span>
              </div>
            </div>
            <div className="border-4 border-black p-1">
              <img src="/demo/portfolio-editorial.png" alt="Newsroom Graphic" className="w-full h-40 object-cover" />
            </div>
          </div>

          {/* 3. Latest Articles */}
          <div className="space-y-4">
            <span className="text-[10px] font-black uppercase tracking-wider font-mono bg-[#FFD93D] px-2 py-0.5 border-2 border-black inline-block">// CHRONOLOGICAL_FEED</span>
            <div className="space-y-6 divide-y-2 divide-black">
              {posts.map((post, idx) => (
                <div key={idx} className="pt-6 space-y-2">
                  <h4 className="text-xl font-black uppercase hover:text-[#991B1B] cursor-pointer">{post.title}</h4>
                  <p className="text-xs text-neutral-700 leading-relaxed">{post.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Categories */}
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-wider font-mono block">// DESK_SECTOR</span>
            <div className="flex flex-wrap gap-2">
              {categoriesList.map((cat, idx) => (
                <span key={idx} className="px-3 py-1 border-2 border-black font-black uppercase text-[10px] bg-white">{cat}</span>
              ))}
            </div>
          </div>

          {/* 5. Author Section */}
          <div className="border-4 border-black p-6 bg-white space-y-3">
            <span className="bg-black text-white text-[8px] font-black px-2 py-0.5 uppercase tracking-widest font-mono">COLUMN CONTRIBUTOR</span>
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 border-4 border-black bg-[#991B1B] text-white flex items-center justify-center font-black text-sm shrink-0">
                {authorInfo.name[0]}
              </div>
              <div className="space-y-0.5 font-mono text-[10px]">
                <h4 className="font-black uppercase text-xs">{authorInfo.name}</h4>
                <span className="text-neutral-550 uppercase font-black block">{authorInfo.role}</span>
              </div>
            </div>
            <p className="text-xs text-neutral-700 leading-relaxed font-sans">{authorInfo.bio}</p>
          </div>

          {/* 6. Newsletter */}
          <div className="border-4 border-black p-6 bg-[#FFD93D] space-y-4">
            <h4 className="text-lg font-black uppercase tracking-tight">TRANSMIT INK TELEMETRY</h4>
            <p className="text-xs text-black font-bold font-sans">
              Enter email dispatch credentials to subscribe.
            </p>
            <div className="flex gap-2 max-w-md font-mono text-[10px]">
              <input type="email" placeholder="payload.email" className="w-full bg-white border-2 border-black p-2.5 text-black outline-none" />
              <button className="bg-black text-white px-5 border-2 border-black font-black uppercase hover:bg-neutral-800">TRANSMIT</button>
            </div>
          </div>

          {/* 7. Footer */}
          <div className="border-t-4 border-black pt-6 flex justify-between items-center text-[9px] font-black font-mono uppercase">
            <span>© 2026 {blogName}. STABLE DAILY INC.</span>
            <span>build_v1.2</span>
          </div>
        </div>
      );
    }

    // --- BUSINESS WEBSITE CATEGORY RENDERING ---
    // Sequence: Hero → Services → About → Team → Projects → Testimonials → Contact → Footer
    if (categoryId === "business") {
      const companyName = websiteContent.about.title || "MUBIX SOLUTIONS";
      const headline = websiteContent.hero.headline || "Next-Generation Digital Transformation Advisory";
      const subheadline = websiteContent.hero.subheadline || "Accelerating global operations through highly optimized enterprise architecture, strategic prompt telemetry, and zero-latency pipelines.";

      const servicesList = [
        { title: "Enterprise Architecture", desc: "Designing robust systems built on modern design tokens and distributed telemetry channels." },
        { title: "Prompt Engineering", desc: "Refining AI prompt layers for extreme precision compilation and low-latency metrics." },
        { title: "Compliance Audits", desc: "Continuous automated scanning for compliance parity across legacy infrastructures." }
      ];

      const teamList = [
        { name: "Sarah Jenkins", role: "Chief Operating Officer", desc: "15+ years scaling legacy digital frameworks for Fortune 500 startups." },
        { name: "Mohammed Mubashir", role: "Principal Architect", desc: "AST visual compiler pioneer specializing in neobrutalist styling." }
      ];

      const projectsList = [
        { name: "Global Telemetry Parity", desc: "Automated scaling matrices deployed across 4 continents.", cat: "Enterprise" },
        { name: "Neobrutalist Blueprint", desc: "High contrast UI system architecture and rigid spacing tokens.", cat: "UI Engineering" }
      ];

      const testimonialsList = [
        { quote: "MUBIX solved our multi-region latency bottlenecks in under 3 weeks. An indispensable strategic partner.", author: "Marcus Vance, CTO at SlateCore" }
      ];

      if (styleId === "corporate") {
        return (
          <div className="font-sans bg-white text-[#1E293B] p-8 space-y-24 min-h-full text-left">
            {/* 1. Navbar */}
            <div className="border-b border-slate-100 pb-4 flex justify-between items-center text-xs">
              <span className="font-black text-sm tracking-tight text-[#1E3A8A]">{companyName}</span>
              <div className="hidden md:flex gap-6 uppercase text-[9px] tracking-wider text-slate-500 font-bold">
                <span>Services</span>
                <span>About</span>
                <span>Team</span>
                <span>Projects</span>
              </div>
              <button className="bg-[#1E3A8A] text-white hover:bg-blue-900 text-[10px] font-bold px-4 py-1.5 rounded">Contact Us</button>
            </div>

            {/* 2. Hero */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 space-y-6">
                <span className="px-2.5 py-0.5 bg-blue-50 text-[#1E3A8A] text-[9px] font-bold uppercase tracking-wider rounded">Enterprise Operations</span>
                <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">{headline}</h1>
                <p className="text-xs text-slate-550 leading-relaxed max-w-2xl">{subheadline}</p>
                <div className="flex gap-3">
                  <button className="bg-[#1E3A8A] text-white hover:bg-blue-900 text-xs px-5 py-2.5 font-bold rounded">Get Enterprise Audit</button>
                  <button className="border border-slate-200 hover:bg-slate-50 text-xs px-5 py-2.5 font-bold rounded">View Case Studies</button>
                </div>
              </div>
              <div className="md:col-span-5 border border-slate-200 rounded-lg overflow-hidden shadow-md bg-white p-1">
                <img src="/demo/business_hero_demo.png" alt="Business Hero" className="w-full h-auto object-cover" />
              </div>
            </div>

            {/* 3. Services */}
            <div className="space-y-6">
              <h3 className="text-xs tracking-widest text-[#1E3A8A] uppercase font-bold text-center">// STRATEGIC SERVICES</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {servicesList.map((svc, idx) => (
                  <div key={idx} className="bg-white border border-slate-150 p-6 rounded shadow-xs space-y-3">
                    <span className="text-[#1E3A8A] text-lg font-bold">0{idx + 1}.</span>
                    <h4 className="font-extrabold text-sm text-slate-900">{svc.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{svc.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. About */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-4">
                <span className="text-[9px] font-bold text-[#1E3A8A] uppercase tracking-wider">// OUR DNA</span>
                <h3 className="text-2xl font-extrabold text-slate-900 leading-snug">Unlocking Unprecedented Operational Velocity</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  We deploy automated AST compilers, compliant neobrutalist blueprints, and high information density frameworks. Our metrics guarantee parity.
                </p>
              </div>
              <div className="bg-slate-50 border border-slate-150 rounded p-6 h-40 flex items-center justify-center font-bold text-xs uppercase tracking-wider text-[#1E3A8A]">
                [ 99.8% Latency Parity Visualizer ]
              </div>
            </div>

            {/* 5. Team */}
            <div className="space-y-6">
              <h3 className="text-xs tracking-widest text-[#1E3A8A] uppercase font-bold text-center">// CORE DIRECTORS</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {teamList.map((t, idx) => (
                  <div key={idx} className="bg-slate-50/50 border border-slate-100 p-6 rounded flex gap-4 items-start">
                    <div className="w-10 h-10 rounded bg-[#1E3A8A] text-white flex items-center justify-center font-black text-xs shrink-0">{t.name[0]}</div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-xs text-slate-900">{t.name}</h4>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{t.role}</span>
                      <p className="text-[11px] text-slate-550 leading-relaxed pt-2">{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Projects */}
            <div className="space-y-6">
              <h3 className="text-xs tracking-widest text-[#1E3A8A] uppercase font-bold text-center">// GLOBAL ARCHIVES</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projectsList.map((proj, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 p-5 rounded space-y-2">
                    <span className="text-[8px] font-bold text-[#1E3A8A] bg-blue-50 px-2 py-0.5 rounded uppercase tracking-wider">{proj.cat}</span>
                    <h4 className="font-extrabold text-sm text-slate-900">{proj.name}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{proj.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 7. Testimonials */}
            <div className="bg-[#1E3A8A] text-white rounded p-8 text-center space-y-4">
              <span className="text-[8px] font-mono tracking-widest uppercase">// CLIENT FEEDBACK</span>
              <p className="text-sm md:text-base font-medium italic max-w-xl mx-auto leading-relaxed">
                "{testimonialsList[0].quote}"
              </p>
              <h5 className="text-[10px] font-bold uppercase tracking-wider text-blue-200">
                {testimonialsList[0].author}
              </h5>
            </div>

            {/* 8. Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-100">
              <div className="space-y-3 text-xs">
                <span className="text-[9px] font-bold text-[#1E3A8A] uppercase tracking-wider">// COMMUNICATE</span>
                <h4 className="text-lg font-bold text-slate-900">Initiate Enterprise Strategy</h4>
                <p className="text-slate-500">Address: One AST Telemetry Building, Silicon Suite 4</p>
                <p className="text-slate-500">Email: architecture@mubix-business.com</p>
              </div>
              <div className="space-y-3">
                <input type="email" placeholder="Mail Address" className="w-full border border-slate-200 p-2.5 text-xs rounded outline-none" />
                <button className="bg-[#1E3A8A] text-white text-xs font-bold w-full py-2.5 rounded">Transmit Dispatch</button>
              </div>
            </div>

            {/* 9. Footer */}
            <div className="border-t border-slate-100 pt-6 flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase">
              <span>© 2026 {companyName}. PARITY REGISTERED.</span>
              <div className="flex gap-4">
                <span>Legal</span>
                <span>Logs</span>
              </div>
            </div>
          </div>
        );
      }

      if (styleId === "enterprise") {
        return (
          <div className="font-sans bg-[#F8FAFC] text-[#0F172A] p-8 space-y-24 min-h-full text-left">
            {/* 1. Navbar */}
            <div className="border-b border-[#0F172A] pb-4 flex justify-between items-center text-xs">
              <span className="font-black text-sm tracking-tight text-black">{companyName} // ENTERPRISE</span>
              <div className="hidden md:flex gap-6 uppercase text-[9px] tracking-widest font-bold">
                <span>Operations</span>
                <span>Blueprint</span>
                <span>Directories</span>
              </div>
              <button className="bg-[#0F172A] text-white hover:bg-neutral-800 text-[10px] font-bold px-5 py-2">Consult Strategy</button>
            </div>

            {/* 2. Hero */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 space-y-6">
                <span className="px-2 py-0.5 bg-[#0F172A] text-white text-[8px] font-mono uppercase tracking-widest">VOLUME SPECIFICATION V4</span>
                <h1 className="text-4xl md:text-5xl font-black uppercase text-neutral-900 leading-none tracking-tight">{headline}</h1>
                <p className="text-xs text-neutral-600 leading-relaxed max-w-xl">{subheadline}</p>
                <button className="bg-[#0F172A] text-white hover:bg-neutral-800 text-xs px-6 py-3 font-bold uppercase tracking-wider">Execute Telemetry Pipeline</button>
              </div>
              <div className="md:col-span-5 border-2 border-neutral-900 overflow-hidden bg-white p-1">
                <img src="/demo/business_hero_demo.png" alt="Business Hero" className="w-full h-auto object-cover" />
              </div>
            </div>

            {/* 3. Services */}
            <div className="space-y-6">
              <span className="text-[9px] font-mono tracking-widest text-[#64748B] uppercase block">// REGISTERED DIRECTORIES</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {servicesList.map((svc, idx) => (
                  <div key={idx} className="bg-white border border-[#0F172A]/10 p-6 space-y-3">
                    <h4 className="font-bold text-sm text-neutral-900 uppercase tracking-tight">{svc.title}</h4>
                    <p className="text-xs text-neutral-600 leading-relaxed">{svc.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. About */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-t border-b border-[#0F172A]/10 py-12">
              <div className="space-y-4">
                <span className="text-[8px] font-mono text-[#64748B] uppercase tracking-widest block">// CORE SPECIFICATIONS</span>
                <h3 className="text-2xl font-black uppercase text-neutral-900 leading-tight">Meticulous Architectural Integrity</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  We specialize in absolute parity compilations. Our design tokens bypass default browser defaults to achieve 100% telemetry scaling with zero runtime costs.
                </p>
              </div>
              <div className="border border-[#0F172A] p-6 bg-white flex flex-col justify-between h-40">
                <span className="text-[8px] font-mono text-neutral-400">// COMPILING LOGS</span>
                <span className="text-xs font-mono font-black text-emerald-600">✓ ALL CHANNELS OPERATIONAL</span>
              </div>
            </div>

            {/* 5. Team */}
            <div className="space-y-6">
              <span className="text-[9px] font-mono tracking-widest text-[#64748B] uppercase block">// BOARD OFFICERS</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {teamList.map((t, idx) => (
                  <div key={idx} className="bg-white border border-[#0F172A]/10 p-6 flex flex-col justify-between h-40">
                    <div className="space-y-1">
                      <h4 className="font-black text-xs uppercase text-neutral-900">{t.name}</h4>
                      <span className="text-[8px] font-mono text-neutral-400 uppercase tracking-widest">{t.role}</span>
                    </div>
                    <p className="text-[11px] text-neutral-500 leading-relaxed">{t.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Projects */}
            <div className="space-y-6">
              <span className="text-[9px] font-mono tracking-widest text-[#64748B] uppercase block">// ACTIVE ARCHIVES</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projectsList.map((proj, idx) => (
                  <div key={idx} className="bg-white border border-[#0F172A]/20 p-5 flex justify-between items-start gap-4">
                    <div className="space-y-2">
                      <h4 className="font-bold text-sm text-neutral-950 uppercase">{proj.name}</h4>
                      <p className="text-xs text-neutral-550">{proj.desc}</p>
                    </div>
                    <span className="text-[8px] font-mono border border-black/35 px-2 py-0.5 uppercase shrink-0">{proj.cat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 7. Testimonials */}
            <div className="border border-[#0F172A] p-8 text-center bg-white space-y-4">
              <span className="text-[8px] font-mono tracking-widest uppercase text-[#64748B] block">// TELEMETRY VALIDATION</span>
              <p className="text-sm font-black uppercase tracking-tight max-w-xl mx-auto leading-normal text-neutral-900">
                "{testimonialsList[0].quote}"
              </p>
              <span className="text-[9px] font-mono font-bold uppercase text-[#0F172A]">
                {testimonialsList[0].author.toUpperCase()}
              </span>
            </div>

            {/* 8. Contact */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-10 border-t border-[#0F172A]">
              <div className="md:col-span-5 space-y-3 font-mono text-[10px] text-neutral-500 uppercase">
                <span className="text-black font-bold">// SECURE CONNECTION</span>
                <h4 className="text-sm font-black text-black">Transmit Dispatch Channel</h4>
                <p>Telemetry: Silicon Suite 4, AST Block</p>
                <p>Secure Portal: tech-exec@mubix.io</p>
              </div>
              <div className="md:col-span-7 flex gap-2">
                <input type="email" placeholder="PAYLOAD.EMAIL" className="bg-white border border-black/20 p-3 text-xs outline-none flex-grow" />
                <button className="bg-black text-white px-6 text-xs font-bold uppercase tracking-wider font-mono">TRANSMIT</button>
              </div>
            </div>

            {/* 9. Footer */}
            <div className="border-t border-[#0F172A]/10 pt-6 flex justify-between items-center text-[9px] tracking-widest text-[#64748B] font-mono uppercase">
              <span>© 2026 {companyName}. SOVEREIGN COMPLIANT.</span>
              <span>build_v4.0.0</span>
            </div>
          </div>
        );
      }

      if (styleId === "consulting") {
        return (
          <div className="font-serif bg-[#FAF9F6] text-[#1A1A1A] p-8 space-y-24 min-h-full text-left">
            {/* 1. Navbar */}
            <div className="border-b border-[#C5A880]/30 pb-4 flex justify-between items-center text-xs font-sans tracking-widest">
              <span className="font-black text-sm tracking-widest uppercase text-neutral-900">{companyName} // ADVISORS</span>
              <div className="hidden md:flex gap-6 uppercase text-[9px] text-neutral-500">
                <span>Practices</span>
                <span>Philosophy</span>
                <span>Archives</span>
              </div>
              <button className="border border-[#C5A880] text-[#C5A880] px-5 py-2 uppercase hover:bg-[#C5A880] hover:text-black transition-all">Connect</button>
            </div>

            {/* 2. Hero */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 space-y-6">
                <span className="text-[9px] font-sans tracking-widest text-[#C5A880] uppercase block">// STRATEGIC PARITY</span>
                <h1 className="text-3xl md:text-5xl italic font-normal tracking-wide text-neutral-950 leading-tight">{headline}</h1>
                <p className="text-xs text-neutral-600 leading-relaxed font-sans max-w-xl">{subheadline}</p>
                <button className="bg-[#1A1A1A] text-white hover:bg-neutral-800 font-sans text-[10px] tracking-widest uppercase px-8 py-3.5">Schedule Discovery Session</button>
              </div>
              <div className="md:col-span-5 border border-[#C5A880]/30 p-1 bg-white">
                <img src="/demo/business_hero_demo.png" alt="Business Hero" className="w-full h-auto object-cover filter sepia-[10%]" />
              </div>
            </div>

            {/* 3. Services */}
            <div className="space-y-6">
              <span className="text-[9px] font-sans tracking-widest text-[#C5A880] uppercase block text-center">// CORE PRACTICES</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {servicesList.map((svc, idx) => (
                  <div key={idx} className="bg-transparent border border-[#C5A880]/20 p-6 space-y-4 rounded-none text-left">
                    <span className="font-serif italic text-base text-[#C5A880] block">0{idx + 1}</span>
                    <h4 className="font-bold text-sm text-neutral-950 uppercase tracking-wide font-sans">{svc.title}</h4>
                    <p className="text-xs text-neutral-600 leading-relaxed font-sans">{svc.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. About */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-12 border-t border-b border-[#C5A880]/30">
              <div className="md:col-span-8 space-y-4">
                <span className="text-[9px] font-sans tracking-widest text-[#C5A880] uppercase block">// STRATEGIC ARCHITECTURE</span>
                <h3 className="text-3xl italic font-normal text-neutral-950">A Philosophy of Spatial Telemetry Parity</h3>
                <p className="text-xs text-neutral-650 leading-relaxed font-sans max-w-xl">
                  We advise elite startups on distributed systems scaling. Our prompt telemetry guidelines bypass common layout grid issues, achieving precise visual outcomes that reflect corporate integrity.
                </p>
              </div>
              <div className="md:col-span-4 border border-[#C5A880]/20 p-1 bg-white flex items-center justify-center text-center">
                <img src="/demo/portfolio-editorial.png" alt="Consulting Graphic" className="w-full h-40 object-cover filter sepia-[20%] grayscale" />
              </div>
            </div>

            {/* 5. Team */}
            <div className="space-y-6">
              <span className="text-[9px] font-sans tracking-widest text-[#C5A880] uppercase block text-center">// LEAD ADVISORS</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {teamList.map((t, idx) => (
                  <div key={idx} className="bg-transparent border-l border-[#C5A880] pl-6 space-y-2">
                    <h4 className="font-serif italic text-lg text-neutral-950 font-bold">{t.name}</h4>
                    <span className="text-[9px] font-sans tracking-widest text-neutral-400 uppercase block">{t.role}</span>
                    <p className="text-xs text-neutral-600 leading-relaxed font-sans pt-2">{t.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Projects */}
            <div className="space-y-6">
              <span className="text-[9px] font-sans tracking-widest text-[#C5A880] uppercase block text-center">// SELECT ENGAGEMENTS</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projectsList.map((proj, idx) => (
                  <div key={idx} className="bg-white border border-[#C5A880]/15 p-6 space-y-2">
                    <span className="text-[8px] font-sans tracking-widest text-neutral-400 uppercase block">{proj.cat}</span>
                    <h4 className="font-serif italic text-base text-neutral-950 font-bold">{proj.name}</h4>
                    <p className="text-xs text-neutral-600 font-sans">{proj.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 7. Testimonials */}
            <div className="p-8 text-center space-y-4 border border-[#C5A880]/20 bg-white">
              <span className="text-[8px] font-sans tracking-widest uppercase text-neutral-400 block">// EXECUTIVE WITNESS</span>
              <p className="text-base italic max-w-xl mx-auto leading-relaxed text-neutral-900">
                "{testimonialsList[0].quote}"
              </p>
              <span className="text-[9px] font-sans tracking-widest font-bold uppercase text-[#C5A880] block">
                {testimonialsList[0].author}
              </span>
            </div>

            {/* 8. Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-10 border-t border-[#C5A880]/20">
              <div className="space-y-3 font-sans text-xs">
                <span className="text-[#C5A880] font-bold tracking-widest uppercase text-[9px] block">// CORRESPONDENCE</span>
                <h4 className="text-base font-serif italic text-neutral-950">Initiate Strategy Engagement</h4>
                <p className="text-neutral-500">Address: One AST Telemetry Building, Silicon Suite 4</p>
                <p className="text-neutral-500">Secure Dispatch: consulting@mubix-advisors.com</p>
              </div>
              <div className="space-y-4 font-sans">
                <input type="email" placeholder="EMAIL ADDRESS" className="w-full bg-white border border-[#C5A880]/30 p-3 text-xs outline-none uppercase font-sans text-xs" />
                <button className="bg-[#1A1A1A] text-white hover:bg-neutral-800 text-[9px] font-bold tracking-widest w-full py-3 uppercase">TRANSMIT REQUEST</button>
              </div>
            </div>

            {/* 9. Footer */}
            <div className="border-t border-[#C5A880]/20 pt-6 flex justify-between items-center text-[9px] tracking-widest text-[#C5A880] font-sans uppercase">
              <span>© 2026 {companyName}. DISCRETION GUARANTEED.</span>
              <span>v1.2.0</span>
            </div>
          </div>
        );
      }

      // Industrial style fallback
      return (
        <div className="font-sans bg-[#FCFCFD] text-[#0F172A] p-8 space-y-20 min-h-full text-left border-4 border-black">
          {/* 1. Navbar */}
          <div className="border-b-4 border-black pb-4 flex justify-between items-center text-xs font-mono font-black uppercase">
            <span className="bg-[#EA580C] text-white px-3 py-1 text-sm border-2 border-black">{companyName} // MFG</span>
            <div className="hidden md:flex gap-6">
              <span>STRUC_DIR</span>
              <span>BLUEPRINTS</span>
              <span>SPECS</span>
            </div>
            <span>STABLE DAILY</span>
          </div>

          {/* 2. Hero */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-6">
              <span className="bg-black text-white text-[8px] font-black px-2 py-0.5 uppercase tracking-widest font-mono">SPECIFICATION BLOCK_5</span>
              <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-none text-black">{headline}</h1>
              <p className="text-xs text-neutral-800 leading-relaxed font-sans">{subheadline}</p>
              <button className="border-4 border-black bg-[#EA580C] text-black font-black uppercase text-xs shadow-[4px_4px_0px_0px_#000] px-6 py-3 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">INSPECT BLUEPRINT</button>
            </div>
            <div className="md:col-span-5 border-4 border-black shadow-[6px_6px_0px_0px_#000] overflow-hidden bg-white">
              <img src="/demo/business_hero_demo.png" alt="Business Hero" className="w-full h-auto object-cover" />
            </div>
          </div>

          {/* 3. Services */}
          <div className="space-y-6">
            <span className="text-[10px] font-black uppercase tracking-wider font-mono bg-yellow-400 px-2 py-0.5 border-2 border-black inline-block">// STRUCTURAL_DIRECTORIES</span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {servicesList.map((svc, idx) => (
                <div key={idx} className="bg-white border-4 border-black p-6 space-y-2 shadow-[4px_4px_0px_0px_#000]">
                  <h4 className="font-black text-sm uppercase tracking-tight">{svc.title}</h4>
                  <p className="text-xs text-neutral-700 leading-normal">{svc.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 4. About */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-t-4 border-b-4 border-black py-10">
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-wider font-mono block">// SYSTEM_ABOUT</span>
              <h3 className="text-2xl font-black uppercase tracking-tight">Heavy Blueprints, Meticulous Parity</h3>
              <p className="text-xs text-neutral-700 leading-relaxed">
                Our operations guarantee latency parity. We deploy rigid industrial grids, high information density logs, and neon orange indicators built for heavy operational stress.
              </p>
            </div>
            <div className="border-4 border-black p-6 bg-white flex flex-col justify-between h-40 shadow-[4px_4px_0px_0px_#000]">
              <span className="text-[8px] font-mono text-neutral-400">// AUDIT_LOGS</span>
              <span className="text-xs font-mono font-black text-orange-600">✓ TELEMETRY PARITY ENGAGED</span>
            </div>
          </div>

          {/* 5. Team */}
          <div className="space-y-6">
            <span className="text-[10px] font-black uppercase tracking-wider font-mono block text-center">// CORE DIRECTORS</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teamList.map((t, idx) => (
                <div key={idx} className="bg-white border-4 border-black p-6 space-y-3 shadow-[4px_4px_0px_0px_#000]">
                  <h4 className="font-black text-sm uppercase tracking-tight">{t.name}</h4>
                  <span className="text-[8px] font-mono text-neutral-400 uppercase tracking-widest block">{t.role}</span>
                  <p className="text-xs text-neutral-750 leading-relaxed pt-2">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Projects */}
          <div className="space-y-6">
            <span className="text-[10px] font-black uppercase tracking-wider font-mono block text-center">// SELECT CASE DIRECTORIES</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projectsList.map((proj, idx) => (
                <div key={idx} className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_#000] flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <h4 className="font-black text-sm uppercase">{proj.name}</h4>
                    <p className="text-xs text-neutral-700 leading-normal">{proj.desc}</p>
                  </div>
                  <span className="text-[9px] font-mono border-2 border-black px-2 py-0.5 uppercase shrink-0">{proj.cat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 7. Testimonials */}
          <div className="border-4 border-black p-8 text-center bg-white space-y-4 shadow-[6px_6px_0px_0px_#000]">
            <span className="text-[8px] font-mono tracking-widest uppercase text-neutral-400 block">// WITNESS VERIFIED</span>
            <p className="text-sm font-black uppercase tracking-tight max-w-xl mx-auto leading-normal text-neutral-900">
              "{testimonialsList[0].quote}"
            </p>
            <span className="text-[9px] font-mono font-black uppercase text-[#EA580C] block">
              {testimonialsList[0].author.toUpperCase()}
            </span>
          </div>

          {/* 8. Contact */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-10 border-t-4 border-black">
            <div className="md:col-span-5 space-y-3 font-mono text-[10px] text-neutral-500 uppercase">
              <span className="text-black font-black">// STRUC_CHANNEL</span>
              <h4 className="text-sm font-black text-black">Transmit Payload Specs</h4>
              <p>Address: AST Block 4, Silicon Suite 9</p>
              <p>Direct Link: specs@mubix-industrial.com</p>
            </div>
            <div className="md:col-span-7 flex gap-2 font-mono text-[10px]">
              <input type="email" placeholder="payload.email" className="w-full bg-white border-4 border-black p-3 text-black outline-none" />
              <button className="bg-black text-white px-5 border-4 border-black font-black uppercase hover:bg-neutral-800">TRANSMIT</button>
            </div>
          </div>

          {/* 9. Footer */}
          <div className="border-t-4 border-black pt-6 flex justify-between items-center text-[9px] font-black font-mono uppercase">
            <span>© 2026 {companyName}. COMPLIANCE SECURED.</span>
            <span>build_v2.0.0</span>
          </div>
        </div>
      );
    }

    // --- STARTUP LANDING CATEGORY RENDERING ---
    // Sequence: Hero → Features → Product Demo → Benefits → Pricing → FAQ → Footer
    if (categoryId === "startup-landing") {
      const startupName = websiteContent.about.title || "MUBIX TELEMETRY";
      const headline = websiteContent.hero.headline || "Unparalleled operational telemetry for deep scaling systems";
      const subheadline = websiteContent.hero.subheadline || "The unified UI and data compilation layer that synchronizes design styles, natural prompt pipelines, and strict compliance rules.";

      const features = [
        { title: "Unified Compiling", desc: "Instantly maps natural text prompts into responsive React visual layers." },
        { title: "Compliance Pipelines", desc: "Real-time verification of WCAG and layout telemetry guidelines." },
        { title: "Bento Visualizer", desc: "Fluid grids with auto-scalable components built for dense metadata." }
      ];

      const benefits = [
        { title: "99.8% Latency Parity", desc: "Bypass normal layout rendering engine bottlenecks." },
        { title: "Zero Placeholder Noise", desc: "Always features production-grade visual elements." }
      ];

      const faqsList = [
        { q: "Is the visual preview accurate?", a: "Yes. Our visual sandboxes map design styles in pixel-perfect high-fidelity representation." },
        { q: "Can we switch visual styles on the fly?", a: "Absolutely. The theme compiles layout-specific parameters immediately on click." }
      ];

      if (styleId === "yc-startup") {
        return (
          <div className="font-sans bg-[#F6F6EF] text-neutral-900 p-8 space-y-20 min-h-full text-left">
            {/* 1. Navbar */}
            <div className="bg-[#FF6600] text-white p-3 flex justify-between items-center text-xs font-bold rounded-sm">
              <span>🟠 {startupName} // COHORT26</span>
              <div className="hidden md:flex gap-4 font-mono text-[10px]">
                <span>Features</span>
                <span>Demo</span>
                <span>Pricing</span>
              </div>
              <span className="text-[10px] bg-white text-[#FF6600] px-2 py-0.5 rounded-sm">Apply</span>
            </div>

            {/* 2. Hero */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center py-6">
              <div className="md:col-span-7 space-y-6">
                <h1 className="text-3xl md:text-5xl font-black text-black leading-tight tracking-tight">{headline}</h1>
                <p className="text-xs text-neutral-700 leading-relaxed font-sans">{subheadline}</p>
                <div className="flex gap-2">
                  <button className="bg-[#FF6600] text-white hover:bg-orange-600 text-xs font-bold px-5 py-2.5 rounded">Deploy Visual Sandbox</button>
                  <button className="bg-white border border-[#E0E0D8] text-xs font-bold px-5 py-2.5 rounded">Request Audit Docs</button>
                </div>
              </div>
              <div className="md:col-span-5 border border-[#E0E0D8] bg-white p-1 rounded">
                <img src="/demo/startup_hero_demo.png" alt="Startup Hero" className="w-full h-auto object-cover" />
              </div>
            </div>

            {/* 3. Features */}
            <div className="space-y-6">
              <h3 className="text-xs font-mono font-bold text-[#FF6600]">// ARCHITECTURAL FEATURES</h3>
              <div className="space-y-4 divide-y divide-[#E0E0D8]">
                {features.map((feat, idx) => (
                  <div key={idx} className="pt-4 flex gap-4 items-start">
                    <span className="font-mono text-neutral-450 font-bold">0{idx + 1}.</span>
                    <div className="space-y-1">
                      <h4 className="font-bold text-sm text-neutral-900">{feat.title}</h4>
                      <p className="text-xs text-neutral-600">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Product Demo */}
            <div className="border border-[#E0E0D8] bg-white rounded p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-[#E0E0D8] pb-2 text-[10px] text-neutral-400 font-mono">
                <span>sandbox_telemetry_grid.ts</span>
                <span className="text-[#FF6600] font-bold">● ACTIVE</span>
              </div>
              <div className="bg-[#F6F6EF] h-48 rounded flex items-center justify-center text-xs font-mono text-neutral-500 uppercase">
                [ Interactive Live Compiler Demonstration ]
              </div>
            </div>

            {/* 5. Benefits */}
            <div className="space-y-6">
              <h3 className="text-xs font-mono font-bold text-[#FF6600]">// STATISTICAL BENEFIT PARITY</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {benefits.map((b, idx) => (
                  <div key={idx} className="bg-white border border-[#E0E0D8] p-5 rounded space-y-2">
                    <h4 className="font-bold text-sm text-black">{b.title}</h4>
                    <p className="text-xs text-neutral-600">{b.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Pricing */}
            <div className="space-y-6">
              <h3 className="text-xs font-mono font-bold text-[#FF6600]">// SUBSCRIPTION BRACKET</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {["Starter", "Growth", "Enterprise"].map((tier, idx) => (
                  <div key={idx} className={`bg-white border p-5 rounded space-y-4 ${tier === "Growth" ? "border-[#FF6600] ring-1 ring-[#FF6600]" : "border-[#E0E0D8]"}`}>
                    <h4 className="font-bold text-sm text-black">{tier}</h4>
                    <span className="text-2xl font-black text-black block">${idx === 0 ? "0" : idx === 1 ? "49" : "299"}<span className="text-[10px] text-neutral-450 font-normal">/mo</span></span>
                    <button className="w-full bg-[#FF6600] text-white hover:bg-orange-600 font-bold text-xs py-2 rounded">Choose {tier}</button>
                  </div>
                ))}
              </div>
            </div>

            {/* 7. FAQ */}
            <div className="space-y-6">
              <h3 className="text-xs font-mono font-bold text-[#FF6600]">// QUESTION DIRECTORY</h3>
              <div className="space-y-4">
                {faqsList.map((faq, idx) => (
                  <div key={idx} className="border-b border-[#E0E0D8] pb-4 cursor-pointer" onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
                    <h4 className="font-bold text-xs text-neutral-900 flex justify-between items-center">
                      <span>{faq.q}</span>
                      <span>{openFaq === idx ? "-" : "+"}</span>
                    </h4>
                    {openFaq === idx && <p className="text-xs text-neutral-600 pt-2 leading-relaxed">{faq.a}</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* 8. Footer */}
            <div className="border-t border-[#E0E0D8] pt-6 flex justify-between items-center text-[10px] font-mono text-neutral-500 uppercase">
              <span>© 2026 {startupName}. YC COHORT.</span>
              <span>build_v1.0.4</span>
            </div>
          </div>
        );
      }

      if (styleId === "stripe-style") {
        return (
          <div className="font-sans bg-white text-[#0A2540] p-8 space-y-24 min-h-full text-left overflow-hidden relative">
            {/* Soft decorative glow background spots */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-tr from-[#635BFF]/10 to-indigo-100 rounded-full blur-3xl -z-10" />

            {/* 1. Navbar */}
            <div className="pb-4 flex justify-between items-center text-xs">
              <span className="font-black text-sm tracking-tight text-[#635BFF]">{startupName}</span>
              <div className="hidden md:flex gap-6 uppercase text-[9px] tracking-wider text-slate-500 font-bold">
                <span>Features</span>
                <span>Integrations</span>
                <span>Pricing</span>
              </div>
              <button className="bg-[#635BFF] text-white hover:opacity-90 text-[10px] font-bold px-4 py-1.5 rounded-lg shadow-sm">Get Sandbox Key</button>
            </div>

            {/* 2. Hero */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 space-y-6">
                <span className="px-2.5 py-0.5 bg-indigo-50 text-[#635BFF] text-[9px] font-bold uppercase tracking-wider rounded-full">SaaS API Integration</span>
                <h1 className="text-3xl md:text-5xl font-extrabold text-[#0A2540] leading-tight tracking-tight">{headline}</h1>
                <p className="text-xs text-slate-500 leading-relaxed max-w-xl">{subheadline}</p>
                <div className="flex gap-3 pt-2">
                  <button className="bg-[#635BFF] text-white hover:opacity-95 text-xs px-5 py-2.5 font-bold rounded-lg shadow-md shadow-indigo-500/10">Start API Dev</button>
                  <button className="border border-slate-200 hover:bg-slate-50 text-[#635BFF] text-xs px-5 py-2.5 font-bold rounded-lg">Browse API Docs</button>
                </div>
              </div>
              <div className="md:col-span-5 border border-slate-100 rounded-2xl overflow-hidden shadow-xl bg-white/80 p-1 backdrop-blur-xs">
                <img src="/demo/startup_hero_demo.png" alt="Startup Hero" className="w-full h-auto object-cover" />
              </div>
            </div>

            {/* 3. Features */}
            <div className="space-y-6">
              <h3 className="text-xs tracking-widest text-[#635BFF] uppercase font-bold text-center">// PLATFORM TELEMETRY</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((feat, idx) => (
                  <div key={idx} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm space-y-2.5">
                    <span className="w-8 h-8 rounded-lg bg-indigo-50 text-[#635BFF] flex items-center justify-center font-bold text-xs">0{idx + 1}</span>
                    <h4 className="font-extrabold text-sm text-[#0A2540]">{feat.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{feat.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Product Demo */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-50 pb-3">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-green-400" />
                <span className="text-[10px] text-slate-450 font-mono pl-4">stripe_telemetry_stream.js</span>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl font-mono text-[10px] text-[#00F2FE] overflow-x-auto space-y-2">
                <p className="text-slate-400">// Initialize distributed visual compiler parity stream</p>
                <p>const stream = new MubixTelemetryStream(&#123; styleId: "stripe-style" &#125;);</p>
                <p>stream.on("parity", (matrix) =&gt; console.log(matrix.success));</p>
                <p className="text-emerald-400">&gt;&gt; [Telemetry Stream Connected successfully]</p>
              </div>
            </div>

            {/* 5. Benefits */}
            <div className="space-y-6">
              <h3 className="text-xs tracking-widest text-[#635BFF] uppercase font-bold text-center">// CORE TELEMETRY ADVANTAGES</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {benefits.map((b, idx) => (
                  <div key={idx} className="bg-white border border-slate-100 p-6 rounded-xl shadow-xs space-y-2">
                    <h4 className="font-extrabold text-sm text-[#0A2540]">{b.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{b.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Pricing */}
            <div className="space-y-6">
              <h3 className="text-xs tracking-widest text-[#635BFF] uppercase font-bold text-center">// TRANSPARENT TELEMETRY PRICE BRACKET</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {["Starter", "Growth", "Enterprise"].map((tier, idx) => (
                  <div key={idx} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm space-y-4 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">{tier}</h4>
                      <span className="text-3xl font-black text-[#0A2540] block">${idx === 0 ? "0" : idx === 1 ? "49" : "299"}<span className="text-[10px] text-slate-450 font-normal">/mo</span></span>
                    </div>
                    <button className="w-full bg-[#635BFF] text-white hover:opacity-90 font-bold text-xs py-2 rounded-lg shadow-sm">Select {tier}</button>
                  </div>
                ))}
              </div>
            </div>

            {/* 7. FAQ */}
            <div className="max-w-2xl mx-auto space-y-6">
              <h3 className="text-xs tracking-widest text-[#635BFF] uppercase font-bold text-center">// QUESTION MATRIX</h3>
              <div className="space-y-3">
                {faqsList.map((faq, idx) => (
                  <div key={idx} className="border border-slate-100 bg-white rounded-xl p-4 cursor-pointer" onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
                    <h4 className="font-extrabold text-xs text-[#0A2540] flex justify-between items-center">
                      <span>{faq.q}</span>
                      <span>{openFaq === idx ? "-" : "+"}</span>
                    </h4>
                    {openFaq === idx && <p className="text-xs text-slate-500 pt-2 leading-relaxed font-sans">{faq.a}</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* 8. Footer */}
            <div className="border-t border-slate-100 pt-6 flex justify-between items-center text-[10px] text-slate-450 font-bold uppercase">
              <span>© 2026 {startupName}. POWERING THE VIRTUAL CORES.</span>
              <span>build_v2.0</span>
            </div>
          </div>
        );
      }

      if (styleId === "linear-style") {
        return (
          <div className="font-sans bg-[#050506] text-[#EDEDEF] p-8 space-y-24 min-h-full text-left relative overflow-hidden">
            {/* Neon violet radial glow spotlight */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl -z-10" />

            {/* 1. Navbar */}
            <div className="border-b border-neutral-800 pb-4 flex justify-between items-center text-xs">
              <span className="font-black text-sm tracking-tight text-white">{startupName}</span>
              <div className="hidden md:flex gap-6 uppercase text-[9px] tracking-widest text-neutral-450 font-bold">
                <span>Specs</span>
                <span>Blueprint</span>
                <span>Console</span>
              </div>
              <button className="border border-[#5E6AD2] bg-[#5E6AD2]/10 text-white font-mono text-[9px] tracking-wider px-4 py-1.5 rounded hover:bg-[#5E6AD2] transition-all">Connect SDK</button>
            </div>

            {/* 2. Hero */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 space-y-6">
                <span className="px-3 py-1 bg-[#5E6AD2]/10 border border-[#5E6AD2]/30 text-[#EDEDEF] text-[8px] font-mono uppercase tracking-widest rounded-full">Telemetry Specification 2.4</span>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-none">{headline}</h1>
                <p className="text-xs text-neutral-400 leading-relaxed max-w-xl">{subheadline}</p>
                <button className="border border-[#5E6AD2] bg-[#5E6AD2]/20 text-white hover:bg-[#5E6AD2] text-xs font-mono px-6 py-3 rounded-md transition-all">Download Linux Installer</button>
              </div>
              <div className="md:col-span-5 border border-neutral-800 rounded-lg overflow-hidden bg-[#0A0A0C] p-1 shadow-2xl">
                <img src="/demo/startup_hero_demo.png" alt="Startup Hero" className="w-full h-auto object-cover filter brightness-90 saturate-110" />
              </div>
            </div>

            {/* 3. Features */}
            <div className="space-y-6">
              <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase block">// PLATFORM SPECIFICATIONS</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((feat, idx) => (
                  <div key={idx} className="bg-[#0a0a0c]/60 border border-neutral-800 p-6 rounded-lg space-y-2.5">
                    <span className="text-[9px] font-mono text-[#5E6AD2] block">[ SPEC_{idx + 1} ]</span>
                    <h4 className="font-bold text-sm text-white">{feat.title}</h4>
                    <p className="text-xs text-neutral-400 leading-relaxed">{feat.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Product Demo */}
            <div className="bg-[#0a0a0c]/80 border border-neutral-800 rounded-lg p-5 space-y-3">
              <div className="flex justify-between items-center text-[8px] font-mono text-neutral-500 border-b border-neutral-800 pb-2">
                <span>telemetry_visualizer_v2.4.c</span>
                <span className="text-[#5E6AD2]">ESTABLISHED</span>
              </div>
              <div className="h-44 bg-[#050506] border border-neutral-900 rounded flex items-center justify-center font-mono text-[9px] text-neutral-500 uppercase tracking-widest">
                [ Render Parity Canvas Live Stream ]
              </div>
            </div>

            {/* 5. Benefits */}
            <div className="space-y-6">
              <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase block">// PERFORMANCE METRICS</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {benefits.map((b, idx) => (
                  <div key={idx} className="bg-[#0a0a0c]/60 border border-neutral-800 p-6 rounded-lg space-y-2">
                    <h4 className="font-bold text-sm text-white">{b.title}</h4>
                    <p className="text-xs text-neutral-400 leading-relaxed">{b.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Pricing */}
            <div className="space-y-6">
              <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase block">// SUBSCRIPTION PACKETS</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {["Starter", "Growth", "Enterprise"].map((tier, idx) => (
                  <div key={idx} className="bg-[#0a0a0c]/80 border border-neutral-800 p-6 rounded-lg space-y-4 flex flex-col justify-between">
                    <div className="space-y-1">
                      <h4 className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">{tier}</h4>
                      <span className="text-3xl font-bold text-white block">${idx === 0 ? "0" : idx === 1 ? "49" : "299"}<span className="text-[10px] text-neutral-500 font-normal">/mo</span></span>
                    </div>
                    <button className="w-full border border-neutral-700 bg-transparent text-white font-mono text-[9px] uppercase tracking-wider py-2 rounded hover:border-[#5E6AD2]">Launch {tier}</button>
                  </div>
                ))}
              </div>
            </div>

            {/* 7. FAQ */}
            <div className="max-w-2xl mx-auto space-y-6">
              <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase block text-center">// ACCORDION LOGS</span>
              <div className="space-y-3">
                {faqsList.map((faq, idx) => (
                  <div key={idx} className="border border-neutral-800 bg-[#0a0a0c]/60 rounded-lg p-4 cursor-pointer" onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
                    <h4 className="font-bold text-xs text-white flex justify-between items-center font-sans">
                      <span>{faq.q}</span>
                      <span className="text-[#5E6AD2]">{openFaq === idx ? "[-]" : "[+]"}</span>
                    </h4>
                    {openFaq === idx && <p className="text-xs text-neutral-400 pt-2 leading-relaxed font-sans">{faq.a}</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* 8. Footer */}
            <div className="border-t border-neutral-850 pt-6 flex justify-between items-center text-[9px] text-neutral-500 font-mono uppercase">
              <span>© 2026 {startupName}. DISTRIBUTED SYSTEM ADAPTATION.</span>
              <span>build_v2.4.1</span>
            </div>
          </div>
        );
      }

      // Modern SaaS fallback
      return (
        <div className="font-sans bg-[#FCFCFD] text-[#1F2937] p-8 space-y-24 min-h-full text-left">
          {/* 1. Navbar */}
          <div className="flex justify-between items-center bg-white border border-neutral-100 rounded-2xl px-5 py-3 shadow-sm">
            <span className="font-black text-sm text-[#7C3AED] uppercase">{startupName}</span>
            <div className="hidden md:flex gap-5 text-[10px] font-bold text-neutral-500 uppercase">
              <span>Features</span>
              <span>Benefits</span>
              <span>Pricing</span>
            </div>
            <span className="text-[10px] font-bold text-[#7C3AED] bg-purple-50 rounded-full px-3 py-1">v3.2</span>
          </div>

          {/* 2. Hero */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-6">
              <span className="px-3 py-1 bg-purple-50 text-[#7C3AED] rounded-full text-[9px] font-bold uppercase tracking-wider">Polished SaaS Engine</span>
              <h1 className="text-3xl md:text-5xl font-black text-neutral-900 leading-tight tracking-tight">{headline}</h1>
              <p className="text-xs text-neutral-600 leading-relaxed max-w-xl">{subheadline}</p>
              <button className="rounded-xl bg-[#7C3AED] text-white px-6 py-3 font-bold text-xs shadow-sm hover:opacity-90 active:scale-95 transition-all">Start Free Trial</button>
            </div>
            <div className="md:col-span-5 border border-neutral-100 rounded-2xl overflow-hidden bg-white p-1 shadow-lg">
              <img src="/demo/startup_hero_demo.png" alt="Startup Hero" className="w-full h-auto object-cover" />
            </div>
          </div>

          {/* 3. Features */}
          <div className="space-y-6">
            <h3 className="text-xs tracking-wider text-[#7C3AED] uppercase font-bold text-center">// POWERFUL FEATURES</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feat, idx) => (
                <div key={idx} className="bg-white border border-neutral-100 rounded-2xl p-6 shadow-sm space-y-2.5">
                  <h4 className="font-black text-sm text-neutral-900">{feat.title}</h4>
                  <p className="text-xs text-neutral-500 leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Product Demo */}
          <div className="bg-white border border-neutral-100 rounded-3xl p-6 shadow-sm space-y-4">
            <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-[9px] font-bold uppercase tracking-wider block w-fit">interactive_view.tsx</span>
            <div className="bg-neutral-50 h-44 rounded-2xl flex items-center justify-center text-xs font-bold text-neutral-450 uppercase">
              [ Unified UI Demo Canvas ]
            </div>
          </div>

          {/* 5. Benefits */}
          <div className="space-y-6">
            <h3 className="text-xs tracking-wider text-[#7C3AED] uppercase font-bold text-center">// CORE ADVANTAGES</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((b, idx) => (
                <div key={idx} className="bg-white border border-neutral-100 rounded-2xl p-6 shadow-sm space-y-2">
                  <h4 className="font-bold text-sm text-neutral-950">{b.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Pricing */}
          <div className="space-y-6">
            <h3 className="text-xs tracking-wider text-[#7C3AED] uppercase font-bold text-center">// PRICING PACKS</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {["Starter", "Growth", "Enterprise"].map((tier, idx) => (
                <div key={idx} className="bg-white border border-neutral-100 rounded-2xl p-6 shadow-sm space-y-4 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-400">{tier}</h4>
                    <span className="text-3xl font-black text-neutral-950 block">${idx === 0 ? "0" : idx === 1 ? "49" : "299"}<span className="text-[10px] text-neutral-450 font-normal">/mo</span></span>
                  </div>
                  <button className="w-full bg-[#7C3AED] text-white hover:opacity-90 font-bold text-xs py-2.5 rounded-xl shadow-xs">Activate {tier}</button>
                </div>
              ))}
            </div>
          </div>

          {/* 7. FAQ */}
          <div className="max-w-2xl mx-auto space-y-6">
            <h3 className="text-xs tracking-wider text-[#7C3AED] uppercase font-bold text-center">// QUESTIONS & ANSWER LOGS</h3>
            <div className="space-y-3">
              {faqsList.map((faq, idx) => (
                <div key={idx} className="bg-white border border-neutral-100 rounded-2xl p-4 cursor-pointer" onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
                  <h4 className="font-extrabold text-xs text-neutral-950 flex justify-between items-center">
                    <span>{faq.q}</span>
                    <span>{openFaq === idx ? "-" : "+"}</span>
                  </h4>
                  {openFaq === idx && <p className="text-xs text-neutral-500 pt-2 leading-relaxed">{faq.a}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* 8. Footer */}
          <div className="border-t border-neutral-100 pt-6 flex justify-between items-center text-[10px] text-neutral-450 font-bold uppercase">
            <span>© 2026 {startupName}. ALL VIRTUAL CHANNELS SECURED.</span>
            <span>v3.2.0</span>
          </div>
        </div>
      );
    }

    // --- SAAS DASHBOARD CATEGORY RENDERING ---
    // Sequence: Sidebar → Dashboard → Analytics → Charts → Reports → Settings
    if (categoryId === "saas-dashboard") {
      const dashboardName = websiteContent.about.title || "MUBIX ANALYTICS";

      const metrics = [
        { label: "Revenue", value: "$128,450", change: "+14.8%", desc: "vs last month" },
        { label: "Active Users", value: "12,452", change: "+8.2%", desc: "vs last week" },
        { label: "Parity Rates", value: "99.8%", change: "Stable", desc: "No runtime costs" }
      ];

      const logs = [
        { item: "Telemetry compile session", user: "Mohammed Mubashir", status: "Completed", time: "2 min ago" },
        { item: "AST visual generation", user: "Sarah Jenkins", status: "Completed", time: "12 min ago" },
        { item: "Compliance scan", user: "System Pipeline", status: "Active", time: "Just now" }
      ];

      // Layout style implementations: modern-analytics, fintech, crm, enterprise
      if (styleId === "modern-analytics") {
        return (
          <div className="font-sans bg-[#030712] text-[#F9FAFB] min-h-full flex text-left relative overflow-hidden">
            {/* 1. Sidebar Left */}
            <div className="w-48 bg-[#090D16] border-r border-gray-800 p-5 space-y-8 shrink-0">
              <span className="font-black text-sm tracking-tight text-white block uppercase">⚡ {dashboardName}</span>
              <div className="space-y-2 text-[10px] font-bold uppercase text-neutral-400 font-mono">
                <div onClick={() => setDashboardTab("overview")} className={`p-2 rounded-lg cursor-pointer flex items-center gap-2 ${dashboardTab === "overview" ? "bg-emerald-500/10 text-[#10B981] border border-emerald-500/20" : "hover:text-white"}`}>
                  <span>📊 OVERVIEW</span>
                </div>
                <div onClick={() => setDashboardTab("analytics")} className={`p-2 rounded-lg cursor-pointer flex items-center gap-2 ${dashboardTab === "analytics" ? "bg-emerald-500/10 text-[#10B981] border border-emerald-500/20" : "hover:text-white"}`}>
                  <span>📈 ANALYTICS</span>
                </div>
                <div onClick={() => setDashboardTab("reports")} className={`p-2 rounded-lg cursor-pointer flex items-center gap-2 ${dashboardTab === "reports" ? "bg-emerald-500/10 text-[#10B981] border border-emerald-500/20" : "hover:text-white"}`}>
                  <span>📋 REPORTS</span>
                </div>
                <div onClick={() => setDashboardTab("settings")} className={`p-2 rounded-lg cursor-pointer flex items-center gap-2 ${dashboardTab === "settings" ? "bg-emerald-500/10 text-[#10B981] border border-emerald-500/20" : "hover:text-white"}`}>
                  <span>⚙️ SETTINGS</span>
                </div>
              </div>
            </div>

            {/* 2. Main Dashboard Container Right */}
            <div className="flex-1 p-6 space-y-8 overflow-y-auto">
              {/* Header block */}
              <div className="flex justify-between items-center border-b border-gray-800 pb-4">
                <h2 className="text-xl font-bold uppercase tracking-tight text-white">{dashboardTab.toUpperCase()} PANEL</h2>
                <span className="text-[9px] font-mono font-bold bg-emerald-500/10 text-[#10B981] border border-emerald-500/20 px-2 py-0.5 rounded">STREAM_LIVE</span>
              </div>

              {/* View switches */}
              {dashboardTab === "overview" && (
                <div className="space-y-8">
                  {/* 3. Analytics metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {metrics.map((m, idx) => (
                      <div key={idx} className="bg-gray-900/40 border border-gray-800 rounded-xl p-5 space-y-2">
                        <span className="text-[9.5px] font-mono text-neutral-450 uppercase">{m.label}</span>
                        <div className="flex justify-between items-baseline">
                          <span className="text-2xl font-black text-white">{m.value}</span>
                          <span className="text-[10px] font-bold text-[#10B981]">{m.change}</span>
                        </div>
                        <p className="text-[10px] text-neutral-500">{m.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* 4. Charts */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-7 bg-gray-900/40 border border-gray-800 rounded-xl p-6 space-y-4">
                      <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block">// TRANSACTION FLOW CHART</span>
                      <div className="h-32 flex items-end gap-3 pt-4 border-b border-gray-800/60 pb-1">
                        <div className="bg-emerald-500/10 border border-emerald-500/30 w-full h-[40%] rounded-t-md hover:bg-emerald-500/30 transition-all cursor-pointer" />
                        <div className="bg-emerald-500/10 border border-emerald-500/30 w-full h-[65%] rounded-t-md hover:bg-emerald-500/30 transition-all cursor-pointer" />
                        <div className="bg-emerald-500/10 border border-emerald-500/30 w-full h-[85%] rounded-t-md hover:bg-emerald-500/30 transition-all cursor-pointer" />
                        <div className="bg-[#10B981] w-full h-[99%] rounded-t-md cursor-pointer" />
                      </div>
                      <div className="flex justify-between text-[9px] font-mono text-neutral-500">
                        <span>MON</span>
                        <span>TUE</span>
                        <span>WED</span>
                        <span>THU (LIVE)</span>
                      </div>
                    </div>
                    <div className="lg:col-span-5 bg-gray-900/40 border border-gray-800 rounded-xl p-4 overflow-hidden shadow-xs flex flex-col justify-between">
                      <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block mb-2">// INTERFACE METRICS</span>
                      <div className="rounded-lg overflow-hidden border border-gray-850">
                        <img src="/demo/saas_hero_demo.png" alt="SaaS Dashboard Mockup" className="w-full h-auto object-cover filter brightness-90 saturate-110" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {dashboardTab === "analytics" && (
                <div className="space-y-6">
                  {/* Detailed metrics & charts */}
                  <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-6 space-y-4">
                    <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block">// PARITY PERFORMANCE SPECS</span>
                    <div className="space-y-3 text-xs">
                      <div className="flex justify-between border-b border-gray-800 pb-2">
                        <span>Ast Compiler Pipeline</span>
                        <span className="text-[#10B981] font-mono">0.02ms (99.8%)</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-800 pb-2">
                        <span>Design Token Parity</span>
                        <span className="text-[#10B981] font-mono">100% compliant</span>
                      </div>
                      <div className="flex justify-between pb-1">
                        <span>Server Memory Overhead</span>
                        <span className="text-[#10B981] font-mono">0kb (Zero Runtime)</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {dashboardTab === "reports" && (
                /* 5. Reports logs table */
                <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-6 space-y-4">
                  <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block">// RECENT COMPILATION LOGS</span>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead>
                        <tr className="border-b border-gray-800 pb-2 text-[10px] text-neutral-400">
                          <th className="py-2">ITEM PATH</th>
                          <th className="py-2">ACTOR</th>
                          <th className="py-2">STATUS</th>
                          <th className="py-2">TIMESTAMP</th>
                        </tr>
                      </thead>
                      <tbody>
                        {logs.map((log, idx) => (
                          <tr key={idx} className="border-b border-gray-900/60 text-neutral-350">
                            <td className="py-2.5 font-sans font-bold">{log.item}</td>
                            <td className="py-2.5">{log.user}</td>
                            <td className="py-2.5"><span className="text-[#10B981] bg-emerald-500/10 px-2 py-0.5 rounded text-[9px]">{log.status}</span></td>
                            <td className="py-2.5 text-neutral-500">{log.time}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {dashboardTab === "settings" && (
                /* 6. Settings controls */
                <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-6 space-y-6 max-w-xl">
                  <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block">// COMPILER CONTROL FIELD</span>
                  <div className="space-y-4 text-xs font-sans">
                    <div className="space-y-2">
                      <label className="font-bold text-neutral-450 block">Default System Title</label>
                      <input type="text" defaultValue={dashboardName} className="w-full bg-[#030712] border border-gray-800 p-2 text-[#F9FAFB] outline-none rounded-lg focus:border-[#10B981]" />
                    </div>
                    <div className="flex justify-between items-center border-t border-gray-905 pt-4">
                      <div>
                        <span className="font-bold text-white block">Auto Parity Scanning</span>
                        <span className="text-[10px] text-neutral-500">Continuous background lint telemetry checks.</span>
                      </div>
                      <div className="w-10 h-5 bg-[#10B981] rounded-full p-0.5 cursor-pointer flex justify-end">
                        <div className="w-4 h-4 bg-white rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      }

      if (styleId === "fintech") {
        return (
          <div className="font-sans bg-[#F8FAFC] text-[#0F172A] min-h-full flex text-left relative overflow-hidden">
            {/* 1. Sidebar Left */}
            <div className="w-48 bg-white border-r border-slate-200 p-5 space-y-8 shrink-0">
              <span className="font-black text-sm tracking-tight text-[#2563EB] block uppercase">🔵 {dashboardName}</span>
              <div className="space-y-2 text-[10px] font-bold uppercase text-slate-500">
                <div onClick={() => setDashboardTab("overview")} className={`p-2.5 rounded-lg cursor-pointer flex items-center gap-2 ${dashboardTab === "overview" ? "bg-blue-50 text-[#2563EB]" : "hover:bg-slate-50"}`}>
                  <span>📊 OVERVIEW</span>
                </div>
                <div onClick={() => setDashboardTab("analytics")} className={`p-2.5 rounded-lg cursor-pointer flex items-center gap-2 ${dashboardTab === "analytics" ? "bg-blue-50 text-[#2563EB]" : "hover:bg-slate-50"}`}>
                  <span>📈 ANALYTICS</span>
                </div>
                <div onClick={() => setDashboardTab("reports")} className={`p-2.5 rounded-lg cursor-pointer flex items-center gap-2 ${dashboardTab === "reports" ? "bg-blue-50 text-[#2563EB]" : "hover:bg-slate-50"}`}>
                  <span>📋 REPORTS</span>
                </div>
                <div onClick={() => setDashboardTab("settings")} className={`p-2.5 rounded-lg cursor-pointer flex items-center gap-2 ${dashboardTab === "settings" ? "bg-blue-50 text-[#2563EB]" : "hover:bg-slate-50"}`}>
                  <span>⚙️ SETTINGS</span>
                </div>
              </div>
            </div>

            {/* 2. Main Dashboard Container Right */}
            <div className="flex-1 p-6 space-y-8 overflow-y-auto bg-slate-50/50">
              {/* Header block */}
              <div className="flex justify-between items-center border-b border-slate-200 pb-4 bg-transparent">
                <h2 className="text-xl font-bold tracking-tight text-slate-900">{dashboardTab.toUpperCase()}</h2>
                <span className="text-[9px] font-bold bg-blue-50 text-[#2563EB] px-2 py-0.5 rounded">SECURE_VPN</span>
              </div>

              {/* View switches */}
              {dashboardTab === "overview" && (
                <div className="space-y-8">
                  {/* 3. Analytics metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {metrics.map((m, idx) => (
                      <div key={idx} className="bg-white border border-slate-100 rounded-xl p-5 space-y-2 shadow-xs">
                        <span className="text-[9.5px] font-bold text-slate-400 uppercase">{m.label}</span>
                        <div className="flex justify-between items-baseline">
                          <span className="text-2xl font-black text-slate-900">{m.value}</span>
                          <span className="text-[10px] font-bold text-emerald-600">{m.change}</span>
                        </div>
                        <p className="text-[10px] text-slate-500">{m.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* 4. Charts */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-7 bg-white border border-slate-100 rounded-xl p-6 space-y-4 shadow-xs">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">// ASSETS FLOW TELEMETRY</span>
                      <div className="h-32 flex items-end gap-3 pt-4 border-b border-slate-100 pb-1">
                        <div className="bg-blue-100 w-full h-[40%] rounded-t hover:bg-blue-200 transition-all cursor-pointer" />
                        <div className="bg-blue-100 w-full h-[65%] rounded-t hover:bg-blue-200 transition-all cursor-pointer" />
                        <div className="bg-blue-100 w-full h-[85%] rounded-t hover:bg-blue-200 transition-all cursor-pointer" />
                        <div className="bg-[#2563EB] w-full h-[99%] rounded-t cursor-pointer" />
                      </div>
                    </div>
                    <div className="lg:col-span-5 bg-white border border-slate-100 rounded-xl p-4 overflow-hidden shadow-xs flex flex-col justify-between">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-2">// HIGH FIDELITY GRAPHICS</span>
                      <div className="rounded-lg overflow-hidden border border-slate-100">
                        <img src="/demo/saas_hero_demo.png" alt="SaaS Dashboard Mockup" className="w-full h-auto object-cover" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {dashboardTab === "analytics" && (
                <div className="space-y-6">
                  {/* Detailed metrics & charts */}
                  <div className="bg-white border border-slate-150 rounded-xl p-6 space-y-4 shadow-xs">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">// CORE FINANCIAL AUDITING</span>
                    <div className="space-y-3 text-xs">
                      <div className="flex justify-between border-b border-slate-100 pb-2">
                        <span>Regulatory Parity Scan</span>
                        <span className="text-emerald-600 font-bold">100% compliant</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-100 pb-2">
                        <span>Pipeline Latency</span>
                        <span className="text-emerald-600 font-bold">0.02ms</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {dashboardTab === "reports" && (
                /* 5. Reports logs table */
                <div className="bg-white border border-slate-150 rounded-xl p-6 space-y-4 shadow-xs">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">// TRANSACTION LOGS</span>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 pb-2 text-[10px] text-slate-400 font-bold">
                          <th className="py-2">ITEM PATH</th>
                          <th className="py-2">ACTOR</th>
                          <th className="py-2">STATUS</th>
                          <th className="py-2">TIMESTAMP</th>
                        </tr>
                      </thead>
                      <tbody>
                        {logs.map((log, idx) => (
                          <tr key={idx} className="border-b border-slate-100 text-slate-700">
                            <td className="py-2.5 font-bold text-slate-900">{log.item}</td>
                            <td className="py-2.5">{log.user}</td>
                            <td className="py-2.5"><span className="text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded text-[9px] font-bold">{log.status}</span></td>
                            <td className="py-2.5 text-slate-400">{log.time}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {dashboardTab === "settings" && (
                /* 6. Settings controls */
                <div className="bg-white border border-slate-150 rounded-xl p-6 space-y-6 max-w-xl shadow-xs">
                  <span className="text-[9px] font-bold text-slate-400 uppercase block tracking-wider">// PLATFORM PARAMETERS</span>
                  <div className="space-y-4 text-xs">
                    <div className="space-y-2">
                      <label className="font-bold text-slate-500 block">Fintech Core Brand</label>
                      <input type="text" defaultValue={dashboardName} className="w-full border border-slate-200 p-2.5 rounded-lg outline-none" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      }

      if (styleId === "crm") {
        return (
          <div className="font-sans bg-white text-[#1F2937] min-h-full flex text-left relative overflow-hidden">
            {/* 1. Sidebar Left */}
            <div className="w-48 bg-slate-55/30 border-r border-slate-100 p-5 space-y-8 shrink-0">
              <span className="font-extrabold text-sm tracking-tight text-[#0EA5E9] block uppercase">🔵 {dashboardName}</span>
              <div className="space-y-2 text-[10px] font-bold uppercase text-slate-500">
                <div onClick={() => setDashboardTab("overview")} className={`p-2 rounded-lg cursor-pointer flex items-center gap-2 ${dashboardTab === "overview" ? "bg-sky-50 text-[#0EA5E9]" : "hover:bg-slate-50"}`}>
                  <span>📊 OVERVIEW</span>
                </div>
                <div onClick={() => setDashboardTab("analytics")} className={`p-2 rounded-lg cursor-pointer flex items-center gap-2 ${dashboardTab === "analytics" ? "bg-sky-50 text-[#0EA5E9]" : "hover:bg-slate-50"}`}>
                  <span>📈 ANALYTICS</span>
                </div>
                <div onClick={() => setDashboardTab("reports")} className={`p-2 rounded-lg cursor-pointer flex items-center gap-2 ${dashboardTab === "reports" ? "bg-sky-50 text-[#0EA5E9]" : "hover:bg-slate-50"}`}>
                  <span>📋 REPORTS</span>
                </div>
                <div onClick={() => setDashboardTab("settings")} className={`p-2 rounded-lg cursor-pointer flex items-center gap-2 ${dashboardTab === "settings" ? "bg-sky-50 text-[#0EA5E9]" : "hover:bg-slate-50"}`}>
                  <span>⚙️ SETTINGS</span>
                </div>
              </div>
            </div>

            {/* 2. Main Dashboard Container Right */}
            <div className="flex-1 p-6 space-y-8 overflow-y-auto">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <h2 className="text-xl font-bold tracking-tight text-slate-900">{dashboardTab.toUpperCase()}</h2>
                <span className="text-[9px] font-bold bg-sky-50 text-[#0EA5E9] px-2 py-0.5 rounded">CRM_CONNECTED</span>
              </div>

              {dashboardTab === "overview" && (
                <div className="space-y-8">
                  {/* 3. Analytics metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {metrics.map((m, idx) => (
                      <div key={idx} className="bg-white border border-slate-100 rounded-xl p-5 space-y-2 shadow-sm">
                        <span className="text-[9.5px] font-bold text-slate-400 uppercase">{m.label}</span>
                        <div className="flex justify-between items-baseline">
                          <span className="text-2xl font-black text-slate-900">{m.value}</span>
                          <span className="text-[10px] font-bold text-emerald-600">{m.change}</span>
                        </div>
                        <p className="text-[10px] text-slate-500">{m.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* 4. Charts */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-7 bg-white border border-slate-100 rounded-xl p-6 space-y-4 shadow-sm">
                      <span className="text-[9px] font-bold text-slate-450 uppercase block">// PIPELINE VELOCITY</span>
                      <div className="h-32 flex items-end gap-3 pt-4 border-b border-slate-100 pb-1">
                        <div className="bg-sky-100 w-full h-[40%] rounded-t hover:bg-sky-200 transition-all cursor-pointer" />
                        <div className="bg-sky-100 w-full h-[65%] rounded-t hover:bg-sky-200 transition-all cursor-pointer" />
                        <div className="bg-sky-100 w-full h-[85%] rounded-t hover:bg-sky-200 transition-all cursor-pointer" />
                        <div className="bg-[#0EA5E9] w-full h-[99%] rounded-t cursor-pointer" />
                      </div>
                    </div>
                    <div className="lg:col-span-5 bg-white border border-slate-100 rounded-xl p-4 overflow-hidden shadow-sm flex flex-col justify-between">
                      <span className="text-[9px] font-bold text-slate-400 uppercase block mb-2">// INTERFACE METRICS</span>
                      <div className="rounded-lg overflow-hidden border border-slate-100">
                        <img src="/demo/saas_hero_demo.png" alt="SaaS Dashboard Mockup" className="w-full h-auto object-cover" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {dashboardTab === "analytics" && (
                <div className="space-y-6">
                  {/* Detailed metrics & charts */}
                  <div className="bg-white border border-slate-150 rounded-xl p-6 space-y-4 shadow-sm">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">// CORE LEADS ACQUISITION</span>
                    <div className="space-y-3 text-xs">
                      <div className="flex justify-between border-b border-slate-100 pb-2">
                        <span>Total Parity Par</span>
                        <span className="text-emerald-600 font-bold">Excellent</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {dashboardTab === "reports" && (
                /* 5. Reports logs table */
                <div className="bg-white border border-slate-150 rounded-xl p-6 space-y-4 shadow-sm">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">// DIRECT CUSTOMER LOGS</span>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 pb-2 text-[10px] text-slate-400 font-bold">
                          <th className="py-2">ITEM PATH</th>
                          <th className="py-2">ACTOR</th>
                          <th className="py-2">STATUS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {logs.map((log, idx) => (
                          <tr key={idx} className="border-b border-slate-100 text-slate-700">
                            <td className="py-2.5 font-bold text-slate-900">{log.item}</td>
                            <td className="py-2.5">{log.user}</td>
                            <td className="py-2.5"><span className="text-[#0EA5E9] bg-sky-50 px-2 py-0.5 rounded text-[9px] font-bold">{log.status}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {dashboardTab === "settings" && (
                /* 6. Settings controls */
                <div className="bg-white border border-slate-150 rounded-xl p-6 space-y-6 max-w-xl shadow-sm">
                  <span className="text-[9px] font-bold text-slate-400 uppercase block tracking-wider">// CRM SYSTEM BRAND</span>
                  <div className="space-y-4 text-xs">
                    <div className="space-y-2">
                      <label className="font-bold text-slate-500 block">CRM Dashboard Name</label>
                      <input type="text" defaultValue={dashboardName} className="w-full border border-slate-200 p-2.5 rounded-lg outline-none" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      }

      // Enterprise dashboard fallback
      return (
        <div className="font-sans bg-[#F8FAFC] text-[#0F172A] min-h-full flex text-left relative overflow-hidden border-4 border-slate-900">
          {/* 1. Sidebar Left */}
          <div className="w-48 bg-white border-r-4 border-slate-900 p-5 space-y-8 shrink-0">
            <span className="font-black text-sm tracking-tight text-slate-900 block uppercase">🏢 {dashboardName}</span>
            <div className="space-y-2 text-[10px] font-bold uppercase text-slate-500 font-mono">
              <div onClick={() => setDashboardTab("overview")} className={`p-2 border-2 border-transparent cursor-pointer flex items-center gap-2 ${dashboardTab === "overview" ? "bg-slate-950 text-white border-slate-950" : "hover:bg-slate-100"}`}>
                <span>📊 OVERVIEW</span>
              </div>
              <div onClick={() => setDashboardTab("analytics")} className={`p-2 border-2 border-transparent cursor-pointer flex items-center gap-2 ${dashboardTab === "analytics" ? "bg-slate-950 text-white border-slate-950" : "hover:bg-slate-100"}`}>
                <span>📈 ANALYTICS</span>
              </div>
              <div onClick={() => setDashboardTab("reports")} className={`p-2 border-2 border-transparent cursor-pointer flex items-center gap-2 ${dashboardTab === "reports" ? "bg-slate-950 text-white border-slate-950" : "hover:bg-slate-100"}`}>
                <span>📋 REPORTS</span>
              </div>
              <div onClick={() => setDashboardTab("settings")} className={`p-2 border-2 border-transparent cursor-pointer flex items-center gap-2 ${dashboardTab === "settings" ? "bg-slate-950 text-white border-slate-950" : "hover:bg-slate-100"}`}>
                <span>⚙️ SETTINGS</span>
              </div>
            </div>
          </div>

          {/* 2. Main Dashboard Container Right */}
          <div className="flex-1 p-6 space-y-8 overflow-y-auto">
            <div className="flex justify-between items-center border-b-4 border-slate-900 pb-4">
              <h2 className="text-xl font-black uppercase text-slate-900 tracking-tight">{dashboardTab.toUpperCase()} SPECIFICATION</h2>
              <span className="text-[9px] font-mono font-bold bg-slate-900 text-white px-2 py-0.5 rounded-none">SECURE_COMPLIANT</span>
            </div>

            {/* View switches */}
            {dashboardTab === "overview" && (
              <div className="space-y-8">
                {/* 3. Analytics metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {metrics.map((m, idx) => (
                    <div key={idx} className="bg-white border-4 border-slate-900 p-5 space-y-2 shadow-[4px_4px_0px_0px_#000]">
                      <span className="text-[9.5px] font-mono text-slate-450 uppercase">{m.label}</span>
                      <div className="flex justify-between items-baseline">
                        <span className="text-2xl font-black text-slate-900">{m.value}</span>
                        <span className="text-[10px] font-bold text-emerald-600">{m.change}</span>
                      </div>
                      <p className="text-[10px] text-slate-500">{m.desc}</p>
                    </div>
                  ))}
                </div>

                {/* 4. Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-7 bg-white border-4 border-slate-900 p-6 space-y-4 shadow-[4px_4px_0px_0px_#000]">
                    <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block">// COMPLIANCE FLOW TELEMETRY</span>
                    <div className="h-32 flex items-end gap-3 pt-4 border-b-4 border-slate-900 pb-1">
                      <div className="bg-slate-100 border-2 border-slate-900 w-full h-[40%] hover:bg-slate-200 transition-all cursor-pointer" />
                      <div className="bg-slate-100 border-2 border-slate-900 w-full h-[65%] hover:bg-slate-200 transition-all cursor-pointer" />
                      <div className="bg-slate-100 border-2 border-slate-900 w-full h-[85%] hover:bg-slate-200 transition-all cursor-pointer" />
                      <div className="bg-slate-900 w-full h-[99%] cursor-pointer" />
                    </div>
                  </div>
                  <div className="lg:col-span-5 bg-white border-4 border-slate-900 p-4 overflow-hidden shadow-[4px_4px_0px_0px_#000] flex flex-col justify-between">
                    <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block mb-2">// HIGH FIDELITY GRAPHICS</span>
                    <div className="border-2 border-slate-900 overflow-hidden">
                      <img src="/demo/saas_hero_demo.png" alt="SaaS Dashboard Mockup" className="w-full h-auto object-cover" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {dashboardTab === "analytics" && (
              <div className="space-y-6">
                {/* Detailed metrics & charts */}
                <div className="bg-white border-4 border-slate-900 p-6 space-y-4 shadow-[4px_4px_0px_0px_#000]">
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block">// ENTERPRISE COMPLIANCE</span>
                  <div className="space-y-3 text-xs font-mono">
                    <div className="flex justify-between border-b-2 border-slate-250 pb-2">
                      <span>Ast Compiler Parity</span>
                      <span className="text-emerald-700 font-bold">100% compliant</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {dashboardTab === "reports" && (
              /* 5. Reports logs table */
              <div className="bg-white border-4 border-slate-900 p-6 space-y-4 shadow-[4px_4px_0px_0px_#000]">
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block">// COMPILING ARCHIVES</span>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b-4 border-slate-900 pb-2 text-[10px] text-slate-400">
                        <th className="py-2">ITEM PATH</th>
                        <th className="py-2">ACTOR</th>
                        <th className="py-2">STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {logs.map((log, idx) => (
                        <tr key={idx} className="border-b-2 border-slate-100 text-slate-700">
                          <td className="py-2.5 font-sans font-bold text-slate-900">{log.item}</td>
                          <td className="py-2.5">{log.user}</td>
                          <td className="py-2.5"><span className="text-slate-900 bg-slate-100 border border-slate-900 px-2 py-0.5 text-[9px] font-bold">{log.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {dashboardTab === "settings" && (
              /* 6. Settings controls */
              <div className="bg-white border-4 border-slate-900 p-6 space-y-6 max-w-xl shadow-[4px_4px_0px_0px_#000]">
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block">// CONFIGURATION FIELDS</span>
                <div className="space-y-4 text-xs font-sans">
                  <div className="space-y-2">
                    <label className="font-bold text-slate-500 block">Enterprise core label</label>
                    <input type="text" defaultValue={dashboardName} className="w-full border-2 border-slate-900 p-2.5 outline-none font-mono" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    // --- AI TOOL CATEGORY RENDERING ---
    // Sequence: Hero → Tool Demo → Features → Use Cases → Pricing → FAQ → Footer
    if (categoryId === "ai-tool") {
      const toolName = websiteContent.about.title || "MUBIX AI";
      const headline = websiteContent.hero.headline || "Unleash extreme natural language compiler telemetry";
      const subheadline = websiteContent.hero.subheadline || "The premier generative playground specialized in visual Next.js compiler parity, aesthetic border spacing tokens, and telemetry diagnostics.";

      const features = [
        { title: "Generative Parity", desc: "Instantly compiles visual prompt tokens directly in a secure, isolated sandbox sandbox." },
        { title: "Distributed AST Analysis", desc: "Automated Rust compiler optimization maps with zero latency or parity bugs." },
        { title: "Layout Parity Check", desc: "Eliminates empty visual placeholders to always output 100% production-ready layers." }
      ];

      const useCases = [
        { title: "Strategic Visual Parity", desc: "Accelerating design systems parity audits for executive startups." },
        { title: "Next.js Static Generation", desc: "Optimizing server-rendered visual pages immediately on design modifications." }
      ];

      const faqsList = [
        { q: "How fast is the prompt visual telemetry compiled?", a: "Under 0.02ms. The AI model bypasses default parsing networks to run compilers directly." },
        { q: "Does the model guarantee layout parity?", a: "Yes. Every single generated page undergoes continuous automated WCAG telemetry checks." }
      ];

      if (styleId === "openai-style") {
        return (
          <div className="font-sans bg-white text-neutral-900 p-8 space-y-24 min-h-full text-left">
            {/* 1. Navbar */}
            <div className="border-b border-neutral-100 pb-4 flex justify-between items-center text-xs">
              <span className="font-black text-sm tracking-tight text-[#10A37F]">{toolName} // API</span>
              <div className="hidden md:flex gap-6 uppercase text-[9px] tracking-wider text-neutral-500 font-bold">
                <span>Features</span>
                <span>Playground</span>
                <span>FAQ</span>
              </div>
              <button className="bg-black text-white hover:bg-neutral-800 text-[10px] font-bold px-4 py-1.5 rounded-full">Explore Research</button>
            </div>

            {/* 2. Hero */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 space-y-6">
                <span className="px-2.5 py-0.5 bg-emerald-50 text-[#10A37F] text-[9px] font-bold uppercase tracking-wider rounded-full">Research Showcase</span>
                <h1 className="text-3xl md:text-5xl font-bold text-neutral-950 leading-tight tracking-tight">{headline}</h1>
                <p className="text-xs text-neutral-600 leading-relaxed max-w-xl">{subheadline}</p>
                <div className="flex gap-3">
                  <button className="bg-black text-white hover:bg-neutral-800 text-xs px-5 py-2.5 font-bold rounded-full">Launch Playground</button>
                  <button className="border border-neutral-200 hover:bg-neutral-50 text-xs px-5 py-2.5 font-bold rounded-full">Read Paper</button>
                </div>
              </div>
              <div className="md:col-span-5 border border-neutral-200 rounded-2xl overflow-hidden shadow-lg bg-white p-1">
                <img src="/demo/ai_tool_hero_demo.png" alt="AI Tool Hero" className="w-full h-auto object-cover" />
              </div>
            </div>

            {/* 3. Tool Demo Playground */}
            <div className="bg-white border border-neutral-100 rounded-2xl p-6 shadow-sm space-y-4 max-w-2xl">
              <span className="text-[9px] font-bold text-[#10A37F] uppercase tracking-wider">// INTERACTIVE AI PLAYGROUND</span>
              <div className="space-y-3">
                <textarea value={aiPromptInput} onChange={(e) => setAiPromptInput(e.target.value)} className="w-full border border-neutral-200 rounded-xl p-3 text-xs outline-none focus:border-[#10A37F] h-20 resize-none font-sans" />
                <button onClick={() => setAiPromptResult("Response: Next.js 16 leverages an AST telemetry engine combined with incremental Rust parsing grids...")} className="bg-[#10A37F] text-white hover:opacity-90 font-bold text-xs px-4 py-2 rounded-full">Generate AI Response</button>
              </div>
              <div className="bg-neutral-50 border border-neutral-100 rounded-xl p-4 font-mono text-[10px] text-neutral-600 leading-relaxed min-h-16">
                {aiPromptResult}
              </div>
            </div>

            {/* 4. Features */}
            <div className="space-y-6">
              <h3 className="text-xs tracking-widest text-[#10A37F] uppercase font-bold text-center">// CORE TELEMETRY SPECIFICATIONS</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((feat, idx) => (
                  <div key={idx} className="bg-white border border-neutral-100 rounded-2xl p-6 shadow-xs space-y-2.5">
                    <h4 className="font-extrabold text-sm text-neutral-900">{feat.title}</h4>
                    <p className="text-xs text-neutral-550 leading-relaxed">{feat.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Use Cases */}
            <div className="space-y-6">
              <h3 className="text-xs tracking-widest text-[#10A37F] uppercase font-bold text-center">// USE CASE DIRECTORIES</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {useCases.map((uc, idx) => (
                  <div key={idx} className="bg-neutral-50/50 border border-neutral-100 p-6 rounded-2xl space-y-2">
                    <h4 className="font-bold text-sm text-neutral-950">{uc.title}</h4>
                    <p className="text-xs text-neutral-550">{uc.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Pricing */}
            <div className="space-y-6">
              <h3 className="text-xs tracking-widest text-[#10A37F] uppercase font-bold text-center">// SUBSCRIPTION MATRIX</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {["Free", "Pro", "Team"].map((tier, idx) => (
                  <div key={idx} className="bg-white border border-neutral-150 p-6 rounded-2xl shadow-sm space-y-4">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-400">{tier}</h4>
                    <span className="text-3xl font-black text-neutral-950 block">${idx === 0 ? "0" : idx === 1 ? "20" : "150"}<span className="text-[10px] text-neutral-400 font-normal">/mo</span></span>
                    <button className="w-full bg-black text-white hover:bg-neutral-800 font-bold text-xs py-2 rounded-full shadow-sm">Get {tier}</button>
                  </div>
                ))}
              </div>
            </div>

            {/* 7. FAQ */}
            <div className="max-w-2xl mx-auto space-y-6">
              <h3 className="text-xs tracking-widest text-[#10A37F] uppercase font-bold text-center">// QUESTION DIRECTORY</h3>
              <div className="space-y-3">
                {faqsList.map((faq, idx) => (
                  <div key={idx} className="border border-neutral-100 bg-white rounded-2xl p-4 cursor-pointer" onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
                    <h4 className="font-extrabold text-xs text-neutral-950 flex justify-between items-center">
                      <span>{faq.q}</span>
                      <span>{openFaq === idx ? "-" : "+"}</span>
                    </h4>
                    {openFaq === idx && <p className="text-xs text-neutral-500 pt-2 leading-relaxed font-sans">{faq.a}</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* 8. Footer */}
            <div className="border-t border-neutral-100 pt-6 flex justify-between items-center text-[10px] text-neutral-450 font-bold uppercase">
              <span>© 2026 {toolName}. RESEARCH DIVISION.</span>
              <span>v1.2.0</span>
            </div>
          </div>
        );
      }

      if (styleId === "minimal-ai") {
        return (
          <div className="font-sans bg-[#0D0D0D] text-[#EDEDED] p-8 space-y-24 min-h-full text-left relative overflow-hidden">
            {/* 1. Navbar */}
            <div className="border-b border-neutral-800 pb-4 flex justify-between items-center text-xs">
              <span className="font-black text-sm tracking-tight text-white">{toolName} // MONO</span>
              <div className="hidden md:flex gap-6 uppercase text-[9px] tracking-widest text-neutral-400 font-bold">
                <span>Playground</span>
                <span>Parity</span>
                <span>Docs</span>
              </div>
              <button className="bg-white text-black hover:bg-neutral-200 text-[9px] font-mono tracking-wider px-4 py-1.5 rounded">CONNECT_API</button>
            </div>

            {/* 2. Hero */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 space-y-6">
                <span className="px-3 py-1 bg-neutral-900 border border-neutral-800 text-white text-[8px] font-mono uppercase tracking-widest rounded">Parity Spec V1.0</span>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-none">{headline}</h1>
                <p className="text-xs text-neutral-450 leading-relaxed max-w-xl">{subheadline}</p>
                <button className="bg-white text-black hover:bg-neutral-200 text-xs font-mono px-6 py-3 rounded transition-all">Launch Console Playground</button>
              </div>
              <div className="md:col-span-5 border border-neutral-850 rounded-lg overflow-hidden bg-neutral-900 p-1">
                <img src="/demo/ai_tool_hero_demo.png" alt="AI Tool Hero" className="w-full h-auto object-cover filter grayscale contrast-125" />
              </div>
            </div>

            {/* 3. Tool Demo Playground */}
            <div className="bg-[#111111]/80 border border-neutral-800 rounded p-5 space-y-4 max-w-2xl">
              <div className="flex justify-between items-center text-[8px] font-mono text-neutral-500 border-b border-neutral-850 pb-2">
                <span>visual_prompt_playground.c</span>
                <span>ACTIVE</span>
              </div>
              <textarea value={aiPromptInput} onChange={(e) => setAiPromptInput(e.target.value)} className="w-full bg-[#0D0D0D] border border-neutral-800 p-2.5 text-xs text-[#EDEDED] outline-none font-mono focus:border-neutral-700 h-20 resize-none" />
              <button onClick={() => setAiPromptResult("Response: Next.js 16 leverages an AST telemetry engine combined with incremental Rust parsing grids...")} className="bg-white text-black font-mono text-[9px] px-4 py-2 rounded">SUBMIT_PAYLOAD</button>
              <div className="bg-[#0D0D0D] border border-neutral-850 p-3 rounded font-mono text-[9px] text-neutral-400 leading-relaxed min-h-16">
                {aiPromptResult}
              </div>
            </div>

            {/* 4. Features */}
            <div className="space-y-6">
              <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase block">// PLATFORM BLUEPRINTS</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((feat, idx) => (
                  <div key={idx} className="bg-[#111111]/60 border border-neutral-800 p-6 rounded space-y-2.5">
                    <h4 className="font-bold text-sm text-white">{feat.title}</h4>
                    <p className="text-xs text-neutral-400 leading-relaxed">{feat.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Use Cases */}
            <div className="space-y-6">
              <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase block text-center">// CORE DEPLOYMENT DICTIONARY</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {useCases.map((uc, idx) => (
                  <div key={idx} className="bg-[#111111]/60 border border-neutral-800 p-6 rounded space-y-2">
                    <h4 className="font-bold text-sm text-white">{uc.title}</h4>
                    <p className="text-xs text-neutral-400">{uc.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Pricing */}
            <div className="space-y-6">
              <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase block text-center">// SUBSCRIPTION DIRECTORY</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {["Starter", "Growth", "Enterprise"].map((tier, idx) => (
                  <div key={idx} className="bg-[#111111]/80 border border-neutral-800 p-6 rounded space-y-4 flex flex-col justify-between">
                    <div className="space-y-1">
                      <h4 className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">{tier}</h4>
                      <span className="text-3xl font-bold text-white block">${idx === 0 ? "0" : idx === 1 ? "49" : "299"}<span className="text-[10px] text-neutral-500 font-normal">/mo</span></span>
                    </div>
                    <button className="w-full border border-neutral-700 bg-transparent text-white font-mono text-[9px] uppercase tracking-wider py-2 rounded hover:border-neutral-500">INIT_{tier.toUpperCase()}</button>
                  </div>
                ))}
              </div>
            </div>

            {/* 7. FAQ */}
            <div className="max-w-2xl mx-auto space-y-6">
              <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase block text-center">// ACCORDION LOGS</span>
              <div className="space-y-3">
                {faqsList.map((faq, idx) => (
                  <div key={idx} className="border border-neutral-800 bg-[#111111]/60 rounded p-4 cursor-pointer" onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
                    <h4 className="font-bold text-xs text-white flex justify-between items-center font-sans">
                      <span>{faq.q}</span>
                      <span className="text-white">{openFaq === idx ? "[-]" : "[+]"}</span>
                    </h4>
                    {openFaq === idx && <p className="text-xs text-neutral-400 pt-2 leading-relaxed font-sans">{faq.a}</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* 8. Footer */}
            <div className="border-t border-neutral-850 pt-6 flex justify-between items-center text-[9px] text-neutral-500 font-mono uppercase">
              <span>© 2026 {toolName}. SYSTEM SPECIFICATION SECURED.</span>
              <span>build_v1.0.1</span>
            </div>
          </div>
        );
      }

      if (styleId === "future-tech") {
        return (
          <div className="font-sans bg-[#020205] text-[#E2F1FF] p-8 space-y-24 min-h-full text-left relative overflow-hidden">
            {/* Cyberpunk void neon background */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00F2FE]/10 rounded-full blur-3xl -z-10" />

            {/* 1. Navbar */}
            <div className="border-b border-neutral-900 pb-4 flex justify-between items-center text-xs">
              <span className="font-black text-sm tracking-widest text-[#00F2FE] block">// FUTURE_TECH</span>
              <div className="hidden md:flex gap-6 uppercase text-[9px] tracking-widest text-[#4FACFE] font-bold">
                <span>Playground</span>
                <span>Console</span>
                <span>Status</span>
              </div>
              <button className="border border-[#00F2FE] bg-[#00F2FE]/10 text-white font-mono text-[9px] tracking-wider px-4 py-1.5 rounded hover:bg-[#00F2FE]">CONNECT_STREAM</button>
            </div>

            {/* 2. Hero */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 space-y-6">
                <span className="px-3 py-1 bg-[#00F2FE]/10 border border-[#00F2FE]/30 text-white text-[8px] font-mono uppercase tracking-widest rounded">Parity Core Active</span>
                <h1 className="text-3xl md:text-5xl font-black uppercase text-white leading-none tracking-tight">{headline}</h1>
                <p className="text-xs text-neutral-400 leading-relaxed max-w-xl">{subheadline}</p>
                <button className="border border-[#00F2FE] bg-[#00F2FE]/20 hover:bg-[#00F2FE] text-white font-mono text-xs px-6 py-3 rounded-md transition-all">Download Cyber SDK</button>
              </div>
              <div className="md:col-span-5 border border-[#00F2FE]/30 rounded-2xl overflow-hidden bg-[#0A0B10] p-1 shadow-[0_0_20px_rgba(0,242,254,0.15)]">
                <img src="/demo/ai_tool_hero_demo.png" alt="AI Tool Hero" className="w-full h-auto object-cover filter hue-rotate-[180deg]" />
              </div>
            </div>

            {/* 3. Tool Demo Playground */}
            <div className="bg-[#020205]/80 border border-neutral-900 rounded p-5 space-y-4 max-w-2xl">
              <div className="flex justify-between items-center text-[8px] font-mono text-neutral-500 border-b border-neutral-850 pb-2">
                <span>cyber_compiler_telemetry.d</span>
                <span className="text-[#00F2FE]">CONNECTED</span>
              </div>
              <textarea value={aiPromptInput} onChange={(e) => setAiPromptInput(e.target.value)} className="w-full bg-[#020205] border border-neutral-900 p-2.5 text-xs text-[#E2F1FF] outline-none font-mono focus:border-[#00F2FE] h-20 resize-none" />
              <button onClick={() => setAiPromptResult("Response: Next.js 16 leverages an AST telemetry engine combined with incremental Rust parsing grids...")} className="bg-[#00F2FE] text-black font-mono text-[9px] px-4 py-2 rounded">EXECUTE_COMPILATION</button>
              <div className="bg-[#020205] border border-neutral-900 p-3 rounded font-mono text-[9px] text-[#00F2FE] leading-relaxed min-h-16 shadow-[0_0_15px_rgba(0,242,254,0.05)]">
                {aiPromptResult}
              </div>
            </div>

            {/* 4. Features */}
            <div className="space-y-6">
              <span className="text-[9px] font-mono tracking-widest text-[#4FACFE] uppercase block">// CYBERPLATFORM SPECS</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((feat, idx) => (
                  <div key={idx} className="bg-[#020205]/40 border border-neutral-900 p-6 rounded space-y-2.5 shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                    <h4 className="font-bold text-sm text-white">{feat.title}</h4>
                    <p className="text-xs text-neutral-450 leading-relaxed">{feat.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Use Cases */}
            <div className="space-y-6">
              <span className="text-[9px] font-mono tracking-widest text-[#4FACFE] uppercase block text-center">// CORE DEPLOYMENT CHANNELS</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {useCases.map((uc, idx) => (
                  <div key={idx} className="bg-[#020205]/40 border border-neutral-900 p-6 rounded space-y-2">
                    <h4 className="font-bold text-sm text-white">{uc.title}</h4>
                    <p className="text-xs text-neutral-400">{uc.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Pricing */}
            <div className="space-y-6">
              <span className="text-[9px] font-mono tracking-widest text-[#4FACFE] uppercase block text-center">// SYSTEM PRICING SLOTS</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {["Basic", "Power", "Absolute"].map((tier, idx) => (
                  <div key={idx} className="bg-[#020205]/80 border border-neutral-900 p-6 rounded space-y-4 flex flex-col justify-between">
                    <div className="space-y-1">
                      <h4 className="font-mono text-[9px] text-[#4FACFE] uppercase tracking-widest">{tier}</h4>
                      <span className="text-3xl font-bold text-white block">${idx === 0 ? "0" : idx === 1 ? "49" : "299"}<span className="text-[10px] text-neutral-500 font-normal">/mo</span></span>
                    </div>
                    <button className="w-full border border-neutral-700 bg-transparent text-white font-mono text-[9px] uppercase tracking-wider py-2 rounded hover:border-[#00F2FE]">ACTIVATE_{tier.toUpperCase()}</button>
                  </div>
                ))}
              </div>
            </div>

            {/* 7. FAQ */}
            <div className="max-w-2xl mx-auto space-y-6">
              <span className="text-[9px] font-mono tracking-widest text-[#4FACFE] uppercase block text-center">// INQUIRY ACCORDIONS</span>
              <div className="space-y-3">
                {faqsList.map((faq, idx) => (
                  <div key={idx} className="border border-neutral-900 bg-[#020205]/60 rounded p-4 cursor-pointer" onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
                    <h4 className="font-bold text-xs text-white flex justify-between items-center font-sans">
                      <span>{faq.q}</span>
                      <span className="text-[#00F2FE]">{openFaq === idx ? "[-]" : "[+]"}</span>
                    </h4>
                    {openFaq === idx && <p className="text-xs text-neutral-400 pt-2 leading-relaxed font-sans">{faq.a}</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* 8. Footer */}
            <div className="border-t border-neutral-900 pt-6 flex justify-between items-center text-[9px] text-neutral-550 font-mono uppercase">
              <span>© 2026 {toolName}. ALL CYBER CHANNELS SECURED.</span>
              <span>build_v2.0.1</span>
            </div>
          </div>
        );
      }

      // Productivity AI fallback
      return (
        <div className="font-sans bg-[#FCFCFD] text-[#1F2937] p-8 space-y-24 min-h-full text-left">
          {/* 1. Navbar */}
          <div className="flex justify-between items-center bg-white border border-neutral-100 rounded-2xl px-5 py-3 shadow-sm">
            <span className="font-black text-sm text-[#6366F1] uppercase">{toolName}</span>
            <div className="hidden md:flex gap-5 text-[10px] font-bold text-neutral-500 uppercase">
              <span>Playground</span>
              <span>Features</span>
              <span>Pricing</span>
            </div>
            <span className="text-[10px] font-bold text-[#6366F1] bg-indigo-50 rounded-full px-3 py-1">v2.1</span>
          </div>

          {/* 2. Hero */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-6">
              <span className="px-3 py-1 bg-indigo-50 text-[#6366F1] rounded-full text-[9px] font-bold uppercase tracking-wider">Unified Productivity AI</span>
              <h1 className="text-3xl md:text-5xl font-black text-neutral-900 leading-tight tracking-tight">{headline}</h1>
              <p className="text-xs text-neutral-600 leading-relaxed max-w-xl">{subheadline}</p>
              <button className="rounded-xl bg-[#6366F1] text-white px-6 py-3 font-bold text-xs shadow-sm hover:opacity-90 active:scale-95 transition-all">Start Free Sandbox</button>
            </div>
            <div className="md:col-span-5 border border-neutral-100 rounded-3xl overflow-hidden bg-white p-1 shadow-lg">
              <img src="/demo/ai_tool_hero_demo.png" alt="AI Tool Hero" className="w-full h-auto object-cover" />
            </div>
          </div>

          {/* 3. Tool Demo Playground */}
          <div className="bg-white border border-neutral-100 rounded-3xl p-6 shadow-sm space-y-4 max-w-2xl">
            <span className="text-[9px] font-bold text-[#6366F1] uppercase block w-fit">visual_playground_v2.1.tsx</span>
            <textarea value={aiPromptInput} onChange={(e) => setAiPromptInput(e.target.value)} className="w-full bg-neutral-50 border border-neutral-100 rounded-xl p-3 text-xs outline-none focus:border-[#6366F1] h-20 resize-none font-sans" />
            <button onClick={() => setAiPromptResult("Response: Next.js 16 leverages an AST telemetry engine combined with incremental Rust parsing grids...")} className="bg-[#6366F1] text-white hover:opacity-90 font-bold text-xs px-4 py-2 rounded-xl">Transmit Dispatch Payload</button>
            <div className="bg-neutral-50 rounded-2xl p-4 font-mono text-[10px] text-neutral-600 leading-relaxed min-h-16">
              {aiPromptResult}
            </div>
          </div>

          {/* 4. Features */}
          <div className="space-y-6">
            <h3 className="text-xs tracking-wider text-[#6366F1] uppercase font-bold text-center">// CORE ADVANTAGES</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feat, idx) => (
                <div key={idx} className="bg-white border border-neutral-100 rounded-2xl p-6 shadow-sm space-y-2.5">
                  <h4 className="font-black text-sm text-neutral-900">{feat.title}</h4>
                  <p className="text-xs text-neutral-500 leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Use Cases */}
          <div className="space-y-6">
            <h3 className="text-xs tracking-wider text-[#6366F1] uppercase font-bold text-center">// CORE DEPLOYMENTS</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {useCases.map((uc, idx) => (
                <div key={idx} className="bg-white border border-neutral-100 rounded-2xl p-6 shadow-sm space-y-2">
                  <h4 className="font-bold text-sm text-neutral-950">{uc.title}</h4>
                  <p className="text-xs text-slate-550">{uc.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Pricing */}
          <div className="space-y-6">
            <h3 className="text-xs tracking-wider text-[#6366F1] uppercase font-bold text-center">// SUBSCRIPTION</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {["Starter", "Growth", "Enterprise"].map((tier, idx) => (
                <div key={idx} className="bg-white border border-neutral-100 rounded-2xl p-6 shadow-sm space-y-4 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-400">{tier}</h4>
                    <span className="text-3xl font-black text-neutral-950 block">${idx === 0 ? "0" : idx === 1 ? "49" : "299"}<span className="text-[10px] text-neutral-450 font-normal">/mo</span></span>
                  </div>
                  <button className="w-full bg-[#6366F1] text-white hover:opacity-90 font-bold text-xs py-2.5 rounded-xl shadow-xs">Activate {tier}</button>
                </div>
              ))}
            </div>
          </div>

          {/* 7. FAQ */}
          <div className="max-w-2xl mx-auto space-y-6">
            <h3 className="text-xs tracking-wider text-[#6366F1] uppercase font-bold text-center">// QUESTIONS & DISPATCH SPECS</h3>
            <div className="space-y-3">
              {faqsList.map((faq, idx) => (
                <div key={idx} className="bg-white border border-neutral-100 rounded-2xl p-4 cursor-pointer" onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
                  <h4 className="font-extrabold text-xs text-neutral-950 flex justify-between items-center">
                    <span>{faq.q}</span>
                    <span>{openFaq === idx ? "-" : "+"}</span>
                  </h4>
                  {openFaq === idx && <p className="text-xs text-neutral-500 pt-2 leading-relaxed">{faq.a}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* 8. Footer */}
          <div className="border-t border-neutral-100 pt-6 flex justify-between items-center text-[10px] text-neutral-450 font-bold uppercase">
            <span>© 2026 {toolName}. PRODUCTIVITY COMPLIANT.</span>
            <span>v2.1.0</span>
          </div>
        </div>
      );
    }

    // --- FOOTBALL ACADEMY CATEGORY RENDERING ---
    // Sequence: Navbar → Hero (Football Player Image, Headline, CTA Button) → Training Programs → Coaches → Match Schedule → Gallery → Testimonials → Contact → Footer
    if (categoryId === "football-academy") {
      if (styleId === "elite-club") {
        return (
          <div className="font-sans bg-slate-50 text-[#0F172A] p-8 space-y-20 min-h-full">
            {/* Navbar */}
            <div className="flex justify-between items-center bg-[#1E3A8A] text-white p-4 rounded-xl shadow-md">
              <span className="font-black text-sm uppercase tracking-wide">🔵 ATHLETIC SPORTS CLUB</span>
              <div className="hidden md:flex gap-4 text-xs font-bold uppercase tracking-wider text-slate-200">
                <span>Home</span>
                <span>Programs</span>
                <span>Coaches</span>
                <span>Fixtures</span>
                <span>Gallery</span>
                <span>Contact</span>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 bg-[#F59E0B] text-[#0F172A] rounded">REGISTER NOW</span>
            </div>

            {/* Hero */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left">
              <div className="md:col-span-7 space-y-6 text-left">
                <span className="px-3 py-1 bg-blue-100 text-[#1E3A8A] rounded-full text-xs font-bold">
                  ELITE SOCCER ACADEMY
                </span>
                <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-[#1E3A8A] leading-none text-left font-sans">
                  {websiteContent.hero.headline || "Develop Your Soccer Potential With Professionals"}
                </h1>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {websiteContent.hero.subheadline || "Deep royal navy blue sports branding, schedule match tables, and athletic trainer stats grids."}
                </p>
                <button className="rounded-lg bg-[#1E3A8A] text-white hover:bg-blue-900 transition-all font-bold text-xs px-6 py-2.5">
                  {websiteContent.hero.ctaText || "Register Online Now"}
                </button>
              </div>
              <div className="md:col-span-5 bg-white border border-slate-200 p-2 rounded-xl shadow-lg">
                <div className="h-64 rounded-lg overflow-hidden bg-slate-200">
                  <img src="/demo/football-academy.png" alt="Youth Soccer Training" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* Training Programs */}
            <div className="space-y-6 text-left">
              <h2 className="text-2xl font-black text-[#1E3A8A]">Elite Training Programs</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { title: "Junior Kickers", desc: "Ages 6-10. Focus on core agility and dribbling basics." },
                  { title: "Academy Pro", desc: "Ages 11-15. Advanced tactics, team setups, matches." },
                  { title: "Elite Development", desc: "Ages 16-19. Full physical preparation for scouting." }
                ].map((prog, i) => (
                  <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
                    <h3 className="font-extrabold text-sm text-[#1E3A8A]">{prog.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{prog.desc}</p>
                    <span className="text-[10px] font-bold text-[#F59E0B] block">Register Interest →</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Coaches */}
            <div className="space-y-6 text-left">
              <h2 className="text-2xl font-black text-[#1E3A8A]">Our Pro Coaches</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { name: "Coach Marcus Vance", role: "Former Pro, UEFA A License", bio: "Agility and defensive tactic expert." },
                  { name: "Coach Sarah Jenkins", role: "Elite Academy Director", bio: "Youth soccer scout and fitness lead." }
                ].map((c, i) => (
                  <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 flex gap-4 items-center font-sans text-left">
                    <div className="w-12 h-12 bg-slate-200 rounded-full shrink-0 flex items-center justify-center font-bold text-[#1E3A8A]">
                      FC
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#0F172A] text-left">{c.name}</h4>
                      <span className="text-[10px] text-[#F59E0B] font-bold block text-left">{c.role}</span>
                      <p className="text-[11px] text-slate-500 text-left">{c.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Match Schedule */}
            <div className="space-y-6 text-left">
              <h2 className="text-2xl font-black text-[#1E3A8A]">Match Schedule</h2>
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                {[
                  { home: "Athletic Club U15", away: "Metro United", date: "June 05, 10:00 AM", location: "Stadium Pitch A" },
                  { home: "Athletic Club U19", away: "City Academy", date: "June 08, 02:00 PM", location: "Stadium Main Field" }
                ].map((match, i) => (
                  <div key={i} className="border-b border-slate-100 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-left">
                    <div>
                      <span className="text-xs font-bold text-[#1E3A8A] block text-left">{match.home} vs {match.away}</span>
                      <p className="text-[10px] text-slate-400 text-left">{match.location}</p>
                    </div>
                    <span className="text-xs font-mono font-bold bg-slate-100 px-3 py-1 rounded text-[#0F172A]">{match.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery */}
            <div className="space-y-6 text-left">
              <h2 className="text-2xl font-black text-[#1E3A8A]">Academy Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-sans text-left">
                {[1, 2, 3, 4].map((g) => (
                  <div key={g} className="h-32 bg-slate-200 border border-slate-200 rounded-lg overflow-hidden relative">
                    <img src="/demo/football-academy.png" alt="Gallery Football" className="w-full h-full object-cover filter brightness-95" />
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center max-w-xl mx-auto space-y-3 shadow-sm">
              <div className="flex justify-center gap-1 text-[#F59E0B]">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
              <p className="text-sm italic text-slate-500">
                "The training programs here are exceptional. My son's physical fitness and tactical skills improved dramatically."
              </p>
              <span className="block font-bold text-xs text-[#1E3A8A]">— Parent Review, Class of '25</span>
            </div>

            {/* Contact */}
            <div className="bg-white border border-slate-200 rounded-2xl p-8 max-w-xl mx-auto space-y-6 text-left shadow-sm">
              <h3 className="font-black text-xl text-center text-[#1E3A8A]">Join Athletic Academy</h3>
              <div className="space-y-3 flex flex-col font-sans text-left">
                <input type="text" placeholder="PLAYER NAME" className="border border-slate-200 p-2.5 text-xs rounded-lg bg-slate-50 outline-none" />
                <input type="email" placeholder="GUARDIAN EMAIL" className="border border-slate-200 p-2.5 text-xs rounded-lg bg-slate-50 outline-none" />
                <button className="w-full bg-[#1E3A8A] hover:bg-blue-900 py-3 text-white font-bold text-xs rounded-lg transition-colors font-sans">
                  SUBMIT REGISTRATION REQUEST
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-200 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs font-bold text-slate-400 gap-4 uppercase font-sans">
              <span>© 2026 ATHLETIC SPORTS CLUB. ALL RIGHTS RESERVED.</span>
              <div className="flex gap-4">
                <span>FACBOOK</span>
                <span>INSTAGRAM</span>
                <span>YOUTUBE</span>
              </div>
            </div>
          </div>
        );
      }

      if (styleId === "academy-pro") {
        return (
          <div className="font-mono bg-white text-black p-6 space-y-20 border-4 border-black min-h-full">
            {/* Navbar */}
            <div className="border-4 border-black bg-white p-4 flex justify-between items-center shadow-[3px_3px_0px_0px_#000]">
              <span className="font-sans font-black uppercase text-sm bg-[#FBBF24] text-black px-2 py-0.5 border-2 border-black">
                ACADEMY PRO SPORTS
              </span>
              <div className="hidden md:flex gap-4 text-xs font-black uppercase">
                <span>Home</span>
                <span>Drills</span>
                <span>Squad</span>
                <span>Fixtures</span>
                <span>Contact</span>
              </div>
              <span className="text-xs font-black uppercase bg-[#EF4444] text-white px-2 py-0.5 border-2 border-black">LIVE</span>
            </div>

            {/* Hero */}
            <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_#000] grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-4 text-left">
                <span className="px-2.5 py-0.5 bg-black text-white text-[8px] font-black uppercase tracking-widest">
                  TACTICS LAB
                </span>
                <h2 className="font-sans font-black uppercase text-3xl sm:text-4xl md:text-5xl leading-none text-left">
                  {websiteContent.hero.headline || "Aggressive Athletic Training Programs"}
                </h2>
                <p className="text-xs font-bold text-neutral-700 leading-relaxed">
                  {websiteContent.hero.subheadline || "High-contrast sports grids with heavy rules, yellow/red highlights, and detailed fitness timelines."}
                </p>
                <button className="px-5 py-2 border-4 border-black bg-[#FBBF24] text-black font-black uppercase text-xs shadow-[3px_3px_0px_0px_#000] hover:bg-yellow-400 active:translate-y-0.5 active:shadow-none">
                  {websiteContent.hero.ctaText || "JOIN ELITE PROGRAM"}
                </button>
              </div>
              <div className="border-4 border-black h-48 overflow-hidden bg-neutral-100 shadow-[4px_4px_0px_0px_#000]">
                <img src="/demo/football-academy.png" alt="Elite Football Practice" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Programs */}
            <div className="space-y-6 text-left">
              <h2 className="text-xl font-sans font-black uppercase bg-black text-white px-3 py-1 inline-block">TACTICAL PROGRAMS //</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { t: "STRENGTH & WORKSHOP", d: "High energy cardiovascular setup." },
                  { t: "TACTICAL POSITIONING", d: "Formations analysis, 4-3-3 drills." },
                  { t: "SCOUT COMPILATION", d: "Showcasing match footage directly." }
                ].map((prog, i) => (
                  <div key={i} className="border-4 border-black bg-white p-4 shadow-[4px_4px_0px_0px_#000] space-y-2">
                    <h3 className="font-sans font-black uppercase text-xs bg-[#EF4444] text-white px-2 py-0.5 inline-block">{prog.t}</h3>
                    <p className="text-[10px] font-bold text-neutral-600">{prog.d}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Coaches */}
            <div className="space-y-6 text-left">
              <h2 className="text-xl font-sans font-black uppercase bg-[#FBBF24] text-black px-3 py-1 inline-block">TRAINERS REGISTER //</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "Coach Marcus Vance", spec: "DEFENSIVE SCHEMAS" },
                  { name: "Coach Sarah Jenkins", spec: "CARDIO LAB" }
                ].map((c, i) => (
                  <div key={i} className="border-4 border-black bg-white p-4 shadow-[4px_4px_0px_0px_#000] flex gap-4 items-center text-left">
                    <div className="w-10 h-10 border-2 border-black bg-black text-[#FBBF24] font-black flex items-center justify-center">
                      FC
                    </div>
                    <div>
                      <h4 className="font-black text-xs uppercase text-left">{c.name}</h4>
                      <span className="text-[8px] font-bold text-[#EF4444] uppercase tracking-wider text-left block">{c.spec}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Match Schedule */}
            <div className="space-y-6 text-left">
              <h2 className="text-xl font-sans font-black uppercase bg-black text-white px-3 py-1 inline-block">MATCH FIXTURES //</h2>
              <div className="border-4 border-black bg-white shadow-[4px_4px_0px_0px_#000] divide-y-4 divide-black text-left">
                {[
                  { team: "ELITE U19 VS GALAXY FC", time: "JUNE 12 // 15:00" },
                  { team: "JUNIORS VS BRUTAL FC", time: "JUNE 15 // 10:00" }
                ].map((match, i) => (
                  <div key={i} className="p-4 flex justify-between items-center text-left">
                    <span className="text-xs font-black text-left">{match.team}</span>
                    <span className="text-[10px] font-bold bg-[#FBBF24] border-2 border-black px-2 py-0.5">{match.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery */}
            <div className="space-y-6 text-left">
              <h2 className="text-xl font-sans font-black uppercase bg-[#EF4444] text-white px-3 py-1 inline-block">LIVE CAPTURES //</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((g) => (
                  <div key={g} className="border-4 border-black h-24 overflow-hidden relative shadow-[2px_2px_0px_0px_#000]">
                    <img src="/demo/football-academy.png" alt="Gallery Grid" className="w-full h-full object-cover filter grayscale" />
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_#000] text-center space-y-2">
              <p className="text-xs font-black uppercase">"INTENSE AGGRESSIVE TRAINING PARADIGM. STRONGLY RECOMMENDED."</p>
              <span className="block text-[8px] font-bold text-neutral-500">— SQUAD LOG TELEMETRY</span>
            </div>

            {/* Contact */}
            <div className="border-4 border-black bg-[#FFFDF5] p-6 shadow-[6px_6px_0px_0px_#000] max-w-md mx-auto space-y-4 text-left">
              <h3 className="font-sans font-black text-center text-sm uppercase bg-black text-[#FBBF24] py-1">ACQUISITION PORT //</h3>
              <input type="text" placeholder="PLAYER_NAME" className="w-full border-4 border-black p-2 text-xs font-black uppercase bg-white outline-none" />
              <button className="w-full border-4 border-black bg-[#EF4444] text-white font-black uppercase text-xs shadow-[3px_3px_0px_0px_#000] active:translate-y-0.5 active:shadow-none transition-all py-2 font-mono">
                TRANSMIT SIGNUP
              </button>
            </div>

            {/* Footer */}
            <div className="border-t-4 border-black pt-6 flex flex-col sm:flex-row justify-between items-center text-[10px] font-black gap-4 uppercase">
              <span>© 2026 ACADEMY PRO INC. SHIPPED RAW.</span>
              <div className="flex gap-4">
                <span>GITHUB</span>
                <span>INSTAGRAM</span>
                <span>TWITTER</span>
              </div>
            </div>
          </div>
        );
      }

      // Default / Athletic Modern theme
      return (
        <div className="font-sans bg-[#090D16] text-[#F3F4F6] p-8 space-y-16 min-h-full">
          {/* Navbar */}
          <div className="flex justify-between items-center border-b border-gray-800 pb-4">
            <span className="font-black text-sm text-[#84CC16] uppercase font-sans">ATHLETIC LAB</span>
            <div className="hidden md:flex gap-4 text-xs font-bold uppercase text-neutral-400">
              <span>Home</span>
              <span>Labs</span>
              <span>Squads</span>
              <span>Fixtures</span>
              <span>Telemetry</span>
            </div>
            <span className="text-xs text-neutral-400 font-mono">Status: Active</span>
          </div>

          {/* Hero */}
          <div className="text-center max-w-2xl mx-auto space-y-6">
            <span className="px-3 py-1 bg-[#84CC16]/10 border border-[#84CC16]/20 text-[#84CC16] rounded-full text-xs font-mono">
              NEXT GEN SPORTS INTEL
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase text-white leading-tight text-center font-sans">
              {websiteContent.hero.headline || "Next Gen Soccer Intelligence & Tactical Analysis"}
            </h2>
            <p className="text-xs text-neutral-450 max-w-md mx-auto leading-relaxed text-center font-sans">
              {websiteContent.hero.subheadline || "Dark sports dashboard theme incorporating bright electric lime accents and squads metric list."}
            </p>
            <button className="px-6 py-2 bg-[#84CC16] hover:bg-lime-500 text-black font-bold text-xs rounded transition-all">
              {websiteContent.hero.ctaText || "Deploy Analytics Platform"}
            </button>
            <div className="h-60 rounded-xl border border-gray-800 p-2 bg-[#111827]/60 shadow-2xl overflow-hidden mt-6">
              <img src="/demo/football-academy.png" alt="Soccer pitch visual" className="w-full h-full object-cover filter saturate-[80%]" />
            </div>
          </div>

          {/* Training Programs */}
          <div className="space-y-6 text-left">
            <h3 className="text-xs uppercase tracking-widest text-[#84CC16] font-mono text-left">// ATHLETIC LAB DRILLS</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
              {[
                { t: "Telemetry Fitness", d: "Continuous heart-rate and velocity sensors compilation." },
                { t: "Ball Mechanics", d: "High speed capture drills modeling tactical footwork." },
                { t: "Team Intelligence", d: "Spatial positioning modeling with neural engine." }
              ].map((prog, i) => (
                <div key={i} className="border border-gray-800 bg-[#111827]/40 p-5 rounded-xl space-y-2 text-left">
                  <h4 className="font-bold text-white text-xs text-left">{prog.t}</h4>
                  <p className="text-[11px] text-neutral-400 leading-relaxed text-left">{prog.d}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Coaches */}
          <div className="space-y-6 text-left">
            <h3 className="text-xs uppercase tracking-widest text-[#84CC16] font-mono text-left">// EXPERT ANALYSTS</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              {[
                { name: "Coach Marcus Vance", spec: "NEURAL POSITIONS LAB" },
                { name: "Coach Sarah Jenkins", spec: "FITNESS DRILLS SENSOR" }
              ].map((c, i) => (
                <div key={i} className="border border-gray-800 bg-[#111827]/20 p-4 rounded-xl flex items-center gap-4 text-left">
                  <div className="w-10 h-10 rounded-full border border-[#84CC16] bg-[#84CC16]/10 flex items-center justify-center font-mono text-[#84CC16] text-xs">
                    T{i}
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-white text-left">{c.name}</h4>
                    <span className="text-[9px] text-[#84CC16] font-mono block text-left">{c.spec}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Match Schedule */}
          <div className="space-y-6 text-left">
            <h3 className="text-xs uppercase tracking-widest text-[#84CC16] font-mono text-left">// TELEMETRY SCHEDULE</h3>
            <div className="border border-gray-800 bg-[#111827]/60 rounded-xl divide-y divide-gray-800 text-left">
              {[
                { game: "U19 ELITE VS SHADOW TEAM", date: "06/10 14:00" },
                { game: "JUNIORS VS VELOCITY INC", date: "06/15 09:00" }
              ].map((m, i) => (
                <div key={i} className="p-4 flex justify-between items-center text-xs text-left">
                  <span className="font-bold text-white text-left">{m.game}</span>
                  <span className="font-mono text-[#84CC16]">{m.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery */}
          <div className="space-y-6 text-left">
            <h3 className="text-xs uppercase tracking-widest text-[#84CC16] font-mono text-left">// VIDEO SLOTS</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((g) => (
                <div key={g} className="h-24 bg-gray-900 border border-gray-800 rounded-lg overflow-hidden relative">
                  <img src="/demo/football-academy.png" alt="Telemetry Capture" className="w-full h-full object-cover filter saturate-[50%]" />
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="border border-gray-800 bg-[#111827]/40 p-6 rounded-xl text-center space-y-2">
            <p className="text-xs text-neutral-350">"SPATIAL DATA SENSORS SHIFTED OUR TEAM PERFORMANCE NATIVELY."</p>
            <span className="block text-[8.5px] font-mono text-[#84CC16]">— SQUAD LAB CONTROLLER</span>
          </div>

          {/* Contact */}
          <div className="border border-gray-800 bg-[#111827]/80 p-6 rounded-xl max-w-md mx-auto space-y-4 text-left">
            <h4 className="text-xs uppercase tracking-widest text-[#84CC16] font-mono text-center">// TRANSMIT SIGNUP CREDENTIALS</h4>
            <input type="text" placeholder="ATHLETE_NAME" className="w-full bg-black/60 border border-gray-800 rounded p-2 text-xs text-white outline-none focus:border-[#84CC16] font-mono" />
            <button className="w-full py-2 bg-[#84CC16] text-black font-bold text-xs rounded transition-all font-mono">
              INITIALIZE ENGAGEMENT
            </button>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-800 pt-8 flex justify-between items-center text-[10px] text-neutral-500 font-mono">
            <span>© 2026 ATHLETIC SYSTEMS. ALL HUDS STABLE.</span>
            <div className="flex gap-4">
              <span>/telemetry</span>
              <span>/github</span>
            </div>
          </div>
        </div>
      );
    }

    // --- MOSQUE CATEGORY RENDERING ---
    // Sequence: Navbar → Hero (Mosque Image) → Prayer Times → About Mosque → Events → Donation → Quran Classes → Imam Section → Contact → Footer
    if (categoryId === "mosque" || categoryId === "islamic-website") {
      if (styleId === "islamic-modern") {
        return (
          <div className="font-serif bg-[#FAF9F5] text-[#065F46] p-8 space-y-20 min-h-full">
            {/* Navbar */}
            <div className="border-b border-[#D97706]/20 pb-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
              <div>
                <h1 className="text-2xl font-bold uppercase tracking-widest text-[#065F46]">MASJID AL-NUR</h1>
                <span className="text-[8.5px] font-sans tracking-wide text-neutral-450 uppercase block text-left">Emerald & Gold Heritage</span>
              </div>
              <div className="hidden md:flex gap-5 text-xs font-sans font-bold uppercase tracking-wider text-[#065F46]/80">
                <span>Home</span>
                <span>Prayers</span>
                <span>About</span>
                <span>Events</span>
                <span>Donation</span>
                <span>Classes</span>
                <span>Imam</span>
                <span>Contact</span>
              </div>
              <button className="px-4 py-2 bg-[#065F46] text-white hover:bg-emerald-800 text-xs rounded font-sans font-bold">
                Donate Online
              </button>
            </div>

            {/* Hero */}
            <div className="text-center max-w-2xl mx-auto space-y-6">
              <span className="font-sans text-[8px] tracking-[0.2em] text-[#D97706] uppercase block font-bold">
                PRAYER TIMINGS & COMMUNITY DRIVE
              </span>
              <h2 className="text-3xl font-bold text-[#065F46] leading-tight text-center">
                {websiteContent.hero.headline || "A Serene Sanctuary for Spiritual Connection & Education"}
              </h2>
              <p className="font-sans text-xs text-neutral-600 leading-relaxed max-w-md mx-auto text-center">
                {websiteContent.hero.subheadline || "Emerald green accents, prayer timing highlights, and community donation target progress meters."}
              </p>
              <div className="max-w-xl mx-auto border border-[#D97706]/20 p-2 bg-white shadow-md mt-4">
                <div className="h-64 overflow-hidden bg-neutral-100">
                  <img src="/demo/mosque-exterior.png" alt="Masjid Exterior" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* Prayer Times */}
            <div className="space-y-6 max-w-xl mx-auto pt-6 text-center">
              <h3 className="text-center text-sm font-sans font-bold uppercase tracking-wider text-[#D97706]">Today's Prayer Timings</h3>
              <div className="grid grid-cols-5 gap-2">
                {[
                  { name: "Fajr", time: "04:32 AM", active: false },
                  { name: "Dhuhr", time: "12:20 PM", active: true },
                  { name: "Asr", time: "03:45 PM", active: false },
                  { name: "Maghrib", time: "06:58 PM", active: false },
                  { name: "Isha", time: "08:24 PM", active: false }
                ].map((tim, i) => (
                  <div
                    key={i}
                    className={
                      tim.active
                        ? "p-3 border text-center rounded-lg border-[#D97706] bg-[#D97706]/5 shadow-sm"
                        : "p-3 border text-center rounded-lg border-slate-200 bg-white text-slate-500"
                    }
                  >
                    <span className="text-[8.5px] font-sans font-black block uppercase">{tim.name}</span>
                    <span className="text-xs font-bold block pt-1">{tim.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* About Mosque */}
            <div className="max-w-2xl mx-auto text-center space-y-4">
              <h3 className="text-xs font-sans font-bold uppercase tracking-wider text-[#D97706]">MASJID AL-NUR HISTORY</h3>
              <p className="text-sm font-sans leading-relaxed text-neutral-700">
                {websiteContent.about.description || "Established with the core values of unity, education, and spiritual guidance, Masjid Al-Nur serves as a traditional emerald and gold sanctuary for families in the metropolitan area. We offer daily congregational prayers, youth outreach, and Qur'anic classes under expert scholars."}
              </p>
            </div>

            {/* Events */}
            <div className="space-y-6 text-left max-w-2xl mx-auto">
              <h3 className="text-center text-xs font-sans font-bold uppercase tracking-wider text-[#D97706]">Masjid Community Lectures</h3>
              <div className="space-y-4">
                {[
                  { title: "Weekly Quran Halaqah", desc: "Every Saturday after Maghrib. Journey through Surah Al-Kahf.", host: "Dr. Sheikh Ahmad" },
                  { title: "Youth Leadership Summit", desc: "June 14, 10:00 AM. Interactive mentoring panels and networking.", host: "Brother Yusuf" }
                ].map((ev, i) => (
                  <div key={i} className="bg-white border border-[#D97706]/20 p-5 rounded-xl space-y-2 text-left">
                    <span className="text-[8px] font-sans font-bold uppercase tracking-widest text-[#D97706]">COMMUNITY GATHERING</span>
                    <h4 className="text-lg font-bold text-[#065F46] text-left">{ev.title}</h4>
                    <p className="text-xs font-sans text-neutral-600 text-left">{ev.desc}</p>
                    <span className="block text-[10px] font-sans italic text-neutral-500 text-left">Led by {ev.host}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Donation */}
            <div className="bg-white border border-[#D97706]/20 rounded-2xl p-8 max-w-xl mx-auto text-center space-y-6 shadow-sm">
              <h3 className="font-sans font-bold uppercase tracking-wider text-[#D97706]">Support Our Sanctuary Extension Drive</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-sans font-bold text-neutral-600">
                  <span>Target Raised: $120,000</span>
                  <span>Goal: $250,000</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div className="bg-[#D97706] h-full rounded-full" style={{ width: "48%" }} />
                </div>
                <span className="block text-[10px] font-sans text-neutral-500 italic">48% Completed — Support the mosque building fund directly</span>
              </div>
              <button className="px-6 py-2.5 bg-[#065F46] text-white font-sans font-bold rounded-lg text-xs hover:bg-emerald-800 transition-colors">
                CONTRIBUTE TO MOSQUE DRIVE
              </button>
            </div>

            {/* Quran Classes */}
            <div className="space-y-6 text-left max-w-2xl mx-auto">
              <h3 className="text-center text-xs font-sans font-bold uppercase tracking-wider text-[#D97706]">Islamic & Quranic Academy</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: "Quran Tajweed Basics", age: "Children (Ages 7-14)", details: "Learn the proper articulation of letters and rules of recitation." },
                  { title: "Arabic Language Essentials", age: "Adults Program", details: "Intensive courses studying traditional grammar and scriptural understanding." }
                ].map((cls, i) => (
                  <div key={i} className="bg-white border border-[#D97706]/10 p-5 rounded-xl text-left space-y-2">
                    <span className="text-[9px] font-sans font-bold bg-[#FAF9F5] text-[#065F46] px-2 py-0.5 border border-[#D97706]/20 rounded">
                      {cls.age}
                    </span>
                    <h4 className="font-bold text-sm text-[#065F46] pt-1 text-left">{cls.title}</h4>
                    <p className="text-[11px] font-sans text-neutral-500 leading-relaxed text-left">{cls.details}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Imam Section */}
            <div className="bg-white border border-[#D97706]/20 rounded-2xl p-6 max-w-xl mx-auto text-center space-y-4 shadow-sm">
              <div className="w-16 h-16 bg-[#065F46]/10 rounded-full mx-auto flex items-center justify-center font-bold text-lg text-[#065F46]">
                IMAM
              </div>
              <h4 className="font-bold text-base text-[#065F46]">Sheikh Ahmad Al-Mubashir</h4>
              <span className="text-xs font-sans text-neutral-450 uppercase tracking-widest block">Chief Imam & Spiritual Director</span>
              <p className="text-sm italic text-neutral-650">
                "Spiritual connection requires consistency, serene sanctuary environments, and unified community drives to thrive."
              </p>
            </div>

            {/* Contact */}
            <div className="bg-white border border-[#D97706]/20 rounded-2xl p-8 max-w-xl mx-auto space-y-6 text-left shadow-sm">
              <h3 className="font-sans font-bold uppercase tracking-wider text-[#D97706] text-center">Masjid Inquiry Form</h3>
              <div className="space-y-3 flex flex-col font-sans text-left">
                <input type="text" placeholder="NAME" className="border border-slate-200 p-2.5 text-xs rounded-lg bg-slate-50 outline-none" />
                <input type="email" placeholder="EMAIL ADDRESS" className="border border-slate-200 p-2.5 text-xs rounded-lg bg-slate-50 outline-none" />
                <button className="w-full bg-[#065F46] py-3 text-white font-bold text-xs rounded-lg transition-colors font-sans uppercase">
                  TRANSMIT ENQUIRY
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-[#D97706]/20 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs font-sans text-neutral-400 gap-4 uppercase font-bold">
              <span>© 2026 MASJID AL-NUR. ALL RIGHTS RESERVED.</span>
              <div className="flex gap-4 font-sans">
                <span>Prayer Times</span>
                <span>Academy Courses</span>
                <span>Contact Masjid</span>
              </div>
            </div>
          </div>
        );
      }

      if (styleId === "arabic-premium") {
        return (
          <div className="font-serif bg-[#FFFDF6] text-[#451A03] p-8 space-y-20 min-h-full">
            {/* Navbar */}
            <div className="border-b border-[#B45309]/15 pb-4 text-center space-y-2">
              <h1 className="text-2xl font-bold tracking-widest text-[#451A03] uppercase">MADINAH COMMUNITY CENTER</h1>
              <div className="hidden md:flex justify-center gap-6 text-[10px] font-sans font-bold tracking-[0.2em] text-[#B45309]">
                <span>SANCTUARY</span>
                <span>TIMINGS</span>
                <span>EVENTS</span>
                <span>DONATE</span>
                <span>CLASSES</span>
                <span>IMAM</span>
                <span>CONTACT</span>
              </div>
              <span className="text-[8.5px] font-sans tracking-[0.2em] text-[#B45309] uppercase block font-bold pt-1">
                TRADITIONAL BRASS ARCHITECTURE
              </span>
            </div>

            {/* Hero */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-4 text-left">
              <div className="md:col-span-7 space-y-6 text-left">
                <span className="text-[9px] font-sans font-bold tracking-wider text-[#B45309] uppercase">// QUR'ANIC HERITAGE</span>
                <h2 className="text-3xl font-normal italic leading-tight text-[#451A03] text-left font-serif">
                  {websiteContent.hero.headline || "Nurturing Traditional Qur'anic Education & Community Spirit"}
                </h2>
                <p className="font-sans text-xs text-neutral-600 leading-relaxed">
                  {websiteContent.hero.subheadline || "Beautiful sand desert palettes, arabesque calligraphy dividers, and classical Islamic educational programs."}
                </p>
                <button className="px-6 py-2.5 border border-[#B45309] bg-transparent text-[#B45309] hover:bg-[#B45309] hover:text-white transition-all text-[10px] font-sans font-bold uppercase mt-2">
                  {websiteContent.hero.ctaText || "Explore Islamic Courses"}
                </button>
              </div>
              <div className="md:col-span-5 border border-[#B45309]/20 p-1.5 bg-white font-sans text-left">
                <div className="h-64 overflow-hidden bg-neutral-100">
                  <img src="/demo/mosque-exterior.png" alt="Quran Study" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* Prayer Times */}
            <div className="space-y-6 max-w-xl mx-auto pt-6 text-center">
              <h3 className="text-center text-xs font-sans font-bold uppercase tracking-[0.2em] text-[#B45309]">Today's Congregational Timings</h3>
              <div className="grid grid-cols-5 gap-2 font-sans text-xs text-[#451A03]">
                {[
                  { name: "FAJR", time: "04:30" },
                  { name: "DHUHR", time: "12:15" },
                  { name: "ASR", time: "15:45" },
                  { name: "MAGHRIB", time: "18:55" },
                  { name: "ISHA", time: "20:30" }
                ].map((tim, i) => (
                  <div key={i} className="p-2 border border-[#B45309]/20 bg-white text-center">
                    <span className="text-[8px] font-bold block">{tim.name}</span>
                    <span className="text-xs font-bold block pt-1">{tim.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* About Mosque */}
            <div className="max-w-2xl mx-auto text-center space-y-4">
              <span className="text-[8px] tracking-[0.2em] text-[#B45309] uppercase font-bold block font-sans">SANCTUARY DNA</span>
              <p className="text-sm leading-relaxed text-[#451A03] font-serif">
                {websiteContent.about.description || "The Madinah Center has stood as a beacon of Islamic learning and community guidance, preserving sand desert sand palettes, delicate calligraphic separator rules, and deep scriptural studies natively since inception."}
              </p>
            </div>

            {/* Events */}
            <div className="space-y-6 text-left max-w-2xl mx-auto">
              <h3 className="text-center text-xs font-sans font-bold uppercase tracking-[0.2em] text-[#B45309]">Traditional Halaqah Seminars</h3>
              <div className="space-y-4 divide-y divide-[#B45309]/10">
                {[
                  { title: "Tafsir of Surah Al-Fatihah", time: "Friday after Maghrib", lecturer: "Sheikh Al-Mubashir" },
                  { title: "Principles of Fiqh Basics", time: "Sunday after Asr", lecturer: "Ustadha Zainab" }
                ].map((ev, i) => (
                  <div key={i} className="pt-4 first:pt-0 space-y-1 text-left">
                    <h4 className="text-base font-bold text-[#451A03] text-left">{ev.title}</h4>
                    <p className="text-[11px] font-sans text-neutral-500 text-left">{ev.time} — Led by {ev.lecturer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Donation */}
            <div className="border border-[#B45309]/20 bg-white p-6 max-w-md mx-auto text-center space-y-4">
              <h3 className="text-xs font-sans tracking-[0.2em] text-[#B45309] uppercase font-bold">Traditional Charity Ledger</h3>
              <p className="text-xs text-neutral-500 font-sans leading-relaxed">
                Fund congregational educational setups, Arabic library resources, and sanctuary facilities natively.
              </p>
              <button className="px-6 py-2.5 border border-[#B45309] bg-transparent text-[#B45309] text-[10px] tracking-widest font-sans font-bold uppercase">
                SUBMIT DONATION FUND
              </button>
            </div>

            {/* Quran Classes */}
            <div className="space-y-6 text-left max-w-2xl mx-auto font-serif">
              <h3 className="text-center text-xs font-sans font-bold uppercase tracking-[0.2em] text-[#B45309]">Bespoke Islamic Studies</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: "Qur'an Memorization (Hifz)", details: "One-on-one traditional recitation correction with licensed teachers." },
                  { title: "Hadith Science Studies", details: "Reviewing classical texts and chains of transmission natively." }
                ].map((c, i) => (
                  <div key={i} className="border border-[#B45309]/15 p-4 bg-white/50 space-y-2 text-left">
                    <h4 className="font-bold text-sm text-[#451A03] text-left">{c.title}</h4>
                    <p className="text-[11px] font-sans text-neutral-500 leading-relaxed text-left">{c.details}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Imam Section */}
            <div className="bg-[#FFFDF6] border border-[#B45309]/20 p-6 max-w-xl mx-auto text-center space-y-3">
              <h4 className="font-bold text-base text-[#451A03] italic">Imam Sheikh Ahmad Al-Mubashir</h4>
              <p className="text-xs text-neutral-500 font-sans uppercase tracking-widest">Islamic Sciences Director</p>
              <p className="text-sm italic text-[#451A03]">
                "Knowledge is that which benefits, not that which is memorized."
              </p>
            </div>

            {/* Contact */}
            <div className="max-w-md mx-auto space-y-4 pt-6 border-t border-[#B45309]/20 text-left">
              <h3 className="text-xs tracking-[0.2em] text-[#B45309] font-sans font-bold uppercase text-center font-sans">SOUMETTRE UNE INQUIRY</h3>
              <input type="text" placeholder="NAME" className="w-full bg-transparent border-b border-[#B45309]/20 py-2 text-center text-xs tracking-wider outline-none focus:border-[#B45309]" />
              <button className="w-full py-2.5 bg-[#451A03] text-white text-[10px] font-sans font-bold tracking-widest uppercase">
                TRANSMIT INQUIRY
              </button>
            </div>

            {/* Footer */}
            <div className="border-t border-[#B45309]/15 pt-8 flex justify-between items-center text-[9px] tracking-widest text-[#B45309] font-sans font-bold uppercase">
              <span>© 2026 MADINAH COMMUNITY. TRADITIONAL BRASS.</span>
              <div className="flex gap-4">
                <span>SANCTUARY</span>
                <span>COURT</span>
              </div>
            </div>
          </div>
        );
      }

      // Default / Community Center theme
      return (
        <div className="font-sans bg-slate-50 text-[#0F172A] p-8 space-y-16 min-h-full">
          {/* Navbar */}
          <div className="flex justify-between items-center bg-white border border-slate-100 p-4 rounded-xl shadow-xs">
            <span className="font-black text-sm text-[#0F766E] uppercase">🕌 MOSQUE COMMUNITY HUB</span>
            <div className="hidden md:flex gap-4 text-xs font-bold text-neutral-500 uppercase">
              <span>Home</span>
              <span>Prayer Times</span>
              <span>Lectures</span>
              <span>Donate</span>
              <span>Quran School</span>
              <span>Contact</span>
            </div>
            <span className="text-xs font-bold text-neutral-550">Friday Sermon: 1:00 PM</span>
          </div>

          {/* Hero */}
          <div className="text-center max-w-xl mx-auto space-y-4">
            <h2 className="text-3xl font-black text-[#0F766E] text-center font-sans">
              {websiteContent.hero.headline || "Join Our Weekly Community Lectures & Events"}
            </h2>
            <p className="text-xs text-slate-550 leading-relaxed max-w-md mx-auto text-center font-sans">
              {websiteContent.hero.subheadline || "Soft blue/teal outlines, friendly bento events list, and easily readable schedules details."}
            </p>
            <div className="h-60 rounded-2xl border-2 border-white bg-neutral-200 overflow-hidden shadow-md mt-6">
              <img src="/demo/mosque-exterior.png" alt="Mosque Event Banner" className="w-full h-full object-cover filter brightness-95" />
            </div>
          </div>

          {/* Prayer Times */}
          <div className="space-y-4 max-w-md mx-auto pt-6 text-center">
            <h3 className="font-bold text-[#0F766E] text-sm uppercase">Community Prayer Grid</h3>
            <div className="grid grid-cols-5 gap-2 text-xs font-sans">
              {[
                { n: "Fajr", t: "04:35" },
                { n: "Dhuhr", t: "12:30" },
                { n: "Asr", t: "15:50" },
                { n: "Maghrib", t: "19:00" },
                { n: "Isha", t: "20:35" }
              ].map((p, i) => (
                <div key={i} className="bg-white border border-slate-200 p-2 rounded-lg text-center font-sans">
                  <span className="block font-bold text-slate-500 text-[9px]">{p.n}</span>
                  <span className="font-bold block pt-1 text-[#0F766E]">{p.t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* About Mosque */}
          <div className="max-w-xl mx-auto text-center space-y-3 font-sans">
            <h3 className="font-bold text-[#0F766E] text-xs uppercase">About Our Center</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {websiteContent.about.description || "Our community hub is designed to offer accessible prayer timing matrices, event grids, kids Quran schools, and open Imam consultations natively."}
            </p>
          </div>

          {/* Events */}
          <div className="space-y-4 max-w-md mx-auto text-left font-sans">
            <h3 className="font-bold text-[#0F766E] text-xs uppercase text-center font-sans">Upcoming Events</h3>
            {[
              { t: "Friday Youth Halaqah", d: "Ages 13-18. Discussion on contemporary topics." },
              { t: "Islamic History Seminar", d: "Saturdays after Isha. Open to all families." }
            ].map((ev, i) => (
              <div key={i} className="bg-white border border-slate-200 p-4 rounded-xl text-left space-y-1 font-sans">
                <span className="font-bold text-xs text-[#0F766E] block text-left">{ev.t}</span>
                <p className="text-[11px] text-slate-500 leading-relaxed text-left">{ev.d}</p>
              </div>
            ))}
          </div>

          {/* Donation */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 max-w-md mx-auto text-center space-y-3 shadow-xs font-sans">
            <h3 className="font-bold text-sm text-[#0F766E] uppercase font-sans">Community Support Fund</h3>
            <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
              Support the monthly operation costs and education sponsorships natively.
            </p>
            <button className="px-4 py-2 bg-[#0F766E] hover:bg-teal-800 text-white font-bold text-xs rounded transition-colors font-sans">
              CONTRIBUTE TO MOSQUE FUND
            </button>
          </div>

          {/* Quran Classes */}
          <div className="space-y-4 max-w-md mx-auto text-left font-sans">
            <h3 className="font-bold text-[#0F766E] text-xs uppercase text-center font-sans">Quran School Programs</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              {[
                { title: "Weekend School", details: "Islamic basics, Quran reading." },
                { title: "Tajweed Evening", details: "Recitation articulation basics." }
              ].map((c, i) => (
                <div key={i} className="bg-white border border-slate-150 p-4 rounded-xl space-y-1 text-left font-sans">
                  <h4 className="font-bold text-xs text-[#0F766E] text-left">{c.title}</h4>
                  <p className="text-[10px] text-slate-500 text-left">{c.details}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Imam Section */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 max-w-md mx-auto text-center space-y-2 font-sans">
            <h4 className="font-bold text-xs text-[#0F766E] font-sans">Sheikh Ahmad Al-Mubashir</h4>
            <p className="text-[9px] text-slate-500 uppercase block font-bold font-sans">Mosque Director</p>
            <p className="text-xs italic text-slate-600 font-sans">"Spiritual connection is nurtured through accessible community lectures."</p>
          </div>

          {/* Contact */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 max-w-md mx-auto space-y-3 text-left font-sans">
            <h4 className="font-bold text-xs text-[#0F766E] text-center uppercase font-sans">Send Community Message</h4>
            <input type="text" placeholder="Your Name" className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-xs outline-none" />
            <button className="w-full py-2 bg-[#0F766E] text-white font-bold text-xs rounded transition-all font-sans uppercase">
              TRANSMIT REQUEST
            </button>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-200 pt-8 flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase font-sans">
            <span>© 2026 MOSQUE COMMUNITY. ACCESSIBLE ECOSYSTEM.</span>
            <div className="flex gap-4 font-sans">
              <span>Prayer Times</span>
              <span>Halaqah Logs</span>
            </div>
          </div>
        </div>
      );
    }

    // --- RESTAURANT CATEGORY RENDERING ---
    // Sequence: Navbar → Hero → Menu → Chef → Gallery → Reservation → Contact → Footer
    if (categoryId === "restaurant") {
      if (styleId === "fine-dining") {
        return (
          <div className="font-serif bg-neutral-900 text-amber-50 p-8 space-y-20 min-h-full">
            {/* Navbar */}
            <div className="border-b border-amber-800/30 pb-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
              <div>
                <h1 className="text-2xl font-normal tracking-[0.2em] text-[#C5A880] uppercase">L'ÉTOILE RESTAURANT</h1>
                <span className="text-[8.5px] font-sans tracking-widest text-neutral-500 uppercase block text-left">Est. 1994 // PARIS</span>
              </div>
              <div className="hidden md:flex gap-6 text-[10px] font-sans font-bold tracking-widest text-[#C5A880]/80">
                <span>Le Menu</span>
                <span>Le Chef</span>
                <span>Galerie</span>
                <span>Reservation</span>
                <span>Contact</span>
              </div>
              <span className="text-xs uppercase text-[#C5A880] tracking-widest font-sans font-bold">MICHELIN STAR</span>
            </div>

            {/* Hero */}
            <div className="text-center max-w-2xl mx-auto space-y-6">
              <span className="font-sans text-[7.5px] tracking-[0.3em] text-[#C5A880] uppercase block">
                GASTRONOMIQUE EXPERIENCE
              </span>
              <h2 className="text-3xl md:text-5xl font-normal italic text-[#C5A880] leading-tight text-center">
                {websiteContent.hero.headline || "Artisanal Culinary Creations Natively Prepared"}
              </h2>
              <p className="font-sans text-xs text-neutral-450 max-w-md mx-auto leading-relaxed text-center">
                {websiteContent.hero.subheadline || "A luxury culinary layout setting featuring warm romantic interior photography and delicate gold menu borders."}
              </p>
              <div className="max-w-xl mx-auto border border-[#C5A880]/30 p-2 bg-neutral-950 shadow-2xl mt-4">
                <div className="h-64 overflow-hidden bg-neutral-900">
                  <img src="/demo/restaurant-interior.png" alt="Fine Dining Table" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* Menu */}
            <div className="border-t border-amber-800/20 pt-12 space-y-8 max-w-xl mx-auto text-center">
              <h3 className="text-lg text-[#C5A880] uppercase tracking-[0.2em]">Signature Menu</h3>
              <div className="space-y-6">
                {[
                  { name: "Caviare Impérial", desc: "Served with toasted brioche, organic crème fraîche.", price: "$95" },
                  { name: "Filet de Boeuf Sauvage", desc: "Charcoal grilled wild wagyu, black truffle reduction.", price: "$120" }
                ].map((menuItem, idx) => (
                  <div key={idx} className="space-y-1.5 text-left">
                    <div className="flex justify-between items-baseline font-normal text-sm">
                      <span className="text-[#C5A880]">{menuItem.name}</span>
                      <span className="w-16 border-b border-dotted border-amber-800/30 flex-1 mx-2" />
                      <span>{menuItem.price}</span>
                    </div>
                    <p className="font-sans text-[10px] text-neutral-400 text-left">{menuItem.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Chef */}
            <div className="border-t border-amber-800/20 pt-12 text-center max-w-md mx-auto space-y-4">
              <h3 className="text-[#C5A880] uppercase tracking-[0.2em] text-xs">L'Artiste de Cuisine</h3>
              <h4 className="text-xl font-normal">Chef Pierre Al-Mubashir</h4>
              <p className="font-sans text-xs text-neutral-400 leading-relaxed">
                "Our kitchen operates on the core principles of raw culinary heritage, using sand desert herbs and micro-typography-perfect plating architectures natively."
              </p>
            </div>

            {/* Gallery */}
            <div className="border-t border-amber-800/20 pt-12 space-y-6">
              <h3 className="text-[#C5A880] uppercase tracking-[0.2em] text-xs text-center">Galerie d'Intérieur</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((g) => (
                  <div key={g} className="h-32 bg-neutral-950 border border-neutral-800/60 overflow-hidden relative">
                    <img src="/demo/restaurant-interior.png" alt="Interior Plate" className="w-full h-full object-cover filter brightness-75 contrast-125" />
                  </div>
                ))}
              </div>
            </div>

            {/* Reservation */}
            <div className="border border-[#C5A880]/30 p-8 max-w-md mx-auto text-center space-y-6 bg-neutral-950 text-left">
              <h3 className="text-lg text-[#C5A880] uppercase tracking-[0.2em] text-center">Reserve A Salon</h3>
              <div className="space-y-4 flex flex-col font-sans text-left">
                <input type="text" placeholder="NUMBER OF GUESTS" className="bg-transparent border-b border-amber-800/40 py-2 text-center text-xs tracking-wider outline-none focus:border-[#C5A880]" />
                <button className="px-6 py-3 border border-[#C5A880] bg-transparent text-[#C5A880] hover:bg-[#C5A880] hover:text-black text-[10px] tracking-widest uppercase transition-all mt-4 font-serif">
                  INITIATE RESERVATION
                </button>
              </div>
            </div>

            {/* Contact */}
            <div className="max-w-md mx-auto text-center space-y-2 py-4">
              <h4 className="text-xs uppercase text-[#C5A880] tracking-[0.2em]">L'Adresse</h4>
              <p className="font-sans text-xs text-neutral-400 leading-relaxed">
                Champs-Élysées, Paris, France // Reservation required 24h in advance.
              </p>
            </div>

            {/* Footer */}
            <div className="border-t border-amber-800/20 pt-8 flex flex-col sm:flex-row justify-between items-center text-[9px] tracking-widest text-[#C5A880] font-sans font-bold uppercase">
              <span>© 2026 L'ÉTOILE GROUP. SHIPPED NATIVELY.</span>
              <div className="flex gap-4">
                <span>PARIS</span>
                <span>TOKYO</span>
              </div>
            </div>
          </div>
        );
      }

      if (styleId === "luxury-restaurant") {
        return (
          <div className="font-serif bg-[#FAF9F6] text-neutral-900 p-8 space-y-20 min-h-full">
            {/* Navbar */}
            <div className="flex justify-between items-center border-b border-[#800020]/15 pb-4">
              <span className="font-extrabold text-sm text-[#800020] uppercase tracking-wider">ROYAL CRUST RESTAURANT</span>
              <div className="hidden md:flex gap-6 text-xs font-sans font-bold uppercase tracking-wider text-neutral-600">
                <span>Menu</span>
                <span>Chef</span>
                <span>Gallery</span>
                <span>Reservation</span>
                <span>Contact</span>
              </div>
              <span className="text-xs uppercase font-bold text-[#800020]">Reserve Salon</span>
            </div>

            {/* Hero */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-4 text-left">
              <div className="h-72 border border-[#800020]/10 p-1.5 bg-white shadow-sm overflow-hidden font-sans text-left">
                <img src="/demo/restaurant-interior.png" alt="Plated Gourmet Dish" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-6 text-left">
                <span className="px-3 py-1 bg-[#800020]/10 text-[#800020] text-[9.5px] uppercase font-bold tracking-wider rounded-none">
                  CHEF'S SPECIAL RECIPE
                </span>
                <h2 className="text-3xl font-black text-neutral-900 leading-tight text-left">
                  {websiteContent.hero.headline || "Crafting Royal Culinary Heritage Natively"}
                </h2>
                <p className="font-sans text-xs text-neutral-600 leading-relaxed">
                  {websiteContent.hero.subheadline || "We showcase exquisite gourmet plates under customized soft ambient golden tones and signature quote components."}
                </p>
                <button className="px-6 py-2.5 bg-[#800020] text-white text-[10px] font-sans tracking-widest uppercase hover:bg-[#800020]/90 transition-all rounded-none mt-2">
                  {websiteContent.hero.ctaText || "RESERVE PRIVATE SALON"}
                </button>
              </div>
            </div>

            {/* Menu */}
            <div className="space-y-8 max-w-xl mx-auto">
              <h3 className="text-center text-xs tracking-wider text-[#800020] font-sans font-bold uppercase">THE ROYAL MENU</h3>
              <div className="space-y-4">
                {[
                  { name: "Smoked Salmon Mousse", price: "$42" },
                  { name: "Roasted Truffle Pheasant", price: "$85" }
                ].map((item, idx) => (
                  <div key={idx} className="border-b border-[#800020]/10 pb-3 flex justify-between items-center text-sm font-bold text-left">
                    <span className="text-left">{item.name}</span>
                    <span className="text-[#800020]">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Chef */}
            <div className="max-w-md mx-auto text-center space-y-3 bg-[#800020]/5 p-6 border-l-4 border-[#800020]">
              <h4 className="font-sans font-bold text-xs uppercase text-[#800020]">Michelin Curator</h4>
              <h3 className="text-xl font-normal text-neutral-900">Chef Pierre Al-Mubashir</h3>
              <p className="font-sans text-xs text-neutral-600 leading-relaxed">
                "Our royal culinary recipes are engineered to perfection using organic local ingredients, exquisite styling ratios, and classical plating architectures."
              </p>
            </div>

            {/* Gallery */}
            <div className="space-y-4 text-center">
              <h4 className="text-xs uppercase tracking-wider text-[#800020] font-sans font-bold">Royal Chambers</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((g) => (
                  <div key={g} className="h-28 border border-[#800020]/10 overflow-hidden relative">
                    <img src="/demo/restaurant-interior.png" alt="Fine Cuisine Room" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* Reservation */}
            <div className="bg-white border border-[#800020]/10 p-6 max-w-md mx-auto text-center space-y-4 text-left">
              <h3 className="font-sans font-bold text-xs uppercase text-[#800020] tracking-wider text-center">Book Royal Feast</h3>
              <input type="text" placeholder="NUMBER OF SEATS" className="w-full bg-[#FAF9F6] border-b border-[#800020]/20 p-2 text-center text-xs outline-none focus:border-[#800020] font-sans" />
              <button className="w-full bg-[#800020] text-white hover:bg-red-950 font-sans text-xs tracking-wider py-2 uppercase transition-all">
                INITIATE PRIVATE FEAST
              </button>
            </div>

            {/* Contact */}
            <div className="max-w-md mx-auto text-center space-y-1">
              <h4 className="text-xs uppercase font-bold text-neutral-500">Inquiry Port</h4>
              <p className="font-sans text-xs text-neutral-600">contact@royalcrust.com // +33 (1) 456-7890</p>
            </div>

            {/* Footer */}
            <div className="border-t border-[#800020]/15 pt-8 flex justify-between items-center text-[10px] tracking-wider text-[#800020] font-sans font-bold uppercase">
              <span>© 2026 ROYAL CRUST GROUP. ALL MAJESTY PRESERVED.</span>
              <div className="flex gap-4">
                <span>Crimson</span>
                <span>Paris</span>
              </div>
            </div>
          </div>
        );
      }

      if (styleId === "cafe-modern") {
        return (
          <div className="font-sans bg-[#F5F3E9] text-[#3C3633] p-8 space-y-16 min-h-full">
            {/* Navbar */}
            <div className="flex justify-between items-center border-b border-[#C9C5BA] pb-4">
              <span className="font-black text-sm text-[#5F6F65] uppercase">SAGE CAFE</span>
              <div className="hidden md:flex gap-4 text-xs font-bold text-[#826F66]">
                <span>Daily Roasts</span>
                <span>Roaster Story</span>
                <span>Snapshots</span>
                <span>Book Seat</span>
                <span>Inquire</span>
              </div>
              <span className="text-xs font-bold text-[#826F66]">7am - 8pm</span>
            </div>

            {/* Hero */}
            <div className="text-center space-y-4 max-w-xl mx-auto">
              <h2 className="text-3xl font-black text-[#5F6F65] text-center font-sans">
                {websiteContent.hero.headline || "Organic Coffee & Cozy Creative Workspaces"}
              </h2>
              <p className="text-xs text-[#826F66] leading-relaxed max-w-md mx-auto text-center font-sans">
                {websiteContent.hero.subheadline || "Cozy warm sage green details, organic rounded cards, and minimalist blackboard style drink layouts."}
              </p>
              <div className="h-60 rounded-2xl overflow-hidden shadow-md border-2 border-white bg-neutral-200 mt-4">
                <img src="/demo/restaurant-interior.png" alt="Cozy Cafe Interior" className="w-full h-full object-cover filter sepia-[15%]" />
              </div>
            </div>

            {/* Menu */}
            <div className="space-y-6 max-w-md mx-auto text-left">
              <h3 className="text-[#5F6F65] font-black text-sm uppercase text-center">Sage Coffee Roasts</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { n: "Cortado Sage Double", p: "$4.50" },
                  { n: "Cold Brew Vanilla Pod", p: "$5.00" }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white border border-[#C9C5BA]/40 rounded-xl p-4 shadow-xs flex justify-between items-center text-left">
                    <span className="font-bold text-xs text-[#3C3633] text-left">{item.n}</span>
                    <span className="text-[10px] font-bold text-[#5F6F65]">{item.p}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Chef */}
            <div className="max-w-md mx-auto text-center space-y-2 bg-[#5F6F65]/5 p-5 rounded-2xl border border-[#C9C5BA]/40">
              <span className="text-[9px] font-bold text-[#5F6F65] uppercase tracking-wider block">THE MASTER ROASTER</span>
              <h4 className="font-black text-sm text-[#3C3633]">Roaster Pierre Mubashir</h4>
              <p className="text-xs text-[#826F66] leading-relaxed">
                "We import organic heritage coffee beans directly, roasting them in-house using customized warm airflow models natively."
              </p>
            </div>

            {/* Gallery */}
            <div className="space-y-4 text-center">
              <h4 className="text-xs uppercase font-bold text-[#5F6F65]">Cozy Corners</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((g) => (
                  <div key={g} className="h-24 rounded-xl overflow-hidden relative">
                    <img src="/demo/restaurant-interior.png" alt="Cafe Grid" className="w-full h-full object-cover filter sepia-[10%]" />
                  </div>
                ))}
              </div>
            </div>

            {/* Reservation */}
            <div className="bg-white border border-[#C9C5BA]/40 rounded-2xl p-6 max-w-md mx-auto text-center space-y-4 text-left">
              <h4 className="text-[#5F6F65] font-bold text-xs uppercase text-center">Book A Cozy Desk</h4>
              <input type="text" placeholder="DESK WORK HOURS" className="w-full bg-[#FAF9F6] rounded-xl p-2.5 text-center text-xs outline-none" />
              <button className="w-full bg-[#5F6F65] hover:bg-[#826F66] text-white font-bold text-xs rounded-xl py-2.5 transition-colors font-sans">
                TRANSMIT BOOKING
              </button>
            </div>

            {/* Contact */}
            <div className="max-w-md mx-auto text-center space-y-1">
              <h4 className="text-xs font-bold text-[#826F66]">Location</h4>
              <p className="text-xs text-[#3C3633]">Sage Road, Cozy Town // cafe@sageseed.com</p>
            </div>

            {/* Footer */}
            <div className="border-t border-[#C9C5BA] pt-8 flex justify-between items-center text-[10px] font-bold text-[#826F66] uppercase">
              <span>© 2026 SAGE CAFE INC. ORGANIC ROASTS.</span>
              <div className="flex gap-4">
                <span>Sage</span>
                <span>Cozy</span>
              </div>
            </div>
          </div>
        );
      }

      // Default / Street Food theme
      return (
        <div className="font-sans bg-white text-black p-6 space-y-16 border-4 border-black min-h-full">
          {/* Navbar */}
          <div className="border-4 border-black bg-white p-4 flex justify-between items-center shadow-[3px_3px_0px_0px_#000]">
            <span className="font-extrabold text-sm uppercase bg-[#FF6B00] text-black px-2 py-0.5 border-2 border-black font-sans">
              NEON STREET FOOD
            </span>
            <div className="hidden md:flex gap-4 text-xs font-black uppercase">
              <span>Burgers</span>
              <span>Chef Pierre</span>
              <span>Grid</span>
              <span>Preorder</span>
              <span>Contact</span>
            </div>
            <span className="text-xs font-black">FAST // HOT // TASTY</span>
          </div>

          {/* Hero */}
          <div className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_#000] grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4 text-left">
              <h2 className="text-3xl font-extrabold uppercase leading-none text-left">
                {websiteContent.hero.headline || "VIBRANT STREET BURGERS PREPARED FRESH"}
              </h2>
              <p className="text-xs font-bold text-neutral-600 text-left">
                {websiteContent.hero.subheadline || "Intense orange contrast branding and neobrutalist menu cards with heavy offset shadows."}
              </p>
              <button className="px-5 py-2 border-4 border-black bg-[#FF6B00] text-black font-black uppercase text-xs shadow-[3px_3px_0px_0px_#000] hover:bg-orange-500 active:translate-y-0.5 active:shadow-none">
                {websiteContent.hero.ctaText || "ORDER NOW"}
              </button>
            </div>
            <div className="border-4 border-black h-48 overflow-hidden bg-neutral-100 font-sans text-left">
              <img src="/demo/restaurant-interior.png" alt="Street Food Burger" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Menu */}
          <div className="space-y-6 text-left">
            <h3 className="text-lg font-black uppercase bg-[#FF6B00] text-black px-3 py-0.5 border-2 border-black inline-block">HOT MENU //</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { name: "CRUNCHY DOUBLE CHEESE", p: "$12.00" },
                { name: "HOT JALAPENO FRIES", p: "$6.00" }
              ].map((item, idx) => (
                <div key={idx} className="border-4 border-black bg-white p-4 shadow-[4px_4px_0px_0px_#000] flex justify-between items-center font-black text-left">
                  <span className="uppercase text-xs text-left">{item.name}</span>
                  <span className="bg-[#FF6B00] text-black px-2 py-0.5 border-2 border-black">{item.p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Chef */}
          <div className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_#000] space-y-3 text-left">
            <h4 className="font-extrabold uppercase text-xs text-[#FF6B00]">Street Chef Master</h4>
            <h3 className="text-xl font-black uppercase text-left">CHEF PIERRE MUBASHIR</h3>
            <p className="text-xs font-bold leading-relaxed text-neutral-600 text-left">
              "We grill fresh beef patties natively on double cast iron pans. No static concept plates, just real spicy burgers shipped raw."
            </p>
          </div>

          {/* Gallery */}
          <div className="space-y-4 text-left">
            <h4 className="font-black uppercase text-sm">NEON GRID //</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((g) => (
                <div key={g} className="border-4 border-black h-24 overflow-hidden relative shadow-[2px_2px_0px_0px_#000]">
                  <img src="/demo/restaurant-interior.png" alt="Street Grid" className="w-full h-full object-cover filter saturate-150 contrast-125" />
                </div>
              ))}
            </div>
          </div>

          {/* Reservation */}
          <div className="border-4 border-black bg-[#FFFDF5] p-6 shadow-[6px_6px_0px_0px_#000] max-w-md mx-auto space-y-4 text-left">
            <h4 className="font-sans font-black uppercase text-xs bg-black text-[#FF6B00] py-1 text-center">FAST PREORDER //</h4>
            <input type="text" placeholder="ENTRY BURGER COUNT" className="w-full border-4 border-black p-2 text-xs font-black uppercase bg-white outline-none" />
            <button className="w-full border-4 border-black bg-[#FF6B00] text-black font-black uppercase text-xs shadow-[3px_3px_0px_0px_#000] active:translate-y-0.5 active:shadow-none transition-all py-2 font-mono">
              TRANSMIT ORDER
            </button>
          </div>

          {/* Contact */}
          <div className="max-w-md mx-auto text-center space-y-1 font-black text-xs">
            <span>STREET FOOD PORT // HOT LINE: +1-800-BURGER</span>
          </div>

          {/* Footer */}
          <div className="border-4 border-black bg-black text-white p-4 flex justify-between items-center text-[10px] font-bold uppercase font-mono">
            <span>© 2026 NEON FOOD INC. SPICY WORK.</span>
            <div className="flex gap-4">
              <span>Neon</span>
              <span>Fast</span>
            </div>
          </div>
        </div>
      );
    }

    // --- COACHING CLASS CATEGORY RENDERING ---
    // Sequence: Navbar → Hero → Courses → Faculty → Results → Batches → Testimonials → Contact → Footer
    if (categoryId === "coaching-class") {
      if (styleId === "modern-institute") {
        return (
          <div className="font-sans bg-[#F5F3FF] text-[#1E1B4B] p-8 space-y-20 min-h-full">
            {/* Navbar */}
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-indigo-50">
              <span className="font-extrabold text-sm text-[#4F46E5] uppercase tracking-wide">🎓 MODERN INSTITUTE</span>
              <div className="hidden md:flex gap-6 text-xs font-semibold text-indigo-950/70">
                <span>Home</span>
                <span>Courses</span>
                <span>Faculty</span>
                <span>Results</span>
                <span>Batches</span>
                <span>Contact</span>
              </div>
              <span className="text-xs font-semibold px-3 py-1 bg-[#4F46E5] text-white rounded-xl">ADMISSIONS OPEN</span>
            </div>

            {/* Hero */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left">
              <div className="md:col-span-7 space-y-6 text-left">
                <span className="px-3 py-1 bg-indigo-100 text-[#4F46E5] rounded-full text-[10px] font-bold tracking-wider uppercase">
                  Rank #1 Coaching Institute
                </span>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#1E1B4B] leading-none text-left font-sans">
                  {websiteContent.hero.headline || "Unlocking Academic Excellence Together"}
                </h1>
                <p className="text-xs text-indigo-950/60 leading-relaxed">
                  {websiteContent.hero.subheadline || "Prepare for top board exams and elite competitive tests with modern curriculum and smart trackers."}
                </p>
                <button className="rounded-xl bg-[#4F46E5] text-white hover:bg-indigo-700 transition-all font-bold text-xs px-6 py-2.5 shadow-sm">
                  {websiteContent.hero.ctaText || "Explore Batches Now"}
                </button>
              </div>
              <div className="md:col-span-5 bg-white border border-indigo-100 p-2 rounded-2xl shadow-md">
                <div className="h-64 rounded-xl overflow-hidden bg-slate-100">
                  <img src="/demo/coaching_hero_demo.png" alt="Coaching Classes Academic Study" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* Courses */}
            <div className="space-y-6 text-left">
              <h2 className="text-2xl font-extrabold text-[#1E1B4B]">Our Premium Courses</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { title: "Advanced Mathematics", desc: "Grade 10-12 calculus, algebra, and coordinate geometry classes.", badge: "IIT Prep" },
                  { title: "Physics Mastery", desc: "Conceptual exploration of quantum dynamics and thermodynamics.", badge: "NEET Special" },
                  { title: "Chemistry Deep-Dive", desc: "Organic synthesis mechanisms and inorganic chemical charts.", badge: "Board Prep" }
                ].map((prog, i) => (
                  <div key={i} className="bg-white border border-indigo-50 rounded-2xl p-5 shadow-xs space-y-3">
                    <span className="text-[9px] font-bold text-[#4F46E5] bg-indigo-50 px-2 py-0.5 rounded-md uppercase">{prog.badge}</span>
                    <h3 className="font-extrabold text-sm text-[#1E1B4B]">{prog.title}</h3>
                    <p className="text-xs text-indigo-950/50 leading-relaxed">{prog.desc}</p>
                    <span className="text-[10px] font-bold text-[#4F46E5] block font-sans">View Details →</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Faculty */}
            <div className="space-y-6 text-left">
              <h2 className="text-2xl font-extrabold text-[#1E1B4B]">Elite Faculty</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { name: "Dr. Alok Verma", role: "Ph.D. in Physics, Ex-Professor", bio: "15+ years experience mentoring Olympiad scholars." },
                  { name: "Prof. Priya Mehta", role: "Senior Chemist, Author", bio: "Author of advanced chemistry books for competitive exams." }
                ].map((c, i) => (
                  <div key={i} className="bg-white border border-indigo-50 rounded-2xl p-4 flex gap-4 items-center text-left">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full shrink-0 flex items-center justify-center font-bold text-[#4F46E5]">
                      AV
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#1E1B4B] text-left">{c.name}</h4>
                      <span className="text-[10px] text-[#4F46E5] font-bold block text-left">{c.role}</span>
                      <p className="text-[11px] text-indigo-950/50 text-left">{c.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6 text-left">
              <h2 className="text-2xl font-extrabold text-[#1E1B4B]">Our Outstanding Results</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                {[
                  { rank: "AIR 3", exam: "JEE Advanced", student: "Rahul K." },
                  { rank: "99.8%", exam: "CBSE Boards", student: "Anya S." },
                  { rank: "AIR 12", exam: "NEET Medical", student: "Sumit J." },
                  { rank: "AIR 45", exam: "KVPY Scholars", student: "Rohan M." }
                ].map((res, i) => (
                  <div key={i} className="bg-white border border-indigo-50 rounded-2xl p-5 shadow-xs space-y-1">
                    <span className="text-lg font-extrabold text-[#4F46E5] block">{res.rank}</span>
                    <span className="text-xs font-bold text-[#1E1B4B] block">{res.exam}</span>
                    <p className="text-[10px] text-indigo-950/40">{res.student}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Batches */}
            <div className="space-y-6 text-left">
              <h2 className="text-2xl font-extrabold text-[#1E1B4B]">Batch Timings</h2>
              <div className="bg-white border border-indigo-50 rounded-2xl overflow-hidden shadow-xs">
                {[
                  { batch: "JEE Crash Course", timing: "08:00 AM - 12:00 PM", days: "Mon - Fri", mode: "Hybrid" },
                  { batch: "Foundation Batch (Class 10)", timing: "04:00 PM - 07:00 PM", days: "Mon, Wed, Fri", mode: "Offline" },
                  { batch: "NEET Pro Tracker", timing: "02:00 PM - 06:00 PM", days: "Tue, Thu, Sat", mode: "Online" }
                ].map((b, i) => (
                  <div key={i} className="border-b border-indigo-50 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-left">
                    <div>
                      <span className="text-xs font-bold text-[#1E1B4B] block text-left">{b.batch}</span>
                      <p className="text-[10px] text-indigo-950/40 text-left">{b.days} | {b.mode}</p>
                    </div>
                    <span className="text-xs font-mono font-bold bg-indigo-50 px-3 py-1 rounded text-[#4F46E5]">{b.timing}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div className="bg-white border border-indigo-50 rounded-2xl p-6 text-center max-w-xl mx-auto space-y-3 shadow-xs">
              <div className="flex justify-center gap-1 text-amber-400">
                <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
              </div>
              <p className="text-sm italic text-indigo-950/70">
                "The customized batches and regular test series helped me secure a top rank in boards. Truly the best institute!"
              </p>
              <span className="block font-bold text-xs text-[#4F46E5]">— Anya S., CBSE Board Topper</span>
            </div>

            {/* Contact */}
            <div className="bg-white border border-indigo-50 rounded-2xl p-8 max-w-xl mx-auto space-y-6 text-left shadow-xs">
              <h3 className="font-extrabold text-xl text-center text-[#1E1B4B]">Request Admission Callback</h3>
              <div className="space-y-3 flex flex-col">
                <input type="text" placeholder="STUDENT NAME" className="border border-indigo-100 p-2.5 text-xs rounded-xl bg-indigo-50/50 outline-none focus:border-[#4F46E5]" />
                <input type="email" placeholder="GUARDIAN EMAIL" className="border border-indigo-100 p-2.5 text-xs rounded-xl bg-indigo-50/50 outline-none focus:border-[#4F46E5]" />
                <button className="w-full bg-[#4F46E5] hover:bg-indigo-700 py-3 text-white font-bold text-xs rounded-xl transition-all">
                  SUBMIT INQUIRY
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-indigo-100 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs font-bold text-indigo-950/40 gap-4 uppercase">
              <span>© 2026 MODERN INSTITUTE CO. ALL RIGHTS RESERVED.</span>
              <div className="flex gap-4">
                <span>Facebook</span>
                <span>Twitter</span>
                <span>WhatsApp</span>
              </div>
            </div>
          </div>
        );
      }

      if (styleId === "academic-pro") {
        return (
          <div className="font-serif bg-white text-neutral-900 p-8 space-y-20 min-h-full border border-neutral-100">
            {/* Navbar */}
            <div className="flex justify-between items-center border-b border-neutral-200 pb-4">
              <span className="font-bold text-sm tracking-wide">📖 ACADEMIC PRO SPECIALIST</span>
              <div className="hidden md:flex gap-6 text-xs font-sans font-medium text-neutral-500">
                <span>Classes</span>
                <span>Lecturers</span>
                <span>Result Statistics</span>
                <span>Inquiry</span>
              </div>
              <span className="text-[10px] font-sans font-semibold border border-neutral-800 px-3 py-1">ADMISSIONS 2026</span>
            </div>

            {/* Hero */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left">
              <div className="md:col-span-7 space-y-6 text-left">
                <span className="text-xs font-sans text-neutral-400 block tracking-widest uppercase">
                  Elite Class Preparation
                </span>
                <h1 className="text-4xl md:text-5xl font-normal leading-tight text-neutral-900 text-left font-serif">
                  {websiteContent.hero.headline || "Rigorous Scientific Training & Pure Academic Rigor"}
                </h1>
                <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                  {websiteContent.hero.subheadline || "A traditional, stark classic design built around clean borders, serif headings, and structured result reports."}
                </p>
                <button className="px-6 py-2.5 font-sans bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wide">
                  {websiteContent.hero.ctaText || "Inquire for Admission"}
                </button>
              </div>
              <div className="md:col-span-5 border border-neutral-200 p-1 bg-white">
                <div className="h-64 bg-neutral-50">
                  <img src="/demo/coaching_hero_demo.png" alt="Academic Coaching Class Study" className="w-full h-full object-cover grayscale" />
                </div>
              </div>
            </div>

            {/* Courses */}
            <div className="space-y-6 text-left font-sans">
              <h2 className="text-2xl font-serif font-bold text-neutral-900">Offered Academics</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { title: "Analytical Physics", desc: "Rigorous scientific modules for JEE/Medical exam preparation." },
                  { title: "Organic & Physical Chem", desc: "Structured molecular thermodynamics and inorganic models." },
                  { title: "Pure Mathematics", desc: "Deep algebra, advanced calculus, and vector analysis." }
                ].map((prog, i) => (
                  <div key={i} className="border border-neutral-200 p-5 space-y-3">
                    <h3 className="font-serif font-bold text-sm text-neutral-900">{prog.title}</h3>
                    <p className="text-xs text-neutral-500 leading-relaxed">{prog.desc}</p>
                    <span className="text-[10px] font-bold text-neutral-900 underline block">Request Syllabus →</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Faculty */}
            <div className="space-y-6 text-left">
              <h2 className="text-2xl font-serif font-bold text-neutral-900">Senior Lecturers</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-sans">
                {[
                  { name: "Dr. Alok Verma", role: "Ph.D. in Mathematical Physics", bio: "15+ years experience training Olympic finalists." },
                  { name: "Prof. Priya Mehta", role: "Author, Senior Chemical Analyst", bio: "Expert writer on organic synthesis charts." }
                ].map((c, i) => (
                  <div key={i} className="border border-neutral-200 p-5 flex gap-4 items-start text-left">
                    <div className="w-10 h-10 border border-neutral-800 bg-neutral-900 text-white flex items-center justify-center font-bold">
                      T{i}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-neutral-950">{c.name}</h4>
                      <span className="text-[10px] text-neutral-400 font-mono block">{c.role}</span>
                      <p className="text-[11px] text-neutral-600 mt-2">{c.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6 text-left font-sans">
              <h2 className="text-2xl font-serif font-bold text-neutral-900">Academic Honors</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
                {[
                  { rank: "AIR 3", exam: "JEE Advanced 2025" },
                  { rank: "99.8%", exam: "CBSE Boards 2025" },
                  { rank: "AIR 12", exam: "NEET Medical 2025" },
                  { rank: "AIR 45", exam: "KVPY Scholar List" }
                ].map((res, i) => (
                  <div key={i} className="border-l-2 border-neutral-900 pl-4 space-y-1">
                    <span className="text-lg font-serif font-bold text-neutral-950 block">{res.rank}</span>
                    <span className="text-xs text-neutral-500 block">{res.exam}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Batches */}
            <div className="space-y-6 text-left font-sans">
              <h2 className="text-2xl font-serif font-bold text-neutral-900">Batch Catalog</h2>
              <div className="border border-neutral-200 divide-y divide-neutral-200">
                {[
                  { batch: "JEE Advanced Focus", days: "Monday - Friday", timing: "08:00 AM - 12:00 PM" },
                  { batch: "NEET Mastery Batch", days: "Tuesday, Thursday, Saturday", timing: "02:00 PM - 06:00 PM" }
                ].map((b, i) => (
                  <div key={i} className="p-4 flex justify-between items-center text-xs">
                    <div>
                      <span className="font-bold text-neutral-900 block">{b.batch}</span>
                      <p className="text-[10px] text-neutral-400">{b.days}</p>
                    </div>
                    <span className="font-mono text-neutral-650 bg-neutral-50 px-3 py-1 border border-neutral-100">{b.timing}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="border border-neutral-200 p-8 max-w-xl mx-auto space-y-6 text-left font-sans">
              <h3 className="font-serif font-bold text-xl text-center text-neutral-900">Submit Admission Request</h3>
              <div className="space-y-3 flex flex-col">
                <input type="text" placeholder="FULL NAME" className="border border-neutral-300 p-2.5 text-xs rounded-none bg-white outline-none focus:border-neutral-900" />
                <input type="email" placeholder="EMAIL ADDRESS" className="border border-neutral-300 p-2.5 text-xs rounded-none bg-white outline-none focus:border-neutral-900" />
                <button className="w-full bg-neutral-900 hover:bg-neutral-800 py-3 text-white font-bold text-xs uppercase tracking-wider">
                  SUBMIT APPLICATION
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-neutral-200 pt-8 flex justify-between items-center text-[10px] text-neutral-400 font-sans uppercase">
              <span>© 2026 ACADEMIC PRO CO. STARK ACADEMICS.</span>
              <div className="flex gap-4">
                <span>TERMS</span>
                <span>PRIVACY</span>
              </div>
            </div>
          </div>
        );
      }

      // Default / Competitive Exams theme
      return (
        <div className="font-mono bg-[#FFFDF6] text-black p-6 space-y-20 border-4 border-black min-h-full">
          {/* Navbar */}
          <div className="border-4 border-black bg-white p-4 flex justify-between items-center shadow-[3px_3px_0px_0px_#000]">
            <span className="font-sans font-black uppercase text-sm bg-[#FFD93D] text-black px-2 py-0.5 border-2 border-black">
              🏆 EXAM CRACK LAB
            </span>
            <div className="hidden md:flex gap-4 text-xs font-black uppercase">
              <span>Courses</span>
              <span>Faculty</span>
              <span>Ranks</span>
              <span>Timings</span>
            </div>
            <span className="text-xs font-black uppercase bg-[#FF6B6B] text-white px-2 py-0.5 border-2 border-black">LIVE</span>
          </div>

          {/* Hero */}
          <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_#000] grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4 text-left">
              <span className="px-2.5 py-0.5 bg-black text-white text-[8px] font-black uppercase tracking-widest">
                CRACK THE EXAM
              </span>
              <h2 className="font-sans font-black uppercase text-3xl sm:text-4xl md:text-5xl leading-none text-left">
                {websiteContent.hero.headline || "Crushing Boards & Competitive Exams"}
              </h2>
              <p className="text-xs font-bold text-neutral-700 leading-relaxed">
                {websiteContent.hero.subheadline || "Bold neobrutalist coaching class styles featuring raw offset blocks, high-contrast yellow borders, and loud statistics charts."}
              </p>
              <button className="px-5 py-2 border-4 border-black bg-[#FFD93D] text-black font-black uppercase text-xs shadow-[3px_3px_0px_0px_#000] hover:bg-yellow-400 active:translate-y-0.5 active:shadow-none">
                {websiteContent.hero.ctaText || "SECURE BATCH SLOT"}
              </button>
            </div>
            <div className="border-4 border-black h-48 overflow-hidden bg-neutral-100 shadow-[4px_4px_0px_0px_#000]">
              <img src="/demo/coaching_hero_demo.png" alt="High-contrast Brutalist Exam Study" className="w-full h-full object-cover filter contrast-125 saturate-150" />
            </div>
          </div>

          {/* Courses */}
          <div className="space-y-6 text-left">
            <h2 className="text-xl font-sans font-black uppercase bg-black text-white px-3 py-1 inline-block">BOARD DRILLS //</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { t: "JEE ADVANCED BOOTCAMP", d: "High energy calculus and dynamics physics." },
                { t: "NEET CRACKERS CORE", d: "Organic chemistry synthesis and animal biology labs." },
                { t: "FOUNDATION GRADE 10", d: "Agility classes covering all school board modules." }
              ].map((prog, i) => (
                <div key={i} className="border-4 border-black bg-white p-4 shadow-[4px_4px_0px_0px_#000] space-y-2">
                  <h3 className="font-sans font-black uppercase text-xs bg-[#FF6B6B] text-white px-2 py-0.5 inline-block">{prog.t}</h3>
                  <p className="text-[10px] font-bold text-neutral-600">{prog.d}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Faculty */}
          <div className="space-y-6 text-left">
            <h2 className="text-xl font-sans font-black uppercase bg-[#FFD93D] text-black px-3 py-1 inline-block">EXPERTS LAB //</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: "Dr. Alok Verma", spec: "PHY / MATH OLYMPIAD" },
                { name: "Prof. Priya Mehta", spec: "ORGANIC LAB MASTER" }
              ].map((c, i) => (
                <div key={i} className="border-4 border-black bg-white p-4 shadow-[4px_4px_0px_0px_#000] flex gap-4 items-center text-left">
                  <div className="w-10 h-10 border-2 border-black bg-black text-[#FFD93D] font-black flex items-center justify-center">
                    FC
                  </div>
                  <div>
                    <h4 className="font-black text-xs uppercase text-left">{c.name}</h4>
                    <span className="text-[8px] font-bold text-[#FF6B6B] uppercase tracking-wider text-left block">{c.spec}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ranks */}
          <div className="space-y-6 text-left">
            <h2 className="text-xl font-sans font-black uppercase bg-black text-white px-3 py-1 inline-block">HISTORIC AIR RANKS //</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              {[
                { rank: "AIR 3", exam: "JEE" },
                { rank: "99.8%", exam: "BOARDS" },
                { rank: "AIR 12", exam: "NEET" },
                { rank: "AIR 45", exam: "KVPY" }
              ].map((res, i) => (
                <div key={i} className="border-4 border-black bg-white p-4 shadow-[3px_3px_0px_0px_#000] space-y-1">
                  <span className="text-lg font-black bg-[#FF6B6B] text-white px-2 py-0.5 block">{res.rank}</span>
                  <span className="text-[10px] font-black block">{res.exam}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="border-4 border-black bg-[#FFFDF5] p-6 shadow-[6px_6px_0px_0px_#000] max-w-md mx-auto space-y-4 text-left">
            <h3 className="font-sans font-black text-center text-sm uppercase bg-black text-[#FFD93D] py-1">TRANSMIT INQUIRY //</h3>
            <input type="text" placeholder="STUDENT_NAME" className="w-full border-4 border-black p-2 text-xs font-black uppercase bg-white outline-none" />
            <button className="w-full border-4 border-black bg-[#FF6B6B] text-white font-black uppercase text-xs shadow-[3px_3px_0px_0px_#000] active:translate-y-0.5 active:shadow-none transition-all py-2 font-mono">
              TRANSMIT REQUEST
            </button>
          </div>

          {/* Footer */}
          <div className="border-t-4 border-black pt-6 flex flex-col sm:flex-row justify-between items-center text-[10px] font-black gap-4 uppercase">
            <span>© 2026 EXAM CRACK LAB INC. SHIPPED RAW.</span>
            <div className="flex gap-4">
              <span>GITHUB</span>
              <span>TELEGRAM</span>
            </div>
          </div>
        </div>
      );
    }

    // --- COLLEGE WEBSITE CATEGORY RENDERING ---
    // Sequence: Navbar → Hero → Departments → Courses → Faculty → Admissions → Campus Life → Footer
    if (categoryId === "college") {
      if (styleId === "university-modern") {
        return (
          <div className="font-sans bg-[#F8FAFC] text-[#0F172A] p-8 space-y-20 min-h-full">
            {/* Navbar */}
            <div className="flex justify-between items-center bg-[#0F172A] text-white p-4 rounded-xl shadow-md">
              <span className="font-black text-sm uppercase tracking-wide">🏫 UNIVERSITY SYSTEM</span>
              <div className="hidden md:flex gap-4 text-xs font-bold uppercase tracking-wider text-slate-200">
                <span>Home</span>
                <span>Departments</span>
                <span>Degrees</span>
                <span>Faculty</span>
                <span>Admissions</span>
                <span>Campus Life</span>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 bg-amber-500 text-slate-900 rounded">APPLY ONLINE</span>
            </div>

            {/* Hero */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left">
              <div className="md:col-span-7 space-y-6 text-left">
                <span className="px-3 py-1 bg-amber-100 text-[#0F172A] rounded-full text-xs font-bold uppercase">
                  Accredited Tier 1 University
                </span>
                <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-[#0F172A] leading-none text-left font-sans">
                  {websiteContent.hero.headline || "Shaping Future Leaders and Innovators"}
                </h1>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {websiteContent.hero.subheadline || "Explore state-of-the-art degree programs, research modules, and vibrant campus life with modern scholastic tools."}
                </p>
                <button className="rounded-lg bg-[#0F172A] text-white hover:bg-slate-800 transition-all font-bold text-xs px-6 py-2.5">
                  {websiteContent.hero.ctaText || "Explore Academic Catalogs"}
                </button>
              </div>
              <div className="md:col-span-5 bg-white border border-slate-200 p-2 rounded-xl shadow-lg">
                <div className="h-64 rounded-lg overflow-hidden bg-slate-200">
                  <img src="/demo/college_hero_demo.png" alt="University Campus Courtyard" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* Departments */}
            <div className="space-y-6 text-left">
              <h2 className="text-2xl font-black text-[#0F172A]">Academic Departments</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { name: "Engineering & Tech", code: "Dept. of Computer Sciences and AI systems." },
                  { name: "Business School", code: "Dept. of MBA, Fintech, and Entrepreneurship." },
                  { name: "Liberal Arts & Sci", code: "Dept. of Applied Chemistry and Social Theories." }
                ].map((dept, i) => (
                  <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
                    <span className="text-[9px] font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded uppercase">COURSES OPEN</span>
                    <h3 className="font-extrabold text-sm text-[#0F172A]">{dept.name}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{dept.code}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Degree Programs */}
            <div className="space-y-6 text-left">
              <h2 className="text-2xl font-black text-[#0F172A]">Degree Programs</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { title: "B.Tech in Artificial Intelligence", desc: "4-Year research degree covering neural networks and data pipelines." },
                  { title: "Fintech MBA Pro", desc: "2-Year executive business program modeling modern banking mechanics." },
                  { title: "B.Sc in Quantum Physics", desc: "3-Year core laboratory research program on quantum dynamics." }
                ].map((prog, i) => (
                  <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-2">
                    <h3 className="font-extrabold text-sm text-[#0F172A]">{prog.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{prog.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Faculty */}
            <div className="space-y-6 text-left">
              <h2 className="text-2xl font-black text-[#0F172A]">Academic Faculty</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { name: "Dr. Alok Verma", role: "Head of AI Research Department" },
                  { name: "Prof. Priya Mehta", role: "Dean of Business & Marketing" }
                ].map((c, i) => (
                  <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 flex gap-4 items-center text-left">
                    <div className="w-12 h-12 bg-slate-100 rounded-full shrink-0 flex items-center justify-center font-bold text-[#0F172A]">
                      FC
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#0F172A] text-left">{c.name}</h4>
                      <span className="text-[10px] text-amber-500 font-bold block text-left">{c.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Admissions */}
            <div className="space-y-6 text-left">
              <h2 className="text-2xl font-black text-[#0F172A]">Admissions Flow</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left font-sans">
                {[
                  { step: "01. Apply Online", d: "Submit degree specifications, scores, and essays on our secure portal." },
                  { step: "02. Interview Panel", d: "Brief virtual discussion with department curators." },
                  { step: "03. Admission & Grant", d: "Verify financial details, secure college grant, and confirm slot." }
                ].map((a, i) => (
                  <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-2">
                    <span className="text-xs font-mono font-bold text-amber-500 block">{a.step}</span>
                    <p className="text-xs text-slate-500 leading-relaxed">{a.d}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Campus Life */}
            <div className="space-y-6 text-left">
              <h2 className="text-2xl font-black text-[#0F172A]">Campus Life</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-sans text-left">
                {[1, 2, 3, 4].map((g) => (
                  <div key={g} className="h-32 bg-slate-200 border border-slate-200 rounded-lg overflow-hidden relative">
                    <img src="/demo/college_hero_demo.png" alt="Gallery College Life" className="w-full h-full object-cover filter brightness-95" />
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-200 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs font-bold text-slate-400 gap-4 uppercase font-sans">
              <span>© 2026 UNIVERSITY SYSTEM ACADEMICS. ALL RIGHTS RESERVED.</span>
              <div className="flex gap-4">
                <span>FACBOOK</span>
                <span>LINKEDIN</span>
                <span>INSTAGRAM</span>
              </div>
            </div>
          </div>
        );
      }

      if (styleId === "campus-premium") {
        return (
          <div className="font-serif bg-[#FAF9F6] text-[#7F1D1D] p-8 space-y-20 min-h-full">
            {/* Navbar */}
            <div className="flex justify-between items-center border-b border-[#7F1D1D]/20 pb-4">
              <span className="font-black text-sm uppercase tracking-widest text-[#7F1D1D]">🏛️ PRESTIGE UNIVERSITY</span>
              <div className="hidden md:flex gap-6 text-xs font-sans font-bold uppercase tracking-wider text-neutral-600">
                <span>Degrees</span>
                <span>Campus</span>
                <span>Admissions</span>
                <span>Dean</span>
              </div>
              <span className="text-[10px] font-sans font-bold uppercase tracking-widest bg-[#7F1D1D] text-white px-3 py-1 rounded">APPLY</span>
            </div>

            {/* Hero */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left">
              <div className="md:col-span-7 space-y-6 text-left">
                <span className="px-3 py-0.5 border border-[#7F1D1D]/20 text-[#7F1D1D] rounded-full text-[10px] font-sans font-bold uppercase tracking-widest">
                  Est. 1912 // Prestige Academy
                </span>
                <h1 className="text-4xl md:text-5xl font-black leading-tight text-[#7F1D1D] text-left font-serif">
                  {websiteContent.hero.headline || "A Tradition of Scholarly Excellence"}
                </h1>
                <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                  {websiteContent.hero.subheadline || "A luxury traditional university layout boasting premium deep crimson styling, delicate golden borders, and serif headers."}
                </p>
                <button className="px-6 py-2.5 font-sans bg-[#7F1D1D] text-white hover:bg-red-950 transition-all font-bold text-xs uppercase tracking-widest">
                  {websiteContent.hero.ctaText || "Inquire for Admission"}
                </button>
              </div>
              <div className="md:col-span-5 border border-[#7F1D1D]/10 p-2 bg-white">
                <div className="h-64 bg-neutral-100 overflow-hidden">
                  <img src="/demo/college_hero_demo.png" alt="Prestige University Building" className="w-full h-full object-cover filter sepia-[20%]" />
                </div>
              </div>
            </div>

            {/* Departments */}
            <div className="space-y-6 text-left">
              <h2 className="text-2xl font-serif font-black text-[#7F1D1D] text-left">Academic Faculties</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-sans">
                {[
                  { name: "Engineering & Applied Sciences", code: "Core labs covering AI, networking, and analytics." },
                  { name: "Fintech Business School", code: "MBA classes modeling modern markets and banking." },
                  { name: "Liberal Arts & Social Sciences", code: "Traditional sociology, literature, and core sciences." }
                ].map((dept, i) => (
                  <div key={i} className="bg-white border border-[#7F1D1D]/10 rounded p-5 space-y-3">
                    <h3 className="font-serif font-bold text-sm text-[#7F1D1D]">{dept.name}</h3>
                    <p className="text-xs text-neutral-500 leading-relaxed">{dept.code}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Admissions */}
            <div className="space-y-6 text-left font-sans">
              <h2 className="text-2xl font-serif font-black text-[#7F1D1D] text-left">Prestige Admissions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { step: "01. Candidate Portfolio", d: "Upload degree applications, transcripts, and essays on our secure portal." },
                  { step: "02. Dean Panel Interview", d: "Private academic discussion with department curators." },
                  { step: "03. Admission Board Review", d: "Confirm financial details, secure college grant, and confirm slot." }
                ].map((a, i) => (
                  <div key={i} className="bg-white border border-[#7F1D1D]/10 p-5 space-y-2">
                    <span className="text-xs font-mono font-bold text-[#7F1D1D] block">{a.step}</span>
                    <p className="text-xs text-neutral-500 leading-relaxed">{a.d}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Campus Life */}
            <div className="space-y-6 text-left font-sans">
              <h2 className="text-2xl font-serif font-black text-[#7F1D1D] text-left">Campus Tradition</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((g) => (
                  <div key={g} className="h-32 border border-[#7F1D1D]/10 overflow-hidden relative">
                    <img src="/demo/college_hero_demo.png" alt="Prestige Campus Life Gallery" className="w-full h-full object-cover filter sepia-[30%] saturate-[70%]" />
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-[#7F1D1D]/20 pt-8 flex justify-between items-center text-[10px] text-neutral-400 font-sans uppercase tracking-widest">
              <span>© 2026 PRESTIGE UNIVERSITY CO. ALL HEURISTICS STABLE.</span>
              <div className="flex gap-4">
                <span>TERMS</span>
                <span>DEAN</span>
              </div>
            </div>
          </div>
        );
      }

      // Default / Academic Classic theme
      return (
        <div className="font-serif bg-[#FAF8F5] text-[#064E3B] p-8 space-y-16 min-h-full">
          {/* Navbar */}
          <div className="flex justify-between items-center border-b border-[#064E3B]/20 pb-4">
            <span className="font-bold text-sm uppercase tracking-wider text-[#064E3B]">🍃 IVY LEAGUE CLASSIC</span>
            <div className="hidden md:flex gap-4 text-xs font-sans font-bold uppercase text-neutral-500">
              <span>Faculties</span>
              <span>Degrees</span>
              <span>Life</span>
              <span>Admissions</span>
            </div>
            <span className="text-xs font-sans text-neutral-400 font-mono">Status: Enrolling</span>
          </div>

          {/* Hero */}
          <div className="text-center max-w-2xl mx-auto space-y-6">
            <span className="px-3 py-1 bg-[#064E3B]/5 border border-[#064E3B]/10 text-[#064E3B] rounded-full text-xs font-sans font-medium uppercase tracking-widest">
              Standard Ivy Education
            </span>
            <h2 className="text-3xl md:text-5xl font-bold uppercase text-[#064E3B] leading-tight text-center font-serif">
              {websiteContent.hero.headline || "Classical Academic Traditions"}
            </h2>
            <p className="text-xs text-neutral-700 max-w-md mx-auto leading-relaxed text-center font-sans">
              {websiteContent.hero.subheadline || "A beautiful dark green ivy-league layout presenting sand canvas backgrounds, traditional typography, and campus galleries."}
            </p>
            <button className="px-6 py-2.5 bg-[#064E3B] text-white hover:bg-emerald-900 font-bold text-xs uppercase tracking-wider">
              {websiteContent.hero.ctaText || "Apply Online"}
            </button>
            <div className="h-60 rounded-lg border border-[#064E3B]/10 p-2 bg-white shadow-md overflow-hidden mt-6">
              <img src="/demo/college_hero_demo.png" alt="Ivy League College Courtyard" className="w-full h-full object-cover filter saturate-[60%]" />
            </div>
          </div>

          {/* Departments */}
          <div className="space-y-6 text-left font-sans">
            <h3 className="text-xs uppercase tracking-widest text-[#064E3B] font-mono text-left">// DEPARTMENTS CATALOG</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
              {[
                { t: "Dept. of Applied Technology", d: "Covering software systems, databases, and AI algorithms." },
                { t: "Dept. of Banking & Markets", d: "Covering MBA, fintech analysis, and corporate finance." },
                { t: "Dept. of Physical Sciences", d: "Covering experimental laboratory setups in chemistry." }
              ].map((prog, i) => (
                <div key={i} className="border border-[#064E3B]/10 bg-white p-5 rounded-md space-y-2 text-left">
                  <h4 className="font-serif font-bold text-[#064E3B] text-sm text-left">{prog.t}</h4>
                  <p className="text-[11px] text-neutral-600 leading-relaxed text-left">{prog.d}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Admissions */}
          <div className="space-y-6 text-left font-sans">
            <h3 className="text-xs uppercase tracking-widest text-[#064E3B] font-mono text-left">// ADMISSION FLOWCHART</h3>
            <div className="border border-[#064E3B]/10 bg-white rounded divide-y divide-[#064E3B]/10 text-left">
              {[
                { game: "STEP 1: SUBMIT DIGITAL APPLICATION", date: "Online Portal" },
                { game: "STEP 2: CORRESPOND WITH DEAN PANEL", date: "Interview Room" },
                { game: "STEP 3: DEPLOY ENROLLMENT BATCH", date: "Admissions Office" }
              ].map((m, i) => (
                <div key={i} className="p-4 flex justify-between items-center text-xs text-left">
                  <span className="font-bold text-[#064E3B] text-left">{m.game}</span>
                  <span className="font-mono text-[#064E3B]">{m.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery */}
          <div className="space-y-6 text-left font-sans">
            <h3 className="text-xs uppercase tracking-widest text-[#064E3B] font-mono text-left">// CAMPUS GALLERY</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((g) => (
                <div key={g} className="h-24 bg-white border border-[#064E3B]/10 rounded overflow-hidden relative">
                  <img src="/demo/college_hero_demo.png" alt="Ivy League College Campus Life" className="w-full h-full object-cover filter saturate-[50%]" />
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-[#064E3B]/10 pt-8 flex justify-between items-center text-[10px] text-neutral-400 font-mono">
            <span>© 2026 IVY SYSTEM. ALL HEURISTICS STABLE.</span>
            <div className="flex gap-4">
              <span>/legal</span>
              <span>/apply</span>
            </div>
          </div>
        </div>
      );
    }

    // --- GYM WEBSITE CATEGORY RENDERING ---
    // Sequence: Navbar → Hero → Membership Plans → Trainers → Programs → Transformations → Contact → Footer
    if (categoryId === "gym") {
      if (styleId === "fitness-pro") {
        return (
          <div className="font-sans bg-white text-[#111827] p-8 space-y-20 min-h-full">
            {/* Navbar */}
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <span className="font-extrabold text-sm text-[#10B981] uppercase tracking-wide font-sans">🏋️ FITNESS PRO LAB</span>
              <div className="hidden md:flex gap-6 text-xs font-semibold text-neutral-500">
                <span>Plans</span>
                <span>Trainers</span>
                <span>Workouts</span>
                <span>Transformations</span>
                <span>Contact</span>
              </div>
              <span className="text-xs font-semibold px-3 py-1 bg-neutral-900 text-white rounded-lg">JOIN CLUB</span>
            </div>

            {/* Hero */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left">
              <div className="md:col-span-7 space-y-6 text-left">
                <span className="px-3 py-1 bg-emerald-100 text-[#10B981] rounded-full text-[10px] font-bold tracking-wider uppercase">
                  Modern Athletic & Cardio Gym
                </span>
                <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-neutral-900 leading-none text-left font-sans">
                  {websiteContent.hero.headline || "Build Your Ultimate Strength & Fitness"}
                </h1>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {websiteContent.hero.subheadline || "Elevate your training programs with our certified elite coaches, state-of-the-art weights, and progress systems."}
                </p>
                <button className="rounded-lg bg-neutral-900 text-white hover:bg-[#10B981] hover:text-black transition-all font-bold text-xs px-6 py-2.5">
                  {websiteContent.hero.ctaText || "Select Membership"}
                </button>
              </div>
              <div className="md:col-span-5 bg-white border border-slate-200 p-2 rounded-xl shadow-md">
                <div className="h-64 rounded-lg overflow-hidden bg-slate-100">
                  <img src="/demo/gym_hero_demo.png" alt="Gym Workout Fitness Studio" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* Membership Plans */}
            <div className="space-y-6 text-left">
              <h2 className="text-2xl font-extrabold text-neutral-900">Membership Plans</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { name: "Starter Core", price: "$29/mo", d: "Standard weights, lockers, and cardio machine access." },
                  { name: "Athletic Premium", price: "$59/mo", d: "All classes access, dedicated sauna, and weekly trackers." },
                  { name: "Elite Bodybuilder", price: "$99/mo", d: "1-on-1 certified trainer support and dynamic meal planners." }
                ].map((plan, i) => (
                  <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
                    <span className="text-[10px] font-bold text-[#10B981] uppercase">{plan.name}</span>
                    <h3 className="text-2xl font-black text-neutral-900">{plan.price}</h3>
                    <p className="text-xs text-slate-550 leading-relaxed">{plan.d}</p>
                    <span className="text-[10px] font-bold text-[#10B981] block">Choose Plan →</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trainers */}
            <div className="space-y-6 text-left">
              <h2 className="text-2xl font-extrabold text-neutral-900">Certified Trainers</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { name: "Coach Marcus Vance", role: "Elite Bodybuilding & Strength Pro" },
                  { name: "Coach Sarah Jenkins", role: "Cardio & Sports Agility Lead" }
                ].map((c, i) => (
                  <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 flex gap-4 items-center text-left">
                    <div className="w-12 h-12 bg-slate-100 rounded-full shrink-0 flex items-center justify-center font-bold text-[#10B981]">
                      FC
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-neutral-900 text-left">{c.name}</h4>
                      <span className="text-[10px] text-[#10B981] font-bold block text-left">{c.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Specialized Programs */}
            <div className="space-y-6 text-left">
              <h2 className="text-2xl font-extrabold text-neutral-900">Workout Programs</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { t: "Cardio Agility", d: "High energy cardiovascular systems." },
                  { t: "Powerlifting Core", d: "Deadlifts, bar squat mechanics, and bench workshops." },
                  { t: "Meal Telemetry", d: "Dynamic high-protein customized recipes tracker." }
                ].map((prog, i) => (
                  <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-2">
                    <h3 className="font-extrabold text-sm text-neutral-900">{prog.t}</h3>
                    <p className="text-xs text-slate-550 leading-relaxed">{prog.d}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Transformations before/after slider */}
            <div className="space-y-6 text-left">
              <h2 className="text-2xl font-extrabold text-neutral-900">Transformations Showcase</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { name: "Alex K. (12 Weeks)", before: "Body Fat: 24%", after: "Body Fat: 11%", desc: "Focus: Fat Loss & Cardio Drills" },
                  { name: "Sumit J. (24 Weeks)", before: "Weight: 65kg", after: "Weight: 82kg", desc: "Focus: Hypertrophy & Strength" }
                ].map((item, i) => (
                  <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
                    <span className="text-xs font-bold text-neutral-900 block">{item.name}</span>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 border border-slate-100 p-3 rounded-lg text-center">
                        <span className="text-[10px] text-slate-400 block uppercase">Before</span>
                        <span className="text-xs font-bold text-red-500">{item.before}</span>
                      </div>
                      <div className="bg-slate-50 border border-slate-100 p-3 rounded-lg text-center">
                        <span className="text-[10px] text-slate-400 block uppercase">After</span>
                        <span className="text-xs font-bold text-emerald-500">{item.after}</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400 text-center">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white border border-slate-200 rounded-2xl p-8 max-w-xl mx-auto space-y-6 text-left shadow-xs">
              <h3 className="font-extrabold text-xl text-center text-neutral-900">Get Free Club Guest Pass</h3>
              <div className="space-y-3 flex flex-col">
                <input type="text" placeholder="ATHLETE NAME" className="border border-slate-200 p-2.5 text-xs rounded-lg bg-slate-50/50 outline-none" />
                <input type="email" placeholder="EMAIL ADDRESS" className="border border-slate-200 p-2.5 text-xs rounded-lg bg-slate-50/50 outline-none" />
                <button className="w-full bg-[#10B981] hover:bg-[#059669] py-3 text-black font-bold text-xs rounded-lg transition-all">
                  GET PASS NOW
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-200 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs font-bold text-slate-400 gap-4 uppercase">
              <span>© 2026 FITNESS PRO CLUB. ALL RIGS STABLE.</span>
              <div className="flex gap-4">
                <span>Facebook</span>
                <span>Instagram</span>
              </div>
            </div>
          </div>
        );
      }

      if (styleId === "dark-athletic") {
        return (
          <div className="font-sans bg-[#0B0F19] text-[#F3F4F6] p-8 space-y-16 min-h-full">
            {/* Navbar */}
            <div className="flex justify-between items-center border-b border-gray-800 pb-4">
              <span className="font-black text-sm text-[#F97316] uppercase font-sans">🏋️ OBSIDIAN ATHLETICS</span>
              <div className="hidden md:flex gap-4 text-xs font-bold uppercase text-neutral-400">
                <span>Plans</span>
                <span>Coaches</span>
                <span>Drills</span>
                <span>Before/After</span>
              </div>
              <span className="text-xs text-neutral-400 font-mono">Status: Open</span>
            </div>

            {/* Hero */}
            <div className="text-center max-w-2xl mx-auto space-y-6">
              <span className="px-3 py-1 bg-[#F97316]/10 border border-[#F97316]/20 text-[#F97316] rounded-full text-xs font-mono">
                DARK ENERGY GYM CANVAS
              </span>
              <h2 className="text-3xl md:text-5xl font-black uppercase text-white leading-tight text-center font-sans">
                {websiteContent.hero.headline || "Hyper-Performance Sports & Conditioning"}
              </h2>
              <p className="text-xs text-neutral-450 max-w-md mx-auto leading-relaxed text-center font-sans">
                {websiteContent.hero.subheadline || "Premium obsidian gym layouts built with high contrast orange widgets, bento plan cards, and visual transform trackers."}
              </p>
              <button className="px-6 py-2 bg-[#F97316] hover:bg-orange-500 text-white font-bold text-xs rounded transition-all font-sans">
                {websiteContent.hero.ctaText || "Select Workout Plans"}
              </button>
              <div className="h-60 rounded-xl border border-gray-800 p-2 bg-[#111827]/60 shadow-2xl overflow-hidden mt-6">
                <img src="/demo/gym_hero_demo.png" alt="Dark Gym Athletic Setup" className="w-full h-full object-cover filter saturate-[80%]" />
              </div>
            </div>

            {/* Plans */}
            <div className="space-y-6 text-left">
              <h3 className="text-xs uppercase tracking-widest text-[#F97316] font-mono text-left">// MEMBERSHIP PLANS</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
                {[
                  { t: "Core Starter Plan", price: "$29/mo" },
                  { t: "Athletic Premium", price: "$59/mo" },
                  { t: "Elite Bodybuilding", price: "$99/mo" }
                ].map((prog, i) => (
                  <div key={i} className="border border-gray-800 bg-[#161F30]/60 p-5 rounded-xl space-y-2 text-left">
                    <h4 className="font-bold text-white text-xs text-left">{prog.t}</h4>
                    <span className="text-lg font-black text-[#F97316]">{prog.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Transformations */}
            <div className="space-y-6 text-left">
              <h3 className="text-xs uppercase tracking-widest text-[#F97316] font-mono text-left">// BEFORE AND AFTER TRANSFORMS</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { name: "Alex K. (12 Weeks)", before: "Body Fat: 24%", after: "Body Fat: 11%" },
                  { name: "Sumit J. (24 Weeks)", before: "Weight: 65kg", after: "Weight: 82kg" }
                ].map((item, i) => (
                  <div key={i} className="border border-gray-800 bg-[#161F30]/20 p-5 rounded-xl space-y-4">
                    <span className="text-xs font-bold text-white block">{item.name}</span>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border border-gray-800 bg-black/60 p-3 rounded-lg text-center">
                        <span className="text-[10px] text-slate-550 block">BEFORE</span>
                        <span className="text-xs font-bold text-red-500">{item.before}</span>
                      </div>
                      <div className="border border-gray-800 bg-black/60 p-3 rounded-lg text-center">
                        <span className="text-[10px] text-slate-550 block">AFTER</span>
                        <span className="text-xs font-bold text-[#F97316]">{item.after}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-800 pt-8 flex justify-between items-center text-[10px] text-neutral-500 font-mono">
              <span>© 2026 OBSIDIAN ATHLETICS. ALL RIGS RUNNING.</span>
              <div className="flex gap-4">
                <span>/instagram</span>
                <span>/telemetry</span>
              </div>
            </div>
          </div>
        );
      }

      // Default / Bodybuilding theme
      return (
        <div className="font-mono bg-[#050505] text-white p-6 space-y-20 border-4 border-yellow-600 min-h-full">
          {/* Navbar */}
          <div className="border-4 border-yellow-600 bg-black p-4 flex justify-between items-center shadow-[3px_3px_0px_0px_#D97706]">
            <span className="font-sans font-black uppercase text-sm bg-[#D97706] text-black px-2 py-0.5 border-2 border-yellow-600">
              🏋️ HEAVY BARBELL CLUB
            </span>
            <div className="hidden md:flex gap-4 text-xs font-black uppercase">
              <span>Plans</span>
              <span>Coaches</span>
              <span>Drills</span>
              <span>Contact</span>
            </div>
            <span className="text-xs font-black uppercase bg-[#EF4444] text-white px-2 py-0.5 border-2 border-yellow-600">PURE</span>
          </div>

          {/* Hero */}
          <div className="border-4 border-yellow-600 bg-[#0A0A0A] p-6 shadow-[6px_6px_0px_0px_#D97706] grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4 text-left">
              <span className="px-2.5 py-0.5 bg-[#D97706] text-black text-[8px] font-black uppercase tracking-widest">
                IRON LABS
              </span>
              <h2 className="font-sans font-black uppercase text-3xl sm:text-4xl md:text-5xl leading-none text-left">
                {websiteContent.hero.headline || "Pure Rugged Muscle & Hypertrophy Gym"}
              </h2>
              <p className="text-xs font-bold text-neutral-400 leading-relaxed">
                {websiteContent.hero.subheadline || "Strong rugged bodybuilding neobrutalist formats featuring golden offset shadows, heavy borders, and extreme fitness timers."}
              </p>
              <button className="px-5 py-2 border-4 border-yellow-600 bg-black text-[#D97706] font-black uppercase text-xs shadow-[3px_3px_0px_0px_#D97706] hover:bg-yellow-600 hover:text-black active:translate-y-0.5 active:shadow-none">
                {websiteContent.hero.ctaText || "JOIN BARBELL TEAM"}
              </button>
            </div>
            <div className="border-4 border-yellow-600 h-48 overflow-hidden bg-neutral-900 shadow-[4px_4px_0px_0px_#D97706]">
              <img src="/demo/gym_hero_demo.png" alt="Bodybuilding Weight Plates Barbell" className="w-full h-full object-cover filter contrast-125 saturate-50" />
            </div>
          </div>

          {/* Plans */}
          <div className="space-y-6 text-left font-sans">
            <h2 className="text-xl font-black uppercase bg-[#D97706] text-black px-3 py-1 inline-block">POWER PLANS //</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { t: "CORE STARTER PLAN", p: "$29/mo" },
                { t: "ATHLETIC PREMIUM", p: "$59/mo" },
                { t: "ELITE POWERLIFTING", p: "$99/mo" }
              ].map((prog, i) => (
                <div key={i} className="border-4 border-yellow-600 bg-[#0A0A0A] p-4 shadow-[4px_4px_0px_0px_#D97706] space-y-2">
                  <h3 className="font-sans font-black uppercase text-xs text-white">{prog.t}</h3>
                  <span className="text-lg font-black text-[#D97706]">{prog.p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="border-4 border-yellow-600 bg-[#0A0A0A] p-6 shadow-[6px_6px_0px_0px_#D97706] max-w-md mx-auto space-y-4 text-left">
            <h3 className="font-sans font-black text-center text-sm uppercase bg-[#D97706] text-black py-1">TRANSMIT INTAKE //</h3>
            <input type="text" placeholder="ATHLETE_NAME" className="w-full border-4 border-yellow-600 p-2 text-xs font-black uppercase bg-black text-white outline-none" />
            <button className="w-full border-4 border-yellow-600 bg-[#D97706] text-black font-black uppercase text-xs shadow-[3px_3px_0px_0px_#D97706] active:translate-y-0.5 active:shadow-none transition-all py-2 font-mono">
              TRANSMIT REQUEST
            </button>
          </div>

          {/* Footer */}
          <div className="border-t-4 border-yellow-600 pt-6 flex flex-col sm:flex-row justify-between items-center text-[10px] font-black gap-4 uppercase">
            <span>© 2026 BARBELL CLUB INC. SHIPPED RAW.</span>
            <div className="flex gap-4">
              <span>GITHUB</span>
              <span>TELEGRAM</span>
            </div>
          </div>
        </div>
      );
    }

    // --- SAAS CATEGORY RENDERING ---
    // Sequence: Navbar → Hero → Features → Dashboard Preview → Pricing → FAQ → Footer
    if (["saas-dashboard", "ai-tool", "startup-landing", "business", "ecommerce", "real-estate"].includes(categoryId) || 
        (!isPortfolio && categoryId !== "restaurant" && categoryId !== "football-academy" && categoryId !== "mosque" && categoryId !== "islamic-website" && categoryId !== "coaching-class" && categoryId !== "college" && categoryId !== "gym")) {
      
      if (styleId === "stripe") {
        return (
          <div className="font-sans bg-white text-slate-900 p-8 space-y-20 min-h-full">
            {/* Navbar */}
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <span className="font-extrabold text-sm text-[#635BFF] uppercase tracking-tight font-sans">STRIPE BRAND</span>
              <div className="hidden md:flex gap-6 text-xs font-semibold text-slate-500">
                <span>Features</span>
                <span>Dashboard</span>
                <span>Pricing</span>
                <span>FAQ</span>
                <span>Developer Docs</span>
              </div>
              <button className="rounded-lg bg-[#635BFF] text-white hover:opacity-90 font-bold text-xs px-4 py-1.5 shadow-sm transition-all font-sans">
                Sign In
              </button>
            </div>

            {/* Hero */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-6 text-left font-sans">
              <div className="space-y-6 text-left font-sans">
                <span className="px-2.5 py-0.5 bg-indigo-50 text-[#635BFF] rounded-full font-bold text-[8.5px] uppercase font-sans">
                  Global Financial System
                </span>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight text-left font-sans">
                  {websiteContent.hero.headline || "Financial Infrastructure for the Internet"}
                </h1>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  {websiteContent.hero.subheadline || "A gorgeous indigo theme using dual-column layouts and diagonal grid headers to preview enterprise payment pipelines."}
                </p>
                <div className="flex gap-3 pt-2 font-sans">
                  <button className="rounded-lg bg-[#635BFF] text-white hover:opacity-90 font-bold text-xs px-5 py-2.5 shadow-sm shadow-indigo-500/10 transition-all font-sans">
                    {websiteContent.hero.ctaText || "Start with Payments"}
                  </button>
                </div>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-2 rounded-xl shadow-lg font-sans text-left">
                <img src="/demo/saas-dashboard.png" alt="Stripe Dashboard" className="w-full h-full object-cover rounded-lg" />
              </div>
            </div>

            {/* Features */}
            <div className="space-y-6 text-left font-sans">
              <span className="text-[#635BFF] font-bold text-xs uppercase tracking-wider block font-sans">// ENTERPRISE FEATURES</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left font-sans">
                {[
                  { title: "Instant Payouts", desc: "Initiate multi-currency bank transfers in real-time." },
                  { title: "Radical Fraud Control", desc: "Machine-learning algorithm designed to secure transactions." },
                  { title: "Modular Billing Tables", desc: "Flexible subscription plan structures built cleanly." }
                ].map((feat, idx) => (
                  <div key={idx} className="bg-white border border-slate-100 rounded-xl p-5 shadow-xs hover:shadow-md transition-all duration-300 text-left font-sans">
                    <h4 className="font-bold text-xs text-slate-900 mb-1 text-left font-sans">{feat.title}</h4>
                    <p className="text-[10px] text-slate-500 leading-relaxed text-left font-sans">{feat.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="space-y-6 text-left font-sans">
              <span className="text-[#635BFF] font-bold text-xs uppercase tracking-wider block font-sans">// COMPREHENSIVE DASHBOARD</span>
              <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-xl border border-slate-800 space-y-4 font-sans text-left">
                <div className="flex justify-between items-center text-xs text-slate-400 font-sans">
                  <span className="font-bold font-sans">payments_telemetry_live.json</span>
                  <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded font-mono text-[9px]">ONLINE</span>
                </div>
                <div className="bg-slate-950 p-1.5 rounded-xl overflow-hidden border border-slate-800 font-sans text-left">
                  <img src="/demo/saas-dashboard.png" alt="Stripe Analytics Dashboard" className="w-full h-full object-cover filter brightness-95" />
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-6 text-center max-w-xl mx-auto font-sans">
              <span className="text-[#635BFF] font-bold text-xs uppercase tracking-wider block font-sans">Transparent Pricing Plans</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left font-sans">
                {[
                  { name: "Starter Suite", price: "$29/mo", details: "Best for growing companies." },
                  { name: "Enterprise Core", price: "$199/mo", details: "Complete spatial metrics dashboard." }
                ].map((p, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4 font-sans text-left">
                    <h4 className="font-bold text-xs text-slate-450 uppercase font-sans">{p.name}</h4>
                    <span className="text-2xl font-black text-slate-900 block font-sans text-left">{p.price}</span>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-sans text-left">{p.details}</p>
                    <button className="w-full py-2 bg-[#635BFF] hover:bg-indigo-700 text-white font-bold text-xs rounded-lg transition-colors font-sans">
                      SUBSCRIBE NOW
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="space-y-6 max-w-2xl mx-auto text-left font-sans">
              <h3 className="text-center font-bold text-sm uppercase text-[#635BFF] font-sans">Frequently Answered</h3>
              <div className="space-y-4 font-sans text-left">
                {[
                  { q: "How fast are Instant Payouts processed?", a: "Most transfers settle in your connected bank account within minutes, natively." },
                  { q: "Can we configure custom webhooks?", a: "Yes, advanced dashboard features provide full webhook registry options." }
                ].map((item, idx) => (
                  <div key={idx} className="border-b border-slate-100 pb-4 space-y-1 font-sans text-left">
                    <h4 className="font-bold text-xs text-slate-900 font-sans text-left">{item.q}</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-sans text-left">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-100 pt-8 flex justify-between items-center text-xs font-bold text-slate-400 font-sans uppercase">
              <span>© 2026 STRIPE INC. ENTERPRISE BLUEPRINTS.</span>
              <div className="flex gap-4 font-sans">
                <span>Privacy</span>
                <span>Docs</span>
              </div>
            </div>
          </div>
        );
      }

      if (styleId === "linear") {
        return (
          <div className="font-sans bg-[#050506] text-[#EDEDEF] p-8 space-y-20 min-h-full">
            {/* Navbar */}
            <div className="flex justify-between items-center border-b border-neutral-900 pb-4">
              <span className="font-black text-sm tracking-tight text-white uppercase font-sans">LINEAR BRAND</span>
              <div className="hidden md:flex gap-5 text-xs text-neutral-400">
                <span>Features</span>
                <span>Integrations</span>
                <span>Pricing</span>
                <span>FAQ</span>
                <span>Docs</span>
              </div>
              <span className="text-[8px] bg-neutral-900 border border-neutral-800 text-white rounded px-2.5 py-0.5 font-mono uppercase tracking-widest">
                v2.0
              </span>
            </div>

            {/* Hero */}
            <div className="text-center max-w-2xl mx-auto space-y-6 py-6">
              <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 text-white rounded text-[8px] uppercase tracking-widest font-mono">
                Linear 2.0 // Obsidian Release
              </span>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight text-center font-sans">
                {websiteContent.hero.headline || "Linear is a Better Way to Build Product"}
              </h1>
              <p className="text-xs text-neutral-400 leading-relaxed max-w-lg mx-auto text-center font-sans">
                {websiteContent.hero.subheadline || "Meet the technical dark issue tracker design, cinematic deep obsidian panels, and violet highlights."}
              </p>
              <button className="px-6 py-2 bg-gradient-to-r from-indigo-650 to-purple-650 text-white font-bold text-xs rounded hover:opacity-90 transition-all shadow-md shadow-purple-500/10">
                {websiteContent.hero.ctaText || "Get Started"}
              </button>
              <div className="max-w-xl mx-auto border border-neutral-800 p-2 rounded-lg bg-[#0a0a0c]/60 shadow-2xl overflow-hidden mt-6">
                <img src="/demo/saas-dashboard.png" alt="Linear Dashboard" className="w-full h-full object-cover filter brightness-95 contrast-105" />
              </div>
            </div>

            {/* Features */}
            <div className="space-y-6 text-left max-w-2xl mx-auto">
              <span className="text-xs uppercase tracking-widest text-[#5E6AD2] font-mono block text-left">// OBSIDIAN FEATURES</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                {[
                  { t: "Fast Issue Tracking", d: "Designed to sync instantly across all dashboard registries." },
                  { t: "Bento Workspace", d: "Configurable layout grid panels for spatial tracking." },
                  { t: "Git Commits Bind", d: "Automatic telemetry rules compiling code directly." }
                ].map((feat, i) => (
                  <div key={i} className="border border-neutral-800 bg-[#0a0a0c]/60 p-5 rounded-lg text-left space-y-2">
                    <h4 className="font-bold text-xs text-white text-left">{feat.t}</h4>
                    <p className="text-[10px] text-neutral-400 leading-relaxed text-left">{feat.d}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="space-y-6 text-left max-w-2xl mx-auto">
              <span className="text-xs uppercase tracking-widest text-[#5E6AD2] font-mono block text-left">// WORKSPACE LIVE DATA</span>
              <div className="border border-neutral-800 bg-black/60 rounded-xl p-3 shadow-2xl">
                <div className="h-64 rounded-lg overflow-hidden border border-neutral-900 bg-neutral-950">
                  <img src="/demo/saas-dashboard.png" alt="Linear Live Preview" className="w-full h-full object-cover filter brightness-90 saturate-[90%]" />
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-6 text-center max-w-xl mx-auto font-sans">
              <span className="text-xs uppercase tracking-widest text-[#5E6AD2] font-mono block">obsidian tiers</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                {[
                  { name: "OBSIDIAN CORE", price: "$10/mo", details: "Perfect for technical startups." },
                  { name: "ENTERPRISE DEPLOY", price: "$25/mo", details: "Full spatial database metrics." }
                ].map((p, i) => (
                  <div key={i} className="border border-neutral-800 bg-[#0a0a0c]/60 p-6 rounded-lg space-y-4 text-left">
                    <span className="text-[8px] font-mono text-[#5E6AD2] uppercase block text-left">{p.name}</span>
                    <span className="text-xl font-bold text-white block text-left">{p.price}</span>
                    <p className="text-[10px] text-neutral-400 text-left">{p.details}</p>
                    <button className="w-full py-2 bg-[#5E6AD2] hover:bg-indigo-700 text-white font-bold text-xs rounded transition-all">
                      DEPLOY NOW
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="space-y-6 max-w-md mx-auto text-center font-sans">
              <span className="text-xs uppercase tracking-widest text-[#5E6AD2] font-mono block">// HELP CENTRE</span>
              <div className="space-y-4 divide-y divide-neutral-900 text-left">
                {[
                  { q: "Is offline synchronization supported?", a: "Yes, linear databases cache data locally and sync natively upon connection." },
                  { q: "Can we export spatial schemas?", a: "Yes, standard JSON outputs allow importing elsewhere natively." }
                ].map((item, i) => (
                  <div key={i} className="pt-4 first:pt-0 text-left space-y-1">
                    <h4 className="text-xs font-bold text-white text-left">{item.q}</h4>
                    <p className="text-[10px] text-neutral-400 leading-relaxed text-left">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-neutral-900 pt-8 flex justify-between items-center text-[10px] text-neutral-500 font-mono uppercase">
              <span>© 2026 LINEAR SYSTEMS INC. OBSIDIAN BLUEPRINTS.</span>
              <div className="flex gap-4">
                <span>/github</span>
                <span>/discord</span>
              </div>
            </div>
          </div>
        );
      }

      if (styleId === "vercel") {
        return (
          <div className="font-mono bg-white text-black p-8 space-y-16 min-h-full">
            {/* Navbar */}
            <div className="border-b border-black pb-4 flex justify-between items-center text-xs font-black">
              <span>▲ VERCEL STUDIO</span>
              <div className="hidden md:flex gap-6 uppercase">
                <span>Features</span>
                <span>Dashboard</span>
                <span>Pricing</span>
                <span>FAQ</span>
                <span>Docs</span>
              </div>
              <span>DEPLOYMENTS</span>
            </div>

            {/* Hero */}
            <div className="space-y-6 pt-6 text-left">
              <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-black uppercase leading-none text-left">
                {websiteContent.hero.headline || "Develop. Preview. Ship."}
              </h1>
              <p className="text-xs text-neutral-600 leading-relaxed font-sans max-w-xl text-left">
                {websiteContent.hero.subheadline || "A stark black & white developer layout incorporating triangular visuals, sharp 0px corners, and monospace deploy status logs."}
              </p>
              <div className="flex gap-4 pt-2">
                <button className="bg-black text-white hover:bg-white hover:text-black font-mono text-[10px] tracking-wider px-6 py-2.5 rounded-none border border-black transition-all">
                  {websiteContent.hero.ctaText || "DEPLOY NOW"}
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-6 text-left border-t border-black pt-12">
              <h3 className="font-black text-xs uppercase tracking-widest">// VERCEL CORE ASSETS</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { t: "Turbopack Compile", d: "Incremental bundling framework delivering 0.2ms local compiles." },
                  { t: "Edge Functionality", d: "Serverless code executing instantly near your visitors." },
                  { t: "Stark Registry", d: "Incremental static generation built on Tailwind variables." }
                ].map((feat, i) => (
                  <div key={i} className="border border-black p-5 space-y-2 text-left">
                    <h4 className="font-bold text-xs text-left">{feat.t}</h4>
                    <p className="text-[11px] text-neutral-600 leading-relaxed font-sans text-left">{feat.d}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="border border-black p-4 bg-neutral-50 rounded-none font-mono text-[10.5px] text-left">
              <div className="flex justify-between text-neutral-500 border-b border-black/10 pb-2">
                <span>DEPLOYMENT REGISTRY</span>
                <span className="text-emerald-600">ONLINE</span>
              </div>
              <div className="pt-2 space-y-1">
                <div>[15:35:02] Building production bundle...</div>
                <div>[15:35:05] Exporting CSS variables...</div>
                <div className="text-black font-bold">[15:35:08] ✓ Compiled successfully.</div>
              </div>
              <div className="border border-black p-1 bg-white mt-4 overflow-hidden">
                <img src="/demo/saas-dashboard.png" alt="Vercel Live Preview" className="w-full h-full object-cover filter grayscale contrast-125" />
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-6 border-t border-black pt-12">
              <h3 className="font-black text-xs uppercase tracking-widest text-center">PRICING PACKAGES</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
                {[
                  { name: "VERCEL PRO", price: "$20/mo", desc: "Advanced collaboration tools." },
                  { name: "VERCEL ENTERPRISE", price: "Custom/mo", desc: "Absolute high performance logs." }
                ].map((plan, i) => (
                  <div key={i} className="border border-black p-6 space-y-4 text-left">
                    <span className="text-[9px] font-black tracking-widest uppercase block text-left">{plan.name}</span>
                    <span className="text-2xl font-black block text-left">{plan.price}</span>
                    <p className="text-xs text-neutral-600 font-sans text-left">{plan.desc}</p>
                    <button className="w-full py-2.5 bg-black hover:bg-neutral-800 text-white font-mono text-[10px] uppercase transition-all">
                      DEPLOY NOW
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="space-y-6 border-t border-black pt-12 max-w-xl mx-auto">
              <h3 className="font-black text-xs uppercase tracking-widest text-center">QUESTIONS & LOGS</h3>
              <div className="space-y-4 text-left">
                {[
                  { q: "Is next/font optimized natively?", a: "Yes, standard CSS fonts are bundled and statically optimized during next builds." },
                  { q: "Can we deploy non-nextjs apps?", a: "Yes, static bundle directories are deployed instantly with sharp zero radii." }
                ].map((faq, i) => (
                  <div key={i} className="border-b border-black/10 pb-4 space-y-1 text-left">
                    <h4 className="font-bold text-xs text-left">{faq.q}</h4>
                    <p className="text-xs text-neutral-600 font-sans text-left">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-black pt-8 flex justify-between items-center text-[10px] font-black uppercase">
              <span>© 2026 VERCEL CORE INC. ALL SYSTEMS NOMINAL.</span>
              <div className="flex gap-4">
                <span>/github</span>
                <span>/telemetry</span>
              </div>
            </div>
          </div>
        );
      }

      if (styleId === "ai-startup") {
        return (
          <div className="font-sans bg-[#030712] text-white p-8 space-y-20 min-h-full">
            {/* Navbar */}
            <div className="flex justify-between items-center border-b border-gray-800 pb-4">
              <span className="font-black text-sm text-cyan-400 uppercase tracking-wider font-sans">AI_AGENT_OS</span>
              <div className="hidden md:flex gap-5 text-xs text-neutral-400 font-mono">
                <span>Features</span>
                <span>Preview</span>
                <span>Plan</span>
                <span>FAQ</span>
                <span>Model Specs</span>
              </div>
              <span className="text-[8px] bg-cyan-500/10 text-cyan-400 px-2 py-0.5 border border-cyan-500/30 rounded uppercase tracking-wider font-mono">
                Model: Gemini Flash
              </span>
            </div>

            {/* Hero */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-6 text-left">
              <div className="space-y-6 text-left font-sans">
                <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 rounded-full text-[9px] font-bold font-sans">
                  AUTONOMOUS COMPILING
                </span>
                <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight text-left font-sans">
                  {websiteContent.hero.headline || "Design Web Apps Natively via LLM Prompting"}
                </h1>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                  {websiteContent.hero.subheadline || "Futuristic prompt engineering templates, cyberpunk cyan highlights, and telemetry widgets."}
                </p>
                <div className="border border-gray-800 bg-gray-950/60 p-3 rounded-xl flex items-center justify-between gap-3 mt-4 text-left font-sans">
                  <span className="text-xs text-neutral-500 font-mono">"Create a sports club dashboard..."</span>
                  <span className="px-3 py-1.5 bg-cyan-500 hover:opacity-90 rounded-lg text-[9.5px] font-bold text-black uppercase cursor-pointer font-sans">
                    {websiteContent.hero.ctaText || "Synthesize"}
                  </span>
                </div>
              </div>
              <div className="bg-gray-900/40 border border-gray-800 p-2 rounded-2xl shadow-2xl backdrop-blur-md font-sans text-left">
                <img src="/demo/saas-dashboard.png" alt="AI Workspace" className="w-full h-full object-cover rounded-xl" />
              </div>
            </div>

            {/* Features */}
            <div className="space-y-6 text-left font-sans">
              <span className="text-xs font-mono text-[#06B6D4] uppercase block text-left">// CYBER AUTOMATION</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-sans text-left">
                {[
                  { t: "AST Compilers", d: "Translate complex human logic scripts into pristine layouts." },
                  { t: "Telemetry Live", d: "Continuous heartbeats testing the health of deployments." },
                  { t: "Zustand Core Labs", d: "Manage high-fidelity states natively in background threads." }
                ].map((feat, i) => (
                  <div key={i} className="bg-gray-900/40 border border-gray-800 rounded-xl p-5 space-y-2 text-left">
                    <h4 className="font-bold text-white text-xs text-left">{feat.t}</h4>
                    <p className="text-[10px] text-neutral-400 leading-relaxed text-left">{feat.d}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="space-y-6 text-left max-w-2xl mx-auto font-sans">
              <span className="text-xs font-mono text-[#06B6D4] uppercase block text-left">// TELEMETRY DASHBOARD</span>
              <div className="bg-gray-900/30 border border-gray-800 rounded-2xl p-4 font-sans text-left">
                <div className="h-64 rounded-xl border border-gray-950 overflow-hidden font-sans text-left">
                  <img src="/demo/saas-dashboard.png" alt="AI Telemetry Dashboard" className="w-full h-full object-cover filter brightness-90 saturate-[110%]" />
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-6 text-center max-w-xl mx-auto font-sans">
              <span className="text-xs font-mono text-[#06B6D4] uppercase block">synthetic packages</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left font-sans">
                {[
                  { n: "GEMINI DEVELOPER", price: "$20/mo", d: "Access basic prompts generator." },
                  { n: "GEMINI ENTERPRISE", price: "Custom/mo", d: "Complete spatial compiling limits." }
                ].map((plan, i) => (
                  <div key={i} className="bg-gray-900/40 border border-gray-800 rounded-xl p-6 space-y-4 text-left">
                    <span className="text-[8px] font-mono text-cyan-400 uppercase block text-left">{plan.n}</span>
                    <span className="text-xl font-bold text-white block text-left">{plan.price}</span>
                    <p className="text-[10px] text-neutral-400 text-left">{plan.d}</p>
                    <button className="w-full py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-xs hover:opacity-90 transition-all font-sans">
                      DEPLOY NOW
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="space-y-6 max-w-md mx-auto text-center font-sans">
              <span className="text-xs font-mono text-[#06B6D4] uppercase block">// HELP CENTRE</span>
              <div className="space-y-4 text-left font-sans">
                {[
                  { q: "Is the prompt compiler safe?", a: "Yes, advanced cybersecurity rules protect AST models natives." },
                  { q: "What models are supported?", a: "We support Gemini Flash and advanced neural LLM models natively." }
                ].map((faq, i) => (
                  <div key={i} className="border-b border-gray-800 pb-4 space-y-1 font-sans text-left">
                    <h4 className="text-xs font-bold text-white font-sans text-left">{faq.q}</h4>
                    <p className="text-[10px] text-neutral-450 leading-relaxed font-sans text-left">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-800 pt-8 flex justify-between items-center text-[10px] text-neutral-500 font-mono uppercase">
              <span>© 2026 AI_AGENT_OS CORP. ALL SYSTEMS STABLE.</span>
              <div className="flex gap-4">
                <span>/github</span>
                <span>/docs</span>
              </div>
            </div>
          </div>
        );
      }

      // Default / Dashboard Pro theme
      return (
        <div className="font-sans bg-slate-50 text-slate-900 flex h-[620px] overflow-hidden select-none border-4 border-black min-h-full">
          {/* Dashboard Left Sidebar */}
          <div className="w-44 bg-slate-900 text-slate-300 flex flex-col p-4 border-r-4 border-black shrink-0 font-sans text-left">
            <span className="font-black text-xs text-white uppercase tracking-wider mb-6 block">ADMIN_CONSOLE</span>
            <div className="space-y-2 flex-1 text-[10px] font-bold uppercase text-slate-400">
              <div className="px-3 py-1.5 bg-blue-600 text-white rounded cursor-pointer">Overview</div>
              <div className="px-3 py-1.5 hover:bg-slate-800 rounded cursor-pointer">Features</div>
              <div className="px-3 py-1.5 hover:bg-slate-800 rounded cursor-pointer">Preview</div>
              <div className="px-3 py-1.5 hover:bg-slate-800 rounded cursor-pointer">Pricing</div>
              <div className="px-3 py-1.5 hover:bg-slate-800 rounded cursor-pointer">FAQ</div>
            </div>
            <span className="text-[7.5px] text-slate-550">Mubix Systems v3.8</span>
          </div>

          {/* Dashboard Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden bg-slate-50">
            {/* Top Bar */}
            <div className="h-12 border-b-4 border-black bg-white flex justify-between items-center px-6">
              <span className="text-xs font-black uppercase text-slate-800">Workspace Dashboard</span>
              <span className="text-[9px] font-mono px-2 py-0.5 bg-emerald-100 text-emerald-700 border-2 border-black">SECURE CONNECTION</span>
            </div>

            {/* Dashboard Content Grid */}
            <div className="flex-1 p-6 space-y-6 overflow-y-auto">
              {/* Hero */}
              <div className="border-4 border-black bg-white p-4 shadow-[2px_2px_0px_0px_#000] text-left space-y-2">
                <span className="text-[8px] bg-blue-100 text-blue-700 px-2 py-0.5 inline-block font-bold rounded">WELCOME ADMIN</span>
                <h2 className="text-lg font-black uppercase text-slate-800">
                  {websiteContent.hero.headline || "Simplify Corporate Blueprints & Telemetry Tools"}
                </h2>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  {websiteContent.hero.subheadline || "A corporate interface displaying multi-column metric boxes, analytics charts, and expandable FAQ registries."}
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { title: "Revenue Logs", val: "$48,251" },
                  { title: "Team Slots", val: "1,205" },
                  { title: "Live Uptime", val: "99.98%" }
                ].map((m, i) => (
                  <div key={i} className="border-4 border-black bg-white p-4 shadow-[2px_2px_0px_0px_#000] text-left">
                    <span className="text-[8px] uppercase text-slate-400 font-bold block text-left">{m.title}</span>
                    <span className="text-lg font-black text-slate-800 text-left">{m.val}</span>
                  </div>
                ))}
              </div>

              {/* Graphical screenshot area / Dashboard Preview */}
              <div className="border-4 border-black p-2 bg-white shadow-[3px_3px_0px_0px_#000]">
                <span className="text-[8px] font-bold text-slate-450 uppercase block pb-2 text-left">Workspace Live Snapshot</span>
                <div className="h-52 w-full bg-slate-100 overflow-hidden relative">
                  <img src="/demo/saas-dashboard.png" alt="SaaS Metrics" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Pricing Tiers */}
              <div className="space-y-3 text-left">
                <span className="text-[8px] font-bold uppercase text-slate-450 block text-left">Corporate Plans</span>
                <div className="grid grid-cols-2 gap-4 text-left">
                  {[
                    { name: "Starter Core", price: "$49/mo" },
                    { name: "Enterprise Dev", price: "$299/mo" }
                  ].map((p, i) => (
                    <div key={i} className="border-4 border-black bg-white p-4 shadow-[2px_2px_0px_0px_#000] text-left">
                      <span className="text-[8px] font-bold text-slate-400 block uppercase text-left">{p.name}</span>
                      <span className="text-base font-black text-slate-900 block text-left">{p.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div className="border-4 border-black bg-white p-4 shadow-[2px_2px_0px_0px_#000] text-left space-y-2 font-sans">
                <span className="text-[8px] font-bold uppercase text-slate-400 block">SYSTEM_FAQ</span>
                <div className="text-[11px] font-bold text-slate-700">How do we connect customized domain names natively?</div>
                <p className="text-[10px] text-slate-500 font-sans leading-relaxed">
                  Navigate to Domain settings inside the sidebar registry console and bind variables.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="p-8 text-center text-xs font-bold bg-neutral-100 text-neutral-500 min-h-full">
        Category layout preview was not initialized for {categoryId} archetype.
      </div>
    );

  };
  // Dedicated helper to trigger open in new tab
  const handleOpenInNewTab = () => {
    if (typeof window !== "undefined") {
      window.open(`/preview/${style.id}`, "_blank");
    }
  };

  const handleZoomIn = () => {
    setIsAutoFit(false);
    setZoomScale(prev => Math.min(prev + 0.05, 1.5));
  };

  const handleZoomOut = () => {
    setIsAutoFit(false);
    setZoomScale(prev => Math.max(prev - 0.05, 0.15));
  };

  const handleZoomReset = () => {
    setIsAutoFit(false);
    setZoomScale(1.0);
  };

  const toggleAutoFit = () => {
    setIsAutoFit(prev => !prev);
  };

  // Helper to render the premium simulation header (56px Height)
  const renderPremiumToolbar = (
    isFull: boolean,
    currentDevice: "desktop" | "tablet" | "mobile",
    updateDevice: (dev: "desktop" | "tablet" | "mobile") => void,
    onExit: () => void
  ) => {
    const activeWidth = currentDevice === "desktop" ? 1440 : currentDevice === "tablet" ? 768 : 390;
    const activeHeight = currentDevice === "desktop" ? 900 : currentDevice === "tablet" ? 1024 : 844;
    const currentScale = isFull ? activeModalScale : activeScale;

    return (
      <div className="h-[56px] min-h-[56px] w-full bg-zinc-950 text-white border-4 border-black flex justify-between items-center px-4 z-30 shadow-[4px_4px_0px_0px_#000] relative">
        {/* LEFT: macOS traffic lights and status */}
        <div className="flex items-center gap-2">
          {isFull ? (
            <div className="flex items-center gap-2">
              {currentStep > 1 && (
                <button
                  onClick={() => {
                    prevStep();
                    setIsFullscreen(false);
                  }}
                  className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-white border-2 border-black font-black uppercase text-[10px] flex items-center gap-1.5 shadow-[2px_2px_0px_0px_#000] transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back
                </button>
              )}
              <button
                onClick={onExit}
                className="px-3 py-1 bg-red-500 hover:bg-red-600 text-black border-2 border-black font-black uppercase text-[10px] flex items-center gap-1 shadow-[2px_2px_0px_0px_#000] transition-all cursor-pointer"
              >
                ✕ Exit
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 mr-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B6B]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFD93D]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#4ade80]" />
            </div>
          )}
          <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 hidden sm:inline-block ml-1">
            {style.name} PREVIEW
          </span>
          {Object.values(activeSocials).filter(Boolean).length > 0 && (
            <span className="ml-2 px-1.5 py-0.5 bg-emerald-500/20 border border-emerald-500 text-emerald-400 font-mono text-[7px] font-black uppercase tracking-wider animate-pulse rounded flex items-center gap-1 shrink-0">
              <span className="w-1 h-1 rounded-full bg-emerald-400" />
              Connected
            </span>
          )}
        </div>

        {/* CENTER: Responsive Viewport selectors */}
        <div className="flex items-center gap-1 bg-zinc-900 border border-white/10 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => updateDevice("desktop")}
            className={`px-3 py-1 rounded text-[9px] font-black uppercase transition-all flex items-center gap-1 cursor-pointer ${
              currentDevice === "desktop" ? "bg-[#FFD93D] text-black" : "text-white/60 hover:text-white"
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Desktop</span>
          </button>
          <button
            type="button"
            onClick={() => updateDevice("tablet")}
            className={`px-3 py-1 rounded text-[9px] font-black uppercase transition-all flex items-center gap-1 cursor-pointer ${
              currentDevice === "tablet" ? "bg-[#FFD93D] text-black" : "text-white/60 hover:text-white"
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tablet</span>
          </button>
          <button
            type="button"
            onClick={() => updateDevice("mobile")}
            className={`px-3 py-1 rounded text-[9px] font-black uppercase transition-all flex items-center gap-1 cursor-pointer ${
              currentDevice === "mobile" ? "bg-[#FFD93D] text-black" : "text-white/60 hover:text-white"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mobile</span>
          </button>
        </div>

        {/* RIGHT: Zoom + Fullscreen + refresh controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Viewport size readout */}
          <span className="text-[9px] font-mono text-white/40 bg-zinc-900 border border-white/5 px-2 py-0.5 rounded hidden md:inline-block">
            {activeWidth} × {activeHeight}
          </span>

          <div className="w-[1px] h-4 bg-white/20 hidden md:block" />

          {/* Zoom controls */}
          <div className="flex items-center gap-1 bg-zinc-900 border border-white/10 p-0.5 rounded">
            <button
              onClick={handleZoomOut}
              className="w-5 h-5 flex items-center justify-center text-[11px] font-black hover:bg-white/10 rounded cursor-pointer text-white/70 hover:text-white"
              title="Zoom Out"
            >
              -
            </button>
            <button
              onClick={handleZoomReset}
              className="px-1 text-[8.5px] font-mono font-bold text-white/60 hover:text-white cursor-pointer"
              title="Reset to 100%"
            >
              {Math.round(currentScale * 100)}%
            </button>
            <button
              onClick={handleZoomIn}
              className="w-5 h-5 flex items-center justify-center text-[11px] font-black hover:bg-white/10 rounded cursor-pointer text-white/70 hover:text-white"
              title="Zoom In"
            >
              +
            </button>
            <button
              onClick={toggleAutoFit}
              className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider cursor-pointer ${
                isAutoFit ? "bg-[#0052FF] text-white" : "text-white/40 hover:text-white"
              }`}
            >
              Fit
            </button>
          </div>

          <div className="w-[1px] h-4 bg-white/20" />

          {/* Standalone Route trigger */}
          <button
            onClick={handleOpenInNewTab}
            className="p-1.5 border border-white/10 hover:bg-white/10 text-white/60 hover:text-white transition-colors rounded cursor-pointer"
            title="Open in Isolated standalone tab"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          {/* Reload trigger */}
          <button
            onClick={triggerRefresh}
            className={`p-1.5 border border-white/10 hover:bg-white/10 text-white/60 hover:text-white transition-colors rounded cursor-pointer ${
              isRefreshing ? "animate-spin" : ""
            }`}
            title="Refresh responsive canvas"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          {/* Non-yellow Fullscreen toggle (hidden if standalone) */}
          {!isStandalone && !isFull && (
            <button
              onClick={() => {
                setModalDevice(device);
                setIsFullscreen(true);
              }}
              className="p-1.5 bg-zinc-900 border border-white/15 hover:bg-white/10 text-white/60 hover:text-white transition-all cursor-pointer flex items-center rounded"
              title="Enter Fullscreen"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    );
  };

  // Helper to render the realistic browser framework
  const renderSimulatedCanvas = (currentDev: "desktop" | "tablet" | "mobile", scaleVal: number) => {
    const isMobile = currentDev === "mobile";
    const isTablet = currentDev === "tablet";

    if (isMobile) {
      return (
        <motion.div
          key="mobile-shell"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: scaleVal }}
          transition={{ duration: 0.2 }}
          className="relative border-[12px] border-zinc-950 rounded-[44px] shadow-[0_25px_60px_-12px_rgba(0,0,0,0.85)] bg-zinc-900 overflow-hidden flex flex-col shrink-0"
          style={{
            width: 414,
            height: 840,
            transformOrigin: "top center"
          }}
        >
          {/* Dynamic Island Notch */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-2xl z-30 flex items-center justify-between px-3 text-[7px] text-white/90 font-mono select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
            <span className="font-bold tracking-widest text-[6px]">MUBIX: OK</span>
            <span className="text-[#FFD93D] text-[6px] animate-pulse">LIVE</span>
          </div>

          {/* Simulated Phone status bar */}
          <div className="flex justify-between px-6 pt-2.5 pb-1.5 text-[8px] font-bold text-neutral-400 font-mono bg-white border-b border-neutral-100 z-20 select-none">
            <span>09:41</span>
            <div className="flex items-center gap-1">
              <span>5G</span>
              <div className="w-4 h-2 border border-neutral-400 rounded-sm p-[1px] flex items-center">
                <div className="bg-neutral-400 h-full w-4/5 rounded-2xs" />
              </div>
            </div>
          </div>

          {/* Scrollable phone viewport with active theme background color */}
          <div className="w-full flex-1 overflow-y-auto scrollbar-thin scroll-smooth" style={{ backgroundColor: style.colors.background }}>
            {renderWebsiteSections(false, "mobile")}
          </div>

          {/* Home indicator bar */}
          <div className="bg-white pb-2 pt-1 flex justify-center border-t border-neutral-100 z-20">
            <div className="w-28 h-1 bg-black rounded-full" />
          </div>
        </motion.div>
      );
    }

    if (isTablet) {
      return (
        <motion.div
          key="tablet-shell"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: scaleVal }}
          transition={{ duration: 0.2 }}
          className="relative border-[14px] border-zinc-950 rounded-[38px] shadow-[0_25px_60px_-12px_rgba(0,0,0,0.85)] bg-[#0c0c0f] overflow-hidden flex flex-col shrink-0"
          style={{
            width: 768,
            height: 1024,
            transformOrigin: "top center"
          }}
        >
          {/* iPad Camera lens */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-800 rounded-full border border-zinc-700 z-30" />

          {/* iPad Status Bar */}
          <div className="flex justify-between px-6 py-1.5 text-[9px] font-bold text-neutral-400 bg-white border-b border-neutral-100 select-none z-20">
            <span>10:00 AM</span>
            <div className="flex items-center gap-1.5">
              <span>iPad OS 18</span>
              <span>100%</span>
            </div>
          </div>

          {/* iPad Scrollable content with active theme background color */}
          <div className="w-full flex-1 overflow-y-auto scrollbar-thin scroll-smooth" style={{ backgroundColor: style.colors.background }}>
            {renderWebsiteSections(false, "tablet")}
          </div>

          {/* iPad home indicator */}
          <div className="bg-white pb-2 pt-1 flex justify-center border-t border-neutral-100 z-20">
            <div className="w-32 h-1 bg-black rounded-full" />
          </div>
        </motion.div>
      );
    }

    // DESKTOP MODE BROWSER FRAME
    return (
      <motion.div
        key="desktop-shell"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: scaleVal }}
        transition={{ duration: 0.2 }}
        className="relative flex flex-col border-[6px] border-zinc-800 rounded-2xl shadow-[0_30px_70px_rgba(0,0,0,0.8)] bg-[#121216] overflow-hidden shrink-0"
        style={{
          width: 1440,
          height: 900,
          transformOrigin: "top center"
        }}
      >
        {/* Browser top-bar chrome */}
        <div className="bg-[#121216] text-white p-3 flex items-center justify-between border-b border-white/5 select-none z-20">
          <div className="flex items-center gap-2 w-20">
            <div className="w-3 h-3 rounded-full bg-[#FF6B6B]" />
            <div className="w-3 h-3 rounded-full bg-[#FFD93D]" />
            <div className="w-3 h-3 rounded-full bg-[#4ade80]" />
          </div>

          <div className="flex-1 max-w-lg bg-zinc-900 border border-white/10 rounded-lg px-4 py-1 flex items-center justify-between text-white/50 text-[10px] font-mono shadow-inner">
            <div className="flex items-center gap-2 truncate">
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>https://mubixprompts.ai/preview/{style.id}</span>
            </div>
            <span className="px-1.5 py-0.2 bg-zinc-850 text-white/40 rounded text-[7.5px]">SECURE</span>
          </div>

          <div className="flex items-center gap-2 justify-end w-20 text-white/40 text-[9px] font-bold">
            <span>1440px</span>
          </div>
        </div>

        {/* Scrollable content container with active theme background color */}
        <div className="w-full flex-1 overflow-y-auto scrollbar-thin scroll-smooth z-10" style={{ backgroundColor: style.colors.background }}>
          {renderWebsiteSections(false, "desktop")}
        </div>
      </motion.div>
    );
  };

  // If isStandalone is true, render the native fullscreen workbench directly on the screen
  if (isStandalone) {
    return (
      <div className="flex-1 w-full h-full flex flex-col overflow-hidden bg-[#08080a]">
        {/* Standalone sticky top bar */}
        {renderPremiumToolbar(true, device, setDevice, () => {
          if (typeof window !== "undefined") {
            window.location.href = "/design-studio";
          }
        })}

        {/* Immersive Sandbox Workbench Canvas */}
        <div
          ref={containerRef}
          className="flex-1 w-full bg-[#08080a] bg-[radial-gradient(#1e1e24_1.2px,transparent_1.2px)] [background-size:16px_16px] flex justify-center items-start p-6 overflow-y-auto scrollbar-thin relative"
        >
          <div
            style={{
              width: (device === "desktop" ? 1440 : device === "tablet" ? 768 : 414) * activeScale,
              height: (device === "desktop" ? 900 : device === "tablet" ? 1024 : 840) * activeScale,
              transition: "width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
            }}
            className="flex justify-center"
          >
            {renderSimulatedCanvas(device, activeScale)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full flex flex-col space-y-4">
        {/* 56px height primary simulator header */}
        {renderPremiumToolbar(false, device, setDevice, () => { })}

        {/* Main Simulation Viewport Sandbox */}
        <div
          ref={containerRef}
          className="w-full min-h-[650px] h-[720px] bg-[#08080a] bg-[radial-gradient(#1e1e24_1.2px,transparent_1.2px)] [background-size:16px_16px] border-4 border-black shadow-[4px_4px_0px_0px_#000] overflow-y-auto scrollbar-thin p-4 flex justify-center items-start relative rounded-none"
        >
          <div
            style={{
              width: (device === "desktop" ? 1440 : device === "tablet" ? 768 : 414) * activeScale,
              height: (device === "desktop" ? 900 : device === "tablet" ? 1024 : 840) * activeScale,
              transition: "width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
            }}
            className="flex justify-center"
          >
            {renderSimulatedCanvas(device, activeScale)}
          </div>
        </div>
      </div>

      {isFullscreen && mounted && createPortal(
        <div className="fixed inset-0 w-screen h-screen z-[9999] bg-[#060608]/99 backdrop-blur-xl flex flex-col overflow-hidden text-white">
          {/* Top Toolbar in Fullscreen Mode */}
          {renderPremiumToolbar(true, modalDevice, setModalDevice, () => setIsFullscreen(false))}

          {/* Fullscreen Sandbox Workbench Canvas */}
          <div
            className="flex-1 w-full bg-[#08080a] bg-[radial-gradient(#1e1e24_1.2px,transparent_1.2px)] [background-size:16px_16px] flex justify-center items-start p-8 overflow-y-auto scrollbar-thin relative"
          >
            <div
              style={{
                width: (modalDevice === "desktop" ? 1440 : modalDevice === "tablet" ? 768 : 414) * activeModalScale,
                height: (modalDevice === "desktop" ? 900 : modalDevice === "tablet" ? 1024 : 840) * activeModalScale,
                transition: "width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
              }}
              className="flex justify-center"
            >
              {renderSimulatedCanvas(modalDevice, activeModalScale)}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
