import { ChevronDown, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";

import type { ReadingEntry } from "../../types/bible";

import ReadingItem from "./ReadingItem";

interface BookAccordionProps {
  title: string;
  readings: ReadingEntry[];
  completedReadings: number[];
  onToggleReading: (id: number) => void;
}

export default function BookAccordion({
  title,
  readings,
  completedReadings,
  onToggleReading,
}: BookAccordionProps) {
  const [expanded, setExpanded] = useState(title === "Genesis");

  const completedCount = useMemo(
    () =>
      readings.filter((reading) =>
        completedReadings.includes(reading.id)
      ).length,
    [completedReadings, readings]
  );

  const percent =
    readings.length === 0
      ? 0
      : Math.round((completedCount / readings.length) * 100);

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700">
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        className="flex w-full items-center justify-between p-4"
      >
        <div className="text-left">
          <h3 className="text-lg font-semibold">{title}</h3>

          <p className="text-sm text-slate-500">
            {completedCount} / {readings.length} completed
          </p>
        </div>

        {expanded ? <ChevronDown /> : <ChevronRight />}
      </button>

      <div className="px-4 pb-4">
        <div className="mb-4 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
          <div
            className="h-full rounded-full bg-indigo-600 transition-all duration-300"
            style={{ width: `${percent}%` }}
          />
        </div>

        {expanded && (
          <div className="space-y-2">
            {readings.map((reading) => (
              <ReadingItem
                key={reading.id}
                reading={reading}
                completed={completedReadings.includes(reading.id)}
                onToggle={onToggleReading}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}