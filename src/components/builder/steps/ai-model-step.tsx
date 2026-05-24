"use client";

import { useBuilderStore } from "@/store/builder-store";
import { aiModels } from "@/lib/ai-models";
import { ArrowRight, ArrowLeft, Check, Star } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { motion } from "framer-motion";

export function AIModelStep() {
  const { selectedAIModel, setAIModel, nextStep, prevStep } = useBuilderStore();

  const getIcon = (iconName: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const icons = LucideIcons as any;
    const Icon = icons[iconName];
    return Icon ? <Icon className="w-6 h-6 stroke-[2.5px]" /> : <LucideIcons.Bot className="w-6 h-6 stroke-[2.5px]" />;
  };

  return (
    <div className="space-y-8 bg-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_0px_#000]">
      <div className="text-center mb-8">
        <span className="inline-block px-3 py-1 bg-[#FFD93D] border-2 border-black font-black uppercase text-xs rotate-[-1deg] mb-4">
          STEP 8: DYNAMIC TARGET MODEL
        </span>
        <h2 className="text-2xl font-black uppercase text-black">Which AI tool will you use?</h2>
        <p className="text-sm font-bold text-black/70 mt-2">
          Select your preferred AI coding tool. The compiler optimizes system structures specific to your choice.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {aiModels.map((model, i) => {
          const isSelected = selectedAIModel?.id === model.id;

          return (
            <motion.button
              key={model.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02, duration: 0.2 }}
              onClick={() => setAIModel(model)}
              className={`relative text-left p-5 border-4 border-black transition-all duration-100 flex flex-col justify-between ${
                isSelected
                  ? "bg-[#FFFDF5] shadow-[6px_6px_0px_0px_#000] translate-x-[-2px] translate-y-[-2px]"
                  : "bg-white hover:bg-neutral-50 shadow-[2px_2px_0px_0px_#000]"
              }`}
            >
              {isSelected && (
                <div className="absolute top-4 right-4 bg-[#FF6B6B] border-2 border-black p-1 shadow-[2px_2px_0px_0px_#000]">
                  <Check className="w-4 h-4 text-white stroke-[3px]" />
                </div>
              )}

              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_#000]"
                  style={{ backgroundColor: `${model.color}20`, color: model.color }}
                >
                  {getIcon(model.icon)}
                </div>
                <div>
                  <h3 className="font-black uppercase text-sm text-black">{model.name}</h3>
                  {model.recommended && (
                    <span className="flex items-center gap-0.5 text-[9px] font-black text-yellow-600 bg-yellow-100 border border-yellow-400 px-2 py-0.5">
                      <Star className="w-2.5 h-2.5 fill-yellow-600" />
                      REC
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xs font-bold text-black/60 leading-relaxed mb-3">{model.description}</p>

              <div className="space-y-1 border-t border-black/10 pt-2">
                <p className="text-[10px] font-black uppercase text-black/50">Best for:</p>
                <p className="text-xs font-bold text-black/80">{model.bestFor}</p>
              </div>

              <div className="flex flex-wrap gap-1 mt-3">
                {model.strengths.slice(0, 3).map((s) => (
                  <span key={s} className="px-2 py-0.5 border border-black text-[9px] font-black uppercase bg-[#C4B5FD] text-black">
                    {s}
                  </span>
                ))}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-10 max-w-5xl mx-auto border-t-4 border-black pt-6">
        <button onClick={prevStep} className="neo-btn text-sm py-2 px-6 font-black uppercase">
          Back
        </button>
        <button
          onClick={nextStep}
          disabled={!selectedAIModel}
          className="neo-btn neo-btn-accent text-sm py-2.5 px-8 font-black uppercase flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Continue
          <ArrowRight className="w-4 h-4 stroke-[3px]" />
        </button>
      </div>
    </div>
  );
}
