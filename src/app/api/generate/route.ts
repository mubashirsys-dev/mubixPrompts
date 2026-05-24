import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { model, systemPrompt, userPrompt } = await req.json();

    const apiKey = process.env.OPENAI_API_KEY;
    const baseUrl = process.env.OPENAI_BASE_URL || "http://localhost:3001/v1";

    if (!apiKey) {
      console.error("Missing OPENAI_API_KEY inside server environment configuration.");
      return NextResponse.json(
        { error: "Missing server environment configuration OPENAI_API_KEY." },
        { status: 500 }
      );
    }

    console.log(`[AI Gateway] Routing completions request to: ${baseUrl}/chat/completions`);
    console.log(`[AI Gateway] Target Model: ${model}`);

    const requestedModel = (!model || model === "antigravity") ? "auto" : model;

    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: requestedModel,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[AI Gateway Error] HTTP ${response.status}:`, errorText);
      return NextResponse.json(
        { error: `FreeLLMAPI returned status ${response.status}: ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content || "";

    return NextResponse.json({ content });
  } catch (error: any) {
    console.error("[AI Gateway Critical Exception]:", error);
    return NextResponse.json(
      { error: `Critical gateway exception occurred: ${error.message || error}` },
      { status: 500 }
    );
  }
}
