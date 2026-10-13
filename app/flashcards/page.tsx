"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, RotateCcw, Shuffle, Sparkles, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { flashcards, topics } from "@/lib/content";
import { useProgress } from "@/lib/progress";

export default function FlashcardsPage() {
  const [topicFilter, setTopicFilter] = useState("all");
  const [unmasteredOnly, setUnmasteredOnly] = useState(false);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const { progress, rateFlashcard } = useProgress();

  const deck = useMemo(
    () => flashcards.filter((card) => (topicFilter === "all" || card.topicId === topicFilter) && (!unmasteredOnly || !progress.knownFlashcards.includes(card.id))),
    [topicFilter, unmasteredOnly, progress.knownFlashcards],
  );
  const card = deck[index];
  const topicName = topics.find((topic) => topic.id === card?.topicId)?.title ?? "";

  useEffect(() => {
    setIndex(0);
    setFlipped(false);
  }, [topicFilter, unmasteredOnly]);

  function move(amount: number) {
    setIndex((current) => (current + amount + deck.length) % deck.length);
    setFlipped(false);
  }

  function rate(known: boolean) {
    if (!card) return;
    rateFlashcard(card.id, known);
    setFlipped(false);
    if (deck.length > 1) setIndex((current) => (current + 1) % deck.length);
  }

  return (
    <div className="mx-auto max-w-[850px] space-y-6">
      <div><Badge className="mb-3 bg-[#eeebf7] text-[#655596]">ACTIVE RECALL</Badge><h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Flashcards</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Try to recall the answer before flipping. Mark what you know, then spend more time on what you don’t.</p></div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex items-center gap-2 text-sm font-semibold">
          <span className="sr-only">Filter flashcards by topic</span>
          <select value={topicFilter} onChange={(event) => setTopicFilter(event.target.value)} className="h-10 min-w-[210px] rounded-xl border border-border bg-white px-3 text-sm font-medium">
            <option value="all">All topics</option>
            {topics.map((topic) => <option key={topic.id} value={topic.id}>{topic.title}</option>)}
          </select>
        </label>
        <button type="button" onClick={() => setUnmasteredOnly((current) => !current)} aria-pressed={unmasteredOnly} className={`flex h-10 items-center gap-2 self-start rounded-xl border px-3 text-sm font-semibold sm:self-auto ${unmasteredOnly ? "border-primary bg-secondary text-primary" : "border-border bg-white text-muted-foreground"}`}>
          <Shuffle size={15} /> Only cards to review <span className="rounded-full bg-white/80 px-2 py-0.5 text-xs">{flashcards.length - progress.knownFlashcards.length}</span>
        </button>
      </div>

      {card ? (
        <>
          <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground"><span>{topicName}</span><span>Card {index + 1} of {deck.length}</span></div>
          <div className="flashcard-scene">
            <button type="button" aria-label={flipped ? "Flashcard answer; click to see the question" : "Flashcard question; click to reveal the answer"} aria-pressed={flipped} onClick={() => setFlipped((current) => !current)} className="block h-[320px] w-full text-left sm:h-[360px]">
              <div className={`flashcard-inner relative h-full w-full ${flipped ? "is-flipped" : ""}`}>
                <Card className="flashcard-face absolute inset-0 flex items-center justify-center overflow-hidden border-[#dce5da] bg-white p-7 text-center sm:p-12">
                  <span className="absolute left-6 top-6 text-[10px] font-bold uppercase tracking-[.15em] text-muted-foreground">QUESTION</span>
                  <div className="max-w-[600px]"><span className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e7efe3] text-primary"><Sparkles size={22} /></span><p className="text-xl font-bold leading-8 sm:text-2xl">{card.front}</p><p className="mt-6 text-xs text-muted-foreground">Click or tap the card to reveal the answer</p></div>
                </Card>
                <Card className="flashcard-face flashcard-back absolute inset-0 flex items-center justify-center overflow-hidden border-[#dce5da] bg-[#f1f5ee] p-7 text-center sm:p-12">
                  <span className="absolute left-6 top-6 text-[10px] font-bold uppercase tracking-[.15em] text-primary">ANSWER</span>
                  <p className="max-w-[600px] text-lg font-semibold leading-8 text-[#31513b] sm:text-xl">{card.back}</p>
                </Card>
              </div>
            </button>
          </div>
          <div className="flex items-center justify-between gap-3">
            <Button variant="outline" onClick={() => move(-1)}><ArrowLeft size={16} /> Previous</Button>
            <Button variant="ghost" onClick={() => setFlipped(false)} className="hidden sm:inline-flex"><RotateCcw size={15} /> Start over</Button>
            <Button variant="outline" onClick={() => move(1)}>Next <ArrowRight size={16} /></Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Button variant="outline" className="h-12 border-rose-200 text-rose-700 hover:bg-rose-50" onClick={() => rate(false)}><X size={17} /> Need to review</Button>
            <Button className="h-12 bg-[#315b3d] hover:bg-[#284c33]" onClick={() => rate(true)}><Check size={17} /> I know this</Button>
          </div>
          <p className="text-center text-xs text-muted-foreground">{progress.knownFlashcards.length} of {flashcards.length} cards marked as known</p>
        </>
      ) : (
        <Card className="flex min-h-[310px] flex-col items-center justify-center p-8 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e7efe3] text-primary"><Check size={25} /></span>
          <h3 className="mt-4 text-lg font-bold">You’ve reviewed every card in this deck!</h3>
          <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">Switch off “Only cards to review” or choose another topic for another round.</p>
        </Card>
      )}
    </div>
  );
}
