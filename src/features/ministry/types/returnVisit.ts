export type ReturnVisitStatus =
  | "Pending"
  | "Completed"
  | "Not Home"
  | "Moved Away";

export interface ReturnVisit {
  id: string;

  name: string;

  address: string;

  phone?: string;

  email?: string;

  nextVisit: string;

  notes: string;

  status: ReturnVisitStatus;

  createdAt: string;

  updatedAt: string;
}