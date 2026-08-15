import { StopwatchState } from "../models/StopwatchState";

const STORAGE_KEY = "jwmc-stopwatch";

const defaultState: StopwatchState = {
  running: false,
  startedAt: null,
  elapsed: 0,
  laps: [],
};

export const stopwatchService = {
  load(): StopwatchState {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (!stored) {
        return defaultState;
      }

      return JSON.parse(stored) as StopwatchState;
    } catch {
      return defaultState;
    }
  },

  save(state: StopwatchState): void {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(state)
    );
  },

  clear(): void {
    localStorage.removeItem(STORAGE_KEY);
  },

  getDefaultState(): StopwatchState {
    return {
      ...defaultState,
      laps: [],
    };
  },
};