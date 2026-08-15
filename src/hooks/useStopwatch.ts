import { useEffect, useState } from "react";

export default function useStopwatch() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [running]);

  const start = () => setRunning(true);

  const pause = () => setRunning(false);

  const reset = () => {
    setRunning(false);
    setSeconds(0);
  };

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const formattedTime = `${hours
    .toString()
    .padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;

  return {
    seconds,
    running,
    formattedTime,
    start,
    pause,
    reset,
  };
}