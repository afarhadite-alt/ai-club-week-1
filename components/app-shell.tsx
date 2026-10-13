"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Brain,
  ChartNoAxesColumnIncreasing,
  CircleHelp,
  Code2,
  GraduationCap,
  House,
  MessageCircleMore,
  Layers3,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/components/lib/utils";
import { useProgress } from "@/lib/progress";

const navigation = [
  { href: "/", label: "Overview", icon: House },
  { href: "/topics", label: "Study guide", icon: BookOpen },
  { href: "/flashcards", label: "Flashcards", icon: Layers3 },
  { href: "/practice", label: "Practice", icon: Brain },
  { href: "/tutor", label: "AI tutor", icon: MessageCircleMore },
  { href: "/progress", label: "My progress", icon: ChartNoAxesColumnIncreasing },
];

const pageTitles: Record<string, string> = {
  "/": "Overview",
  "/topics": "Study guide",
  "/flashcards": "Flashcards",
  "/practice": "Practice",
  "/tutor": "AI tutor",
  "/progress": "My progress",
};

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { storageError } = useProgress();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[248px] flex-col border-r border-border bg-white px-5 py-6 lg:flex">
        <Link href="/" className="mb-10 flex items-center gap-3 px-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white"><Code2 size={21} /></span>
          <span><strong className="block text-[15px] leading-5">AP CSA</strong><span className="text-xs text-muted-foreground">Exam review</span></span>
        </Link>
        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[.16em] text-muted-foreground">Your workspace</p>
        <nav className="grid gap-1">
          {navigation.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-colors",
                  active ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <Icon size={17} strokeWidth={1.8} />{label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto rounded-2xl bg-[#f4f6f2] p-4">
          <div className="mb-2 flex items-center gap-2 text-primary"><CircleHelp size={17} /><span className="text-xs font-bold">Your AP exam toolkit</span></div>
          <p className="text-xs leading-5 text-muted-foreground">Short review sessions add up. Keep practicing a little every day.</p>
        </div>
      </aside>
      {menuOpen && <button aria-label="Close navigation menu" className="fixed inset-0 z-30 bg-slate-950/30 lg:hidden" onClick={() => setMenuOpen(false)} />}
      <aside className={cn("fixed inset-y-0 left-0 z-40 flex w-[270px] flex-col border-r border-border bg-white px-5 py-6 transition-transform lg:hidden", menuOpen ? "translate-x-0" : "-translate-x-full")}>
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white"><Code2 size={21} /></span>
            <span><strong className="block text-[15px] leading-5">AP CSA</strong><span className="text-xs text-muted-foreground">Exam review</span></span>
          </Link>
          <button className="rounded-lg p-2 text-muted-foreground" aria-label="Close menu" onClick={() => setMenuOpen(false)}><X size={19} /></button>
        </div>
        <nav className="grid gap-1">
          {navigation.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} onClick={() => setMenuOpen(false)} className={cn("flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium", pathname === href ? "bg-primary text-white" : "text-muted-foreground hover:bg-muted")}>
              <Icon size={17} />{label}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="lg:pl-[248px]">
        <header className="sticky top-0 z-20 flex h-[68px] items-center justify-between border-b border-border bg-white/90 px-5 backdrop-blur-md sm:px-8">
          <div className="flex items-center gap-3">
            <button className="rounded-lg p-2 text-muted-foreground hover:bg-muted lg:hidden" aria-label="Open menu" onClick={() => setMenuOpen(true)}><Menu size={20} /></button>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.14em] text-muted-foreground">AP Computer Science A</p>
              <h1 className="text-sm font-bold">{pageTitles[pathname] ?? "Study session"}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground">
            <GraduationCap size={16} /> Exam prep
          </div>
        </header>
        <main className="mx-auto max-w-[1280px] px-5 pb-14 pt-7 sm:px-8 lg:px-10">
          {storageError && (
            <div role="alert" className="mb-5 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-950">
              {storageError} Your work will remain available until you leave this page.
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}
