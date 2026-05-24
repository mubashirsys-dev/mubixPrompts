"use client";

import { useState, useRef, useEffect } from "react";
import { useBuilderStore } from "@/store/builder-store";
import { getChatSystemPrompt } from "@/lib/chat-prompts";
import { Navbar } from "@/components/layout/navbar";
import {
  MessageSquare, Send, Trash2, Copy, RefreshCw, Bot,
  ShieldAlert, Sparkles, Layout, Terminal, Code, Cpu, Settings, ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const chatModes = [
  { name: "General Assistant", desc: "Suggests general UX ideas, styles, and startup strategies", icon: MessageSquare },
  { name: "Prompt Engineer", desc: "Helps compile, structure, and refine master engineering prompts", icon: Bot },
  { name: "UI/UX Expert", desc: "Focuses on micro-animations, typography grids, and cards shadows", icon: Layout },
  { name: "Backend Expert", desc: "Builds Postgres schemas, Clerk auth tokens, and Stripe hooks", icon: Terminal },
  { name: "SEO Expert", desc: "Recommends JSON-LD schemas, OG markup, and sitemaps layouts", icon: Cpu },
  { name: "AI Architect", desc: "Maps strict folder layouts, type safety rules, and dependencies", icon: Settings },
];

const quickActions = [
  { label: "✨ Improve Prompt", prompt: "Explain how to improve my current generated website prompt so AI tools write extremely clean Next.js pages." },
  { label: "🚀 Expand Prompt", prompt: "Add exhaustive details, barrel exports, and custom hook guidelines to expand my master prompt." },
  { label: "🔍 Add SEO Guidelines", prompt: "Provide custom JSON-LD schemas, OG meta fields, sitemaps, and robots setup instructions matching my category." },
  { label: "🎨 Add Micro-Animations", prompt: "Recommend beautiful scroll-driven animation components and spring button styling formulas." },
  { label: "🗄️ Generate SQL Schema", prompt: "Generate a complete Postgres schema layout and table setup structure for my selections." },
  { label: "🔐 Configure Auth & Billing", prompt: "Provide setup details for Clerk Auth middleware layers and Stripe subscription payment webhooks." }
];

export default function AssistantPage() {
  const store = useBuilderStore();
  const [activeMode, setActiveMode] = useState("General Assistant");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "👋 Welcome to your fullscreen MubixPrompts AI Workspace! I am fully synchronized with your current builder options. Ask me to formulate UI sections, design complex database schemas, refine layouts, or compile micro-interaction triggers contextually."
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [apiError, setApiError] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isTyping) return;

    const userMessage: Message = { role: "user", content: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    setApiError("");

    const systemPrompt = getChatSystemPrompt(store, activeMode);
    const targetModel = store.selectedAIModel?.id || "auto";

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: targetModel,
          systemPrompt,
          messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content }))
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.content || "Empty response from gateway." }]);
    } catch (err: any) {
      setApiError(err.message || "Failed to reach LLM gateway on port 3001.");
    } finally {
      setIsTyping(false);
    }
  };

  const handleCopyMessage = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleClear = () => {
    setMessages([messages[0]]);
    setApiError("");
  };

  const handleRegenerate = () => {
    if (messages.length > 1) {
      const userMsgs = messages.filter(m => m.role === "user");
      if (userMsgs.length > 0) {
        const lastUserMsg = userMsgs[userMsgs.length - 1].content;
        handleSend(lastUserMsg);
      }
    } else {
      handleSend("Hi! Introduce yourself and suggest some project features.");
    }
  };

  return (
    <div className="h-screen bg-[#FFFDF5] text-black flex flex-col pt-[76px] overflow-hidden">
      <Navbar />

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden max-w-[1400px] w-full mx-auto border-x-4 border-black bg-white">
        
        {/* Left Panel: Chat Modes */}
        <div className="w-full lg:w-[280px] border-b-4 lg:border-b-0 lg:border-r-4 border-black bg-zinc-950 text-white p-4 flex flex-col gap-3 overflow-y-auto shrink-0">
          <div>
            <span className="text-[10px] font-black uppercase text-white/50 tracking-wider block mb-2">CHAT WORKSPACE MODES</span>
            <p className="text-[11px] font-bold text-white/70 leading-relaxed mb-4">
              Switching assistant mode customizes the system directives and architecture feedback instantly.
            </p>
          </div>

          <div className="space-y-2">
            {chatModes.map((mode) => {
              const isSelected = activeMode === mode.name;
              const Icon = mode.icon;
              return (
                <button
                  key={mode.name}
                  onClick={() => setActiveMode(mode.name)}
                  className={`w-full text-left p-3 border-2 transition-all duration-100 flex items-start gap-2.5 shadow-[2px_2px_0px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none ${
                    isSelected
                      ? "bg-[#C4B5FD] text-black border-black"
                      : "bg-zinc-900 border-white/10 hover:bg-zinc-800 text-white"
                  }`}
                >
                  <Icon className={`w-5 h-5 shrink-0 ${isSelected ? "text-black" : "text-white/60"}`} />
                  <div>
                    <span className="text-xs font-black uppercase tracking-tight block">{mode.name}</span>
                    <span className={`text-[9px] font-bold block leading-normal mt-0.5 ${isSelected ? "text-black/70" : "text-white/40"}`}>
                      {mode.desc}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Center Panel: Messages Stream */}
        <div className="flex-1 flex flex-col justify-between overflow-hidden bg-zinc-900 text-white">
          {/* Active Status Info */}
          <div className="border-b-2 border-black bg-zinc-950 px-4 py-2 flex items-center justify-between text-[10px] font-black uppercase text-white/60">
            <span className="flex items-center gap-1.5">
              <Bot className="w-4 h-4 text-[#FFD93D]" />
              MODE: {activeMode}
            </span>
            <button
              onClick={handleClear}
              className="text-white/40 hover:text-white flex items-center gap-1 hover:underline"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear Conversation
            </button>
          </div>

          {/* Messages scroll box */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-zinc-950">
            {messages.map((msg, idx) => {
              const isUser = msg.role === "user";
              return (
                <div key={idx} className={`flex items-start gap-3.5 ${isUser ? "justify-end" : "justify-start"}`}>
                  {!isUser && (
                    <div className="w-8 h-8 border-2 border-white bg-zinc-800 text-white font-black text-xs flex items-center justify-center shadow-[2px_2px_0px_0px_#fff] shrink-0">
                      AI
                    </div>
                  )}
                  <div
                    className={`p-4 rounded-none border-2 border-black max-w-[75%] text-xs leading-relaxed space-y-2 shadow-[4px_4px_0px_0px_#000] ${
                      isUser
                        ? "bg-[#C4B5FD] text-black shadow-none border-white/20"
                        : "bg-zinc-900 text-white border-white/10"
                    }`}
                  >
                    <ReactMarkdown
                      components={{
                        pre: ({ node, ...props }) => (
                          <pre className="bg-black/55 p-3.5 my-2 border border-white/10 overflow-x-auto font-mono text-[11px]" {...props} />
                        ),
                        code: ({ node, ...props }) => (
                          <code className="bg-black/40 px-1 py-0.5 font-mono text-[11px] text-[#FFD93D]" {...props} />
                        )
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>

                    {!isUser && (
                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10 text-[9px] font-black uppercase text-white/50">
                        <button
                          onClick={() => handleCopyMessage(msg.content, idx)}
                          className="hover:text-white flex items-center gap-0.5"
                        >
                          <Copy className="w-3 h-3" />
                          {copiedIndex === idx ? "Copied!" : "Copy response"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 border-2 border-white bg-zinc-800 text-white font-black text-xs flex items-center justify-center shadow-[2px_2px_0px_0px_#fff] shrink-0 animate-pulse">
                  AI
                </div>
                <div className="p-4 bg-zinc-900 border border-white/10 text-xs text-white/50 flex items-center gap-1.5 shadow-[2px_2px_0px_0px_#000]">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}

            {/* Offline gateway retry block */}
            {apiError && (
              <div className="border-4 border-red-500 bg-red-950/40 p-5 max-w-xl mx-auto space-y-4 shadow-[4px_4px_0px_0px_#000]">
                <div className="flex items-start gap-3">
                  <ShieldAlert className="w-8 h-8 text-red-500 shrink-0 stroke-[2px]" />
                  <div>
                    <h5 className="text-xs font-black text-red-400 uppercase">GATEWAY CONNECT FAILURE</h5>
                    <p className="text-[11px] font-bold text-red-300/80 leading-relaxed mt-1">
                      MubixPrompts could not establish a connection to your local FreeLLMAPI server: <strong>{apiError}</strong>. Ensure the server is listening at <strong>http://localhost:3001</strong>.
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleRegenerate}
                  className="w-full py-2 border-2 border-red-500 hover:bg-red-500 hover:text-white text-xs font-black uppercase transition-all flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Retry Server Gateway Handshake
                </button>
              </div>
            )}
          </div>

          {/* Quick Actions Board */}
          <div className="border-t-2 border-black bg-zinc-950 p-4 space-y-2">
            <span className="text-[9px] font-black uppercase text-white/40 block">⚡ DYNAMIC PROMPT SHORTCUTS</span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  onClick={() => handleSend(action.prompt)}
                  className="text-[10px] font-bold text-left p-2 border border-white/10 hover:border-white/30 bg-zinc-900 hover:bg-zinc-800 text-white/90 transition-all truncate"
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input Panel */}
          <div className="border-t-4 border-black bg-zinc-900 p-4 flex gap-3">
            <input
              type="text"
              placeholder="Type your design, UX, backend, or prompt refinement questions..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-zinc-950 border-4 border-black text-xs font-bold p-3 text-white placeholder-white/35 focus:outline-none focus:border-white/40 shadow-[2px_2px_0px_0px_#000]"
              onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
            />
            <button
              onClick={() => handleSend(input)}
              className="px-6 border-4 border-black bg-[#C4B5FD] text-black hover:bg-[#b09ffd] shadow-[3px_3px_0px_0px_#000] active:translate-y-[1px] active:shadow-none font-black uppercase text-xs flex items-center gap-1.5"
            >
              Send
              <ChevronRight className="w-4 h-4 stroke-[3.5px]" />
            </button>
          </div>
        </div>

        {/* Right Panel: Workspace DNA Summary */}
        <div className="w-full lg:w-[320px] border-t-4 lg:border-t-0 lg:border-l-4 border-black bg-[#FFFDF5] p-6 space-y-6 overflow-y-auto shrink-0">
          <div className="space-y-1">
            <span className="neo-sticker bg-[#FF6B6B] text-white text-[9px] font-black uppercase">SYSTEM DATA</span>
            <h4 className="text-lg font-black uppercase text-black">WORKSPACE CONTEXT</h4>
            <p className="text-[11px] font-bold text-black/60">
              The AI Chat Assistant possesses comprehensive awareness of your selections to formulate tailored specifications.
            </p>
          </div>

          <div className="space-y-4 pt-2 border-t border-black/10">
            {/* Category */}
            <div className="space-y-1">
              <span className="text-[9px] font-black uppercase text-black/55">1. Target Category</span>
              <div className="border-2 border-black p-2 bg-white text-xs font-black uppercase text-black">
                📂 {store.selectedCategory?.name || "None Selected"}
              </div>
            </div>

            {/* Design System */}
            <div className="space-y-1">
              <span className="text-[9px] font-black uppercase text-black/55">2. Design Style Theme</span>
              <div className="border-2 border-black p-2 bg-white text-xs font-black uppercase text-black">
                🎨 {store.selectedDesignStyle?.name || "Default Style"}
              </div>
            </div>

            {/* Skillset Tier */}
            <div className="space-y-1">
              <span className="text-[9px] font-black uppercase text-black/55">3. Skillset Level</span>
              <div className="border-2 border-black p-2 bg-white text-xs font-black uppercase text-black">
                🧑‍💻 {store.codingLevel.toUpperCase()}
              </div>
            </div>

            {/* Features list */}
            <div className="space-y-1">
              <span className="text-[9px] font-black uppercase text-black/55">4. Core Features</span>
              <div className="border-2 border-black p-2.5 bg-white text-xs font-bold text-black/80 max-h-[100px] overflow-y-auto space-y-1">
                {store.selectedFeatures.length === 0 ? (
                  <span className="text-black/40">No features added</span>
                ) : (
                  store.selectedFeatures.map(f => (
                    <div key={f} className="flex items-center gap-1.5 text-[10px] font-black uppercase">
                      <span className="w-1.5 h-1.5 bg-[#4ade80] rounded-full" />
                      {f}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Page Sections */}
            <div className="space-y-1">
              <span className="text-[9px] font-black uppercase text-black/55">5. Homepage Sequence</span>
              <div className="border-2 border-black p-2.5 bg-white text-xs font-bold text-black/80 max-h-[100px] overflow-y-auto space-y-1">
                {store.selectedSections.length === 0 ? (
                  <span className="text-black/40">No sections ordered</span>
                ) : (
                  store.selectedSections.map((s, i) => (
                    <div key={s} className="flex items-center gap-1 text-[10px] font-black uppercase">
                      <span className="text-[9px] text-[#FF6B6B]">{i + 1}.</span>
                      {s}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
