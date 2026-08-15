export interface MonthlyReport {
  month: string;

  participated: boolean;

  auxiliaryPioneer: boolean;

  bibleStudies: number;

  remarks?: string;
}

export interface Publisher {
  id: string;

  /* ===========================
     Personal Information
     =========================== */

  firstName: string;
  lastName: string;

  phone: string;
  email: string;

  address?: string;

  dateOfBirth?: string;

  dateOfBaptism?: string;

  /* ===========================
     Congregation Information
     =========================== */

  serviceGroup: string;

  baptized: boolean;

  hope?: "Other Sheep" | "Anointed";

  privileges: string;

  /* ===========================
     Ministry
     =========================== */

  participatedThisMonth?: boolean;

  auxiliaryPioneerThisMonth?: boolean;

  bibleStudiesThisMonth?: number;

  /**
   * Future ministry history.
   * These records will eventually replace the
   * "This Month" fields above.
   */
  monthlyReports?: MonthlyReport[];

  /* ===========================
     Notes
     =========================== */

  /**
   * General notes about the publisher.
   */
  generalNotes?: string;

  /**
   * Shepherding-specific notes.
   */
  shepherdingNotes?: string;

  /**
   * Legacy field kept temporarily so existing
   * localStorage data continues to work.
   * We can remove this after migrating data.
   */
  notes?: string;
}

export interface FieldServiceGroup {
  id: string;

  name: string;

  overseerId: string;

  assistantId: string;

  publisherIds: string[];
}

export interface Department {
  id: string;

  name: string;

  coordinatorId: string;

  assistantId: string;

  memberIds: string[];

  notes: string;
}

export interface ShepherdingRecord {
  id: string;

  publisherId: string;

  elderId: string;

  lastVisit: string;

  nextVisit: string;

  notes: string;
}

const PUBLISHER_KEY = "jw-publishers";
const GROUP_KEY = "jw-field-service-groups";
const DEPARTMENT_KEY = "jw-departments";
const SHEPHERDING_KEY = "jw-shepherding";

/* ---------------- Publishers ---------------- */

export function loadPublishers(): Publisher[] {
  const publishers: Publisher[] = JSON.parse(
    localStorage.getItem(PUBLISHER_KEY) || "[]"
  );

  // Backwards compatibility for existing data
  return publishers.map((publisher) => ({
    monthlyReports: [],
    generalNotes: publisher.generalNotes ?? publisher.notes ?? "",
    shepherdingNotes:
      publisher.shepherdingNotes ?? "",
    ...publisher,
  }));
}

export function savePublishers(data: Publisher[]) {
  localStorage.setItem(
    PUBLISHER_KEY,
    JSON.stringify(data)
  );
}

export function getPublisherName(id: string) {
  const publisher = loadPublishers().find(
    (p) => p.id === id
  );

  if (!publisher) return "";

  return `${publisher.firstName} ${publisher.lastName}`.trim();
}

/* ---------------- Groups ---------------- */

export function loadGroups(): FieldServiceGroup[] {
  return JSON.parse(
    localStorage.getItem(GROUP_KEY) || "[]"
  );
}

export function saveGroups(data: FieldServiceGroup[]) {
  localStorage.setItem(
    GROUP_KEY,
    JSON.stringify(data)
  );
}

/* ---------------- Departments ---------------- */

export function loadDepartments(): Department[] {
  return JSON.parse(
    localStorage.getItem(DEPARTMENT_KEY) || "[]"
  );
}

export function saveDepartments(data: Department[]) {
  localStorage.setItem(
    DEPARTMENT_KEY,
    JSON.stringify(data)
  );
}

/* ---------------- Shepherding ---------------- */

export function loadShepherding(): ShepherdingRecord[] {
  return JSON.parse(
    localStorage.getItem(SHEPHERDING_KEY) || "[]"
  );
}

export function saveShepherding(
  data: ShepherdingRecord[]
) {
  localStorage.setItem(
    SHEPHERDING_KEY,
    JSON.stringify(data)
  );
}