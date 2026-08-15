import { BookMarked } from "lucide-react";

export default function PersonalStudy() {
  return (
    <div className="space-y-6">
      <header>
        <div className="flex items-center gap-3">
          <BookMarked
            size={32}
            className="text-indigo-600"
          />

          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Personal Study
            </h1>

            <p className="text-slate-600 dark:text-slate-400">
              Deepen your understanding through personal research and study.
            </p>
          </div>
        </div>
      </header>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Coming Soon
        </h2>

        <p className="mt-3 text-slate-600 dark:text-slate-400">
          This page will help you organize your personal study projects and spiritual goals.
        </p>

        <div className="mt-6 space-y-2 text-sm text-slate-600 dark:text-slate-400">
          <p>📚 Study projects</p>
          <p>📝 Research notes</p>
          <p>⭐ Favorite scriptures</p>
          <p>🎯 Study goals</p>
          <p>📈 Study progress</p>
        </div>
      </div>
    </div>
  );
}