"use client";

import { useEffect, useMemo } from "react";
import { useBuilderStore } from "@/store/builder-store";
import { Navbar } from "@/components/layout/navbar";
import { StepIndicator } from "@/components/builder/step-indicator";
import { getCategoryWorkflowMeta } from "@/lib/workflows-meta";

// Core Steps
import { CategoryStep } from "@/components/builder/steps/category-step";
import { WebsiteGoalsStep } from "@/components/builder/steps/website-goals-step";
import { BrandStep } from "@/components/builder/steps/brand-step";
import { DetailsImportStep } from "@/components/builder/steps/details-import-step";
import { DesignStep } from "@/components/builder/steps/design-step";
import { SectionStep } from "@/components/builder/steps/section-step";
import { ContentArchitectureStep } from "@/components/builder/steps/content-architecture-step";
import { AIModelStep } from "@/components/builder/steps/ai-model-step";

// Custom Steps
import { ProjectsStep } from "@/components/builder/steps/projects-step";
import { SkillsStep } from "@/components/builder/steps/skills-step";
import { SocialsStep } from "@/components/builder/steps/socials-step";
import { ProductDetailsStep } from "@/components/builder/steps/product-details-step";
import { PricingStep } from "@/components/builder/steps/pricing-step";
import { CompetitorsStep } from "@/components/builder/steps/competitors-step";
import { RestaurantDetailsStep } from "@/components/builder/steps/restaurant-details-step";
import { MenuStep } from "@/components/builder/steps/menu-step";
import { ReservationStep } from "@/components/builder/steps/reservation-step";
import { AcademyInfoStep } from "@/components/builder/steps/academy-info-step";
import { CoachesStep } from "@/components/builder/steps/coaches-step";
import { ProgramsStep } from "@/components/builder/steps/programs-step";
import { PrayerTimingsStep } from "@/components/builder/steps/prayer-timings-step";
import { EventsStep } from "@/components/builder/steps/events-step";
import { DonationsStep } from "@/components/builder/steps/donations-step";

import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { AIChatAssistant } from "@/components/shared/ai-chat-assistant";

// UNIFIED WORKFLOW STEP COMPONENT MAP
const stepComponentsMap: Record<string, React.FC> = {
  category: CategoryStep,
  goals: WebsiteGoalsStep,
  brand: BrandStep,
  resume: DetailsImportStep,
  theme: DesignStep,
  content: ContentArchitectureStep,
  "ai-model": AIModelStep,
  
  // Custom Portfolio steps
  projects: ProjectsStep,
  skills: SkillsStep,
  socials: SocialsStep,
  
  // Custom SaaS steps
  product: ProductDetailsStep,
  features: SectionStep,
  pricing: PricingStep,
  competitors: CompetitorsStep,
  
  // Custom Restaurant steps
  "restaurant-details": RestaurantDetailsStep,
  menu: MenuStep,
  reservation: ReservationStep,
  
  // Custom Football Academy steps
  "academy-info": AcademyInfoStep,
  coaches: CoachesStep,
  programs: ProgramsStep,
  
  // Custom Mosque steps
  "prayer-timings": PrayerTimingsStep,
  events: EventsStep,
  donations: DonationsStep,
};

export default function BuilderPage() {
  const store = useBuilderStore();
  const {
    currentStep,
    selectedCategory,
    resetBuilder,
    setStep,
    hydrateStore
  } = store;

  // Safe client-side hydration
  useEffect(() => {
    hydrateStore();
  }, [hydrateStore]);

  // Compute dynamic workflow based on active selectedCategory
  const workflow = useMemo(() => {
    return getCategoryWorkflowMeta(selectedCategory?.id || null);
  }, [selectedCategory]);

  const totalSteps = workflow.length;

  // Handle step clamping if category changes or workflow updates
  useEffect(() => {
    if (totalSteps > 0 && workflow.length !== store.totalSteps) {
      useBuilderStore.setState({ totalSteps: workflow.length });
    }
    if (currentStep > workflow.length) {
      setStep(workflow.length);
    }
  }, [workflow.length, currentStep, totalSteps, store.totalSteps, setStep]);

  // Resolve active step component
  const activeStepMeta = workflow[currentStep - 1] || workflow[0] || { id: "category", label: "Category" };
  const StepComponent = stepComponentsMap[activeStepMeta.id] || CategoryStep;

  // Keyboard navigation listener (ENTER = Continue, SHIFT+ENTER = Previous)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeElement = document.activeElement;
      if (activeElement) {
        const tagName = activeElement.tagName.toLowerCase();
        if (
          tagName === "input" || 
          tagName === "textarea" || 
          tagName === "select" || 
          activeElement.getAttribute("contenteditable") === "true"
        ) {
          return;
        }
      }

      if (e.key === "Enter") {
        e.preventDefault();
        if (e.shiftKey) {
          if (currentStep > 1) {
            setStep(currentStep - 1);
          }
        } else {
          if (currentStep < totalSteps) {
            setStep(currentStep + 1);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentStep, totalSteps, setStep]);

  // Calculate metrics for progress bar
  const completionPercentage = Math.round(((currentStep - 1) / totalSteps) * 100);
  const remainingSteps = totalSteps - currentStep;
  const estimatedMinutes = Math.max(1, Math.ceil(remainingSteps * 1.5));

  return (
    <main className="min-h-screen bg-[#FFFDF5] bg-neo-grid pt-24 text-black pb-28">
      <Navbar />
      <div className="px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">

          {/* Header */}
          <div className="text-center mb-8 space-y-3 relative">
            <span className="inline-block px-3 py-1 bg-[#FFD93D] border-2 border-black font-black uppercase text-xs rotate-[1deg]">
              AI WEBSITE PROMPT PLANNER
            </span>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-black">
              WEBSITE <span className="bg-[#FF6B6B] text-white px-2 border-4 border-black inline-block rotate-[-1.5deg] shadow-[3px_3px_0px_0px_#000]">BLUEPRINT GENERATOR</span>
            </h1>
            <p className="text-xs font-bold text-black/70 max-w-md mx-auto leading-relaxed">
              Plan and configure category-specific, clean, production-ready website prompts using keyboard shortcuts.
            </p>

            <button
              type="button"
              onClick={() => {
                if (confirm("Reset current project configurations and start a fresh workspace?")) {
                  if (typeof window !== "undefined") {
                    localStorage.clear();
                    sessionStorage.clear();
                  }
                  resetBuilder(false);
                  setStep(1);
                }
              }}
              className="md:absolute md:top-2 md:right-0 mt-3 md:mt-0 flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-black/60 hover:text-black border border-black/20 hover:border-black/60 px-2.5 py-1.5 bg-[#FFFDF5] shadow-[2px_2px_0px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all mx-auto md:mx-0 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3 stroke-[2.5px]" />
              Reset Project
            </button>
          </div>

          {/* Step Indicator */}
          <div className="border-4 border-black p-4 bg-white shadow-[4px_4px_0px_0px_#000] mb-8">
            <StepIndicator />
          </div>

          {/* Main workspace container */}
          <div className={`${activeStepMeta.id === "theme" ? "max-w-[90rem]" : "max-w-[70rem]"} mx-auto`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
              >
                {StepComponent && <StepComponent />}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* FIXED BOTTOM ACTION BAR */}
      <div className="fixed bottom-0 left-0 right-0 border-t-4 border-black bg-white py-3.5 px-6 z-40 shadow-[0_-4px_0_0_#000] flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Progress & Remaining Specs */}
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="w-full sm:w-48 bg-neutral-100 border-2 border-black h-4 relative shadow-[1px_1px_0_0_#000] overflow-hidden shrink-0">
            <div 
              className="bg-[#A78BFA] h-full border-r-2 border-black transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <div className="text-[10px] font-black uppercase text-black shrink-0 tracking-tight">
            {completionPercentage}% Done • {remainingSteps} Steps left • ~{estimatedMinutes} min remaining
          </div>
        </div>

        {/* Buttons and Indicators */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          {/* Autosave Status indicator */}
          <div className="flex items-center gap-2 border-2 border-black bg-[#FFFDF5] px-2.5 py-1.5 shadow-[1.5px_1.5px_0_0_#000] text-[9px] font-black uppercase tracking-wider text-black font-mono">
            <div className={`w-2 h-2 rounded-full ${
              store.saveStatus === "saving" ? "bg-amber-500 animate-pulse" : "bg-emerald-500"
            }`} />
            {store.saveStatus === "saving" ? "Saving..." : "Draft Saved"}
          </div>

          <div className="flex items-center gap-2">
            {/* Previous Button */}
            {currentStep > 1 && (
              <button
                onClick={() => setStep(currentStep - 1)}
                className="px-3.5 py-2 border-2 border-black bg-white text-xs font-black uppercase text-black hover:bg-neutral-50 shadow-[2px_2px_0_0_#000] active:translate-y-0.5 active:shadow-none transition-all"
                title="Keyboard shortcut: SHIFT+ENTER"
              >
                Previous
              </button>
            )}

            {/* Manual Save Draft */}
            <button
              onClick={() => {
                useBuilderStore.setState({ saveStatus: "saving" });
                setTimeout(() => {
                  useBuilderStore.setState({ saveStatus: "saved" });
                }, 300);
              }}
              className="px-3.5 py-2 border-2 border-black bg-white text-xs font-black uppercase text-black hover:bg-neutral-50 shadow-[2px_2px_0_0_#000] active:translate-y-0.5 active:shadow-none transition-all"
            >
              Save Draft
            </button>

            {/* Continue Button */}
            {currentStep < totalSteps ? (
              <button
                onClick={() => setStep(currentStep + 1)}
                className="px-4 py-2 bg-[#FFD93D] border-2 border-black text-xs font-black uppercase text-black hover:bg-[#ffe169] shadow-[3px_3px_0_0_#000] active:translate-y-0.5 active:shadow-none transition-all"
                title="Keyboard shortcut: ENTER"
              >
                Continue
              </button>
            ) : (
              <span className="text-[10px] font-black uppercase text-neutral-400 bg-neutral-100 border border-dashed border-neutral-300 px-3.5 py-2">
                Compiler Ready
              </span>
            )}
          </div>
        </div>
      </div>

      <AIChatAssistant />
    </main>
  );
}
