"use client";

import { useState, useRef, useEffect } from "react";
import { designStyles } from "@/lib/design-styles";
import { Navbar } from "@/components/layout/navbar";
import { ThemePreview } from "@/components/builder/theme-preview";
import {
  Sparkles, Terminal, Copy, Check, Download, Info, Code,
  Monitor, Smartphone, Globe, RefreshCw, Layers, Compass, Cpu, Palette, HelpCircle, ArrowUpRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DesignStudioPage() {
  const [selectedStyle, setSelectedStyle] = useState(designStyles[0]);
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [activeTab, setActiveTab] = useState<"dna" | "components" | "export" | "ai">("dna");
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [customAiPrompt, setCustomAiPrompt] = useState("");
  const [aiTokensResult, setAiTokensResult] = useState<string | null>(null);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = tabsRef.current;
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

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Generate original Mubix Design Pack (.mubixpack JSON file)
  const downloadMubixpack = () => {
    const pack = {
      mubixVersion: "1.0.0",
      themeId: selectedStyle.id,
      themeName: selectedStyle.name,
      colors: selectedStyle.colors,
      typography: selectedStyle.typography,
      dna: selectedStyle.designDna,
      cliCmd: `npx mubixpack install ${selectedStyle.id}`
    };

    const blob = new Blob([JSON.stringify(pack, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedStyle.id}.mubixpack`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Simulate dynamic AI design tokens synthesis
  const handleAiTokensCompile = () => {
    if (!customAiPrompt.trim()) return;
    setIsGeneratingAi(true);
    setTimeout(() => {
      setIsGeneratingAi(false);
      setAiTokensResult(`/* Dynamic AI Theme Synthesis matching: "${customAiPrompt}" */
:root {
  --background-hsl: 140 20% 98%;
  --primary-hsl: 140 85% 30%;
  --accent-hsl: 200 95% 50%;
  --border-radius: 24px;
  --custom-shadow: 0 20px 40px rgba(0, 150, 0, 0.04);
  --font-family-heading: "Space Grotesk", sans-serif;
}`);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#FFFDF5] bg-neo-grid pt-24 text-black pb-16">
      <Navbar />

      <div className="px-4 sm:px-6 max-w-7xl mx-auto space-y-8">
        
        {/* Header banner */}
        <div className="border-4 border-black p-6 bg-white shadow-[6px_6px_0px_0px_#000] text-center space-y-3 relative overflow-hidden">
          <div className="absolute top-2 right-2 rotate-[4deg]">
            <span className="px-2 py-0.5 bg-[#FF6B6B] text-white border border-black font-black uppercase text-[8px] tracking-wide">STUDIO BETA</span>
          </div>
          <span className="inline-block px-3 py-1.5 bg-[#FFD93D] border-2 border-black font-black uppercase text-xs rotate-[-1deg]">
            THEME DESIGN STUDIO
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-black">
            MUBIX DESIGN DNA EXPLORER
          </h1>
          <p className="text-xs sm:text-sm font-bold text-black/70 max-w-xl mx-auto leading-relaxed">
            Inspect responsive spacing rulers, copy tailwind config variables, download custom `.mubixpack` bundles, and execute CLI installs contextually for all 14 visual systems.
          </p>
        </div>

        {/* Workspace Layout Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: 14 Theme Switcher Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <div className="border-4 border-black bg-zinc-950 text-white p-5 shadow-[4px_4px_0px_0px_#000] space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-[#FFD93D] flex items-center gap-1.5">
                <Compass className="w-4 h-4" />
                SELECT VISUAL THEME
              </h4>
              <p className="text-[10px] font-bold text-white/60">
                Browse through all 14 visual design architectures.
              </p>
              
              <div className="space-y-1.5 max-h-[480px] overflow-y-auto pr-1 scrollbar-thin">
                {designStyles.map((style) => {
                  const isSelected = selectedStyle.id === style.id;
                  return (
                    <button
                      key={style.id}
                      onClick={() => setSelectedStyle(style)}
                      className={`w-full text-left p-3 border-2 transition-all flex items-start gap-3 shadow-[2px_2px_0px_0px_#000] active:translate-y-[1px] active:shadow-none ${
                        isSelected
                          ? "bg-[#C4B5FD] text-black border-black shadow-none"
                          : "bg-zinc-900 border-white/10 hover:bg-zinc-800 text-white"
                      }`}
                    >
                      <div
                        className="w-10 h-10 border border-black shrink-0 shadow-[1px_1px_0px_0px_#000]"
                        style={{ background: style.preview }}
                      />
                      <div className="space-y-0.5 overflow-hidden">
                        <span className="text-xs font-black uppercase block truncate">{style.name}</span>
                        <span className={`text-[9px] font-bold block leading-normal line-clamp-1 ${isSelected ? "text-black/60" : "text-white/40"}`}>
                          {style.description}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CLI installer command panel */}
            <div className="border-4 border-black bg-white p-5 shadow-[4px_4px_0px_0px_#000] space-y-4">
              <h4 className="text-xs font-black uppercase text-black flex items-center gap-1.5 border-b-2 border-black pb-2">
                <Terminal className="w-4 h-4 text-green-600 stroke-[3px]" />
                MUBIX CLI INSTALLER
              </h4>
              <p className="text-[11px] font-bold text-black/60 leading-normal">
                Install this visual package components, Tailwind styles, and animation presets directly via terminal:
              </p>
              <div className="bg-neutral-900 text-white p-3 border-2 border-black font-mono text-[10px] flex justify-between items-center relative shadow-[2px_2px_0px_0px_#000]">
                <code className="text-[#4ade80]">npx mubixpack install {selectedStyle.id}</code>
                <button
                  onClick={() => handleCopy(`npx mubixpack install ${selectedStyle.id}`, "cli")}
                  className="hover:text-white text-white/50 p-1 transition-all"
                  title="Copy command"
                >
                  {copiedText === "cli" ? <Check className="w-4 h-4 text-green-400 stroke-[3px]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Live Browser Simulator & DNA Explorer Tabs */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Embedded Responsive Browser Simulator */}
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase text-black/50 block">THEME PREVIEW STUDIO RUN</span>
              <ThemePreview style={selectedStyle} device={device} setDevice={setDevice} />
            </div>

            {/* Token Rulers & DNA Explorer tabs */}
            <div className="border-4 border-black bg-white shadow-[6px_6px_0px_0px_#000] overflow-hidden">
              
              {/* Tab headers */}
              <div ref={tabsRef} className="flex border-b-4 border-black bg-neutral-50 overflow-x-auto shrink-0">
                {[
                  { id: "dna", label: "Design DNA Tokens", icon: Layers },
                  { id: "components", label: "Isolated Playground", icon: Palette },
                  { id: "export", label: "CLI Exporters", icon: Download },
                  { id: "ai", label: "AI Theme Synthesizer", icon: Sparkles }
                ].map(t => {
                  const isActive = activeTab === t.id;
                  const Icon = t.icon;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setActiveTab(t.id as any)}
                      className={`flex items-center gap-2 px-5 py-3.5 border-r-2 border-black font-black uppercase text-xs transition-all shrink-0 ${
                        isActive ? "bg-[#FFD93D] text-black" : "hover:bg-neutral-100 text-black/60"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {t.label}
                    </button>
                  );
                })}
              </div>

              {/* Tab panel contents */}
              <div className="p-6">
                
                {/* 1. Design DNA Tokens */}
                {activeTab === "dna" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Color Palette Grid */}
                      <div className="space-y-3">
                        <span className="text-[10px] font-black uppercase text-black/55 block">COLOR PALETTE</span>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {Object.entries(selectedStyle.colors).map(([key, hex]) => (
                            <div key={key} className="border-2 border-black bg-neutral-50 p-2 text-center shadow-[2px_2px_0px_0px_#000]">
                              <div className="w-full h-8 border border-black/10 mb-1" style={{ backgroundColor: hex }} />
                              <span className="text-[9px] font-black uppercase block text-black/55">{key}</span>
                              <button
                                onClick={() => handleCopy(hex, key)}
                                className="text-[10px] font-mono font-black text-black hover:underline mt-0.5 inline-block"
                              >
                                {copiedText === key ? "Copied!" : hex}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Typography Cues */}
                      <div className="space-y-3">
                        <span className="text-[10px] font-black uppercase text-black/55 block">TYPOGRAPHY SCALING</span>
                        <div className="border-2 border-black p-4 bg-[#FFFDF5] space-y-2.5 shadow-[2px_2px_0px_0px_#000]">
                          <div>
                            <span className="text-[8px] font-black text-black/40 block">HEADING FONT:</span>
                            <span className="text-sm font-black uppercase tracking-tight">{selectedStyle.typography.heading}</span>
                          </div>
                          <div>
                            <span className="text-[8px] font-black text-black/40 block">BODY FONT:</span>
                            <span className="text-sm font-black uppercase tracking-tight">{selectedStyle.typography.body}</span>
                          </div>
                          <div className="pt-2 border-t border-black/10 font-mono text-[9px] leading-relaxed text-black/60">
                            {selectedStyle.designDna?.typography?.heading || "Standard scale."}
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* DNA metrics */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-black/10 text-xs font-bold">
                      <div className="p-3 border-2 border-black bg-white">
                        <span className="text-[9px] font-black text-black/40 uppercase block">SPACING RULES</span>
                        <span>{selectedStyle.designDna?.spacing?.padding || "p-6"} • {selectedStyle.designDna?.spacing?.gap || "gap-4"}</span>
                      </div>
                      <div className="p-3 border-2 border-black bg-white">
                        <span className="text-[9px] font-black text-black/40 uppercase block">SHADOW PHYSICS</span>
                        <span>{selectedStyle.designDna?.cards?.style || "Subtle shadows"}</span>
                      </div>
                      <div className="p-3 border-2 border-black bg-white">
                        <span className="text-[9px] font-black text-black/40 uppercase block">HOVER ANIMS</span>
                        <span>{selectedStyle.designDna?.hoverEffects?.card || "Default Scale"}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Isolated Components Playground */}
                {activeTab === "components" && (
                  <div className="space-y-6">
                    <span className="text-[10px] font-black uppercase text-black/55 block">ISOLATED DESIGN SPECIMENS</span>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Button variants */}
                      <div className="border-2 border-black p-4 bg-neutral-50 shadow-[2px_2px_0px_0px_#000] space-y-4">
                        <span className="text-[8px] font-black uppercase text-black/40 block">BUTTON SPECS</span>
                        <div className="flex flex-wrap items-center gap-3">
                          <button className="px-4 py-2 border-2 border-black bg-white hover:bg-neutral-50 text-[10px] font-black uppercase shadow-[2px_2px_0px_0px_#000]">
                            Action Button
                          </button>
                          <button className="px-4 py-2 border-2 border-black bg-black text-white text-[10px] font-black uppercase shadow-[2px_2px_0px_0px_#000]">
                            Submit Group
                          </button>
                        </div>
                      </div>

                      {/* Card borders preview */}
                      <div className="border-2 border-black p-4 bg-neutral-50 shadow-[2px_2px_0px_0px_#000] space-y-2">
                        <span className="text-[8px] font-black uppercase text-black/40 block">CARD PRESET DESIGN</span>
                        <div className="border-2 border-black bg-white p-3 shadow-[3px_3px_0px_0px_#000] text-center text-[10px] font-black uppercase">
                          📦 Custom Card Outline Specimen
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* 3. Export Formats */}
                {activeTab === "export" && (
                  <div className="space-y-4">
                    <span className="text-[10px] font-black uppercase text-black/55 block">DOWNLOADABLE DESIGN PACKS</span>
                    <p className="text-xs font-bold text-black/70">
                      Export this custom layout specifications framework bundle into standard developer tokens sheets:
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      
                      {/* .mubixpack custom exporter */}
                      <div className="border-2 border-black p-4 bg-[#FFFDF5] text-center shadow-[3px_3px_0px_0px_#000] space-y-3">
                        <span className="text-xs font-black block">📂 .mubixpack JSON</span>
                        <p className="text-[10px] text-black/60 font-bold">Comprehensive custom layout tokens specifications.</p>
                        <button
                          onClick={downloadMubixpack}
                          className="w-full py-1.5 border border-black bg-[#FFD93D] text-[9px] font-black uppercase hover:bg-yellow-400 active:translate-y-[1px] transition-all"
                        >
                          Download
                        </button>
                      </div>

                      {/* Tailwind CSS config exporter */}
                      <div className="border-2 border-black p-4 bg-[#FFFDF5] text-center shadow-[3px_3px_0px_0px_#000] space-y-3">
                        <span className="text-xs font-black block">🎨 Tailwind JSON</span>
                        <p className="text-[10px] text-black/60 font-bold">Hex colors and font alignments configurations sheet.</p>
                        <button
                          onClick={() => handleCopy(JSON.stringify(selectedStyle.colors, null, 2), "tw-json")}
                          className="w-full py-1.5 border border-black bg-[#C4B5FD] text-[9px] font-black uppercase active:translate-y-[1px]"
                        >
                          {copiedText === "tw-json" ? "Copied!" : "Copy Clipboard"}
                        </button>
                      </div>

                      {/* CSS vars exporter */}
                      <div className="border-2 border-black p-4 bg-[#FFFDF5] text-center shadow-[3px_3px_0px_0px_#000] space-y-3">
                        <span className="text-xs font-black block">🔌 CSS variables</span>
                        <p className="text-[10px] text-black/60 font-bold">Copy standard CSS `:root` variables swatches.</p>
                        <button
                          onClick={() => handleCopy(`:root { --primary: ${selectedStyle.colors.primary}; --background: ${selectedStyle.colors.background}; }`, "css-vars")}
                          className="w-full py-1.5 border border-black bg-white text-[9px] font-black uppercase active:translate-y-[1px]"
                        >
                          {copiedText === "css-vars" ? "Copied!" : "Copy Clipboard"}
                        </button>
                      </div>

                    </div>
                  </div>
                )}

                {/* 4. AI Theme Synthesizer */}
                {activeTab === "ai" && (
                  <div className="space-y-4">
                    <span className="text-[10px] font-black uppercase text-black/55 block">DYNAMIC AI DESIGN DNA INJECTOR</span>
                    <p className="text-xs font-bold text-black/60">
                      Describe your dream landing page layout. Our AI engine will analyze visual aesthetic rules, generate spacing metrics, and build customized responsive component previews automatically!
                    </p>

                    <div className="space-y-3">
                      <textarea
                        placeholder="e.g. Spotify black and deep neon green glass cards, rounded-xl buttons, strict 24px grid layout columns..."
                        value={customAiPrompt}
                        onChange={(e) => setCustomAiPrompt(e.target.value)}
                        className="w-full border-2 border-black p-3 text-xs font-bold focus:outline-none min-h-[90px] resize-none shadow-[2px_2px_0px_0px_#000]"
                      />
                      <button
                        onClick={handleAiTokensCompile}
                        disabled={isGeneratingAi || !customAiPrompt.trim()}
                        className="neo-btn neo-btn-accent text-xs font-black uppercase px-6 py-2.5 disabled:opacity-50"
                      >
                        {isGeneratingAi ? "Synthesizing DNA..." : "Synthesize AI Layout Tokens"}
                      </button>
                    </div>

                    {/* AI result console panel */}
                    <AnimatePresence>
                      {aiTokensResult && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="border-2 border-black bg-neutral-950 text-[#4ade80] p-4 font-mono text-[10px] relative shadow-[3px_3px_0px_0px_#000]"
                        >
                          <pre className="overflow-x-auto whitespace-pre-wrap">{aiTokensResult}</pre>
                          <button
                            onClick={() => handleCopy(aiTokensResult, "ai-out")}
                            className="absolute top-2 right-2 text-white/50 hover:text-white"
                          >
                            {copiedText === "ai-out" ? <Check className="w-3.5 h-3.5 text-green-400 stroke-[3px]" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

              </div>

            </div>

          </div>

        </div>

      </div>
    </main>
  );
}
