"use client";

import { useBuilderStore } from "@/store/builder-store";
import { Navbar } from "@/components/layout/navbar";
import { Sparkles, ArrowRight, Zap, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { presetPacks } from "@/lib/features";

export default function PresetsPage() {
  const { applyPreset, setStep } = useBuilderStore();
  const router = useRouter();

  const handleApplyPreset = (preset: any) => {
    applyPreset(preset);
    setStep(1); // Set to active step
    router.push("/builder");
  };

  return (
    <div className="min-h-screen bg-[#FFFDF5] text-black pt-24 pb-16">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="inline-block px-3 py-1 bg-[#FFD93D] border-2 border-black font-black uppercase text-xs rotate-[-1deg]">
            TEMPLATES LIST
          </span>
          <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight">
            TEMPLATE <span className="bg-[#FF6B6B] text-white px-2 border-4 border-black inline-block rotate-[2deg] shadow-[4px_4px_0px_0px_#000]">PRESETS</span>
          </h1>
          <p className="text-sm font-bold text-black/70 max-w-xl mx-auto leading-relaxed">
            One-click presets compiled to instantly load recommended categories, features, tech stacks, and styles into the prompt builder workspace.
          </p>
        </div>

        {/* Presets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {presetPacks.map((pack, idx) => (
            <motion.div
              key={pack.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_#000] flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase bg-[#C4B5FD] text-black px-2 py-0.5 border border-black">
                    {pack.category.toUpperCase()}
                  </span>
                  <span className="flex items-center gap-0.5 text-[9px] font-black text-yellow-600 bg-yellow-100 border border-yellow-400 px-2 py-0.5">
                    <Star className="w-2.5 h-2.5 fill-yellow-600" />
                    PRESET
                  </span>
                </div>

                <h3 className="text-lg font-black uppercase tracking-tight">{pack.name}</h3>
                <p className="text-xs font-bold text-black/60 leading-relaxed">{pack.description}</p>

                <div className="space-y-2 border-t border-black/10 pt-3">
                  <div className="flex justify-between text-[10px] font-bold text-black/50 uppercase">
                    <span>Target Level:</span>
                    <span className="text-black font-black">{pack.codingLevel}</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-bold text-black/50 uppercase">
                    <span>Design Style:</span>
                    <span className="text-black font-black">{pack.designStyle}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => handleApplyPreset(pack)}
                  className="w-full py-2.5 border-2 border-black bg-[#FFFDF5] hover:bg-[#FFD93D] text-xs font-black uppercase transition-all flex items-center justify-center gap-2 shadow-[2px_2px_0px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                >
                  Apply Template
                  <ArrowRight className="w-4 h-4 stroke-[3px]" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
