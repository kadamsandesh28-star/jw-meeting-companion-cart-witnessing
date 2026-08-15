import { DepartmentWorkTemplate } from "../models/DepartmentWorkTemplate";

const STORAGE_KEY = "jwmc_department_work_templates";

function load(): DepartmentWorkTemplate[] {
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

function save(templates: DepartmentWorkTemplate[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
}

export const departmentWorkTemplateService = {
  getAll(): DepartmentWorkTemplate[] {
    return load().sort((a, b) => a.name.localeCompare(b.name));
  },

  getByDepartment(departmentId: string): DepartmentWorkTemplate[] {
    return load()
      .filter((template) => template.departmentId === departmentId)
      .sort((a, b) => a.name.localeCompare(b.name));
  },

  create(
    template: Omit<
      DepartmentWorkTemplate,
      "id" | "createdAt" | "updatedAt"
    >
  ): DepartmentWorkTemplate {
    const templates = load();

    const newTemplate: DepartmentWorkTemplate = {
      ...template,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    templates.push(newTemplate);

    save(templates);

    return newTemplate;
  },

  update(updatedTemplate: DepartmentWorkTemplate): void {
    const templates = load();

    const index = templates.findIndex(
      (template) => template.id === updatedTemplate.id
    );

    if (index === -1) {
      return;
    }

    templates[index] = {
      ...updatedTemplate,
      updatedAt: new Date().toISOString(),
    };

    save(templates);
  },

  delete(id: string): void {
    save(load().filter((template) => template.id !== id));
  },
};