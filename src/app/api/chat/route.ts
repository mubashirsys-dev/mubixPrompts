import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { model, messages, systemPrompt } = await req.json();

    const apiKey = process.env.OPENAI_API_KEY;
    const baseUrl = process.env.OPENAI_BASE_URL || "http://localhost:3001/v1";

    if (!apiKey) {
      console.error("[Chat API] Missing Server-Side OPENAI_API_KEY environment variable.");
      return NextResponse.json(
        { error: "Server error: Missing OPENAI_API_KEY configuration." },
        { status: 500 }
      );
    }

    const payloadMessages = [
      { role: "system", content: systemPrompt },
      ...messages
    ];

    const requestedModel = (!model || model === "antigravity") ? "auto" : model;

    console.log(`[Chat API] Routing query to: ${baseUrl}/chat/completions`);
    console.log(`[Chat API] Selected model: ${requestedModel}`);

    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: requestedModel,
        messages: payloadMessages,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[Chat API Error] HTTP ${response.status}:`, errorText);
      return NextResponse.json(
        { error: `FreeLLMAPI error: ${errorText}` },
        { status: response.status }
      );
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
