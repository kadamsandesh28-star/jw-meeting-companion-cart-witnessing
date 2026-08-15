import { useEffect, useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

import { loadSettings } from "../../services/settingsService";

const NOTES_KEY =
  "jwMeetingCompanion.workbookNotes";

const CHECKLIST_KEY =
  "jwMeetingCompanion.workbookChecklist";

type Checklist = {
  readMaterial: boolean;
  watchVideos: boolean;
  prepareAssignments: boolean;
};

const defaultChecklist: Checklist = {
  readMaterial: false,
  watchVideos: false,
  prepareAssignments: false,
};

export default function Workbook() {
  const [workbookTitle, setWorkbookTitle] =
    useState("Meeting Workbook");

  const [workbookUrl, setWorkbookUrl] =
    useState("");

  const [notes, setNotes] = useState("");

  const [checklist, setChecklist] =
    useState<Checklist>(defaultChecklist);

  useEffect(() => {
    const settings = loadSettings();

    setWorkbookTitle(
      settings.resources.workbookTitle
    );

    setWorkbookUrl(
      settings.resources.workbookUrl
    );

    const savedNotes =
      localStorage.getItem(NOTES_KEY);

    if (savedNotes) {
      setNotes(savedNotes);
    }

    const savedChecklist =
      localStorage.getItem(CHECKLIST_KEY);

    if (savedChecklist) {
      setChecklist(
        JSON.parse(savedChecklist)
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      NOTES_KEY,
      notes
    );
  }, [notes]);

  useEffect(() => {
    localStorage.setItem(
      CHECKLIST_KEY,
      JSON.stringify(checklist)
    );
  }, [checklist]);

  function toggleChecklist(
    key: keyof Checklist
  ) {
    setChecklist((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          📖 Workbook
        </h1>

        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Prepare for your midweek meeting with
          study notes and a preparation
          checklist.
        </p>
      </header>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div className="flex items-center gap-3">
          <BookOpen
            className="text-indigo-600"
            size={24}
          />

          <div>
            <h2 className="font-semibold text-slate-900 dark:text-white">
              {workbookTitle}
            </h2>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Open the latest meeting workbook.
            </p>
          </div>
        </div>

        {workbookUrl ? (
          <a
            href={workbookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-700"
          >
            <ExternalLink size={18} />
            Open Workbook
          </a>
        ) : (
          <p className="mt-5 text-sm text-red-600 dark:text-red-400">
            No workbook link has been
            configured in Settings.
          </p>
        )}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">
          📝 Preparation Notes
        </h2>

        <textarea
          value={notes}
          onChange={(e) =>
            setNotes(e.target.value)
          }
          placeholder="Write your preparation notes here..."
          className="min-h-[300px] w-full rounded-lg border border-slate-300 p-4 outline-none focus:border-indigo-500 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
        />
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">
          ✅ Preparation Checklist
        </h2>

        <div className="space-y-3">
          {[
            [
              "readMaterial",
              "Read the workbook material",
            ],
            [
              "watchVideos",
              "Watch assigned videos",
            ],
            [
              "prepareAssignments",
              "Prepare meeting assignments",
            ],
          ].map(([key, label]) => (
            <label
              key={key}
              className="flex cursor-pointer items-center gap-3"
            >
              <input
                type="checkbox"
                checked={
                  checklist[
                    key as keyof Checklist
                  ]
                }
                onChange={() =>
                  toggleChecklist(
                    key as keyof Checklist
                  )
                }
              />

              <span className="flex items-center gap-2">
                <CheckCircle2
                  size={18}
                  className="text-green-600"
                />
                {label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}