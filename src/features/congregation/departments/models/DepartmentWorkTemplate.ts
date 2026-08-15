export interface DepartmentWorkTemplate {
  id: string;

  departmentId: string;

  name: string;

  defaultLocation?: string;

  description?: string;

  active: boolean;

  createdAt: string;

  updatedAt: string;
}