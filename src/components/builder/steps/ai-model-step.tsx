"use client";

import { useBuilderStore } from "@/store/builder-store";
import { aiModels } from "@/lib/ai-models";
import { AIModel, ComplexityTier } from "@/types/builder";
import { 
  Cpu, Zap, Sparkles, MessageCircle, Bot, Database, ArrowRight, ArrowLeft, ShieldAlert, Check, HelpCircle 
} from "lucide-react";

export function AIModelStep() {
  const { 
    selectedAIModel, setAIModel,
    complexityTier, setComplexityTier,
    nextStep, prevStep 
  } = useBuilderStore();

  // Explicitly filter the 6 requested core models
  const supportedModels = aiModels.filter(m => 
    ["chatgpt", "claude", "gemini", "groq", "deepseek", "perplexity"].includes(m.id)
  );

  const handleSelectModel = (model: AIModel) => {
    setAIModel(model);
  };

  const handleSelectMode = (tier: ComplexityTier) => {
    setComplexityTier(tier);
  };

  // Check if a model is currently selected
  const hasSelected = !!selectedAIModel;

  return (
    <div className="max-w-[70rem] mx-auto px-4 space-y-6">
      
      {/* Title Header */}
      <div className="text-center">
        <span className="inline-block px-3 py-1 bg-[#A78BFA] text-black border-2 border-black font-black uppercase text-xs rotate-[-1deg] mb-4">
          STEP 8: AI COMPILER ENGINE & SPEED SELECTOR
        </span>
        <h2 className="text-3xl font-black uppercase text-black">
          AI Engine Selection
        </h2>
        <p className="text-xs font-bold text-black/70 mt-2">
          Select your target AI model and performance speed tier. The output prompt blueprints will automatically adapt to each model's layout reasoning style.
        </p>
      </div>

      {/* ==================================================== */}
      {/* 1. SPEED ENGINE SELECTION (FAST, STANDARD, ULTRA) */}
      {/* ==================================================== */}
      <div className="bg-white border-4 border-black p-5 shadow-[4px_4px_0px_0px_#000] space-y-4">
        <h3 className="text-sm font-black uppercase text-black flex items-center gap-1.5">
          <Zap className="w-4 h-4 text-[#FFD93D]" />
          Select Compilation Speed Mode
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              id: "simple" as const,
              label: "FAST MODE",
              desc: "Instant static blueprints. Lightweight layout scaffolding tailored for simple personal sites.",
              specs: "Llama-3 / Gemini Flash • Sub-second generation",
              color: "border-[#4ade80] hover:bg-[#4ade80]/5",
              activeBg: "bg-[#4ade80]/20 shadow-[6px_6px_0px_0px_#000] translate-y-[-2px] border-4 border-black",
              badgeColor: "bg-[#4ade80]"
            },
            {
              id: "standard" as const,
              label: "STANDARD AI",
              desc: "Balanced full-stack structure. Includes FAQ, interactive dynamic state components, and blog schemas.",
              specs: "Claude-3.5-Sonnet / ChatGPT-4o • Highly structured logic",
              color: "border-[#A78BFA] hover:bg-[#A78BFA]/5",
              activeBg: "bg-[#A78BFA]/20 shadow-[6px_6px_0px_0px_#000] translate-y-[-2px] border-4 border-black",
              badgeColor: "bg-[#A78BFA]"
            },
            {
              id: "advanced" as const,
              label: "ULTRA AI ENGINE",
              desc: "Enterprise logic mapping. Comprehensive data matrix templates, integrations, and exhaustive security CSPs.",
              specs: "DeepSeek Coder / O1 Pro • Industrial-grade precision",
              color: "border-[#FF6B6B] hover:bg-[#FF6B6B]/5",
              activeBg: "bg-[#FF6B6B]/20 shadow-[6px_6px_0px_0px_#000] translate-y-[-2px] border-4 border-black",
              badgeColor: "bg-[#FF6B6B]"
            }
          ].map((mode) => {
            const isActive = complexityTier === mode.id || (mode.id === "advanced" && complexityTier === "enterprise");
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => handleSelectMode(mode.id)}
                className={`text-left p-4 border-2 border-black transition-all flex flex-col justify-between h-full relative cursor-pointer group ${
                  isActive ? mode.activeBg : `bg-white ${mode.color} shadow-[3px_3px_0px_0px_#000] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_#000]`
                }`}
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-black text-xs uppercase tracking-wider text-black">
                      {mode.label}
                    </span>
                    {isActive ? (
                      <span className={`px-2 py-0.5 text-[8px] font-black uppercase text-black border border-black ${mode.badgeColor} animate-pulse`}>
                        ACTIVE ENGINE
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 text-[7px] font-black uppercase text-neutral-400 border border-neutral-200">
                        SELECT
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] font-bold text-black/70 leading-relaxed">
                    {mode.desc}
                  </p>
                </div>
                <div className="mt-4 pt-2.5 border-t border-black/10 text-[8px] font-mono uppercase text-black/50">
                  ⚡ {mode.specs}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ==================================================== */}
      {/* 2. DEDICATED AI COMPILER ENGINE SELECTION */}
      {/* ==================================================== */}
      <div className="bg-white border-4 border-black p-5 shadow-[4px_4px_0px_0px_#000] space-y-4">
        <h3 className="text-sm font-black uppercase text-black flex items-center gap-1.5">
          <Cpu className="w-4 h-4 text-[#A78BFA]" />
          Choose Your Target AI Compiler Engine
        </h3>

        {!hasSelected && (
          <div className="flex items-center gap-3 p-3 bg-[#FFEB3B]/20 border-2 border-black shadow-[2px_2px_0px_0px_#000] text-xs font-black uppercase text-black">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
            <span>DO NOT SKIP: Explicit selection required. Please choose a target engine below to configure prompt architecture adaptation.</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {supportedModels.map((model) => {
            const isSelected = selectedAIModel?.id === model.id;
            
            // Custom colors, logos and strength definitions as requested
            let bestForText = model.bestFor;
            let adaptationStyle = "";
            let accentColor = "bg-[#3b82f6]";
            let IconComp = Bot;

            if (model.id === "chatgpt") {
              bestForText = "Best balanced output, logical systems & debugging";
              adaptationStyle = "Generates modular hooks and robust code loops.";
              accentColor = "bg-[#10b981]";
              IconComp = MessageCircle;
            } else if (model.id === "claude") {
              bestForText = "Long structured prompts, architecture outlines & neat HTML styles";
              adaptationStyle = "Exemplary adherence to neobrutalist specs.";
              accentColor = "bg-[#d97706]";
              IconComp = Bot;
            } else if (model.id === "gemini") {
              bestForText = "Fast multimodal reasoning, UI design ideas & copy structure";
              adaptationStyle = "Superb layout concept variations.";
              accentColor = "bg-[#3b82f6]";
              IconComp = Sparkles;
            } else if (model.id === "groq") {
              bestForText = "Fast modular code scaffolding and syntax checks";
              adaptationStyle = "Direct structural outlines.";
              accentColor = "bg-[#f59e0b]";
              IconComp = Zap;
            } else if (model.id === "deepseek") {
              bestForText = "Backend structures, APIs, database logic & server queries";
              adaptationStyle = "Heavy structural and backend focus.";
              accentColor = "bg-[#06b6d4]";
              IconComp = Database;
            } else if (model.id === "perplexity") {
              bestForText = "Up-to-date documentation research and external APIs checks";
              adaptationStyle = "Utilizes the newest packages references.";
              accentColor = "bg-[#7c3aed]";
              IconComp = HelpCircle;
            }

            return (
              <button
                key={model.id}
                type="button"
                onClick={() => handleSelectModel(model)}
                className={`text-left p-4 border-2 border-black transition-all flex flex-col justify-between h-full relative cursor-pointer ${
                  isSelected 
                    ? "bg-[#FFFDF5] shadow-[6px_6px_0px_0px_#000] border-4 border-black translate-y-[-2px]" 
                    : "bg-white shadow-[2px_2px_0px_0px_#000] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_#000]"
                }`}
              >
                <div className="space-y-3">
                  {/* Top Bar with Icon & Title */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 border border-black rounded ${accentColor} text-white shadow-[1px_1px_0px_0px_#000]`}>
                        <IconComp className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-black text-xs uppercase block text-black">
                          {model.id === "groq" ? "Grok / Groq" : model.name}
                        </span>
                        <span className="text-[7.5px] font-mono text-black/50 uppercase">
                          {model.id === "claude" ? "Anthropic" : model.id === "chatgpt" ? "OpenAI" : "Compiler Engine"}
                        </span>
                      </div>
                    </div>

                    {isSelected ? (
                      <span className="w-5 h-5 rounded-full bg-[#4ade80] border border-black flex items-center justify-center shadow-[1px_1px_0px_0px_#000]">
                        <Check className="w-3 h-3 text-black stroke-[3px]" />
                      </span>
                    ) : (
                      <span className="w-4 h-4 rounded-full border border-neutral-300 bg-neutral-50" />
                    )}
                  </div>

                  {/* Descriptions */}
                  <div className="space-y-1.5">
                    <p className="text-[9.5px] font-black text-black/70 leading-relaxed">
                      💡 {bestForText}
                    </p>
                    <p className="text-[8.5px] font-bold text-neutral-400">
                      🎯 {adaptationStyle}
                    </p>
                  </div>
                </div>

                {/* Footer Strengths badges */}
                <div className="mt-4 pt-2.5 border-t border-black/10 flex flex-wrap gap-1">
                  {model.strengths.slice(0, 2).map((str, idx) => (
                    <span key={idx} className="text-[7px] font-black uppercase px-1 py-0.2 bg-neutral-100 border border-neutral-200 text-neutral-500">
                      {str}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ==================================================== */}
      {/* 3. STEPPERS NAVIGATION */}
      {/* ==================================================== */}
      <div className="flex justify-between items-center pt-4">
        <button
          type="button"
          onClick={prevStep}
          className="neo-btn text-xs font-black uppercase flex items-center gap-1 bg-[#F5F2EA] px-5 py-2.5"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Layout
        </button>

        {hasSelected ? (
          <button
            type="button"
            onClick={nextStep}
            className="neo-btn text-xs font-black uppercase flex items-center gap-1 bg-[#FFD93D] px-6 py-3 border-2"
          >
            Next Step: Deployment
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            disabled
            className="text-xs font-black uppercase flex items-center gap-1 bg-neutral-100 border-2 border-neutral-300 text-neutral-400 px-6 py-3 cursor-not-allowed shadow-none"
            title="Please select an AI model engine to unlock progress"
          >
            Select Engine to Proceed
            <ArrowRight className="w-4 h-4 opacity-40" />
          </button>
        )}
      </div>

    </div>
  );
}
