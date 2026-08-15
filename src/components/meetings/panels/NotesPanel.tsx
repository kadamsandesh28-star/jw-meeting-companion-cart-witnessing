import { useEffect, useMemo, useState } from "react";

interface NotesPanelProps {
  sectionId: string;
}

export default function NotesPanel({ sectionId }: NotesPanelProps) {
  const storageKey = useMemo(() => `jw-notes-${sectionId}`, [sectionId]);

  const [notes, setNotes] = useState(() => {
    return localStorage.getItem(storageKey) ?? "";
  });

  // If the section changes, load its notes.
  useEffect(() => {
    setNotes(localStorage.getItem(storageKey) ?? "");
  }, [storageKey]);

  // Save whenever notes change.
  useEffect(() => {
    localStorage.setItem(storageKey, notes);
  }, [storageKey, notes]);

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
          📝 Meeting Notes
        </h4>

        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Capture important points, scriptures, and reminders while preparing
          for this meeting section.
        </p>
      </div>

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Start typing your notes here..."
        className="h-48 w-full rounded-xl border border-slate-300 bg-white p-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-indigo-800"
      />

      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {notes.length} characters
        </span>

        <span className="text-xs font-medium text-green-600 dark:text-green-400">
          ✓ Auto-saved
        </span>
      </div>
    </div>
  );
}