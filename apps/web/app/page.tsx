import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 dark:bg-slate-950">
      <div className="flex flex-col items-center gap-8 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 text-2xl font-bold text-white shadow-lg shadow-sky-600/25">
            BC
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            BondCircle
          </h1>
        </div>

        <p className="max-w-md text-lg text-slate-500 dark:text-slate-400">
          Preserving friendships through intelligent memory management.
        </p>

        <div className="flex gap-4">
          <Link
            href="/login"
            className="rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-600/25 transition-all hover:shadow-xl hover:shadow-sky-600/30"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Get Started
          </Link>
        </div>

        <div className="mt-4 grid max-w-md grid-cols-3 gap-4 text-sm text-slate-600 dark:text-slate-400">
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
            <div className="font-semibold text-slate-900 dark:text-white">Next.js 15</div>
            <div>App Router</div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
            <div className="font-semibold text-slate-900 dark:text-white">TypeScript</div>
            <div>Strict Mode</div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
            <div className="font-semibold text-slate-900 dark:text-white">Tailwind</div>
            <div>CSS</div>
          </div>
        </div>
      </div>
    </main>
  );
}
