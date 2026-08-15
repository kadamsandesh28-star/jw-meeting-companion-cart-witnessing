import { useEffect, useState } from "react";

export default function useCountdown(initialSeconds: number) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [running, timeLeft]);

  const start = () => setRunning(true);

  const pause = () => setRunning(false);

  const reset = () => {
    setRunning(false);
    setTimeLeft(initialSeconds);
  };

  return {
    timeLeft,
    running,
    start,
    pause,
    reset,
    setTimeLeft,
  };
}