import { Users } from "lucide-react";

export default function FamilyWorship() {
  return (
    <div className="space-y-6">
      <header>
        <div className="flex items-center gap-3">
          <Users
            size={32}
            className="text-indigo-600"
          />

          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Family Worship
            </h1>

            <p className="text-slate-600 dark:text-slate-400">
              Plan meaningful family worship evenings and keep track of your
              study ideas.
            </p>
          </div>
        </div>
      </header>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Coming Soon
        </h2>

        <p className="mt-3 text-slate-600 dark:text-slate-400">
          This page will help you organize Family Worship with schedules,
          activities, and study plans that encourage meaningful discussions.
        </p>

        <div className="mt-6 space-y-2 text-sm text-slate-600 dark:text-slate-400">
          <p>👨‍👩‍👧‍👦 Worship plans</p>
          <p>📖 Study topics</p>
          <p>🎥 Videos and publications</p>
          <p>🎲 Interactive activities</p>
          <p>📅 Worship history</p>
        </div>
      </div>
    </div>
  );
}