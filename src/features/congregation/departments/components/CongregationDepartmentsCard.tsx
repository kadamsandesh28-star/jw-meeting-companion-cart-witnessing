import { useNavigate } from "react-router-dom";

import { DashboardSection } from "../../../../shared/components/dashboard";
import { useDepartments } from "../../departments/hooks/useDepartments";

export default function CongregationDepartmentsCard() {
  const { departments } = useDepartments();
  const navigate = useNavigate();

  return (
    <DashboardSection title="Congregation Departments">
      <div className="space-y-2">
        {departments.map((department) => (
          <button
            key={department.id}
            type="button"
            onClick={() =>
              navigate(
                `/congregation/departments/${department.id}`
              )
            }
            className="flex w-full items-center justify-between rounded-md border border-slate-200 px-3 py-2 text-left transition hover:border-blue-400 hover:bg-blue-50"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">
                {department.icon ?? "🏢"}
              </span>

              <div>
                <div className="font-medium text-slate-800">
                  {department.name}
                </div>

                <div className="text-xs text-slate-500">
                  Congregation Department
                </div>
              </div>
            </div>

            <span
              className={`rounded-full px-2 py-1 text-xs font-medium ${
                department.active
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-600"
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