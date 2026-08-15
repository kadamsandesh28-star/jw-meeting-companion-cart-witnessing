type TimerControlsProps = {
  isRunning: boolean;
  onStartPause: () => void;
  onReset: () => void;
  onLap: () => void;
};

export default function TimerControls({
  isRunning,
  onStartPause,
  onReset,
  onLap,
}: TimerControlsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <button
        onClick={onStartPause}
        className="rounded-lg bg-indigo-600 px-5 py-2 font-medium text-white transition hover:bg-indigo-700"
      >
        {isRunning ? "Pause" : "Start"}
      </button>

      <button
        onClick={onLap}
        disabled={!isRunning}
        className="rounded-lg bg-amber-500 px-5 py-2 font-medium text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Lap
      </button>

      <button
        onClick={onReset}
        className="rounded-lg bg-red-600 px-5 py-2 font-medium text-white transition hover:bg-red-700"
      >
        Reset
      </button>
    </div>
  );
}