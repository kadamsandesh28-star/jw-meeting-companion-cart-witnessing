export type AssignmentStatus =
  | "Pending"
  | "Completed"
  | "Cancelled";

export interface DepartmentAssignment {
  id: string;

  departmentId: string;

  date: string;

  workTemplateId: string;

  assignedPublisherId?: string;

  location?: string;

  notes?: string;

  status: AssignmentStatus;

  createdAt: string;

  updatedAt: string;
}