import { AIModel } from "@/types/builder";

export const aiModels: AIModel[] = [
  {
    id: "auto",
    name: "Auto (Smart Selection)",
    description: "Automatically routes prompts to the best model based on category & complexity",
    bestFor: "All categories, auto optimization",
    strengths: ["Dynamic routing", "Best speed/quality ratio", "Fully managed"],
    icon: "Sparkles",
    recommended: true,
    color: "#a78bfa"
  },
  {
    id: "gemini",
    name: "Gemini Pro / Flash",
    description: "Google's powerful multimodal system. Best for UI design systems & multi-page UX outlines.",
    bestFor: "UI concepts and fast multi-modal analysis",
    strengths: ["Huge context windows", "Creative layout ideas", "Multi-modal insights"],
    icon: "Sparkles",
    recommended: true,
    color: "#3b82f6"
  },
  {
    id: "groq",
    name: "Groq (Llama-3/Mixtral)",
    description: "Ultra-fast inference provider. Ideal for rapid structural feedback & modular schemas.",
    bestFor: "Real-time responses and direct formatting tests",
    strengths: ["Sub-second generation", "Clean code blocks", "High throughput"],
    icon: "Zap",
    recommended: false,
    color: "#f59e0b"
  },
  {
    id: "openrouter",
    name: "OpenRouter (DeepSeek / Claude)",
    description: "Gateway router supporting Claude 3.5 Sonnet, ChatGPT 4o, and DeepSeek Coder V2.",
    bestFor: "Advanced code generation and direct model comparative logic",
    strengths: ["Claude & ChatGPT access", "Diverse routing endpoints", "Cost-effective API"],
    icon: "Network",
    recommended: true,
    color: "#10b981"
  },
  {
    id: "cerebras",
    name: "Cerebras Fast Inference",
    description: "Wafer-scale super-fast Llama inference engine. Generates massive text in seconds.",
    bestFor: "Instant generation of large-scale markdown prompts",
    strengths: ["Ludicrous speed", "Exhaustive documentation", "High tokens-per-second"],
    icon: "Cpu",
    recommended: false,
    color: "#ec4899"
  },
  {
    id: "claude",
    name: "Claude (Anthropic)",
    description: "Best for full website generation, architecture design, and detailed code output",
    bestFor: "Complete website generation and system architecture",
    strengths: ["Full-stack code generation", "Detailed architecture", "Clean code output", "Follows instructions precisely"],
    icon: "Bot",
    recommended: true,
    color: "#d97706"
  },
  {
    id: "chatgpt",
    name: "ChatGPT (OpenAI)",
    description: "Best for logic, advanced coding, API design, and problem-solving",
    bestFor: "Complex logic, debugging, and advanced coding",
    strengths: ["Strong reasoning", "API design", "Debugging", "Wide knowledge base"],
    icon: "MessageCircle",
    recommended: true,
    color: "#10b981"
  },
  {
    id: "deepseek",
    name: "DeepSeek Coder",
    description: "Best for backend code, APIs, and database-heavy applications",
    bestFor: "Backend development, APIs, and server-side logic",
    strengths: ["Backend expertise", "Database design", "API architecture", "Cost-effective"],
    icon: "Database",
    recommended: false,
    color: "#3b82f6"
  },
  {
    id: "cursor",
    name: "Cursor AI",
    description: "Best for editing existing code projects and making changes to real codebases",
    bestFor: "Code editing, refactoring, and working with existing projects",
    strengths: ["Code editing", "Codebase understanding", "Refactoring", "IDE integration"],
    icon: "Code",
    recommended: true,
    color: "#06b6d4"
  },
  {
    id: "lovable",
    name: "Lovable",
    description: "Best for generating fast MVPs (minimum viable products) and quick prototypes",
    bestFor: "Fast MVP generation and rapid prototyping",
    strengths: ["Quick prototyping", "Full-stack output", "Beautiful defaults", "One-shot generation"],
    icon: "Heart",
    recommended: true,
    color: "#ec4899"
  },
  {
    id: "bolt",
    name: "Bolt.new",
    description: "Best for frontend generation and creating beautiful user interfaces quickly",
    bestFor: "Frontend generation and UI development",
    strengths: ["Frontend focused", "Fast generation", "Modern UI output", "Component-based"],
    icon: "Zap",
    recommended: false,
    color: "#f97316"
  },
  {
    id: "replit",
    name: "Replit AI",
    description: "Best for quick experiments and running code directly in the browser",
    bestFor: "Quick experiments, learning, and browser-based development",
    strengths: ["Browser-based", "Instant deployment", "Beginner-friendly", "Real-time collaboration"],
    icon: "Terminal",
    recommended: false,
    color: "#f59e0b"
  },
  {
    id: "windsurf",
    name: "Windsurf",
    description: "Best for AI-powered code editing with deep codebase understanding",
    bestFor: "Code editing with contextual awareness",
    strengths: ["Deep context", "Smart editing", "Flow-based coding", "IDE experience"],
    icon: "Wind",
    recommended: false,
    color: "#14b8a6"
  },
  {
    id: "v0",
    name: "v0 by Vercel",
    description: "Best for generating beautiful UI components and landing pages",
    bestFor: "UI component generation and beautiful interfaces",
    strengths: ["Beautiful UI output", "Shadcn integration", "Component-focused", "Design quality"],
    icon: "Layers",
    recommended: false,
    color: "#000000"
  },
  {
    id: "antigravity",
    name: "Antigravity",
    description: "Best for agentic full-stack development with deep codebase understanding",
    bestFor: "Full-stack agentic development and complex projects",
    strengths: ["Agentic coding", "Full-stack capability", "Deep planning", "Production-ready output"],
    icon: "Orbit",
    recommended: true,
    color: "#7c3aed"
  },
];
