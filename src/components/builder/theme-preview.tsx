"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { DesignStyle } from "@/types/builder";
import { useBuilderStore } from "@/store/builder-store";
import {
  Monitor, Tablet, Smartphone, Globe, RefreshCw, Maximize2, Minimize2,
  ExternalLink, Mail, Check, Star, Menu, X, ChevronDown, ChevronUp, Zap, Sparkles
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
  switch (themeId) {
    case "monochrome":
      if (type === "hero") {
        return (
          <div className="w-full h-full border border-black bg-white flex flex-col justify-between p-3.5 relative font-mono text-[8px] tracking-wider uppercase select-none">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:16px_16px] opacity-[0.03]" />
            <div className="flex justify-between items-center border-b border-black pb-1.5 relative z-10">
              <span className="font-bold">EDITORIAL // SHOT 01</span>
              <span>MUBASHIR PORTFOLIO</span>
            </div>
            
            <div className="flex-1 my-2 border border-black bg-white overflow-hidden relative group z-10 flex">
              <div className="w-[45%] h-full border-r border-black relative overflow-hidden shrink-0 bg-neutral-100">
                 <SmartPortraitImage src="/mubashir.jpeg" alt="Mubashir" themeId="monochrome" type="hero" className="hover:scale-[1.05] transition-transform duration-700" />
                 <div className="absolute bottom-1 left-1 bg-black text-white px-1.5 py-0.5 text-[5px] tracking-widest font-bold z-20">
                   FOUNDER // ARCHITECT
                 </div>
              </div>
              <div className="flex-1 p-3 flex flex-col justify-center items-center text-center bg-white">
                <div className="font-serif text-[16px] leading-none font-black uppercase text-black">Editorial<br/>Volume I</div>
                <div className="w-6 h-[1px] bg-black my-2" />
                <div className="text-[6px] tracking-widest text-neutral-500">MUBASHIR.DEV</div>
              </div>
            </div>

            <div className="flex justify-between items-center text-[7.5px] relative z-10 border-t border-black pt-1.5">
              <span>SCALE: 1:1.0</span>
              <span>MONOCHROME STUDIO</span>
            </div>
          </div>
        );
      }
      if (type === "content") {
        return (
          <div className="w-full h-full border border-black bg-white flex flex-col justify-between p-3 font-mono text-[8px] select-none">
            <div className="flex justify-between items-center border-b border-black/10 pb-1.5">
              <span className="font-black tracking-widest">ARCHITECTURAL SPECTROGRAM</span>
              <span className="w-2 h-2 bg-black rounded-full" />
            </div>
            <div className="flex-1 my-2 overflow-hidden border border-black relative bg-neutral-100 flex">
              <div className="w-[40%] h-full relative border-r border-black">
                <SmartPortraitImage src="/mubashir.jpeg" alt="Mubashir" themeId="monochrome" type="content" />
              </div>
              <div className="flex-1 bg-white p-2 flex flex-col justify-center">
                 <div className="w-full h-[1px] bg-black mb-1.5" />
                 <div className="w-2/3 h-[1px] bg-black/20" />
              </div>
              <div className="w-8 border-l border-black bg-white flex items-center justify-center shrink-0">
                <span className="rotate-90 text-[5px] whitespace-nowrap font-bold">COORD: 40.52N</span>
              </div>
            </div>
            <span className="text-right text-[7px] opacity-60">REF: MONO_SPECTRO_09</span>
          </div>
        );
      }
      if (type === "card") {
        return (
          <div className="w-full h-10 border-b border-black/10 flex items-center justify-between font-mono text-[7px] text-neutral-400 select-none pb-1">
            <span>GRID_UNIT_0{index + 1}</span>
            <svg className="w-6 h-6 stroke-black/25 fill-none stroke-[0.5px]" viewBox="0 0 20 20">
              <rect x="2" y="2" width="16" height="16" />
              <line x1="2" y1="2" x2="18" y2="18" />
            </svg>
          </div>
        );
      }
      return (
        <div className="w-6 h-6 rounded-full border border-black overflow-hidden shrink-0">
          <SmartPortraitImage src="/mubashir.jpeg" alt="Mubashir" themeId="monochrome" type="avatar" />
        </div>
      );

    case "bauhaus":
      if (type === "hero") {
        return (
          <div className="w-full h-full border-4 border-black bg-[#FFFFFF] flex flex-col justify-between p-3 relative overflow-hidden select-none">
            <div className="absolute top-0 right-0 w-16 h-16 bg-[#D02020] border-l-4 border-b-4 border-black z-0" />
            <div className="absolute bottom-0 left-0 w-12 h-12 bg-[#1040C0] border-t-4 border-r-4 border-black z-0" />
            
            <div className="flex justify-between items-center relative z-20 font-sans font-black text-[9px] text-black">
              <span>BAUHAUS MODEL 1925</span>
              <span>MUBASHIR OS</span>
            </div>
            
            <div className="flex-1 my-1.5 flex gap-2 relative z-10">
              <div className="w-[60%] h-full border-4 border-black bg-white shadow-[4px_4px_0px_0px_#121212] overflow-hidden relative group">
                <SmartPortraitImage src="/mubashir.jpeg" alt="Mubashir" themeId="bauhaus" type="hero" className="hover:scale-[1.05] transition-transform duration-700" />
                <div className="absolute top-2 left-2 bg-[#F0C020] border-2 border-black px-1.5 py-0.5 text-[6.5px] font-black uppercase z-20">
                  FORM & FUNCTION
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <div className="w-full flex-1 border-4 border-black bg-[#D02020] shadow-[2px_2px_0px_0px_#121212]" />
                <div className="w-full flex-1 border-4 border-black bg-[#1040C0] shadow-[2px_2px_0px_0px_#121212]" />
              </div>
            </div>

            <div className="flex justify-between items-center relative z-20 text-[8px] font-sans font-black text-black">
              <span>STAATLICHES WEIMAR</span>
              <span>ARCHITECTURE 01</span>
            </div>
          </div>
        );
      }
      if (type === "content") {
        return (
          <div className="w-full h-full border-4 border-black bg-[#F0C020] flex flex-col justify-between p-3 font-sans font-black text-[8px] relative overflow-hidden select-none">
            <div className="absolute top-0 left-0 w-10 h-32 bg-[#D02020] border-r-4 border-black rotate-[-15deg] origin-top z-0" />
            <div className="flex justify-between items-center relative z-10">
              <span>COMPOSITION II // MUBASHIR</span>
              <span className="w-3 h-3 bg-[#1040C0] border-2 border-black rounded-full" />
            </div>
            <div className="flex-1 my-2 border-4 border-black bg-white shadow-[3px_3px_0px_0px_#121212] overflow-hidden relative z-10 flex">
              <div className="w-[45%] h-full relative border-r-4 border-black bg-white">
                <SmartPortraitImage src="/mubashir.jpeg" alt="Mubashir" themeId="bauhaus" type="content" />
              </div>
              <div className="flex-1 flex flex-col bg-white">
                 <div className="flex-1 border-b-4 border-black bg-[#D02020]" />
                 <div className="flex-1 flex items-center justify-center">
                    <span className="text-[6px] font-black">MODULE_B</span>
                 </div>
              </div>
              <div className="w-5 border-l-4 border-black bg-[#1040C0] shrink-0" />
            </div>
            <span className="text-right text-[8px] relative z-10 bg-white border border-black px-1.5 py-0.5 inline-block self-end shadow-[1.5px_1.5px_0px_0px_#000]">WEIMAR ARCHIVE</span>
          </div>
        );
      }
      if (type === "card") {
        return (
          <div className="w-full h-6 border-b-2 border-black flex items-center gap-1.5 font-sans font-black text-[8px] select-none pb-1 mb-2">
            <span className="w-2.5 h-2.5 bg-[#D02020] border border-black" />
            <span className="w-2.5 h-2.5 bg-[#1040C0] border border-black rounded-full" />
            <span className="w-2.5 h-2.5 bg-[#F0C020] border border-black" />
            <span className="text-black/50 ml-auto font-mono text-[7px]">MODULE_0{index + 1}</span>
          </div>
        );
      }
      return (
        <div className="w-7 h-7 rounded-full border-2 border-black overflow-hidden shadow-[1.5px_1.5px_0px_0px_#000] shrink-0 bg-white">
          <SmartPortraitImage src="/mubashir.jpeg" alt="Mubashir" themeId="bauhaus" type="avatar" />
        </div>
      );

    case "modern-dark":
      if (type === "hero") {
        return (
          <div className="w-full h-full rounded-xl border border-white/5 bg-[#0a0a0c]/80 backdrop-blur-md flex flex-col justify-between p-3.5 relative overflow-hidden select-none shadow-inner">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#5E6AD2]/10 rounded-full blur-2xl z-0" />
            <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl z-0" />
            
            <div className="flex justify-between items-center relative z-10 text-[8.5px] font-mono text-neutral-500">
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#5E6AD2] animate-pulse" /> CYBER_MUBASHIR</span>
              <span>MUBIX_DNA v2.4</span>
            </div>
            
            <div className="flex-1 my-1.5 flex gap-3 relative z-10">
              <div className="w-[55%] h-full rounded-lg border border-[#5E6AD2]/40 bg-black/60 shadow-[0_0_15px_rgba(94,106,210,0.2)] relative overflow-hidden group">
                <SmartPortraitImage src="/mubashir.jpeg" alt="Mubashir" themeId="modern-dark" type="hero" className="opacity-90 group-hover:opacity-100 hover:scale-[1.05] transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/20 to-transparent pointer-events-none z-20" />
                <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center text-white font-mono text-[7px] font-bold z-30">
                  <span className="flex items-center gap-1">FOUNDER <Sparkles className="w-2.5 h-2.5 text-cyan-400 animate-pulse" /></span>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-2 justify-center pr-2">
                 <div className="h-1.5 w-full bg-[#5E6AD2]/20 rounded-full overflow-hidden"><div className="h-full w-3/4 bg-[#5E6AD2]" /></div>
                 <div className="h-1.5 w-full bg-cyan-500/20 rounded-full overflow-hidden"><div className="h-full w-1/2 bg-cyan-400" /></div>
                 <div className="h-1.5 w-full bg-purple-500/20 rounded-full overflow-hidden"><div className="h-full w-5/6 bg-purple-500" /></div>
                 <span className="text-[6px] font-mono text-[#5E6AD2] mt-1">NEURAL_LINK_STABLE</span>
              </div>
            </div>
            
            <div className="flex justify-between text-[7px] font-mono text-neutral-550 border-t border-white/5 pt-2 relative z-10">
              <span>TELEMETRY: OK</span>
              <span>HOLO_MATRIX_ON</span>
            </div>
          </div>
        );
      }
      if (type === "content") {
        return (
          <div className="w-full h-full rounded-xl border border-white/5 bg-black p-3 font-mono text-[8px] relative overflow-hidden flex flex-col justify-between select-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl z-0" />
            <div className="flex justify-between items-center relative z-10 border-b border-white/5 pb-2">
              <span className="text-white font-bold">CYBERNETIC_BADGE</span>
              <span className="text-cyan-400 font-bold">NODE_01</span>
            </div>
            <div className="flex-1 my-2 flex justify-center items-center relative z-10">
              <div className="w-20 h-20 rounded-full border-2 border-cyan-400 p-[3px] bg-black shadow-[0_0_15px_rgba(34,211,238,0.2)] overflow-hidden relative">
                <SmartPortraitImage src="/mubashir.jpeg" alt="Mubashir" themeId="modern-dark" type="avatar" className="rounded-full" />
              </div>
            </div>
            <span className="text-neutral-500 text-center text-[7px] relative z-10">NODE_IDENTITY_ACTIVE</span>
          </div>
        );
      }
      if (type === "card") {
        return (
          <div className="w-full h-5 border-b border-white/5 flex items-center justify-between font-mono text-[7px] text-neutral-550 select-none pb-1.5 mb-1.5">
            <span className="text-[#5E6AD2] flex items-center gap-1"><Zap className="w-2.5 h-2.5" /> SECURE_TKN</span>
            <span>SHIELDS_UP</span>
          </div>
        );
      }
      return (
        <div className="w-7 h-7 rounded-full border border-[#5E6AD2] p-[1px] bg-zinc-900 overflow-hidden shadow-md shrink-0">
          <SmartPortraitImage src="/mubashir.jpeg" alt="Mubashir" themeId="modern-dark" type="avatar" className="rounded-full" />
        </div>
      );

    case "newsprint":
      if (type === "hero") {
        return (
          <div className="w-full h-full border border-black bg-[#F9F9F7] flex flex-col justify-between p-3.5 relative font-serif select-none">
            <div className="absolute inset-0 bg-[radial-gradient(#111_0.5px,transparent_0.5px)] [background-size:8px_8px] opacity-[0.03]" />
            <div className="flex justify-between items-center border-b border-black pb-1.5 text-[9px] uppercase tracking-wide relative z-10">
              <span className="font-bold">THE DAILY COMPILER</span>
              <span>VOL. LXIV No. 24</span>
            </div>
            
            <div className="flex-1 my-1.5 border-y-2 border-black flex overflow-hidden relative z-10 group">
              <div className="flex-1 p-2 border-r border-black flex flex-col gap-1.5 bg-[#F9F9F7] justify-center items-center text-center">
                <div className="w-full h-[1px] bg-black/20" />
                <div className="text-[12px] font-black font-serif leading-none">THE<br/>ARCHITECT</div>
                <div className="w-full h-[1px] bg-black/20" />
              </div>
              <div className="w-[55%] h-full relative overflow-hidden p-0.5 bg-white">
                <SmartPortraitImage src="/mubashir.jpeg" alt="Mubashir" themeId="newsprint" type="hero" className="hover:scale-[1.05] transition-transform duration-700" />
                <div className="absolute bottom-1 right-1 bg-white border border-black px-1.5 py-0.5 text-[5px] font-sans font-bold z-20">
                  MUBASHIR COMPILING
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center text-[7.5px] uppercase relative z-10 border-t border-black/20 pt-1.5">
              <span>NEWSROOM PROFILE</span>
              <span>EDITION: SUNDAY</span>
            </div>
          </div>
        );
      }
      if (type === "content") {
        return (
          <div className="w-full h-full border border-black bg-white flex flex-col justify-between p-3 font-serif text-[8.5px] select-none">
            <div className="flex justify-between items-center border-b border-black/10 pb-1.5">
              <span className="font-black tracking-tight">EDITORIAL // ARCHITECT IN CHIEF</span>
              <span>1890</span>
            </div>
            <div className="flex-1 my-2 overflow-hidden border border-black flex bg-white">
              <div className="w-[35%] h-full relative border-r border-black shrink-0">
                <SmartPortraitImage src="/mubashir.jpeg" alt="Mubashir" themeId="newsprint" type="content" />
              </div>
              <div className="flex-1 p-2 flex flex-col gap-1 justify-center bg-[#F9F9F7]">
                 <div className="w-full h-[1px] bg-black/20" />
                 <div className="w-5/6 h-[1px] bg-black/20" />
                 <div className="w-4/6 h-[1px] bg-black/20" />
              </div>
            </div>
            <span className="text-right text-[7px] italic text-neutral-500 pt-0.5">PLATE NO. 14 // MUBASHIR</span>
          </div>
        );
      }
      if (type === "card") {
        return (
          <div className="w-full h-5 border-b border-black/10 flex items-center justify-between font-serif text-[8.5px] text-neutral-550 italic select-none pb-1.5 mb-1.5">
            <span>Section {index + 1}</span>
            <span className="font-mono text-[7px] not-italic">COLUMN_L</span>
          </div>
        );
      }
      return (
        <div className="w-7 h-7 rounded-none border border-black bg-[#111] overflow-hidden shrink-0">
          <SmartPortraitImage src="/mubashir.jpeg" alt="Mubashir" themeId="newsprint" type="avatar" />
        </div>
      );

    default: // SaaS Modern
      if (type === "hero") {
        return (
          <div className="w-full h-full rounded-2xl border border-neutral-150 bg-white flex flex-col justify-between p-4 relative overflow-hidden select-none shadow-lg shadow-blue-500/5">
            <div className="absolute top-0 right-0 w-36 h-36 bg-blue-55 rounded-full blur-3xl z-0" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-50 rounded-full blur-2xl z-0" />
            
            <div className="flex justify-between items-center relative z-10 text-[9px] font-bold text-slate-400">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> SYSTEM BLUEPRINT TELEMETRY</span>
              <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[7.5px] font-black uppercase">v3.8 OK</span>
            </div>

            <div className="flex-1 my-2 flex gap-3 relative z-10">
               <div className="w-[45%] h-full bg-slate-50 border border-slate-200 rounded-xl overflow-hidden relative shadow-sm group">
                  <SmartPortraitImage src="/mubashir.jpeg" alt="Mubashir" themeId="saas" type="hero" className="opacity-40 group-hover:opacity-50 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/20 z-10" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-2 z-20">
                     <div className="w-12 h-12 rounded-full border-2 border-white shadow-md overflow-hidden shrink-0 mb-1 relative">
                        <SmartPortraitImage src="/mubashir.jpeg" alt="Mubashir" themeId="saas" type="avatar" className="hover:scale-110 transition-transform duration-500" />
                     </div>
                     <span className="text-[8px] font-black text-slate-800">Mubashir</span>
                     <span className="text-[6px] text-blue-600 font-bold uppercase tracking-wider">Founder</span>
                  </div>
               </div>
               
               <div className="flex-1 flex flex-col gap-2 justify-center">
                 <div className="bg-white border border-slate-100 rounded-lg p-2 shadow-sm flex items-center justify-between">
                    <span className="text-[6.5px] font-bold text-slate-500">System Uptime</span>
                    <span className="text-[7.5px] font-black text-emerald-600">99.9%</span>
                 </div>
                 <div className="bg-white border border-slate-100 rounded-lg p-2 shadow-sm flex items-center justify-between">
                    <span className="text-[6.5px] font-bold text-slate-500">Compile Speed</span>
                    <span className="text-[7.5px] font-black text-blue-600">0.2ms</span>
                 </div>
               </div>
            </div>
            
            <div className="flex justify-between items-center text-[7.5px] font-bold text-slate-400 relative z-10 border-t border-slate-100 pt-2">
              <span>Secure Session: Active</span>
              <span>Compiler: Mubashir</span>
            </div>
          </div>
        );
      }
      if (type === "content") {
        return (
          <div className="w-full h-full rounded-2xl border border-neutral-150 bg-white p-3 font-sans text-[8.5px] relative overflow-hidden flex flex-col justify-between shadow-sm select-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-55/50 rounded-full blur-2xl z-0" />
            <div className="flex justify-between items-center relative z-10 border-b border-slate-100 pb-1.5">
              <span className="text-slate-900 font-black">Founder Testimonial</span>
              <span className="text-blue-600 font-bold">verified</span>
            </div>
            
            <div className="flex-1 my-2 flex gap-3 items-center relative z-10">
              <div className="w-14 h-14 rounded-xl border border-slate-200 overflow-hidden shrink-0 shadow-sm relative">
                <SmartPortraitImage
                  src="/mubashir.jpeg"
                  alt="Mubashir"
                  themeId="saas"
                  type="content"
                />
              </div>
              <p className="text-[7.5px] text-slate-500 italic leading-tight text-left">
                "We unified typography constraints, grid ratios, and HSL tokens in strict schemas, allowing builders to ship visual landing sites that never degrade."
              </p>
            </div>

            <span className="text-slate-400 text-right text-[7px] relative z-10 font-bold uppercase tracking-wider">— MUBASHIR, MUBIX ARCHITECT</span>
          </div>
        );
      }
      if (type === "card") {
        return (
          <div className="w-full h-6 border-b border-slate-100 flex items-center justify-between font-sans text-[8.5px] text-slate-400 select-none pb-1.5 mb-2">
            <span className="text-[#0052FF] font-black flex items-center gap-1"><Sparkles className="w-3.5 h-3.5" /> Core Feature</span>
            <span className="px-1.5 py-0.5 bg-blue-55 text-blue-600 rounded-md text-[6.5px] font-black uppercase">BLUEPRINT</span>
          </div>
        );
      }
      return (
        <div className="w-7 h-7 rounded-full border border-blue-200 overflow-hidden shadow-sm shrink-0 bg-blue-50">
          <SmartPortraitImage
            src="/mubashir.jpeg"
            alt="Mubashir"
            themeId="saas"
            type="avatar"
          />
        </div>
      );
  }
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
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
        </svg>
      );
    case "x":
    case "twitter":
      return (
        <svg viewBox="0 0 24 24" className={solidIconClass}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
          <rect width="4" height="12" x="2" y="9"/>
          <circle cx="4" cy="4" r="2" fill="currentColor"/>
        </svg>
      );
    case "github":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
          <path d="M9 18c-4.51 2-5-2-7-2"/>
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/>
          <polygon points="10 15 15 12 10 9 10 15" fill="currentColor"/>
        </svg>
      );
    case "dribbble":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94"/>
          <path d="M21.75 12.84c-6.62-1.41-12.15 1-14.88 6.65"/>
          <path d="M5.16 19.17c3.73-8.87 11-12.63 16.59-13.78"/>
        </svg>
      );
    case "behance":
      return (
        <svg viewBox="0 0 24 24" className={solidIconClass}>
          <path d="M22 12c0-3-2-4.5-4.5-4.5S13 9 13 12.5s2 4.5 4.5 4.5S22 15.5 22 12zm-4.5 2.5c-.8 0-1.5-.4-1.5-1.5h3c0 1.1-.7 1.5-1.5 1.5zm0-4c.7 0 1.3.4 1.3 1.2h-2.6c0-.8.6-1.2 1.3-1.2zM9 13c0 1.7-1.3 2-3.3 2H2V7h3.7c1.7 0 3 .5 3 2 0 1-.7 1.5-1.5 1.7.9.3 1.8.8 1.8 2.3zm-5-4v2h1.5c.7 0 1-.2 1-1s-.3-1-1-1H4zm0 3.5v2h1.7c.7 0 1.1-.3 1.1-1s-.4-1-1.1-1H4zM15 6h5v1h-5z"/>
        </svg>
      );
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
        </svg>
      );
    case "discord":
      return (
        <svg viewBox="0 0 127.14 96.36" className={solidIconClass}>
          <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.43-5c.87-.64,1.72-1.32,2.53-2a75.76,75.76,0,0,0,72.63,0c.81.71,1.66,1.39,2.53,2a68.43,68.43,0,0,1-10.43,5,77.7,77.7,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31-18.83C129.87,48.24,123.63,25.41,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z"/>
        </svg>
      );
    case "whatsapp":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
      );
    case "telegram":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" x2="11" y1="2" y2="13"/>
          <polygon points="22 2 15 22 11 13 2 9 22 2"/>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className={iconClass} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="2" x2="22" y1="12" y2="12"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
      );
  }
};

export function ThemePreview({ style, device, setDevice, isStandalone = false }: ThemePreviewProps) {
  const { selectedCategory, selectedSections, websiteContent, resumeData, activeSocials } = useBuilderStore();
  const isPortfolio = selectedCategory?.id === "portfolio";

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [modalDevice, setModalDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  
  // Interactive simulator states
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [emailInput, setEmailInput] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [activePricingTier, setActivePricingTier] = useState<"starter" | "pro" | "enterprise">("pro");

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
    switch (style.id) {
      case "monochrome":
        return {
          canvas: "bg-[#FFFFFF] text-[#000000] font-serif border-t-8 border-black relative overflow-hidden transition-all duration-300",
          navbar: "border-b border-black py-4 px-6 flex justify-between items-center bg-[#FFFFFF]",
          logo: "font-serif font-black uppercase tracking-tighter text-sm bg-black text-white px-2 py-0.5",
          navLinks: "hidden md:flex gap-6 items-center",
          navLink: "text-[10px] font-bold uppercase text-black hover:underline tracking-wider cursor-pointer",
          navBtn: "hidden md:inline-block px-4 py-1.5 bg-black text-white font-mono uppercase text-[9px] border border-black hover:bg-white hover:text-black transition-colors rounded-none",
          mobileMenuBtn: "p-1 text-black",
          mobileMenuOverlay: "border-b border-black bg-white p-6 space-y-4 flex flex-col font-bold text-xs uppercase relative z-50",
          
          // Hero
          hero: "border-b border-black bg-[#FFFFFF]",
          badge: "inline-block px-3 py-0.5 bg-black text-white font-mono uppercase tracking-widest",
          h1: "font-black uppercase tracking-tighter leading-none text-black",
          h1Span: "underline decoration-2 underline-offset-4 block mt-1 font-normal italic lowercase",
          lead: "text-neutral-800 leading-relaxed",
          btnGroup: "flex flex-wrap gap-3",
          btnPrimary: "px-5 py-2.5 bg-black text-white font-mono uppercase tracking-wider border border-black hover:bg-white hover:text-black transition-colors rounded-none",
          btnSecondary: "px-5 py-2.5 border border-black bg-white text-black font-mono uppercase tracking-wider hover:bg-black hover:text-white transition-colors rounded-none",
          heroVisual: "border border-black p-0 overflow-hidden flex flex-col justify-center items-center bg-[#F5F5F5] font-mono text-[9px] uppercase",
          
          // Social proof
          statsSec: "bg-[#FFFFFF] border-b border-black text-center",
          statNum: "font-black tracking-tighter border-b border-black/10 pb-1 inline-block",
          statLabel: "font-mono uppercase tracking-widest text-neutral-500 block pt-1",

          // Features
          featuresSec: "border-b border-black bg-[#FFFFFF] space-y-8",
          card: "border border-black bg-[#FFFFFF] p-6 space-y-3 rounded-none shadow-none hover:bg-[#F5F5F5] transition-colors",
          cardTitle: "font-serif font-black uppercase text-xs text-black border-b border-black/10 pb-1.5",
          cardDesc: "text-[11px] text-neutral-700 leading-relaxed",

          // Content showcase
          contentSec: "border-b border-black bg-[#F5F5F5]",
          contentTag: "text-[8px] font-mono text-neutral-500 uppercase tracking-widest block",
          contentH: "font-black uppercase tracking-tight text-black font-serif",
          contentBody: "leading-relaxed space-y-3",
          contentVisual: "border border-black bg-white p-0 overflow-hidden h-52 flex flex-col justify-between font-serif italic text-sm text-neutral-800",

          // Pricing
          pricingSec: "bg-[#FFFFFF] border-b border-black text-center space-y-8",
          priceCard: "border border-black p-6 rounded-none text-left space-y-4 cursor-pointer transition-all",
          priceTitle: "font-serif font-black uppercase text-xs tracking-wider",
          priceNum: "tracking-tight font-black",
          priceBtn: "w-full py-2 bg-black text-white font-mono uppercase text-[9.5px] tracking-wider border border-black hover:bg-white hover:text-black transition-colors rounded-none",

          // FAQ
          faqSec: "bg-[#FFFFFF] border-b border-black space-y-8 max-w-3xl mx-auto",
          faqItem: "border-b border-black py-4",
          faqQ: "flex justify-between items-center cursor-pointer font-bold uppercase tracking-wide",
          faqA: "text-[11px] text-neutral-700 leading-relaxed pt-2.5 pl-1.5",

          // Footer
          ctaSec: "bg-[#F5F5F5] text-center space-y-4 border-b border-black",
          input: "border border-black p-2 text-xs font-mono bg-white focus:outline-none placeholder-neutral-400 rounded-none",
          footer: "grid gap-6 text-[10px] font-mono uppercase text-neutral-500 rounded-none bg-[#FFFFFF]"
        };

      case "bauhaus":
        return {
          canvas: "bg-[#FFFFFF] text-[#121212] font-sans border-t-8 border-[#D02020] relative overflow-hidden transition-all duration-300",
          navbar: "border-4 border-black p-3 bg-white flex justify-between items-center shadow-[3px_3px_0px_0px_#1040C0] mx-4 my-2 rounded-none",
          logo: "font-sans font-black uppercase tracking-tight text-xs bg-[#D02020] text-white px-2 py-0.5 border-2 border-black rotate-[-2deg] shadow-[1.5px_1.5px_0px_0px_#121212]",
          navLinks: "hidden md:flex gap-6 items-center",
          navLink: "text-[9px] font-black uppercase text-black hover:text-[#1040C0] tracking-wider cursor-pointer",
          navBtn: "hidden md:inline-block px-4 py-1.5 bg-[#F0C020] text-black font-black uppercase text-[9px] border-2 border-black shadow-[2px_2px_0px_0px_#121212] hover:shadow-none active:translate-y-0.5",
          mobileMenuBtn: "p-1 text-black",
          mobileMenuOverlay: "bg-[#F0C020] border-4 border-black p-6 space-y-4 flex flex-col font-bold text-xs uppercase relative z-50 mx-4 shadow-[4px_4px_0px_0px_#121212]",
          
          // Hero
          hero: "border-4 border-black bg-[#F0C020]/10 mx-4 my-3 shadow-[6px_6px_0px_0px_#121212] rounded-none",
          badge: "inline-block px-2.5 py-0.5 bg-[#1040C0] text-white border-2 border-black font-sans font-black uppercase tracking-wider rotate-[1deg]",
          h1: "font-sans font-black uppercase tracking-tight leading-none text-black",
          h1Span: "text-[#D02020] block mt-1 font-black",
          lead: "font-bold text-neutral-800 leading-relaxed",
          btnGroup: "flex flex-wrap gap-3",
          btnPrimary: "px-5 py-2.5 border-4 border-black bg-[#D02020] text-white font-black uppercase tracking-wide shadow-[3px_3px_0px_0px_#121212] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-none transition-all rounded-none",
          btnSecondary: "px-5 py-2.5 border-4 border-black bg-[#FFFFFF] text-black font-black uppercase tracking-wide shadow-[3px_3px_0px_0px_#121212] hover:bg-neutral-55 rounded-none",
          heroVisual: "border-4 border-black bg-white p-0 overflow-hidden flex items-center justify-center shadow-[4px_4px_0px_0px_#1040C0]",

          // Social proof
          statsSec: "bg-white border-4 border-black mx-4 shadow-[4px_4px_0px_0px_#1040C0] text-center",
          statNum: "font-black text-[#D02020] tracking-tight block",
          statLabel: "font-sans font-black uppercase text-black block",

          // Features
          featuresSec: "space-y-8",
          card: "border-4 border-black bg-white p-5 shadow-[4px_4px_0px_0px_#1040C0] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#1040C0] transition-all rounded-none space-y-2",
          cardTitle: "font-sans font-black uppercase text-[11px] text-black tracking-tight",
          cardDesc: "text-[11px] font-bold text-neutral-700 leading-normal",

          // Content Showcase
          contentSec: "mx-4 my-3 border-4 border-black bg-[#1040C0]/10 shadow-[4px_4px_0px_0px_#121212]",
          contentTag: "text-[8px] font-black uppercase text-[#D02020] tracking-wider block",
          contentH: "font-black uppercase tracking-tight text-black",
          contentBody: "font-bold text-neutral-800 leading-relaxed space-y-3",
          contentVisual: "border-4 border-black bg-white h-52 overflow-hidden flex flex-col justify-between p-0 shadow-[4px_4px_0px_0px_#121212]",

          // Pricing
          pricingSec: "mx-4 my-3 border-4 border-black bg-white text-center space-y-8 shadow-[6px_6px_0px_0px_#D02020]",
          priceCard: "border-4 border-black p-5 text-left rounded-none space-y-3 shadow-[3px_3px_0px_0px_#121212] cursor-pointer transition-all bg-white",
          priceTitle: "font-sans font-black uppercase text-[10px] tracking-wide",
          priceNum: "font-black text-[#1040C0] tracking-tight",
          priceBtn: "w-full py-2.5 border-4 border-black bg-[#D02020] text-white font-black uppercase tracking-wide shadow-[2px_2px_0px_0px_#121212]",

          // FAQ
          faqSec: "mx-4 border-4 border-black bg-[#FFFDF5] shadow-[4px_4px_0px_0px_#1040C0] space-y-6",
          faqItem: "border-2 border-black p-4 bg-white shadow-[2px_2px_0px_0px_#121212]",
          faqQ: "flex justify-between items-center cursor-pointer font-black uppercase tracking-wider text-black",
          faqA: "text-[11px] font-bold text-neutral-700 leading-relaxed pt-2.5 pl-1",

          // Footer
          ctaSec: "mx-4 my-4 border-4 border-black bg-[#F0C020] shadow-[4px_4px_0px_0px_#1040C0] text-center space-y-4",
          input: "border-4 border-black p-1.5 text-xs font-bold bg-white focus:outline-none placeholder-black/40 rounded-none",
          footer: "border-t-4 border-black p-5 flex flex-col justify-between items-center gap-4 text-[9px] font-black uppercase text-black bg-[#FFFFFF]"
        };

      case "modern-dark":
        return {
          canvas: "bg-[#050506] text-[#EDEDEF] font-sans relative overflow-hidden transition-all duration-300",
          navbar: "border border-white/5 py-3 px-5 flex justify-between items-center bg-[#0a0a0c]/60 backdrop-blur-md rounded-xl mx-4 my-2",
          logo: "font-sans font-black tracking-wider text-xs text-transparent bg-clip-text bg-gradient-to-r from-[#5E6AD2] to-cyan-400 uppercase",
          navLinks: "hidden md:flex gap-6 items-center",
          navLink: "text-[9.5px] font-bold text-neutral-400 hover:text-white transition-colors cursor-pointer",
          navBtn: "hidden md:inline-block px-4 py-1.5 bg-[#5E6AD2] text-white font-bold text-[9px] rounded-lg shadow-md shadow-indigo-500/10 hover:opacity-90 active:scale-95 transition-all",
          mobileMenuBtn: "p-1 text-neutral-400 hover:text-white",
          mobileMenuOverlay: "bg-[#050506]/95 backdrop-blur-md p-6 space-y-4 flex flex-col font-bold text-xs uppercase relative z-50 border-b border-white/5",
          
          // Hero
          hero: "border border-white/5 bg-gradient-to-b from-[#0a0a0c]/80 to-transparent mx-4 my-3 rounded-2xl shadow-[0_0_40px_rgba(94,106,210,0.06)] relative overflow-hidden",
          badge: "inline-block px-2.5 py-0.5 bg-[#5E6AD2]/10 text-[#5E6AD2] border border-[#5E6AD2]/25 rounded-full font-bold uppercase",
          h1: "font-sans font-black tracking-tight text-white leading-none",
          h1Span: "text-transparent bg-clip-text bg-gradient-to-r from-[#5E6AD2] to-indigo-400 block mt-1",
          lead: "text-neutral-400 leading-relaxed",
          btnGroup: "flex flex-wrap gap-3",
          btnPrimary: "px-5 py-2.5 bg-[#5E6AD2] text-white font-bold tracking-wide rounded-lg shadow-lg shadow-indigo-500/20 hover:opacity-90 transition-all active:scale-[0.98]",
          btnSecondary: "px-5 py-2.5 border border-neutral-850 bg-white/5 text-neutral-300 font-bold tracking-wide rounded-lg hover:bg-white/10 transition-colors",
          heroVisual: "bg-[#0a0a0c]/60 border border-neutral-850 p-0 overflow-hidden rounded-xl flex items-center justify-center shadow-inner relative",

          // Social proof
          statsSec: "border-y border-white/5 bg-[#050506] text-center",
          statNum: "font-black text-white tracking-tight block",
          statLabel: "font-bold text-neutral-400 uppercase tracking-widest block",

          // Features
          featuresSec: "space-y-8",
          card: "bg-[#0a0a0c]/60 border border-neutral-850 p-5 rounded-xl space-y-2.5 shadow-xl backdrop-blur-md hover:border-[#5E6AD2] hover:shadow-[0_0_15px_rgba(94,106,210,0.1)] transition-all",
          cardTitle: "font-sans font-black text-[11px] text-white tracking-tight flex items-center gap-1.5",
          cardDesc: "text-[11px] text-neutral-400 leading-relaxed",

          // Content Showcase
          contentSec: "border border-white/5 bg-[#0a0a0c]/60 rounded-2xl mx-4",
          contentTag: "text-[8px] font-bold uppercase text-[#5E6AD2] tracking-wider block",
          contentH: "font-black tracking-tight text-white",
          contentBody: "text-neutral-400 leading-relaxed space-y-3",
          contentVisual: "bg-[#050506] border border-neutral-850 p-0 h-52 rounded-xl flex flex-col justify-between shadow-2xl relative overflow-hidden",

          // Pricing
          pricingSec: "mx-4 my-3 border border-white/5 bg-[#0a0a0c]/40 rounded-2xl text-center space-y-6",
          priceCard: "bg-[#0a0a0c]/80 border border-neutral-850 p-5 text-left rounded-xl space-y-3 cursor-pointer transition-all hover:border-[#5E6AD2]",
          priceTitle: "font-sans font-bold text-[10px] text-slate-400 uppercase tracking-wider",
          priceNum: "font-black text-white tracking-tight",
          priceBtn: "w-full py-2 bg-[#5E6AD2] text-white font-bold rounded-lg shadow-md",

          // FAQ
          faqSec: "border border-white/5 bg-[#0a0a0c]/60 rounded-2xl max-w-2xl mx-auto space-y-6",
          faqItem: "border-b border-neutral-800 pb-4",
          faqQ: "flex justify-between items-center cursor-pointer font-bold uppercase tracking-wider text-white",
          faqA: "text-[11px] text-neutral-400 leading-relaxed pt-2.5 pl-1",

          // Footer
          ctaSec: "mx-4 my-3 border border-white/5 bg-gradient-to-r from-[#0a0a0c] to-[#0c0c10] rounded-2xl text-center space-y-4",
          input: "border border-neutral-800 bg-black/40 rounded-lg p-1.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#5E6AD2]",
          footer: "border-t border-neutral-900 p-5 flex flex-col justify-between items-center gap-4 text-[9px] font-bold text-neutral-500 bg-[#050506]"
        };

      case "newsprint":
        return {
          canvas: "bg-[#F9F9F7] text-[#111111] font-serif relative overflow-hidden transition-all duration-300",
          navbar: "border-y-2 border-black py-3 px-4 flex justify-between items-center bg-[#F9F9F7]",
          logo: "font-serif font-black uppercase text-base text-black tracking-tight",
          navLinks: "hidden md:flex gap-6 items-center",
          navLink: "text-[9px] font-black uppercase text-black hover:underline tracking-wider cursor-pointer",
          navBtn: "hidden md:inline-block px-4 py-1.5 bg-black text-white font-serif font-bold text-[9px] rounded-none hover:bg-neutral-800 transition-colors",
          mobileMenuBtn: "p-1 text-black",
          mobileMenuOverlay: "border-b-2 border-black bg-[#F9F9F7] p-6 space-y-4 flex flex-col font-serif uppercase relative z-50 text-xs",
          
          // Hero
          hero: "border-b border-black bg-transparent",
          badge: "inline-block px-2.5 py-0.5 bg-black text-white font-serif font-bold uppercase tracking-widest",
          h1: "font-serif font-black tracking-tight leading-none text-black",
          h1Span: "text-neutral-905 block mt-1 font-normal italic",
          lead: "text-neutral-700 leading-relaxed",
          btnGroup: "flex flex-wrap gap-3",
          btnPrimary: "px-5 py-2.5 bg-black text-white font-serif font-bold tracking-wide rounded-none hover:bg-neutral-800 transition-colors",
          btnSecondary: "px-5 py-2.5 border border-black bg-transparent text-black font-serif font-bold tracking-wide rounded-none hover:bg-black/5 transition-colors",
          heroVisual: "border border-black p-0 overflow-hidden flex flex-col justify-center items-center bg-[#F2F2EF] font-serif text-[10px] space-y-2",

          // Social proof
          statsSec: "border-b border-black bg-transparent text-center",
          statNum: "font-black text-black tracking-tighter block",
          statLabel: "font-serif font-bold text-neutral-555 uppercase tracking-wider block",

          // Features
          featuresSec: "border-b border-black/10 space-y-8",
          card: "border-r border-black/10 last:border-r-0 bg-[#F9F9F7] p-5 space-y-2 rounded-none hover:bg-[#F2F2EF] transition-colors",
          cardTitle: "font-serif font-black text-xs text-black uppercase",
          cardDesc: "text-[11px] text-neutral-600 leading-relaxed",

          // Content Showcase
          contentSec: "border-y border-black bg-[#F2F2EF]",
          contentTag: "text-[8px] font-bold text-neutral-555 uppercase tracking-widest block",
          contentH: "font-black uppercase text-black font-serif",
          contentBody: "text-neutral-700 leading-relaxed space-y-3",
          contentVisual: "border border-black bg-white p-0 overflow-hidden h-52 flex flex-col justify-between font-serif text-sm",

          // Pricing
          pricingSec: "border-b border-black/15 text-center space-y-8",
          priceCard: "border border-black p-5 text-left rounded-none space-y-3 cursor-pointer transition-all bg-white",
          priceTitle: "font-serif font-black uppercase text-[9px] tracking-wide",
          priceNum: "font-black text-black tracking-tight",
          priceBtn: "w-full py-2 bg-black text-white font-serif font-bold tracking-wide rounded-none",

          // FAQ
          faqSec: "border-b border-black/15 max-w-2xl mx-auto space-y-6",
          faqItem: "border-b border-black/10 pb-4",
          faqQ: "flex justify-between items-center cursor-pointer font-bold uppercase tracking-wider text-black font-serif",
          faqA: "text-[11px] font-serif text-neutral-650 leading-relaxed pt-2.5 pl-1",

          // Footer
          ctaSec: "text-center space-y-4 border-dashed border border-black/20 m-4",
          input: "border border-black rounded-none p-1.5 text-xs bg-white focus:outline-none placeholder-neutral-400",
          footer: "border-t-2 border-black p-5 flex flex-col justify-between items-center gap-4 text-[9px] font-bold text-neutral-500 bg-[#F9F9F7]"
        };

      default: // SaaS Modern
        return {
          canvas: "bg-[#FFFFFF] text-[#0F172A] font-sans relative overflow-hidden transition-all duration-300",
          navbar: "border-b border-neutral-100 py-3 px-5 flex justify-between items-center bg-[#FFFFFF] max-w-5xl mx-auto",
          logo: "font-sans font-black tracking-tight text-xs text-black flex items-center gap-1",
          navLinks: "hidden md:flex gap-6 items-center",
          navLink: "text-[9.5px] font-bold text-slate-500 hover:text-black transition-colors cursor-pointer",
          navBtn: "hidden md:inline-block px-4 py-1.5 bg-[#0052FF] text-white font-bold text-[9px] rounded-lg hover:opacity-90 transition-all",
          mobileMenuBtn: "p-1 text-slate-500 hover:text-black",
          mobileMenuOverlay: "border-b border-neutral-100 bg-white p-6 space-y-4 flex flex-col font-bold text-xs uppercase relative z-50 text-slate-600",
          
          // Hero
          hero: "border border-neutral-105 bg-gradient-to-b from-blue-50/40 to-transparent mx-4 my-3 rounded-2xl shadow-sm",
          badge: "inline-block px-2.5 py-0.5 bg-blue-55 text-blue-600 rounded-full font-bold",
          h1: "font-sans font-black tracking-tight text-neutral-900 leading-tight",
          h1Span: "text-transparent bg-clip-text bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] block mt-1",
          lead: "text-slate-500 leading-relaxed",
          btnGroup: "flex flex-wrap gap-3",
          btnPrimary: "px-5 py-2.5 bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] text-white font-bold tracking-wide rounded-lg hover:opacity-90 shadow-sm shadow-blue-500/10 active:scale-[0.98]",
          btnSecondary: "px-5 py-2.5 border border-neutral-250 bg-white text-neutral-650 font-bold tracking-wide rounded-lg hover:bg-neutral-50 transition-colors",
          heroVisual: "bg-[#FAFCFF] border border-neutral-105 p-0 overflow-hidden rounded-2xl shadow-inner flex items-center justify-center",

          // Social proof
          statsSec: "bg-white border-y border-neutral-105 grid grid-cols-2 md:grid-cols-4 gap-6 text-center",
          statNum: "font-black text-slate-900 tracking-tight block",
          statLabel: "text-[9px] font-bold text-slate-400 uppercase tracking-widest block",

          // Features
          featuresSec: "space-y-8",
          card: "bg-white border border-neutral-105 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-neutral-200 transition-all space-y-2.5",
          cardTitle: "font-sans font-black text-[11px] text-neutral-900 tracking-tight",
          cardDesc: "text-[11px] text-slate-550 leading-relaxed",

          // Content Showcase
          contentSec: "border border-neutral-105 bg-slate-50/30 rounded-2xl mx-4",
          contentTag: "text-[8px] font-bold uppercase text-[#0052FF] tracking-wider block",
          contentH: "font-black tracking-tight text-neutral-900",
          contentBody: "text-slate-500 leading-relaxed space-y-3",
          contentVisual: "bg-white border border-neutral-150 p-0 overflow-hidden h-52 rounded-2xl shadow-sm flex flex-col justify-between",

          // Pricing
          pricingSec: "mx-4 my-3 border border-neutral-105 bg-slate-50/50 rounded-2xl text-center space-y-6",
          priceCard: "bg-white border border-neutral-250 p-5 text-left rounded-xl space-y-3 cursor-pointer transition-all hover:border-blue-500",
          priceTitle: "font-sans font-bold text-[10px] text-slate-400 uppercase tracking-wider",
          priceNum: "font-black text-slate-900 tracking-tight",
          priceBtn: "w-full py-2 bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] text-white font-bold rounded-lg",

          // FAQ
          faqSec: "border border-neutral-105 bg-white rounded-2xl max-w-2xl mx-auto space-y-6",
          faqItem: "border-b border-neutral-105 pb-4",
          faqQ: "flex justify-between items-center cursor-pointer font-bold uppercase tracking-wider text-slate-900",
          faqA: "text-[11px] text-slate-550 leading-relaxed pt-2.5 pl-1",

          // Footer
          ctaSec: "mx-4 my-3 border border-neutral-105 bg-[#F8FAFC] rounded-2xl text-center space-y-4",
          input: "border border-neutral-250 rounded-lg p-1.5 text-xs focus:outline-none focus:border-[#0052FF]",
          footer: "border-t border-neutral-105 p-5 flex flex-col justify-between items-center gap-4 text-[9px] font-bold text-slate-400 bg-[#FFFFFF]"
        };
    }
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

    const hasSection = (name: string) => {
      if (selectedSections.includes(name)) return true;
      if (name === "About" && selectedSections.includes("About Me")) return true;
      if (name === "Projects" && selectedSections.includes("Featured Projects")) return true;
      if (name === "Resume" && (selectedSections.includes("Experience") || selectedSections.includes("Resume"))) return true;
      return false;
    };

    const scrollToSection = (sec: string) => {
      const targetId = sec.toLowerCase() === "about me" || sec.toLowerCase() === "about company" ? "about" : 
                       sec.toLowerCase() === "featured projects" ? "projects" : 
                       sec.toLowerCase() === "experience" ? "resume" : 
                       sec.toLowerCase();
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    if (isPortfolio) {
      const activeLinks = selectedSections.length > 0 
        ? selectedSections.filter(s => s !== "Footer") 
        : ["Hero", "About Me", "Skills", "Experience", "Resume", "Featured Projects", "Certifications", "Testimonials", "Tech Stack", "Contact"];
      return (
        <div className={css.canvas}>
          {/* ==================================================== */}
          {/* 1. PORTFOLIO NAVBAR */}
          {/* ==================================================== */}
          <div className={css.navbar}>
            <span className={css.logo}>
              {websiteContent.about.title ? websiteContent.about.title.toUpperCase() : "PORTFOLIO"}
            </span>
            {!isMobile && (
              <>
                <div className={css.navLinks}>
                  {activeLinks.map((sec: string) => (
                    <span 
                      key={sec} 
                      onClick={() => scrollToSection(sec)}
                      className={`${css.navLink} transition-all duration-100 hover:underline`}
                    >
                      {sec}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-1.5 mr-3">
                  {Object.entries(activeSocials).map(([platId, active]) => {
                    if (!active) return null;
                    const linkVal = websiteContent.socials[platId as keyof typeof websiteContent.socials];
                    if (!linkVal || linkVal.trim() === "") return null;
                    return (
                      <a
                        key={platId}
                        href={linkVal.startsWith("http") ? linkVal : `https://${linkVal}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 border border-black hover:bg-neutral-100 bg-white text-black transition-colors rounded-none shadow-[1px_1px_0px_0px_#000] active:translate-y-[0.5px] active:shadow-none"
                        title={platId}
                      >
                        {renderSocialIcon(platId)}
                      </a>
                    );
                  })}
                </div>
                <button type="button" onClick={() => scrollToSection("Contact")} className={css.navBtn}>Hire Me</button>
              </>
            )}
            {isMobile && (
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={css.mobileMenuBtn}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}
          </div>

          {/* Mobile Drawer Overlay */}
          {isMobile && isMobileMenuOpen && (
            <div className={css.mobileMenuOverlay}>
              {activeLinks.map((sec: string) => (
                <span 
                  key={sec} 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    scrollToSection(sec);
                  }} 
                  className="hover:text-[#FFD93D] cursor-pointer"
                >
                  {sec}
                </span>
              ))}
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  scrollToSection("Contact");
                }}
                className="py-2 bg-black text-white font-mono uppercase text-[9px] w-full"
              >
                Get In Touch
              </button>
            </div>
          )}

          {/* ==================================================== */}
          {/* 2. PORTFOLIO HERO */}
          {/* ==================================================== */}
          {hasSection("Hero") && (
            <div id="hero" className={`${css.hero} ${isMobile ? "grid grid-cols-1 text-center py-10 px-4" : "grid grid-cols-2 py-14 px-6 md:px-12 gap-8 items-center"}`}>
              <div className="space-y-4 text-left">
                <span className={`${css.badge} ${isMobile ? "text-[7px]" : "text-[8px]"}`}>
                  {style.name.toUpperCase()} PORTFOLIO DNA
                </span>
                <h1 className={`${css.h1} ${isMobile ? "text-2xl" : "text-4xl md:text-5xl"}`}>
                  {websiteContent.hero.headline || "Mohammed Mubashir — UI/UX Architect"}
                </h1>
                <p className={`${css.lead} ${isMobile ? "text-[10px]" : "text-xs md:text-sm"}`}>
                  {websiteContent.hero.subheadline || "Crafting premium, blazing-fast neobrutalist frontends and responsive visual layouts with full-fidelity micro-interactions."}
                </p>
                <div className={`flex flex-wrap gap-2.5 ${isMobile ? "justify-center pt-1" : "pt-2"}`}>
                  <button type="button" onClick={() => scrollToSection("Projects")} className={`${css.btnPrimary} ${isMobile ? "px-4 py-2 text-[8.5px]" : "px-5 py-2.5 text-[9.5px]"}`}>
                    {websiteContent.hero.ctaText || "View My Work"}
                  </button>
                  <button type="button" onClick={() => scrollToSection("Contact")} className={`${css.btnSecondary} ${isMobile ? "px-4 py-2 text-[8.5px]" : "px-5 py-2.5 text-[9.5px]"}`}>
                    {websiteContent.hero.secondaryCtaText || "Get In Touch"}
                  </button>
                </div>
              </div>
              <div className={`${css.heroVisual} ${isMobile ? "mt-4 h-48" : "h-64"}`}>
                <ThemeVisualPlaceholder type="hero" themeId={style.id} />
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* 3. PORTFOLIO STATS GRID */}
          {/* ==================================================== */}
          <div className={`${css.statsSec} ${isMobile ? "grid grid-cols-2 gap-4 py-6 px-4" : "grid grid-cols-4 py-8 px-6"}`}>
            {[
              { num: `${resumeData?.skills?.length || 8}+`, label: "CORE SKILLS" },
              { num: `${resumeData?.companies?.length || 3}+`, label: "COMPANY MILESTONES" },
              { num: `${resumeData?.projects?.length || 4}+`, label: "SHIPPED PROJECTS" },
              { num: "100%", label: "VISUAL ACCURACY" }
            ].map((st, i) => (
              <div key={i}>
                <span className={`${css.statNum} ${isMobile ? "text-xl" : "text-2xl md:text-3xl"}`}>{st.num}</span>
                <span className={`${css.statLabel} ${isMobile ? "text-[7.5px]" : "text-[9px]"}`}>{st.label}</span>
              </div>
            ))}
          </div>

          {/* ==================================================== */}
          {/* 4. ABOUT / STORY SECTION */}
          {/* ==================================================== */}
          {hasSection("About") && (
            <div id="about" className={`${css.contentSec} ${isMobile ? "grid grid-cols-1 py-8 px-4 gap-6" : "grid grid-cols-2 py-12 px-6 gap-8 items-center"}`}>
              <div className={css.contentVisual}>
                <ThemeVisualPlaceholder type="content" themeId={style.id} />
              </div>
              <div className="space-y-4 text-left">
                <span className={css.contentTag}>PROFESSIONAL STORY</span>
                <h3 className={`${css.contentH} ${isMobile ? "text-lg" : "text-2xl md:text-3xl"}`}>
                  {websiteContent.about.title || "About Me"}
                </h3>
                <div className={`${css.contentBody} ${isMobile ? "text-[10.5px]" : "text-xs"}`}>
                  <p className="leading-relaxed">
                    {websiteContent.about.story || "A highly detail-oriented design engineer focused on building neobrutalist visual web experiences. Combining clean functional baselines with fluid responsive timeline grids."}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* 5. SKILLS GRID */}
          {/* ==================================================== */}
          {hasSection("Skills") && resumeData && resumeData.skills.length > 0 && (
            <div id="skills" className={`${css.featuresSec} ${isMobile ? "py-8 px-4" : "py-12 px-6"}`}>
              <div className="text-center space-y-2.5 max-w-xl mx-auto mb-8">
                <span className={css.badge}>CORE STACK & COMPETENCY</span>
                <h2 className={`font-black uppercase tracking-tight text-center ${isMobile ? "text-lg" : "text-xl md:text-2xl"}`}>
                  Engineered Skill Set Grid
                </h2>
                <p className="text-[11px] text-neutral-500 leading-relaxed font-semibold">
                  Technologies, paradigms, and design guidelines utilized regularly in production-level deployments.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
                {resumeData.skills.map((skill: string, idx: number) => (
                  <span
                    key={skill}
                    className="px-4 py-2 border-2 border-black bg-white font-black uppercase text-[10px] sm:text-xs text-black shadow-[2px_2px_0px_0px_#000] tracking-wider transition-all hover:bg-neutral-50"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* 6. RESUME / WORK TIMELINE */}
          {/* ==================================================== */}
          {hasSection("Resume") && resumeData && resumeData.companies.length > 0 && (
            <div id="resume" className={`py-12 px-6 bg-white border-b border-black space-y-8 ${isMobile ? "px-4 py-8" : ""}`}>
              <div className="text-center space-y-2.5 max-w-xl mx-auto">
                <span className={css.badge}>WORK HISTORY TIMELINE</span>
                <h2 className="font-black uppercase tracking-tight text-center text-xl md:text-2xl">
                  Career Experience milestones
                </h2>
              </div>

              <div className="max-w-3xl mx-auto space-y-4 pt-4">
                {resumeData.companies.map((comp: any, idx: number) => (
                  <div key={idx} className="border-2 border-black p-4 bg-[#FFFDF5] shadow-[3px_3px_0px_0px_#000] flex flex-col md:flex-row justify-between gap-3 items-start">
                    <div className="space-y-1">
                      <span className="text-[9px] font-black uppercase bg-black text-white px-2 py-0.5 border border-black inline-block">
                        {comp.duration || "2024 - Present"}
                      </span>
                      <h4 className="text-sm font-black uppercase pt-1 text-black">{comp.role}</h4>
                      <span className="text-xs font-bold text-neutral-500 block">{comp.name}</span>
                      <p className="text-[11px] text-neutral-600 leading-normal pt-1.5">{comp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* 7. PROJECTS SHOWCASE */}
          {/* ==================================================== */}
          {hasSection("Projects") && resumeData && resumeData.projects.length > 0 && (
            <div id="projects" className={`${css.featuresSec} ${isMobile ? "py-8 px-4" : "py-12 px-6"}`}>
              <div className="text-center space-y-2.5 max-w-xl mx-auto mb-8">
                <span className={css.badge}>PROJECT HIGHLIGHTS</span>
                <h2 className="font-black uppercase tracking-tight text-center text-xl md:text-2xl">
                  Featured Case Studies
                </h2>
              </div>

              <div className={`grid gap-6 ${isMobile ? "grid-cols-1" : isTablet ? "grid-cols-2" : "grid-cols-2 max-w-4xl mx-auto"}`}>
                {resumeData.projects.map((proj: any, idx: number) => (
                  <div key={idx} className="border-2 border-black bg-white p-5 shadow-[4px_4px_0px_0px_#000] flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center border-b border-black/10 pb-1.5">
                        <span className="font-mono text-[7px] text-neutral-400 uppercase font-black">PROJECT #{idx + 1}</span>
                        <span className="w-2 h-2 bg-black rounded-full" />
                      </div>
                      <h4 className="font-serif font-black uppercase text-xs text-black border-b border-black/5 pb-1">{proj.title}</h4>
                      <p className="text-[11px] text-neutral-700 leading-relaxed">{proj.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-1 pt-2">
                      {proj.tech.map((t: string) => (
                        <span key={t} className="px-1.5 py-0.5 bg-neutral-100 border border-neutral-200 text-[8px] font-mono tracking-tighter uppercase font-bold text-black">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* 8. CONTACT FORM & FOOTER */}
          {/* ==================================================== */}
          {hasSection("Contact") && (
            <div id="contact" className={`${css.ctaSec} ${isMobile ? "py-8 px-4" : "py-10 px-6"}`}>
              <h4 className="font-black text-xs uppercase text-center">Let's craft something beautiful together</h4>
              <p className="text-[10px] text-center opacity-70">
                Have a project scope in mind? Reach out directly via the form or email below.
              </p>
              
              <div className="flex justify-center gap-6 pt-2 text-[10px] font-mono uppercase text-black font-black flex-wrap">
                {websiteContent.footer.emailAddress && <span>✉ {websiteContent.footer.emailAddress}</span>}
                {websiteContent.footer.phoneNumber && <span>☏ {websiteContent.footer.phoneNumber}</span>}
                {websiteContent.footer.addressText && <span>📍 {websiteContent.footer.addressText}</span>}
              </div>

              {/* Display dynamic active socials URLs with corresponding brand icons */}
              <div className="flex flex-wrap justify-center gap-2 pt-4">
                {Object.entries(activeSocials).map(([platId, active]) => {
                  if (!active) return null;
                  const linkVal = websiteContent.socials[platId as keyof typeof websiteContent.socials];
                  if (!linkVal || linkVal.trim() === "") return null;
                  
                  return (
                    <a
                      key={platId}
                      href={linkVal.startsWith("http") ? linkVal : `https://${linkVal}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1.5 border-2 border-black bg-white font-mono uppercase text-[8px] font-black text-black shadow-[1.5px_1.5px_0px_0px_#000] hover:shadow-[0.5px_0.5px_0px_0px_#000] hover:translate-x-[0.5px] hover:translate-y-[0.5px] transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      {renderSocialIcon(platId)}
                      <span>{platId}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {/* Simple Footer Bar */}
          <div className={`${css.footer} ${isMobile ? "py-8 px-4 text-center" : "py-6 px-8 flex justify-between items-center"}`}>
            <div>
              <span className="font-black block text-xs text-black uppercase">
                {websiteContent.about.title ? websiteContent.about.title.toUpperCase() : "PORTFOLIO"}
              </span>
              <span className="text-neutral-400 block pt-1 text-[8.5px]">
                © 2026 {websiteContent.about.title || "Portfolio Architect"}. Handcrafted cleanly.
              </span>
            </div>
            <div className="flex flex-col items-end gap-1.5 text-right">
              <div className="flex items-center gap-2">
                {Object.entries(activeSocials).map(([platId, active]) => {
                  if (!active) return null;
                  const linkVal = websiteContent.socials[platId as keyof typeof websiteContent.socials];
                  if (!linkVal || linkVal.trim() === "") return null;
                  return (
                    <a
                      key={platId}
                      href={linkVal.startsWith("http") ? linkVal : `https://${linkVal}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 border border-black hover:bg-neutral-100 bg-white text-black transition-colors rounded-none shadow-[1px_1px_0px_0px_#000] active:translate-y-[0.5px] active:shadow-none"
                      title={platId}
                    >
                      {renderSocialIcon(platId)}
                    </a>
                  );
                })}
              </div>
              <div className="text-[8.5px] font-mono text-neutral-400 uppercase pt-0.5">
                POWERED BY MUBIX PROMPTS
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Standard SaaS Landing Page renderer block
    return (
      <div className={css.canvas}>
        
        {/* ==================================================== */}
        {/* 1. RESPONSIVE NAVBAR */}
        {/* ==================================================== */}
        <div className={css.navbar}>
          <span className={css.logo}>{style.name.toUpperCase()}</span>
          
          {/* Desktop/Tablet Links */}
          {!isMobile && (
            <>
              <div className={css.navLinks}>
                <span className={css.navLink}>Products</span>
                <span className={css.navLink}>Features</span>
                <span className={css.navLink}>Pricing</span>
                <span className={css.navLink}>FAQ</span>
              </div>
              <button type="button" className={css.navBtn}>Get Started</button>
            </>
          )}

          {/* Hamburger menu for mobile */}
          {isMobile && (
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={css.mobileMenuBtn}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          )}
        </div>

        {/* Mobile Navigation Drawer Overlay */}
        {isMobile && isMobileMenuOpen && (
          <div className={css.mobileMenuOverlay}>
            <span onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#FFD93D] cursor-pointer">Products</span>
            <span onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#FFD93D] cursor-pointer">Features</span>
            <span onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#FFD93D] cursor-pointer">Pricing</span>
            <span onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#FFD93D] cursor-pointer">FAQ</span>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 bg-black text-white font-mono uppercase text-[9px] w-full"
            >
              Connect Wallet
            </button>
          </div>
        )}

        {/* ==================================================== */}
        {/* 2. HERO SECTION */}
        {/* ==================================================== */}
        <div className={`${css.hero} ${isMobile ? "grid grid-cols-1 text-center py-10 px-4" : "grid grid-cols-2 py-14 px-6 md:px-12 gap-8 items-center"}`}>
          <div className="space-y-4 text-left">
            <span className={`${css.badge} ${isMobile ? "text-[7px]" : "text-[8px]"}`}>{style.id.toUpperCase()} BRAND MATRIX</span>
            <h1 className={`${css.h1} ${isMobile ? "text-2xl" : "text-5xl"}`}>
              The Ultimate <span className={css.h1Span}>Design Blueprint</span> Suite
            </h1>
            <p className={`${css.lead} ${isMobile ? "text-[10px]" : "text-xs md:text-sm"}`}>
              Synthesize production-ready landing sites cleanly. Bind responsive grid layouts, custom typography weights, button click transitions, and backend schemas natively.
            </p>
            <div className={`flex flex-wrap gap-2.5 ${isMobile ? "justify-center pt-1" : "pt-2"}`}>
              <button type="button" className={`${css.btnPrimary} ${isMobile ? "px-4 py-2 text-[8.5px]" : "px-5 py-2.5 text-[9.5px]"}`}>Deploy Prompt Suite</button>
              <button type="button" className={`${css.btnSecondary} ${isMobile ? "px-4 py-2 text-[8.5px]" : "px-5 py-2.5 text-[9.5px]"}`}>Explore Tokens</button>
            </div>
          </div>
          
          {/* Premium Vector visual instead of boring empty metrics bar */}
          <div className={`${css.heroVisual} ${isMobile ? "mt-4 h-48" : "h-64"}`}>
            <ThemeVisualPlaceholder type="hero" themeId={style.id} />
          </div>
        </div>

        {/* ==================================================== */}
        {/* 3. SOCIAL PROOF / STATS */}
        {/* ==================================================== */}
        <div className={`${css.statsSec} ${isMobile ? "grid grid-cols-2 gap-4 py-6 px-4" : "grid grid-cols-4 py-8 px-6"}`}>
          {[
            { num: "50k+", label: "ACTIVE BLUEPRINTS" },
            { num: "99.99%", label: "COMPILE UPTIME" },
            { num: "25M+", label: "CLI NPM INSTALLS" },
            { num: "0.2ms", label: "RENDER LATENCY" }
          ].map((st, i) => (
            <div key={i}>
              <span className={`${css.statNum} ${isMobile ? "text-xl" : "text-2xl md:text-3xl"}`}>{st.num}</span>
              <span className={`${css.statLabel} ${isMobile ? "text-[7.5px]" : "text-[9px]"}`}>{st.label}</span>
            </div>
          ))}
        </div>

        {/* ==================================================== */}
        {/* 4. FEATURE GRID */}
        {/* ==================================================== */}
        <div className={`${css.featuresSec} ${isMobile ? "py-8 px-4" : "py-12 px-6"}`}>
          <div className="text-center space-y-2.5 max-w-xl mx-auto">
            <span className={css.badge}>CORE CAPABILITIES</span>
            <h2 className={`font-black uppercase tracking-tight text-center ${isMobile ? "text-lg" : "text-xl md:text-2xl"}`}>Tailored spacing bounds and modular rules</h2>
            <p className="text-[11px] text-neutral-500 leading-relaxed font-semibold">Strict visual architectures designed specifically to eliminate placeholder copy and layout leaks.</p>
          </div>

          <div className={`grid gap-6 ${isMobile ? "grid-cols-1" : isTablet ? "grid-cols-2" : "grid-cols-3"}`}>
            {[
              { title: "Fluid Font Systems", desc: "Dynamic text sizes computed straight from geometric baseline guidelines, keeping hierarchies beautiful." },
              { title: "Thick Micro-borders", desc: "Pixel-perfect outlines and dividing grid lines guaranteeing strict modular layout block boundaries." },
              { title: "Mechanical Physics", desc: "Interactive hover shifts, responsive buttons scaling, and active touch spring compression states." }
            ].map((feat, idx) => (
              <div key={idx} className={css.card}>
                <ThemeVisualPlaceholder type="card" themeId={style.id} index={idx} />
                <h4 className={css.cardTitle}>{feat.title}</h4>
                <p className={css.cardDesc}>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ==================================================== */}
        {/* 5. EDITORIAL CONTENT SHOWCASE */}
        {/* ==================================================== */}
        <div className={`${css.contentSec} ${isMobile ? "grid grid-cols-1 py-8 px-4 gap-6" : "grid grid-cols-2 py-12 px-6 gap-8 items-center"}`}>
          {/* High-fidelity visual graphic placeholder */}
          <div className={css.contentVisual}>
            <ThemeVisualPlaceholder type="content" themeId={style.id} />
          </div>

          {/* Right Text Block */}
          <div className="space-y-4 text-left">
            <span className={css.contentTag}>IN-DEPTH INSPECTOR</span>
            <h3 className={`${css.contentH} ${isMobile ? "text-lg" : "text-2xl md:text-3xl"}`}>Perfect visual balance at any resolution scale</h3>
            <div className={`${css.contentBody} ${isMobile ? "text-[10.5px]" : "text-xs"}`}>
              <p>
                Our layout engine automatically enforces typography size limits, grid spacing ratios, and border constraints so components scale naturally without overflows.
              </p>
              <p className="opacity-80">
                You can write custom visual instructions in the sidebar text console to dynamically override standard rules while retaining core identity bounds.
              </p>
            </div>
          </div>
        </div>

        {/* ==================================================== */}
        {/* 6. PRICING SECTION */}
        {/* ==================================================== */}
        <div className={`${css.pricingSec} ${isMobile ? "py-8 px-4" : "py-12 px-6"}`}>
          <div className="text-center space-y-2">
            <span className={css.badge}>FLEXIBLE PLAN SCHEMAS</span>
            <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight">Predictable plans for modern teams</h2>
            <p className="text-[11px] text-neutral-500 leading-normal font-semibold">Deploy custom developer configurations onto secure staging domains.</p>
          </div>

          <div className={`grid gap-6 max-w-4xl mx-auto ${isMobile ? "grid-cols-1" : isTablet ? "grid-cols-2" : "grid-cols-3"}`}>
            {[
              { title: "Starter Pack", price: "$19", desc: "Perfect for single developer portfolios or personal landing pages.", tier: "starter" },
              { title: "Enterprise Pro", price: "$49", desc: "Unlock parallel prompt compiling queues and Stripe transaction sandboxes.", tier: "pro" },
              { title: "Visual Studio", price: "$99", desc: "Inject raw Photoshop/Figma mockup layouts and extract clean CSS variables.", tier: "enterprise" }
            ].map((plan, pIdx) => {
              const isSelected = activePricingTier === plan.tier;
              return (
                <div
                  key={plan.tier}
                  onClick={() => setActivePricingTier(plan.tier as any)}
                  className={`${css.priceCard} ${isSelected ? "border-amber-400 bg-amber-500/5 shadow-2xl scale-[1.01]" : ""}`}
                >
                  <div className="flex justify-between items-center">
                    <h4 className={css.priceTitle}>{plan.title}</h4>
                    {isSelected && <span className="px-2 py-0.5 bg-[#FF6B6B] text-white text-[7px] font-black uppercase border border-black shadow-[1px_1px_0px_0px_#000]">ACTIVE</span>}
                  </div>
                  <div className={`${css.priceNum} ${isMobile ? "text-xl" : "text-2xl"}`}>{plan.price}<span className="text-xs font-normal">/mo</span></div>
                  <p className="text-[10px] opacity-75">{plan.desc}</p>
                  <button type="button" className={css.priceBtn}>Synthesize Blueprint</button>
                </div>
              );
            })}
          </div>
        </div>

        {/* ==================================================== */}
        {/* 7. FAQ ACCORDION SECTION */}
        {/* ==================================================== */}
        <div className={`${css.faqSec} ${isMobile ? "py-8 px-4" : "py-12 px-6"}`}>
          <div className="text-center space-y-2.5">
            <span className={css.badge}>FAQ ACCORDION</span>
            <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-center">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-1">
            {[
              { q: "Is the compiled CSS modular and responsive?", a: "Absolutely! The visual theme compiler exports highly optimized Tailwind/CSS variables bound to clean responsive breakpoints natively." },
              { q: "How do I configure custom theme prompt overrides?", a: "You can write specific instruction descriptors in the override textarea. Our prompt engine integrates them cleanly with the core visual rules." },
              { q: "Can I connect custom backend databases?", a: "Yes, visual theme elements are prepared with backing Prisma/Supabase PostgreSQL schema tables and secure API routes structures." }
            ].map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className={css.faqItem}>
                  <div
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className={`${css.faqQ} ${isMobile ? "text-[9px]" : "text-xs"}`}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 shrink-0 text-[#FFD93D]" /> : <ChevronDown className="w-4 h-4 shrink-0" />}
                  </div>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      className={css.faqA}
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ==================================================== */}
        {/* 8. FOOTER WITH NEWSLETTER */}
        {/* ==================================================== */}
        <div className={`${css.ctaSec} ${isMobile ? "py-8 px-4" : "py-10 px-6"}`}>
          <h4 className="font-black text-xs uppercase text-center">Subscribe to visual blueprints releases</h4>
          <p className="text-[10px] text-center opacity-70">Gain sandbox hosting credentials to test custom Stripe webhook pipelines instantly.</p>
          <form onSubmit={handleSubscribe} className={`flex flex-col gap-2 items-center w-full ${isMobile ? "space-y-2" : "sm:flex-row justify-center"}`}>
            <input
              type="email"
              required
              placeholder="Enter your email address..."
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className={`${css.input} ${isMobile ? "w-full" : "w-60"}`}
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-black text-white text-[9.5px] font-black uppercase flex items-center justify-center gap-1 hover:opacity-90 w-full sm:w-auto"
            >
              {isSubscribed ? <Check className="w-4 h-4 text-green-500" /> : <Mail className="w-4 h-4" />}
              {isSubscribed ? "SUBSCRIBED" : "JOIN waitlist"}
            </button>
          </form>
        </div>

        <div className={`${css.footer} ${isMobile ? "grid-cols-1 text-center py-8 px-4 gap-6" : "grid-cols-4 p-8"}`}>
          <div>
            <span className="font-black block text-xs text-black">{style.name.toUpperCase()} SYSTEM</span>
            <span className="text-neutral-400 block pt-1">© 2026 {style.name} Inc. All rights reserved.</span>
          </div>
          <div>
            <span className="font-black text-black block pb-1">Blueprints</span>
            <span className="text-neutral-400 block">Framer Templates</span>
            <span className="text-neutral-400 block">Tailwind Variables</span>
          </div>
          <div>
            <span className="font-black text-black block pb-1">Resources</span>
            <span className="text-neutral-400 block">API Docs</span>
            <span className="text-neutral-400 block">Stripe Sandbox</span>
          </div>
          <div>
            <span className="font-black text-black block pb-1">Workspace</span>
            <span className="text-neutral-400 block">Zustand Telemetry</span>
            <span className="text-neutral-400 block">Prisma Registry</span>
          </div>
        </div>
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
  const renderPremiumToolbar = (isFull: boolean, currentDevice: "desktop" | "tablet" | "mobile", updateDevice: (dev: "desktop" | "tablet" | "mobile") => void, onExit: () => void) => {
    const activeWidth = currentDevice === "desktop" ? 1440 : currentDevice === "tablet" ? 768 : 390;
    const activeHeight = currentDevice === "desktop" ? 900 : currentDevice === "tablet" ? 1024 : 844;

    return (
      <div className="h-[56px] min-h-[56px] w-full bg-zinc-950 text-white border-4 border-black flex justify-between items-center px-4 z-30 shadow-[4px_4px_0px_0px_#000] relative">
        {/* LEFT: macOS traffic lights and status */}
        <div className="flex items-center gap-2">
          {isFull ? (
            <button
              onClick={onExit}
              className="px-3 py-1 bg-red-500 hover:bg-red-600 text-black border-2 border-black font-black uppercase text-[10px] flex items-center gap-1 shadow-[2px_2px_0px_0px_#000] transition-all cursor-pointer"
            >
              ← Exit Preview
            </button>
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
              {Math.round(activeScale * 100)}%
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

          {/* Fullscreen toggle (hidden if standalone) */}
          {!isStandalone && (
            <button
              onClick={() => {
                if (isFull) {
                  setIsFullscreen(false);
                } else {
                  setModalDevice(device);
                  setIsFullscreen(true);
                }
              }}
              className="p-1.5 bg-[#FFD93D] hover:bg-white text-black border border-black shadow-[1.5px_1.5px_0px_0px_#000] font-black uppercase transition-all cursor-pointer flex items-center rounded"
            >
              <Maximize2 className="w-3.5 h-3.5 stroke-[3px]" />
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

          {/* Scrollable phone viewport */}
          <div className="w-full flex-1 overflow-y-auto scrollbar-thin scroll-smooth bg-white">
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

          {/* iPad Scrollable content */}
          <div className="w-full flex-1 overflow-y-auto scrollbar-thin scroll-smooth bg-white">
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

        {/* Scrollable content container */}
        <div className="w-full flex-1 overflow-y-auto scrollbar-thin scroll-smooth bg-white z-10">
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
              width: device === "desktop" ? 1440 * activeScale : device === "tablet" ? 768 * activeScale : 414 * activeScale,
              height: device === "desktop" ? 900 * activeScale : device === "tablet" ? 1024 * activeScale : 840 * activeScale,
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
    <div className="w-full flex flex-col space-y-4">
      {/* 56px height primary simulator header */}
      {renderPremiumToolbar(false, device, setDevice, () => {})}

      {/* Main Simulation Viewport Sandbox */}
      <div
        ref={containerRef}
        className="w-full min-h-[650px] h-[720px] bg-[#08080a] bg-[radial-gradient(#1e1e24_1.2px,transparent_1.2px)] [background-size:16px_16px] border-4 border-black shadow-[4px_4px_0px_0px_#000] overflow-y-auto scrollbar-thin p-4 flex justify-center items-start relative rounded-none"
      >
        <div
          style={{ 
            width: device === "desktop" ? 1440 * activeScale : device === "tablet" ? 768 * activeScale : 414 * activeScale,
            height: device === "desktop" ? 900 * activeScale : device === "tablet" ? 1024 * activeScale : 840 * activeScale,
            transition: "width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
          }}
          className="flex justify-center"
        >
          <AnimatePresence mode="wait">
            {renderSimulatedCanvas(device, activeScale)}
          </AnimatePresence>
        </div>
      </div>

      {/* Cinematic Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#060608]/99 backdrop-blur-xl z-[9999] flex flex-col w-screen h-screen overflow-hidden"
          >
            {/* Top Toolbar in Fullscreen Mode */}
            {renderPremiumToolbar(true, modalDevice, setModalDevice, () => setIsFullscreen(false))}

            {/* Fullscreen Sandbox Workbench Canvas */}
            <div
              className="flex-1 w-full bg-[#08080a] bg-[radial-gradient(#1e1e24_1.2px,transparent_1.2px)] [background-size:16px_16px] flex justify-center items-start p-8 overflow-y-auto scrollbar-thin relative"
            >
              <div
                style={{ 
                  width: modalDevice === "desktop" ? 1440 * activeModalScale : modalDevice === "tablet" ? 768 * activeModalScale : 414 * activeModalScale,
                  height: modalDevice === "desktop" ? 900 * activeModalScale : modalDevice === "tablet" ? 1024 * activeModalScale : 840 * activeModalScale,
                  transition: "width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
                }}
                className="flex justify-center"
              >
                <AnimatePresence mode="wait">
                  {renderSimulatedCanvas(modalDevice, activeModalScale)}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
