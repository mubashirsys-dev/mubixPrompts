"use client";

import { useBuilderStore } from "@/store/builder-store";
import { Navbar } from "@/components/layout/navbar";
import { StepIndicator } from "@/components/builder/step-indicator";
import { CategoryStep } from "@/components/builder/steps/category-step";
import { CoderLevelStep } from "@/components/builder/steps/coder-level-step";
import { DetailsStep } from "@/components/builder/steps/details-step";
import { BrandStep } from "@/components/builder/steps/brand-step";
import { DesignStep } from "@/components/builder/steps/design-step";
import { FeaturesStep } from "@/components/builder/steps/features-step";
import { ApiSetupStep } from "@/components/builder/steps/api-setup-step";
import { AIModelStep } from "@/components/builder/steps/ai-model-step";
import { TechStackStep } from "@/components/builder/steps/tech-stack-step";
import { GenerateStep } from "@/components/builder/steps/generate-step";
import { SectionStep } from "@/components/builder/steps/section-step";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Star, MessageSquare, Lightbulb, Compass } from "lucide-react";
import { AIChatAssistant } from "@/components/shared/ai-chat-assistant";

const simpleStepComponents: Record<number, React.FC> = {
  1: CategoryStep,
  2: CoderLevelStep,
  3: DetailsStep,
  4: DesignStep,
  5: SectionStep,
  6: FeaturesStep,
  7: GenerateStep,
};

const advancedStepComponents: Record<number, React.FC> = {
  1: CategoryStep,
  2: CoderLevelStep,
  3: DetailsStep,
  4: BrandStep,
  5: DesignStep,
  6: SectionStep,
  7: FeaturesStep,
  8: ApiSetupStep,
  9: AIModelStep,
  10: TechStackStep,
  11: GenerateStep,
};

export default function BuilderPage() {
  const { currentStep, builderMode, selectedCategory, selectedDesignStyle, codingLevel } = useBuilderStore();
  
  const activeComponents = builderMode === "simple" ? simpleStepComponents : advancedStepComponents;
  const StepComponent = activeComponents[currentStep] || CategoryStep;

  // Helper Tip Box matching currentStep
  const getHelperTip = (step: number) => {
    switch (step) {
      case 1:
        return "Choose a core category layout. This acts as the calibration base for features recommendation mappings.";
      case 2:
        return "Select Coder Level. Choosing 'Non-Technical' skips billing integration tokens and outputs full code tutorials.";
      case 3:
        return "Define project details, visual brand personality cues, and monetization target goals.";
      case 4:
        return builderMode === "simple"
          ? "Select a visual layout theme. Live Preview Browser displays Switzerland Grid vs Cyberpunk instant render outputs."
          : "Customize branding assets: upload custom PNG vector graphics and logo typography styles.";
      case 5:
        return builderMode === "simple"
          ? "Drag and order visual landing page sections. Arrange sections sequentially with arrow block tags."
          : "Select a visual layout theme. Live Preview Browser displays Switzerland Grid vs Cyberpunk instant render outputs.";
      case 6:
        return builderMode === "simple"
          ? "Toggle smart recommended features. System automatically filters options matching your category preset."
          : "Drag and order visual landing page sections. Arrange sections sequentially with arrow block tags.";
      case 7:
        return builderMode === "simple"
          ? "Start compilation! MubixPrompts forwards requests to secure FreeLLMAPI endpoints."
          : "Toggle smart recommended features. System automatically filters options matching your category preset.";
      default:
        return "Calibrate parameters to synthesize custom 300k+ character master markdown prompts.";
    }
  };

  // AI smart recommendations based on Zustand category selection
  const getAiSuggestion = () => {
    if (!selectedCategory) {
      return "Select a category in Step 1 to unlock pre-calibrated feature blueprints.";
    }

    switch (selectedCategory.id) {
      case "portfolio":
        return "✨ Portfolio Recommended: Enable Contact Inquiry Form, Resume Download, Dark Mode toggle, and detailed SEO Meta.";
      case "saas-dashboard":
        return "🚀 SaaS Recommended: Toggle Clerk authentication, Stripe recurring billing, Admin panel, and User dashboard tables.";
      case "football-academy":
        return "⚽ Sports Recommended: Enable Player panel, Coach dashboard, QR Attendance scanning, and WhatsApp Alerts notifications.";
      default:
        return `📂 ${selectedCategory.name} Recommended: Enable custom sitemaps compliance and analytics dashboard trackers.`;
    }
  };

  return (
    <main className="min-h-screen bg-[#FFFDF5] bg-neo-grid pt-24 text-black pb-16">
      <Navbar />
      <div className="px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          
          {/* Header */}
          <div className="text-center mb-8 space-y-3">
            <span className="inline-block px-3 py-1 bg-[#FFD93D] border-2 border-black font-black uppercase text-xs rotate-[1deg]">
              AI WEBSITE GENERATION OS
            </span>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-black">
              PROMPT <span className="bg-[#FF6B6B] text-white px-2 border-4 border-black inline-block rotate-[-1.5deg] shadow-[3px_3px_0px_0px_#000]">BUILDER WIZARD</span>
            </h1>
            <p className="text-xs font-bold text-black/70 max-w-md mx-auto leading-relaxed">
              Complete each step. Our compiler will assemble a 50k-300k+ character engineering prompt tailored specifically for your target stack.
            </p>
          </div>

          {/* Step Indicator Header Block */}
          <div className="border-4 border-black p-4 bg-white shadow-[4px_4px_0px_0px_#000] mb-8">
            <StepIndicator />
          </div>

          {/* Two-Column Workspace Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left/Center Column: Active Step Form */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${builderMode}-${currentStep}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                >
                  {StepComponent && <StepComponent />}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Column: Sticky Progress & Tips panel */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
              
              {/* Context Summary DNA card */}
              <div className="border-4 border-black bg-white p-5 shadow-[4px_4px_0px_0px_#000] space-y-3">
                <span className="neo-sticker bg-[#FFD93D] text-[9px] font-black uppercase tracking-wide">WORKSPACE DNA</span>
                <div className="space-y-2 text-xs font-bold pt-2 border-t border-black/10">
                  <div className="flex justify-between">
                    <span className="text-black/55">Category:</span>
                    <span className="font-black text-black uppercase">{selectedCategory?.name || "Not Selected"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black/55">Design Style:</span>
                    <span className="font-black text-black uppercase">{selectedDesignStyle?.name || "Default SaaS"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black/55">Level:</span>
                    <span className="font-black text-black uppercase">{codingLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black/55">Wizard Mode:</span>
                    <span className="font-black text-black uppercase bg-black text-[#FFD93D] px-1.5 py-0.5 border border-black">{builderMode}</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Helper tips box */}
              <div className="border-4 border-black bg-[#FFFDF5] p-5 shadow-[4px_4px_0px_0px_#000] space-y-3">
                <h4 className="text-xs font-black uppercase text-black flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-yellow-500 stroke-[3px]" />
                  HELPER TIP
                </h4>
                <p className="text-[11px] font-bold text-black/70 leading-relaxed">
                  {getHelperTip(currentStep)}
                </p>
              </div>

              {/* Smart AI recommendations */}
              <div className="border-4 border-black bg-zinc-950 text-white p-5 shadow-[4px_4px_0px_0px_#000] space-y-3">
                <h4 className="text-xs font-black uppercase text-[#FFD93D] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 stroke-[3px]" />
                  AI RECOMMENDATIONS
                </h4>
                <p className="text-[10px] font-bold text-white/80 leading-relaxed italic">
                  {getAiSuggestion()}
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>
      <AIChatAssistant />
    </main>
  );
}
