import { StopwatchLap } from "./StopwatchLap";

export interface StopwatchState {
  running: boolean;
  startedAt: number | null;
  elapsed: number;
  laps: StopwatchLap[];
}