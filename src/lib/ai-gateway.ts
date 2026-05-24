// ============================================================
// MubixPrompts — FreeLLMAPI / OpenAI Compatible Gateway Client
// ============================================================

export interface GeneratePromptOptions {
  systemPrompt: string;
  userPrompt: string;
  model: string;
  apiKey?: string;
  baseUrl?: string;
}

export async function generatePromptWithAI(options: GeneratePromptOptions): Promise<string> {
  const {
    systemPrompt,
    userPrompt,
    model,
    apiKey = "freellmapi-bcf87ce09201828a1702974a95803735452e762527cab376",
    baseUrl = "http://localhost:3001/v1"
  } = options;

  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model || "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 4096
      }),
      // Add shorter timeout to fall back gracefully if FreeLLMAPI is not running locally
      signal: AbortSignal.timeout(6000)
    });

    if (!response.ok) {
      throw new Error(`API Gateway returned status code ${response.status}`);
    }

    const data = await response.json();
    const compiled = data?.choices?.[0]?.message?.content;
    if (!compiled) {
      throw new Error("Empty response body returned from LLM Gateway");
    }
    return compiled;
  } catch (error) {
    console.warn("FreeLLMAPI local gateway unreachable or failed, falling back to local compilation:", error);
    // Throw error so the UI handler can show a friendly warning alert box and render the locally compiled prompt instantly
    throw error;
  }
}
