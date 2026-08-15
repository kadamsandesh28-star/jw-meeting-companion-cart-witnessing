export interface AssignmentPreparation {
  scripture: string;
  objective: string;
  notes: string;
  reminder: string;
}

const STORAGE_KEY = "jw-assignment-preparation";

export function loadAssignmentPreparation(): Record<
  string,
  AssignmentPreparation
> {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return {};
  }

  return JSON.parse(saved);
}

export function saveAssignmentPreparation(
  id: string,
  preparation: AssignmentPreparation
) {
  const allPreparation = loadAssignmentPreparation();

  allPreparation[id] = preparation;

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(allPreparation)
  );
}