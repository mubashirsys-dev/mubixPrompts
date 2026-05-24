"use client";

import { useBuilderStore } from "@/store/builder-store";
import { Check } from "lucide-react";

export function StepIndicator() {
  const { currentStep, setStep, builderMode } = useBuilderStore();

  const simpleSteps = [
    "Category",
    "Level",
    "Details",
    "Theme",
    "Sections",
    "Smart Features",
    "Generate",
  ];

  const advancedSteps = [
    "Category",
    "Level",
    "Details",
    "Branding",
    "Theme",
    "Sections",
    "Features",
    "APIs",
    "AI Model",
    "Tech Stack",
    "Generate",
  ];

  const activeSteps = builderMode === "simple" ? simpleSteps : advancedSteps;

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-4 pt-2 no-scrollbar">
      {activeSteps.map((label, i) => {
        const step = i + 1;
        const isActive = step === currentStep;
        const isCompleted = step < currentStep;
        const isClickable = step < currentStep;

        return (
          <div key={label} className="flex items-center shrink-0">
            <button
              onClick={() => isClickable && setStep(step)}
              disabled={!isClickable}
              className={`flex items-center gap-2 px-3 py-1.5 border-2 border-black font-black uppercase text-xs transition-all duration-100 ${
                isActive
                  ? "bg-[#FFD93D] text-black shadow-[3px_3px_0px_0px_#000]"
                  : isCompleted
                  ? "bg-[#C4B5FD] text-black hover:bg-[#b09ffd] cursor-pointer shadow-[2px_2px_0px_0px_#000]"
                  : "bg-white text-black/40 cursor-not-allowed"
              }`}
            >
              {isCompleted ? (
                <Check className="w-4 h-4 text-black stroke-[3px]" />
              ) : (
                <span className="w-4 h-4 flex items-center justify-center text-[10px]">
                  {step}
                </span>
              )}
              <span>{label}</span>
            </button>
            {i < activeSteps.length - 1 && (
              <div
                className={`w-3 sm:w-6 h-1 border-y-2 border-black shrink-0 ${
                  isCompleted ? "bg-[#C4B5FD]" : "bg-white"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
