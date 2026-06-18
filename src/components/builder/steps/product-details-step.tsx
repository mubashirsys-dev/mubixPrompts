"use client";

import { useBuilderStore } from "@/store/builder-store";
import { Sparkles, Smile, Laptop, AlignLeft, ShieldAlert } from "lucide-react";

export function ProductDetailsStep() {
  const { projectDetails, setProjectDetails, brandBuilder, setBrandBuilder } = useBuilderStore();

  const logoTypes = [
    { id: "text", label: "Text Logo", desc: "Clean typographic baseline using custom weights" },
    { id: "icon", label: "Icon Logo", desc: "Stylized vector symbol combined with minimalist text" },
    { id: "graphic", label: "Graphic Logo", desc: "Neobrutalist geometric emblem or complex monogram" },
    { id: "minimal", label: "Minimalist / None", desc: "Conceal header brand mark in favor of pure layouts" }
  ];

  const personalities = [
    { id: "futuristic", label: "High-Tech Futuristic", desc: "Dark theme, neon borders, glowing highlights, and tech stacks" },
    { id: "brutalist", label: "Raw Neobrutalist", desc: "Thick borders, high contrast, vibrant primary blocks, and bold shadows" },
    { id: "professional", label: "Clean Professional", desc: "High-end corporate grids, harmony palettes, and outfit typography" },
    { id: "organic", label: "Warm Organic", desc: "Warm tones, soft typography, spacious padding, and elegant animations" }
  ];

  return (
    <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_#000] space-y-6">
      <div className="flex items-center gap-3 border-b-4 border-black pb-4">
        <div className="w-10 h-10 bg-[#C4B5FD] border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_#000]">
          <Laptop className="w-5 h-5 text-black" />
        </div>
        <div>
          <h2 className="text-xl font-black uppercase text-black">Product Details</h2>
          <p className="text-[11px] text-neutral-500 font-bold uppercase tracking-tight">Configure your SaaS product name, core vision, and design style</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left column: Core Product Metadata */}
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-black">SaaS Product Name*</label>
            <input
              type="text"
              required
              placeholder="e.g. Linear, MubixOS"
              value={projectDetails.projectName || ""}
              onChange={(e) => setProjectDetails({ projectName: e.target.value, businessName: e.target.value })}
              className="w-full px-2.5 py-2 border-2 border-black bg-white text-xs font-bold outline-none shadow-[2px_2px_0px_0px_#000]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-black">Tagline / Headline*</label>
            <input
              type="text"
              required
              placeholder="e.g. Issue tracking designed for high-performance teams."
              value={projectDetails.tagline || ""}
              onChange={(e) => setProjectDetails({ tagline: e.target.value })}
              className="w-full px-2.5 py-2 border-2 border-black bg-white text-xs font-bold outline-none shadow-[2px_2px_0px_0px_#000]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-black">Product Niche / Core Vision</label>
            <textarea
              placeholder="Describe the SaaS mission, what problems it solves, and target value proposition..."
              value={projectDetails.projectGoals || ""}
              onChange={(e) => setProjectDetails({ projectGoals: e.target.value })}
              rows={4}
              className="w-full px-2.5 py-2 border-2 border-black bg-white text-xs font-bold outline-none shadow-[2px_2px_0px_0px_#000] resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-black">Target Audience</label>
            <input
              type="text"
              placeholder="e.g. Tech Startups, Independent Developers"
              value={projectDetails.targetAudience || ""}
              onChange={(e) => setProjectDetails({ targetAudience: e.target.value })}
              className="w-full px-2.5 py-2 border-2 border-black bg-white text-xs font-bold outline-none shadow-[2px_2px_0px_0px_#000]"
            />
          </div>
        </div>

        {/* Right column: Design Personality & Brand Style */}
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-black flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#FFD93D] fill-current" />
              Logo Structure
            </label>
            <div className="grid grid-cols-2 gap-2">
              {logoTypes.map((t) => {
                const isSelected = brandBuilder.logoType === t.id;
                return (
                  <div
                    key={t.id}
                    onClick={() => setBrandBuilder({ logoType: t.id })}
                    className={`border border-black p-2.5 cursor-pointer select-none transition-all flex flex-col justify-between ${
                      isSelected
                        ? "bg-[#C4B5FD] shadow-[2px_2px_0px_0px_#000] scale-[1.01] border-2"
                        : "bg-[#FFFDF5] hover:bg-neutral-50 shadow-[1px_1px_0px_0px_#000]"
                    }`}
                  >
                    <span className="font-black uppercase text-[10px] text-black">{t.label}</span>
                    <span className="text-[8px] text-neutral-500 leading-tight font-semibold pt-0.5">{t.desc}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-black flex items-center gap-1">
              <Smile className="w-3.5 h-3.5 text-[#FF6B6B] fill-current" />
              Design Personality
            </label>
            <div className="grid grid-cols-2 gap-2">
              {personalities.map((p) => {
                const isSelected = brandBuilder.brandPersonality === p.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => setBrandBuilder({ brandPersonality: p.id })}
                    className={`border border-black p-2.5 cursor-pointer select-none transition-all flex flex-col justify-between ${
                      isSelected
                        ? "bg-[#FFD93D] shadow-[2px_2px_0px_0px_#000] scale-[1.01] border-2"
                        : "bg-[#FFFDF5] hover:bg-neutral-50 shadow-[1px_1px_0px_0px_#000]"
                    }`}
                  >
                    <span className="font-black uppercase text-[10px] text-black">{p.label}</span>
                    <span className="text-[8px] text-neutral-500 leading-tight font-semibold pt-0.5">{p.desc}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
