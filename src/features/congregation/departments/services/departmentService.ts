import { Department } from "../types/Department";

const STORAGE_KEY = "jwmc_departments";

const now = new Date().toISOString();

const defaultDepartments: Department[] = [
  {
    id: crypto.randomUUID(),
    name: "Literature",
    description: "Manage congregation literature and inventory.",
    icon: "📚",
    overseerId: "",
    assistantId: "",
    memberIds: [],
    keyMemberPublisherIds: [],
    active: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: crypto.randomUUID(),
    name: "Audio / Video",
    description: "Coordinate audio, video and streaming equipment.",
    icon: "🎤",
    overseerId: "",
    assistantId: "",
    memberIds: [],
    keyMemberPublisherIds: [],
    active: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: crypto.randomUUID(),
    name: "Attendants",
    description: "Manage attendants and meeting assignments.",
    icon: "🚪",
    overseerId: "",
    assistantId: "",
    memberIds: [],
    keyMemberPublisherIds: [],
    active: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: crypto.randomUUID(),
    name: "Cleaning",
    description: "Coordinate Kingdom Hall cleaning schedules.",
    icon: "🧹",
    overseerId: "",
    assistantId: "",
    memberIds: [],
    keyMemberPublisherIds: [],
    active: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: crypto.randomUUID(),
    name: "Accounts",
    description: "Maintain congregation accounts and records.",
    icon: "🏦",
    overseerId: "",
    assistantId: "",
    memberIds: [],
    keyMemberPublisherIds: [],
    active: true,
    createdAt: now,
    updatedAt: now,
  },
];

class DepartmentService {
  private load(): Department[] {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      this.save(defaultDepartments);
      return defaultDepartments;
    }

    return JSON.parse(stored) as Department[];
  }

  private save(items: Department[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  getAll(): Department[] {
    return this.load();
  }

  getById(id: string): Department | undefined {
    return this.load().find((department) => department.id === id);
  }

  create(department: Department): void {
    const departments = this.load();
    departments.push(department);
    this.save(departments);
  }

  update(updatedDepartment: Department): void {
    const departments = this.load().map((department) =>
      department.id === updatedDepartment.id
        ? updatedDepartment
        : department
    );

    this.save(departments);
  }

  delete(id: string): void {
    const departments = this.load().filter(
      (department) => department.id !== id
    );

    this.save(departments);
  }
}

export const departmentService = new DepartmentService();