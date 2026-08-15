import { DashboardSection } from "../../../../shared/components/dashboard";
import { useDepartments } from "../hooks/useDepartments";

export default function DepartmentList() {
  const { departments } = useDepartments();

  return (
    <DashboardSection title="Congregation Departments">
      {departments.length === 0 ? (
        <p>No departments found.</p>
      ) : (
        <div className="space-y-3">
          {departments.map((department) => (
            <div
              key={department.id}
              className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div>
                <h3 className="font-semibold text-slate-900">
                  {department.name}
                </h3>

                {department.description && (
                  <p className="mt-1 text-sm text-slate-600">
                    {department.description}
                  </p>
                )}
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  department.active
                    ? "bg-green-100 text-green-700"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                {department.active ? "Active" : "Inactive"}
              </span>
            </div>
          ))}
        </div>
      )}
    </DashboardSection>
  );
}