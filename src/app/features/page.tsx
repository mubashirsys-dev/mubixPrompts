"use client";

import { Navbar } from "@/components/layout/navbar";
import { Sparkles, Code, Terminal, Zap, Shield, Database, Layout, RefreshCw, BarChart2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const features = [
  {
    icon: Code,
    title: "Detailed Block Architecture",
    description: "Generates strict folder/file trees, complete index barrel files, sitemaps blueprints, and sitemap/robots SEO compliance rules.",
    badge: "Engine Core",
    color: "bg-[#4ade80]/20 text-[#22c55e]"
  },
  {
    icon: Layout,
    title: "Theme DNA Preview",
    description: "Inbuilt browser frames to preview interactive landing pages for Swiss, Apple-Minimalist, Glassmorphism, Luxury Black, and Neo-brutalist configurations.",
    badge: "UI / UX",
    color: "bg-[#a78bfa]/20 text-[#8b5cf6]"
  },
  {
    icon: Bot,
    title: "Floating AI Workspace",
    description: "A draggable chatbot synchronized to actual workspace filters, featuring modes like Prompt Engineer, Backend Expert, and SEO Strategist.",
    badge: "Live Companion",
    color: "bg-[#fde68a]/20 text-[#eab308]"
  },
  {
    icon: Terminal,
    title: "FreeLLMAPI Local Gateway",
    description: "Connects securely to OpenAI-compatible base endpoints on port 3001, executing chunked model calls to compile exceptionally long prompts.",
    badge: "LLM Power",
    color: "bg-[#fda4af]/20 text-[#f43f5e]"
  },
  {
    icon: Database,
    title: "Optional Services skip paths",
    description: "Switch integrations OFF dynamically to skip billing/auth keys and compile client-only localStorage repositories.",
    badge: "Smart Skipping",
    color: "bg-[#93c5fd]/20 text-[#3b82f6]"
  },
  {
    icon: BarChart2,
    title: "Sequential Layout Ordering",
    description: "Arrange target website sections, replicate bento sections, and adjust priorities with custom arrow blocks in Step 7.",
    badge: "Page Control",
    color: "bg-emerald-100 text-emerald-600"
  }
];

import { Bot } from "lucide-react";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF5] text-black pt-24 pb-16">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="inline-block px-3 py-1 bg-[#FFD93D] border-2 border-black font-black uppercase text-xs rotate-[-1deg]">
            FEATURES LIST
          </span>
          <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight">
            MUBIX OS <span className="bg-[#FF6B6B] text-white px-2 border-4 border-black inline-block rotate-[2deg] shadow-[4px_4px_0px_0px_#000]">FEATURES</span>
          </h1>
          <p className="text-sm font-bold text-black/70 max-w-xl mx-auto leading-relaxed">
            Discover the powerful features built specifically into MubixPrompts to help non-coders and senior engineers synthesize 300k+ character master prompts.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_#000] flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-2.5 border-2 border-black ${feat.color}`}>
                      <Icon className="w-6 h-6 stroke-[3px]" />
                    </div>
                    <span className="text-[10px] font-black uppercase bg-black text-[#FFD93D] px-2 py-0.5 border border-black">
                      {feat.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-black uppercase tracking-tight">{feat.title}</h3>
                  <p className="text-xs font-bold text-black/60 leading-relaxed">{feat.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="text-center pt-8">
          <Link href="/builder">
            <button className="neo-btn neo-btn-accent text-lg px-8 py-3.5 font-black uppercase">
              Launch Prompt Wizard
              <Sparkles className="w-5 h-5 ml-2 stroke-[3px]" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
