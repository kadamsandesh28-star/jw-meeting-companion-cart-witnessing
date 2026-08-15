import { BookOpen, CheckCircle2 } from "lucide-react";
import InfoCard from "../ui/InfoCard";
import { ReadingEntry } from "../../types/bible";

interface TodayReadingCardProps {
  reading: ReadingEntry;
  completedToday: boolean;
  onComplete: () => void;
}

export default function TodayReadingCard({
  reading,
  completedToday,
  onComplete,
}: TodayReadingCardProps) {
  return (
    <InfoCard title="Today's Reading">
      <div className="space-y-5">
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-indigo-100 p-3 dark:bg-indigo-900/40">
            <BookOpen className="text-indigo-600" size={24} />
          </div>

          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {reading.section}
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {reading.book}
            </h2>

            <p className="mt-1 text-lg text-slate-600 dark:text-slate-300">
              Chapters {reading.startChapter}–{reading.endChapter}
            </p>
          </div>
        </div>

        <button
          onClick={onComplete}
          disabled={completedToday}
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-green-600"
        >
          <CheckCircle2 size={18} />

          {completedToday
            ? "Completed Today"
            : "Mark Today's Reading Complete"}
        </button>
      </div>
    </InfoCard>
  );
}