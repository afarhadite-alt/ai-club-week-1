"use client";

import { FormEvent, useRef, useState } from "react";
import { Bot, CircleHelp, LoaderCircle, MessageCircleMore, Send, Sparkles, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Message = { role: "user" | "assistant"; content: string };

const suggestions = [
  "Explain integer division in Java",
  "How do I trace a for loop?",
  "What is the difference between == and .equals()?",
];

export default function TutorPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const conversationEnd = useRef<HTMLDivElement>(null);

  async function sendMessage(event?: FormEvent<HTMLFormElement>, suggested?: string) {
    event?.preventDefault();
    const content = (suggested ?? input).trim();
    if (!content || loading || content.length > 3000) return;

    const updatedMessages: Message[] = [...messages, { role: "user", content }];
    setMessages(updatedMessages);
    setInput("");
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages.slice(-12) }),
      });
      const result: unknown = await response.json();
      if (!result || typeof result !== "object" || !("answer" in result || "error" in result)) {
        throw new Error("The tutor returned an unexpected response.");
      }
      if (!response.ok || "error" in result) {
        throw new Error("error" in result && typeof result.error === "string" ? result.error : "The tutor could not answer right now.");
      }
      if (!("answer" in result) || typeof result.answer !== "string") {
        throw new Error("The tutor returned an empty answer.");
      }
      setMessages((current) => [...current, { role: "assistant", content: result.answer }]);
      requestAnimationFrame(() => conversationEnd.current?.scrollIntoView({ behavior: "smooth", block: "end" }));
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "The tutor could not answer right now.");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    void sendMessage(event);
  }

  return (
    <div className="mx-auto max-w-[900px] space-y-6">
      <div><Badge className="mb-3 gap-1.5 bg-[#eeebf7] text-[#655596]"><Sparkles size={13} /> AI-POWERED STUDY HELP</Badge><h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Ask your AP CSA tutor</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">Get a Java concept explained, step through code, or ask for a hint. The tutor is here to support your learning, not replace your own practice.</p></div>

      <Card className="overflow-hidden">
        <div className="flex items-center gap-3 border-b border-border bg-white px-5 py-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8efe4] text-primary"><Bot size={21} /></span>
          <div><h3 className="text-sm font-bold">CSA Study Buddy</h3><p className="text-xs text-muted-foreground">Java & AP Computer Science A</p></div>
          <span className="ml-auto flex items-center gap-1.5 rounded-full bg-[#e8f3e4] px-2.5 py-1 text-[11px] font-semibold text-[#315b3d]"><span className="h-1.5 w-1.5 rounded-full bg-[#579064]" /> Ready to help</span>
        </div>

        <div className="min-h-[340px] space-y-4 bg-[#f8faf7] p-4 sm:min-h-[410px] sm:p-6">
          {messages.length === 0 ? (
            <div className="mx-auto flex max-w-[540px] flex-col items-center py-8 text-center sm:py-12">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8efe4] text-primary"><MessageCircleMore size={25} /></span>
              <h4 className="mt-4 text-lg font-bold">What are you working on?</h4>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Ask a question about Java, AP CSA concepts, or how to approach a problem.</p>
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {suggestions.map((suggestion) => <button key={suggestion} type="button" onClick={() => void sendMessage(undefined, suggestion)} disabled={loading} className="rounded-full border border-border bg-white px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary disabled:opacity-50">{suggestion}</button>)}
              </div>
            </div>
          ) : (
            <>
              {messages.map((message, index) => (
                <div key={`${message.role}-${index}`} className={`flex items-start gap-2.5 ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${message.role === "user" ? "bg-primary text-white" : "bg-[#e8efe4] text-primary"}`}>{message.role === "user" ? <UserRound size={16} /> : <Bot size={16} />}</span>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === "user" ? "rounded-tr-md bg-primary text-white" : "rounded-tl-md border border-border bg-white text-foreground"}`}><p className="whitespace-pre-wrap">{message.content}</p></div>
                </div>
              ))}
              {loading && <div className="flex items-center gap-2.5"><span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#e8efe4] text-primary"><Bot size={16} /></span><div role="status" className="flex items-center gap-2 rounded-2xl rounded-tl-md border border-border bg-white px-4 py-3 text-sm text-muted-foreground"><LoaderCircle size={15} className="animate-spin" /> Thinking through it…</div></div>}
              <div ref={conversationEnd} />
            </>
          )}
        </div>

        <div className="border-t border-border bg-white p-4 sm:p-5">
          {error && <p role="alert" className="mb-3 flex items-start gap-2 rounded-xl bg-rose-50 px-3 py-2.5 text-sm text-rose-800"><CircleHelp size={16} className="mt-0.5 shrink-0" />{error}</p>}
          <form onSubmit={handleSubmit} className="flex items-end gap-2 rounded-xl border border-border bg-white p-2 focus-within:ring-2 focus-within:ring-ring">
            <label htmlFor="tutor-prompt" className="sr-only">Your AP Computer Science A question</label>
            <textarea id="tutor-prompt" value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); void sendMessage(); } }} placeholder="Ask about a Java concept or problem…" maxLength={3000} rows={2} className="max-h-32 min-h-11 flex-1 resize-y border-0 bg-transparent px-2 py-2 text-sm leading-5 outline-none placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0" />
            <Button type="submit" size="icon" aria-label="Send question" disabled={loading || !input.trim()} className="mb-0.5 shrink-0"><Send size={17} /></Button>
          </form>
          <div className="mt-2 flex justify-between gap-3 text-[11px] text-muted-foreground"><span>AI can make mistakes. Check important details with your class materials.</span><span>{input.length}/3000</span></div>
        </div>
      </Card>
    </div>
  );
}
