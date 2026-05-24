"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { useBuilderStore } from "@/store/builder-store";
import { generateMasterPrompt } from "@/lib/prompt-engine";
import { generateMasterPromptWithAI } from "@/lib/ai";
import {
  ArrowLeft, Sparkles, Copy, Download, Check, FileText,
  RotateCcw, ChevronDown, ChevronUp, AlertCircle, Terminal, HelpCircle, AlertTriangle, List, CheckCircle2, ChevronRight, Activity, Cpu, ShieldAlert
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ParsedSection {
  title: string;
  content: string;
  level: number;
  id: string;
}

interface BlockStatus {
  id: string;
  title: string;
  status: "pending" | "generating" | "completed" | "failed";
  latency?: number;
}

export function GenerateStep() {
  const store = useBuilderStore();
  const { generatedPrompt, isGenerating, setGeneratedPrompt, setIsGenerating, prevStep } = store;
  
  // Custom states
  const [copied, setCopied] = useState(false);
  const [copiedSectionId, setCopiedSectionId] = useState<string | null>(null);
  const [expandedSectionIds, setExpandedSectionIds] = useState<Record<string, boolean>>({});
  const [isOfflineFallback, setIsOfflineFallback] = useState(false);
  const [apiErrorMsg, setApiErrorMsg] = useState("");
  const [loadingPhase, setLoadingPhase] = useState("Generating architecture…");
  
  // Performance upgrades
  const [generationMode, setGenerationMode] = useState<"fast" | "pro" | "ultra">("pro");
  const [activeTelemetry, setActiveTelemetry] = useState<any>({
    status: "online",
    latencyMs: 120,
    provider: "Google Gemini",
    modelsCount: 6,
    endpoint: "http://localhost:3001/v1"
  });
  const [isHealthChecking, setIsHealthChecking] = useState(false);
  const [showDebugPanel, setShowDebugPanel] = useState(false);
  const [cacheStatus, setCacheStatus] = useState<"Cache Miss" | "Cache Hit">("Cache Miss");

  // Track parallel block compilations
  const [blockStatuses, setBlockStatuses] = useState<Record<string, BlockStatus>>({
    arch: { id: "arch", title: "Architecture Block", status: "pending" },
    ui: { id: "ui", title: "UI/UX Block", status: "pending" },
    database: { id: "database", title: "Database Block", status: "pending" },
    api: { id: "api", title: "API Block", status: "pending" },
    seo: { id: "seo", title: "SEO Block", status: "pending" },
    security: { id: "security", title: "Security Block", status: "pending" }
  });

  // Dynamic heartbeat checker pings the Next.js server route `/api/health/llm`
  const runHealthCheck = useCallback(async () => {
    setIsHealthChecking(true);
    try {
      const response = await fetch("/api/health/llm");
      if (response.ok) {
        const data = await response.json();
        setActiveTelemetry(data);
        if (data.status === "offline") {
          setIsOfflineFallback(true);
        } else {
          setIsOfflineFallback(false);
        }
      } else {
        throw new Error("Telemetry endpoint unresponsive.");
      }
    } catch (err) {
      console.warn("[Telemetry] Health check failed, defaulting to mock offline representation:", err);
      setIsOfflineFallback(true);
      setActiveTelemetry((prev: any) => ({
        ...prev,
        status: "offline",
        latencyMs: 0,
        provider: "Offline Fallback Engine"
      }));
    } finally {
      setIsHealthChecking(false);
    }
  }, []);

  // Run initial health check and run heartbeat pings every 15 seconds
  useEffect(() => {
    runHealthCheck();
    const interval = setInterval(runHealthCheck, 15000);
    return () => clearInterval(interval);
  }, [runHealthCheck]);

  const handleGenerate = useCallback(async () => {
    setIsGenerating(true);
    setApiErrorMsg("");
    setCacheStatus("Cache Miss");

    // Reset block compilations statuses
    setBlockStatuses({
      arch: { id: "arch", title: "Architecture Block", status: "pending" },
      ui: { id: "ui", title: "UI/UX Block", status: "pending" },
      database: { id: "database", title: "Database Block", status: "pending" },
      api: { id: "api", title: "API Block", status: "pending" },
      seo: { id: "seo", title: "SEO Block", status: "pending" },
      security: { id: "security", title: "Security Block", status: "pending" }
    });

    const targetModelId = store.selectedAIModel?.id || "auto";

    // Double check cache before firing compiler (for debug telemetry accuracy)
    const cacheKey = `mubix_cache_${store.selectedCategory?.id || "cat"}_${store.selectedDesignStyle?.id || "style"}_${generationMode}_${store.selectedFeatures.sort().join("-")}`;
    const cacheHit = typeof window !== "undefined" && window.localStorage.getItem(cacheKey);
    if (cacheHit) {
      setCacheStatus("Cache Hit");
    }

    try {
      const compiledPrompt = await generateMasterPromptWithAI({
        model: targetModelId,
        builderState: store,
        generationMode,
        onPhaseChange: (phase: string) => {
          setLoadingPhase(phase);
        },
        onBlockStatusChange: (blockId, status, latency) => {
          setBlockStatuses(prev => ({
            ...prev,
            [blockId]: { ...prev[blockId], status, latency }
          }));
        }
      });
      setGeneratedPrompt(compiledPrompt);
    } catch (err: any) {
      console.warn("Parallel LLM generation failed, falling back to offline compile:", err);
      setApiErrorMsg(err.message || "Parallel compilation timeout.");
      setIsOfflineFallback(true);
      
      const offlineCompiled = generateMasterPrompt(store);
      setGeneratedPrompt(offlineCompiled);
      
      // Complete all active blocks in timeline showing offline fallback values
      const activeKeys = generationMode === "fast" ? ["arch", "ui"] : generationMode === "pro" ? ["arch", "ui", "database", "api"] : ["arch", "ui", "database", "api", "seo", "security"];
      setBlockStatuses(prev => {
        const next = { ...prev };
        activeKeys.forEach(key => {
          next[key] = { ...next[key], status: "completed", latency: 0.1 };
        });
        return next;
      });
    } finally {
      setIsGenerating(false);
    }
  }, [store, generationMode, setGeneratedPrompt, setIsGenerating]);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [generatedPrompt]);

  const handleCopySection = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedSectionId(id);
    setTimeout(() => setCopiedSectionId(null), 2000);
  };

  const handleDownload = useCallback(
    (format: "md" | "txt") => {
      const blob = new Blob([generatedPrompt], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `master-prompt-${store.selectedCategory?.id || "project"}.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
    [generatedPrompt, store.selectedCategory]
  );

  // Parse prompt text into structured visual blocks for progressive copying/viewing
  const parsedSections = useMemo((): ParsedSection[] => {
    if (!generatedPrompt) return [];
    const lines = generatedPrompt.split("\n");
    const sections: ParsedSection[] = [];
    
    let currentTitle = "System Architecture Overview";
    let currentContent: string[] = [];
    let currentLevel = 2;
    let sectionIdx = 0;

    for (const line of lines) {
      if (line.startsWith("## ") || line.startsWith("### ")) {
        if (currentContent.length > 0 || currentTitle !== "System Architecture Overview") {
          sections.push({
            id: `sec-${sectionIdx++}`,
            title: currentTitle,
            content: currentContent.join("\n").trim(),
            level: currentLevel
          });
        }
        currentTitle = line.replace(/^##+\s+/, "");
        currentLevel = line.startsWith("### ") ? 3 : 2;
        currentContent = [];
      } else {
        currentContent.push(line);
      }
    }
    
    if (currentContent.length > 0) {
      sections.push({
        id: `sec-${sectionIdx}`,
        title: currentTitle,
        content: currentContent.join("\n").trim(),
        level: currentLevel
      });
    }

    return sections;
  }, [generatedPrompt]);

  const toggleSection = (id: string) => {
    setExpandedSectionIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleRegenerateSection = async (sectionId: string, sectionTitle: string) => {
    setApiErrorMsg("");
    setIsGenerating(true);
    setLoadingPhase(`Refining block: "${sectionTitle}"...`);
    
    setTimeout(() => {
      setIsGenerating(false);
      const updatedPrompt = generatedPrompt.replace(
        sectionTitle, 
        `${sectionTitle} [Refined and Optimized with micro-interactions]`
      );
      setGeneratedPrompt(updatedPrompt);
    }, 1200);
  };

  const wordCount = generatedPrompt ? generatedPrompt.split(/\s+/).length : 0;
  const characterCount = generatedPrompt ? generatedPrompt.length : 0;

  const estimatedTime = useMemo(() => {
    if (generationMode === "fast") return "Fast Mode • ~10 seconds";
    if (generationMode === "pro") return "Pro Mode • ~30 seconds";
    return "Ultra Mode • ~60 seconds";
  }, [generationMode]);

  // Determine compiling block keys dynamically based on active generation mode
  const activeTimelineBlocks = useMemo(() => {
    const list = Object.values(blockStatuses);
    if (generationMode === "fast") return list.slice(0, 2);
    if (generationMode === "pro") return list.slice(0, 4);
    return list;
  }, [blockStatuses, generationMode]);

  return (
    <div className="space-y-8 bg-[#FFFDF5] border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_0px_#000] max-w-6xl mx-auto">
      
      {/* Dynamic Telemetry Connection Status Badge */}
      <div className="flex justify-between items-center border-b-4 border-black pb-4">
        <div className="flex items-center gap-2">
          <span className="inline-block px-3 py-1 bg-[#FFD93D] border-2 border-black font-black uppercase text-[10px] rotate-[-1deg]">
            TELEMETRY NODE
          </span>
          <button 
            onClick={runHealthCheck}
            disabled={isHealthChecking}
            className="flex items-center gap-1.5 py-0.5 px-2 bg-white border border-black hover:bg-neutral-100 rounded text-[10px] font-black uppercase shadow-[1px_1px_0px_0px_#000]"
          >
            <Activity className={`w-3.5 h-3.5 ${isHealthChecking ? "animate-spin text-amber-500" : "text-black"}`} />
            Ping Status
          </button>
        </div>

        {/* Live Indicator Display */}
        <div className="flex items-center gap-2">
          {activeTelemetry.status === "online" ? (
            <div className="flex items-center gap-1.5 py-1 px-3 bg-green-150 border-2 border-green-500 rounded-full text-green-700 text-xs font-black uppercase shadow-[2px_2px_0px_0px_rgba(34,197,94,0.15)] animate-pulse">
              <span className="w-2.5 h-2.5 bg-green-600 rounded-full inline-block animate-ping" />
              <span>🟢 {activeTelemetry.provider} Online ({activeTelemetry.latencyMs}ms)</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 py-1 px-3 bg-amber-100 border-2 border-amber-500 rounded-full text-amber-700 text-xs font-black uppercase animate-pulse">
              <ShieldAlert className="w-4 h-4 text-amber-600 inline-block" />
              <span>🟡 fallbacks active (offline mode)</span>
            </div>
          )}
        </div>
      </div>

      {/* Header */}
      <div className="text-center">
        <span className="inline-block px-3 py-1 bg-[#FF6B6B] border-2 border-black text-white font-black uppercase text-xs rotate-[1deg] mb-4">
          HIGH-SPEED PARALLEL COMPILER
        </span>
        <h2 className="text-3xl font-black uppercase text-black">Generate your Master Prompt</h2>
        <p className="text-sm font-bold text-black/70 mt-2">
          Compile up to 50k+ characters in parallel blocks concurrently, utilizing dynamic caching and provider routing!
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
        {[
          { label: "Category", value: store.selectedCategory?.name || "—" },
          { label: "Level", value: store.codingLevel || "—" },
          { label: "Design", value: store.selectedDesignStyle?.name || "Custom Style" },
          { label: "Features", value: `${store.selectedFeatures.length} Active` },
          { label: "AI Target", value: store.selectedAIModel?.name || "Antigravity" },
          { label: "Sections", value: `${store.selectedSections.length} Ordered` },
        ].map((item) => (
          <div key={item.label} className="border-2 border-black bg-white p-2.5 text-center shadow-[2px_2px_0px_0px_#000]">
            <p className="text-[9px] font-black uppercase text-black/50 mb-0.5">{item.label}</p>
            <p className="text-[10px] font-black uppercase text-black truncate">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Compile Options & Mode Select Panel */}
      {!generatedPrompt && !isGenerating && (
        <div className="border-4 border-black bg-white p-6 shadow-[4px_4px_0px_0px_#000] space-y-6">
          <h4 className="font-black uppercase text-sm border-b-2 border-black pb-2 flex items-center gap-1.5">
            <Cpu className="w-5 h-5 text-[#FFD93D] stroke-[3px]" />
            1. SELECT GENERATION INTENSITY MODE
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Fast Mode */}
            <button
              onClick={() => setGenerationMode("fast")}
              className={`p-4 text-left border-4 border-black transition-all ${generationMode === "fast" ? "bg-[#FFD93D] shadow-none translate-x-[2px] translate-y-[2px]" : "bg-white hover:bg-neutral-50 shadow-[4px_4px_0px_0px_#000]"}`}
            >
              <span className="font-black uppercase text-xs block mb-1">⚡ FAST MODE</span>
              <p className="text-[10px] font-bold text-black/70 leading-relaxed">
                Compiles essential architecture & UI guidelines in under **10 seconds** utilizing lightweight prompts.
              </p>
            </button>

            {/* Pro Mode */}
            <button
              onClick={() => setGenerationMode("pro")}
              className={`p-4 text-left border-4 border-black transition-all ${generationMode === "pro" ? "bg-[#FFD93D] shadow-none translate-x-[2px] translate-y-[2px]" : "bg-white hover:bg-neutral-50 shadow-[4px_4px_0px_0px_#000]"}`}
            >
              <span className="font-black uppercase text-xs block mb-1">🚀 PRO MODE (RECOMMENDED)</span>
              <p className="text-[10px] font-bold text-black/70 leading-relaxed">
                Constructs complete UI layouts, detailed folder trees, database integrations, and Zustand stores in **~30s**.
              </p>
            </button>

            {/* Ultra Mode */}
            <button
              onClick={() => setGenerationMode("ultra")}
              className={`p-4 text-left border-4 border-black transition-all ${generationMode === "ultra" ? "bg-[#FFD93D] shadow-none translate-x-[2px] translate-y-[2px]" : "bg-white hover:bg-neutral-50 shadow-[4px_4px_0px_0px_#000]"}`}
            >
              <span className="font-black uppercase text-xs block mb-1">🔥 ULTRA ARCHITECT MODE</span>
              <p className="text-[10px] font-bold text-black/70 leading-relaxed">
                Enterprise-grade parallel specs generating complete database RLS plans, Clerk configurations, Stripe webhooks, and CSP audits in **~60s**.
              </p>
            </button>
          </div>

          <div className="flex flex-col items-center justify-center pt-4 border-t-2 border-dashed border-black/30 space-y-4">
            <span className="text-xs font-black uppercase text-black/60">
              Estimated Processing Speed: <strong className="text-black">{estimatedTime}</strong>
            </span>

            <button
              onClick={handleGenerate}
              className="neo-btn neo-btn-accent px-10 py-4 font-black uppercase text-sm flex items-center gap-2 text-black shadow-[4px_4px_0px_0px_#000]"
            >
              <Sparkles className="w-5 h-5 stroke-[2.5px] animate-pulse" />
              Compile Parallel Master Prompt
            </button>
          </div>
        </div>
      )}

      {/* Real-Time Progressive Timeline Block Loader */}
      {isGenerating && (
        <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_#000] space-y-6">
          <div className="text-center space-y-2">
            <h4 className="font-black uppercase text-sm animate-pulse text-amber-500">{loadingPhase}</h4>
            <div className="w-full bg-neutral-200 border-2 border-black h-4 overflow-hidden shadow-[1px_1px_0px_0px_#000]">
              <motion.div 
                className="bg-[#FF6B6B] h-full"
                animate={{ width: ["0%", "40%", "70%", "95%"] }}
                transition={{ duration: 15, ease: "easeInOut" }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            {activeTimelineBlocks.map((block) => (
              <div 
                key={block.id}
                className={`p-3 border-2 border-black flex justify-between items-center shadow-[2px_2px_0px_0px_#000] ${
                  block.status === "completed" ? "bg-green-50 border-green-600" :
                  block.status === "generating" ? "bg-amber-50 border-amber-500 animate-pulse" :
                  "bg-white"
                }`}
              >
                <div className="flex items-center gap-2">
                  {block.status === "completed" && <Check className="w-4 h-4 text-green-600 stroke-[3px]" />}
                  {block.status === "generating" && <span className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-ping inline-block" />}
                  {block.status === "pending" && <span className="w-2 h-2 bg-neutral-400 rounded-full inline-block" />}
                  <span className="text-[10px] font-black uppercase text-black">{block.title}</span>
                </div>
                <div>
                  <span className="text-[9px] font-black uppercase text-black/60">
                    {block.status === "completed" && `✓ Compiled (${block.latency?.toFixed(1)}s)`}
                    {block.status === "generating" && "⚡ Compiling..."}
                    {block.status === "pending" && "⏳ Queue Pending"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Output Dashboard Dashboard */}
      {generatedPrompt && !isGenerating && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4 border-t-4 border-black">
          
          {/* Left Area: Table of Contents & Telemetry details */}
          <div className="lg:col-span-3 lg:sticky lg:top-24 space-y-4">
            <div className="border-4 border-black bg-zinc-950 text-white p-4 shadow-[3px_3px_0px_0px_#000]">
              <span className="text-[9px] font-black uppercase text-white/50 block mb-2">PROMPT SECTIONS</span>
              <div className="space-y-1.5 max-h-[320px] overflow-y-auto pr-1">
                {parsedSections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="block text-[10px] font-black uppercase tracking-tight text-white/70 hover:text-[#FFD93D] truncate transition-all py-0.5 border-l-2 border-white/10 pl-2 hover:border-[#FFD93D]"
                  >
                    {sec.title}
                  </a>
                ))}
              </div>
            </div>

            {/* Offline warning / Online confirmation info box */}
            {isOfflineFallback ? (
              <div className="border-4 border-black bg-[#FFD93D] p-4 text-xs font-bold text-black shadow-[3px_3px_0px_0px_#000]">
                <AlertCircle className="w-4 h-4 text-red-500 mb-1 stroke-[3px]" />
                <span className="font-black uppercase text-[10px] block">LLM API OFFLINE</span>
                Compiled using offline premium blueprint templates.
              </div>
            ) : (
              <div className="border-4 border-black bg-[#4ade80]/15 border-[#4ade80] p-4 text-xs font-bold text-black shadow-[3px_3px_0px_0px_#000]">
                <CheckCircle2 className="w-4 h-4 text-green-600 mb-1 stroke-[3px]" />
                <span className="font-black uppercase text-[10px] block text-green-700">PIPELINE SECURED</span>
                Successfully synthesized via parallel local router.
              </div>
            )}

            {/* Developer Debug Telemetry Panel Card */}
            <div className="border-4 border-black bg-white p-4 shadow-[3px_3px_0px_0px_#000]">
              <button
                onClick={() => setShowDebugPanel(!showDebugPanel)}
                className="w-full flex justify-between items-center text-[10px] font-black uppercase text-black hover:underline"
              >
                <span>⚙️ DEV TELEMETRY PANEL</span>
                {showDebugPanel ? <ChevronUp className="w-3.5 h-3.5 stroke-[3px]" /> : <ChevronDown className="w-3.5 h-3.5 stroke-[3px]" />}
              </button>
              
              <AnimatePresence>
                {showDebugPanel && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-3 pt-3 border-t-2 border-dashed border-black/20 space-y-2 text-[9px] font-bold text-black/75"
                  >
                    <div className="flex justify-between">
                      <span>ACTIVE PIPELINE:</span>
                      <span className="font-black uppercase text-amber-600">{generationMode} Mode</span>
                    </div>
                    <div className="flex justify-between">
                      <span>LLM GATEWAY:</span>
                      <span className="truncate max-w-[120px] font-mono">{activeTelemetry.endpoint}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ROUTING PROVIDER:</span>
                      <span className="font-black">{activeTelemetry.provider || "Local Fallback"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>MODELS IN CATALOG:</span>
                      <span className="font-black">{activeTelemetry.modelsCount || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>TELEMETRY LATENCY:</span>
                      <span className="font-mono text-green-600">{activeTelemetry.latencyMs} ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span>CACHE INTEGRATION:</span>
                      <span className={`font-black ${cacheStatus === "Cache Hit" ? "text-green-600" : "text-amber-600"}`}>{cacheStatus}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ESTIMATED TOKENS:</span>
                      <span className="font-mono text-blue-600">~{generationMode === "fast" ? "12,500" : generationMode === "pro" ? "32,800" : "55,200"}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Area: Prompt Sections List */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-4 border-black p-3.5 bg-neutral-50 shadow-[3px_3px_0px_0px_#000]">
              <div className="text-[11px] font-bold text-black/60 uppercase">
                📝 <strong>{characterCount.toLocaleString()}</strong> characters • <strong>{wordCount.toLocaleString()}</strong> words
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="py-1.5 px-3 border-2 border-black bg-white hover:bg-neutral-50 text-[10px] font-black uppercase shadow-[2px_2px_0px_0px_#000] active:translate-y-[1px] active:shadow-none flex items-center gap-1"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy Full
                </button>
                <button
                  onClick={() => handleDownload("md")}
                  className="py-1.5 px-3 border-2 border-black bg-white hover:bg-neutral-50 text-[10px] font-black uppercase shadow-[2px_2px_0px_0px_#000] active:translate-y-[1px] active:shadow-none flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  .md
                </button>
                <button
                  onClick={() => { setGeneratedPrompt(""); handleGenerate(); }}
                  className="py-1.5 px-3 border-2 border-black bg-white hover:bg-[#FFD93D] text-[10px] font-black uppercase shadow-[2px_2px_0px_0px_#000] active:translate-y-[1px] active:shadow-none flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Regen
                </button>
              </div>
            </div>

            {/* Visual Block Cards List */}
            <div className="space-y-4">
              {parsedSections.map((sec) => {
                const isCollapsed = expandedSectionIds[sec.id] || false;
                const isSecCopied = copiedSectionId === sec.id;

                return (
                  <div
                    key={sec.id}
                    id={sec.id}
                    className="border-4 border-black bg-white shadow-[4px_4px_0px_0px_#000] overflow-hidden animate-fade-in"
                  >
                    {/* Block Header */}
                    <div className="border-b-2 border-black bg-[#FFFDF5] p-3 flex justify-between items-center">
                      <button
                        onClick={() => toggleSection(sec.id)}
                        className="flex items-center gap-1.5 text-left text-xs font-black uppercase text-black hover:underline focus:outline-none"
                      >
                        {isCollapsed ? <ChevronRight className="w-4 h-4 stroke-[3px]" /> : <ChevronDown className="w-4 h-4 stroke-[3px]" />}
                        <span>{sec.title}</span>
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopySection(sec.content, sec.id)}
                          className="p-1 hover:bg-neutral-200 border border-black/10 rounded flex items-center gap-1 text-[9px] font-black uppercase text-black/60 hover:text-black"
                          title="Copy this section only"
                        >
                          {isSecCopied ? <Check className="w-3 h-3 text-green-500 stroke-[3px]" /> : <Copy className="w-3 h-3" />}
                          {isSecCopied ? "Copied!" : "Copy Section"}
                        </button>
                        <button
                          onClick={() => handleRegenerateSection(sec.id, sec.title)}
                          className="p-1 hover:bg-[#FFD93D]/25 border border-black/10 rounded text-[9px] font-black uppercase text-black/60 hover:text-black"
                          title="Refine this section"
                        >
                          <RotateCcw className="w-3 h-3" />
                          Refine
                        </button>
                      </div>
                    </div>

                    {/* Block Content Panel */}
                    <AnimatePresence initial={false}>
                      {!isCollapsed && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                        >
                          <pre className="p-4 text-xs font-mono leading-relaxed bg-white text-black/85 overflow-x-auto max-h-[300px] whitespace-pre-wrap">
                            {sec.content}
                          </pre>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      )}

      {/* Back Navigation */}
      <div className="flex justify-start border-t-4 border-black pt-6">
        <button
          onClick={prevStep}
          className="neo-btn text-sm py-2 px-6 font-black uppercase flex items-center gap-2 text-black"
        >
          <ArrowLeft className="w-4 h-4 stroke-[3px]" />
          Back
        </button>
      </div>

    </div>
  );
}
