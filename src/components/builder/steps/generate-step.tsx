"use client";

import { useState, useCallback, useMemo } from "react";
import { useBuilderStore } from "@/store/builder-store";
import { generateMasterPrompt } from "@/lib/prompt-engine";
import { generateMasterPromptWithAI } from "@/lib/ai";
import {
  ArrowLeft, Sparkles, Copy, Download, Check, FileText,
  RotateCcw, ChevronDown, ChevronUp, AlertCircle, Activity,
  Cpu, Rocket, Play, RefreshCw, Layers, ShieldCheck, CheckCircle2,
  Lock, Flame, Terminal, HelpCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PromptBlock {
  title: string;
  icon: string;
  content: string;
}

export function GenerateStep() {
  const store = useBuilderStore();
  const {
    generatedPrompt,
    isGenerating,
    setGeneratedPrompt,
    setIsGenerating,
    prevStep,
    complexityTier,
    selectedAIModel,
    setAIModel,
    deploymentConfig,
    setDeploymentConfig,
    resetBuilder,
    setStep
  } = store;

  const [copied, setCopied] = useState(false);
  const [copiedSectionIdx, setCopiedSectionIdx] = useState<number | null>(null);
  const [expandedIndices, setExpandedIndices] = useState<Record<number, boolean>>({});
  const [isOfflineFallback, setIsOfflineFallback] = useState(false);
  const [apiErrorMsg, setApiErrorMsg] = useState("");

  // Telemetry compilation steps
  const [activeLoaderStep, setActiveLoaderStep] = useState(0);
  const loaderItems = [
    { label: "Parsing Resume & Details", progressText: "Scanning profile details..." },
    { label: "Building Theme Context", progressText: "Mapping visual sandboxes..." },
    { label: "Structuring Responsive Layout", progressText: "Evaluating breakpoints sequence..." },
    { label: "Injecting SEO Rules", progressText: "Assembling metadata architectures..." },
    { label: "Finalizing Prompt Style", progressText: "Adapting instructions payload..." }
  ];

  const handleGenerate = useCallback(async () => {
    setIsGenerating(true);
    setApiErrorMsg("");
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
          const targetModelId = selectedAIModel?.id || "chatgpt";
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

  // Parse prompt into 10 structured collapsible blocks with custom icons
  const parsedBlocks = useMemo(() => {
    if (!generatedPrompt) return [];

    const headings = [
      { key: "PROJECT OVERVIEW", label: "Project Overview", icon: "🎯" },
      { key: "DESIGN SYSTEM", label: "Design System", icon: "🎨" },
      { key: "CONTENT STRUCTURE", label: "Content Structure", icon: "📝" },
      { key: "RESPONSIVE RULES", label: "Responsive Rules", icon: "📐" },
      { key: "ANIMATION SYSTEM", label: "Animation System", icon: "⚡" },
      { key: "SEO RULES", label: "SEO Rules", icon: "🔍" },
      { key: "ACCESSIBILITY", label: "Accessibility", icon: "♿" },
      { key: "DEPLOYMENT", label: "Deployment Channels", icon: "🚀" },
      { key: "SECURITY", label: "Security & API Defenses", icon: "🛡️" },
      { key: "FINAL INSTRUCTIONS", label: "Final Prompt Checklist", icon: "✅" }
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

    // Fallback if formatting doesn't match standard headings
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
    <div className="max-w-[50rem] mx-auto px-2 space-y-5">
      
      {/* ==================================================== */}
      {/* 2. COMPILING AND PROGRESS LOADING ENGINE */}
      {/* ==================================================== */}
      {isGenerating ? (
        /* Dynamic Animated Loader Checklist */
        <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_#000] space-y-5 text-center">
          <div className="w-12 h-12 bg-black text-white border-2 border-black flex items-center justify-center mx-auto shadow-[3px_3px_0px_0px_#4ade80]">
            <Terminal className="w-6 h-6 animate-pulse text-[#4ade80]" />
          </div>
          
          <div className="space-y-1">
            <h3 className="text-sm font-black uppercase text-black">Compiling Blueprint Prompts...</h3>
            <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest animate-pulse">
              Running Offline Telemetry Compilation
            </p>
          </div>

          {/* Checklist Panel */}
          <div className="max-w-md mx-auto bg-neutral-50 border-2 border-black p-4 text-left space-y-2.5 font-mono text-xs shadow-inner">
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
      ) : !generatedPrompt ? (
        /* Splash Screen State - Ready to Generate */
        <div className="border-4 border-black bg-white p-6 text-center shadow-[6px_6px_0px_0px_#000] space-y-4">
          <div className="w-12 h-12 bg-[#FFFDF5] border-4 border-black flex items-center justify-center mx-auto shadow-[3px_3px_0px_0px_#000] animate-bounce">
            <Sparkles className="w-6 h-6 text-[#FFD93D] fill-current" />
          </div>
          <div className="space-y-1">
            <h3 className="text-md font-black uppercase text-black">Ready to Generate</h3>
            <p className="text-[11px] font-bold text-black/60 max-w-md mx-auto leading-relaxed">
              Your customized brand presets, website page timeline, and security key configurations are complete and locked. Click compile to synthesize your master developer prompts.
            </p>
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            className="px-6 py-3 bg-[#FF6B6B] border-4 border-black font-black uppercase text-xs text-white shadow-[4px_4px_0px_0px_#000] hover:bg-red-500 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#000] transition-all flex items-center gap-2 mx-auto"
          >
            <Play className="w-3.5 h-3.5 fill-current text-white" />
            Compile Perfect Master Prompt Now
          </button>
        </div>
      ) : (
        /* Compiled State Controls Toolbar */
        <div className="border-4 border-black bg-white p-4 shadow-[6px_6px_0px_0px_#000] space-y-3.5">
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

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="px-3.5 py-1.5 border-2 border-black bg-white text-xs font-black uppercase text-black hover:bg-neutral-50 shadow-[1.5px_1.5px_0px_0px_#000] active:translate-y-0.5 active:shadow-none flex items-center gap-1.5 disabled:opacity-50"
            >
              <RotateCcw className="w-3 h-3" />
              Regenerate
            </button>

            <button
              onClick={handleCopy}
              className="px-4 py-2 border-2 border-black bg-[#FFD93D] text-xs font-black uppercase text-black hover:bg-[#ffe169] shadow-[2.5px_2.5px_0px_0px_#000] active:translate-y-0.5 active:shadow-none flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied All!" : "Copy Master Prompt"}
            </button>

            <div className="flex gap-1.5">
              <button
                onClick={() => handleDownload("md")}
                className="px-3 py-1.5 border-2 border-black bg-white text-[11px] font-black uppercase text-black hover:bg-neutral-50 shadow-[1.5px_1.5px_0px_0px_#000] active:translate-y-0.5 active:shadow-none flex items-center gap-1"
              >
                <Download className="w-3 h-3" />
                Markdown
              </button>
              <button
                onClick={() => handleDownload("txt")}
                className="px-3 py-1.5 border-2 border-black bg-white text-[11px] font-black uppercase text-black hover:bg-neutral-50 shadow-[1.5px_1.5px_0px_0px_#000] active:translate-y-0.5 active:shadow-none flex items-center gap-1"
              >
                <FileText className="w-3 h-3" />
                Text
              </button>
            </div>

            <span className="ml-auto text-[8.5px] font-black text-neutral-400 uppercase font-mono tracking-widest hidden md:inline-block">
              {generatedPrompt.length.toLocaleString()} Chars • {parsedBlocks.length} Blueprint blocks
            </span>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* 3. THIRD SECTION: CATEGORIZED COLLAPSIBLE BLOCKS */}
      {/* ==================================================== */}
      {generatedPrompt && !isGenerating && (
        <div className="space-y-2.5">
          <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-black pl-1">
            <Layers className="w-3.5 h-3.5 text-[#C4B5FD]" />
            Structured Blueprint Specifications
          </div>

          <div className="space-y-2">
            {parsedBlocks.map((block, idx) => {
              const isExpanded = expandedIndices[idx] ?? true;
              const isCopied = copiedSectionIdx === idx;

              return (
                <div key={idx} className="border-4 border-black bg-white shadow-[2px_2px_0px_0px_#000] overflow-hidden">
                  <div
                    onClick={() => toggleBlock(idx)}
                    className="flex items-center justify-between p-3.5 cursor-pointer hover:bg-neutral-50 select-none border-b-2 border-black"
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
                        className="p-1 border-2 border-black bg-white hover:bg-neutral-50 shadow-[1px_1px_0px_0px_#000] active:translate-y-0.5 active:shadow-none transition-all"
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
                        <div className="p-3 bg-[#FFFDF5] text-left border-t-2 border-black/5">
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
      )}

      {/* ==================================================== */}
      {/* 4. FOOTER STEERERS */}
      {/* ==================================================== */}
      <div className="flex items-center justify-between border-4 border-black p-3.5 bg-white shadow-[3px_3px_0px_0px_#000]">
        <button
          type="button"
          onClick={prevStep}
          className="px-4 py-2 border-2 border-black font-black uppercase text-xs bg-white text-black hover:bg-neutral-50 shadow-[1.5px_1.5px_0px_0px_#000] flex items-center gap-1.5 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back
        </button>

        <div className="flex items-center gap-1.5 text-[8.5px] font-black text-neutral-400 uppercase tracking-widest">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          {store.selectedCategory?.name || "Website Studio"} Planner Locked
        </div>
      </div>
    </div>
  );
}
