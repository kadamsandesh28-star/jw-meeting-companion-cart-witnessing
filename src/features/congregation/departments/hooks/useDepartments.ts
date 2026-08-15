import { useEffect, useState } from "react";
import { departmentService } from "../services/departmentService";
import { Department } from "../types/Department";

export function useDepartments() {
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    setDepartments(departmentService.getAll());
  }, []);

  const refresh = () => {
    setDepartments(departmentService.getAll());
  };

  const addDepartment = (department: Department) => {
    departmentService.create(department);
    refresh();
  };

  const updateDepartment = (department: Department) => {
    departmentService.update(department);
    refresh();
  };

  const deleteDepartment = (id: string) => {
    departmentService.delete(id);
    refresh();
  };

  return {
    departments,
    refresh,
    addDepartment,
    updateDepartment,
    deleteDepartment,
  };
}