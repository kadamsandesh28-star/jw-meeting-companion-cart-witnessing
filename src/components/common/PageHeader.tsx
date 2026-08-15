import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export default function PageHeader({
  title,
  subtitle,
  action,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between dark:border-slate-700 dark:bg-slate-900">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            {subtitle}
          </p>
        )}
      </div>

      {action && (
        <div className="flex items-center">
          {action}
        </div>
      )}
    </div>
  );
}