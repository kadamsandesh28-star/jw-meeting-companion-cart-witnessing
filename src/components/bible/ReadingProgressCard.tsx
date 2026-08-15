import InfoCard from "../ui/InfoCard";

interface ReadingProgressCardProps {
  completedCount: number;
  totalReadings: number;
  percentComplete: number;
  streak: number;
}

export default function ReadingProgressCard({
  completedCount,
  totalReadings,
  percentComplete,
  streak,
}: ReadingProgressCardProps) {
  return (
    <InfoCard title="Overall Progress">
      <div className="space-y-6">
        <div>
          <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
            <div
              className="h-full rounded-full bg-indigo-600 transition-all duration-300"
              style={{ width: `${percentComplete}%` }}
            />
          </div>

          <div className="mt-3 flex justify-between text-sm text-slate-600 dark:text-slate-400">
            <span>
              {completedCount} of {totalReadings} readings completed
            </span>

            <span>{percentComplete}%</span>
          </div>
        </div>

        <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Current Streak
          </p>

          <p className="mt-1 text-3xl font-bold text-indigo-600">
            🔥 {streak}
          </p>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            day{streak === 1 ? "" : "s"}
          </p>
        </div>
      </div>
    </InfoCard>
  );
}