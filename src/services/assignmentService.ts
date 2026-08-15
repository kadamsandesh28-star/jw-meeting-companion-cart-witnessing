import { Assignment, AssignmentStatus, AssignmentType } from "../features/congregation/publishers/models/Assignment";

let assignments: Assignment[] = [];

export const assignmentService = {
  getAll(): Assignment[] {
    return assignments;
  },

  getById(id: string): Assignment | undefined {
    return assignments.find((assignment) => assignment.id === id);
  },

  create(assignment: Assignment): void {
    assignments.push(assignment);
  },

  update(updatedAssignment: Assignment): boolean {
    const index = assignments.findIndex(
      (assignment) => assignment.id === updatedAssignment.id
    );

    if (index === -1) {
      return false;
    }

    assignments[index] = updatedAssignment;

    return true;
  },

  delete(id: string): boolean {
    const index = assignments.findIndex(
      (assignment) => assignment.id === id
    );

    if (index === -1) {
      return false;
    }

    assignments.splice(index, 1);

    return true;
  },

  getByStatus(status: AssignmentStatus): Assignment[] {
    return assignments.filter(
      (assignment) => assignment.status === status
    );
  },

  getByType(type: AssignmentType): Assignment[] {
    return assignments.filter(
      (assignment) => assignment.type === type
    );
  },

  getByDate(date: string): Assignment[] {
    return assignments.filter(
      (assignment) => assignment.date === date
    );
  },

  clear(): void {
    assignments = [];
  }
};