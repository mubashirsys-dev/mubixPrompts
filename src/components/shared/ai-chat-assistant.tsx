"use client";

import { useState, useRef, useEffect } from "react";
import { useBuilderStore } from "@/store/builder-store";
import { getChatSystemPrompt } from "@/lib/chat-prompts";
import {
  MessageSquare, X, Send, Trash2, Copy, RefreshCw, Sparkles,
  Bot, AlertTriangle, ArrowRight, CornerDownLeft, ShieldAlert
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const chatModes = [
  "General Assistant",
  "Prompt Engineer",
  "UI/UX Expert",
  "Backend Expert",
  "SEO Expert",
  "AI Architect"
];

const quickActions = [
  { label: "✨ Improve Prompt", prompt: "Explain how to improve my current generated website prompt so AI tools write extremely clean Next.js pages." },
  { label: "🚀 Expand Prompt", prompt: "Add exhaustive details, barrel exports, and custom hook guidelines to expand my master prompt." },
  { label: "🔍 Add SEO", prompt: "Provide custom JSON-LD schemas, OG meta fields, sitemaps, and robots setup instructions matching my category." },
  { label: "🎨 Add Animations", prompt: "Recommend beautiful scroll-driven animation components and spring button styling formulas." },
  { label: "🗄️ Add Database", prompt: "Generate a complete schema layout and table setup structure for my selections." },
  { label: "🔐 Add Auth & Payments", prompt: "Provide setup details for Clerk Auth middleware layers and Stripe subscription payment webhooks." }
];

export function AIChatAssistant() {
  const store = useBuilderStore();
  const [isOpen, setIsOpen] = useState(false);
  const [activeMode, setActiveMode] = useState("General Assistant");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "👋 Hey there! I'm your MubixPrompts Website Consultant and AI Architect. Let's work together to optimize your prompts, suggest premium features, design stunning layout components, or configure database integrations in real-time. What are we building today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [apiError, setApiError] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of conversation
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
        throw new Error(`Server endpoint returned status ${response.status}`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.content || "Empty response received." }]);
    } catch (err: any) {
      console.error("[Chat Client Error]:", err);
      setApiError(err.message || "Local FreeLLMAPI gateway is offline.");
    } finally {
      setIsTyping(false);
    }
  };

  const handleCopyMessage = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleRegenerate = async () => {
    if (messages.length < 2 || isTyping) return;
    // Find last user message
    const conversation = [...messages];
    let lastUserIndex = -1;
    for (let i = conversation.length - 1; i >= 0; i--) {
      if (conversation[i].role === "user") {
        lastUserIndex = i;
        break;
      }
    }

    if (lastUserIndex === -1) return;

    const lastUserText = conversation[lastUserIndex].content;
    // Chop everything after last user message
    setMessages(conversation.slice(0, lastUserIndex + 1));
    await handleSend(lastUserText);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 border-4 border-black bg-zinc-950 text-white rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_#000] hover:bg-zinc-800 transition-all hover:translate-y-[-2px] active:translate-y-[2px] active:shadow-none"
          title="Open AI Chat Assistant"
        >
          {isOpen ? <X className="w-6 h-6 stroke-[3px]" /> : <MessageSquare className="w-6 h-6 stroke-[3px]" />}
        </button>
      </div>

      {/* Floating Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-[360px] sm:w-[440px] h-[580px] z-50 border-4 border-black bg-zinc-950 text-white flex flex-col justify-between shadow-[8px_8px_0px_0px_#000] overflow-hidden"
          >
            {/* Header */}
            <div className="border-b-4 border-black bg-zinc-900 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 border-2 border-black bg-[#FFD93D] text-black flex items-center justify-center shadow-[2px_2px_0px_0px_#000]">
                  <Bot className="w-5 h-5 stroke-[2.5px]" />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-tight text-white flex items-center gap-1.5">
                    MUBIX OS ASSISTANT
                    <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
                  </h4>
                  <p className="text-[9px] font-bold text-white/50 uppercase">Active Mode: {activeMode}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMessages([messages[0]])}
                  className="p-1 border border-white/20 hover:bg-white/10"
                  title="Clear chat"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 border border-white/20 hover:bg-white/10"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Chat Modes selector Bar */}
            <div className="bg-zinc-900/50 border-b-2 border-black px-2 py-1.5 flex gap-1 overflow-x-auto scrollbar-none">
              {chatModes.map((mode) => (
                <button
                  key={mode}
                  onClick={() => setActiveMode(mode)}
                  className={`text-[9px] font-black uppercase px-2 py-0.5 border shrink-0 transition-all ${
                    activeMode === mode
                      ? "bg-[#C4B5FD] text-black border-black"
                      : "bg-zinc-800 text-white/70 border-white/10 hover:bg-zinc-700"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            {/* Dynamic context sticky tag */}
            <div className="bg-[#FFFDF5] text-black border-b-2 border-black py-1 px-3 text-[9px] font-black uppercase flex items-center justify-between">
              <span>🎯 CONTEXT: {store.selectedCategory?.name || "No Category"} ({store.codingLevel})</span>
              <span className="text-[#FF6B6B]">FreeLLMAPI Active</span>
            </div>

            {/* Message Area */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-950"
            >
              {messages.map((msg, idx) => {
                const isUser = msg.role === "user";
                return (
                  <div
                    key={idx}
                    className={`flex items-start gap-2 ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    {!isUser && (
                      <div className="w-6 h-6 shrink-0 border border-white/30 bg-zinc-800 flex items-center justify-center text-[10px] font-bold">
                        AI
                      </div>
                    )}
                    <div
                      className={`p-3 max-w-[80%] border-2 border-black text-xs leading-relaxed space-y-2 shadow-[2px_2px_0px_0px_#000] ${
                        isUser
                          ? "bg-[#C4B5FD] text-black shadow-none border-white/20"
                          : "bg-zinc-900 text-white"
                      }`}
                    >
                      <ReactMarkdown
                        components={{
                          pre: ({ node, ...props }) => (
                            <pre className="bg-black/40 p-2.5 my-2 border border-white/10 overflow-x-auto font-mono text-[10px]" {...props} />
                          ),
                          code: ({ node, ...props }) => (
                            <code className="bg-black/30 px-1 py-0.5 font-mono text-[10px] text-[#FFD93D]" {...props} />
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
                            <Copy className="w-2.5 h-2.5" />
                            {copiedIndex === idx ? "Copied!" : "Copy"}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 shrink-0 border border-white/30 bg-zinc-800 flex items-center justify-center text-[10px] font-bold animate-pulse">
                    AI
                  </div>
                  <div className="p-3 bg-zinc-900 text-xs text-white/50 border border-white/10 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}

              {/* API Offline Error Panel */}
              {apiError && (
                <div className="border-2 border-red-500 bg-red-950/40 p-4 space-y-3">
                  <div className="flex items-start gap-2">
                    <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 stroke-[2px]" />
                    <div>
                      <h5 className="text-[10px] font-black text-red-400 uppercase">GATEWAY CONNECT FAIL</h5>
                      <p className="text-[10px] font-bold text-red-300/80 leading-normal mt-0.5">{apiError}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleRegenerate}
                    className="w-full py-1 border border-red-500 hover:bg-red-500 hover:text-white text-[9px] font-black uppercase transition-all flex items-center justify-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Retry Gateway Connection
                  </button>
                </div>
              )}
            </div>

            {/* Quick Actions Board */}
            <div className="bg-zinc-900 border-t-2 border-black p-2 space-y-1.5">
              <span className="text-[8px] font-black uppercase text-white/40 block">⚡ QUICK ACTION ASSISTANTS</span>
              <div className="grid grid-cols-2 gap-1.5 max-h-[75px] overflow-y-auto scrollbar-none">
                {quickActions.map((action) => (
                  <button
                    key={action.label}
                    onClick={() => handleSend(action.prompt)}
                    className="text-[9px] font-bold text-left p-1 border border-white/10 hover:border-white/30 bg-zinc-950 hover:bg-zinc-800 text-white/80 transition-all truncate"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer Input Bar */}
            <div className="border-t-4 border-black bg-zinc-900 p-2 flex gap-2">
              <input
                type="text"
                placeholder="Ask your website assistant anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-zinc-950 border-2 border-black text-xs font-bold p-2 text-white placeholder-white/30 focus:outline-none focus:border-white/40"
                onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
              />
              <button
                onClick={() => handleSend(input)}
                className="p-2 border-2 border-black bg-[#C4B5FD] text-black hover:bg-[#b09ffd] shadow-[1px_1px_0px_0px_#000] active:translate-y-[1px] active:shadow-none flex items-center justify-center"
              >
                <Send className="w-4 h-4 text-black stroke-[3.5px]" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
