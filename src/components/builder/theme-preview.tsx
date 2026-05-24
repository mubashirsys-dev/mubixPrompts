"use client";

import { useState } from "react";
import { DesignStyle } from "@/types/builder";
import { Monitor, Smartphone, Globe, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ThemePreviewProps {
  style: DesignStyle;
}

export function ThemePreview({ style }: ThemePreviewProps) {
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const triggerRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  // Generate original styling sets dynamically matching style identity
  const getThemeStyles = () => {
    switch (style.id) {
      case "brutalist":
        return {
          wrapper: "bg-[#FFFDF5] text-black p-5 sm:p-8 font-mono border-t-4 border-black space-y-8 relative overflow-hidden",
          navbar: "border-4 border-black p-3 bg-white flex justify-between items-center shadow-[3px_3px_0px_0px_#000] rotate-[-0.5deg]",
          logo: "font-black uppercase tracking-tighter text-[11px] bg-[#FFD93D] px-2 py-0.5 border-2 border-black rotate-[-2deg] shadow-[2px_2px_0px_0px_#000]",
          navLink: "text-[9px] font-black uppercase text-black hover:underline",
          hero: "text-center py-12 space-y-4 border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_#000] rotate-[1deg] relative",
          badge: "inline-block px-3 py-1 bg-[#FF6B6B] text-white border-2 border-black font-black uppercase text-[8px] tracking-wide rotate-[-3deg] absolute -top-3 left-4 shadow-[2px_2px_0px_0px_#000]",
          h1: "text-3xl font-black uppercase tracking-tighter leading-none text-black",
          h1Span: "bg-[#C4B5FD] text-black px-2 border-2 border-black inline-block rotate-[1deg] shadow-[2px_2px_0px_0px_#000]",
          p: "text-[11px] font-bold text-black/80 max-w-sm mx-auto leading-relaxed",
          btnGroup: "flex justify-center gap-3 pt-2",
          btnPrimary: "px-4 py-2 border-2 border-black bg-[#FFD93D] text-black font-black uppercase text-[9px] shadow-[3px_3px_0px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all",
          btnSecondary: "px-4 py-2 border-2 border-black bg-white text-black font-black uppercase text-[9px] shadow-[3px_3px_0px_0px_#000]",
          grid: "grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4",
          card: "border-4 border-black bg-white p-4 shadow-[4px_4px_0px_0px_#000] space-y-2 hover:-translate-y-1 hover:shadow-[7px_7px_0px_0px_#000] transition-all duration-150 rounded-none",
          cardTitle: "font-black uppercase text-[10px] text-black",
          cardP: "text-[9.5px] font-bold text-black/60 leading-normal"
        };

      case "ai-futuristic":
        return {
          wrapper: "bg-[#02020e] text-[#e2e8f0] p-5 sm:p-8 font-sans space-y-8 min-h-[440px] relative overflow-hidden",
          navbar: "border-b border-purple-500/20 py-3 flex justify-between items-center bg-black/40 backdrop-blur-md px-3 rounded-xl",
          logo: "font-black uppercase tracking-wider text-[10px] text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400",
          navLink: "text-[8.5px] font-bold uppercase text-white/70 hover:text-white",
          hero: "text-center py-12 space-y-4 bg-gradient-to-b from-[#12122b]/60 to-black/80 border border-purple-500/20 p-6 rounded-2xl shadow-[0_0_30px_rgba(139,92,246,0.15)] relative overflow-hidden",
          badge: "inline-block px-2.5 py-0.5 bg-purple-500/10 text-purple-400 border border-purple-500/30 rounded-full font-bold uppercase text-[8px]",
          h1: "text-2xl font-black uppercase tracking-tight text-white leading-none",
          h1Span: "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 block mt-1",
          p: "text-[10px] font-medium text-white/60 max-w-sm mx-auto leading-relaxed",
          btnGroup: "flex justify-center gap-3 pt-2",
          btnPrimary: "px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold uppercase text-[9px] rounded-lg shadow-lg shadow-purple-500/10 hover:opacity-90 transition-all",
          btnSecondary: "px-4 py-2 border border-white/10 bg-white/5 text-white font-bold uppercase text-[9px] rounded-lg",
          grid: "grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4",
          card: "bg-black/50 border border-purple-500/15 p-4 rounded-xl space-y-2 shadow-xl backdrop-blur-md hover:border-purple-400/40 hover:scale-[1.01] transition-all",
          cardTitle: "font-black uppercase text-[10px] text-white flex items-center gap-1.5",
          cardP: "text-[9px] font-medium text-white/50 leading-relaxed"
        };

      case "glassmorphism":
        return {
          wrapper: "bg-[#0b0f19] text-[#f1f5f9] p-5 sm:p-8 font-sans space-y-8 min-h-[440px] relative overflow-hidden",
          navbar: "border border-white/10 py-3 flex justify-between items-center bg-white/5 backdrop-blur-md px-4 rounded-xl",
          logo: "font-black uppercase text-[10px] tracking-widest text-white",
          navLink: "text-[8.5px] font-medium text-white/70 hover:text-white",
          hero: "text-center py-12 space-y-4 bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl",
          badge: "inline-block px-2.5 py-0.5 bg-white/10 text-white/80 border border-white/20 rounded-full font-bold text-[8px]",
          h1: "text-2xl font-black text-white leading-tight",
          h1Span: "text-[#a78bfa] block",
          p: "text-[10.5px] font-medium text-white/60 max-w-sm mx-auto leading-relaxed",
          btnGroup: "flex justify-center gap-3 pt-2",
          btnPrimary: "px-4 py-2 bg-white text-black font-black text-[9px] rounded-full hover:bg-neutral-100 transition-all",
          btnSecondary: "px-4 py-2 border border-white/20 bg-white/5 text-white font-black text-[9px] rounded-full",
          grid: "grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4",
          card: "bg-white/5 border border-white/10 p-4 rounded-2xl space-y-2 backdrop-blur-xl shadow-lg hover:bg-white/10 transition-all",
          cardTitle: "font-bold text-[10.5px] text-white",
          cardP: "text-[9px] font-medium text-white/50 leading-normal"
        };

      case "swiss-design":
        return {
          wrapper: "bg-[#f8fafc] text-[#0f172a] p-5 sm:p-8 font-sans space-y-8 min-h-[440px]",
          navbar: "border-b border-black py-4 flex justify-between items-center bg-white",
          logo: "font-black uppercase text-[11px] text-black tracking-tight",
          navLink: "text-[8.5px] font-black uppercase text-black hover:text-red-600",
          hero: "text-left py-12 space-y-4 bg-white border border-neutral-200 p-6 rounded-none shadow-none",
          badge: "inline-block px-2.5 py-0.5 bg-red-600 text-white font-black uppercase text-[8px] tracking-widest",
          h1: "text-3xl font-black uppercase tracking-tighter leading-none text-black",
          h1Span: "text-red-600 block mt-1",
          p: "text-[10.5px] font-medium text-neutral-600 max-w-md leading-relaxed",
          btnGroup: "flex justify-start gap-3 pt-2",
          btnPrimary: "px-6 py-2 bg-black text-white font-black uppercase text-[9px] rounded-none hover:bg-neutral-800 transition-all",
          btnSecondary: "px-6 py-2 border border-black bg-transparent text-black font-black uppercase text-[9px] rounded-none",
          grid: "grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4",
          card: "border border-neutral-200 bg-white p-5 rounded-none space-y-2 shadow-none hover:bg-neutral-50 transition-colors",
          cardTitle: "font-black uppercase text-[10px] tracking-tight text-black",
          cardP: "text-[9px] font-medium text-neutral-500 leading-relaxed"
        };

      case "luxury-black":
        return {
          wrapper: "bg-[#090909] text-[#f5f5f5] p-5 sm:p-8 font-serif space-y-8 min-h-[440px]",
          navbar: "border-b border-yellow-600/20 py-4 flex justify-between items-center bg-black/85 px-4",
          logo: "font-black tracking-widest text-[10px] uppercase text-[#ffd700] italic",
          navLink: "text-[8px] font-bold uppercase text-white/60 hover:text-[#ffd700] tracking-widest",
          hero: "text-center py-14 space-y-4 bg-zinc-950 border border-yellow-600/15 p-6 rounded-none shadow-2xl",
          badge: "inline-block px-3 py-0.5 bg-yellow-600/10 text-[#ffd700] border border-yellow-600/30 font-bold uppercase text-[7.5px] tracking-widest",
          h1: "text-2xl font-black uppercase tracking-widest text-white leading-none font-serif",
          h1Span: "text-[#ffd700] block mt-2 tracking-normal italic normal-case font-normal",
          p: "text-[10px] font-medium text-white/50 max-w-xs mx-auto leading-relaxed italic",
          btnGroup: "flex justify-center gap-3 pt-2",
          btnPrimary: "px-5 py-2 border border-[#ffd700] bg-transparent text-[#ffd700] font-bold uppercase text-[8px] tracking-widest hover:bg-[#ffd700] hover:text-black transition-all duration-300",
          btnSecondary: "px-5 py-2 border border-white/10 bg-transparent text-white/60 font-bold uppercase text-[8px] tracking-widest",
          grid: "grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4",
          card: "bg-zinc-950 border border-yellow-600/10 p-5 rounded-none space-y-2 shadow-xl hover:border-[#ffd700]/30 transition-all duration-300",
          cardTitle: "font-black uppercase text-[9.5px] tracking-widest text-[#ffd700]",
          cardP: "text-[9px] font-medium text-white/40 leading-relaxed"
        };

      case "cyberpunk":
        return {
          wrapper: "bg-[#06060c] text-[#e0e0e0] p-5 sm:p-8 font-mono space-y-8 min-h-[440px]",
          navbar: "border-b-2 border-[#00ffff] py-3 flex justify-between items-center bg-black px-4",
          logo: "font-black text-[10px] uppercase text-[#ff00ff] tracking-widest neon-glow",
          navLink: "text-[8.5px] font-black uppercase text-[#00ffff] hover:text-[#ff00ff]",
          hero: "text-left py-12 space-y-4 bg-black border-2 border-[#ff00ff] p-5 rounded-none shadow-[4px_4px_0px_0px_#00ffff]",
          badge: "inline-block px-2.5 py-0.5 bg-[#ff00ff]/10 text-[#ff00ff] border border-[#ff00ff] font-black uppercase text-[8.5px] tracking-wider",
          h1: "text-2xl font-black uppercase tracking-tight text-white leading-none font-mono",
          h1Span: "text-[#00ffff] block mt-1",
          p: "text-[9.5px] font-bold text-white/60 max-w-sm leading-relaxed",
          btnGroup: "flex justify-start gap-3 pt-2",
          btnPrimary: "px-4 py-2 border border-[#ff00ff] bg-black text-[#ff00ff] font-black uppercase text-[8.5px] shadow-[2px_2px_0px_0px_#00ffff] hover:translate-y-[-1px] transition-all",
          btnSecondary: "px-4 py-2 border border-[#00ffff] bg-black text-[#00ffff] font-black uppercase text-[8.5px]",
          grid: "grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4",
          card: "bg-black border border-[#00ffff]/30 p-4 rounded-none space-y-2 hover:border-[#ff00ff] transition-all",
          cardTitle: "font-black uppercase text-[9.5px] text-[#ff00ff]",
          cardP: "text-[9px] font-bold text-white/50 leading-normal"
        };

      case "editorial":
        return {
          wrapper: "bg-[#faf8f0] text-[#1c1917] p-5 sm:p-8 font-serif space-y-8 min-h-[440px]",
          navbar: "border-y-2 border-black/80 py-3 flex justify-between items-center bg-transparent",
          logo: "font-black uppercase text-[11px] tracking-tight text-black",
          navLink: "text-[9px] font-black uppercase text-black/80 hover:text-black",
          hero: "text-center py-10 space-y-3 bg-transparent p-4",
          badge: "inline-block px-2 py-0.5 border border-black/40 text-black/60 font-black uppercase text-[7.5px]",
          h1: "text-3xl font-black italic tracking-tight text-neutral-900 leading-none",
          h1Span: "text-stone-600 font-normal block mt-1 text-sm normal-case tracking-normal font-sans",
          p: "text-[11px] text-neutral-700 max-w-md mx-auto leading-relaxed",
          btnGroup: "flex justify-center gap-4 pt-1",
          btnPrimary: "border-b-2 border-black bg-transparent text-black px-1.5 py-0.5 font-bold uppercase text-[9px]",
          btnSecondary: "text-black/50 hover:text-black text-[9px] font-bold uppercase",
          grid: "grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-black/10",
          card: "bg-transparent p-2 space-y-1",
          cardTitle: "font-black uppercase text-[10px] text-black border-b border-black/15 pb-1",
          cardP: "text-[9.5px] text-black/70 leading-relaxed font-sans"
        };

      case "sports-elite":
        return {
          wrapper: "bg-[#090909] text-white p-5 sm:p-8 font-sans space-y-8 min-h-[440px] relative overflow-hidden",
          navbar: "py-3 flex justify-between items-center bg-black border-l-4 border-red-650 px-3",
          logo: "font-black italic uppercase tracking-wider text-[11px] text-red-600",
          navLink: "text-[8.5px] font-black uppercase text-white/70 hover:text-white",
          hero: "text-left py-12 space-y-4 bg-zinc-950 border-r-4 border-red-600 p-6 relative overflow-hidden skew-x-[-1.5deg]",
          badge: "inline-block px-3 py-1 bg-red-600 text-white font-black uppercase text-[8px] italic tracking-widest",
          h1: "text-3xl font-black uppercase tracking-tighter leading-none italic",
          h1Span: "text-red-500 block",
          p: "text-[10px] font-bold text-white/60 max-w-xs leading-relaxed uppercase",
          btnGroup: "flex justify-start gap-3 pt-2",
          btnPrimary: "px-5 py-2.5 bg-red-600 text-white font-black uppercase text-[9.5px] italic tracking-wider hover:opacity-90 transition-all",
          btnSecondary: "px-5 py-2.5 border border-white/20 bg-transparent text-white font-black uppercase text-[9.5px] italic",
          grid: "grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 skew-x-[1.5deg]",
          card: "bg-zinc-900 border-l-4 border-red-600 p-4 space-y-2 hover:bg-zinc-800 transition-colors",
          cardTitle: "font-black uppercase text-[10px] text-white italic",
          cardP: "text-[9px] font-medium text-white/50 leading-normal"
        };

      case "gaming":
        return {
          wrapper: "bg-[#050505] text-[#f4f4f5] p-5 sm:p-8 font-sans space-y-8 min-h-[440px] relative",
          navbar: "border border-zinc-700/50 py-3 flex justify-between items-center bg-zinc-900/60 px-4",
          logo: "font-black text-[10px] tracking-widest text-[#eab308] uppercase",
          navLink: "text-[8px] font-bold uppercase text-white/60 hover:text-[#eab308]",
          hero: "text-center py-10 space-y-4 bg-zinc-900/40 border border-zinc-700/60 p-5 shadow-[4px_4px_0px_0px_#eab308] relative",
          badge: "inline-block px-2.5 py-0.5 bg-[#eab308]/15 text-[#eab308] border border-[#eab308]/30 font-bold uppercase text-[7.5px]",
          h1: "text-2xl font-black uppercase tracking-widest text-white leading-none",
          h1Span: "text-[#eab308] block mt-1",
          p: "text-[10px] font-bold text-white/50 max-w-xs mx-auto leading-relaxed",
          btnGroup: "flex justify-center gap-3 pt-2",
          btnPrimary: "px-4 py-2 bg-[#eab308] text-black font-black uppercase text-[8.5px] tracking-widest hover:opacity-90",
          btnSecondary: "px-4 py-2 border border-zinc-650 bg-black text-white font-bold text-[8.5px] tracking-widest",
          grid: "grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4",
          card: "bg-zinc-900 border border-zinc-800 p-4 space-y-2 hover:shadow-[4px_4px_0px_0px_#eab308] transition-all",
          cardTitle: "font-bold text-[10px] text-[#eab308] uppercase",
          cardP: "text-[9px] font-medium text-white/40 leading-normal"
        };

      case "anime":
        return {
          wrapper: "bg-[#fcf7f2] text-[#0f0f0f] p-5 sm:p-8 font-sans space-y-8 min-h-[440px] relative overflow-hidden",
          navbar: "border-4 border-black py-2.5 flex justify-between items-center bg-white px-3 shadow-[2.5px_2.5px_0px_0px_#000]",
          logo: "font-black uppercase tracking-tight text-[11px] text-black bg-white border border-black px-1.5",
          navLink: "text-[8.5px] font-black uppercase text-black/80 hover:text-black",
          hero: "text-center py-10 space-y-4 border-4 border-black bg-white p-5 shadow-[6px_6px_0px_0px_#000] rotate-[-0.5deg]",
          badge: "inline-block px-2.5 py-0.5 bg-[#fb7185] text-white border-2 border-black font-black uppercase text-[8px] rotate-[2deg]",
          h1: "text-2xl font-black uppercase tracking-tight leading-none",
          h1Span: "text-[#fb7185] block mt-1 bg-yellow-200 border-2 border-black inline-block px-2 rotate-[-1deg]",
          p: "text-[10px] font-bold text-black/75 max-w-xs mx-auto leading-relaxed",
          btnGroup: "flex justify-center gap-3 pt-2",
          btnPrimary: "px-4 py-2 border-2 border-black bg-[#fb7185] text-white font-black uppercase text-[9px] shadow-[2.5px_2.5px_0px_0px_#000]",
          btnSecondary: "px-4 py-2 border-2 border-black bg-white text-black font-black uppercase text-[9px] shadow-[2.5px_2.5px_0px_0px_#000]",
          grid: "grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4",
          card: "bg-white border-4 border-black p-4 space-y-2 shadow-[4px_4px_0px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[6px_6px_0px_0px_#000] transition-all",
          cardTitle: "font-black uppercase text-[10px] text-black",
          cardP: "text-[9px] font-bold text-black/50 leading-normal"
        };

      case "apple-minimal":
        return {
          wrapper: "bg-[#f5f5f7] text-[#1d1d1f] p-5 sm:p-8 font-sans space-y-8 min-h-[440px]",
          navbar: "py-3 flex justify-between items-center bg-white/70 backdrop-blur-md px-4 rounded-full border border-black/5",
          logo: "font-black text-[10px] tracking-tight text-[#1d1d1f] uppercase",
          navLink: "text-[8.5px] font-bold text-[#86868b] hover:text-[#1d1d1f]",
          hero: "text-center py-12 space-y-3 bg-white p-6 rounded-3xl shadow-[0_10px_35px_rgba(0,0,0,0.02)]",
          badge: "inline-block px-2.5 py-0.5 bg-neutral-100 text-[#86868b] rounded-full font-bold text-[7.5px]",
          h1: "text-3xl font-bold tracking-tight text-[#1d1d1f] leading-tight",
          h1Span: "text-[#0066cc] block",
          p: "text-[10.5px] font-medium text-[#86868b] max-w-xs mx-auto leading-relaxed",
          btnGroup: "flex justify-center gap-3 pt-2",
          btnPrimary: "px-5 py-2 bg-[#0066cc] text-white font-bold text-[9.5px] rounded-full hover:opacity-90 transition-all",
          btnSecondary: "px-5 py-2 border border-neutral-200 bg-white text-black font-bold text-[9.5px] rounded-full",
          grid: "grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4",
          card: "bg-white p-4 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.02)] space-y-2 border border-neutral-100/50 hover:shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:scale-[1.01] transition-all",
          cardTitle: "font-bold text-[10.5px] text-[#1d1d1f]",
          cardP: "text-[9px] font-medium text-[#86868b] leading-relaxed"
        };

      case "bento-ui":
        return {
          wrapper: "bg-[#fcfcfc] text-[#09090b] p-5 sm:p-8 font-sans space-y-8 min-h-[440px]",
          navbar: "border border-neutral-150 py-3 flex justify-between items-center bg-white px-4 rounded-2xl",
          logo: "font-black text-[10px] text-black uppercase tracking-tight",
          navLink: "text-[8.5px] font-bold text-neutral-500 hover:text-black",
          hero: "text-left py-10 space-y-3 bg-white border border-neutral-200 p-5 rounded-2xl shadow-sm",
          badge: "inline-block px-2.5 py-0.5 bg-[#6366f1]/10 text-[#6366f1] rounded-full font-bold text-[7.5px]",
          h1: "text-2xl font-black text-neutral-900 tracking-tight leading-tight",
          h1Span: "text-[#6366f1] block",
          p: "text-[10px] font-medium text-neutral-500 leading-relaxed",
          btnGroup: "flex justify-start gap-2 pt-1",
          btnPrimary: "px-4 py-2 bg-[#6366f1] text-white font-bold text-[9px] rounded-xl hover:opacity-90",
          btnSecondary: "px-4 py-2 border border-neutral-200 bg-white text-black font-bold text-[9px] rounded-xl",
          grid: "grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3",
          card: "bg-white border border-neutral-200 p-4 rounded-2xl shadow-sm space-y-1.5 hover:border-neutral-300 transition-all",
          cardTitle: "font-bold text-[10px] text-neutral-800",
          cardP: "text-[9px] font-medium text-neutral-400 leading-normal"
        };

      case "terminal-hacker":
        return {
          wrapper: "bg-[#020202] text-[#4ade80] p-5 sm:p-8 font-mono space-y-8 min-h-[440px] border-t-2 border-[#22c55e]",
          navbar: "border border-[#22c55e]/20 py-2.5 flex justify-between items-center bg-black px-3",
          logo: "font-black text-[9.5px] tracking-widest text-[#22c55e] uppercase",
          navLink: "text-[8.5px] text-[#4ade80]/70 hover:text-[#4ade80]",
          hero: "text-left py-10 space-y-4 bg-black border border-[#22c55e]/30 p-4",
          badge: "inline-block px-2 py-0.5 bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/30 text-[8px] uppercase font-bold",
          h1: "text-xl font-bold tracking-widest text-[#22c55e] leading-none uppercase",
          h1Span: "text-[#4ade80] block mt-1",
          p: "text-[9.5px] text-[#4ade80]/60 max-w-sm leading-relaxed",
          btnGroup: "flex justify-start gap-3 pt-2",
          btnPrimary: "px-4 py-2 border border-[#22c55e] bg-black text-[#22c55e] text-[8.5px] uppercase hover:bg-[#22c55e] hover:text-black transition-all",
          btnSecondary: "px-4 py-2 text-[#4ade80]/50 hover:text-[#4ade80] text-[8.5px] uppercase",
          grid: "grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4",
          card: "bg-black border border-[#22c55e]/20 p-4 space-y-1 hover:border-[#22c55e] transition-all",
          cardTitle: "font-bold text-[9.5px] text-[#22c55e] uppercase",
          cardP: "text-[8.5px] text-[#4ade80]/50 leading-normal"
        };

      default: // Minimal SaaS
        return {
          wrapper: "bg-white text-[#0a0a0a] p-5 sm:p-8 font-sans space-y-8 min-h-[440px]",
          navbar: "border-b border-neutral-100 py-3 flex justify-between items-center bg-white px-4",
          logo: "font-black tracking-tight text-[10px] uppercase text-black",
          navLink: "text-[8.5px] font-bold uppercase text-black/60 hover:text-black",
          hero: "text-center py-12 space-y-4 bg-neutral-50/50 border border-neutral-100 p-6 rounded-2xl shadow-sm",
          badge: "inline-block px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full font-bold text-[8px]",
          h1: "text-2xl font-black text-black tracking-tight leading-tight",
          h1Span: "text-blue-600 block mt-1",
          p: "text-[10.5px] font-medium text-black/50 max-w-xs mx-auto leading-relaxed",
          btnGroup: "flex justify-center gap-2 pt-1",
          btnPrimary: "px-4 py-2 bg-black text-white font-bold text-[9px] rounded-lg hover:opacity-90 transition-all",
          btnSecondary: "px-4 py-2 border border-neutral-200 bg-white text-black font-bold text-[9px] rounded-lg",
          grid: "grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4",
          card: "bg-white border border-neutral-100 p-4 rounded-xl space-y-2 shadow-sm hover:shadow-md hover:border-neutral-200 transition-all",
          cardTitle: "font-bold text-[10.5px] text-black",
          cardP: "text-[9.5px] font-medium text-black/45 leading-relaxed"
        };
    }
  };

  const css = getThemeStyles();

  return (
    <div className="space-y-4">
      {/* Browser bar & device controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-950 text-white p-3 border-4 border-black shadow-[4px_4px_0px_0px_#000]">
        
        {/* Fake dots */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-3 h-3 rounded-full bg-[#FF6B6B]" />
          <div className="w-3 h-3 rounded-full bg-[#FFD93D]" />
          <div className="w-3 h-3 rounded-full bg-[#4ade80]" />
          <span className="text-[10px] font-black uppercase text-white/50 tracking-wider ml-2">PREVIEW BROWSER</span>
        </div>

        {/* Fake URL Bar */}
        <div className="flex-1 max-w-md bg-zinc-900 border border-white/10 rounded px-3 py-1 flex items-center gap-2 text-white/50 text-[10px] font-mono select-none overflow-hidden truncate">
          <Globe className="w-3.5 h-3.5 shrink-0" />
          <span>https://mubixprompts.com/preview/{style.id}</span>
        </div>

        {/* Device toggler */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setDevice("desktop")}
            className={`p-1 border transition-all ${
              device === "desktop" ? "bg-white text-black border-white" : "border-white/10 text-white/60 hover:text-white"
            }`}
            title="Desktop view"
          >
            <Monitor className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setDevice("mobile")}
            className={`p-1 border transition-all ${
              device === "mobile" ? "bg-white text-black border-white" : "border-white/10 text-white/60 hover:text-white"
            }`}
            title="Mobile view"
          >
            <Smartphone className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={triggerRefresh}
            className={`p-1 border border-white/10 hover:bg-white/10 text-white/60 hover:text-white transition-all ${
              isRefreshing ? "animate-spin" : ""
            }`}
            title="Re-render layout"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Simulated Device Frame Container */}
      <div className="flex justify-center border-4 border-black bg-neutral-100 p-6 min-h-[480px] shadow-[4px_4px_0px_0px_#000] transition-all overflow-hidden relative">
        
        <AnimatePresence mode="wait">
          <motion.div
            key={`${style.id}-${device}-${isRefreshing}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className={`transition-all duration-300 border-4 border-black shadow-[4px_4px_0px_0px_#000] overflow-hidden bg-white ${
              device === "mobile" ? "w-[320px]" : "w-full"
            }`}
          >
            {/* Inner Live Page Frame */}
            <div className={css.wrapper}>
              
              {/* Navbar */}
              <div className={css.navbar}>
                <span className={css.logo}>{style.name.toUpperCase()}</span>
                <div className="flex gap-2">
                  <span className={css.navLink}>Home</span>
                  <span className={css.navLink}>Features</span>
                  <span className={css.navLink}>Pricing</span>
                </div>
              </div>

              {/* Hero */}
              <div className={css.hero}>
                <span className={css.badge}>Theme Active</span>
                <h1 className={css.h1}>
                  The Future of <span className={css.h1Span}>AI Prompt Synthesis</span>
                </h1>
                <p className={css.p}>
                  Our design generator successfully maps layouts, styles, dynamic variables, and custom theme presets directly.
                </p>
                <div className={css.btnGroup}>
                  <button className={css.btnPrimary}>Get Started</button>
                  <button className={css.btnSecondary}>Book Demo</button>
                </div>
              </div>

              {/* Grid Cards */}
              <div className={css.grid}>
                {[
                  { title: "Pragmatic Spacing", desc: "Cohesive layout gap models." },
                  { title: "Fluid Typographies", desc: "Responsive heading scales." },
                  { title: "Pristine Buttons", desc: "Spring-motion physics toggles." }
                ].map((card, idx) => (
                  <div key={idx} className={css.card}>
                    <h4 className={css.cardTitle}>{card.title}</h4>
                    <p className={css.cardP}>{card.desc}</p>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="border-t border-black/10 pt-4 flex justify-between text-[9px] font-black uppercase text-black/40">
                <span>© 2026 {style.name} Inc.</span>
                <span>Synthesized by MubixPrompts</span>
              </div>

            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}
