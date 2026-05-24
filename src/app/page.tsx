"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, ArrowRight, Zap, Play, Check, Flame, Trophy,
  Scissors, Moon, Bot, MessageSquare, Terminal, Layout, HelpCircle, ArrowUpRight
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { presetPacks } from "@/lib/features";
import { useBuilderStore } from "@/store/builder-store";
import { useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const applyPreset = useBuilderStore((state) => state.applyPreset);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleSelectPreset = (preset: any) => {
    applyPreset(preset);
    router.push("/builder");
  };

  const getPresetIcon = (id: string) => {
    switch (id) {
      case "netflix-clone": return <Play className="w-5 h-5 text-white" />;
      case "modern-portfolio": return <Flame className="w-5 h-5 text-black" />;
      case "ai-saas": return <Zap className="w-5 h-5 text-black" />;
      case "football-erp": return <Trophy className="w-5 h-5 text-black" />;
      case "barber-shop": return <Scissors className="w-5 h-5 text-black" />;
      case "islamic-center": return <Moon className="w-5 h-5 text-black" />;
      default: return <Sparkles className="w-5 h-5 text-black" />;
    }
  };

  const faqs = [
    {
      q: "What is an AI Website Prompt Operating System?",
      a: "Standard prompts are short and lead to basic, generic websites with bugs. MubixPrompts is an compiler wizard that asks structured questions and generates a massive, 50,000+ character master instructions file containing complete file hierarchies, SQL schemas, Zod forms, animations physics, and payment callbacks. AI coding tools use this to build pristine projects with minimum errors."
    },
    {
      q: "How does the FreeLLMAPI Local Gateway work?",
      a: "Our app runs a local OpenAI-compatible endpoint. When you generate a prompt, MubixPrompts executes sequentially chunked completions against your local gateway to compile fully customized systems, falling back seamlessly to templates if your local endpoint is offline."
    },
    {
      q: "Can I skip backend APIs and Stripe integrations?",
      a: "Yes! In Step 2 (Coder Level), you can toggle secure backend APIs 'OFF' to skip Clerk, Stripe, or Supabase configurations. The engine automatically outputs a clean, high-performance static client project utilizing localStorage."
    },
    {
      q: "Which AI code tools are supported?",
      a: "MubixPrompts compiles optimized instructions tailored for Claude, ChatGPT, Cursor, Lovable, Bolt.new, Windsurf, v0, Replit AI, and Antigravity."
    }
  ];

  return (
    <main className="relative overflow-hidden bg-[#FFFDF5] bg-neo-grid pt-24 text-black min-h-screen">
      <Navbar />

      {/* ===== 1. HERO SECTION ===== */}
      <section className="relative py-20 px-6 max-w-6xl mx-auto text-center space-y-8">
        <div className="mb-4 inline-block">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FFD93D] border-4 border-black font-black uppercase text-xs shadow-[3px_3px_0px_0px_#000] rotate-[-1deg]">
            <Sparkles className="w-4 h-4 text-black" />
            AI Prompt Operating System for Code Generation
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none text-black">
          BUILD COMPLETE WEBSITES <br />
          <span className="bg-[#FF6B6B] text-white px-3 border-4 border-black inline-block rotate-[-1.5deg] my-2 shadow-[5px_5px_0px_0px_#000]">WITHOUT MISTAKES</span>
        </h1>

        <p className="mx-auto max-w-xl text-base font-bold leading-relaxed text-black/75">
          Generate highly structured, 50k+ character Master Prompts for Claude, Cursor, Lovable, Bolt, and ChatGPT. Calibrate features, order homepage sections, and design complete SQL schemas instantly.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link href="/builder">
            <button className="neo-btn neo-btn-accent text-sm px-8 py-3.5 font-black uppercase flex items-center gap-2">
              Launch Prompt Wizard
              <ArrowRight className="w-4 h-4 stroke-[3px]" />
            </button>
          </Link>
          <Link href="/assistant">
            <button className="neo-btn bg-white hover:bg-neutral-50 text-sm px-8 py-3.5 font-black uppercase flex items-center gap-2">
              Open AI Chat Workspace
              <Bot className="w-4 h-4 stroke-[2.5px]" />
            </button>
          </Link>
        </div>

        {/* Dynamic Badges Row */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-4 max-w-2xl mx-auto">
          {["⚡ Drag-and-Drop Layouts", "🔒 Secure Skip Paths", "🔌 FreeLLMAPI Integrated", "📁 Exact Folder Directories"].map(b => (
            <span key={b} className="text-[10px] font-black uppercase bg-white border-2 border-black px-2.5 py-1 shadow-[2px_2px_0px_0px_#000]">
              {b}
            </span>
          ))}
        </div>
      </section>

      {/* ===== 2. HOW IT WORKS ===== */}
      <section className="py-16 px-6 border-y-4 border-black bg-white">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <span className="inline-block px-3 py-0.5 bg-[#C4B5FD] border-2 border-black font-black uppercase text-[10px] rotate-[1deg]">
              ENGINE WORKFLOW
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black">
              HOW MUBIXPROMPTS WORKS
            </h2>
            <p className="text-xs font-bold text-black/60 max-w-md mx-auto">
              Follow our simple, guided 4-step wizard to compile production-ready markdown prompt blueprints.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 text-center">
            {[
              { step: "01", title: "Select Category", desc: "Choose from 45+ target templates to calibrate active features." },
              { step: "02", title: "Branding DNA", desc: "Upload logo reference files and paste custom CSS typography scaling directives." },
              { step: "03", title: "Arrange Sections", desc: "Reorder page sections dynamically using custom offset arrow controls." },
              { step: "04", title: "Compile Prompt", desc: "Forward prompts in chunks to local FreeLLMAPI systems, or download offline!" }
            ].map(w => (
              <div key={w.step} className="border-4 border-black p-5 bg-[#FFFDF5] shadow-[4px_4px_0px_0px_#000] relative">
                <span className="absolute -top-4 -left-4 w-9 h-9 border-4 border-black bg-[#FFD93D] flex items-center justify-center font-black text-xs shadow-[2px_2px_0px_0px_#000]">
                  {w.step}
                </span>
                <h4 className="text-sm font-black uppercase text-black pt-2 mb-2">{w.title}</h4>
                <p className="text-[11px] font-bold text-black/60 leading-normal">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3. CATEGORY PRESETS ===== */}
      <section className="py-20 px-6 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <span className="inline-block px-3 py-0.5 bg-[#FFD93D] border-2 border-black font-black uppercase text-[10px] rotate-[-1deg]">
            READY PRESETS
          </span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
            TEMPLATE PRESETS LIST
          </h2>
          <p className="text-xs font-bold text-black/60 max-w-md mx-auto">
            Instantly load structured category filters and preset theme assets in a single click.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {presetPacks.slice(0, 3).map((pack) => (
            <div key={pack.id} className="border-4 border-black bg-white p-5 shadow-[6px_6px_0px_0px_#000] flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="p-2 bg-[#C4B5FD] border border-black shadow-[1px_1px_0px_0px_#000]">
                    {getPresetIcon(pack.id)}
                  </div>
                  <span className="text-[9px] font-black uppercase bg-black text-[#FFD93D] px-2 py-0.5">
                    {pack.codingLevel}
                  </span>
                </div>
                <h3 className="font-black uppercase text-sm">{pack.name}</h3>
                <p className="text-[11px] font-bold text-black/60 leading-normal">{pack.description}</p>
              </div>
              <button
                onClick={() => handleSelectPreset(pack)}
                className="w-full mt-4 py-2 border-2 border-black bg-[#FFFDF5] hover:bg-[#FFD93D] text-[10px] font-black uppercase transition-all flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_0px_#000] active:translate-y-[1px] active:shadow-none"
              >
                Apply Preset
                <ArrowRight className="w-3.5 h-3.5 stroke-[3px]" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 4. DYNAMIC THEMES PREVIEW MOCK ===== */}
      <section className="py-16 px-6 border-y-4 border-black bg-white">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="inline-block px-3 py-0.5 bg-[#FF6B6B] text-white border-2 border-black font-black uppercase text-[10px] rotate-[1.5deg]">
              DESIGN PREVIEWS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black">
              INTELLIGENT THEME PREVIEWS
            </h2>
            <p className="text-xs font-bold text-black/60 max-w-sm mx-auto">
              Our dynamic compiler automatically generates layout parameters matching visual luxury, minimal, or cyber styling cues.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <h3 className="text-xl font-black uppercase text-black">Interactive Theme DNA Previews</h3>
              <p className="text-xs font-bold text-black/70 leading-relaxed">
                Users can toggle Swiss grid systems, futuristic neon glows, or frosted glass blurs inside simulated browser frames. This allows non-coders to understand visual page layout designs instantly.
              </p>
              <div className="space-y-2">
                {[
                  "Apple-Minimalist layout grids",
                  "Vibrant solid offset shadow physics",
                  "Gold Luxury borders & Playfair Serif headers",
                  "Halftone grid backgrounds and rotatable stickers"
                ].map(t => (
                  <div key={t} className="flex items-center gap-2 text-xs font-black uppercase">
                    <Check className="w-4 h-4 text-[#4ade80]" />
                    {t}
                  </div>
                ))}
              </div>
              <Link href="/builder">
                <button className="neo-btn bg-[#C4B5FD] text-xs font-black uppercase mt-4">
                  Explore Theme Previewer
                </button>
              </Link>
            </div>

            {/* Mock Preview Display */}
            <div className="border-4 border-black bg-[#FFFDF5] p-4 shadow-[6px_6px_0px_0px_#000] relative">
              <div className="flex items-center gap-1.5 border-b-2 border-black pb-2 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B6B]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFD93D]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#4ade80]" />
                <span className="text-[8px] font-black uppercase text-black/40 font-mono ml-2">https://yourdomain.com</span>
              </div>
              <div className="bg-white border-2 border-black p-4 space-y-3 shadow-[2px_2px_0px_0px_#000] text-center">
                <span className="inline-block px-2 py-0.5 bg-[#FF6B6B] text-white border border-black font-black uppercase text-[8px] rotate-[-1deg]">
                  Active Theme Demo
                </span>
                <h4 className="text-xs font-black uppercase">Pragmatic Swiss Grids</h4>
                <p className="text-[9px] font-bold text-black/50 leading-relaxed">Highly balanced whitespace, mathematically precise alignment nodes, and functional elements.</p>
                <button className="px-3 py-1 bg-black text-white font-black uppercase text-[8px]">Get Started</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 5. AI ASSISTANT PREVIEW ===== */}
      <section className="py-20 px-6 max-w-6xl mx-auto space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Visual Assistant Mock */}
          <div className="border-4 border-black bg-zinc-950 text-white p-5 shadow-[6px_6px_0px_0px_#000] space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-[#FFD93D] text-black border border-black flex items-center justify-center text-xs font-black">
                  🤖
                </div>
                <span className="text-[10px] font-black uppercase text-white tracking-wider">AI CONSOLE ASSISTANT</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
            </div>
            <div className="bg-zinc-900 border border-white/10 p-3 space-y-1">
              <span className="text-[8px] font-black text-white/40 block uppercase">SYSTEM ACTIVE SELECTION:</span>
              <span className="text-[10px] font-black uppercase text-[#C4B5FD]">📂 SaaS Dashboard ERP Preset</span>
            </div>
            <p className="text-xs italic text-white/70 bg-black/40 p-3 border border-white/5 font-mono leading-normal">
              &ldquo;I have analyzed your monetization plans and pre-compiled a database model with Supabase RLS and Stripe subscription webhooks matching your coding level!&rdquo;
            </p>
          </div>

          <div className="space-y-4">
            <span className="inline-block px-3 py-0.5 bg-[#C4B5FD] border-2 border-black font-black uppercase text-[10px] rotate-[1deg]">
              CONTEXT AWARE
            </span>
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black">
              FLOATING & FULLSCREEN AI ASSISTANT
            </h3>
            <p className="text-xs font-bold text-black/75 leading-relaxed">
              MubixPrompts includes a custom-engineered companion chatbot that operates in floating widgets or full-page workspace layouts. It immediately tracks active category features, CSS borders, and datasets to advice styling palettes, SQL models, and layout animations.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Link href="/assistant">
                <button className="w-full neo-btn neo-btn-accent text-xs font-black uppercase flex items-center justify-center gap-1">
                  Launch AI Workspace
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 6. PROMPT EXAMPLES ===== */}
      <section className="py-16 px-6 border-y-4 border-black bg-white">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black">
              MASTER PROMPT SPECIFICATIONS
            </h2>
            <p className="text-xs font-bold text-black/60 max-w-sm mx-auto">
              Our dynamically compiled output structures compile perfectly formatted code segments inside 20 distinct markdown blocks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-4 border-black p-5 bg-[#FFFDF5] shadow-[4px_4px_0px_0px_#000] space-y-3 font-mono text-[10px] text-black">
              <span className="text-[9px] font-black uppercase bg-black text-[#FFD93D] px-2 py-0.5">BLOCK 4: DESIGN DNA</span>
              <pre className="overflow-x-auto bg-white/60 p-3 border border-black/15">
{`### DESIGN SYSTEM PARAMETERS
- Background HSL: 0 0% 100%
- Primary Border: 4px solid #000000
- Custom Shadow: shadow-[8px_8px_0px_0px_#000]
- Typography Scale: Space Grotesk Outline`}
              </pre>
            </div>
            <div className="border-4 border-black p-5 bg-[#FFFDF5] shadow-[4px_4px_0px_0px_#000] space-y-3 font-mono text-[10px] text-black">
              <span className="text-[9px] font-black uppercase bg-black text-white px-2 py-0.5">BLOCK 9: DATABASE SCHEMA</span>
              <pre className="overflow-x-auto bg-white/60 p-3 border border-black/15">
{`CREATE TABLE public.subscriptions (
  id uuid REFERENCES auth.users NOT NULL,
  stripe_customer_id text,
  status text,
  price_id text,
  PRIMARY KEY (id)
);`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 7. FAQ SECTION ===== */}
      <section className="py-20 px-6 max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <span className="inline-block px-3 py-0.5 bg-[#FFD93D] border-2 border-black font-black uppercase text-[10px] rotate-[-1deg]">
            FAQ ACCORDION
          </span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black">
            FREQUENTLY ASKED QUESTIONS
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div key={idx} className="border-4 border-black bg-white shadow-[4px_4px_0px_0px_#000] transition-all">
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full text-left p-4 font-black uppercase text-xs sm:text-sm flex justify-between items-center focus:outline-none hover:bg-neutral-50"
                >
                  <span>{faq.q}</span>
                  <span className="text-lg">{isOpen ? "−" : "+"}</span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden border-t-2 border-black"
                    >
                      <p className="p-4 text-xs font-medium text-black/75 leading-relaxed bg-[#FFFDF5]">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== 8. CTA / FOOTER ===== */}
      <section className="py-24 px-6 bg-[#FFD93D] text-center border-t-4 border-black relative">
        <div className="absolute inset-0 bg-neo-dots opacity-40 pointer-events-none" />
        <div className="relative z-10 max-w-xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-black leading-none">
            GENERATE YOUR FIRST <br />
            <span className="bg-white px-3 border-4 border-black inline-block rotate-[-2deg] my-1 shadow-[4px_4px_0px_0px_#000]">MASTERPIECE</span>
          </h2>
          <p className="text-xs font-bold text-black/80 max-w-sm mx-auto">
            Stop copy-pasting basic generative prompts. Calibrate structures with MubixPrompts OS in 2 minutes.
          </p>
          <Link href="/builder">
            <button className="neo-btn neo-btn-accent text-sm px-8 py-4 font-black uppercase flex items-center gap-2 mx-auto shadow-[4px_4px_0px_0px_#000]">
              Start Builder Wizard
              <ArrowRight className="w-4 h-4 stroke-[3px]" />
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
