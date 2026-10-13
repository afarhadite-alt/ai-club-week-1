"use client";

import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Circle, Lightbulb, RotateCcw, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { questions, topics } from "@/lib/content";
import { useProgress } from "@/lib/progress";

export default function PracticePage() {
  const [topicFilter, setTopicFilter] = useState("all");
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const { progress, recordAttempt } = useProgress();
  const quizQuestions = useMemo(() => questions.filter((question) => topicFilter === "all" || question.topicId === topicFilter), [topicFilter]);
  const question = quizQuestions[index];
  const topicName = topics.find((topic) => topic.id === question?.topicId)?.title ?? "";
  const currentScore = progress.attempts.filter((attempt) => attempt.correct).length;

  function changeTopic(value: string) {
    setTopicFilter(value);
    setIndex(0);
    setSelected(null);
    setSubmitted(false);
  }

  function submitAnswer() {
    if (!question || selected === null || submitted) return;
    recordAttempt(question.id, selected === question.answer);
    setSubmitted(true);
  }

  function nextQuestion() {
    setIndex((current) => (current + 1) % quizQuestions.length);
    setSelected(null);
    setSubmitted(false);
  }

  return (
    <div className="mx-auto max-w-[850px] space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div><Badge className="mb-3 bg-[#f8ede4] text-[#a45e35]">EXAM-STYLE PRACTICE</Badge><h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Check your understanding</h2><p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">Choose the best answer, then read the explanation to learn from every question.</p></div>
        <label className="text-sm font-semibold">
          <span className="sr-only">Filter practice by topic</span>
          <select value={topicFilter} onChange={(event) => changeTopic(event.target.value)} className="h-10 min-w-[210px] rounded-xl border border-border bg-white px-3 text-sm font-medium">
            <option value="all">All topics</option>
            {topics.map((topic) => <option key={topic.id} value={topic.id}>{topic.title}</option>)}
          </select>
        </label>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-white px-4 py-3">
        <div className="flex items-center gap-2"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f8ede4] text-[#a45e35]"><Lightbulb size={17} /></span><span className="text-sm font-semibold">Keep a pencil nearby to trace the code.</span></div>
        <span className="text-xs text-muted-foreground">Overall: <strong className="text-foreground">{progress.attempts.length} tried</strong> · <strong className="text-foreground">{currentScore} correct</strong></span>
      </div>

      {question && (
        <Card>
          <CardContent className="p-5 sm:p-7">
            <div className="flex items-center justify-between gap-4"><Badge className="bg-secondary text-secondary-foreground">{topicName}</Badge><span className="text-xs font-semibold text-muted-foreground">Question {index + 1} of {quizQuestions.length}</span></div>
            <h3 className="mt-5 text-lg font-bold leading-7">{question.prompt}</h3>
            {question.code && <pre className="mt-4 overflow-x-auto rounded-xl bg-[#1d3027] p-4 text-[13px] leading-6 text-[#e5f1de]"><code>{question.code}</code></pre>}
            <div className="mt-5 grid gap-2.5">
              {question.choices.map((choice, choiceIndex) => {
                const isAnswer = submitted && choiceIndex === question.answer;
                const isWrong = submitted && selected === choiceIndex && choiceIndex !== question.answer;
                const active = selected === choiceIndex;
                return (
                  <button key={choice} type="button" disabled={submitted} onClick={() => setSelected(choiceIndex)} className={`flex items-start gap-3 rounded-xl border p-3.5 text-left text-sm transition-colors ${isAnswer ? "border-emerald-300 bg-emerald-50 text-emerald-950" : isWrong ? "border-rose-300 bg-rose-50 text-rose-950" : active ? "border-primary bg-secondary/70" : "border-border bg-white hover:bg-muted"} ${submitted ? "cursor-default" : ""}`}>
                    <span className={`mt-0.5 shrink-0 ${isAnswer ? "text-emerald-700" : isWrong ? "text-rose-700" : active ? "text-primary" : "text-muted-foreground"}`}>
                      {isAnswer ? <CheckCircle2 size={17} /> : isWrong ? <XCircle size={17} /> : active ? <CheckCircle2 size={17} /> : <Circle size={17} />}
                    </span>
                    <span className="leading-5">{choice}</span>
                  </button>
                );
              })}
            </div>
            {submitted && <div role="status" className={`mt-4 rounded-xl p-4 ${selected === question.answer ? "bg-emerald-50 text-emerald-950" : "bg-amber-50 text-amber-950"}`}><p className="text-sm font-bold">{selected === question.answer ? "That’s right!" : "Not quite — review this idea."}</p><p className="mt-1.5 text-sm leading-6">{question.explanation}</p></div>}
            <div className="mt-5 flex flex-col-reverse justify-between gap-3 sm:flex-row">
              <Button variant="outline" onClick={() => { setSelected(null); setSubmitted(false); }} disabled={selected === null && !submitted}><RotateCcw size={15} /> Reset answer</Button>
              {submitted ? <Button onClick={nextQuestion}>Next question <ArrowRight size={16} /></Button> : <Button onClick={submitAnswer} disabled={selected === null}>Check answer <CheckCircle2 size={16} /></Button>}
            </div>
          </CardContent>
        </Card>
      )}
      <p className="text-center text-xs text-muted-foreground">Questions are for practice and are not official College Board exam items.</p>
    </div>
  );
}
