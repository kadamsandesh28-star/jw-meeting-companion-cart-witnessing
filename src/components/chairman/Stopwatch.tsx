import { useEffect, useState } from "react";
import TimerDisplay from "./TimerDisplay";
import TimerControls from "./TimerControls";
import LapList from "./LapList";

interface StopwatchProps {
  title?: string;
}

export default function Stopwatch({
  title = "Chairman Stopwatch",
}: StopwatchProps) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const interval = setInterval(() => {
      setElapsedSeconds((previous) => previous + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStartPause = () => {
    setIsRunning((previous) => !previous);
  };

  const handleReset = () => {
    setIsRunning(false);
    setElapsedSeconds(0);
    setLaps([]);
  };

  const handleLap = () => {
    if (!isRunning) {
      return;
    }

    setLaps((previous) => [...previous, elapsedSeconds]);
  };

  return (
    <div className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        {title}
      </h2>

      <TimerDisplay elapsedSeconds={elapsedSeconds} />

      <TimerControls
        isRunning={isRunning}
        onStartPause={handleStartPause}
        onReset={handleReset}
        onLap={handleLap}
      />

      <LapList laps={laps} />
    </div>
  );
}