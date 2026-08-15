import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  NotebookPen,
} from "lucide-react";
import { Link } from "react-router-dom";
import Stopwatch from "../../components/chairman/Stopwatch";
import { canUseChairmanAssistant } from "../../utils/userRole";

export default function MidweekMeeting() {
  const showChairmanAssistant = canUseChairmanAssistant();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          📖 Midweek Meeting
        </h1>

        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Prepare for and conduct the midweek meeting from one place.
        </p>
      </header>

      <div className="space-y-4">
        <Link
          to="/workbook"
          className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
        >
          <div className="flex items-center gap-4">
            <BookOpen className="text-indigo-600" size={24} />
            <div>
              <h2 className="font-semibold text-slate-900 dark:text-white">
                Workbook
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Review this week's meeting workbook.
              </p>
            </div>
          </div>

          <ChevronRight className="text-slate-400" />
        </Link>

        <Link
          to="/assignments"
          className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
        >
          <div className="flex items-center gap-4">
            <ClipboardList className="text-indigo-600" size={24} />
            <div>
              <h2 className="font-semibold text-slate-900 dark:text-white">
                Assignments
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                View and prepare your meeting assignments.
              </p>
            </div>
          </div>

          <ChevronRight className="text-slate-400" />
        </Link>

        <Link
          to="/meetings/notes"
          className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
        >
          <div className="flex items-center gap-4">
            <NotebookPen className="text-indigo-600" size={24} />
            <div>
              <h2 className="font-semibold text-slate-900 dark:text-white">
                Meeting Notes
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Capture and review your meeting notes.
              </p>
            </div>
          </div>

          <ChevronRight className="text-slate-400" />
        </Link>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="text-green-600" size={24} />
            <div>
              <h2 className="font-semibold text-slate-900 dark:text-white">
                Meeting Progress
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Progress tracking will be available soon.
              </p>
            </div>
          </div>
        </div>

        {showChairmanAssistant && <Stopwatch />}
      </div>
    </div>
  );
}