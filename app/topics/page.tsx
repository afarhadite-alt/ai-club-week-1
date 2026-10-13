"use client";

import { useMemo, useState } from "react";
import { BookMarked, BookOpen, Check, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { topics } from "@/lib/content";
import { useProgress } from "@/lib/progress";

export default function TopicsPage() {
  const [search, setSearch] = useState("");
  const { progress, markTopicComplete } = useProgress();
  const filteredTopics = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return topics;
    return topics.filter((topic) =>
      [topic.title, topic.subtitle, ...topic.definitions.flatMap(({ term, definition }) => [term, definition])]
        .some((text) => text.toLowerCase().includes(query)),
    );
  }, [search]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div><Badge className="mb-3 bg-[#e7efe3] text-primary">9 UNITS · 45 KEY TERMS</Badge><h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Your AP CSA study guide</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">A quick-reference library of Java concepts, vocabulary, and examples to help you prepare for the exam.</p></div>
        <div className="relative w-full sm:max-w-[270px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search concepts..." aria-label="Search concepts" className="h-10 w-full rounded-xl border border-border bg-white pl-9 pr-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-3 text-sm">
        <BookMarked size={17} className="text-primary" />
        <span><strong>{progress.completedTopics.length} of {topics.length}</strong> topics reviewed</span>
        <span className="ml-auto text-xs text-muted-foreground">Your checklist saves automatically</span>
      </div>

      {filteredTopics.length === 0 ? (
        <Card><CardContent className="py-12 text-center"><Search size={24} className="mx-auto text-muted-foreground" /><p className="mt-3 font-semibold">No concepts found</p><p className="mt-1 text-sm text-muted-foreground">Try another word or search for a Java term.</p></CardContent></Card>
      ) : (
        <div className="grid gap-5">
          {filteredTopics.map((topic, index) => {
            const completed = progress.completedTopics.includes(topic.id);
            return (
              <Card key={topic.id} id={topic.id} className="scroll-mt-24">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="flex items-start gap-3">
                      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${topic.color}`}>{String(index + 1).padStart(2, "0")}</span>
                      <div><div className="flex flex-wrap items-center gap-2"><h3 className="text-lg font-bold">{topic.title}</h3>{completed && <Badge className="gap-1 bg-[#e8f3e4] text-[#315b3d]"><Check size={12} /> Reviewed</Badge>}</div><p className="mt-0.5 text-sm text-muted-foreground">{topic.subtitle}</p></div>
                    </div>
                    <Button size="sm" variant={completed ? "secondary" : "outline"} onClick={() => markTopicComplete(topic.id)}>
                      {completed ? <><Check size={15} /> Reviewed</> : <><BookOpen size={15} /> Mark reviewed</>}
                    </Button>
                  </div>
                  <div className="mt-5 grid gap-3 md:grid-cols-2">
                    {topic.definitions
                      .filter(({ term, definition }) => !search.trim() || `${term} ${definition}`.toLowerCase().includes(search.trim().toLowerCase()) || `${topic.title} ${topic.subtitle}`.toLowerCase().includes(search.trim().toLowerCase()))
                      .map(({ term, definition, example }) => (
                        <article key={term} className="rounded-xl bg-muted/70 p-4">
                          <h4 className="text-sm font-bold text-foreground">{term}</h4>
                          <p className="mt-1.5 text-[13px] leading-5 text-muted-foreground">{definition}</p>
                          {example && <p className="mt-2 rounded-lg bg-white px-3 py-2 font-mono text-xs text-primary">{example}</p>}
                        </article>
                      ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
