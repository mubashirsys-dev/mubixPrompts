"use client";

import { useBuilderStore } from "@/store/builder-store";
import { features, featureCategoryLabels } from "@/lib/features";
import { getAllAllowedFeatureIds } from "@/lib/category-intelligence";
import { ArrowRight, Star, Check, Lock } from "lucide-react";
import { FeatureCategory } from "@/types/builder";

const categoryOrder: FeatureCategory[] = ["authentication", "payments", "dashboards", "advanced"];

export function FeaturesStep() {
  const { selectedCategory, selectedFeatures, toggleFeature, setSelectedFeatures, complexityTier, nextStep, prevStep } = useBuilderStore();

  // Get allowed feature IDs for current complexity tier
  const allowedIds = getAllAllowedFeatureIds(complexityTier);

  // Filter features: show all features for the category, but mark locked ones
  const smartFeatures = features;

  const handleSelectAll = (category: FeatureCategory) => {
    const catFeatures = smartFeatures.filter((f) => f.category === category && allowedIds.has(f.id));
    const allSelected = catFeatures.every((f) => selectedFeatures.includes(f.id));
    if (allSelected) {
      setSelectedFeatures(selectedFeatures.filter((id) => !catFeatures.some((f) => f.id === id)));
    } else {
      const newIds = catFeatures.map((f) => f.id).filter((id) => !selectedFeatures.includes(id));
      setSelectedFeatures([...selectedFeatures, ...newIds]);
    }
  };

  const complexityColor = {
    easy: "bg-[#4ade80]/20 text-[#166534] border-[#166534]/30",
    medium: "bg-[#fde68a]/20 text-[#854d0e] border-[#854d0e]/30",
    advanced: "bg-[#fda4af]/20 text-[#9f1239] border-[#9f1239]/30",
  };

  return (
    <div className="space-y-8 bg-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_0px_#000]">
      <div className="text-center mb-8">
        <span className="inline-block px-3 py-1 bg-[#FFD93D] border-2 border-black font-black uppercase text-xs rotate-[-1deg] mb-4">
          STEP 6: SMART FEATURE ENGINE
        </span>
        <h2 className="text-2xl font-black uppercase text-black">Select Features</h2>
        <p className="text-sm font-bold text-black/70 mt-2">
          Showing features for <strong className="underline uppercase">{selectedCategory?.name}</strong> at <strong className="uppercase text-[#C4B5FD]">{complexityTier}</strong> complexity.
          <span className="ml-2 text-[#FF6B6B] font-black uppercase">({selectedFeatures.length} selected)</span>
        </p>
      </div>

      <div className="space-y-10 max-w-4xl mx-auto">
        {categoryOrder.map((category) => {
          const catFeatures = smartFeatures.filter((f) => f.category === category);
          if (catFeatures.length === 0) return null;

          // Check if any feature in this category is allowed
          const hasAllowed = catFeatures.some(f => allowedIds.has(f.id));
          const allSelected = catFeatures.filter(f => allowedIds.has(f.id)).every((f) => selectedFeatures.includes(f.id));

          return (
            <div key={category} className="border-4 border-black p-6 bg-[#FFFDF5] shadow-[4px_4px_0px_0px_#000]">
              <div className="flex items-center justify-between mb-4 border-b-2 border-black pb-2">
                <h3 className="text-md font-black uppercase text-black">
                  {featureCategoryLabels[category]}
                </h3>
                {hasAllowed && (
                  <button
                    onClick={() => handleSelectAll(category)}
                    className="text-xs font-black uppercase text-black hover:underline"
                  >
                    {allSelected ? "[ Deselect All ]" : "[ Select All ]"}
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {catFeatures.map((feature) => {
                  const isSelected = selectedFeatures.includes(feature.id);
                  const isLocked = !allowedIds.has(feature.id);

                  return (
                    <button
                      key={feature.id}
                      onClick={() => !isLocked && toggleFeature(feature.id)}
                      disabled={isLocked}
                      className={`flex items-start gap-3 p-4 border-2 border-black text-left transition-all duration-100 ${
                        isLocked
                          ? "bg-neutral-100 opacity-50 cursor-not-allowed shadow-none"
                          : isSelected
                            ? "bg-[#C4B5FD] shadow-[3px_3px_0px_0px_#000] translate-x-[-1px] translate-y-[-1px]"
                            : "bg-white hover:bg-neutral-50 shadow-[1px_1px_0px_0px_#000]"
                      }`}
                    >
                      <div className={`mt-0.5 w-5 h-5 border-2 border-black flex items-center justify-center shrink-0 ${
                        isLocked ? "bg-neutral-200" : isSelected ? "bg-black text-white" : "bg-white"
                      }`}>
                        {isLocked ? <Lock className="w-3 h-3 text-black/40" /> : isSelected && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                      </div>
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-black text-sm uppercase text-black">{feature.name}</span>
                          <span className={`text-[9px] font-black uppercase px-2 py-0.5 border ${complexityColor[feature.complexity]}`}>
                            {feature.complexity}
                          </span>
                          {isLocked && (
                            <span className="text-[9px] font-black uppercase bg-neutral-200 text-black/40 px-2 py-0.5 border border-black/10">
                              Requires Advanced+
                            </span>
                          )}
                          {!isLocked && feature.recommended && (
                            <span className="flex items-center gap-0.5 text-[9px] font-black text-yellow-600 bg-yellow-100 border border-yellow-400 px-2 py-0.5">
                              <Star className="w-2.5 h-2.5 fill-yellow-600" />
                              REC
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-bold text-black/60 leading-relaxed">{feature.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6 border-t-4 border-black">
        <button onClick={prevStep} className="neo-btn text-sm py-2 px-6 font-black uppercase">
          Back
        </button>
        <button
          onClick={nextStep}
          className="neo-btn neo-btn-accent text-sm py-2 px-6 font-black uppercase flex items-center gap-2"
        >
          Continue
          <ArrowRight className="w-4 h-4 stroke-[3px]" />
        </button>
      </div>
    </div>
  );
}
