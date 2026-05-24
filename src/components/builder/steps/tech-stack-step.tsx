"use client";

import { useBuilderStore } from "@/store/builder-store";
import { techStackItems, techStackCategoryLabels } from "@/lib/tech-stacks";
import { ArrowRight, ArrowLeft, Star, Check } from "lucide-react";
import { TechStackCategory } from "@/types/builder";

const categoryOrder: TechStackCategory[] = [
  "frontend", "styling", "ui", "animations", "backend",
  "database", "hosting", "storage", "state", "forms", "validation", "charts",
];

export function TechStackStep() {
  const { selectedTechStack, toggleTechStack, nextStep, prevStep } = useBuilderStore();

  return (
    <div className="space-y-8 bg-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_0px_#000]">
      <div className="text-center mb-8">
        <span className="inline-block px-3 py-1 bg-[#FFD93D] border-2 border-black font-black uppercase text-xs rotate-[-1deg] mb-4">
          STEP 9: TECH STACK SPEC
        </span>
        <h2 className="text-2xl font-black uppercase text-black">Choose your tech stack</h2>
        <p className="text-sm font-bold text-black/70 mt-2">
          Select target developer tools. Recommended items are pre-selected by default.
          <span className="ml-2 text-[#FF6B6B] font-black uppercase">({selectedTechStack.length} selected)</span>
        </p>
      </div>

      <div className="space-y-8 max-w-4xl mx-auto">
        {categoryOrder.map((category) => {
          const items = techStackItems.filter((t) => t.category === category);
          if (items.length === 0) return null;

          return (
            <div key={category} className="border-4 border-black p-6 bg-[#FFFDF5] shadow-[4px_4px_0px_0px_#000]">
              <h3 className="text-md font-black uppercase text-black border-b-2 border-black pb-2 mb-4">
                {techStackCategoryLabels[category]}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {items.map((item) => {
                  const isSelected = selectedTechStack.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleTechStack(item.id)}
                      className={`flex items-start gap-3 p-4 border-2 border-black text-left transition-all duration-100 ${
                        isSelected
                          ? "bg-[#C4B5FD] shadow-[3px_3px_0px_0px_#000] translate-x-[-1px] translate-y-[-1px]"
                          : "bg-white hover:bg-neutral-50 shadow-[1px_1px_0px_0px_#000]"
                      }`}
                    >
                      <div className={`mt-0.5 w-5 h-5 border-2 border-black flex items-center justify-center shrink-0 ${
                        isSelected ? "bg-black text-white" : "bg-white"
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-black uppercase text-sm text-black">{item.name}</span>
                          {item.recommended && (
                            <span className="flex items-center gap-0.5 text-[9px] font-black text-yellow-600 bg-yellow-100 border border-yellow-400 px-2 py-0.5">
                              <Star className="w-2.5 h-2.5 fill-yellow-600" />
                              REC
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-bold text-black/60 mt-1 leading-relaxed">{item.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Select Recommended */}
      <div className="max-w-4xl mx-auto mt-6 flex justify-center">
        <button
          className="py-2.5 px-6 border-2 border-black bg-white hover:bg-[#FFD93D] font-black uppercase text-xs shadow-[3px_3px_0px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none flex items-center gap-2"
          onClick={() => {
            const recommended = techStackItems.filter((t) => t.recommended).map((t) => t.id);
            const currentSet = new Set(selectedTechStack);
            recommended.forEach((id) => currentSet.add(id));
            useBuilderStore.getState().setSelectedTechStack(Array.from(currentSet));
          }}
        >
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-500" />
          Select All Recommended
        </button>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-10 max-w-4xl mx-auto border-t-4 border-black pt-6">
        <button onClick={prevStep} className="neo-btn text-sm py-2 px-6 font-black uppercase">
          Back
        </button>
        <button
          onClick={nextStep}
          className="neo-btn neo-btn-accent text-sm py-2.5 px-8 font-black uppercase flex items-center gap-2"
        >
          Continue
          <ArrowRight className="w-4 h-4 stroke-[3px]" />
        </button>
      </div>
    </div>
  );
}
