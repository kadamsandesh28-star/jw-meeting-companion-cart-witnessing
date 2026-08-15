import { ReturnVisit } from "../types/returnVisit";

const STORAGE_KEY = "jw-return-visits";

function save(returnVisits: ReturnVisit[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(returnVisits));
}

export function getReturnVisits(): ReturnVisit[] {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    return [];
  }

  try {
    return JSON.parse(data) as ReturnVisit[];
  } catch {
    return [];
  }
}

export function getReturnVisitById(
  id: string
): ReturnVisit | undefined {
  return getReturnVisits().find(
    (visit) => visit.id === id
  );
}

export function addReturnVisit(
  returnVisit: ReturnVisit
): void {
  const visits = getReturnVisits();

  visits.push(returnVisit);

  save(visits);
}

export function updateReturnVisit(
  updatedVisit: ReturnVisit
): void {
  const visits = getReturnVisits();

  const updated = visits.map((visit) =>
    visit.id === updatedVisit.id
      ? updatedVisit
      : visit
  );

  save(updated);
}

export function deleteReturnVisit(
  id: string
): void {
  const visits = getReturnVisits().filter(
    (visit) => visit.id !== id
  );

  save(visits);
}

export function searchReturnVisits(
  searchTerm: string
): ReturnVisit[] {
  const term = searchTerm.toLowerCase();

  return getReturnVisits().filter(
    (visit) =>
      visit.name.toLowerCase().includes(term) ||
      visit.address.toLowerCase().includes(term) ||
      visit.phone?.toLowerCase().includes(term) ||
      visit.notes.toLowerCase().includes(term)
  );
}

export function getReturnVisitStatistics() {
  const visits = getReturnVisits();

  const today = new Date();

  return {
    total: visits.length,

    pending: visits.filter(
      (v) => v.status === "Pending"
    ).length,

    completed: visits.filter(
      (v) => v.status === "Completed"
    ).length,

    notHome: visits.filter(
      (v) => v.status === "Not Home"
    ).length,

    movedAway: visits.filter(
      (v) => v.status === "Moved Away"
    ).length,

    overdue: visits.filter(
      (v) =>
        v.status === "Pending" &&
        new Date(v.nextVisit) < today
    ).length,
  };
}