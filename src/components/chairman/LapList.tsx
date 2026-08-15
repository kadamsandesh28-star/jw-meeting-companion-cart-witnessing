type LapListProps = {
  laps: number[];
};

function formatTime(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds]
    .map((value) => value.toString().padStart(2, "0"))
    .join(":");
}

export default function LapList({ laps }: LapListProps) {
  if (laps.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 p-4 text-center text-slate-500 dark:border-slate-700 dark:text-slate-400">
        No laps recorded.
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-slate-200 dark:border-slate-700">
      <div className="border-b border-slate-200 px-4 py-3 font-semibold dark:border-slate-700">
        Laps
      </div>

      <ul className="max-h-60 overflow-y-auto">
        {laps.map((lap, index) => (
          <li
            key={index}
            className="flex justify-between border-b border-slate-100 px-4 py-2 last:border-b-0 dark:border-slate-800"
          >
            <span>Lap {index + 1}</span>
            <span className="font-mono">{formatTime(lap)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}