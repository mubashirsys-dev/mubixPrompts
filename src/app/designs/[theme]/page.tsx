"use client";

import { useParams, useRouter } from "next/navigation";
import { designStyles } from "@/lib/design-styles";
import { Navbar } from "@/components/layout/navbar";
import { ThemePreview } from "@/components/builder/theme-preview";
import { useState, useMemo } from "react";
import {
  ArrowLeft, Terminal, Copy, Check, Download, Layers,
  Compass, Palette, Sparkles, Layout, Globe, Smartphone, Monitor
} from "lucide-react";

export default function ThemeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");

  const styleId = params?.theme as string;

  // Retrieve active style matching slug
  const style = useMemo(() => {
    return designStyles.find(s => s.id === styleId) || designStyles[0];
  }, [styleId]);

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadPack = () => {
    const packObj = {
      mubixVersion: "1.0.0",
      themeId: style.id,
      themeName: style.name,
      colors: style.colors,
      typography: style.typography,
      dna: style.designDna
    };

    const blob = new Blob([JSON.stringify(packObj, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${style.id}.mubixpack`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-[#FFFDF5] bg-neo-grid pt-24 text-black pb-16">
      <Navbar />

      <div className="px-4 sm:px-6 max-w-5xl mx-auto space-y-8">
        
        {/* Back navigation */}
        <button
          onClick={() => router.push("/design-studio")}
          className="neo-btn text-xs py-2 px-4 font-black uppercase flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4 stroke-[3px]" />
          Back to Theme Studio
        </button>

        {/* Overview Header banner */}
        <div className="border-4 border-black p-6 bg-white shadow-[6px_6px_0px_0px_#000] space-y-4">
          <div className="flex justify-between items-start flex-wrap gap-3">
            <div className="space-y-1">
              <span className="inline-block px-2.5 py-0.5 bg-[#FFD93D] border-2 border-black font-black uppercase text-[9px] rotate-[-1deg]">
                DESIGN SYSTEM BLUEPRINT
              </span>
              <h1 className="text-3xl font-black uppercase tracking-tight">{style.name} System</h1>
              <p className="text-xs font-bold text-black/60">{style.description}</p>
            </div>
            <button
              onClick={handleDownloadPack}
              className="neo-btn neo-btn-accent text-xs font-black uppercase py-2 px-5 flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              Export .mubixpack
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-3 border-t border-black/10">
            {style.characteristics.map(c => (
              <span key={c} className="text-[10px] font-black uppercase bg-neutral-100 border border-black/15 px-3 py-1 shadow-[1.5px_1.5px_0px_0px_#000] text-center">
                ✅ {c}
              </span>
            ))}
          </div>
        </div>

        {/* Core Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Preview Frame */}
          <div className="lg:col-span-8 space-y-4">
            <span className="text-[10px] font-black uppercase text-black/50 block">THEME PREVIEW BROWSER</span>
            <ThemePreview style={style} device={device} setDevice={setDevice} />
          </div>

          {/* Right Column: DNA token specification sheets */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Color Swatch cards */}
            <div className="border-4 border-black bg-white p-5 shadow-[4px_4px_0px_0px_#000] space-y-3">
              <span className="text-[9px] font-black uppercase text-black/55 block">DNA COLOR SWATCHES</span>
              <div className="space-y-2">
                {Object.entries(style.colors).map(([key, hex]) => (
                  <div key={key} className="flex items-center justify-between border border-black/15 p-2 bg-neutral-50 shadow-[1.5px_1.5px_0px_0px_#000]">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border border-black/10" style={{ backgroundColor: hex }} />
                      <span className="text-[10px] font-black uppercase text-black/75">{key}</span>
                    </div>
                    <button
                      onClick={() => handleCopy(hex, key)}
                      className="text-[9.5px] font-mono font-bold hover:underline"
                    >
                      {copiedId === key ? "Copied!" : hex}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* CLI instruction copy */}
            <div className="border-4 border-black bg-zinc-950 text-white p-5 shadow-[4px_4px_0px_0px_#000] space-y-3">
              <span className="text-[9px] font-black uppercase text-[#FFD93D] block">TERMINAL INSTALL</span>
              <p className="text-[10px] font-bold text-white/70 leading-normal">
                Execute directly on your project folder directory:
              </p>
              <div className="bg-zinc-900 border border-white/10 p-2.5 font-mono text-[9px] text-[#4ade80] flex justify-between items-center">
                <code>npx mubixpack install {style.id}</code>
                <button
                  onClick={() => handleCopy(`npx mubixpack install ${style.id}`, "install-cli")}
                  className="hover:text-white text-white/50"
                >
                  {copiedId === "install-cli" ? <Check className="w-3.5 h-3.5 text-green-400 stroke-[3.5px]" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}
