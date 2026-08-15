import { Check } from "lucide-react";

import type { ReadingEntry } from "../../types/bible";

interface ReadingItemProps {
  reading: ReadingEntry;
  completed: boolean;
  onToggle: (readingId: number) => void;
}

export default function ReadingItem({
  reading,
  completed,
  onToggle,
}: ReadingItemProps) {
  return (
    <button
      type="button"
      onClick={() => onToggle(reading.id)}
      className={`flex w-full items-center justify-between rounded-lg border p-3 transition ${
        completed
          ? "border-green-300 bg-green-50 dark:border-green-700 dark:bg-green-950/30"
          : "border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
      }`}
    >
      <div className="text-left">
        <p
          className={`font-medium ${
            completed
              ? "text-green-700 dark:text-green-300"
              : "text-slate-900 dark:text-white"
          }`}
        >
          Chapters {reading.startChapter}–{reading.endChapter}
        </p>

        {reading.title && (
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {reading.title}
          </p>
        )}
      </div>

      <div
        className={`flex h-7 w-7 items-center justify-center rounded-md border transition ${
          completed
            ? "border-green-600 bg-green-600 text-white"
            : "border-slate-400 dark:border-slate-500"
        }`}
      >
        {completed && <Check size={16} />}
      </div>
    </button>
  );
}