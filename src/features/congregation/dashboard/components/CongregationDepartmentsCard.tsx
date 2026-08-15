import {
  BookOpen,
  Building2,
  Map,
  Users,
  Volume2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { DashboardSection } from "../../../../shared/components/dashboard";
import { useDepartments } from "../../departments/hooks/useDepartments";

const getDepartmentIcon = (name: string) => {
  const value = name.toLowerCase();

  if (value.includes("territor")) return <Map size={18} />;
  if (value.includes("audio") || value.includes("video"))
    return <Volume2 size={18} />;
  if (value.includes("literature"))
    return <BookOpen size={18} />;
  if (
    value.includes("maintenance") ||
    value.includes("kingdom hall")
  )
    return <Building2 size={18} />;

  return <Users size={18} />;
};

export default function CongregationDepartmentsCard() {
  const { departments } = useDepartments();
  const navigate = useNavigate();

  return (
    <DashboardSection title="Congregation Departments">
      <div className="space-y-3">
        {departments.map((department) => (
          <button
            key={department.id}
            type="button"
            onClick={() => {
              console.log("Clicked:", department.id);
              navigate(
                `/congregation/departments/${department.id}`
              );
            }}
            className="group flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                {getDepartmentIcon(department.name)}
              </div>

              <div>
                <p className="font-semibold text-slate-800">
                  {department.name}
                </p>

                <p className="text-sm text-slate-500">
                  Congregation Department
                </p>
              </div>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                department.active
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {department.active ? "Active" : "Inactive"}
            </span>
          </button>
        ))}
      </div>
    </DashboardSection>
  );
}