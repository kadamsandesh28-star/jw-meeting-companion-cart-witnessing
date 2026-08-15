import { HeartHandshake } from "lucide-react";

export default function PrayerJournal() {
  return (
    <div className="space-y-6">
      <header>
        <div className="flex items-center gap-3">
          <HeartHandshake
            size={32}
            className="text-indigo-600"
          />

          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Prayer Journal
            </h1>

            <p className="text-slate-600 dark:text-slate-400">
              Keep a personal record of your prayers, blessings, and spiritual reflections.
            </p>
          </div>
        </div>
      </header>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Coming Soon
        </h2>

        <p className="mt-3 text-slate-600 dark:text-slate-400">
          This page will help you keep a private journal of your prayers and
          reflect on how Jehovah has answered them over time.
        </p>

        <div className="mt-6 space-y-2 text-sm text-slate-600 dark:text-slate-400">
          <p>🙏 Prayer journal entries</p>
          <p>❤️ Blessings received</p>
          <p>📝 Spiritual reflections</p>
          <p>📅 Prayer history</p>
          <p>⭐ Personal encouragements</p>
        </div>
      </div>
    </div>
  );
}