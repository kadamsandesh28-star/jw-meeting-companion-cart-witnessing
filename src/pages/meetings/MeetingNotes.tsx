import { useEffect, useState } from "react";
import { Trash2, Save } from "lucide-react";

const STORAGE_KEY = "jwMeetingCompanion.meetingNotes";

export default function MeetingNotes() {
  const [notes, setNotes] = useState("");
  const [lastSaved, setLastSaved] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      setNotes(saved);
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, notes);

      if (notes.trim() !== "") {
        setLastSaved(new Date().toLocaleString());
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [notes]);

  const clearNotes = () => {
    if (!confirm("Clear all meeting notes?")) {
      return;
    }

    localStorage.removeItem(STORAGE_KEY);
    setNotes("");
    setLastSaved("");
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          📝 Meeting Notes
        </h1>

        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Capture important points during meetings. Notes are automatically
          saved on this device.
        </p>
      </header>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Start typing your meeting notes..."
          className="min-h-[450px] w-full resize-y rounded-lg border border-slate-300 bg-white p-4 text-slate-900 outline-none focus:border-indigo-500 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
        />

        <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <Save size={18} />

            {lastSaved ? (
              <span>Last saved: {lastSaved}</span>
            ) : (
              <span>Autosave enabled</span>
            )}
          </div>

          <button
            onClick={clearNotes}
            className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
          >
            <Trash2 size={18} />
            Clear Notes
          </button>
        </div>
      </div>
    </div>
  );
}