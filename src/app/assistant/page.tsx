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
  
  const [connectionStatus, setConnectionStatus] = useState<"checking" | "connected" | "error">("checking");
  const [connectionError, setConnectionError] = useState("");
  const [selectedChatModel, setSelectedChatModel] = useState("google/gemini-2.5-pro");
  const [mobileTab, setMobileTab] = useState<"chat" | "modes" | "context">("chat");

  const scrollRef = useRef<HTMLDivElement>(null);

  // Sync with builder store's selected AI model if possible
  useEffect(() => {
    if (store.selectedAIModel?.id) {
      const storeModelId = store.selectedAIModel.id;
      const map: Record<string, string> = {
        chatgpt: "openai/gpt-5",
        claude: "anthropic/claude-sonnet-4",
        gemini: "google/gemini-2.5-pro",
        deepseek: "deepseek/deepseek-chat",
        groq: "x-ai/grok-4",
        mistral: "mistralai/mistral-large",
        llama: "meta-llama/llama-3.1-405b-instruct",
      };
      const mapped = map[storeModelId];
      if (mapped) {
        setSelectedChatModel(mapped);
      }
    }
  }, [store.selectedAIModel]);

  // Ping connection health check on load
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const endpoint = process.env.NODE_ENV === "development" ? "/api/chat" : "/api/chat.php";
        const res = await fetch(endpoint);
        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }
        const data = await res.json();
        if (data.status === "online") {
          setConnectionStatus("connected");
        } else {
          setConnectionStatus("error");
          setConnectionError(data.details || data.error || "Configuration Error");
        }
      } catch (err: any) {
        setConnectionStatus("error");
        setConnectionError(err.message || "Failed to contact OpenRouter PHP API");
      }
    };
    checkConnection();
  }, []);

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

    try {
      const endpoint = process.env.NODE_ENV === "development" ? "/api/chat" : "/api/chat.php";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: selectedChatModel,
          systemPrompt,
          messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content }))
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Server returned HTTP ${response.status}`);
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.content || "Empty response from gateway." }]);
    } catch (err: any) {
      setApiError(err.message || "Failed to communicate with OpenRouter backend.");
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

  const chatModelsList = [
    { id: "openai/gpt-5", label: "ChatGPT (GPT-5)" },
    { id: "anthropic/claude-sonnet-4", label: "Claude (Sonnet 4)" },
    { id: "google/gemini-2.5-pro", label: "Gemini (2.5 Pro)" },
    { id: "deepseek/deepseek-chat", label: "DeepSeek Chat" },
    { id: "x-ai/grok-4", label: "Grok (Grok 4)" },
    { id: "mistralai/mistral-large", label: "Mistral Large" },
    { id: "meta-llama/llama-3.1-405b-instruct", label: "Llama (3.1 405B)" }
  ];

  return (
    <div className="h-screen bg-[#FFFDF5] text-black flex flex-col pt-[76px] overflow-hidden">
      <Navbar />

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden max-w-[1400px] w-full mx-auto border-x-4 border-black bg-white">
        
        {/* Mobile Tab Switcher */}
        <div className="flex lg:hidden border-b-4 border-black bg-zinc-950 text-white font-black text-xs uppercase shrink-0">
          <button
            onClick={() => setMobileTab("chat")}
            className={`flex-1 py-3 text-center border-r-2 border-black transition-all ${
              mobileTab === "chat" ? "bg-[#C4B5FD] text-black" : "bg-zinc-900 text-white/60"
            }`}
          >
            💬 Chat
          </button>
          <button
            onClick={() => setMobileTab("modes")}
            className={`flex-1 py-3 text-center border-r-2 border-black transition-all ${
              mobileTab === "modes" ? "bg-[#FFD93D] text-black" : "bg-zinc-900 text-white/60"
            }`}
          >
            ⚙️ Modes
          </button>
          <button
            onClick={() => setMobileTab("context")}
            className={`flex-1 py-3 text-center transition-all ${
              mobileTab === "context" ? "bg-[#FF6B6B] text-white" : "bg-zinc-900 text-white/60"
            }`}
          >
            📋 Context
          </button>
        </div>

        {/* Left Panel: Chat Modes */}
        <div className={`w-full lg:w-[280px] border-b-4 lg:border-b-0 lg:border-r-4 border-black bg-zinc-950 text-white p-4 flex-col gap-3 overflow-y-auto shrink-0 ${mobileTab === "modes" ? "flex" : "hidden lg:flex"}`}>
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
        <div className={`flex-1 flex-col justify-between overflow-hidden bg-zinc-900 text-white ${mobileTab === "chat" ? "flex" : "hidden lg:flex"}`}>
          {/* Active Status Info */}
          <div className="border-b-2 border-black bg-zinc-950 px-4 py-2 flex items-center justify-between text-[10px] font-black uppercase text-white/60">
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Bot className="w-4 h-4 text-[#FFD93D]" />
                MODE: {activeMode}
              </span>
              <div className="flex items-center gap-1.5 border-l border-white/20 pl-4">
                {connectionStatus === "checking" && (
                  <span className="text-white/40 animate-pulse">Checking API...</span>
                )}
                {connectionStatus === "connected" && (
                  <span className="text-[#4ade80] font-black flex items-center gap-1">
                    🟢 AI Connected
                  </span>
                )}
                {connectionStatus === "error" && (
                  <span className="text-[#FF6B6B] font-black flex items-center gap-1" title={connectionError}>
                    🔴 API Error
                  </span>
                )}
              </div>
            </div>
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
            {(connectionStatus === "error" || apiError) && (
              <div className="border-4 border-red-500 bg-red-950/40 p-5 max-w-xl mx-auto space-y-4 shadow-[4px_4px_0px_0px_#000]">
                <div className="flex items-start gap-3">
                  <ShieldAlert className="w-8 h-8 text-red-500 shrink-0 stroke-[2px]" />
                  <div>
                    <h5 className="text-xs font-black text-red-400 uppercase">OPENROUTER CONNECTION ERROR</h5>
                    <p className="text-[11px] font-bold text-red-300/80 leading-relaxed mt-1">
                      MubixPrompts could not establish a connection to OpenRouter: <strong>{connectionError || apiError}</strong>. Ensure your API Key is configured correctly in `.env`.
                    </p>
                  </div>
                </div>
                <button
                  onClick={async () => {
                    setConnectionStatus("checking");
                    setApiError("");
                    try {
                      const endpoint = process.env.NODE_ENV === "development" ? "/api/chat" : "/api/chat.php";
                      const res = await fetch(endpoint);
                      const data = await res.json();
                      if (data.status === "online") {
                        setConnectionStatus("connected");
                      } else {
                        setConnectionStatus("error");
                        setConnectionError(data.details || data.error || "OpenRouter configuration error");
                      }
                    } catch (err: any) {
                      setConnectionStatus("error");
                      setConnectionError(err.message || "Failed to contact OpenRouter PHP API");
                    }
                  }}
                  className="w-full py-2 border-2 border-red-500 hover:bg-red-500 hover:text-white text-xs font-black uppercase transition-all flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Retry OpenRouter API Connection
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
          <div className="border-t-4 border-black bg-zinc-900 p-4 flex flex-col sm:flex-row gap-3">
            <select
              value={selectedChatModel}
              onChange={(e) => setSelectedChatModel(e.target.value)}
              className="bg-[#FFD93D] border-4 border-black text-xs font-black uppercase p-3 text-black focus:outline-none shadow-[2px_2px_0px_0px_#000] cursor-pointer"
            >
              {chatModelsList.map(m => (
                <option key={m.id} value={m.id} className="text-black bg-white font-bold">{m.label}</option>
              ))}
            </select>
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
              className="px-6 py-3 sm:py-0 border-4 border-black bg-[#C4B5FD] text-black hover:bg-[#b09ffd] shadow-[3px_3px_0px_0px_#000] active:translate-y-[1px] active:shadow-none font-black uppercase text-xs flex items-center justify-center gap-1.5"
            >
              Send
              <ChevronRight className="w-4 h-4 stroke-[3.5px]" />
            </button>
          </div>
        </div>

        {/* Right Panel: Workspace DNA Summary */}
        <div className={`w-full lg:w-[320px] border-t-4 lg:border-t-0 lg:border-l-4 border-black bg-[#FFFDF5] p-6 space-y-6 overflow-y-auto shrink-0 ${mobileTab === "context" ? "block" : "hidden lg:block"}`}>
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
