import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";
import { ProgressProvider } from "@/lib/progress";
import "./globals.css";

export const metadata: Metadata = {
  title: "AP CSA Review",
  description: "A focused study space for AP Computer Science A: learn Java concepts, review flashcards, and practice exam-style questions.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <ProgressProvider>
          <AppShell>{children}</AppShell>
        </ProgressProvider>
      </body>
    </html>
  );
}
