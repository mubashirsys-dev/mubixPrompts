"use client";

import { useState, useCallback, useMemo } from "react";
import { useBuilderStore } from "@/store/builder-store";
import { aiModels } from "@/lib/ai-models";
import { generateMasterPrompt } from "@/lib/prompt-engine";
import { generateMasterPromptWithAI } from "@/lib/ai";
import { AIModel, ComplexityTier } from "@/types/builder";
import {
  Cpu, Zap, Sparkles, MessageCircle, Bot, Database, ArrowLeft, ShieldAlert, Check, HelpCircle,
  Copy, Download, FileText, RotateCcw, ChevronDown, ChevronUp, Layers, ShieldCheck, Play, Terminal
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PromptBlock {
  title: string;
  icon: string;
  content: string;
}

export function AIModelStep() {
  const store = useBuilderStore();
  const {
    selectedAIModel,
    setAIModel,
    complexityTier,
    setComplexityTier,
    prevStep,
    generatedPrompt,
    isGenerating,
    setGeneratedPrompt,
    setIsGenerating
  } = store;

  const [copied, setCopied] = useState(false);
  const [copiedSectionIdx, setCopiedSectionIdx] = useState<number | null>(null);
  const [expandedIndices, setExpandedIndices] = useState<Record<number, boolean>>({});
  const [isOfflineFallback, setIsOfflineFallback] = useState(false);

  // Telemetry compilation steps
  const [activeLoaderStep, setActiveLoaderStep] = useState(0);
  const loaderItems = [
    { label: "Parsing Resume & Details", progressText: "Scanning profile details..." },
    { label: "Building Theme Context", progressText: "Mapping visual sandboxes..." },
    { label: "Structuring Responsive Layout", progressText: "Evaluating breakpoints sequence..." },
    { label: "Injecting SEO Rules", progressText: "Assembling metadata architectures..." },
    { label: "Finalizing Prompt Style", progressText: "Adapting instructions payload..." }
  ];

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

  // Compile Trigger
  const handleGenerate = useCallback(async () => {
    if (!selectedAIModel) return;

    setIsGenerating(true);
    setIsOfflineFallback(false);
    setActiveLoaderStep(0);

    // Telemetry Loader Steps Timeline
    const t0 = setTimeout(() => setActiveLoaderStep(1), 800);
    const t1 = setTimeout(() => setActiveLoaderStep(2), 1600);
    const t2 = setTimeout(() => setActiveLoaderStep(3), 2400);
    const t3 = setTimeout(() => setActiveLoaderStep(4), 3200);
    const t4 = setTimeout(() => setActiveLoaderStep(5), 4000);

    const tFinal = setTimeout(async () => {
      try {
        if (complexityTier === "simple") {
          const offlineCompiled = generateMasterPrompt(store);
          setGeneratedPrompt(offlineCompiled);
        } else {
          const targetModelId = selectedAIModel.id;
          const finalPrompt = await generateMasterPromptWithAI({
            model: targetModelId,
            builderState: store,
            onPhaseChange: () => {},
            onBlockStatusChange: () => {}
          });
          setGeneratedPrompt(finalPrompt);
        }
      } catch (err: any) {
        setIsOfflineFallback(true);
        const offlineCompiled = generateMasterPrompt(store);
        setGeneratedPrompt(offlineCompiled);
      } finally {
        setIsGenerating(false);
      }
    }, 4500);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(tFinal);
    };
  }, [complexityTier, selectedAIModel, store, setGeneratedPrompt, setIsGenerating]);

  // Parse prompt into structured collapsible blocks
  const parsedBlocks = useMemo(() => {
    if (!generatedPrompt) return [];

    const headings = [
      { key: "PROJECT OVERVIEW", label: "Project Overview", icon: "🎯" },
      { key: "DESIGN SYSTEM", label: "Design System", icon: "🎨" },
      { key: "CONTENT BLUEPRINT", label: "Content Blueprint", icon: "📝" },
      { key: "PROJECT STRUCTURE", label: "Project Structure", icon: "📐" },
      { key: "ANIMATIONS & INTERACTIONS", label: "Animations & Interactions", icon: "⚡" },
      { key: "SEO & METADATA", label: "SEO & Metadata", icon: "🔍" },
      { key: "SECURITY PROTECTION LAYER", label: "Security & API Defenses", icon: "🛡️" },
      { key: "API & SERVICES CONFIGURATION", label: "API Configuration", icon: "🔌" },
      { key: "DATABASE SYSTEM", label: "Database System", icon: "🗄️" },
      { key: "FINAL CHECKLIST", label: "Final Prompt Checklist", icon: "✅" }
    ];

    const blocks: PromptBlock[] = [];
    let currentText = generatedPrompt;

    for (let i = 0; i < headings.length; i++) {
      const current = headings[i];
      const next = headings[i + 1];

      const startIdx = currentText.indexOf(current.key);
      if (startIdx === -1) continue;

      let sectionContent = "";
      if (next) {
        const endIdx = currentText.indexOf(next.key);
        if (endIdx !== -1) {
          sectionContent = currentText.substring(startIdx, endIdx);
        } else {
          sectionContent = currentText.substring(startIdx);
        }
      } else {
        sectionContent = currentText.substring(startIdx);
      }

      // Cleanup formatting header symbols
      sectionContent = sectionContent
        .replace(new RegExp(`^\\#*\\s*${current.key}`, "i"), "")
        .trim();

      blocks.push({
        title: current.label,
        icon: current.icon,
        content: sectionContent
      });
    }

    if (blocks.length === 0) {
      blocks.push({
        title: "Master Blueprint Prompt Specifications",
        icon: "📋",
        content: generatedPrompt
      });
    }

    return blocks;
  }, [generatedPrompt]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyBlock = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedSectionIdx(idx);
    setTimeout(() => setCopiedSectionIdx(null), 1500);
  };

  const handleDownload = (ext: "md" | "txt") => {
    const blob = new Blob([generatedPrompt], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `mubix_master_blueprint_${store.selectedCategory?.id || "prompt"}.${ext}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const toggleBlock = (idx: number) => {
    setExpandedIndices(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="max-w-[70rem] mx-auto px-1 space-y-6">
      
      {isGenerating ? (
        /* Dynamic Animated Loader Checklist */
        <div className="border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_#000] space-y-6 text-center max-w-lg mx-auto">
          <div className="w-12 h-12 bg-black text-white border-2 border-black flex items-center justify-center mx-auto shadow-[3px_3px_0px_0px_#4ade80]">
            <Terminal className="w-6 h-6 animate-pulse text-[#4ade80]" />
          </div>
          
          <div className="space-y-1">
            <h3 className="text-sm font-black uppercase text-black">Compiling Blueprint Prompts...</h3>
            <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest animate-pulse">
              Running Smart AI Compilation
            </p>
          </div>

          {/* Checklist Panel */}
          <div className="bg-neutral-50 border-2 border-black p-4 text-left space-y-2.5 font-mono text-xs shadow-inner">
            {loaderItems.map((item, idx) => {
              const isChecked = activeLoaderStep > idx;
              const isCurrent = activeLoaderStep === idx;
              return (
                <div 
                  key={idx} 
                  className={`flex items-center justify-between border-b border-black/5 pb-1.5 transition-all ${
                    isChecked ? "text-neutral-400" : isCurrent ? "text-black font-black" : "text-neutral-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {isChecked ? (
                      <span className="text-emerald-500 font-black">✓</span>
                    ) : isCurrent ? (
                      <span className="w-2 h-2 rounded-full bg-[#A78BFA] animate-ping shrink-0" />
                    ) : (
                      <span className="text-neutral-300">○</span>
                    )}
                    <span>{item.label}</span>
                  </div>
                  <span className="text-[9px] uppercase font-bold text-neutral-400">
                    {isChecked ? "COMPLETED" : isCurrent ? "RUNNING..." : "QUEUED"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ) : generatedPrompt ? (
        /* Compiled State Controls Toolbar + Collapsible Specs */
        <div className="space-y-6">
          <div className="border-4 border-black bg-white p-5 shadow-[8px_8px_0px_0px_#000] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-black pb-2.5">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4.5 h-4.5 text-emerald-500" />
                <h3 className="text-xs font-black uppercase text-black">Active Blueprint Output Control Panel</h3>
              </div>
              {isOfflineFallback && (
                <span className="px-2 py-0.5 bg-[#FF6B6B] text-white border border-black font-black uppercase text-[7.5px] tracking-wider">
                  OFFLINE FALLBACK
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setGeneratedPrompt("")}
                className="px-4 py-2 border-2 border-black bg-white text-xs font-black uppercase text-black hover:bg-neutral-50 shadow-[2px_2px_0px_0px_#000] active:translate-y-0.5 active:shadow-none flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Adjust settings
              </button>

              <button
                onClick={handleCopy}
                className="px-5 py-2.5 border-2 border-black bg-[#FFD93D] text-xs font-black uppercase text-black hover:bg-[#ffe169] shadow-[3px_3px_0px_0px_#000] active:translate-y-0.5 active:shadow-none flex items-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5 stroke-[3px]" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied All!" : "Copy Master Prompt"}
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => handleDownload("md")}
                  className="px-3.5 py-2 border-2 border-black bg-white text-[11px] font-black uppercase text-black hover:bg-neutral-50 shadow-[2px_2px_0px_0px_#000] active:translate-y-0.5 active:shadow-none flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  Markdown
                </button>
                <button
                  onClick={() => handleDownload("txt")}
                  className="px-3.5 py-2 border-2 border-black bg-white text-[11px] font-black uppercase text-black hover:bg-neutral-50 shadow-[2px_2px_0px_0px_#000] active:translate-y-0.5 active:shadow-none flex items-center gap-1"
                >
                  <FileText className="w-3.5 h-3.5" />
                  Text
                </button>
              </div>

              <span className="ml-auto text-[9px] font-black text-neutral-400 uppercase font-mono tracking-widest hidden md:inline-block">
                {generatedPrompt.length.toLocaleString()} Chars • {parsedBlocks.length} Blueprint blocks
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-black pl-1">
              <Layers className="w-3.5 h-3.5 text-[#C4B5FD]" />
              Structured Blueprint Specifications
            </div>

            <div className="space-y-3">
              {parsedBlocks.map((block, idx) => {
                const isExpanded = expandedIndices[idx] ?? true;
                const isCopied = copiedSectionIdx === idx;

                return (
                  <div key={idx} className="border-4 border-black bg-white shadow-[3px_3px_0px_0px_#000] overflow-hidden">
                    <div
                      onClick={() => toggleBlock(idx)}
                      className="flex items-center justify-between p-4 cursor-pointer hover:bg-neutral-50 select-none border-b-2 border-black"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-md">{block.icon}</span>
                        <span className="text-xs font-black uppercase tracking-wide text-black">{block.title}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyBlock(block.content, idx);
                          }}
                          className="p-1.5 border-2 border-black bg-white hover:bg-neutral-50 shadow-[1px_1px_0px_0px_#000] active:translate-y-0.5 active:shadow-none transition-all"
                          title={`Copy ${block.title} Specifications`}
                        >
                          {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3px]" /> : <Copy className="w-3.5 h-3.5 text-black" />}
                        </button>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>

                    <AnimatePresence initial={true}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.12 }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 bg-[#FFFDF5] text-left border-t-2 border-black/5">
                            <pre className="text-[10px] font-mono text-neutral-800 whitespace-pre-wrap leading-relaxed max-h-[300px] overflow-y-auto font-semibold">
                              {block.content}
                            </pre>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* Configuration selection view (Model and Speed selectors) */
        <div className="space-y-6 animate-fade-in">
          {/* Header Title */}
          <div className="text-center">
            <span className="inline-block px-3 py-1 bg-[#A78BFA] text-black border-2 border-black font-black uppercase text-xs rotate-[-1deg] mb-4">
              FINAL COMPILER STEP
            </span>
            <h2 className="text-3xl font-black uppercase text-black">
              AI Engine & Speed Selector
            </h2>
            <p className="text-xs font-bold text-black/70 mt-2">
              Select your target AI model and performance speed tier. The output prompt blueprints will automatically adapt to each model's layout reasoning style.
            </p>
          </div>

          {/* Speed Selector */}
          <div className="bg-white border-4 border-black p-5 shadow-[6px_6px_0px_0px_#000] space-y-4">
            <h3 className="text-xs font-black uppercase text-black flex items-center gap-1.5">
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
                  activeBg: "bg-[#4ade80]/20 shadow-[5px_5px_0px_0px_#000] translate-y-[-1px] border-2 border-black",
                  badgeColor: "bg-[#4ade80]"
                },
                {
                  id: "standard" as const,
                  label: "STANDARD AI",
                  desc: "Balanced full-stack structure. Includes FAQ, interactive dynamic state components, and blog schemas.",
                  specs: "Claude-3.5-Sonnet / ChatGPT-4o • Highly structured logic",
                  color: "border-[#A78BFA] hover:bg-[#A78BFA]/5",
                  activeBg: "bg-[#A78BFA]/20 shadow-[5px_5px_0px_0px_#000] translate-y-[-1px] border-2 border-black",
                  badgeColor: "bg-[#A78BFA]"
                },
                {
                  id: "advanced" as const,
                  label: "ULTRA AI ENGINE",
                  desc: "Enterprise logic mapping. Comprehensive data matrix templates, integrations, and exhaustive security CSPs.",
                  specs: "DeepSeek Coder / O1 Pro • Industrial-grade precision",
                  color: "border-[#FF6B6B] hover:bg-[#FF6B6B]/5",
                  activeBg: "bg-[#FF6B6B]/20 shadow-[5px_5px_0px_0px_#000] translate-y-[-1px] border-2 border-black",
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
                      isActive ? mode.activeBg : `bg-white ${mode.color} shadow-[2px_2px_0px_0px_#000] hover:translate-y-[-0.5px] hover:shadow-[3px_3px_0px_0px_#000]`
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-black text-xs uppercase tracking-wider text-black">
                          {mode.label}
                        </span>
                        {isActive ? (
                          <span className={`px-2 py-0.5 text-[8px] font-black uppercase text-black border border-black ${mode.badgeColor} animate-pulse`}>
                            ACTIVE
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
                    <div className="mt-4 pt-2 border-t border-black/10 text-[8px] font-mono uppercase text-black/50">
                      ⚡ {mode.specs}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Model Selector */}
          <div className="bg-white border-4 border-black p-5 shadow-[6px_6px_0px_0px_#000] space-y-4">
            <h3 className="text-xs font-black uppercase text-black flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-[#A78BFA]" />
              Choose Your Target AI Compiler Engine
            </h3>

            {!selectedAIModel && (
              <div className="flex items-center gap-3 p-3 bg-[#FFEB3B]/20 border-2 border-black shadow-[2px_2px_0px_0px_#000] text-xs font-black uppercase text-black">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                <span>DO NOT SKIP: Explicit selection required. Please choose a target engine below to configure prompt architecture adaptation.</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {supportedModels.map((model) => {
                const isSelected = selectedAIModel?.id === model.id;
                
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
                        ? "bg-[#FFFDF5] shadow-[5px_5px_0px_0px_#000] border-2 border-black translate-y-[-1.5px]" 
                        : "bg-white shadow-[2px_2px_0px_0px_#000] hover:translate-y-[-0.5px] hover:shadow-[3px_3px_0px_0px_#000]"
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <div className={`p-1.5 border border-black bg-white rounded shadow-[1px_1px_0px_0px_#000] ${accentColor} text-white`}>
                            <IconComp className="w-3.5 h-3.5" />
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
                          <span className="w-4.5 h-4.5 rounded-full bg-[#4ade80] border border-black flex items-center justify-center shadow-[1px_1px_0px_0px_#000]">
                            <Check className="w-2.5 h-2.5 text-black stroke-[3.5px]" />
                          </span>
                        ) : (
                          <span className="w-4 h-4 rounded-full border border-neutral-300 bg-neutral-50" />
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <p className="text-[9.5px] font-black text-black/70 leading-relaxed">
                          💡 {bestForText}
                        </p>
                        <p className="text-[8.5px] font-bold text-neutral-400">
                          🎯 {adaptationStyle}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-2 border-t border-black/10 flex flex-wrap gap-1">
                      {model.strengths.slice(0, 2).map((str, idx) => (
                        <span key={idx} className="text-[7px] font-black uppercase px-1.5 py-0.2 bg-neutral-100 border border-neutral-200 text-neutral-500 rounded">
                          {str}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Trigger Button */}
          {selectedAIModel ? (
            <button
              type="button"
              onClick={handleGenerate}
              className="w-full py-4 bg-[#FF6B6B] border-4 border-black font-black uppercase text-sm text-white shadow-[5px_5px_0px_0px_#000] hover:bg-red-500 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#000] transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-current text-white animate-pulse" />
              Compile Master Prompt Now
            </button>
          ) : (
            <button
              type="button"
              disabled
              className="w-full py-4 bg-neutral-100 border-4 border-neutral-300 font-black uppercase text-sm text-neutral-400 cursor-not-allowed flex items-center justify-center gap-2"
            >
              Select Engine to Compile
            </button>
          )}
        </div>
      )}
    </div>
  );
}
