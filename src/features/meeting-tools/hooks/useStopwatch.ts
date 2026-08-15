import { useCallback, useEffect, useMemo, useState } from "react";

import { StopwatchState } from "../models/StopwatchState";
import { stopwatchService } from "../services/stopwatchService";

export function useStopwatch() {
  const [state, setState] = useState<StopwatchState>(
    () => stopwatchService.load()
  );

  const [now, setNow] = useState(() => Date.now());

  // Keep "now" current while running
  useEffect(() => {
    if (!state.running) {
      return;
    }

    // Immediately refresh when the stopwatch starts
    setNow(Date.now());

    const interval = window.setInterval(() => {
      setNow(Date.now());
    }, 100);

    return () => window.clearInterval(interval);
  }, [state.running]);

  // Persist stopwatch state
  useEffect(() => {
    stopwatchService.save(state);
  }, [state]);

  const elapsed = useMemo(() => {
    if (!state.running || state.startedAt === null) {
      return state.elapsed;
    }

    return (
      state.elapsed +
      (now - state.startedAt)
    );
  }, [
    now,
    state.elapsed,
    state.running,
    state.startedAt,
  ]);

  const start = useCallback(() => {
    setState({
      running: true,
      startedAt: Date.now(),
      elapsed: 0,
      laps: [],
    });
  }, []);

  const pause = useCallback(() => {
    setState((current) => {
      if (
        !current.running ||
        current.startedAt === null
      ) {
        return current;
      }

      return {
        ...current,
        running: false,
        elapsed:
          current.elapsed +
          (Date.now() - current.startedAt),
        startedAt: null,
      };
    });
  }, []);

  const resume = useCallback(() => {
    setState((current) => ({
      ...current,
      running: true,
      startedAt: Date.now(),
    }));
  }, []);

  const reset = useCallback(() => {
    stopwatchService.clear();
    setState(
      stopwatchService.getDefaultState()
    );
    setNow(Date.now());
  }, []);

  const lap = useCallback(() => {
    setState((current) => {
      const lapTime =
        current.running &&
        current.startedAt !== null
          ? current.elapsed +
            (Date.now() -
              current.startedAt)
          : current.elapsed;

      return {
        ...current,
        laps: [
          ...current.laps,
          {
            id: crypto.randomUUID(),
            time: lapTime,
          },
        ],
      };
    });
  }, []);

  return {
    running: state.running,
    elapsed,
    laps: state.laps,
    start,
    pause,
    resume,
    reset,
    lap,
  };
}