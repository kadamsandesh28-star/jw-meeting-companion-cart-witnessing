import { CheckSquare } from "lucide-react";

export default function PersonalTasks() {
  return (
    <div className="space-y-6">
      <header>
        <div className="flex items-center gap-3">
          <CheckSquare
            size={32}
            className="text-indigo-600"
          />

          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Personal Tasks
            </h1>

            <p className="text-slate-600 dark:text-slate-400">
              Stay organized with personal reminders, goals, and spiritual
              tasks.
            </p>
          </div>
        </div>
      </header>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Coming Soon
        </h2>

        <p className="mt-3 text-slate-600 dark:text-slate-400">
          This page will help you manage personal tasks, reminders, and goals,
          keeping everything organized in one place.
        </p>

        <div className="mt-6 space-y-2 text-sm text-slate-600 dark:text-slate-400">
          <p>✅ Personal to-do list</p>
          <p>📅 Upcoming reminders</p>
          <p>🎯 Spiritual goals</p>
          <p>⭐ Priority tasks</p>
          <p>📈 Progress tracking</p>
        </div>
      </div>
    </div>
  );
}