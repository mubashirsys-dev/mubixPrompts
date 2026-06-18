"use client";

import { useBuilderStore } from "@/store/builder-store";
import { Check, Lock } from "lucide-react";
import { useRef, useEffect } from "react";
import { getCategoryWorkflowMeta } from "@/lib/workflows-meta";

export function StepIndicator() {
  const { currentStep, setStep, selectedCategory } = useBuilderStore();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        container.scrollLeft += e.deltaY * 1.2;
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const workflow = getCategoryWorkflowMeta(selectedCategory?.id || null);
  const steps = workflow.map((step, idx) => ({
    num: idx + 1,
    label: step.label,
  }));

  return (
    <div
      ref={containerRef}
      className="flex items-center gap-2 overflow-x-auto pb-4 pt-2"
    >
      {steps.map((step, i) => {
        const isActive = step.num === currentStep;
        const isCompleted = step.num < currentStep;
        const isClickable = step.num < currentStep;
        const isSkipped = false;

        return (
          <div key={step.num} className="flex items-center shrink-0">
            <button
              onClick={() => isClickable && setStep(step.num)}
              disabled={!isClickable}
              className={`flex items-center gap-2 px-3 py-1.5 border-2 border-black font-black uppercase text-xs transition-all duration-100 ${isSkipped
                  ? "bg-neutral-100 text-black/20 cursor-not-allowed border-black/20"
                  : isActive
                    ? "bg-[#FFD93D] text-black shadow-[3px_3px_0px_0px_#000]"
                    : isCompleted
                      ? "bg-[#C4B5FD] text-black hover:bg-[#b09ffd] cursor-pointer shadow-[2px_2px_0px_0px_#000]"
                      : "bg-white text-black/40 cursor-not-allowed"
                }`}
            >
              {isSkipped ? (
                <Lock className="w-3.5 h-3.5 text-black/20" />
              ) : isCompleted ? (
                <Check className="w-4 h-4 text-black stroke-[3px]" />
              ) : (
                <span className="w-4 h-4 flex items-center justify-center text-[10px]">
                  {step.num}
                </span>
              )}
              <span>{step.label}</span>
            </button>
            {i < steps.length - 1 && (
              <div
                className={`w-3 sm:w-6 h-1 border-y-2 border-black shrink-0 ${isCompleted && !isSkipped ? "bg-[#C4B5FD]" : "bg-white"
                  }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
