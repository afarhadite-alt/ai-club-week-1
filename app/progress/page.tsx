"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Brain, CalendarDays, Check, Flame, Layers3, RotateCcw, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { flashcards, questions, topics } from "@/lib/content";
import { currentStreak, useProgress } from "@/lib/progress";

export default function ProgressPage() {
  const { progress, resetProgress } = useProgress();
  const correct = progress.attempts.filter((attempt) => attempt.correct).length;
  const accuracy = progress.attempts.length ? Math.round((correct / progress.attempts.length) * 100) : 0;
  const streak = currentStreak(progress.studiedDates);
  const recentAttempts = [...progress.attempts].reverse().slice(0, 6);
  const questionById = useMemo(() => new Map(questions.map((question) => [question.id, question])), []);

  function confirmReset() {
    if (window.confirm("Reset all AP CSA study progress saved in this browser? This cannot be undone.")) resetProgress();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div><Badge className="mb-3 bg-[#e7efe3] text-primary">YOUR LEARNING, AT A GLANCE</Badge><h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Progress report</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">See what you’ve practiced and choose the next skill to strengthen.</p></div>
        <Button variant="outline" size="sm" onClick={confirmReset}><RotateCcw size={14} /> Reset progress</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <ProgressStat icon={BookOpen} label="Topics reviewed" value={`${progress.completedTopics.length} / ${topics.length}`} progress={topics.length ? (progress.completedTopics.length / topics.length) * 100 : 0} />
        <ProgressStat icon={Layers3} label="Cards mastered" value={`${progress.knownFlashcards.length} / ${flashcards.length}`} progress={flashcards.length ? (progress.knownFlashcards.length / flashcards.length) * 100 : 0} />
        <ProgressStat icon={Target} label="Quiz accuracy" value={`${accuracy}%`} progress={accuracy} />
        <ProgressStat icon={Flame} label="Current streak" value={`${streak} ${streak === 1 ? "day" : "days"}`} progress={Math.min(streak / 7, 1) * 100} />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.1fr_.9fr]">
        <Card>
          <CardContent className="p-5 sm:p-6">
            <div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[.12em] text-muted-foreground">Topic checklist</p><h3 className="mt-1 text-lg font-bold">What you’ve reviewed</h3></div><BookOpen size={19} className="text-primary" /></div>
            <div className="mt-4 divide-y divide-border">
              {topics.map((topic) => {
                const complete = progress.completedTopics.includes(topic.id);
                return <div key={topic.id} className="flex items-center gap-3 py-3"><span className={`flex h-7 w-7 items-center justify-center rounded-lg ${complete ? "bg-[#e6f1e2] text-primary" : "bg-muted text-muted-foreground"}`}>{complete ? <Check size={15} /> : <span className="text-xs font-bold">{topic.title.slice(0, 1)}</span>}</span><span className={`flex-1 text-sm font-medium ${complete ? "text-foreground" : "text-muted-foreground"}`}>{topic.title}</span><span className="text-xs text-muted-foreground">{complete ? "Reviewed" : "Not yet"}</span></div>;
              })}
            </div>
            <Link href="/topics" className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline">Open study guide <ArrowRight size={14} /></Link>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 sm:p-6">
            <div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[.12em] text-muted-foreground">Practice history</p><h3 className="mt-1 text-lg font-bold">Recent answers</h3></div><CalendarDays size={19} className="text-primary" /></div>
            {recentAttempts.length ? (
              <div className="mt-4 divide-y divide-border">
                {recentAttempts.map((attempt, index) => {
                  const question = questionById.get(attempt.questionId);
                  return <div key={`${attempt.questionId}-${progress.attempts.length - index}`} className="flex items-start gap-3 py-3"><span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${attempt.correct ? "bg-[#e6f1e2] text-[#315b3d]" : "bg-rose-50 text-rose-700"}`}>{attempt.correct ? <Check size={14} /> : "×"}</span><div className="min-w-0 flex-1"><p className="line-clamp-2 text-sm font-medium">{question?.prompt ?? "Practice question"}</p><p className="mt-1 text-xs text-muted-foreground">{attempt.date} · {attempt.correct ? "Correct" : "Review this one"}</p></div></div>;
                })}
              </div>
            ) : (
              <div className="py-12 text-center"><Brain size={24} className="mx-auto text-muted-foreground" /><p className="mt-3 text-sm font-semibold">No practice yet</p><p className="mt-1 text-xs text-muted-foreground">Your answers will appear here.</p></div>
            )}
            <Link href="/practice" className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline">Practice more questions <ArrowRight size={14} /></Link>
          </CardContent>
        </Card>
      </div>
      <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground"><Layers3 size={14} /> Your progress stays in this browser’s local storage. It is not shared between devices.</p>
    </div>
  );
}

function ProgressStat({ icon: Icon, label, value, progress }: { icon: typeof BookOpen; label: string; value: string; progress: number }) {
  return (
    <Card><CardContent className="p-4 sm:p-5"><div className="flex items-center justify-between"><span className="text-xs font-semibold text-muted-foreground">{label}</span><Icon size={17} className="text-primary" /></div><p className="mt-3 text-2xl font-bold tracking-tight">{value}</p><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary transition-all" style={{ width: `${Math.max(0, Math.min(100, progress))}%` }} /></div></CardContent></Card>
  );
}
