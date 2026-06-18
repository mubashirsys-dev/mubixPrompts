"use client";

import { useBuilderStore } from "@/store/builder-store";
import { Sparkles, Globe, Smile, Shirt, ArrowRight, ArrowLeft, Upload } from "lucide-react";

export function BrandStep() {
  const { brandBuilder, setBrandBuilder, nextStep, prevStep } = useBuilderStore();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: "logoUrl" | "faviconUrl" | "avatarUrl" | "heroMockupUrl") => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setBrandBuilder({ [field]: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const logoTypes = [
    { id: "text", label: "Text Logo", desc: "Clean typographic baseline using custom weights" },
    { id: "icon", label: "Icon Logo", desc: "Stylized vector symbol combined with minimalist text" },
    { id: "graphic", label: "Graphic Logo", desc: "Neobrutalist geometric emblem or complex monogram" },
    { id: "minimal", label: "Minimalist / None", desc: "Conceal header brand mark in favor of pure layouts" },
  ];

  const personalities = [
    { id: "futuristic", label: "High-Tech Futuristic", desc: "Dark theme, neon borders, glowing highlights, and tech stacks" },
    { id: "brutalist", label: "Raw Neobrutalist", desc: "Thick borders, high contrast, vibrant primary blocks, and bold shadows" },
    { id: "professional", label: "Clean Professional", desc: "High-end corporate grids, harmony palettes, and outfit typography" },
    { id: "organic", label: "Warm Organic", desc: "Warm tones, soft typography, spacious padding, and elegant animations" },
  ];

  return (
    <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_#000] space-y-6">
      <div className="flex items-center gap-3 border-b-4 border-black pb-4">
        <div className="w-10 h-10 bg-[#FF6B6B] border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_#000]">
          <Shirt className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-black uppercase text-black">Step 3: Brand Identity Config</h2>
          <p className="text-[11px] text-neutral-500 font-bold uppercase tracking-tight">Configure logo types, style characteristics, and target parameters.</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Logo Type */}
        <div className="space-y-2.5">
          <label className="text-xs font-black uppercase text-black flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#FFD93D] fill-current" />
            1. Select Primary Logo Structure
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {logoTypes.map((t) => {
              const isSelected = brandBuilder.logoType === t.id;
              return (
                <div
                  key={t.id}
                  onClick={() => setBrandBuilder({ logoType: t.id })}
                  className={`border-2 border-black p-3.5 cursor-pointer select-none transition-all duration-100 flex flex-col justify-between ${
                    isSelected
                      ? "bg-[#C4B5FD] shadow-[3px_3px_0px_0px_#000] scale-[1.01]"
                      : "bg-[#FFFDF5] hover:bg-neutral-50 shadow-[1px_1px_0px_0px_#000]"
                  }`}
                >
                  <span className="font-black uppercase text-xs text-black block">{t.label}</span>
                  <span className="text-[10px] text-neutral-500 leading-normal font-semibold block pt-1">{t.desc}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Brand Personality */}
        <div className="space-y-2.5">
          <label className="text-xs font-black uppercase text-black flex items-center gap-1.5">
            <Smile className="w-3.5 h-3.5 text-[#FF6B6B] fill-current" />
            2. Choose Brand Design Personality
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {personalities.map((p) => {
              const isSelected = brandBuilder.brandPersonality === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => setBrandBuilder({ brandPersonality: p.id })}
                  className={`border-2 border-black p-3.5 cursor-pointer select-none transition-all duration-100 flex flex-col justify-between ${
                    isSelected
                      ? "bg-[#FFD93D] shadow-[3px_3px_0px_0px_#000] scale-[1.01]"
                      : "bg-[#FFFDF5] hover:bg-neutral-50 shadow-[1px_1px_0px_0px_#000]"
                  }`}
                >
                  <span className="font-black uppercase text-xs text-black block">{p.label}</span>
                  <span className="text-[10px] text-neutral-500 leading-normal font-semibold block pt-1">{p.desc}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Target Launch URL */}
        <div className="space-y-2">
          <label className="text-xs font-black uppercase text-black flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-emerald-500" />
            3. Target Landing Domain (Optional)
          </label>
          <div className="flex border-4 border-black shadow-[3px_3px_0px_0px_#000]">
            <span className="bg-neutral-100 border-r-2 border-black px-3 py-2 text-xs font-mono font-bold text-neutral-500 select-none flex items-center">
              https://
            </span>
            <input
              type="text"
              placeholder="mybrand.com"
              value={brandBuilder.themeReferenceUrl || ""}
              onChange={(e) => setBrandBuilder({ themeReferenceUrl: e.target.value })}
              className="flex-1 px-3 py-2 bg-white text-xs font-mono font-bold outline-none text-black placeholder-neutral-400"
            />
          </div>
          <span className="text-[9px] text-neutral-400 font-bold block pt-1 uppercase">Optional sandbox landing page deployment target domain config.</span>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center pt-4 border-t-2 border-dashed border-black/10">
        <button
          type="button"
          onClick={prevStep}
          className="border-2 border-black px-4 py-2 font-black uppercase text-xs bg-white text-black hover:bg-neutral-50 shadow-[2px_2px_0px_0px_#000] flex items-center gap-2 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <button
          type="button"
          onClick={nextStep}
          className="border-2 border-black px-4 py-2 font-black uppercase text-xs bg-[#FFD93D] text-black hover:bg-[#ffe169] shadow-[3px_3px_0px_0px_#000] flex items-center gap-2 active:scale-95 transition-all"
        >
          Next Step
          <ArrowRight className="w-4 h-4 animate-bounce" />
        </button>
      </div>
    </div>
  );
}
