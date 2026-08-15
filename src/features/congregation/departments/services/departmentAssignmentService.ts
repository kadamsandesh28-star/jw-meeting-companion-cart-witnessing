import { DepartmentAssignment } from "../models/DepartmentAssignment";

const STORAGE_KEY = "jwmc_department_assignments";

function load(): DepartmentAssignment[] {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    return [];
  }

  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function save(assignments: DepartmentAssignment[]) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(assignments)
  );
}

export const departmentAssignmentService = {
  getAll(): DepartmentAssignment[] {
    return load().sort((a, b) =>
      a.date.localeCompare(b.date)
    );
  },

  getByDepartment(departmentId: string): DepartmentAssignment[] {
    return load()
      .filter(
        (assignment) =>
          assignment.departmentId === departmentId
      )
      .sort((a, b) => a.date.localeCompare(b.date));
  },

  getById(id: string): DepartmentAssignment | undefined {
    return load().find(
      (assignment) => assignment.id === id
    );
  },

  create(
    assignment: Omit<
      DepartmentAssignment,
      "id" | "createdAt" | "updatedAt"
    >
  ): DepartmentAssignment {
    const assignments = load();

    const newAssignment: DepartmentAssignment = {
      ...assignment,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    assignments.push(newAssignment);

    save(assignments);

    return newAssignment;
  },

  update(updatedAssignment: DepartmentAssignment): void {
    const assignments = load();

    const index = assignments.findIndex(
      (assignment) =>
        assignment.id === updatedAssignment.id
    );

    if (index === -1) {
      return;
    }

    assignments[index] = {
      ...updatedAssignment,
      updatedAt: new Date().toISOString(),
    };

    save(assignments);
  },

  delete(id: string): void {
    save(
      load().filter(
        (assignment) => assignment.id !== id
      )
    );
  },
};