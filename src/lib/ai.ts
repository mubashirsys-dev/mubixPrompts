// ============================================================
// MubixPrompts — Smart AI Service Engine
// Complexity-aware chunk compilation
// ============================================================

import { BuilderState } from "@/types/builder";
import { generateMasterPrompt } from "./prompt-engine";

export interface AIRequestOptions {
  model: string;
  builderState: BuilderState;
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

const inMemoryCache: Record<string, string> = {};

export async function generateMasterPromptWithAI(options: AIRequestOptions): Promise<string> {
  const { model, builderState, onPhaseChange, onBlockStatusChange } = options;
  const { complexityTier } = builderState;

  const offlineBlueprint = generateMasterPrompt(builderState);

  // Smart cache key
  const cacheKey = `mubix_v2_${builderState.selectedCategory?.id || "cat"}_${builderState.selectedDesignStyle?.id || "style"}_${complexityTier}_${builderState.selectedFeatures.sort().join("-")}`;

  // Check cache
  const cachedResult = typeof window !== "undefined" ? window.localStorage.getItem(cacheKey) : inMemoryCache[cacheKey];
  if (cachedResult) {
    if (onPhaseChange) onPhaseChange("Loaded from cache!");
    const blockIds = ["arch", "ui", "database", "api", "seo", "security"];
    if (onBlockStatusChange) {
      blockIds.forEach(id => onBlockStatusChange(id, "completed", 0.05));
    }
    return cachedResult;
  }

  // Define chunks based on complexity tier
  const allChunks: ChunkDefinition[] = [
    {
      id: "arch",
      title: "Architecture Block",
      phase: "Building core architecture…",
      systemPrompt: "You are a senior web architect. Generate the project structure, mission, and specifications.",
      userPrompt: `Specifications:\n${offlineBlueprint}\n\nGenerate: Project overview, folder structure, and component architecture.`
    },
    {
      id: "ui",
      title: "UI/UX Block",
      phase: "Compiling design system…",
      systemPrompt: "You are a senior UI/UX designer. Generate the design system, typography, colors, and component styles.",
      userPrompt: `Design specs:\n${offlineBlueprint}\n\nGenerate: Design system, animations, and responsive layout rules.`
    },
    {
      id: "database",
      title: "Database Block",
      phase: "Building database schemas…",
      systemPrompt: "You are a database architect. Generate PostgreSQL schemas with RLS policies.",
      userPrompt: `Database specs:\n${offlineBlueprint}\n\nGenerate: SQL tables, RLS policies, and state management store.`
    },
    {
      id: "api",
      title: "API Block",
      phase: "Designing API endpoints…",
      systemPrompt: "You are a backend engineer. Generate secure API route handlers.",
      userPrompt: `API specs:\n${offlineBlueprint}\n\nGenerate: API endpoints, auth flows, and webhook handlers.`
    },
    {
      id: "seo",
      title: "SEO Block",
      phase: "Optimizing SEO & metadata…",
      systemPrompt: "You are an SEO specialist. Generate metadata, sitemaps, and structured data.",
      userPrompt: `SEO specs:\n${offlineBlueprint}\n\nGenerate: SEO tags, JSON-LD schemas, and sitemap configuration.`
    },
    {
      id: "security",
      title: "Security Block",
      phase: "Applying security protections…",
      systemPrompt: "You are a security engineer. Generate protection measures and security headers.",
      userPrompt: `Security specs:\n${offlineBlueprint}\n\nGenerate: Security headers, input validation, and protection rules.`
    }
  ];

  // Select chunks based on complexity tier
  let targetChunks: ChunkDefinition[];
  switch (complexityTier) {
    case "simple":
      targetChunks = [allChunks[0], allChunks[1]]; // arch + ui only
      break;
    case "standard":
      targetChunks = [allChunks[0], allChunks[1], allChunks[4]]; // arch + ui + seo
      break;
    case "advanced":
      targetChunks = [allChunks[0], allChunks[1], allChunks[2], allChunks[3], allChunks[4]]; // all except security
      break;
    case "enterprise":
    default:
      targetChunks = allChunks; // everything
      break;
  }

  if (onPhaseChange) {
    onPhaseChange(`Compiling [${complexityTier.toUpperCase()}] — ${targetChunks.length} blocks…`);
  }

  // Parallel chunk execution
  const blockPromises = targetChunks.map(async (chunk) => {
    const blockStart = Date.now();
    let retryCount = 0;
    const maxRetries = 3;

    if (onBlockStatusChange) onBlockStatusChange(chunk.id, "generating");

    while (retryCount < maxRetries) {
      try {
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model,
            systemPrompt: chunk.systemPrompt,
            userPrompt: chunk.userPrompt,
          }),
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();
        const content = data?.content || "";
        if (!content.trim()) throw new Error("Empty response");

        const latency = (Date.now() - blockStart) / 1000;
        if (onBlockStatusChange) onBlockStatusChange(chunk.id, "completed", latency);
        return { id: chunk.id, title: chunk.title, content };

      } catch (err: any) {
        retryCount++;
        if (retryCount >= maxRetries) {
          if (onBlockStatusChange) onBlockStatusChange(chunk.id, "failed");
          throw err;
        }
        await new Promise(r => setTimeout(r, 800));
      }
    }
    throw new Error(`Block ${chunk.title} failed after retries.`);
  });

  try {
    const results = await Promise.all(blockPromises);
    if (onPhaseChange) onPhaseChange("Assembling final prompt…");

    let merged = `# ============================================================\n`;
    merged += `# MASTER PROMPT — ${complexityTier.toUpperCase()} MODE\n`;
    merged += `# ============================================================\n\n`;

    results.forEach(res => {
      merged += `## ${res.title.toUpperCase()}\n\n${res.content}\n\n---\n\n`;
    });

    const final = merged.trim();
    if (typeof window !== "undefined") {
      window.localStorage.setItem(cacheKey, final);
    } else {
      inMemoryCache[cacheKey] = final;
    }

    return final;

  } catch (err: any) {
    console.error("[AI Engine] Falling back to offline blueprint:", err);
    throw err;
  }
}
