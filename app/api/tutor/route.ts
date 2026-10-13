import { NextResponse } from "next/server";

const MODEL = "nvidia/nemotron-3.5-lightning:free";
const MAX_MESSAGE_LENGTH = 3000;

type ChatMessage = { role: "user" | "assistant"; content: string };

export async function POST(request: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "AI tutor is not configured yet. Add OPENROUTER_API_KEY to your environment and restart the app." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  if (!body || typeof body !== "object" || !("messages" in body) || !Array.isArray(body.messages)) {
    return NextResponse.json({ error: "Provide a messages array to start a tutoring session." }, { status: 400 });
  }

  const messages = body.messages as unknown[];
  if (
    messages.length === 0 ||
    messages.length > 12 ||
    messages.some(
      (message) =>
        !message ||
        typeof message !== "object" ||
        !("role" in message) ||
        !("content" in message) ||
        !["user", "assistant"].includes(String(message.role)) ||
        typeof message.content !== "string" ||
        message.content.trim().length === 0 ||
        message.content.length > MAX_MESSAGE_LENGTH,
    )
  ) {
    return NextResponse.json(
      { error: "Include 1–12 non-empty user or assistant messages, each under 3,000 characters." },
      { status: 400 },
    );
  }

  const chatMessages = messages as ChatMessage[];
  if (chatMessages.at(-1)?.role !== "user") {
    return NextResponse.json({ error: "The last message must be a student question." }, { status: 400 });
  }

  let response: Response;
  try {
    response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
        "X-Title": "AP CSA Review Tutor",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: "system",
            content:
              "You are a patient tutor for the AP Computer Science A exam, which uses Java. Help students understand Java concepts, trace code, debug reasoning, and prepare with practice. Explain clearly at a high-school level, use concise examples, and ask a guiding question when that would help learning. Keep answers focused on AP Computer Science A. Do not claim your responses are official College Board material. If asked something outside the course, briefly redirect to AP CSA.",
          },
          ...chatMessages,
        ],
        temperature: 0.5,
        max_tokens: 700,
      }),
      signal: AbortSignal.timeout(30_000),
    });
  } catch (error) {
    console.error("OpenRouter request failed:", error);
    return NextResponse.json(
      { error: "The AI tutor could not connect right now. Please try again in a moment." },
      { status: 502 },
    );
  }

  if (!response.ok) {
    const details = await response.text();
    console.error(`OpenRouter returned ${response.status}:`, details);
    return NextResponse.json(
      { error: "The AI tutor service returned an error. Please try again shortly." },
      { status: 502 },
    );
  }

  let result: unknown;
  try {
    result = await response.json();
  } catch {
    console.error("OpenRouter returned a non-JSON response.");
    return NextResponse.json({ error: "The AI tutor returned an unreadable response." }, { status: 502 });
  }

  if (
    !result ||
    typeof result !== "object" ||
    !("choices" in result) ||
    !Array.isArray(result.choices) ||
    typeof result.choices[0]?.message?.content !== "string"
  ) {
    console.error("OpenRouter response did not contain a message.");
    return NextResponse.json({ error: "The AI tutor did not return an answer. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ answer: result.choices[0].message.content });
}
