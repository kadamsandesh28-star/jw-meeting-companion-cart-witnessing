import { plannerSeed } from "../data/plannerSeed";

export type PlannerStatus =
  | "Not Started"
  | "In Progress"
  | "Ready";

export interface PlannerAssignment {
  id: string;
  title: string;
  meeting: "Midweek" | "Weekend";
  status: PlannerStatus;
}

const STORAGE_KEY = "jw-weekly-planner";

export function loadPlanner(): PlannerAssignment[] {
  const saved = localStorage.getItem(STORAGE_KEY);

  // First run - initialize planner
  if (!saved) {
    const initialPlanner = plannerSeed.map((item) => ({
      ...item,
    }));

    savePlanner(initialPlanner);

    return initialPlanner;
  }

  try {
    const parsed = JSON.parse(saved);

    // Ensure the parsed data is an array
    if (!Array.isArray(parsed)) {
      throw new Error("Planner data is not an array.");
    }

    return parsed as PlannerAssignment[];
  } catch {
    // Corrupt or invalid storage - reset to defaults
    const initialPlanner = plannerSeed.map((item) => ({
      ...item,
    }));

    savePlanner(initialPlanner);

    return initialPlanner;
  }
}

export function savePlanner(
  planner: PlannerAssignment[]
) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(planner)
  );
}

export function resetPlanner() {
  savePlanner(
    plannerSeed.map((item) => ({
      ...item,
    }))
  );
}

export function updatePlannerStatus(
  id: string,
  status: PlannerStatus
) {
  const planner = loadPlanner();

  const updated = planner.map((item) =>
    item.id === id
      ? { ...item, status }
      : item
  );

  savePlanner(updated);
}

export function getMeetingProgress(
  meeting: "Midweek" | "Weekend"
) {
  const planner = loadPlanner();

  const assignments = planner.filter(
    (item) => item.meeting === meeting
  );

  const ready = assignments.filter(
    (item) => item.status === "Ready"
  ).length;

  const total = assignments.length;

  const progress =
    total === 0
      ? 0
      : Math.round((ready / total) * 100);

  return {
    ready,
    total,
    progress,
  };
}

/* -------------------------------- */
/* Dashboard Helpers                */
/* -------------------------------- */

export function getOutstandingAssignments(
  meeting?: "Midweek" | "Weekend"
): PlannerAssignment[] {
  const planner = loadPlanner();

  return planner.filter(
    (item) =>
      item.status !== "Ready" &&
      (!meeting || item.meeting === meeting)
  );
}

export function getOverallProgress() {
  const planner = loadPlanner();

  const ready = planner.filter(
    (item) => item.status === "Ready"
  ).length;

  const total = planner.length;

  return {
    ready,
    total,
    progress:
      total === 0
        ? 0
        : Math.round((ready / total) * 100),
  };
}

export function getNextAssignment():
  | PlannerAssignment
  | null {
  const planner = loadPlanner();

  return (
    planner.find(
      (item) => item.status === "In Progress"
    ) ??
    planner.find(
      (item) => item.status === "Not Started"
    ) ??
    null
  );
}