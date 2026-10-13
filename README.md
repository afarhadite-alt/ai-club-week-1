# AP Computer Science A Review

A student-focused AP CSA review site built with Next.js, TypeScript, Tailwind CSS, and shadcn-style UI components. Review Java definitions, practice with flashcards and exam-style multiple-choice questions, track study progress, and ask the AI tutor questions about AP Computer Science A.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## AI tutor setup

The tutor uses OpenRouter's `nvidia/nemotron-3.5-lightning:free` model. Create an OpenRouter API key and set it in the environment where the Next.js server runs:

```bash
OPENROUTER_API_KEY=your-openrouter-api-key
```

Restart the development server after setting the key. The key is read only by the server-side API route; do not add it to client-side code or commit it to the repository.

## Student progress

Topic checkoffs, flashcard mastery, quiz attempts, and study-day streaks are saved in the browser's local storage. Progress stays on that browser and is not synced to other devices.
