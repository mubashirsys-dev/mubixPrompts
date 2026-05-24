// ============================================================
// MubixPrompts — Upgraded Reusable AI Service Engine (src/lib/ai.ts)
// ============================================================

import { BuilderState } from "@/types/builder";
import { generateMasterPrompt } from "./prompt-engine";

export interface AIRequestOptions {
  model: string;
  builderState: BuilderState;
  generationMode: "fast" | "pro" | "ultra";
  onPhaseChange?: (phase: string) => void;
  onBlockStatusChange?: (blockId: string, status: "pending" | "generating" | "completed" | "failed", latency?: number) => void;
}

export interface ChunkDefinition {
  id: string;
  title: string;
  phase: string;
  systemPrompt: string;
  userPrompt: string;
}

// Memory cache buffer
const inMemoryCache: Record<string, string> = {};

export async function generateMasterPromptWithAI(options: AIRequestOptions): Promise<string> {
  const { model, builderState, generationMode, onPhaseChange, onBlockStatusChange } = options;

  const offlineBlueprint = generateMasterPrompt(builderState);

  // Compute a smart visual cache key based on settings configurations
  const cacheKey = `mubix_cache_${builderState.selectedCategory?.id || "cat"}_${builderState.selectedDesignStyle?.id || "style"}_${generationMode}_${builderState.selectedFeatures.sort().join("-")}`;

  // 1. Check Caching Layer
  const cachedResult = typeof window !== "undefined" ? window.localStorage.getItem(cacheKey) : inMemoryCache[cacheKey];
  if (cachedResult) {
    console.log("[Prompt Engine] Cache HIT! Instantly served cached layout prompt compilation.");
    if (onPhaseChange) {
      onPhaseChange("Instantly loaded from layout Cache!");
    }
    // Update all block progress meters immediately to completed state
    const blockIds = ["arch", "ui", "database", "api", "seo", "security"];
    if (onBlockStatusChange) {
      blockIds.forEach(id => onBlockStatusChange(id, "completed", 5));
    }
    return cachedResult;
  }

  // 2. Define block tasks depending on Selected Compilation Mode
  const allChunks: ChunkDefinition[] = [
    {
      id: "arch",
      title: "Architecture Block",
      phase: "Synthesizing Core Architecture…",
      systemPrompt: "You are MubixPrompts Principal Architect. Synthesize application mission, goals, audience profiles, bento bocks sequencing, and detailed files/folder tree blueprint structures.",
      userPrompt: `Target Specifications:\n${offlineBlueprint}\n\nGenerate: BLOCK 1 — MISSION & SPECS, BLOCK 2 — CODER RULES, and BLOCK 6 — FILE TREE.`
    },
    {
      id: "ui",
      title: "UI/UX Block",
      phase: "Compiling Design DNA & Buttons System…",
      systemPrompt: "You are MubixPrompts Lead UI/UX Designer. Synthesize styling guidelines, typography scales, buttons mechanical physics, offset visual cards CSS variables, and layout HSL palettes.",
      userPrompt: `Target Styling Parameters:\n${offlineBlueprint}\n\nGenerate: BLOCK 4 — DESIGN DNA SYSTEM, and BLOCK 5 — RESPONSIVE PHYSICS.`
    },
    {
      id: "database",
      title: "Database Block",
      phase: "Constructing SQL Table Schemas & Triggers…",
      systemPrompt: "You are MubixPrompts Lead Database Architect. Synthesize robust PostgreSQL database schemas, UUID indices, row-level security (RLS) policies, and Zustand client store synchronization.",
      userPrompt: `Target Storage Specs:\n${offlineBlueprint}\n\nGenerate: BLOCK 9 — SQL TABLES, and BLOCK 10 — STATE STORE.`
    },
    {
      id: "api",
      title: "API Block",
      phase: "Designing REST Handlers & Webhook Receivers…",
      systemPrompt: "You are MubixPrompts Systems Engineer. Synthesize secure Next.js REST API route endpoints under /api/, detailing request payload JSON structures and webhook receivers.",
      userPrompt: `Target API Parameters:\n${offlineBlueprint}\n\nGenerate: BLOCK 11 — API ENDPOINT SPEC, and BLOCK 14 — SUBSCRIPTIONS SETUP.`
    },
    {
      id: "seo",
      title: "SEO Block",
      phase: "Optimizing robots.txt, sitemaps & JSON-LD…",
      systemPrompt: "You are MubixPrompts SEO Consultant. Synthesize robots.txt crawling paths, sitemap.xml dynamic routes, person JSON-LD schema blocks, and open-graph meta keywords.",
      userPrompt: `Target SEO Specs:\n${offlineBlueprint}\n\nGenerate: BLOCK 15 — SEO TAGS & STRUCTURED METADATA.`
    },
    {
      id: "security",
      title: "Security Block",
      phase: "Hardening hydration guards & CSP headers…",
      systemPrompt: "You are MubixPrompts Security Auditor. Synthesize XSS sanitization functions, Content Security Policies (CSP) HTTP headers, clickjacking defenses, hydration safeguards, and dynamic checklists.",
      userPrompt: `Target Security Rules:\n${offlineBlueprint}\n\nGenerate: BLOCK 16 — SECURITY, and BLOCK 20 — VALIDATION CHECKLIST.`
    }
  ];

  // Dynamic filter based on compile complexity mode
  let targetChunks: ChunkDefinition[] = [];
  if (generationMode === "fast") {
    // Fast Mode: Only architecture and design DNA blocks
    targetChunks = [allChunks[0], allChunks[1]];
  } else if (generationMode === "pro") {
    // Pro Mode: Standard blocks (Architecture, UI, Database, API)
    targetChunks = [allChunks[0], allChunks[1], allChunks[2], allChunks[3]];
  } else {
    // Ultra Architect Mode: All 6 blocks
    targetChunks = allChunks;
  }

  if (onPhaseChange) {
    onPhaseChange(`Initializing Parallel compiler in [${generationMode.toUpperCase()} MODE]…`);
  }

  // 3. Parallel Chunks Execution using Promise.all
  const blockCompilationPromises = targetChunks.map(async (chunk) => {
    const blockStart = Date.now();
    let retryCount = 0;
    const maxRetries = 3;

    if (onBlockStatusChange) {
      onBlockStatusChange(chunk.id, "generating");
    }

    while (retryCount < maxRetries) {
      try {
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: model,
            systemPrompt: chunk.systemPrompt,
            userPrompt: chunk.userPrompt,
          }),
        });

        if (!response.ok) {
          throw new Error(`Server returned HTTP ${response.status}`);
        }

        const data = await response.json();
        const content = data?.content || "";
        if (!content.trim()) {
          throw new Error("Received empty chunk output.");
        }

        const latency = (Date.now() - blockStart) / 1000;
        if (onBlockStatusChange) {
          onBlockStatusChange(chunk.id, "completed", latency);
        }

        return { id: chunk.id, title: chunk.title, content };

      } catch (err: any) {
        retryCount++;
        console.warn(`[Prompt Engine] Block ${chunk.title} failed (Attempt ${retryCount}/${maxRetries}):`, err.message || err);
        
        if (retryCount >= maxRetries) {
          if (onBlockStatusChange) {
            onBlockStatusChange(chunk.id, "failed");
          }
          throw err; // Escalate failure to fall back to offline compiler cleanly
        }
        
        // Brief timeout before retry attempt
        await new Promise(r => setTimeout(r, 800));
      }
    }
    
    throw new Error(`Block ${chunk.title} generation failed after maximum retries.`);
  });

  try {
    // Resolve all chunk promises concurrently! Speeds up from minutes to under 30 seconds!
    const results = await Promise.all(blockCompilationPromises);
    
    if (onPhaseChange) {
      onPhaseChange("Assembling layout architecture blocks…");
    }

    // Merge in order
    let mergedContent = `# ============================================================\n`;
    mergedContent += `# 🤖 SYNTHESIZED MASTER PROMPT — GENERATION: [${generationMode.toUpperCase()} MODE]\n`;
    mergedContent += `# ACTIVE PARALLEL PIPELINE COMPILATION COMPLETE\n`;
    mergedContent += `# ============================================================\n\n`;

    results.forEach(res => {
      mergedContent += `## ${res.title.toUpperCase()}\n\n${res.content}\n\n---\n\n`;
    });

    mergedContent += `\n> [!SUCCESS]\n> **Dynamic prompt synthesis completed successfully via parallel high-speed pipelines.**`;

    // Save to Cache
    const finalPrompt = mergedContent.trim();
    if (typeof window !== "undefined") {
      window.localStorage.setItem(cacheKey, finalPrompt);
    } else {
      inMemoryCache[cacheKey] = finalPrompt;
    }

    return finalPrompt;

  } catch (err: any) {
    console.error("[Parallel Compiler Critical Failure]: Falling back to offline blueprint template compiler:", err);
    throw err; // Reject promise to let UI activate the local offline compiler cleanly
  }
}
