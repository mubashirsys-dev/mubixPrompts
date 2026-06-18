import { NextResponse } from "next/server";

function resolveModel(model?: string): string {
  if (!model || model === "auto") {
    return "google/gemini-2.5-flash";
  }
  
  const mapping: Record<string, string> = {
    chatgpt: "openai/gpt-4o",
    claude: "anthropic/claude-3.5-sonnet",
    gemini: "google/gemini-2.5-pro",
    deepseek: "deepseek/deepseek-chat",
    groq: "meta-llama/llama-3.3-70b-instruct",
    mistral: "mistralai/mistral-large",
    llama: "meta-llama/llama-3.1-405b-instruct"
  };

  const lowerModel = model.toLowerCase();
  if (mapping[lowerModel]) {
    return mapping[lowerModel];
  }

  if (model.includes('/')) {
    return model;
  }

  return "google/gemini-2.5-flash";
}

// GET request handler: local health check for OpenRouter connection status
export async function GET() {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        status: "error",
        error: "Configuration Error",
        details: "OPENROUTER_API_KEY is missing from server environment."
      }, { status: 500 });
    }

    const response = await fetch("https://openrouter.ai/api/v1/auth/key", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${apiKey}`
      }
    });

    if (response.status === 200) {
      const keyDetails = await response.json();
      return NextResponse.json({
        status: "online",
        message: "AI Connected",
        limit: keyDetails?.data?.limit || null,
        usage: keyDetails?.data?.usage || null
      });
    }

    return NextResponse.json({
      status: "error",
      error: "API Error",
      details: `OpenRouter returned HTTP status ${response.status}.`
    }, { status: 401 });

  } catch (error: any) {
    return NextResponse.json({
      status: "error",
      error: "Network Failure",
      details: error.message || "Failed to contact OpenRouter API."
    }, { status: 502 });
  }
}

// POST request handler: local Chat completions proxy
export async function POST(req: Request) {
  try {
    const { model, messages, systemPrompt } = await req.json();

    const openRouterKey = process.env.OPENROUTER_API_KEY;
    const fallbackApiKey = process.env.OPENAI_API_KEY;
    const fallbackBaseUrl = process.env.OPENAI_BASE_URL || "http://localhost:3001/v1";

    const payloadMessages = [];
    if (systemPrompt) {
      payloadMessages.push({ role: "system", content: systemPrompt });
    }
    if (messages && Array.isArray(messages)) {
      payloadMessages.push(...messages);
    }

    // If using OpenRouter
    if (openRouterKey) {
      const resolvedModel = resolveModel(model);
      
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${openRouterKey}`,
          "HTTP-Referer": "https://mubixprompts.com",
          "X-Title": "Mubix Prompts"
        },
        body: JSON.stringify({
          model: resolvedModel,
          messages: payloadMessages,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        return NextResponse.json({ error: `OpenRouter error: ${errText}` }, { status: response.status });
      }

      const data = await response.json();
      const content = data?.choices?.[0]?.message?.content || "";
      return NextResponse.json({ content, model: resolvedModel });
    }

    // Local FreeLLMAPI fallback
    if (!fallbackApiKey) {
      return NextResponse.json({ error: "Missing server environment API configuration." }, { status: 500 });
    }

    const requestedModel = (!model || model === "antigravity") ? "auto" : model;

    const response = await fetch(`${fallbackBaseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${fallbackApiKey}`
      },
      body: JSON.stringify({
        model: requestedModel,
        messages: payloadMessages,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: `FreeLLMAPI error: ${errorText}` }, { status: response.status });
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content || "";
    return NextResponse.json({ content });

  } catch (error: any) {
    console.error("[Chat API Critical Exception]:", error);
    return NextResponse.json(
      { error: `Critical chat gateway failure: ${error.message || error}` },
      { status: 500 }
    );
  }
}
