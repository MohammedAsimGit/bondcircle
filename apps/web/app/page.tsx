export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6 dark:bg-neutral-950">
      <div className="flex flex-col items-center gap-8 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-600 text-2xl font-bold text-white shadow-lg shadow-brand-600/25">
            BC
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-neutral-900 dark:text-white">
            BondCircle
          </h1>
        </div>

        <div className="flex flex-col items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700 ring-1 ring-inset ring-brand-700/10 dark:bg-brand-950 dark:text-brand-300 dark:ring-brand-700/30">
            Sprint 02
          </span>
          <p className="mt-1 text-lg text-neutral-500 dark:text-neutral-400">
            Development Environment Ready
          </p>
        </div>

        <div className="mt-4 grid max-w-md grid-cols-3 gap-4 text-sm text-neutral-600 dark:text-neutral-400">
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="font-semibold text-neutral-900 dark:text-white">Next.js</div>
            <div>App Router</div>
          </div>
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="font-semibold text-neutral-900 dark:text-white">TypeScript</div>
            <div>Strict Mode</div>
          </div>
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="font-semibold text-neutral-900 dark:text-white">Tailwind</div>
            <div>CSS</div>
          </div>
        </div>

        <p className="mt-6 max-w-sm text-xs text-neutral-400 dark:text-neutral-500">
          Relationship Memory Platform — Preserving friendships through
          intelligent memory management.
        </p>
      </div>
    </main>
  );
}
