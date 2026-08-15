import { useEffect, useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  NotebookPen,
  Mic2,
} from "lucide-react";
import { Link } from "react-router-dom";

import Stopwatch from "../../components/chairman/Stopwatch";
import { canUseChairmanAssistant } from "../../utils/userRole";
import { loadSettings } from "../../services/settingsService";

export default function WeekendMeeting() {
  const showChairmanAssistant = canUseChairmanAssistant();

  const [watchtowerTitle, setWatchtowerTitle] =
    useState("Watchtower Study");

  const [watchtowerUrl, setWatchtowerUrl] =
    useState("");

  useEffect(() => {
    const settings = loadSettings();

    setWatchtowerTitle(
      settings.resources.watchtowerTitle
    );

    setWatchtowerUrl(
  
        settings.resources.watchtowerUrl
    );
  }, []);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          🎤 Weekend Meeting
        </h1>

        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Prepare for and participate in the weekend meeting.
        </p>
      </header>

      <div className="space-y-4">
        {/* Public Talk */}

        <Link
          to="/meetings/notes"
          className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
        >
          <div className="flex items-center gap-4">
            <Mic2
              className="text-indigo-600"
              size={24}
            />

            <div>
              <h2 className="font-semibold text-slate-900 dark:text-white">
                Public Talk
              </h2>

              <p className="text-sm text-slate-600 dark:text-slate-400">
                Prepare and review Public Talk notes.
              </p>
            </div>
          </div>

          <ChevronRight className="text-slate-400" />
        </Link>

        {/* Watchtower Study */}

        {watchtowerUrl ? (
          <a
            href={watchtowerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
          >
            <div className="flex items-center gap-4">
              <BookOpen
                className="text-indigo-600"
                size={24}
              />

              <div>
                <h2 className="font-semibold text-slate-900 dark:text-white">
                  {watchtowerTitle}
                </h2>

                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Open this week's Watchtower Study.
                </p>
              </div>
            </div>

            <ChevronRight className="text-slate-400" />
          </a>
        ) : (
          <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <div className="flex items-center gap-4">
              <BookOpen
                className="text-indigo-600"
                size={24}
              />

              <div>
                <h2 className="font-semibold text-slate-900 dark:text-white">
                  {watchtowerTitle}
                </h2>

                <p className="text-sm text-red-600 dark:text-red-400">
                  No Watchtower link has been configured in
                  Settings.
                </p>
              </div>
            </div>

            <ChevronRight className="text-slate-400" />
          </div>
        )}

        {/* Weekend Notes */}

        <Link
          to="/meetings/notes"
          className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
        >
          <div className="flex items-center gap-4">
            <NotebookPen
              className="text-indigo-600"
              size={24}
            />

            <div>
              <h2 className="font-semibold text-slate-900 dark:text-white">
                Weekend Notes
              </h2>

              <p className="text-sm text-slate-600 dark:text-slate-400">
                Capture and review your meeting notes.
              </p>
            </div>
          </div>

          <ChevronRight className="text-slate-400" />
        </Link>

        {/* Progress */}

        <Link
          to="/meetings/progress"
          className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
        >
          <div className="flex items-center gap-4">
            <CheckCircle2
              className="text-green-600"
              size={24}
            />

            <div>
              <h2 className="font-semibold text-slate-900 dark:text-white">
                Meeting Progress
              </h2>

              <p className="text-sm text-slate-600 dark:text-slate-400">
                View your meeting preparation progress.
              </p>
            </div>
          </div>

          <ChevronRight className="text-slate-400" />
        </Link>

        {showChairmanAssistant && <Stopwatch />}
      </div>
    </div>
  );
}