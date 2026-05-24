"use client";

import { useBuilderStore } from "@/store/builder-store";
import { Sparkles, Upload, FileImage, ShieldAlert, Check } from "lucide-react";
import { useState } from "react";

const logoTypes = [
  "Minimal",
  "Modern",
  "Luxury",
  "Mascot",
  "Sports",
  "AI",
  "Monogram",
  "Typography",
];

const personalities = [
  "Premium",
  "Aggressive",
  "Friendly",
  "Futuristic",
  "Minimal",
  "Islamic",
  "Sports",
  "Corporate",
];

export function BrandStep() {
  const { brandBuilder, setBrandBuilder, nextStep, prevStep } = useBuilderStore();
  const [logoName, setLogoName] = useState(brandBuilder.logoUrl || "");
  const [faviconName, setFaviconName] = useState(brandBuilder.faviconUrl || "");
  const [mockupName, setMockupName] = useState(brandBuilder.heroMockupUrl || "");

  const handleSimulatedUpload = (type: "logo" | "favicon" | "mockup", e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === "logo") {
      setLogoName(file.name);
      setBrandBuilder({ logoUrl: file.name });
    } else if (type === "favicon") {
      setFaviconName(file.name);
      setBrandBuilder({ faviconUrl: file.name });
    } else if (type === "mockup") {
      setMockupName(file.name);
      setBrandBuilder({ heroMockupUrl: file.name });
    }
  };

  return (
    <div className="space-y-8 bg-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_0px_#000]">
      <div className="space-y-2">
        <h3 className="text-2xl font-black uppercase tracking-tight text-black text-center">
          🏷️ BRAND BUILDER ENGINE
        </h3>
        <p className="text-sm font-bold text-black/70 text-center max-w-lg mx-auto">
          Configure your logo styles, brand personality, and upload corporate visual assets to bake asset references directly into the generated AI Prompt.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Logo Type */}
        <div className="space-y-4 border-4 border-black p-6 bg-[#FFFDF5] shadow-[4px_4px_0px_0px_#000] flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-black uppercase text-black border-b-2 border-black pb-2 mb-2">
              1. SELECT LOGO STYLE
            </h4>
            <p className="text-[11px] font-bold text-black/60 mb-4">
              Choose the visual category of your branding logotype.
            </p>
            <div className="grid grid-cols-2 gap-2">
              {logoTypes.map((type) => {
                const isSelected = brandBuilder.logoType === type;
                return (
                  <button
                    key={type}
                    onClick={() => setBrandBuilder({ logoType: type })}
                    className={`py-2 px-3 border-2 border-black font-black uppercase text-[10px] shadow-[2px_2px_0px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all ${
                      isSelected
                        ? "bg-[#FFD93D] text-black"
                        : "bg-white text-black hover:bg-neutral-50"
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Personality */}
        <div className="space-y-4 border-4 border-black p-6 bg-[#FFFDF5] shadow-[4px_4px_0px_0px_#000] flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-black uppercase text-black border-b-2 border-black pb-2 mb-2">
              2. BRAND PERSONALITY
            </h4>
            <p className="text-[11px] font-bold text-black/60 mb-4">
              Define the target mood, traits, and layout style guidelines.
            </p>
            <div className="grid grid-cols-2 gap-2">
              {personalities.map((pers) => {
                const isSelected = brandBuilder.brandPersonality === pers;
                return (
                  <button
                    key={pers}
                    onClick={() => setBrandBuilder({ brandPersonality: pers })}
                    className={`py-2 px-3 border-2 border-black font-black uppercase text-[10px] shadow-[2px_2px_0px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all ${
                      isSelected
                        ? "bg-[#FF6B6B] text-white"
                        : "bg-white text-black hover:bg-neutral-50"
                    }`}
                  >
                    {pers}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Asset Uploaders */}
        <div className="space-y-4 border-4 border-black p-6 bg-[#FFFDF5] shadow-[4px_4px_0px_0px_#000] flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-black uppercase text-black border-b-2 border-black pb-2 mb-2">
              3. BRAND VISUAL ASSETS
            </h4>
            <p className="text-[11px] font-bold text-black/60 mb-4">
              Upload files to reference actual assets directly inside the prompt.
            </p>
            <div className="space-y-3">
              {/* Logo File */}
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-black block">LOGO IMAGE</label>
                <div className="relative border-2 border-dashed border-black bg-white p-2 text-center flex items-center justify-between">
                  <span className="text-[10px] font-bold truncate max-w-[120px]">
                    {logoName ? `✅ ${logoName}` : "Choose logo file..."}
                  </span>
                  <label className="cursor-pointer bg-[#C4B5FD] border border-black px-2 py-0.5 text-[9px] font-black uppercase shadow-[1px_1px_0px_0px_#000]">
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleSimulatedUpload("logo", e)}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Favicon File */}
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-black block">FAVICON ICON</label>
                <div className="relative border-2 border-dashed border-black bg-white p-2 text-center flex items-center justify-between">
                  <span className="text-[10px] font-bold truncate max-w-[120px]">
                    {faviconName ? `✅ ${faviconName}` : "Choose favicon..."}
                  </span>
                  <label className="cursor-pointer bg-[#C4B5FD] border border-black px-2 py-0.5 text-[9px] font-black uppercase shadow-[1px_1px_0px_0px_#000]">
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleSimulatedUpload("favicon", e)}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Hero Mockup */}
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-black block">HERO MOCKUP IMAGE</label>
                <div className="relative border-2 border-dashed border-black bg-white p-2 text-center flex items-center justify-between">
                  <span className="text-[10px] font-bold truncate max-w-[120px]">
                    {mockupName ? `✅ ${mockupName}` : "Choose mockup..."}
                  </span>
                  <label className="cursor-pointer bg-[#C4B5FD] border border-black px-2 py-0.5 text-[9px] font-black uppercase shadow-[1px_1px_0px_0px_#000]">
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleSimulatedUpload("mockup", e)}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Summary Sticker */}
      <div className="border-4 border-black p-4 bg-white text-center flex flex-col sm:flex-row items-center justify-center gap-4">
        <span className="neo-sticker bg-[#C4B5FD] text-black text-xs font-black uppercase">
          🧬 DNA TARGET: {brandBuilder.brandPersonality} {brandBuilder.logoType}
        </span>
        {logoName && (
          <span className="neo-sticker bg-[#4ade80] text-black text-xs font-black uppercase">
            Logo: {logoName}
          </span>
        )}
        {faviconName && (
          <span className="neo-sticker bg-[#FFD93D] text-black text-xs font-black uppercase">
            Favicon Loaded
          </span>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6 border-t-4 border-black">
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
          <Sparkles className="w-4 h-4 stroke-[3px]" />
        </button>
      </div>
    </div>
  );
}
