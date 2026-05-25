"use client";

import { useEffect } from "react";
import { useBuilderStore } from "@/store/builder-store";
import { Navbar } from "@/components/layout/navbar";
import { StepIndicator } from "@/components/builder/step-indicator";
import { CategoryStep } from "@/components/builder/steps/category-step";
import { WebsiteGoalsStep } from "@/components/builder/steps/website-goals-step";
import { BrandStep } from "@/components/builder/steps/brand-step";
import { DetailsImportStep } from "@/components/builder/steps/details-import-step";
import { DesignStep } from "@/components/builder/steps/design-step";
import { SectionStep } from "@/components/builder/steps/section-step";
import { ContentArchitectureStep } from "@/components/builder/steps/content-architecture-step";
import { AIModelStep } from "@/components/builder/steps/ai-model-step";
import { DeploymentStep } from "@/components/builder/steps/deployment-step";
import { SecurityStep } from "@/components/builder/steps/security-step";
import { GenerateStep } from "@/components/builder/steps/generate-step";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Star, Lightbulb, Activity, Database, Shield, RotateCcw } from "lucide-react";
import { AIChatAssistant } from "@/components/shared/ai-chat-assistant";

// ============================================================
// UNIFIED STEP MAP — 11 steps linear planning
// ============================================================
const stepComponents: Record<number, React.FC> = {
  1: CategoryStep,
  2: WebsiteGoalsStep,
  3: BrandStep,
  4: DetailsImportStep,
  5: DesignStep,
  6: SectionStep,
  7: ContentArchitectureStep,
  8: AIModelStep,
  9: DeploymentStep,
  10: SecurityStep,
  11: GenerateStep,
};

export default function BuilderPage() {
  const store = useBuilderStore();
  const {
    currentStep,
    selectedCategory,
    selectedDesignStyle,
    selectedFeatures,
    complexityTier,
    selectedSections,
    setupApis,
    rememberProject,
    setRememberProject,
    resetBuilder,
    setStep,
    hydrateStore
  } = store;

  // Safe client-side hydration
  useEffect(() => {
    hydrateStore();
  }, [hydrateStore]);

  const StepComponent = stepComponents[currentStep] || CategoryStep;

  // Helper Tip matching currentStep
  const getHelperTip = (step: number) => {
    switch (step) {
      case 1:
        return "Select a website category template. Simple search filters highlight popular templates.";
      case 2:
        return "Select your primary objectives and choose your prompt generation speed tier (Fast, Standard, Ultra).";
      case 3:
        return "Configure your brand characteristics, logo structure, and custom launch domains.";
      case 4:
        return "Provide details or upload a resume to automatically extract content and auto-fill your core sections.";
      case 5:
        return "Choose a visual theme. Your uploaded profile picture or mockups will render live in the browser sandbox.";
      case 6:
        return "Arrange your website homepage sections in their visual sequence. Reorder, duplicate, or delete instantly.";
      case 7:
        return "Presents editable parsed sections with desktop, tablet, and mobile live responsive previews.";
      case 8:
        return "Select your target AI model engine (ChatGPT, Claude, Gemini, etc.) and optimize instructions for its capabilities.";
      case 9:
        return "Choose standard deployment channels: direct ZIP export, Deploy to Vercel instructions, or GitHub repository.";
      case 10:
        return "Configure simple high-integrity protection measures like XSS and CSRF safeguards and spam verification.";
      case 11:
        return "Review, copy and compile your complete, premium prompt. Reset your workspace cleanly for subsequent tasks.";
      default:
        return "Complete each step to build your perfect website blueprint prompt.";
    }
  };

  const getAiSuggestion = () => {
    if (!selectedCategory) {
      return "Select a category in Step 1 to pre-load a customized blueprint.";
    }
    return `📂 ${selectedCategory.name} Mode Active: Clean, standard layouts are pre-selected. All advanced systems remain lightweight by default.`;
  };

  // Full-width for design and preview steps
  const isFullWidth = currentStep === 5 || currentStep === 7;

  return (
    <main className="min-h-screen bg-[#FFFDF5] bg-neo-grid pt-24 text-black pb-16">
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
              Complete each step to generate a category-specific, clean, production-ready website master prompt.
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

          {/* Workspace Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Main Content */}
            <div className={isFullWidth ? "lg:col-span-12" : "lg:col-span-8"}>
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

            {/* Sidebar (hidden on full-width steps) */}
            {!isFullWidth && (
              <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">

                {/* Workspace DNA */}
                <div className="border-4 border-black bg-white p-5 shadow-[4px_4px_0px_0px_#000] space-y-3">
                  <span className="neo-sticker bg-[#FFD93D] text-[9px] font-black uppercase tracking-wide">WORKSPACE DNA</span>
                  <div className="space-y-2 text-xs font-bold pt-2 border-t border-black/10">
                    <div className="flex justify-between">
                      <span className="text-black/55">Category:</span>
                      <span className="font-black text-black uppercase">{selectedCategory?.name || "Not Selected"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-black/55">Design Style:</span>
                      <span className="font-black text-black uppercase">{selectedDesignStyle?.name || "Not Selected"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-black/55">Generation Speed:</span>
                      <span className="font-black text-black uppercase bg-[#C4B5FD] px-1.5 py-0.5 border border-black">
                        {complexityTier === "simple" ? "Fast" : complexityTier === "advanced" || complexityTier === "enterprise" ? "Ultra" : "Standard"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Session & Persistence Controls */}
                <div className="border-4 border-black bg-[#C4B5FD] p-5 shadow-[4px_4px_0px_0px_#000] space-y-3">
                  <span className="neo-sticker bg-black text-white text-[9px] font-black uppercase tracking-wide">
                    SESSION MANAGER
                  </span>
                  
                  <div className="pt-2 border-t border-black/20">
                    {/* Remember Checkbox */}
                    <label className="flex items-center gap-2.5 cursor-pointer select-none">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={rememberProject}
                          onChange={(e) => setRememberProject(e.target.checked)}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 border-2 border-black flex items-center justify-center transition-all ${
                          rememberProject ? "bg-black text-white" : "bg-white"
                        }`}>
                          {rememberProject && (
                            <svg className="w-3.5 h-3.5 stroke-[4px] stroke-white" fill="none" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="text-xs font-black uppercase text-black">
                        Remember Previous Project
                      </span>
                    </label>
                  </div>
                </div>

                {/* Helper Tip */}
                <div className="border-4 border-black bg-[#FFFDF5] p-5 shadow-[4px_4px_0px_0px_#000] space-y-3">
                  <h4 className="text-xs font-black uppercase text-black flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4 text-yellow-500 stroke-[3px]" />
                    HELPER TIP
                  </h4>
                  <p className="text-[11px] font-bold text-black/70 leading-relaxed">
                    {getHelperTip(currentStep)}
                  </p>
                </div>

                {/* AI Recommendations */}
                <div className="border-4 border-black bg-zinc-950 text-white p-5 shadow-[4px_4px_0px_0px_#000] space-y-3">
                  <h4 className="text-xs font-black uppercase text-[#FFD93D] flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 stroke-[3px]" />
                    AI RECOMMENDATIONS
                  </h4>
                  <p className="text-[10px] font-bold text-white/80 leading-relaxed italic">
                    {getAiSuggestion()}
                  </p>
                </div>

                {/* Workspace Status */}
                <div className="border-4 border-black bg-white p-5 shadow-[4px_4px_0px_0px_#000] space-y-3">
                  <span className="neo-sticker bg-[#FF6B6B] text-white text-[9px] font-black uppercase tracking-wide">WORKSPACE STATUS</span>
                  <div className="space-y-2 text-xs font-bold pt-2 border-t border-black/10">
                    <div className="flex justify-between items-center">
                      <span className="text-black/55 flex items-center gap-1"><Activity className="w-3 h-3" /> Planner:</span>
                      <span className="font-black text-green-600 uppercase text-[10px]">Active</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-black/55 flex items-center gap-1"><Database className="w-3 h-3" /> Sections:</span>
                      <span className="font-black text-black uppercase text-[10px]">{selectedSections.length} queued</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-black/55 flex items-center gap-1"><Shield className="w-3 h-3" /> Security:</span>
                      <span className="font-black text-black uppercase text-[10px]">Standard</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-black/55 flex items-center gap-1"><Star className="w-3 h-3" /> Features:</span>
                      <span className="font-black text-black uppercase text-[10px]">{selectedFeatures.length} active</span>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>

        </div>
      </div>
      <AIChatAssistant />
    </main>
  );
}
