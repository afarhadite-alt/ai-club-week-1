"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronRight,
  Flame,
  Layers3,
  Sparkles,
  Target,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { topics, flashcards, questions } from "@/lib/content";
import { currentStreak, useProgress } from "@/lib/progress";

const studyLinks = [
  { href: "/topics", title: "Study guide", description: "Review clear definitions for every AP CSA unit.", icon: BookOpen, tone: "bg-[#e8f0e5] text-[#315b3d]", label: "9 topic units" },
  { href: "/flashcards", title: "Flashcards", description: "Recall key Java ideas, one card at a time.", icon: Layers3, tone: "bg-[#ece9f7] text-[#665598]", label: "16 cards" },
  { href: "/practice", title: "Practice questions", description: "Try AP-style multiple choice with explanations.", icon: Brain, tone: "bg-[#f8ede4] text-[#a45e35]", label: "12 questions" },
];

export default function HomePage() {
  const { progress, hydrated } = useProgress();
  const answered = progress.attempts.length;
  const correct = progress.attempts.filter((attempt) => attempt.correct).length;
  const accuracy = answered ? Math.round((correct / answered) * 100) : 0;
  const streak = currentStreak(progress.studiedDates);
  const nextTopic = topics.find((topic) => !progress.completedTopics.includes(topic.id)) ?? topics[0];

  return (
    <div className="space-y-7">
      <section className="relative overflow-hidden rounded-[26px] bg-[#173a2b] px-6 py-7 text-white sm:px-9 sm:py-9">
        <div className="absolute -right-14 -top-24 h-72 w-72 rounded-full border border-white/10" />
        <div className="absolute -right-2 -top-12 h-48 w-48 rounded-full border border-white/10" />
        <div className="relative max-w-[650px]">
          <Badge className="mb-4 border border-white/15 bg-white/10 text-[#d8edaa]">YOUR AP CSA STUDY SPACE</Badge>
          <h2 className="max-w-[540px] text-3xl font-bold leading-tight tracking-[-.035em] sm:text-[40px]">Small steps. Stronger code. Exam-day confidence.</h2>
          <p className="mt-3 max-w-[500px] text-sm leading-6 text-white/70 sm:text-[15px]">Review Java concepts, test your understanding, and keep track of how far you’ve come.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="bg-[#d8edaa] text-[#203b2a] hover:bg-[#cbe596]">
              <Link href="/practice">Start practicing <ArrowRight size={16} /></Link>
            </Button>
            <Button asChild variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
              <Link href="/topics">Browse study guide <ChevronRight size={16} /></Link>
            </Button>
          </div>
        </div>
        <div className="absolute bottom-8 right-9 hidden h-24 w-24 items-center justify-center rounded-full border border-white/20 bg-white/5 xl:flex">
          <CodeMark />
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Study progress at a glance">
        <StatCard label="Topics reviewed" value={hydrated ? `${progress.completedTopics.length}/${topics.length}` : "—"} detail="Concepts checked off" icon={BookOpen} iconClass="bg-[#e7efe3] text-[#365e3d]" />
        <StatCard label="Cards mastered" value={hydrated ? `${progress.knownFlashcards.length}/${flashcards.length}` : "—"} detail="Recall practice" icon={Layers3} iconClass="bg-[#eeebf7] text-[#6a59a3]" />
        <StatCard label="Quiz accuracy" value={hydrated && answered ? `${accuracy}%` : "—"} detail={hydrated ? `${answered} questions answered` : "Practice to get started"} icon={Target} iconClass="bg-[#f8eee3] text-[#a86437]" />
        <StatCard label="Study streak" value={hydrated ? `${streak} ${streak === 1 ? "day" : "days"}` : "—"} detail="Keep your momentum" icon={Flame} iconClass="bg-[#f8e9e5] text-[#b75c43]" />
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <div><p className="text-xs font-bold uppercase tracking-[.12em] text-muted-foreground">Pick up where you left off</p><h2 className="mt-1 text-xl font-bold tracking-tight">Choose how to study</h2></div>
          <Link href="/progress" className="hidden items-center gap-1 text-sm font-semibold text-primary hover:underline sm:flex">View progress <ArrowRight size={15} /></Link>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {studyLinks.map(({ href, title, description, icon: Icon, tone, label }) => (
            <Link href={href} key={href} className="group">
              <Card className="h-full transition-all group-hover:-translate-y-0.5 group-hover:shadow-md">
                <CardContent className="flex h-full flex-col p-5 sm:p-6">
                  <div className="flex items-start justify-between">
                    <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${tone}`}><Icon size={20} /></span>
                    <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">{label}</span>
                  </div>
                  <h3 className="mt-5 text-base font-bold">{title}</h3>
                  <p className="mt-1.5 flex-1 text-sm leading-6 text-muted-foreground">{description}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary">Open {title.toLowerCase()} <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.35fr_.65fr]">
        <Card>
          <CardContent className="p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div><p className="text-xs font-bold uppercase tracking-[.12em] text-muted-foreground">Recommended next</p><h2 className="mt-1 text-lg font-bold">Keep building your foundations</h2></div>
              <Sparkles size={19} className="mt-1 text-[#8aa94c]" />
            </div>
            <div className="mt-5 flex flex-col gap-4 rounded-xl bg-muted/70 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <span className={`mt-0.5 rounded-lg px-2.5 py-1.5 text-xs font-bold ${nextTopic.color}`}>01</span>
                <div><h3 className="text-sm font-bold">{nextTopic.title}</h3><p className="mt-1 text-xs leading-5 text-muted-foreground">{nextTopic.subtitle} · {nextTopic.definitions.length} key terms</p></div>
              </div>
              <Button asChild size="sm" variant="outline" className="shrink-0">
                <Link href={`/topics#${nextTopic.id}`}>Review topic <ArrowRight size={14} /></Link>
              </Button>
            </div>
            <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground"><CheckCircle2 size={15} className="text-primary" /> Progress is saved automatically on this device.</p>
          </CardContent>
        </Card>
        <Card className="bg-[#e8efe4]">
          <CardContent className="flex h-full flex-col justify-between p-5 sm:p-6">
            <div><Badge className="bg-white text-primary">QUICK TIP</Badge><h2 className="mt-4 text-lg font-bold leading-6">Trace it before you choose.</h2><p className="mt-2 text-sm leading-6 text-[#536459]">For code questions, write down each variable’s value as the program runs. A tiny trace table can catch a big mistake.</p></div>
            <Link href="/practice" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">Try a code question <ArrowRight size={15} /></Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function StatCard({ label, value, detail, icon: Icon, iconClass }: { label: string; value: string; detail: string; icon: typeof BookOpen; iconClass: string }) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-4 sm:p-5">
        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconClass}`}><Icon size={19} /></span>
        <div className="min-w-0"><p className="truncate text-xs font-medium text-muted-foreground">{label}</p><p className="mt-0.5 text-xl font-bold tracking-tight">{value}</p><p className="mt-0.5 truncate text-[11px] text-muted-foreground">{detail}</p></div>
      </CardContent>
    </Card>
  );
}

function CodeMark() {
  return <span aria-hidden="true" className="font-mono text-xl font-bold text-[#d8edaa]">&lt;/&gt;</span>;
}
