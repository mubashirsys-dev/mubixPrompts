import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.OPENAI_BASE_URL || "http://localhost:3001/v1";
  const start = Date.now();

  try {
    // Ping models endpoint with a short timeout
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 2000);

    const response = await fetch(`${baseUrl}/models`, {
      method: "GET",
      signal: controller.signal,
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY || ""}`
      },
      next: { revalidate: 0 } // Bypass Next.js cache
    });

    clearTimeout(id);
    const latencyMs = Date.now() - start;

    if (!response.ok) {
      throw new Error(`Endpoint returned status ${response.status}`);
    }

    const data = await response.json();
    const modelsCount = Array.isArray(data?.data) ? data.data.length : 0;
    
    // Auto-detect provider metadata
    let providerName = "FreeLLMAPI Router";
    if (data?.data?.[0]?.id) {
      const firstModel = data.data[0].id.toLowerCase();
      if (firstModel.includes("gemini")) providerName = "Google Gemini";
      else if (firstModel.includes("groq")) providerName = "Groq High-Speed";
      else if (firstModel.includes("deepseek")) providerName = "DeepSeek LLM";
      else if (firstModel.includes("gpt")) providerName = "OpenAI Enterprise";
    }

    return NextResponse.json({
      status: "online",
      latencyMs,
      provider: providerName,
      modelsCount,
      endpoint: baseUrl
    });

  } catch (error: any) {
    const latencyMs = Date.now() - start;
    console.warn(`[Health Check] FreeLLMAPI is unreachable at ${baseUrl}:`, error.message || error);
    
    return NextResponse.json({
      status: "offline",
      latencyMs,
      provider: "Offline Fallback Engine",
      error: error.message || "Connection timed out",
      endpoint: baseUrl
    });
  }
}
